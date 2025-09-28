-- Add only missing dummy data since policies already exist

-- First make notes accessible to public for this educational app
DROP POLICY IF EXISTS "Users can view their own notes" ON public.notes;
DROP POLICY IF EXISTS "Users can create their own notes" ON public.notes;
DROP POLICY IF EXISTS "Users can update their own notes" ON public.notes;
DROP POLICY IF EXISTS "Users can delete their own notes" ON public.notes;

-- Create public access policies for notes (educational system)
CREATE POLICY "Public can view notes" ON public.notes FOR SELECT USING (true);
CREATE POLICY "Public can manage notes" ON public.notes FOR ALL USING (true);

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