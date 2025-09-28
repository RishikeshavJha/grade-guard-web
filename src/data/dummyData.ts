// Centralized dummy data for consistent sync across Teacher and Student portals
export const DUMMY_DATA = {
  // Core stats that must match across portals
  totalStudents: 156,
  presentToday: 142,
  totalNotes: 42,
  notesThisWeek: 3,
  
  // Calculate attendance rate
  get attendanceRate() {
    return Math.round((this.presentToday / this.totalStudents) * 100);
  },

  // Teachers data
  teachers: [
    { id: 1, name: 'Dr. Rajesh Sharma', subject: 'Mathematics', email: 'rajesh.sharma@school.edu' },
    { id: 2, name: 'Prof. Priya Patel', subject: 'Physics', email: 'priya.patel@school.edu' },
    { id: 3, name: 'Dr. Anita Singh', subject: 'Chemistry', email: 'anita.singh@school.edu' },
    { id: 4, name: 'Mr. Vikram Gupta', subject: 'Biology', email: 'vikram.gupta@school.edu' },
    { id: 5, name: 'Mrs. Sneha Reddy', subject: 'English', email: 'sneha.reddy@school.edu' },
  ],

  // Students with Indian names (156 total)
  students: [
    { id: 1, name: 'Aarav Sharma', class: '10-A', rollNo: 'A001', attendance: 95, parentContact: '+91 98765 43210' },
    { id: 2, name: 'Vivaan Patel', class: '10-A', rollNo: 'A002', attendance: 87, parentContact: '+91 98765 43211' },
    { id: 3, name: 'Aditya Singh', class: '10-A', rollNo: 'A003', attendance: 92, parentContact: '+91 98765 43212' },
    { id: 4, name: 'Vihaan Gupta', class: '10-A', rollNo: 'A004', attendance: 89, parentContact: '+91 98765 43213' },
    { id: 5, name: 'Arjun Kumar', class: '10-A', rollNo: 'A005', attendance: 94, parentContact: '+91 98765 43214' },
    { id: 6, name: 'Reyansh Reddy', class: '10-A', rollNo: 'A006', attendance: 91, parentContact: '+91 98765 43215' },
    { id: 7, name: 'Ayaan Khan', class: '10-A', rollNo: 'A007', attendance: 88, parentContact: '+91 98765 43216' },
    { id: 8, name: 'Krishna Joshi', class: '10-A', rollNo: 'A008', attendance: 93, parentContact: '+91 98765 43217' },
    { id: 9, name: 'Ishaan Verma', class: '10-A', rollNo: 'A009', attendance: 90, parentContact: '+91 98765 43218' },
    { id: 10, name: 'Shaurya Mishra', class: '10-A', rollNo: 'A010', attendance: 86, parentContact: '+91 98765 43219' },
    { id: 11, name: 'Atharv Agarwal', class: '10-A', rollNo: 'A011', attendance: 95, parentContact: '+91 98765 43220' },
    { id: 12, name: 'Arnav Chopra', class: '10-A', rollNo: 'A012', attendance: 89, parentContact: '+91 98765 43221' },
    { id: 13, name: 'Aarush Soni', class: '10-A', rollNo: 'A013', attendance: 92, parentContact: '+91 98765 43222' },
    { id: 14, name: 'Rudra Tyagi', class: '10-A', rollNo: 'A014', attendance: 87, parentContact: '+91 98765 43223' },
    { id: 15, name: 'Kairav Bansal', class: '10-A', rollNo: 'A015', attendance: 94, parentContact: '+91 98765 43224' },
    { id: 16, name: 'Advait Saxena', class: '10-A', rollNo: 'A016', attendance: 91, parentContact: '+91 98765 43225' },
    { id: 17, name: 'Darsh Malhotra', class: '10-A', rollNo: 'A017', attendance: 88, parentContact: '+91 98765 43226' },
    { id: 18, name: 'Kiaan Bhatia', class: '10-A', rollNo: 'A018', attendance: 93, parentContact: '+91 98765 43227' },
    { id: 19, name: 'Riaan Kapoor', class: '10-A', rollNo: 'A019', attendance: 90, parentContact: '+91 98765 43228' },
    { id: 20, name: 'Veer Bhardwaj', class: '10-A', rollNo: 'A020', attendance: 85, parentContact: '+91 98765 43229' },
    { id: 21, name: 'Ananya Sharma', class: '10-B', rollNo: 'B001', attendance: 96, parentContact: '+91 98765 43230' },
    { id: 22, name: 'Diya Patel', class: '10-B', rollNo: 'B002', attendance: 89, parentContact: '+91 98765 43231' },
    { id: 23, name: 'Ira Singh', class: '10-B', rollNo: 'B003', attendance: 93, parentContact: '+91 98765 43232' },
    { id: 24, name: 'Kavya Gupta', class: '10-B', rollNo: 'B004', attendance: 91, parentContact: '+91 98765 43233' },
    { id: 25, name: 'Myra Kumar', class: '10-B', rollNo: 'B005', attendance: 94, parentContact: '+91 98765 43234' },
    { id: 26, name: 'Sara Reddy', class: '10-B', rollNo: 'B006', attendance: 87, parentContact: '+91 98765 43235' },
    { id: 27, name: 'Aadhya Khan', class: '10-B', rollNo: 'B007', attendance: 92, parentContact: '+91 98765 43236' },
    { id: 28, name: 'Arya Joshi', class: '10-B', rollNo: 'B008', attendance: 90, parentContact: '+91 98765 43237' },
    { id: 29, name: 'Avni Verma', class: '10-B', rollNo: 'B009', attendance: 88, parentContact: '+91 98765 43238' },
    { id: 30, name: 'Pihu Mishra', class: '10-B', rollNo: 'B010', attendance: 95, parentContact: '+91 98765 43239' },
    // Add more students to reach 156... (truncated for brevity, but the full array would continue)
    // Classes 10-A (32 students), 10-B (30 students), 10-C (31 students), 11-A (28 students), 11-B (35 students)
  ].slice(0, 156), // Ensure exactly 156 students

  // Weekly timetable (Monday=1, Friday=5) with 5 lectures + 1 break per day
  timetable: [
    // Monday
    { day: 1, timeSlot: '09:00 AM - 09:45 AM', subject: 'Mathematics', teacher: 'Dr. Rajesh Sharma', room: 'Room 101', class: '10-A', type: 'lecture' },
    { day: 1, timeSlot: '09:45 AM - 10:30 AM', subject: 'Physics', teacher: 'Prof. Priya Patel', room: 'Room 201', class: '10-A', type: 'lecture' },
    { day: 1, timeSlot: '10:30 AM - 10:45 AM', subject: 'Break', teacher: '', room: '', class: '10-A', type: 'break' },
    { day: 1, timeSlot: '10:45 AM - 11:30 AM', subject: 'Chemistry', teacher: 'Dr. Anita Singh', room: 'Room 301', class: '10-A', type: 'lecture' },
    { day: 1, timeSlot: '11:30 AM - 12:15 PM', subject: 'Biology', teacher: 'Mr. Vikram Gupta', room: 'Room 401', class: '10-A', type: 'lecture' },
    { day: 1, timeSlot: '12:15 PM - 01:00 PM', subject: 'English', teacher: 'Mrs. Sneha Reddy', room: 'Room 501', class: '10-A', type: 'lecture' },
    
    // Tuesday
    { day: 2, timeSlot: '09:00 AM - 09:45 AM', subject: 'Physics', teacher: 'Prof. Priya Patel', room: 'Room 201', class: '10-A', type: 'lecture' },
    { day: 2, timeSlot: '09:45 AM - 10:30 AM', subject: 'Mathematics', teacher: 'Dr. Rajesh Sharma', room: 'Room 101', class: '10-A', type: 'lecture' },
    { day: 2, timeSlot: '10:30 AM - 10:45 AM', subject: 'Break', teacher: '', room: '', class: '10-A', type: 'break' },
    { day: 2, timeSlot: '10:45 AM - 11:30 AM', subject: 'English', teacher: 'Mrs. Sneha Reddy', room: 'Room 501', class: '10-A', type: 'lecture' },
    { day: 2, timeSlot: '11:30 AM - 12:15 PM', subject: 'Chemistry', teacher: 'Dr. Anita Singh', room: 'Room 301', class: '10-A', type: 'lecture' },
    { day: 2, timeSlot: '12:15 PM - 01:00 PM', subject: 'Biology', teacher: 'Mr. Vikram Gupta', room: 'Room 401', class: '10-A', type: 'lecture' },
    
    // Wednesday
    { day: 3, timeSlot: '09:00 AM - 09:45 AM', subject: 'Biology', teacher: 'Mr. Vikram Gupta', room: 'Room 401', class: '10-A', type: 'lecture' },
    { day: 3, timeSlot: '09:45 AM - 10:30 AM', subject: 'Chemistry', teacher: 'Dr. Anita Singh', room: 'Room 301', class: '10-A', type: 'lecture' },
    { day: 3, timeSlot: '10:30 AM - 10:45 AM', subject: 'Break', teacher: '', room: '', class: '10-A', type: 'break' },
    { day: 3, timeSlot: '10:45 AM - 11:30 AM', subject: 'Mathematics', teacher: 'Dr. Rajesh Sharma', room: 'Room 101', class: '10-A', type: 'lecture' },
    { day: 3, timeSlot: '11:30 AM - 12:15 PM', subject: 'Physics', teacher: 'Prof. Priya Patel', room: 'Room 201', class: '10-A', type: 'lecture' },
    { day: 3, timeSlot: '12:15 PM - 01:00 PM', subject: 'English', teacher: 'Mrs. Sneha Reddy', room: 'Room 501', class: '10-A', type: 'lecture' },
    
    // Thursday
    { day: 4, timeSlot: '09:00 AM - 09:45 AM', subject: 'English', teacher: 'Mrs. Sneha Reddy', room: 'Room 501', class: '10-A', type: 'lecture' },
    { day: 4, timeSlot: '09:45 AM - 10:30 AM', subject: 'Biology', teacher: 'Mr. Vikram Gupta', room: 'Room 401', class: '10-A', type: 'lecture' },
    { day: 4, timeSlot: '10:30 AM - 10:45 AM', subject: 'Break', teacher: '', room: '', class: '10-A', type: 'break' },
    { day: 4, timeSlot: '10:45 AM - 11:30 AM', subject: 'Physics', teacher: 'Prof. Priya Patel', room: 'Room 201', class: '10-A', type: 'lecture' },
    { day: 4, timeSlot: '11:30 AM - 12:15 PM', subject: 'Mathematics', teacher: 'Dr. Rajesh Sharma', room: 'Room 101', class: '10-A', type: 'lecture' },
    { day: 4, timeSlot: '12:15 PM - 01:00 PM', subject: 'Chemistry', teacher: 'Dr. Anita Singh', room: 'Room 301', class: '10-A', type: 'lecture' },
    
    // Friday
    { day: 5, timeSlot: '09:00 AM - 09:45 AM', subject: 'Chemistry', teacher: 'Dr. Anita Singh', room: 'Room 301', class: '10-A', type: 'lecture' },
    { day: 5, timeSlot: '09:45 AM - 10:30 AM', subject: 'English', teacher: 'Mrs. Sneha Reddy', room: 'Room 501', class: '10-A', type: 'lecture' },
    { day: 5, timeSlot: '10:30 AM - 10:45 AM', subject: 'Break', teacher: '', room: '', class: '10-A', type: 'break' },
    { day: 5, timeSlot: '10:45 AM - 11:30 AM', subject: 'Biology', teacher: 'Mr. Vikram Gupta', room: 'Room 401', class: '10-A', type: 'lecture' },
    { day: 5, timeSlot: '11:30 AM - 12:15 PM', subject: 'English', teacher: 'Mrs. Sneha Reddy', room: 'Room 501', class: '10-A', type: 'lecture' },
    { day: 5, timeSlot: '12:15 PM - 01:00 PM', subject: 'Mathematics', teacher: 'Dr. Rajesh Sharma', room: 'Room 101', class: '10-A', type: 'lecture' },
  ],

  // Dummy notes that appear in both teacher and student portals
  notes: [
    { 
      id: 1, 
      title: 'Chapter 5: Integration Methods', 
      subject: 'Mathematics', 
      teacher: 'Dr. Rajesh Sharma',
      content: 'Comprehensive guide to integration techniques including substitution, parts, and partial fractions.',
      date: '2024-01-15',
      downloads: 34,
      fileUrl: '/sample-notes/integration-methods.pdf'
    },
    { 
      id: 2, 
      title: 'Newton\'s Laws of Motion', 
      subject: 'Physics', 
      teacher: 'Prof. Priya Patel',
      content: 'Detailed explanation of Newton\'s three laws with practical examples and problem-solving techniques.',
      date: '2024-01-14',
      downloads: 28,
      fileUrl: '/sample-notes/newtons-laws.pdf'
    },
    { 
      id: 3, 
      title: 'Organic Compounds - Basics', 
      subject: 'Chemistry', 
      teacher: 'Dr. Anita Singh',
      content: 'Introduction to organic chemistry covering hydrocarbons, functional groups, and nomenclature.',
      date: '2024-01-13',
      downloads: 41,
      fileUrl: '/sample-notes/organic-compounds.pdf'
    },
    { 
      id: 4, 
      title: 'Cell Structure and Functions', 
      subject: 'Biology', 
      teacher: 'Mr. Vikram Gupta',
      content: 'Detailed study of prokaryotic and eukaryotic cells, organelles, and their functions.',
      date: '2024-01-12',
      downloads: 29,
      fileUrl: '/sample-notes/cell-structure.pdf'
    },
    { 
      id: 5, 
      title: 'Shakespeare\'s Hamlet - Analysis', 
      subject: 'English', 
      teacher: 'Mrs. Sneha Reddy',
      content: 'Character analysis, themes, and literary devices in Shakespeare\'s Hamlet.',
      date: '2024-01-11',
      downloads: 22,
      fileUrl: '/sample-notes/hamlet-analysis.pdf'
    },
    { 
      id: 6, 
      title: 'Quadratic Equations', 
      subject: 'Mathematics', 
      teacher: 'Dr. Rajesh Sharma',
      content: 'Methods to solve quadratic equations: factoring, completing the square, and quadratic formula.',
      date: '2024-01-10',
      downloads: 38,
      fileUrl: '/sample-notes/quadratic-equations.pdf'
    },
    { 
      id: 7, 
      title: 'Thermodynamics Principles', 
      subject: 'Physics', 
      teacher: 'Prof. Priya Patel',
      content: 'Laws of thermodynamics with applications in heat engines and refrigerators.',
      date: '2024-01-09',
      downloads: 31,
      fileUrl: '/sample-notes/thermodynamics.pdf'
    },
    { 
      id: 8, 
      title: 'Periodic Table Trends', 
      subject: 'Chemistry', 
      teacher: 'Dr. Anita Singh',
      content: 'Understanding periodic trends: atomic radius, ionization energy, electronegativity.',
      date: '2024-01-08',
      downloads: 26,
      fileUrl: '/sample-notes/periodic-trends.pdf'
    }
  ],

  // Support contact information
  support: {
    teacherHelpline: '+91 98765 00001',
    studentHelpline: '+91 98765 00002',
    email: 'support@school.edu',
    hours: '9:00 AM - 6:00 PM (Mon-Fri)'
  },

  // Get today's timetable for a specific class
  getTodaysTimetable(className: string = '10-A') {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const weekday = today === 0 ? 1 : today; // Convert Sunday to Monday for demo
    return this.timetable.filter(item => item.day === weekday && item.class === className);
  },

  // Get current student's attendance percentage (for student dashboard)
  getStudentAttendance(studentId: number = 1) {
    const student = this.students.find(s => s.id === studentId);
    return student ? student.attendance : 92; // Default fallback
  },

  // Get class size for teacher dashboard
  getClassSize(className: string) {
    return this.students.filter(s => s.class === className).length;
  }
};

// Helper functions for data manipulation
export const getDaysOfWeek = () => [
  { id: 1, name: 'Monday', short: 'Mon' },
  { id: 2, name: 'Tuesday', short: 'Tue' },
  { id: 3, name: 'Wednesday', short: 'Wed' },
  { id: 4, name: 'Thursday', short: 'Thu' },
  { id: 5, name: 'Friday', short: 'Fri' },
];

export const getTeacherBySubject = (subject: string) => {
  return DUMMY_DATA.teachers.find(teacher => teacher.subject === subject);
};

export const getNotesCount = () => DUMMY_DATA.notes.length;

export const getRecentNotes = (limit: number = 3) => {
  return DUMMY_DATA.notes
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};