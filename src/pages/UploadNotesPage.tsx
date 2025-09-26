import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';

const UploadNotesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Upload className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Upload Notes</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upload Study Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Upload notes and study materials for your students.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadNotesPage;