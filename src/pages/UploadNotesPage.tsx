import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  QrCode, 
  Download,
  Calendar,
  Users,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DUMMY_DATA } from '@/data/dummyData';
import { useNotes } from '@/contexts/NotesContext';
import { useAuth } from '@/contexts/AuthContext';

const UploadNotesPage = () => {
  const { toast } = useToast();
  const { addNote, getNotesForTeacher } = useNotes();
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
    targetClass: ''
  });

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
  const classes = ['10-A', '10-B', '10-C', '11-A', '11-B'];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        setSelectedFile(file);
      } else {
        toast({
          title: 'Invalid file type',
          description: 'Please upload PDF files or images only.',
          variant: 'destructive'
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !formData.title || !formData.subject || !formData.targetClass) {
      toast({
        title: 'Missing information',
        description: 'Please fill all fields and select a file.',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);
    
    try {
      await addNote({
        title: formData.title,
        content: formData.description || `${formData.subject} study material for Class ${formData.targetClass}`,
        subject: formData.subject,
        teacher: user?.name || 'Teacher',
        createdBy: user?.id || 'teacher-1',
        fileUrl: URL.createObjectURL(selectedFile)
      });

      toast({
        title: 'Notes uploaded successfully!',
        description: `QR code generated for "${formData.title}". Students can now scan to access the notes.`,
      });
      
      // Reset form
      setSelectedFile(null);
      setFormData({ title: '', subject: '', description: '', targetClass: '' });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your notes. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const generateQRCode = (noteId: number) => {
    toast({
      title: 'QR Code Generated',
      description: 'Students can scan this code to mark attendance and access notes.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Upload className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Upload Notes</h1>
          <p className="text-muted-foreground">Upload study materials and generate QR codes for students</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload New Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter note title (e.g., Chapter 5: Integration Methods)"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select 
                  value={formData.subject} 
                  onValueChange={(value) => setFormData({ ...formData, subject: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="class">Target Class</Label>
                <Select 
                  value={formData.targetClass} 
                  onValueChange={(value) => setFormData({ ...formData, targetClass: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        Class {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the content..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Upload File</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="file"
                  accept=".pdf,image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label htmlFor="file" className="cursor-pointer">
                  <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {selectedFile ? selectedFile.name : 'Click to upload PDF or image files'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supported formats: PDF, JPG, PNG (Max 20MB)
                  </p>
                </label>
              </div>
            </div>

            <Button 
              onClick={handleUpload} 
              disabled={isUploading}
              className="w-full"
            >
              {isUploading ? 'Uploading...' : 'Upload Notes & Generate QR'}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Uploads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Your Recent Uploads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getNotesForTeacher(user?.id || 'teacher-1').slice(0, 5).map((note: any) => (
                <div key={note.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium">{note.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {note.subject}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {note.date}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {note.downloads} downloads
                      </span>
                      <span>By: {note.teacher}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => generateQRCode(note.id)}
                    >
                      <QrCode className="h-3 w-3 mr-1" />
                      Generate QR
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notes Uploaded</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DUMMY_DATA.totalNotes}</div>
            <p className="text-xs text-muted-foreground">
              {DUMMY_DATA.notesThisWeek} uploaded this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {DUMMY_DATA.notes.reduce((sum, note) => sum + (note.downloads || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all notes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DUMMY_DATA.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Can access your notes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadNotesPage;