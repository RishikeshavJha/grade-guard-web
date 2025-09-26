import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Camera, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import QrScanner from 'qr-scanner';

const ScanAttendancePage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      if (!videoRef.current) return;

      setScanStatus('scanning');
      setIsScanning(true);
      setScanResult(null);

      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => handleScanResult(result.data),
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: 'environment',
        }
      );

      await qrScannerRef.current.start();
    } catch (error) {
      console.error('Error starting scanner:', error);
      toast({
        title: "Error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive",
      });
      setScanStatus('error');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    setIsScanning(false);
    setScanStatus('idle');
  };

  const handleScanResult = async (data: string) => {
    try {
      // Parse QR code data
      const qrData = JSON.parse(data);
      
      if (!qrData.sessionId || !qrData.classId) {
        throw new Error('Invalid QR code format');
      }

      // Verify session is active
      const { data: session, error: sessionError } = await supabase
        .from('attendance_sessions')
        .select('*')
        .eq('id', qrData.sessionId)
        .eq('is_active', true)
        .single();

      if (sessionError || !session) {
        throw new Error('Invalid or expired session');
      }

      // Check if session has expired
      if (new Date(session.expires_at) < new Date()) {
        throw new Error('This attendance session has expired');
      }

      // Check if student has already marked attendance for this session
      const { data: existingRecord } = await supabase
        .from('attendance_records')
        .select('*')
        .eq('session_id', qrData.sessionId)
        .eq('student_id', user?.id)
        .single();

      if (existingRecord) {
        throw new Error('You have already marked attendance for this session');
      }

      // Mark attendance
      const { error: attendanceError } = await supabase
        .from('attendance_records')
        .insert({
          session_id: qrData.sessionId,
          student_id: user?.id!,
          student_name: user?.name!,
          status: 'present',
        });

      if (attendanceError) throw attendanceError;

      setScanStatus('success');
      setScanResult('Attendance marked successfully!');
      stopScanning();
      
      toast({
        title: "Success",
        description: "Your attendance has been marked successfully",
      });

    } catch (error) {
      console.error('Error processing QR code:', error);
      setScanStatus('error');
      setScanResult(error instanceof Error ? error.message : 'Invalid QR code');
      stopScanning();
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to mark attendance',
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <QrCode className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Scan Attendance</h1>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">QR Code Scanner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
                {isScanning ? (
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-sm opacity-75">
                        Click "Start Scanning" to use your camera
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center space-y-4">
              {!isScanning ? (
                <Button 
                  onClick={startScanning}
                  className="bg-gradient-primary hover:opacity-90"
                  size="lg"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Start Scanning
                </Button>
              ) : (
                <Button 
                  onClick={stopScanning}
                  variant="outline"
                  size="lg"
                >
                  Stop Scanning
                </Button>
              )}

              {scanResult && (
                <div className={`p-4 rounded-lg border ${
                  scanStatus === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    {scanStatus === 'success' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                    <span className="font-medium">{scanResult}</span>
                  </div>
                </div>
              )}

              <div className="text-sm text-muted-foreground space-y-2">
                <p>📱 Point your camera at the QR code displayed by your teacher</p>
                <p>⚡ Make sure you're in the correct classroom</p>
                <p>✨ Your attendance will be marked automatically</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScanAttendancePage;