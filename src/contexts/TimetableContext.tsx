import React, { createContext, useContext, useState, useEffect } from 'react';
import { DUMMY_DATA } from '@/data/dummyData';

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
  updateTimetable: (newTimetable: TimetableClass[]) => void;
  getTimetableForDay: (day: number, className?: string) => TimetableClass[];
  getTodaysTimetable: (className?: string) => TimetableClass[];
  addTimetableSlot: (slot: Omit<TimetableClass, 'id'>) => void;
  deleteTimetableSlot: (id: string) => void;
  updateTimetableSlot: (id: string, updates: Partial<TimetableClass>) => void;
}

const TimetableContext = createContext<TimetableContextType | undefined>(undefined);

export const TimetableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timetable, setTimetable] = useState<TimetableClass[]>([]);

  useEffect(() => {
    // Initialize with dummy data
    const savedTimetable = localStorage.getItem('unified_timetable');
    if (savedTimetable) {
      setTimetable(JSON.parse(savedTimetable));
    } else {
      const initialTimetable = DUMMY_DATA.timetable.map((item) => ({
        id: `class-${item.id}`,
        subject: item.subject,
        teacher: item.teacher,
        room: item.room,
        timeSlot: item.timeSlot,
        day: item.day,
        type: item.type,
        class: item.class
      }));
      setTimetable(initialTimetable);
      localStorage.setItem('unified_timetable', JSON.stringify(initialTimetable));
    }
  }, []);

  const updateTimetable = (newTimetable: TimetableClass[]) => {
    setTimetable(newTimetable);
    // In a real app, this would sync to the database
    localStorage.setItem('unified_timetable', JSON.stringify(newTimetable));
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

  const addTimetableSlot = (slot: Omit<TimetableClass, 'id'>) => {
    const newSlot = {
      ...slot,
      id: `class-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    const newTimetable = [...timetable, newSlot];
    setTimetable(newTimetable);
    localStorage.setItem('unified_timetable', JSON.stringify(newTimetable));
  };

  const deleteTimetableSlot = (id: string) => {
    const newTimetable = timetable.filter(slot => slot.id !== id);
    setTimetable(newTimetable);
    localStorage.setItem('unified_timetable', JSON.stringify(newTimetable));
  };

  const updateTimetableSlot = (id: string, updates: Partial<TimetableClass>) => {
    const newTimetable = timetable.map(slot => 
      slot.id === id ? { ...slot, ...updates } : slot
    );
    setTimetable(newTimetable);
    localStorage.setItem('unified_timetable', JSON.stringify(newTimetable));
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