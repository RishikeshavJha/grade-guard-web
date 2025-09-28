-- Add dummy timetables for all classes
INSERT INTO public.classes (subject, teacher_name, room_number, day_of_week, start_time, end_time) VALUES
-- Class 10-A Schedule
('Mathematics', 'Dr. Sarah Williams', 'A101', 1, '09:00', '09:50'),
('Physics', 'Prof. Michael Chen', 'B205', 1, '10:20', '11:10'),
('Chemistry', 'Dr. Emily Davis', 'C301', 1, '11:40', '12:30'),
('English', 'Ms. Jennifer Brown', 'A205', 1, '14:00', '14:50'),
('History', 'Mr. David Wilson', 'B102', 1, '15:20', '16:10'),

('English', 'Ms. Jennifer Brown', 'A205', 2, '09:00', '09:50'),
('Mathematics', 'Dr. Sarah Williams', 'A101', 2, '10:20', '11:10'),
('Biology', 'Dr. Lisa Garcia', 'C205', 2, '11:40', '12:30'),
('Chemistry', 'Dr. Emily Davis', 'C301', 2, '14:00', '14:50'),
('Physical Education', 'Coach Mark Taylor', 'Gym', 2, '15:20', '16:10'),

('Physics', 'Prof. Michael Chen', 'B205', 3, '09:00', '09:50'),
('History', 'Mr. David Wilson', 'B102', 3, '10:20', '11:10'),
('Mathematics', 'Dr. Sarah Williams', 'A101', 3, '11:40', '12:30'),
('Geography', 'Ms. Anna Martinez', 'A301', 3, '14:00', '14:50'),
('Art', 'Ms. Sophie Turner', 'Art Room', 3, '15:20', '16:10'),

('Biology', 'Dr. Lisa Garcia', 'C205', 4, '09:00', '09:50'),
('English', 'Ms. Jennifer Brown', 'A205', 4, '10:20', '11:10'),
('Geography', 'Ms. Anna Martinez', 'A301', 4, '11:40', '12:30'),
('Physics', 'Prof. Michael Chen', 'B205', 4, '14:00', '14:50'),
('Computer Science', 'Mr. Alex Johnson', 'Lab 1', 4, '15:20', '16:10'),

('Chemistry', 'Dr. Emily Davis', 'C301', 5, '09:00', '09:50'),
('Computer Science', 'Mr. Alex Johnson', 'Lab 1', 5, '10:20', '11:10'),
('Physical Education', 'Coach Mark Taylor', 'Gym', 5, '11:40', '12:30'),
('Art', 'Ms. Sophie Turner', 'Art Room', 5, '14:00', '14:50'),
('Mathematics', 'Dr. Sarah Williams', 'A101', 5, '15:20', '16:10'),

-- Class 10-B Schedule
('Physics', 'Prof. Robert Lee', 'B206', 1, '09:00', '09:50'),
('Mathematics', 'Dr. Maria Rodriguez', 'A102', 1, '10:20', '11:10'),
('English', 'Ms. Rachel Green', 'A206', 1, '11:40', '12:30'),
('Chemistry', 'Dr. James Anderson', 'C302', 1, '14:00', '14:50'),
('Biology', 'Dr. Karen White', 'C206', 1, '15:20', '16:10'),

('Chemistry', 'Dr. James Anderson', 'C302', 2, '09:00', '09:50'),
('Physics', 'Prof. Robert Lee', 'B206', 2, '10:20', '11:10'),
('Mathematics', 'Dr. Maria Rodriguez', 'A102', 2, '11:40', '12:30'),
('History', 'Mr. Steven Clark', 'B103', 2, '14:00', '14:50'),
('Geography', 'Ms. Linda Thompson', 'A302', 2, '15:20', '16:10'),

('English', 'Ms. Rachel Green', 'A206', 3, '09:00', '09:50'),
('Biology', 'Dr. Karen White', 'C206', 3, '10:20', '11:10'),
('Physical Education', 'Coach John Miller', 'Gym', 3, '11:40', '12:30'),
('Art', 'Ms. Emma Wilson', 'Art Room', 3, '14:00', '14:50'),
('Computer Science', 'Mr. Daniel Kim', 'Lab 2', 3, '15:20', '16:10'),

('Mathematics', 'Dr. Maria Rodriguez', 'A102', 4, '09:00', '09:50'),
('Geography', 'Ms. Linda Thompson', 'A302', 4, '10:20', '11:10'),
('English', 'Ms. Rachel Green', 'A206', 4, '11:40', '12:30'),
('Computer Science', 'Mr. Daniel Kim', 'Lab 2', 4, '14:00', '14:50'),
('Physics', 'Prof. Robert Lee', 'B206', 4, '15:20', '16:10'),

('Biology', 'Dr. Karen White', 'C206', 5, '09:00', '09:50'),
('Art', 'Ms. Emma Wilson', 'Art Room', 5, '10:20', '11:10'),
('History', 'Mr. Steven Clark', 'B103', 5, '11:40', '12:30'),
('Chemistry', 'Dr. James Anderson', 'C302', 5, '14:00', '14:50'),
('Physical Education', 'Coach John Miller', 'Gym', 5, '15:20', '16:10'),

-- Class 10-C Schedule  
('English', 'Ms. Ashley Moore', 'A207', 1, '09:00', '09:50'),
('Chemistry', 'Dr. Peter Jackson', 'C303', 1, '10:20', '11:10'),
('Mathematics', 'Dr. Susan Taylor', 'A103', 1, '11:40', '12:30'),
('Physics', 'Prof. Kevin Brown', 'B207', 1, '14:00', '14:50'),
('Geography', 'Ms. Nancy Davis', 'A303', 1, '15:20', '16:10'),

('Mathematics', 'Dr. Susan Taylor', 'A103', 2, '09:00', '09:50'),
('English', 'Ms. Ashley Moore', 'A207', 2, '10:20', '11:10'),
('Biology', 'Dr. Michelle Lee', 'C207', 2, '11:40', '12:30'),
('Art', 'Ms. Kelly Johnson', 'Art Room', 2, '14:00', '14:50'),
('History', 'Mr. Patrick Wilson', 'B104', 2, '15:20', '16:10'),

('Physics', 'Prof. Kevin Brown', 'B207', 3, '09:00', '09:50'),
('Geography', 'Ms. Nancy Davis', 'A303', 3, '10:20', '11:10'),
('Computer Science', 'Mr. Ryan Garcia', 'Lab 3', 3, '11:40', '12:30'),
('Chemistry', 'Dr. Peter Jackson', 'C303', 3, '14:00', '14:50'),
('Physical Education', 'Coach Sarah Anderson', 'Gym', 3, '15:20', '16:10'),

('Biology', 'Dr. Michelle Lee', 'C207', 4, '09:00', '09:50'),
('Art', 'Ms. Kelly Johnson', 'Art Room', 4, '10:20', '11:10'),
('Mathematics', 'Dr. Susan Taylor', 'A103', 4, '11:40', '12:30'),
('History', 'Mr. Patrick Wilson', 'B104', 4, '14:00', '14:50'),
('English', 'Ms. Ashley Moore', 'A207', 4, '15:20', '16:10'),

('Computer Science', 'Mr. Ryan Garcia', 'Lab 3', 5, '09:00', '09:50'),
('Physical Education', 'Coach Sarah Anderson', 'Gym', 5, '10:20', '11:10'),
('Physics', 'Prof. Kevin Brown', 'B207', 5, '11:40', '12:30'),
('Biology', 'Dr. Michelle Lee', 'C207', 5, '14:00', '14:50'),
('Geography', 'Ms. Nancy Davis', 'A303', 5, '15:20', '16:10'),

-- Class 11-A Schedule
('Advanced Mathematics', 'Dr. Rebecca Smith', 'A201', 1, '09:00', '09:50'),
('Advanced Physics', 'Prof. Thomas Wilson', 'B301', 1, '10:20', '11:10'),
('Advanced Chemistry', 'Dr. Jennifer Davis', 'C401', 1, '11:40', '12:30'),
('Literature', 'Ms. Laura Johnson', 'A301', 1, '14:00', '14:50'),
('World History', 'Mr. Christopher Lee', 'B201', 1, '15:20', '16:10'),

('Literature', 'Ms. Laura Johnson', 'A301', 2, '09:00', '09:50'),
('Advanced Mathematics', 'Dr. Rebecca Smith', 'A201', 2, '10:20', '11:10'),
('Advanced Biology', 'Dr. Amanda Martinez', 'C501', 2, '11:40', '12:30'),
('Advanced Chemistry', 'Dr. Jennifer Davis', 'C401', 2, '14:00', '14:50'),
('Economics', 'Mr. Robert Garcia', 'B202', 2, '15:20', '16:10'),

('Advanced Physics', 'Prof. Thomas Wilson', 'B301', 3, '09:00', '09:50'),
('World History', 'Mr. Christopher Lee', 'B201', 3, '10:20', '11:10'),
('Advanced Mathematics', 'Dr. Rebecca Smith', 'A201', 3, '11:40', '12:30'),
('Political Science', 'Ms. Diana Rodriguez', 'A401', 3, '14:00', '14:50'),
('Fine Arts', 'Ms. Isabella Thompson', 'Art Studio', 3, '15:20', '16:10'),

('Advanced Biology', 'Dr. Amanda Martinez', 'C501', 4, '09:00', '09:50'),
('Literature', 'Ms. Laura Johnson', 'A301', 4, '10:20', '11:10'),
('Political Science', 'Ms. Diana Rodriguez', 'A401', 4, '11:40', '12:30'),
('Advanced Physics', 'Prof. Thomas Wilson', 'B301', 4, '14:00', '14:50'),
('Programming', 'Mr. Nathan Kim', 'Tech Lab', 4, '15:20', '16:10'),

('Advanced Chemistry', 'Dr. Jennifer Davis', 'C401', 5, '09:00', '09:50'),
('Programming', 'Mr. Nathan Kim', 'Tech Lab', 5, '10:20', '11:10'),
('Economics', 'Mr. Robert Garcia', 'B202', 5, '11:40', '12:30'),
('Fine Arts', 'Ms. Isabella Thompson', 'Art Studio', 5, '14:00', '14:50'),
('Advanced Mathematics', 'Dr. Rebecca Smith', 'A201', 5, '15:20', '16:10'),

-- Class 11-B Schedule  
('Advanced Physics', 'Prof. George Anderson', 'B302', 1, '09:00', '09:50'),
('Advanced Mathematics', 'Dr. Catherine White', 'A202', 1, '10:20', '11:10'),
('Literature', 'Ms. Victoria Brown', 'A302', 1, '11:40', '12:30'),
('Advanced Chemistry', 'Dr. Matthew Clark', 'C402', 1, '14:00', '14:50'),
('Advanced Biology', 'Dr. Samantha Miller', 'C502', 1, '15:20', '16:10'),

('Advanced Chemistry', 'Dr. Matthew Clark', 'C402', 2, '09:00', '09:50'),
('Advanced Physics', 'Prof. George Anderson', 'B302', 2, '10:20', '11:10'),
('Advanced Mathematics', 'Dr. Catherine White', 'A202', 2, '11:40', '12:30'),
('World History', 'Mr. Timothy Davis', 'B203', 2, '14:00', '14:50'),
('Political Science', 'Ms. Elizabeth Wilson', 'A402', 2, '15:20', '16:10'),

('Literature', 'Ms. Victoria Brown', 'A302', 3, '09:00', '09:50'),
('Advanced Biology', 'Dr. Samantha Miller', 'C502', 3, '10:20', '11:10'),
('Economics', 'Mr. Andrew Taylor', 'B204', 3, '11:40', '12:30'),
('Fine Arts', 'Ms. Olivia Martinez', 'Art Studio', 3, '14:00', '14:50'),
('Programming', 'Mr. Brian Thompson', 'Tech Lab', 3, '15:20', '16:10'),

('Advanced Mathematics', 'Dr. Catherine White', 'A202', 4, '09:00', '09:50'),
('Political Science', 'Ms. Elizabeth Wilson', 'A402', 4, '10:20', '11:10'),
('Literature', 'Ms. Victoria Brown', 'A302', 4, '11:40', '12:30'),
('Programming', 'Mr. Brian Thompson', 'Tech Lab', 4, '14:00', '14:50'),
('Advanced Physics', 'Prof. George Anderson', 'B302', 4, '15:20', '16:10'),

('Advanced Biology', 'Dr. Samantha Miller', 'C502', 5, '09:00', '09:50'),
('Fine Arts', 'Ms. Olivia Martinez', 'Art Studio', 5, '10:20', '11:10'),
('World History', 'Mr. Timothy Davis', 'B203', 5, '11:40', '12:30'),
('Advanced Chemistry', 'Dr. Matthew Clark', 'C402', 5, '14:00', '14:50'),
('Economics', 'Mr. Andrew Taylor', 'B204', 5, '15:20', '16:10');