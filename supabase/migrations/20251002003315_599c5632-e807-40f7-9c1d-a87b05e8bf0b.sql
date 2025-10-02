-- Insert sample notes for different subjects (only if not already present)
INSERT INTO notes (title, content, subject, teacher_name, created_by)
SELECT * FROM (VALUES
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
  ('Modern World History', 'Understanding the major events of the 20th century including world wars, independence movements, and globalization.', 'History', 'Prof. Rajesh Nair', 'system')
) AS v(title, content, subject, teacher_name, created_by)
WHERE NOT EXISTS (
  SELECT 1 FROM notes WHERE notes.title = v.title AND notes.created_by = 'system'
);