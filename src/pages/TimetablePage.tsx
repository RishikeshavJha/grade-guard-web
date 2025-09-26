import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Class = Tables<'classes'>;

const TimetablePage = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('day_of_week', { ascending: true })
        .order('start_time', { ascending: true });

      if (error) throw error;
      setClasses(data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const daysOfWeek = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
  ];

  const getClassesForDay = (dayId: number) => {
    return classes.filter(cls => cls.day_of_week === dayId);
  };

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Weekly Timetable</h1>
        </div>
        <div className="text-center py-8">Loading timetable...</div>
      </div>
    );
  }

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
                      <Card key={cls.id} className="bg-background border border-border/50">
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">{cls.subject}</h4>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>
                                {formatTime(cls.start_time)} - {formatTime(cls.end_time)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <User className="h-3 w-3" />
                              <span>{cls.teacher_name}</span>
                            </div>
                            {cls.room_number && (
                              <div className="text-xs text-muted-foreground">
                                Room: {cls.room_number}
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