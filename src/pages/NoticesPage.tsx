import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const NoticesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Notices</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Important Notices</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Important announcements and notices will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoticesPage;