import React, { createContext, useContext, useState, useEffect } from 'react';
import { DUMMY_DATA } from '@/data/dummyData';

interface TimetableClass {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  day: number;
  type: string;
}

interface TimetableContextType {
  timetable: TimetableClass[];
  updateTimetable: (newTimetable: TimetableClass[]) => void;
  getTimetableForDay: (day: number) => TimetableClass[];
  getTodaysTimetable: () => TimetableClass[];
}

const TimetableContext = createContext<TimetableContextType | undefined>(undefined);

export const TimetableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timetable, setTimetable] = useState<TimetableClass[]>([]);

  useEffect(() => {
    // Initialize with dummy data
    const initialTimetable = DUMMY_DATA.timetable.map((item, index) => ({
      id: `class-${index}`,
      subject: item.subject,
      teacher: item.teacher,
      room: item.room,
      startTime: item.timeSlot.split(' - ')[0],
      endTime: item.timeSlot.split(' - ')[1],
      day: item.day,
      type: item.type
    }));
    setTimetable(initialTimetable);
  }, []);

  const updateTimetable = (newTimetable: TimetableClass[]) => {
    setTimetable(newTimetable);
    // In a real app, this would sync to the database
    localStorage.setItem('unified_timetable', JSON.stringify(newTimetable));
  };

  const getTimetableForDay = (day: number) => {
    return timetable.filter(cls => cls.day === day);
  };

  const getTodaysTimetable = () => {
    const today = new Date().getDay();
    // Convert Sunday (0) to Monday (1) based system
    const currentDay = today === 0 ? 7 : today;
    return getTimetableForDay(currentDay);
  };

  return (
    <TimetableContext.Provider value={{
      timetable,
      updateTimetable,
      getTimetableForDay,
      getTodaysTimetable
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