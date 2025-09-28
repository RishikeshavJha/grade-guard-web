-- Fix RLS policies and add dummy data

-- First, let's check if we have proper policies
DROP POLICY IF EXISTS "Anyone can view classes" ON public.classes;
DROP POLICY IF EXISTS "Anyone can manage classes" ON public.classes;

-- Create proper RLS policies for classes
CREATE POLICY "Public can view classes" ON public.classes FOR SELECT USING (true);
CREATE POLICY "Public can manage classes" ON public.classes FOR ALL USING (true);

-- Add dummy notes data
INSERT INTO public.notes (title, content, subject, teacher_name, created_by) VALUES
('Introduction to Algebra', 'Basic concepts of algebra including variables, expressions, and equations. This covers the fundamental building blocks of algebraic thinking.', 'Mathematics', 'Dr. Smith', 'teacher_001'),
('Newton''s Laws of Motion', 'Comprehensive notes on the three laws of motion by Isaac Newton, including examples and applications in real world scenarios.', 'Physics', 'Prof. Johnson', 'teacher_002'),
('Chemical Bonding', 'Detailed explanation of ionic and covalent bonds, molecular structures, and intermolecular forces in chemistry.', 'Chemistry', 'Dr. Brown', 'teacher_003'),
('Cell Structure and Function', 'Overview of plant and animal cell components, their functions, and how they work together in living organisms.', 'Biology', 'Prof. Davis', 'teacher_004'),
('English Grammar Basics', 'Essential grammar rules, parts of speech, sentence structure, and common writing techniques for clear communication.', 'English', 'Ms. Wilson', 'teacher_005'),
('Quadratic Equations', 'Methods for solving quadratic equations including factoring, completing the square, and using the quadratic formula.', 'Mathematics', 'Dr. Smith', 'teacher_001'),
('Electromagnetic Waves', 'Properties of electromagnetic radiation, the electromagnetic spectrum, and applications in technology and communication.', 'Physics', 'Prof. Johnson', 'teacher_002'),
('Organic Chemistry Fundamentals', 'Introduction to carbon compounds, functional groups, and basic organic reactions and mechanisms.', 'Chemistry', 'Dr. Brown', 'teacher_003'),
('Photosynthesis Process', 'Detailed study of how plants convert light energy into chemical energy, including light and dark reactions.', 'Biology', 'Prof. Davis', 'teacher_004'),
('Essay Writing Techniques', 'Step-by-step guide to writing effective essays, including structure, thesis development, and argumentation strategies.', 'English', 'Ms. Wilson', 'teacher_005');

-- Add comprehensive dummy timetable data for all classes
INSERT INTO public.classes (subject, teacher_name, room_number, day_of_week, start_time, end_time) VALUES
-- Monday (1) - Class 10-A
('Mathematics', 'Dr. Smith', 'Room 101', 1, '09:00', '09:45'),
('Physics', 'Prof. Johnson', 'Room 102', 1, '09:45', '10:30'),
('Chemistry', 'Dr. Brown', 'Room 103', 1, '11:00', '11:45'),
('Biology', 'Prof. Davis', 'Room 104', 1, '11:45', '12:30'),
('English', 'Ms. Wilson', 'Room 105', 1, '12:30', '13:15'),

-- Tuesday (2) - Class 10-A
('English', 'Ms. Wilson', 'Room 105', 2, '09:00', '09:45'),
('Mathematics', 'Dr. Smith', 'Room 101', 2, '09:45', '10:30'),
('Physics', 'Prof. Johnson', 'Room 102', 2, '11:00', '11:45'),
('Chemistry', 'Dr. Brown', 'Room 103', 2, '11:45', '12:30'),
('Biology', 'Prof. Davis', 'Room 104', 2, '12:30', '13:15'),

-- Wednesday (3) - Class 10-A
('Biology', 'Prof. Davis', 'Room 104', 3, '09:00', '09:45'),
('English', 'Ms. Wilson', 'Room 105', 3, '09:45', '10:30'),
('Mathematics', 'Dr. Smith', 'Room 101', 3, '11:00', '11:45'),
('Physics', 'Prof. Johnson', 'Room 102', 3, '11:45', '12:30'),
('Chemistry', 'Dr. Brown', 'Room 103', 3, '12:30', '13:15'),

-- Thursday (4) - Class 10-A
('Chemistry', 'Dr. Brown', 'Room 103', 4, '09:00', '09:45'),
('Biology', 'Prof. Davis', 'Room 104', 4, '09:45', '10:30'),
('English', 'Ms. Wilson', 'Room 105', 4, '11:00', '11:45'),
('Mathematics', 'Dr. Smith', 'Room 101', 4, '11:45', '12:30'),
('Physics', 'Prof. Johnson', 'Room 102', 4, '12:30', '13:15'),

-- Friday (5) - Class 10-A
('Physics', 'Prof. Johnson', 'Room 102', 5, '09:00', '09:45'),
('Chemistry', 'Dr. Brown', 'Room 103', 5, '09:45', '10:30'),
('Biology', 'Prof. Davis', 'Room 104', 5, '11:00', '11:45'),
('English', 'Ms. Wilson', 'Room 105', 5, '11:45', '12:30'),
('Mathematics', 'Dr. Smith', 'Room 101', 5, '12:30', '13:15'),

-- Monday (1) - Class 10-B
('English', 'Ms. Wilson', 'Room 201', 1, '09:00', '09:45'),
('Chemistry', 'Dr. Brown', 'Room 202', 1, '09:45', '10:30'),
('Mathematics', 'Dr. Smith', 'Room 203', 1, '11:00', '11:45'),
('Physics', 'Prof. Johnson', 'Room 204', 1, '11:45', '12:30'),
('Biology', 'Prof. Davis', 'Room 205', 1, '12:30', '13:15'),

-- Tuesday (2) - Class 10-B
('Biology', 'Prof. Davis', 'Room 205', 2, '09:00', '09:45'),
('English', 'Ms. Wilson', 'Room 201', 2, '09:45', '10:30'),
('Chemistry', 'Dr. Brown', 'Room 202', 2, '11:00', '11:45'),
('Mathematics', 'Dr. Smith', 'Room 203', 2, '11:45', '12:30'),
('Physics', 'Prof. Johnson', 'Room 204', 2, '12:30', '13:15'),

-- Wednesday (3) - Class 10-B
('Physics', 'Prof. Johnson', 'Room 204', 3, '09:00', '09:45'),
('Biology', 'Prof. Davis', 'Room 205', 3, '09:45', '10:30'),
('English', 'Ms. Wilson', 'Room 201', 3, '11:00', '11:45'),
('Chemistry', 'Dr. Brown', 'Room 202', 3, '11:45', '12:30'),
('Mathematics', 'Dr. Smith', 'Room 203', 3, '12:30', '13:15'),

-- Thursday (4) - Class 10-B
('Mathematics', 'Dr. Smith', 'Room 203', 4, '09:00', '09:45'),
('Physics', 'Prof. Johnson', 'Room 204', 4, '09:45', '10:30'),
('Biology', 'Prof. Davis', 'Room 205', 4, '11:00', '11:45'),
('English', 'Ms. Wilson', 'Room 201', 4, '11:45', '12:30'),
('Chemistry', 'Dr. Brown', 'Room 202', 4, '12:30', '13:15'),

-- Friday (5) - Class 10-B
('Chemistry', 'Dr. Brown', 'Room 202', 5, '09:00', '09:45'),
('Mathematics', 'Dr. Smith', 'Room 203', 5, '09:45', '10:30'),
('Physics', 'Prof. Johnson', 'Room 204', 5, '11:00', '11:45'),
('Biology', 'Prof. Davis', 'Room 205', 5, '11:45', '12:30'),
('English', 'Ms. Wilson', 'Room 201', 5, '12:30', '13:15'),

-- Monday (1) - Class 10-C
('Biology', 'Prof. Davis', 'Room 301', 1, '09:00', '09:45'),
('Mathematics', 'Dr. Smith', 'Room 302', 1, '09:45', '10:30'),
('English', 'Ms. Wilson', 'Room 303', 1, '11:00', '11:45'),
('Chemistry', 'Dr. Brown', 'Room 304', 1, '11:45', '12:30'),
('Physics', 'Prof. Johnson', 'Room 305', 1, '12:30', '13:15'),

-- Tuesday (2) - Class 10-C
('Physics', 'Prof. Johnson', 'Room 305', 2, '09:00', '09:45'),
('Biology', 'Prof. Davis', 'Room 301', 2, '09:45', '10:30'),
('Mathematics', 'Dr. Smith', 'Room 302', 2, '11:00', '11:45'),
('English', 'Ms. Wilson', 'Room 303', 2, '11:45', '12:30'),
('Chemistry', 'Dr. Brown', 'Room 304', 2, '12:30', '13:15'),

-- Wednesday (3) - Class 10-C
('Chemistry', 'Dr. Brown', 'Room 304', 3, '09:00', '09:45'),
('Physics', 'Prof. Johnson', 'Room 305', 3, '09:45', '10:30'),
('Biology', 'Prof. Davis', 'Room 301', 3, '11:00', '11:45'),
('Mathematics', 'Dr. Smith', 'Room 302', 3, '11:45', '12:30'),
('English', 'Ms. Wilson', 'Room 303', 3, '12:30', '13:15'),

-- Thursday (4) - Class 10-C
('English', 'Ms. Wilson', 'Room 303', 4, '09:00', '09:45'),
('Chemistry', 'Dr. Brown', 'Room 304', 4, '09:45', '10:30'),
('Physics', 'Prof. Johnson', 'Room 305', 4, '11:00', '11:45'),
('Biology', 'Prof. Davis', 'Room 301', 4, '11:45', '12:30'),
('Mathematics', 'Dr. Smith', 'Room 302', 4, '12:30', '13:15'),

-- Friday (5) - Class 10-C
('Mathematics', 'Dr. Smith', 'Room 302', 5, '09:00', '09:45'),
('English', 'Ms. Wilson', 'Room 303', 5, '09:45', '10:30'),
('Chemistry', 'Dr. Brown', 'Room 304', 5, '11:00', '11:45'),
('Physics', 'Prof. Johnson', 'Room 305', 5, '11:45', '12:30'),
('Biology', 'Prof. Davis', 'Room 301', 5, '12:30', '13:15'),

-- Monday (1) - Class 11-A
('Physics', 'Prof. Johnson', 'Room 401', 1, '09:00', '09:45'),
('Chemistry', 'Dr. Brown', 'Room 402', 1, '09:45', '10:30'),
('Mathematics', 'Dr. Smith', 'Room 403', 1, '11:00', '11:45'),
('Biology', 'Prof. Davis', 'Room 404', 1, '11:45', '12:30'),
('English', 'Ms. Wilson', 'Room 405', 1, '12:30', '13:15'),

-- Tuesday (2) - Class 11-A
('English', 'Ms. Wilson', 'Room 405', 2, '09:00', '09:45'),
('Physics', 'Prof. Johnson', 'Room 401', 2, '09:45', '10:30'),
('Chemistry', 'Dr. Brown', 'Room 402', 2, '11:00', '11:45'),
('Mathematics', 'Dr. Smith', 'Room 403', 2, '11:45', '12:30'),
('Biology', 'Prof. Davis', 'Room 404', 2, '12:30', '13:15'),

-- Wednesday (3) - Class 11-A
('Biology', 'Prof. Davis', 'Room 404', 3, '09:00', '09:45'),
('English', 'Ms. Wilson', 'Room 405', 3, '09:45', '10:30'),
('Physics', 'Prof. Johnson', 'Room 401', 3, '11:00', '11:45'),
('Chemistry', 'Dr. Brown', 'Room 402', 3, '11:45', '12:30'),
('Mathematics', 'Dr. Smith', 'Room 403', 3, '12:30', '13:15'),

-- Thursday (4) - Class 11-A
('Mathematics', 'Dr. Smith', 'Room 403', 4, '09:00', '09:45'),
('Biology', 'Prof. Davis', 'Room 404', 4, '09:45', '10:30'),
('English', 'Ms. Wilson', 'Room 405', 4, '11:00', '11:45'),
('Physics', 'Prof. Johnson', 'Room 401', 4, '11:45', '12:30'),
('Chemistry', 'Dr. Brown', 'Room 402', 4, '12:30', '13:15'),

-- Friday (5) - Class 11-A
('Chemistry', 'Dr. Brown', 'Room 402', 5, '09:00', '09:45'),
('Mathematics', 'Dr. Smith', 'Room 403', 5, '09:45', '10:30'),
('Biology', 'Prof. Davis', 'Room 404', 5, '11:00', '11:45'),
('English', 'Ms. Wilson', 'Room 405', 5, '11:45', '12:30'),
('Physics', 'Prof. Johnson', 'Room 401', 5, '12:30', '13:15'),

-- Monday (1) - Class 11-B
('Chemistry', 'Dr. Brown', 'Room 501', 1, '09:00', '09:45'),
('Biology', 'Prof. Davis', 'Room 502', 1, '09:45', '10:30'),
('Physics', 'Prof. Johnson', 'Room 503', 1, '11:00', '11:45'),
('English', 'Ms. Wilson', 'Room 504', 1, '11:45', '12:30'),
('Mathematics', 'Dr. Smith', 'Room 505', 1, '12:30', '13:15'),

-- Tuesday (2) - Class 11-B
('Mathematics', 'Dr. Smith', 'Room 505', 2, '09:00', '09:45'),
('Chemistry', 'Dr. Brown', 'Room 501', 2, '09:45', '10:30'),
('Biology', 'Prof. Davis', 'Room 502', 2, '11:00', '11:45'),
('Physics', 'Prof. Johnson', 'Room 503', 2, '11:45', '12:30'),
('English', 'Ms. Wilson', 'Room 504', 2, '12:30', '13:15'),

-- Wednesday (3) - Class 11-B
('English', 'Ms. Wilson', 'Room 504', 3, '09:00', '09:45'),
('Mathematics', 'Dr. Smith', 'Room 505', 3, '09:45', '10:30'),
('Chemistry', 'Dr. Brown', 'Room 501', 3, '11:00', '11:45'),
('Biology', 'Prof. Davis', 'Room 502', 3, '11:45', '12:30'),
('Physics', 'Prof. Johnson', 'Room 503', 3, '12:30', '13:15'),

-- Thursday (4) - Class 11-B
('Physics', 'Prof. Johnson', 'Room 503', 4, '09:00', '09:45'),
('English', 'Ms. Wilson', 'Room 504', 4, '09:45', '10:30'),
('Mathematics', 'Dr. Smith', 'Room 505', 4, '11:00', '11:45'),
('Chemistry', 'Dr. Brown', 'Room 501', 4, '11:45', '12:30'),
('Biology', 'Prof. Davis', 'Room 502', 4, '12:30', '13:15'),

-- Friday (5) - Class 11-B
('Biology', 'Prof. Davis', 'Room 502', 5, '09:00', '09:45'),
('Physics', 'Prof. Johnson', 'Room 503', 5, '09:45', '10:30'),
('English', 'Ms. Wilson', 'Room 504', 5, '11:00', '11:45'),
('Mathematics', 'Dr. Smith', 'Room 505', 5, '11:45', '12:30'),
('Chemistry', 'Dr. Brown', 'Room 501', 5, '12:30', '13:15');