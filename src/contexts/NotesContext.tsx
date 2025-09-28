import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Tables } from '@/integrations/supabase/types';

type DatabaseNote = Tables<'notes'>;

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
  addNote: (note: Omit<Note, 'id' | 'downloads' | 'date'>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  getNotesForStudent: () => Note[];
  getNotesForTeacher: (teacherId: string) => Note[];
  fetchNotes: () => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedNotes = data.map((note: DatabaseNote) => ({
        id: note.id,
        title: note.title,
        content: note.content,
        subject: note.subject || 'General',
        teacher: note.teacher_name || 'Unknown',
        date: new Date(note.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        downloads: 0, // This would need to be tracked separately if needed
        fileUrl: undefined, // This would come from storage if files are uploaded
        createdBy: note.created_by
      }));

      setNotes(formattedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async (note: Omit<Note, 'id' | 'downloads' | 'date'>) => {
    try {
      const { error } = await supabase
        .from('notes')
        .insert({
          title: note.title,
          content: note.content,
          subject: note.subject,
          teacher_name: note.teacher,
          created_by: user?.id || 'anonymous'
        });

      if (error) throw error;
      await fetchNotes(); // Refresh from database
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchNotes(); // Refresh from database
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const updateNote = async (id: string, updates: Partial<Note>) => {
    try {
      const updateData: any = {};
      
      if (updates.title) updateData.title = updates.title;
      if (updates.content) updateData.content = updates.content;
      if (updates.subject) updateData.subject = updates.subject;
      if (updates.teacher) updateData.teacher_name = updates.teacher;

      const { error } = await supabase
        .from('notes')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      await fetchNotes(); // Refresh from database
    } catch (error) {
      console.error('Error updating note:', error);
    }
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
      getNotesForTeacher,
      fetchNotes
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