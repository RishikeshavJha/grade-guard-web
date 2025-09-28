-- Create classes table for timetable and QR generation
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  teacher_name TEXT NOT NULL,
  room_number TEXT,
  day_of_week INTEGER NOT NULL, -- 0 = Sunday, 1 = Monday, etc.
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create attendance_sessions table for QR code sessions
CREATE TABLE IF NOT EXISTS public.attendance_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create attendance_records table for individual attendance records
CREATE TABLE IF NOT EXISTS public.attendance_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.attendance_sessions(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(session_id, student_name) -- Prevent duplicate attendance for same session
);

-- Add missing columns to notes table
ALTER TABLE public.notes 
ADD COLUMN IF NOT EXISTS subject TEXT,
ADD COLUMN IF NOT EXISTS teacher_name TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();

-- Enable RLS on all tables
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for classes (public read access for now)
CREATE POLICY "Anyone can view classes" ON public.classes FOR SELECT USING (true);
CREATE POLICY "Anyone can manage classes" ON public.classes FOR ALL USING (true);

-- Create RLS policies for attendance_sessions
CREATE POLICY "Anyone can view attendance sessions" ON public.attendance_sessions FOR SELECT USING (true);
CREATE POLICY "Anyone can manage attendance sessions" ON public.attendance_sessions FOR ALL USING (true);

-- Create RLS policies for attendance_records
CREATE POLICY "Anyone can view attendance records" ON public.attendance_records FOR SELECT USING (true);
CREATE POLICY "Anyone can manage attendance records" ON public.attendance_records FOR ALL USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON public.classes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON public.notes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for classes
INSERT INTO public.classes (subject, teacher_name, room_number, day_of_week, start_time, end_time) VALUES
('Mathematics', 'Dr. Smith', '101', 1, '09:00', '10:30'),
('Physics', 'Prof. Johnson', '201', 1, '11:00', '12:30'),
('Chemistry', 'Dr. Williams', '301', 2, '09:00', '10:30'),
('Biology', 'Prof. Brown', '401', 2, '11:00', '12:30'),
('English', 'Ms. Davis', '102', 3, '09:00', '10:30'),
('History', 'Mr. Wilson', '202', 3, '11:00', '12:30'),
('Computer Science', 'Dr. Taylor', '302', 4, '09:00', '10:30'),
('Art', 'Ms. Anderson', '402', 4, '11:00', '12:30'),
('Music', 'Mr. Thomas', '103', 5, '09:00', '10:30'),
('Physical Education', 'Coach Miller', 'Gym', 5, '11:00', '12:30');