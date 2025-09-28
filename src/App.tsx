import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { TimetableProvider } from "@/contexts/TimetableContext";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";
import NotesPage from "./pages/NotesPage";
import TimetablePage from "./pages/TimetablePage";
import ScanAttendancePage from "./pages/ScanAttendancePage";
import MyAttendancePage from "./pages/MyAttendancePage";
import NoticesPage from "./pages/NoticesPage";
import HelpSupportPage from "./pages/HelpSupportPage";
import StudentsPage from "./pages/StudentsPage";
import UploadNotesPage from "./pages/UploadNotesPage";
import NotesManagementPage from "./pages/NotesManagementPage";
import TimetableSchedulerPage from "./pages/TimetableSchedulerPage";
import GenerateQRPage from "./pages/GenerateQRPage";
import AttendanceReportsPage from "./pages/AttendanceReportsPage";
import AnnouncementPage from "./pages/AnnouncementPage";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <TimetableProvider>
          <Toaster />
          <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/notes" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NotesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/timetable" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TimetablePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/scan-attendance" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ScanAttendancePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/my-attendance" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MyAttendancePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/notices" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NoticesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/help-support" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <HelpSupportPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/students" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <StudentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/upload-notes" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UploadNotesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/notes-management" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NotesManagementPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/timetable-scheduler" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TimetableSchedulerPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/generate-qr" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <GenerateQRPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/attendance-reports" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AttendanceReportsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/announcement" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AnnouncementPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TimetableProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
