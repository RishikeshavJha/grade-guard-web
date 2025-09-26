import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode } from 'lucide-react';

const ScanAttendancePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <QrCode className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Scan Attendance</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>QR Code Scanner</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Scan QR codes to mark your attendance in classes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScanAttendancePage;