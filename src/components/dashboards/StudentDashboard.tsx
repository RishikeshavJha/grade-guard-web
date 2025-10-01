import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Calendar,
  QrCode,
  TrendingUp,
  Clock,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DUMMY_DATA, getRecentNotes } from '@/data/dummyData';
import { useTimetable } from '@/contexts/TimetableContext';
import { QRScannerDialog } from '@/components/QRScannerDialog';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getTodaysTimetable } = useTimetable();
  const [qrScannerOpen, setQrScannerOpen] = useState(false);

  // Data from centralized dummy data and timetable context
  const attendanceData = DUMMY_DATA.getStudentAttendance(1);
  const attendancePercentage = attendanceData.percentage;
  const totalClasses = attendanceData.totalDays;
  const attendedClasses = attendanceData.daysPresent;
  const recentNotes = getRecentNotes(3);
  const todaysClasses = getTodaysTimetable('10-A').filter(item => item.type === 'lecture');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">
          Class {user?.class} • Student ID: {user?.studentId}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{attendancePercentage}%</div>
            <div className="space-y-2">
              <Progress value={attendancePercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {attendedClasses} of {totalClasses} classes attended
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notes Available</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DUMMY_DATA.totalNotes}</div>
            <p className="text-xs text-muted-foreground">
              {DUMMY_DATA.notesThisWeek} new notes this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysClasses.length}</div>
            <p className="text-xs text-muted-foreground">
              {todaysClasses.length > 0 ? 'Next class soon' : 'No classes today'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Scan</CardTitle>
            <QrCode className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setQrScannerOpen(true)}
              className="w-full bg-gradient-primary hover:opacity-90"
              size="sm"
            >
              Scan QR Code
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notes */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Notes
            </CardTitle>
            <CardDescription>
              Latest study materials from your teachers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotes.map((note) => (
                <div key={note.id} className="flex items-start justify-between p-3 bg-accent/50 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">{note.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {note.subject}
                      </Badge>
                      <span>•</span>
                      <span>{note.teacher}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{note.date}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => navigate('/notes')}
            >
              View All Notes
            </Button>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>
              Your classes for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysClasses.map((class_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{class_.subject}</h4>
                    <p className="text-sm text-muted-foreground">{class_.teacher}</p>
                    <p className="text-xs text-muted-foreground">{class_.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{class_.timeSlot}</p>
                    <Badge variant="outline" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Scheduled
                    </Badge>
                  </div>
                </div>
              ))}
              {todaysClasses.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No classes scheduled for today</p>
              )}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => navigate('/timetable')}
            >
              View Full Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      <QRScannerDialog open={qrScannerOpen} onOpenChange={setQrScannerOpen} />
    </div>
  );
};

export default StudentDashboard;