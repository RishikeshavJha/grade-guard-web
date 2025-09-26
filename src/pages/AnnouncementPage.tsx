import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone } from 'lucide-react';

const AnnouncementPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Megaphone className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Announcements</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Create Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Create and manage announcements for your students.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementPage;