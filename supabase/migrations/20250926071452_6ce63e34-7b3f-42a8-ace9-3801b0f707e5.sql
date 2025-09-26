-- Create classes/timetable table
CREATE TABLE public.classes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  teacher_name TEXT NOT NULL,
  teacher_id UUID REFERENCES auth.users(id),
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 1 AND day_of_week <= 5), -- 1=Monday, 5=Friday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notes table
CREATE TABLE public.notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  subject TEXT NOT NULL,
  teacher_id UUID NOT NULL REFERENCES auth.users(id),
  teacher_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create attendance sessions table (for QR code sessions)
CREATE TABLE public.attendance_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID NOT NULL REFERENCES public.classes(id),
  teacher_id UUID NOT NULL REFERENCES auth.users(id),
  session_date DATE NOT NULL DEFAULT CURRENT_DATE,
  qr_code TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create attendance records table
CREATE TABLE public.attendance_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.attendance_sessions(id),
  student_id UUID NOT NULL REFERENCES auth.users(id),
  student_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent')),
  marked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(session_id, student_id)
);

-- Enable Row Level Security
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies for classes (everyone can view, teachers can manage)
CREATE POLICY "Everyone can view classes" ON public.classes FOR SELECT USING (true);
CREATE POLICY "Teachers can create classes" ON public.classes FOR INSERT WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "Teachers can update their classes" ON public.classes FOR UPDATE USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can delete their classes" ON public.classes FOR DELETE USING (auth.uid() = teacher_id);

-- RLS Policies for notes (everyone can view, teachers can manage their own)
CREATE POLICY "Everyone can view notes" ON public.notes FOR SELECT USING (true);
CREATE POLICY "Teachers can create notes" ON public.notes FOR INSERT WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "Teachers can update their notes" ON public.notes FOR UPDATE USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can delete their notes" ON public.notes FOR DELETE USING (auth.uid() = teacher_id);

-- RLS Policies for attendance sessions (everyone can view active sessions, teachers can manage)
CREATE POLICY "Everyone can view active attendance sessions" ON public.attendance_sessions FOR SELECT USING (is_active = true);
CREATE POLICY "Teachers can create attendance sessions" ON public.attendance_sessions FOR INSERT WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "Teachers can update their attendance sessions" ON public.attendance_sessions FOR UPDATE USING (auth.uid() = teacher_id);

-- RLS Policies for attendance records (students can create their own, teachers can view their sessions)
CREATE POLICY "Students can mark their own attendance" ON public.attendance_records FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students can view their own attendance" ON public.attendance_records FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Teachers can view attendance for their sessions" ON public.attendance_records FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.attendance_sessions 
    WHERE attendance_sessions.id = attendance_records.session_id 
    AND attendance_sessions.teacher_id = auth.uid()
  )
);

-- Create triggers for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_classes_updated_at
    BEFORE UPDATE ON public.classes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notes_updated_at
    BEFORE UPDATE ON public.notes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();