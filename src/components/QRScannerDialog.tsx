import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface QRScannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QRScannerDialog: React.FC<QRScannerDialogProps> = ({ open, onOpenChange }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.destroy();
        scannerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (open && !isScanning) {
      startScanning();
    } else if (!open && scannerRef.current) {
      stopScanning();
    }
  }, [open]);

  const startScanning = async () => {
    if (!videoRef.current) return;

    try {
      const scanner = new QrScanner(
        videoRef.current,
        (result) => handleScanResult(result.data),
        {
          preferredCamera: 'environment',
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      scannerRef.current = scanner;
      await scanner.start();
      setIsScanning(true);
      setScanResult(null);
    } catch (error) {
      console.error('Failed to start scanner:', error);
      toast({
        title: 'Camera Error',
        description: 'Unable to access camera. Please check permissions.',
        variant: 'destructive',
      });
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      scannerRef.current.destroy();
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleScanResult = async (data: string) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    stopScanning();

    try {
      const qrData = JSON.parse(data);
      const { sessionId, expiresAt } = qrData;

      if (!sessionId) {
        throw new Error('Invalid QR code format');
      }

      const now = new Date();
      const expiry = new Date(expiresAt);

      if (now > expiry) {
        setScanResult({ success: false, message: 'QR code has expired' });
        toast({
          title: 'Session Expired',
          description: 'This QR code is no longer valid.',
          variant: 'destructive',
        });
        setIsProcessing(false);
        return;
      }

      // Check for duplicate attendance
      const { data: existingRecord } = await supabase
        .from('attendance_records')
        .select('*')
        .eq('session_id', sessionId)
        .eq('student_name', user?.name || 'Unknown Student')
        .single();

      if (existingRecord) {
        setScanResult({ success: false, message: 'Attendance already marked for this session' });
        toast({
          title: 'Already Marked',
          description: 'Your attendance has already been recorded.',
          variant: 'destructive',
        });
        setIsProcessing(false);
        return;
      }

      // Mark attendance
      const { error } = await supabase
        .from('attendance_records')
        .insert({
          session_id: sessionId,
          student_name: user?.name || 'Unknown Student',
        });

      if (error) throw error;

      setScanResult({ success: true, message: 'Attendance marked successfully!' });
      toast({
        title: 'Success!',
        description: 'Your attendance has been marked.',
      });

      setTimeout(() => {
        onOpenChange(false);
      }, 2000);
    } catch (error) {
      console.error('Error processing QR code:', error);
      setScanResult({ success: false, message: 'Failed to process QR code' });
      toast({
        title: 'Error',
        description: 'Unable to mark attendance. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    stopScanning();
    setScanResult(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
          <DialogDescription>
            Point your camera at the QR code displayed by your teacher
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            {isScanning ? (
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Camera className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
            {isProcessing && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}
          </div>

          {scanResult && (
            <Alert variant={scanResult.success ? 'default' : 'destructive'}>
              {scanResult.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertDescription>{scanResult.message}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            {!isScanning && !scanResult && (
              <Button onClick={startScanning} className="flex-1">
                <Camera className="h-4 w-4 mr-2" />
                Start Scanning
              </Button>
            )}
            {isScanning && (
              <Button onClick={stopScanning} variant="outline" className="flex-1">
                Stop Scanning
              </Button>
            )}
            <Button onClick={handleClose} variant="outline">
              Close
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Make sure the QR code is well-lit and in focus
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
