import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Client Pages
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientDocuments from "./pages/client/ClientDocuments";
import ClientRequests from "./pages/client/ClientRequests";
import ClientInvoices from "./pages/client/ClientInvoices";
import ClientAgreements from "./pages/client/ClientAgreements";
import ClientCompliance from "./pages/client/ClientCompliance";

// Employee Pages
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeTasks from "./pages/employee/EmployeeTasks";
import EmployeeClients from "./pages/employee/EmployeeClients";
import EmployeeAudit from "./pages/employee/EmployeeAudit";
import EmployeeAccounting from "./pages/employee/EmployeeAccounting";
import EmployeeTax from "./pages/employee/EmployeeTax";
import EmployeeDocuments from "./pages/employee/EmployeeDocuments";
import EmployeeTimesheet from "./pages/employee/EmployeeTimesheet";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminClients from "./pages/admin/AdminClients";
import AdminEngagements from "./pages/admin/AdminEngagements";
import AdminIntegrations from "./pages/admin/AdminIntegrations";
import AdminLogs from "./pages/admin/AdminLogs";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      
      {/* Client Routes */}
      <Route path="/client" element={<ProtectedRoute allowedRoles={['client']}><ClientDashboard /></ProtectedRoute>} />
      <Route path="/client/documents" element={<ProtectedRoute allowedRoles={['client']}><ClientDocuments /></ProtectedRoute>} />
      <Route path="/client/requests" element={<ProtectedRoute allowedRoles={['client']}><ClientRequests /></ProtectedRoute>} />
      <Route path="/client/invoices" element={<ProtectedRoute allowedRoles={['client']}><ClientInvoices /></ProtectedRoute>} />
      <Route path="/client/agreements" element={<ProtectedRoute allowedRoles={['client']}><ClientAgreements /></ProtectedRoute>} />
      <Route path="/client/compliance" element={<ProtectedRoute allowedRoles={['client']}><ClientCompliance /></ProtectedRoute>} />
      
      {/* Employee Routes */}
      <Route path="/employee" element={<ProtectedRoute allowedRoles={['employee']}><EmployeeDashboard /></ProtectedRoute>} />
      <Route path="/employee/tasks" element={<ProtectedRoute allowedRoles={['employee']}><EmployeeTasks /></ProtectedRoute>} />
      <Route path="/employee/clients" element={<ProtectedRoute allowedRoles={['employee']}><EmployeeClients /></ProtectedRoute>} />
      <Route path="/employee/audit" element={<ProtectedRoute allowedRoles={['employee']}><EmployeeAudit /></ProtectedRoute>} />
      <Route path="/employee/accounting" element={<ProtectedRoute allowedRoles={['employee']}><EmployeeAccounting /></ProtectedRoute>} />
      <Route path="/employee/tax" element={<ProtectedRoute allowedRoles={['employee']}><EmployeeTax /></ProtectedRoute>} />
      <Route path="/employee/documents" element={<ProtectedRoute allowedRoles={['employee']}><EmployeeDocuments /></ProtectedRoute>} />
      <Route path="/employee/timesheet" element={<ProtectedRoute allowedRoles={['employee']}><EmployeeTimesheet /></ProtectedRoute>} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/clients" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminClients /></ProtectedRoute>} />
      <Route path="/admin/engagements" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminEngagements /></ProtectedRoute>} />
      <Route path="/admin/integrations" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminIntegrations /></ProtectedRoute>} />
      <Route path="/admin/logs" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminLogs /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
