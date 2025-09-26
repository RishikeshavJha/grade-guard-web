import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const NotesManagementPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Notes Management</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Organize and manage all your uploaded notes and materials.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotesManagementPage;