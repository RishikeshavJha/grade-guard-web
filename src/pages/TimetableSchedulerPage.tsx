import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit3, 
  Trash2,
  Users,
  MapPin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DUMMY_DATA, getDaysOfWeek } from '@/data/dummyData';

const TimetableSchedulerPage = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSlot, setNewSlot] = useState({
    day: '',
    timeSlot: '',
    subject: '',
    teacher: '',
    room: ''
  });

  const daysOfWeek = getDaysOfWeek();
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
  const teachers = DUMMY_DATA.teachers;
  const timeSlots = [
    '09:00 AM - 09:45 AM',
    '09:45 AM - 10:30 AM',
    '10:30 AM - 10:45 AM', // Break
    '10:45 AM - 11:30 AM',
    '11:30 AM - 12:15 PM',
    '12:15 PM - 01:00 PM'
  ];

  const getClassTimetable = () => {
    return DUMMY_DATA.timetable.filter(item => item.class === selectedClass);
  };

  const getTimetableForDay = (dayId: number) => {
    return getClassTimetable().filter(item => item.day === dayId);
  };

  const handleAddSlot = () => {
    if (!newSlot.day || !newSlot.timeSlot || !newSlot.subject || !newSlot.teacher) {
      toast({
        title: 'Missing information',
        description: 'Please fill all required fields.',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Class scheduled successfully!',
      description: `Added ${newSlot.subject} for ${selectedClass} on ${daysOfWeek.find(d => d.id.toString() === newSlot.day)?.name}.`,
    });

    setNewSlot({ day: '', timeSlot: '', subject: '', teacher: '', room: '' });
    setIsAddDialogOpen(false);
  };

  const handleDeleteSlot = (day: number, timeSlot: string) => {
    toast({
      title: 'Class removed',
      description: 'The class has been removed from the timetable.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Timetable Scheduler</h1>
            <p className="text-muted-foreground">Create and manage class schedules</p>
          </div>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Day</Label>
                  <Select value={newSlot.day} onValueChange={(value) => setNewSlot({...newSlot, day: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map((day) => (
                        <SelectItem key={day.id} value={day.id.toString()}>
                          {day.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Time Slot</Label>
                  <Select value={newSlot.timeSlot} onValueChange={(value) => setNewSlot({...newSlot, timeSlot: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={newSlot.subject} onValueChange={(value) => setNewSlot({...newSlot, subject: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Teacher</Label>
                <Select value={newSlot.teacher} onValueChange={(value) => setNewSlot({...newSlot, teacher: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.name}>
                        {teacher.name} - {teacher.subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Room (Optional)</Label>
                <Input
                  placeholder="e.g., Room 101"
                  value={newSlot.room}
                  onChange={(e) => setNewSlot({...newSlot, room: e.target.value})}
                />
              </div>

              <Button onClick={handleAddSlot} className="w-full">
                Add Class
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Class Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Select Class
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {['10-A', '10-B', '10-C', '11-A', '11-B'].map((cls) => (
              <Button
                key={cls}
                variant={selectedClass === cls ? 'default' : 'outline'}
                onClick={() => setSelectedClass(cls)}
              >
                Class {cls}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timetable Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Timetable - Class {selectedClass}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {daysOfWeek.map((day) => {
              const dayClasses = getTimetableForDay(day.id);
              
              return (
                <div key={day.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-center mb-4 pb-2 border-b">
                    {day.name}
                  </h3>
                  
                  <div className="space-y-2">
                    {dayClasses.length > 0 ? (
                      dayClasses.map((classItem, index) => (
                        <div key={index} className={`p-3 rounded border ${
                          classItem.type === 'break' 
                            ? 'bg-yellow-50 border-yellow-200' 
                            : 'bg-blue-50 border-blue-200'
                        }`}>
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-medium text-sm">
                              {classItem.subject || 'Break'}
                            </h4>
                            {classItem.type !== 'break' && (
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Edit3 className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteSlot(day.id, classItem.timeSlot)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                          
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{classItem.timeSlot}</span>
                            </div>
                            {classItem.teacher && (
                              <div>{classItem.teacher}</div>
                            )}
                            {classItem.room && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{classItem.room}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground text-sm py-8">
                        No classes scheduled
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes This Week</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getClassTimetable().filter(item => item.type === 'lecture').length}
            </div>
            <p className="text-xs text-muted-foreground">For Class {selectedClass}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects Covered</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(getClassTimetable().filter(item => item.type === 'lecture').map(item => item.subject)).size}
            </div>
            <p className="text-xs text-muted-foreground">Different subjects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Size</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DUMMY_DATA.getClassSize(selectedClass)}</div>
            <p className="text-xs text-muted-foreground">Students in {selectedClass}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimetableSchedulerPage;