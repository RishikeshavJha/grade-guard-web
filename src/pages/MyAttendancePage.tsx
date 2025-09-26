import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const MyAttendancePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">My Attendance</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Attendance Record</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            View your attendance history and statistics.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyAttendancePage;