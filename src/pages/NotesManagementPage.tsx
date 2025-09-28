import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookOpen, Search, Calendar, Plus, Edit3, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNotes } from '@/contexts/NotesContext';
import type { Tables } from '@/integrations/supabase/types';

type Note = Tables<'notes'>;

const NotesManagementPage = () => {
  const { notes: contextNotes, addNote, deleteNote, updateNote, getNotesForTeacher } = useNotes();
  const [dbNotes, setDbNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    content: ''
  });
  
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user?.id) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDbNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch notes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Combine context notes for current teacher with database notes
  const allNotes = [
    ...getNotesForTeacher(user?.id || 'teacher-1').map(note => ({
      id: note.id,
      title: note.title,
      content: note.content,
      subject: note.subject,
      teacher_name: note.teacher,
      created_at: note.date,
      updated_at: note.date,
      created_by: note.createdBy
    })),
    ...dbNotes
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.subject || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingNote) {
        // Update existing note
        if (editingNote.created_by === (user?.id || 'teacher-1')) {
          // Update in context
          updateNote(editingNote.id, {
            title: formData.title,
            subject: formData.subject,
            content: formData.content,
          });
          toast({
            title: 'Note updated successfully!',
            description: 'Your note has been updated.',
          });
        } else {
          // Update in database
          try {
            const { error } = await supabase
              .from('notes')
              .update({
                title: formData.title,
                subject: formData.subject,
                content: formData.content,
                updated_at: new Date().toISOString(),
              })
              .eq('id', editingNote.id);

            if (error) throw error;

            toast({
              title: 'Note updated successfully!',
              description: 'Your note has been updated.',
            });

            fetchNotes();
          } catch (error) {
            console.error('Error updating note:', error);
            toast({
              title: 'Error updating note',
              description: 'Please try again.',
              variant: 'destructive',
            });
          }
        }
        setEditingNote(null);
      } else {
        // Create new note in context
        addNote({
          title: formData.title,
          subject: formData.subject,
          content: formData.content,
          teacher: user?.name || 'Teacher',
          createdBy: user?.id || 'teacher-1'
        });

        toast({
          title: 'Note created successfully!',
          description: 'Your note has been saved and is now available to students.',
        });
      }

      setFormData({ title: '', subject: '', content: '' });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error with note operation:', error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (note: any) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      subject: note.subject || '',
      content: note.content,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    const note = allNotes.find(n => n.id === noteId);
    if (note && note.created_by === (user?.id || 'teacher-1')) {
      // Delete from context
      deleteNote(noteId);
      toast({
        title: 'Note deleted successfully!',
        description: 'The note has been removed.',
      });
    } else {
      // Delete from database
      try {
        const { error } = await supabase
          .from('notes')
          .delete()
          .eq('id', noteId);

        if (error) throw error;

        toast({
          title: 'Note deleted successfully!',
          description: 'The note has been removed.',
        });

        fetchNotes();
      } catch (error) {
        console.error('Error deleting note:', error);
        toast({
          title: 'Error deleting note',
          description: 'Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  const filteredNotes = allNotes.filter((note: any) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notes Management</h1>
            <p className="text-muted-foreground">
              Create and manage study materials for your students
            </p>
          </div>
        </div>
        <div className="text-center py-8">Loading notes...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notes Management</h1>
          <p className="text-muted-foreground">
            Create and manage study materials for your students
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingNote ? 'Edit Note' : 'Create New Note'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter note title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Enter subject"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter note content"
                  rows={6}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingNote ? 'Update Note' : 'Create Note'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingNote(null);
                    setFormData({ title: '', subject: '', content: '' });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notes..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredNotes.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? 'No notes found matching your search.' : 'No notes available. Create your first note!'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note: any) => (
            <Card key={note.id} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Badge variant="outline">{note.subject || 'General'}</Badge>
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(note)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(note.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="line-clamp-3">
                  {note.content && note.content.length > 150 ? `${note.content.substring(0, 150)}...` : note.content}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(note.updated_at)}
                  </div>
                  <div className="text-xs">
                    {note.teacher_name || user?.name}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesManagementPage;