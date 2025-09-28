import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, MapPin } from 'lucide-react';
import { useTimetable } from '@/contexts/TimetableContext';
import { getDaysOfWeek } from '@/data/dummyData';

const TimetablePage = () => {
  const { getTimetableForDay } = useTimetable();
  const daysOfWeek = getDaysOfWeek();

  const getClassesForDay = (dayId: number) => {
    // Get timetable for student's class (10-A by default)
    return getTimetableForDay(dayId, '10-A');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Weekly Timetable</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {daysOfWeek.map((day) => {
          const dayClasses = getClassesForDay(day.id);
          
          return (
            <Card key={day.id} className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-center">{day.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dayClasses.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No classes scheduled
                    </p>
                  ) : (
                    dayClasses.map((cls) => (
                      <Card key={cls.id} className={`border border-border/50 ${
                        cls.type === 'break' 
                          ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20' 
                          : 'bg-background'
                      }`}>
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">
                              {cls.subject || 'Break'}
                            </h4>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{cls.timeSlot}</span>
                            </div>
                            {cls.teacher && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <User className="h-3 w-3" />
                                <span>{cls.teacher}</span>
                              </div>
                            )}
                            {cls.room && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{cls.room}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TimetablePage;