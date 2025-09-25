import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Download, Search, Calendar } from 'lucide-react';

const NotesPage = () => {
  const mockNotes = [
    {
      id: 1,
      title: 'Calculus - Derivatives and Integration',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Wilson',
      date: '2024-01-15',
      downloads: 34,
      description: 'Comprehensive guide to calculus fundamentals'
    },
    {
      id: 2,
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      teacher: 'Dr. Mary Davis',
      date: '2024-01-14',
      downloads: 28,
      description: 'Classical mechanics and motion principles'
    },
    {
      id: 3,
      title: 'Organic Chemistry Basics',
      subject: 'Chemistry',
      teacher: 'Dr. John Smith',
      date: '2024-01-13',
      downloads: 41,
      description: 'Introduction to organic compounds and reactions'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Study Notes</h1>
          <p className="text-muted-foreground">
            Access all your study materials in one place
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            className="pl-10 w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNotes.map((note) => (
          <Card key={note.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Badge variant="outline">{note.subject}</Badge>
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                </div>
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>{note.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>By {note.teacher}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {note.date}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {note.downloads} downloads
                  </span>
                  <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;