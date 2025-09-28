import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type DatabaseClass = Tables<'classes'>;

interface TimetableClass {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  timeSlot: string;
  day: number;
  type: string;
  class: string;
}

interface TimetableContextType {
  timetable: TimetableClass[];
  updateTimetable: (newTimetable: TimetableClass[]) => Promise<void>;
  getTimetableForDay: (day: number, className?: string) => TimetableClass[];
  getTodaysTimetable: (className?: string) => TimetableClass[];
  addTimetableSlot: (slot: Omit<TimetableClass, 'id'>) => Promise<void>;
  deleteTimetableSlot: (id: string) => Promise<void>;
  updateTimetableSlot: (id: string, updates: Partial<TimetableClass>) => Promise<void>;
}

const TimetableContext = createContext<TimetableContextType | undefined>(undefined);

export const TimetableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timetable, setTimetable] = useState<TimetableClass[]>([]);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('day_of_week', { ascending: true })
        .order('start_time', { ascending: true });

      if (error) throw error;

      const formattedTimetable = data.map((item: DatabaseClass) => ({
        id: item.id,
        subject: item.subject,
        teacher: item.teacher_name,
        room: item.room_number || 'N/A',
        timeSlot: `${item.start_time} - ${item.end_time}`,
        day: item.day_of_week,
        type: 'Regular',
        class: 'All Classes'
      }));

      setTimetable(formattedTimetable);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  };

  const updateTimetable = async (newTimetable: TimetableClass[]) => {
    setTimetable(newTimetable);
    // Sync changes back to database would go here if needed
    await fetchTimetable(); // Refresh from database
  };

  const getTimetableForDay = (day: number, className?: string) => {
    return timetable.filter(cls => cls.day === day && (!className || cls.class === className));
  };

  const getTodaysTimetable = (className?: string) => {
    const today = new Date().getDay();
    // Convert Sunday (0) to Monday (1) based system
    const currentDay = today === 0 ? 7 : today;
    return getTimetableForDay(currentDay, className);
  };

  const addTimetableSlot = async (slot: Omit<TimetableClass, 'id'>) => {
    try {
      const [startTime, endTime] = slot.timeSlot.split(' - ');
      
      const { error } = await supabase
        .from('classes')
        .insert({
          subject: slot.subject,
          teacher_name: slot.teacher,
          room_number: slot.room,
          day_of_week: slot.day,
          start_time: startTime,
          end_time: endTime
        });

      if (error) throw error;
      await fetchTimetable(); // Refresh from database
    } catch (error) {
      console.error('Error adding timetable slot:', error);
    }
  };

  const deleteTimetableSlot = async (id: string) => {
    try {
      const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchTimetable(); // Refresh from database
    } catch (error) {
      console.error('Error deleting timetable slot:', error);
    }
  };

  const updateTimetableSlot = async (id: string, updates: Partial<TimetableClass>) => {
    try {
      const updateData: any = {};
      
      if (updates.subject) updateData.subject = updates.subject;
      if (updates.teacher) updateData.teacher_name = updates.teacher;
      if (updates.room) updateData.room_number = updates.room;
      if (updates.day) updateData.day_of_week = updates.day;
      if (updates.timeSlot) {
        const [startTime, endTime] = updates.timeSlot.split(' - ');
        updateData.start_time = startTime;
        updateData.end_time = endTime;
      }

      const { error } = await supabase
        .from('classes')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      await fetchTimetable(); // Refresh from database
    } catch (error) {
      console.error('Error updating timetable slot:', error);
    }
  };

  return (
    <TimetableContext.Provider value={{
      timetable,
      updateTimetable,
      getTimetableForDay,
      getTodaysTimetable,
      addTimetableSlot,
      deleteTimetableSlot,
      updateTimetableSlot
    }}>
      {children}
    </TimetableContext.Provider>
  );
};

export const useTimetable = () => {
  const context = useContext(TimetableContext);
  if (context === undefined) {
    throw new Error('useTimetable must be used within a TimetableProvider');
  }
  return context;
};