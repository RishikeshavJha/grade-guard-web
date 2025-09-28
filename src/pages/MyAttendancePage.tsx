import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp, Clock, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DUMMY_DATA } from '@/data/dummyData';

const MyAttendancePage = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Get current student's attendance data
  const studentId = parseInt(user?.id || '1');
  const attendance = DUMMY_DATA.getStudentAttendance(studentId);
  
  // Generate weekly attendance pattern
  const weeklyData = [
    { day: 'Monday', status: 'Present', classes: 6, attended: 6 },
    { day: 'Tuesday', status: 'Present', classes: 6, attended: 5 },
    { day: 'Wednesday', status: 'Present', classes: 6, attended: 6 },
    { day: 'Thursday', status: 'Absent', classes: 6, attended: 0 },
    { day: 'Friday', status: 'Present', classes: 6, attended: 6 },
  ];

  const getStatusColor = (status: string) => {
    return status === 'Present' 
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">My Attendance</h1>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Attendance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getAttendanceColor(attendance.percentage)}`}>
              {attendance.percentage}%
            </div>
            <Progress value={attendance.percentage} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Days Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{attendance.daysPresent}</div>
            <p className="text-xs text-muted-foreground">out of {attendance.totalDays} days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Days Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{attendance.totalDays - attendance.daysPresent}</div>
            <p className="text-xs text-muted-foreground">Total absences</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Today's Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={getStatusColor(attendance.todayStatus)}>
              {attendance.todayStatus}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">Current status</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Attendance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            This Week's Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((day) => (
              <div key={day.day} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-20 font-medium">{day.day}</div>
                  <Badge className={getStatusColor(day.status)}>
                    {day.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {day.attended}/{day.classes} classes attended
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Attendance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Subject-wise Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {DUMMY_DATA.getTodaysTimetable().map((subject, index) => {
              const subjectAttendance = Math.floor(Math.random() * 20) + 80; // 80-100%
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="font-medium">{subject.subject}</div>
                    <div className="text-sm text-muted-foreground">
                      by {subject.teacher}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`font-semibold ${getAttendanceColor(subjectAttendance)}`}>
                      {subjectAttendance}%
                    </div>
                    <Progress value={subjectAttendance} className="w-24" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="font-medium p-2">{day}</div>
            ))}
            {Array.from({ length: 30 }, (_, i) => {
              const isPresent = Math.random() > 0.2; // 80% attendance rate
              const isToday = i === 15;
              return (
                <div 
                  key={i} 
                  className={`p-2 rounded ${
                    isToday ? 'bg-primary text-primary-foreground' :
                    isPresent ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span>Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
              <span>Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded"></div>
              <span>Today</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyAttendancePage;