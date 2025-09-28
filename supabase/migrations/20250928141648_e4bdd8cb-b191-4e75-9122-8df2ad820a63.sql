-- Clear existing timetable data and create proper structured timetable
DELETE FROM public.classes;

-- Insert structured timetable for all classes (Monday to Friday, 5 periods each)
-- Time structure: Period 1&2 (1hr each), Break (30min), Period 3,4,5 (45min each)

-- Monday (Day 1) Classes
INSERT INTO public.classes (subject, teacher_name, room_number, day_of_week, start_time, end_time) VALUES
-- Class 10A - Monday
('Mathematics', 'Dr. Smith', 'Room 101', 1, '09:00', '10:00'),
('Physics', 'Prof. Johnson', 'Lab 201', 1, '10:00', '11:00'),
('Chemistry', 'Dr. Brown', 'Lab 301', 1, '11:30', '12:15'),
('English', 'Ms. Wilson', 'Room 102', 1, '12:15', '13:00'),
('Biology', 'Prof. Davis', 'Lab 401', 1, '13:00', '13:45'),

-- Class 10B - Monday
('English', 'Ms. Wilson', 'Room 103', 1, '09:00', '10:00'),
('Mathematics', 'Dr. Smith', 'Room 104', 1, '10:00', '11:00'),
('Biology', 'Prof. Davis', 'Lab 402', 1, '11:30', '12:15'),
('Physics', 'Prof. Johnson', 'Lab 202', 1, '12:15', '13:00'),
('Chemistry', 'Dr. Brown', 'Lab 302', 1, '13:00', '13:45'),

-- Tuesday (Day 2) Classes
-- Class 10A - Tuesday
('Physics', 'Prof. Johnson', 'Lab 201', 2, '09:00', '10:00'),
('Chemistry', 'Dr. Brown', 'Lab 301', 2, '10:00', '11:00'),
('Mathematics', 'Dr. Smith', 'Room 101', 2, '11:30', '12:15'),
('Biology', 'Prof. Davis', 'Lab 401', 2, '12:15', '13:00'),
('English', 'Ms. Wilson', 'Room 102', 2, '13:00', '13:45'),

-- Class 10B - Tuesday
('Chemistry', 'Dr. Brown', 'Lab 302', 2, '09:00', '10:00'),
('Biology', 'Prof. Davis', 'Lab 402', 2, '10:00', '11:00'),
('English', 'Ms. Wilson', 'Room 103', 2, '11:30', '12:15'),
('Mathematics', 'Dr. Smith', 'Room 104', 2, '12:15', '13:00'),
('Physics', 'Prof. Johnson', 'Lab 202', 2, '13:00', '13:45'),

-- Wednesday (Day 3) Classes
-- Class 10A - Wednesday
('Biology', 'Prof. Davis', 'Lab 401', 3, '09:00', '10:00'),
('English', 'Ms. Wilson', 'Room 102', 3, '10:00', '11:00'),
('Physics', 'Prof. Johnson', 'Lab 201', 3, '11:30', '12:15'),
('Chemistry', 'Dr. Brown', 'Lab 301', 3, '12:15', '13:00'),
('Mathematics', 'Dr. Smith', 'Room 101', 3, '13:00', '13:45'),

-- Class 10B - Wednesday
('Physics', 'Prof. Johnson', 'Lab 202', 3, '09:00', '10:00'),
('Mathematics', 'Dr. Smith', 'Room 104', 3, '10:00', '11:00'),
('Chemistry', 'Dr. Brown', 'Lab 302', 3, '11:30', '12:15'),
('English', 'Ms. Wilson', 'Room 103', 3, '12:15', '13:00'),
('Biology', 'Prof. Davis', 'Lab 402', 3, '13:00', '13:45'),

-- Thursday (Day 4) Classes
-- Class 10A - Thursday
('Chemistry', 'Dr. Brown', 'Lab 301', 4, '09:00', '10:00'),
('Mathematics', 'Dr. Smith', 'Room 101', 4, '10:00', '11:00'),
('English', 'Ms. Wilson', 'Room 102', 4, '11:30', '12:15'),
('Physics', 'Prof. Johnson', 'Lab 201', 4, '12:15', '13:00'),
('Biology', 'Prof. Davis', 'Lab 401', 4, '13:00', '13:45'),

-- Class 10B - Thursday
('Biology', 'Prof. Davis', 'Lab 402', 4, '09:00', '10:00'),
('English', 'Ms. Wilson', 'Room 103', 4, '10:00', '11:00'),
('Mathematics', 'Dr. Smith', 'Room 104', 4, '11:30', '12:15'),
('Chemistry', 'Dr. Brown', 'Lab 302', 4, '12:15', '13:00'),
('Physics', 'Prof. Johnson', 'Lab 202', 4, '13:00', '13:45'),

-- Friday (Day 5) Classes
-- Class 10A - Friday
('English', 'Ms. Wilson', 'Room 102', 5, '09:00', '10:00'),
('Biology', 'Prof. Davis', 'Lab 401', 5, '10:00', '11:00'),
('Mathematics', 'Dr. Smith', 'Room 101', 5, '11:30', '12:15'),
('Chemistry', 'Dr. Brown', 'Lab 301', 5, '12:15', '13:00'),
('Physics', 'Prof. Johnson', 'Lab 201', 5, '13:00', '13:45'),

-- Class 10B - Friday
('Mathematics', 'Dr. Smith', 'Room 104', 5, '09:00', '10:00'),
('Physics', 'Prof. Johnson', 'Lab 202', 5, '10:00', '11:00'),
('Biology', 'Prof. Davis', 'Lab 402', 5, '11:30', '12:15'),
('English', 'Ms. Wilson', 'Room 103', 5, '12:15', '13:00'),
('Chemistry', 'Dr. Brown', 'Lab 302', 5, '13:00', '13:45');