import React, { createContext, useContext, useState, useEffect } from 'react';
import { DUMMY_DATA } from '@/data/dummyData';
import { v4 as uuidv4 } from 'uuid';

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  teacher: string;
  date: string;
  downloads: number;
  fileUrl?: string;
  createdBy: string;
}

interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'downloads' | 'date'>) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  getNotesForStudent: () => Note[];
  getNotesForTeacher: (teacherId: string) => Note[];
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // Initialize with dummy data
    const savedNotes = localStorage.getItem('unified_notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      const initialNotes = DUMMY_DATA.notes.map((note) => ({
        id: note.id.toString(),
        title: note.title,
        content: note.content,
        subject: note.subject || 'General',
        teacher: note.teacher,
        date: note.date,
        downloads: note.downloads,
        createdBy: 'teacher-1'
      }));
      setNotes(initialNotes);
      localStorage.setItem('unified_notes', JSON.stringify(initialNotes));
    }
  }, []);

  const addNote = (note: Omit<Note, 'id' | 'downloads' | 'date'>) => {
    const newNote = {
      ...note,
      id: uuidv4(),
      downloads: 0,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('unified_notes', JSON.stringify(updatedNotes));
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('unified_notes', JSON.stringify(updatedNotes));
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    const updatedNotes = notes.map(note => 
      note.id === id ? { ...note, ...updates } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('unified_notes', JSON.stringify(updatedNotes));
  };

  const getNotesForStudent = () => {
    return notes;
  };

  const getNotesForTeacher = (teacherId: string) => {
    return notes.filter(note => note.createdBy === teacherId);
  };

  return (
    <NotesContext.Provider value={{
      notes,
      addNote,
      deleteNote,
      updateNote,
      getNotesForStudent,
      getNotesForTeacher
    }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};