import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode } from 'lucide-react';

const GenerateQRPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <QrCode className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Generate QR Code</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Attendance QR Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Generate QR codes for student attendance tracking.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateQRPage;