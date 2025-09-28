// Centralized dummy data for the entire school management system
export const DUMMY_DATA = {
  // Total counts for dashboard stats
  totalStudents: 156,
  totalTeachers: 12,
  totalNotes: 24,
  notesThisWeek: 7,
  
  // Teachers data
  teachers: [
    { id: 1, name: 'Dr. Ramesh Kumar', subject: 'Mathematics', email: 'ramesh.kumar@school.edu' },
    { id: 2, name: 'Prof. Sunita Sharma', subject: 'Physics', email: 'sunita.sharma@school.edu' },
    { id: 3, name: 'Dr. Anjali Patel', subject: 'Chemistry', email: 'anjali.patel@school.edu' },
    { id: 4, name: 'Mrs. Kavita Singh', subject: 'Biology', email: 'kavita.singh@school.edu' },
    { id: 5, name: 'Mr. Arjun Mehta', subject: 'English', email: 'arjun.mehta@school.edu' },
  ],

  // Students data with Indian names and attendance details
  students: [
    { id: 1, name: 'Aarav Sharma', class: '10-A', rollNo: 'A001', attendance: 92, email: 'aarav.sharma@student.edu', parentContact: '+91 98765 12001' },
    { id: 2, name: 'Ananya Gupta', class: '10-A', rollNo: 'A002', attendance: 95, email: 'ananya.gupta@student.edu', parentContact: '+91 98765 12002' },
    { id: 3, name: 'Arjun Singh', class: '10-A', rollNo: 'A003', attendance: 88, email: 'arjun.singh@student.edu', parentContact: '+91 98765 12003' },
    { id: 4, name: 'Diya Patel', class: '10-A', rollNo: 'A004', attendance: 97, email: 'diya.patel@student.edu', parentContact: '+91 98765 12004' },
    { id: 5, name: 'Ishaan Kumar', class: '10-A', rollNo: 'A005', attendance: 91, email: 'ishaan.kumar@student.edu', parentContact: '+91 98765 12005' },
    { id: 6, name: 'Kavya Mehta', class: '10-A', rollNo: 'A006', attendance: 93, email: 'kavya.mehta@student.edu', parentContact: '+91 98765 12006' },
    { id: 7, name: 'Krishna Agarwal', class: '10-A', rollNo: 'A007', attendance: 89, email: 'krishna.agarwal@student.edu', parentContact: '+91 98765 12007' },
    { id: 8, name: 'Meera Joshi', class: '10-A', rollNo: 'A008', attendance: 94, email: 'meera.joshi@student.edu', parentContact: '+91 98765 12008' },
    { id: 9, name: 'Nisha Reddy', class: '10-A', rollNo: 'A009', attendance: 96, email: 'nisha.reddy@student.edu', parentContact: '+91 98765 12009' },
    { id: 10, name: 'Pranav Chopra', class: '10-A', rollNo: 'A010', attendance: 87, email: 'pranav.chopra@student.edu', parentContact: '+91 98765 12010' },
  ],

  // Notes/Study Materials
  notes: [
    { 
      id: 1, 
      title: 'Algebra Fundamentals', 
      subject: 'Mathematics', 
      teacher: 'Dr. Ramesh Kumar',
      content: 'Basic algebraic operations, equations, and inequalities with practical examples.',
      date: '2024-01-15',
      downloads: 45,
      fileUrl: '/sample-notes/algebra-fundamentals.pdf'
    },
    { 
      id: 2, 
      title: 'Newton\'s Laws of Motion', 
      subject: 'Physics', 
      teacher: 'Prof. Sunita Sharma',
      content: 'Comprehensive study of Newton\'s three laws with real-world applications.',
      date: '2024-01-14',
      downloads: 32,
      fileUrl: '/sample-notes/newtons-laws.pdf'
    },
    { 
      id: 3, 
      title: 'Organic Chemistry Basics', 
      subject: 'Chemistry', 
      teacher: 'Dr. Anjali Patel',
      content: 'Introduction to organic compounds, nomenclature, and basic reactions.',
      date: '2024-01-13',
      downloads: 28,
      fileUrl: '/sample-notes/organic-chemistry.pdf'
    },
    { 
      id: 4, 
      title: 'Cell Structure and Function', 
      subject: 'Biology', 
      teacher: 'Mrs. Kavita Singh',
      content: 'Detailed study of prokaryotic and eukaryotic cells with diagrams.',
      date: '2024-01-12',
      downloads: 41,
      fileUrl: '/sample-notes/cell-biology.pdf'
    },
    { 
      id: 5, 
      title: 'Shakespeare\'s Hamlet', 
      subject: 'English', 
      teacher: 'Mr. Arjun Mehta',
      content: 'Character analysis and themes in Hamlet with critical perspectives.',
      date: '2024-01-11',
      downloads: 22,
      fileUrl: '/sample-notes/hamlet-analysis.pdf'
    },
  ],

  // Timetable for different classes
  timetable: [
    // Monday (Day 1)
    { id: 1, class: '10-A', day: 1, timeSlot: '09:00 AM - 09:45 AM', subject: 'Mathematics', teacher: 'Dr. Ramesh Kumar', room: 'Room 101', type: 'lecture' },
    { id: 2, class: '10-A', day: 1, timeSlot: '09:45 AM - 10:30 AM', subject: 'Physics', teacher: 'Prof. Sunita Sharma', room: 'Lab 201', type: 'lecture' },
    { id: 3, class: '10-A', day: 1, timeSlot: '10:30 AM - 11:00 AM', subject: 'Break', teacher: '', room: '', type: 'break' },
    { id: 4, class: '10-A', day: 1, timeSlot: '11:00 AM - 11:45 AM', subject: 'Chemistry', teacher: 'Dr. Anjali Patel', room: 'Lab 202', type: 'lecture' },
    { id: 5, class: '10-A', day: 1, timeSlot: '11:45 AM - 12:30 PM', subject: 'Biology', teacher: 'Mrs. Kavita Singh', room: 'Room 103', type: 'lecture' },
    { id: 6, class: '10-A', day: 1, timeSlot: '12:30 PM - 01:15 PM', subject: 'English', teacher: 'Mr. Arjun Mehta', room: 'Room 104', type: 'lecture' },

    // Tuesday (Day 2)
    { id: 7, class: '10-A', day: 2, timeSlot: '09:00 AM - 09:45 AM', subject: 'English', teacher: 'Mr. Arjun Mehta', room: 'Room 104', type: 'lecture' },
    { id: 8, class: '10-A', day: 2, timeSlot: '09:45 AM - 10:30 AM', subject: 'Mathematics', teacher: 'Dr. Ramesh Kumar', room: 'Room 101', type: 'lecture' },
    { id: 9, class: '10-A', day: 2, timeSlot: '10:30 AM - 11:00 AM', subject: 'Break', teacher: '', room: '', type: 'break' },
    { id: 10, class: '10-A', day: 2, timeSlot: '11:00 AM - 11:45 AM', subject: 'Physics', teacher: 'Prof. Sunita Sharma', room: 'Lab 201', type: 'lecture' },
    { id: 11, class: '10-A', day: 2, timeSlot: '11:45 AM - 12:30 PM', subject: 'Chemistry', teacher: 'Dr. Anjali Patel', room: 'Lab 202', type: 'lecture' },
    { id: 12, class: '10-A', day: 2, timeSlot: '12:30 PM - 01:15 PM', subject: 'Biology', teacher: 'Mrs. Kavita Singh', room: 'Room 103', type: 'lecture' },
  ],

  // Support contact information
  support: {
    teacherHelpline: '+91 98765 00001',
    studentHelpline: '+91 98765 00002',
    email: 'support@school.edu',
    hours: '9:00 AM - 6:00 PM (Mon-Fri)'
  },

  // Attendance stats for today
  presentToday: 142,
  attendanceRate: 91,

  // Class sizes for different sections
  getClassSize: (className: string) => {
    const classSizes = {
      '10-A': 32,
      '10-B': 30,
      '10-C': 31,
      '11-A': 28,
      '11-B': 29
    };
    return classSizes[className as keyof typeof classSizes] || 30;
  },

  // Get today's timetable for a specific class
  getTodaysTimetable: (className: string) => {
    const today = new Date().getDay();
    const currentDay = today === 0 ? 7 : today; // Convert Sunday to 7
    return DUMMY_DATA.timetable.filter(item => item.day === currentDay && item.class === className);
  },

  // Get attendance for a specific student with detailed info
  getStudentAttendance: (studentId: number) => {
    const student = DUMMY_DATA.students.find(s => s.id === studentId);
    const attendance = student ? student.attendance : 90;
    const totalDays = 45;
    const daysPresent = Math.round((attendance / 100) * totalDays);
    return {
      percentage: attendance,
      daysPresent: daysPresent,
      totalDays: totalDays,
      todayStatus: 'Present' as const
    };
  },

  // Calculate overall attendance stats
  getAttendanceStats: () => {
    const totalStudents = DUMMY_DATA.totalStudents;
    const presentToday = Math.floor(totalStudents * 0.91); // 91% attendance
    return {
      total: totalStudents,
      present: presentToday,
      absent: totalStudents - presentToday,
      percentage: Math.round((presentToday / totalStudents) * 100)
    };
  }
};

// Helper functions
export const getDaysOfWeek = () => [
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tuesday' },
  { id: 3, name: 'Wednesday' },
  { id: 4, name: 'Thursday' },
  { id: 5, name: 'Friday' }
];

export const getNotesCount = () => DUMMY_DATA.notes.length;

export const getRecentNotes = (count: number = 5) => {
  return DUMMY_DATA.notes.slice(0, count);
};

export const getAttendanceForDate = (date: string) => {
  // Simulate attendance data for a specific date
  return DUMMY_DATA.students.map(student => ({
    ...student,
    status: Math.random() > 0.1 ? 'present' : 'absent' // 90% attendance rate
  }));
};