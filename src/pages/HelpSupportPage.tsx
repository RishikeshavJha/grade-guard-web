import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  FileQuestion,
  Settings,
  Users
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DUMMY_DATA } from '@/data/dummyData';

const HelpSupportPage = () => {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  const quickActions = [
    {
      title: 'Account Issues',
      description: 'Login problems, password reset, account access',
      icon: Settings,
      action: 'Get Help'
    },
    {
      title: 'Technical Support',
      description: 'App not working, QR codes, attendance issues',
      icon: FileQuestion,
      action: 'Report Issue'
    },
    {
      title: 'Contact Admin',
      description: 'Speak with school administration',
      icon: Users,
      action: 'Contact'
    }
  ];

  const faqs = [
    {
      question: 'How do I scan QR codes for attendance?',
      answer: 'Go to your dashboard and tap the "Scan QR Code" button. Point your camera at the QR code displayed by your teacher.',
      category: 'Attendance'
    },
    {
      question: 'Where can I find my class notes?',
      answer: 'All notes are available in the "Notes" section. You can access them from your dashboard or the main navigation.',
      category: 'Notes'
    },
    {
      question: 'How do I check my attendance percentage?',
      answer: 'Your attendance percentage is displayed on your dashboard. For detailed reports, visit "My Attendance" section.',
      category: 'Attendance'
    },
    {
      question: 'What should I do if I can\'t find my class schedule?',
      answer: 'Your timetable is available in the "Timetable" section. If it\'s missing, please contact your teacher.',
      category: 'Schedule'
    }
  ];

  if (isTeacher) {
    faqs.push(
      {
        question: 'How do I upload notes for students?',
        answer: 'Use the "Upload Notes" button on your dashboard. You can upload PDF files and they will automatically generate QR codes.',
        category: 'Notes'
      },
      {
        question: 'How do I generate QR codes for attendance?',
        answer: 'Go to "Generate QR" from your dashboard. Select the class and the system will create a unique QR code for attendance.',
        category: 'Attendance'
      },
      {
        question: 'How can I view student attendance reports?',
        answer: 'Visit the "Attendance Reports" section to see detailed attendance statistics for all your students.',
        category: 'Reports'
      }
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <HelpCircle className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">
            Get help with your {isTeacher ? 'teacher' : 'student'} portal
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">
                {isTeacher ? 'Teacher Support' : 'Student Helpline'}
              </h4>
              <p className="text-lg font-mono">
                {isTeacher ? DUMMY_DATA.support.teacherHelpline : DUMMY_DATA.support.studentHelpline}
              </p>
              <Button className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Email Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">General Support</h4>
              <p className="text-lg">{DUMMY_DATA.support.email}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{DUMMY_DATA.support.hours}</span>
              </div>
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <action.icon className="h-5 w-5 text-primary mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{action.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {action.description}
                    </p>
                    <Button variant="outline" size="sm">
                      {action.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Frequently Asked Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                <div className="flex items-start gap-3 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {faq.category}
                  </Badge>
                </div>
                <h4 className="font-medium mb-2">{faq.question}</h4>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <h4 className="font-medium">User Guide</h4>
                <p className="text-sm text-muted-foreground">
                  Complete guide on using the {isTeacher ? 'teacher' : 'student'} portal
                </p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <h4 className="font-medium">Video Tutorials</h4>
                <p className="text-sm text-muted-foreground">
                  Step-by-step video guides for common tasks
                </p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSupportPage;