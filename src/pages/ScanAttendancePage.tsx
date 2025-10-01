import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Camera, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import QrScanner from 'qr-scanner';

const ScanAttendancePage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [isProcessing, setIsProcessing] = useState(false);
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
    console.log('Start scanning button clicked');
    console.log('Video ref:', videoRef.current);
    
    try {
      if (!videoRef.current) {
        console.error('Video element not found');
        toast({
          title: "Error",
          description: "Video element not ready. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log('Setting up QR Scanner...');
      setScanStatus('scanning');
      setIsScanning(true);
      setScanResult(null);

      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          console.log('QR Code detected:', result.data);
          handleScanResult(result.data);
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: 'environment',
        }
      );

      console.log('Starting QR scanner...');
      await qrScannerRef.current.start();
      console.log('QR scanner started successfully');
    } catch (error) {
      console.error('Error starting scanner:', error);
      toast({
        title: "Camera Access Error",
        description: error instanceof Error ? error.message : "Could not access camera. Please check permissions.",
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
    if (isProcessing) return;
    
    setIsProcessing(true);
    stopScanning();

    try {
      // Parse QR code data
      const qrData = JSON.parse(data);
      
      if (!qrData.sessionId) {
        throw new Error('Invalid QR code format');
      }

      // Check expiration
      if (qrData.expiresAt && new Date(qrData.expiresAt) < new Date()) {
        throw new Error('This QR code has expired');
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
        .eq('student_name', user?.email || user?.name || 'Student')
        .single();

      if (existingRecord) {
        throw new Error('You have already marked attendance for this session');
      }

      // Mark attendance
      const { error: attendanceError } = await supabase
        .from('attendance_records')
        .insert({
          session_id: qrData.sessionId,
          student_name: user?.email || user?.name || 'Student',
        });

      if (attendanceError) throw attendanceError;

      setScanStatus('success');
      setScanResult('Attendance marked successfully!');
      
      toast({
        title: "Success",
        description: "Your attendance has been marked successfully",
      });

    } catch (error) {
      console.error('Error processing QR code:', error);
      setScanStatus('error');
      setScanResult(error instanceof Error ? error.message : 'Invalid QR code');
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to mark attendance',
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
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
              <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9', maxHeight: '500px' }}>
                <video
                  ref={videoRef}
                  className={`w-full h-full object-cover ${isScanning ? 'block' : 'hidden'}`}
                  playsInline
                  muted
                  autoPlay
                />
                {!isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                      <Camera className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">Ready to Scan</p>
                      <p className="text-sm opacity-75">
                        Click "Start Scanning" to open camera
                      </p>
                    </div>
                  </div>
                )}
                {isProcessing && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">Processing QR Code...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center space-y-4">
              {!isScanning ? (
                <Button 
                  onClick={startScanning}
                  className="w-full sm:w-auto"
                  size="lg"
                  disabled={isProcessing}
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Start Scanning
                </Button>
              ) : (
                <Button 
                  onClick={stopScanning}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={isProcessing}
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

              <div className="text-sm text-muted-foreground space-y-2 max-w-md mx-auto">
                <p className="flex items-center gap-2">
                  <span>📱</span>
                  <span>Point your camera at the QR code displayed by your teacher</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>⚡</span>
                  <span>QR code will be scanned automatically when detected</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>✨</span>
                  <span>Your attendance will be marked instantly</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScanAttendancePage;