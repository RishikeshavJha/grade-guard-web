import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QrCode, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';
import type { Tables } from '@/integrations/supabase/types';

type Class = Tables<'classes'>;
type AttendanceSession = Tables<'attendance_sessions'>;

const GenerateQRPage = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [currentSession, setCurrentSession] = useState<AttendanceSession | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchClasses();
    }
  }, [user]);

  const fetchClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('subject');

      if (error) throw error;
      setClasses(data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch classes",
        variant: "destructive",
      });
    }
  };

  const generateQRCode = async () => {
    if (!selectedClass) {
      toast({
        title: "Error",
        description: "Please select a class first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Generate unique session ID
      const sessionId = crypto.randomUUID();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 2); // Session expires in 2 hours

      // Create QR code data
      const qrData = JSON.stringify({
        sessionId,
        classId: selectedClass,
        timestamp: Date.now(),
      });

      // Generate QR code image
      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });

      // Save session to database
      const { data: sessionData, error } = await supabase
        .from('attendance_sessions')
        .insert({
          id: sessionId,
          class_id: selectedClass,
          expires_at: expiresAt.toISOString(),
          is_active: true,
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentSession(sessionData);
      setQrCodeUrl(qrCodeDataUrl);
      
      toast({
        title: "Success",
        description: "QR code generated successfully",
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const endSession = async () => {
    if (!currentSession) return;

    try {
      const { error } = await supabase
        .from('attendance_sessions')
        .update({ is_active: false })
        .eq('id', currentSession.id);

      if (error) throw error;

      setCurrentSession(null);
      setQrCodeUrl('');
      
      toast({
        title: "Success",
        description: "Attendance session ended",
      });
    } catch (error) {
      console.error('Error ending session:', error);
      toast({
        title: "Error",
        description: "Failed to end session",
        variant: "destructive",
      });
    }
  };

  const selectedClassData = classes.find(cls => cls.id === selectedClass);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <QrCode className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Generate QR Code</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Attendance Session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a class..." />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.subject} - {cls.teacher_name}
                      {cls.room_number && ` (Room ${cls.room_number})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {!currentSession ? (
              <Button 
                onClick={generateQRCode}
                disabled={!selectedClass || loading}
                className="w-full bg-gradient-primary hover:opacity-90"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <QrCode className="h-4 w-4 mr-2" />
                    Generate QR Code
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">
                    ✅ Attendance session is active for {selectedClassData?.subject}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Session expires at: {new Date(currentSession.expires_at).toLocaleString()}
                  </p>
                </div>
                <Button 
                  onClick={endSession}
                  variant="destructive"
                  className="w-full"
                >
                  End Session
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            {qrCodeUrl ? (
              <div className="text-center space-y-4">
                <img 
                  src={qrCodeUrl} 
                  alt="Attendance QR Code" 
                  className="mx-auto border rounded-lg shadow-soft"
                />
                <p className="text-sm text-muted-foreground">
                  Students can scan this QR code to mark their attendance
                </p>
                {selectedClassData && (
                  <div className="p-3 bg-background border rounded-md text-left">
                    <h4 className="font-semibold">{selectedClassData.subject}</h4>
                    <p className="text-sm text-muted-foreground">
                      Teacher: {selectedClassData.teacher_name}
                    </p>
                    {selectedClassData.room_number && (
                      <p className="text-sm text-muted-foreground">
                        Room: {selectedClassData.room_number}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Select a class and generate a QR code for attendance
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenerateQRPage;