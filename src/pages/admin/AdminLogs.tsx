import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Shield,
  LogIn,
  LogOut,
  FileEdit,
  Eye,
  Download,
  Trash2,
  UserPlus,
  Settings,
  Filter,
  Calendar
} from 'lucide-react';

interface AuditLog {
  id: string;
  action: 'login' | 'logout' | 'create' | 'update' | 'delete' | 'view' | 'download' | 'settings';
  description: string;
  user: string;
  userRole: string;
  resource: string;
  ipAddress: string;
  timestamp: string;
  details?: string;
}

const auditLogs: AuditLog[] = [
  { id: '1', action: 'login', description: 'User logged in', user: 'Sarah Johnson', userRole: 'Manager', resource: 'System', ipAddress: '192.168.1.100', timestamp: '2024-02-07T10:30:00' },
  { id: '2', action: 'download', description: 'Downloaded audit working paper', user: 'Sarah Johnson', userRole: 'Manager', resource: 'CB-1.xlsx', ipAddress: '192.168.1.100', timestamp: '2024-02-07T10:35:00', details: 'Client: Al Rashid Trading' },
  { id: '3', action: 'update', description: 'Updated client profile', user: 'Mike Chen', userRole: 'Manager', resource: 'Emirates Motors', ipAddress: '192.168.1.105', timestamp: '2024-02-07T09:45:00', details: 'Changed contact email' },
  { id: '4', action: 'create', description: 'Created new engagement', user: 'Emily Davis', userRole: 'Partner', resource: 'Gulf Properties - CT', ipAddress: '192.168.1.110', timestamp: '2024-02-07T09:30:00' },
  { id: '5', action: 'view', description: 'Viewed invoice', user: 'Ahmed Al Rashid', userRole: 'Client', resource: 'INV-2024-001', ipAddress: '203.45.67.89', timestamp: '2024-02-07T09:15:00' },
  { id: '6', action: 'settings', description: 'Updated integration settings', user: 'David Williams', userRole: 'Admin', resource: 'Zoho Books', ipAddress: '192.168.1.115', timestamp: '2024-02-07T09:00:00' },
  { id: '7', action: 'delete', description: 'Deleted draft document', user: 'Lisa Martinez', userRole: 'Senior', resource: 'Draft_Report_v1.docx', ipAddress: '192.168.1.120', timestamp: '2024-02-07T08:45:00' },
  { id: '8', action: 'logout', description: 'User logged out', user: 'Ahmed Khan', userRole: 'Junior', resource: 'System', ipAddress: '192.168.1.125', timestamp: '2024-02-06T18:00:00' },
  { id: '9', action: 'login', description: 'Failed login attempt', user: 'Unknown', userRole: '-', resource: 'System', ipAddress: '45.67.89.123', timestamp: '2024-02-06T14:30:00', details: 'Invalid credentials' },
  { id: '10', action: 'create', description: 'Created new user', user: 'David Williams', userRole: 'Admin', resource: 'Fatima Al Mazrouei', ipAddress: '192.168.1.115', timestamp: '2024-02-06T11:00:00' },
];

const actionConfig = {
  login: { label: 'Login', icon: <LogIn className="h-4 w-4" />, className: 'bg-success/10 text-success' },
  logout: { label: 'Logout', icon: <LogOut className="h-4 w-4" />, className: 'bg-muted text-muted-foreground' },
  create: { label: 'Create', icon: <UserPlus className="h-4 w-4" />, className: 'bg-primary/10 text-primary' },
  update: { label: 'Update', icon: <FileEdit className="h-4 w-4" />, className: 'bg-secondary/10 text-secondary' },
  delete: { label: 'Delete', icon: <Trash2 className="h-4 w-4" />, className: 'bg-destructive/10 text-destructive' },
  view: { label: 'View', icon: <Eye className="h-4 w-4" />, className: 'bg-muted text-muted-foreground' },
  download: { label: 'Download', icon: <Download className="h-4 w-4" />, className: 'bg-warning/10 text-warning' },
  settings: { label: 'Settings', icon: <Settings className="h-4 w-4" />, className: 'bg-chart-4/10 text-chart-4' },
};

export default function AdminLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = 
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const todayCount = auditLogs.filter(log => 
    new Date(log.timestamp).toDateString() === new Date().toDateString()
  ).length;

  return (
    <DashboardLayout title="Audit Logs" subtitle="Security and activity monitoring">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{auditLogs.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-success/10 p-3">
                <LogIn className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Logins Today</p>
                <p className="text-2xl font-bold">{auditLogs.filter(l => l.action === 'login').length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-warning/10 p-3">
                <Download className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Downloads</p>
                <p className="text-2xl font-bold">{auditLogs.filter(l => l.action === 'download').length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-destructive/10 p-3">
                <Trash2 className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deletions</p>
                <p className="text-2xl font-bold">{auditLogs.filter(l => l.action === 'delete').length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logs Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg">Activity Log</CardTitle>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="login">Login</SelectItem>
                    <SelectItem value="logout">Logout</SelectItem>
                    <SelectItem value="create">Create</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                    <SelectItem value="view">View</SelectItem>
                    <SelectItem value="download">Download</SelectItem>
                    <SelectItem value="settings">Settings</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Date Range
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => {
                  const action = actionConfig[log.action];
                  const isFailedLogin = log.description.includes('Failed');
                  
                  return (
                    <TableRow key={log.id} className={cn(isFailedLogin && 'bg-destructive/5')}>
                      <TableCell>
                        <Badge variant="secondary" className={cn('gap-1', action.className)}>
                          {action.icon}
                          {action.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className={cn('font-medium', isFailedLogin && 'text-destructive')}>
                            {log.description}
                          </p>
                          {log.details && (
                            <p className="text-xs text-muted-foreground">{log.details}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{log.user}</p>
                          <p className="text-xs text-muted-foreground">{log.userRole}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{log.resource}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">{log.ipAddress}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {filteredLogs.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                No logs found
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
