import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  FileText,
  QrCode,
  Upload,
  TrendingUp,
  Calendar,
  BarChart3,
  BookOpen,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DUMMY_DATA, getRecentNotes } from '@/data/dummyData';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Data from centralized dummy data
  const totalStudents = DUMMY_DATA.totalStudents;
  const presentToday = DUMMY_DATA.presentToday;
  const attendanceRate = DUMMY_DATA.attendanceRate;
  
  const recentUploads = getRecentNotes(3);

  const todayClasses = [
    { class: '10-A', subject: 'Mathematics', time: '09:00 AM', students: DUMMY_DATA.getClassSize('10-A'), status: 'completed' },
    { class: '10-B', subject: 'Mathematics', time: '11:00 AM', students: DUMMY_DATA.getClassSize('10-B'), status: 'upcoming' },
    { class: '11-A', subject: 'Mathematics', time: '02:00 PM', students: DUMMY_DATA.getClassSize('11-A'), status: 'upcoming' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'upcoming': return 'bg-warning text-warning-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Good morning, {user?.name}!</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          {user?.subject} Teacher • Ready to inspire minds today?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Button 
          onClick={() => navigate('/upload-notes')}
          className="h-20 md:h-20 bg-gradient-primary hover:opacity-90 flex-col gap-2 min-h-[44px]"
        >
          <Upload className="h-5 w-5 md:h-6 md:w-6" />
          <span className="text-xs md:text-sm">Upload Notes</span>
        </Button>
        <Button 
          onClick={() => navigate('/generate-qr')}
          variant="outline"
          className="h-20 md:h-20 flex-col gap-2 border-primary text-primary hover:bg-primary hover:text-white min-h-[44px]"
        >
          <QrCode className="h-5 w-5 md:h-6 md:w-6" />
          <span className="text-xs md:text-sm">Generate QR</span>
        </Button>
        <Button 
          onClick={() => navigate('/attendance-reports')}
          variant="outline"
          className="h-20 md:h-20 flex-col gap-2 min-h-[44px]"
        >
          <BarChart3 className="h-5 w-5 md:h-6 md:w-6" />
          <span className="text-xs md:text-sm">View Reports</span>
        </Button>
        <Button 
          onClick={() => navigate('/students')}
          variant="outline"
          className="h-20 md:h-20 flex-col gap-2 min-h-[44px]"
        >
          <Users className="h-5 w-5 md:h-6 md:w-6" />
          <span className="text-xs md:text-sm">Manage Students</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Across all your classes
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{attendanceRate}%</div>
            <div className="space-y-2">
              <Progress value={attendanceRate} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {presentToday} of {totalStudents} present
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notes Uploaded</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DUMMY_DATA.totalNotes}</div>
            <p className="text-xs text-muted-foreground">
              {DUMMY_DATA.notesThisWeek} uploaded this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayClasses.length}</div>
            <p className="text-xs text-muted-foreground">
              Next class in 2 hours
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Uploads */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Recent Uploads
            </CardTitle>
            <CardDescription>
              Your latest study materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUploads.map((upload) => (
                <div key={upload.id} className="flex items-start justify-between p-3 bg-accent/50 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">{upload.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {upload.subject}
                      </Badge>
                      <span>•</span>
                      <span>{upload.downloads} downloads</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{upload.date}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4 min-h-[44px]"
              onClick={() => navigate('/notes-management')}
            >
              Manage All Notes
            </Button>
          </CardContent>
        </Card>

        {/* Today's Classes */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Classes
            </CardTitle>
            <CardDescription>
              Your teaching schedule for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayClasses.map((class_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{class_.subject}</h4>
                    <p className="text-sm text-muted-foreground">
                      Class {class_.class} • {class_.students} students
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-medium">{class_.time}</p>
                    <Badge className={`text-xs ${getStatusColor(class_.status)}`}>
                      {class_.status === 'completed' ? 'Completed' : 'Upcoming'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4 min-h-[44px]"
              onClick={() => navigate('/timetable-scheduler')}
            >
              Manage Timetable
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;