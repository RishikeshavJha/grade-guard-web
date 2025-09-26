import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  BookOpen,
  QrCode,
  Users,
  FileText,
  Calendar,
  BarChart3,
  Upload,
  GraduationCap,
} from 'lucide-react';

const studentMenuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'My Notes', url: '/notes', icon: BookOpen },
  { title: 'Scan Attendance', url: '/scan-attendance', icon: QrCode },
  { title: 'My Attendance', url: '/my-attendance', icon: Calendar },
];

const teacherMenuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Upload Notes', url: '/upload-notes', icon: Upload },
  { title: 'Generate QR', url: '/generate-qr', icon: QrCode },
  { title: 'Attendance Reports', url: '/attendance-reports', icon: BarChart3 },
  { title: 'Students', url: '/students', icon: Users },
  { title: 'Notes Management', url: '/notes-management', icon: FileText },
];

export const AppSidebar = () => {
  const { user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';
  
  const menuItems = user?.role === 'student' ? studentMenuItems : teacherMenuItems;
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarContent className="bg-blue-800 text-white border-r">
        {/* Logo/Brand */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg">Saraswati</h2>
                <p className="text-xs text-cyan-400 capitalize">
                  {user?.role} Portal
                </p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>
            {user?.role === 'student' ? 'Student Portal' : 'Teacher Portal'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary text-white shadow-soft'
                            : 'hover:bg-accent text-foreground'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User info at bottom */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-white">
                  {user?.name?.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.studentId || user?.subject}
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};
