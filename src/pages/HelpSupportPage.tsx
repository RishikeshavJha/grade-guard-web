import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const HelpSupportPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <HelpCircle className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Help & Support</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Get Help</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Find answers to common questions and get support.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSupportPage;