import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const TimetableSchedulerPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Timetable Scheduler</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Schedule Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Create and manage class schedules and timetables.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimetableSchedulerPage;