import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const AttendanceReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Attendance Reports</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Student Attendance Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            View detailed attendance reports and analytics.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceReportsPage;