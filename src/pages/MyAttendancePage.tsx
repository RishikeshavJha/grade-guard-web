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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold">My Attendance</h1>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
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
          <div className="space-y-3 sm:space-y-4">
            {weeklyData.map((day) => (
              <div key={day.day} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg gap-2 sm:gap-0">
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <div className="w-20 font-medium text-sm sm:text-base">{day.day}</div>
                  <Badge className={`${getStatusColor(day.status)} text-xs`}>
                    {day.status}
                  </Badge>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
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
          <div className="space-y-3 sm:space-y-4">
            {DUMMY_DATA.getTodaysTimetable('10-A').map((subject, index) => {
              const subjectAttendance = Math.floor(Math.random() * 20) + 80; // 80-100%
              return (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg gap-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 w-full sm:w-auto">
                    <div className="font-medium text-sm sm:text-base">{subject.subject}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      by {subject.teacher}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <div className={`font-semibold text-sm sm:text-base ${getAttendanceColor(subjectAttendance)}`}>
                      {subjectAttendance}%
                    </div>
                    <Progress value={subjectAttendance} className="w-20 sm:w-24" />
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
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs sm:text-sm">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="font-medium p-1 sm:p-2">{day}</div>
            ))}
            {Array.from({ length: 30 }, (_, i) => {
              const isPresent = Math.random() > 0.2; // 80% attendance rate
              const isToday = i === 15;
              return (
                <div 
                  key={i} 
                  className={`p-1 sm:p-2 rounded ${
                    isToday ? 'bg-primary text-primary-foreground' :
                    isPresent ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-100 border border-green-200 rounded"></div>
              <span>Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-100 border border-red-200 rounded"></div>
              <span>Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded"></div>
              <span>Today</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyAttendancePage;