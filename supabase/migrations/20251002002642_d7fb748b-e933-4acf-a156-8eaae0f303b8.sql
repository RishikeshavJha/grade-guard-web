-- Insert sample notes for different subjects
INSERT INTO notes (title, content, subject, teacher_name, created_by) VALUES
('Introduction to Mathematics', 'This comprehensive guide covers fundamental mathematical concepts including algebra, geometry, and calculus. Perfect for students preparing for exams.', 'Mathematics', 'Prof. Anjali Sharma', 'system'),
('Advanced Mathematics', 'Deep dive into complex mathematical theories, differential equations, and advanced problem-solving techniques.', 'Mathematics', 'Prof. Anjali Sharma', 'system'),

('Chemical Reactions & Equations', 'Understanding chemical reactions, balancing equations, and stoichiometry. Includes practical examples and lab procedures.', 'Chemistry', 'Dr. Vikram Patel', 'system'),
('Organic Chemistry Basics', 'Introduction to organic compounds, nomenclature, and reaction mechanisms. Essential concepts for chemistry students.', 'Chemistry', 'Dr. Vikram Patel', 'system'),

('English Grammar Essentials', 'Master the fundamentals of English grammar including tenses, parts of speech, and sentence structure.', 'English', 'Ms. Priya Desai', 'system'),
('Literature Analysis Guide', 'Comprehensive guide to analyzing poetry, prose, and drama. Includes literary devices and critical thinking techniques.', 'English', 'Ms. Priya Desai', 'system'),

('Programming Fundamentals', 'Learn the basics of programming with Python. Covers variables, loops, functions, and object-oriented programming.', 'Computer Science', 'Mr. Arjun Singh', 'system'),
('Data Structures & Algorithms', 'Essential data structures including arrays, linked lists, trees, and graphs. Algorithm analysis and complexity.', 'Computer Science', 'Mr. Arjun Singh', 'system'),

('Cell Biology', 'Study of cell structure, function, and processes. Includes cell division, metabolism, and genetic information.', 'Biology', 'Dr. Meera Reddy', 'system'),
('Human Anatomy & Physiology', 'Detailed overview of human body systems, organs, and their functions. Perfect for medical aspirants.', 'Biology', 'Dr. Meera Reddy', 'system'),

('Ancient Civilizations', 'Explore the rise and fall of ancient civilizations including Egypt, Greece, Rome, and the Indus Valley.', 'History', 'Prof. Rajesh Nair', 'system'),
('Modern World History', 'Understanding the major events of the 20th century including world wars, independence movements, and globalization.', 'History', 'Prof. Rajesh Nair', 'system');

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  teacher_name text NOT NULL,
  priority text NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on announcements
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view announcements
CREATE POLICY "Public can view announcements"
ON announcements
FOR SELECT
USING (true);

-- Allow everyone to manage announcements (for now, can be restricted later)
CREATE POLICY "Public can manage announcements"
ON announcements
FOR ALL
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_announcements_updated_at
BEFORE UPDATE ON announcements
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime for announcements
ALTER PUBLICATION supabase_realtime ADD TABLE announcements;