import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { 
  Calculator, 
  FileText, 
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Download,
  MessageSquare,
  Calendar
} from 'lucide-react';

interface AccountingClient {
  id: string;
  name: string;
  period: string;
  status: 'pending' | 'in_progress' | 'review' | 'completed';
  progress: number;
  dueDate: string;
  trialBalanceUploaded: boolean;
  adjustingEntries: number;
  clarificationsOpen: number;
}

const accountingClients: AccountingClient[] = [
  { id: '1', name: 'Al Rashid Trading LLC', period: 'January 2024', status: 'in_progress', progress: 60, dueDate: '2024-02-15', trialBalanceUploaded: true, adjustingEntries: 3, clarificationsOpen: 2 },
  { id: '2', name: 'Emirates Motors', period: 'January 2024', status: 'completed', progress: 100, dueDate: '2024-02-10', trialBalanceUploaded: true, adjustingEntries: 0, clarificationsOpen: 0 },
  { id: '3', name: 'Gulf Properties LLC', period: 'January 2024', status: 'pending', progress: 0, dueDate: '2024-02-20', trialBalanceUploaded: false, adjustingEntries: 0, clarificationsOpen: 0 },
  { id: '4', name: 'Dubai Traders FZE', period: 'January 2024', status: 'review', progress: 85, dueDate: '2024-02-12', trialBalanceUploaded: true, adjustingEntries: 2, clarificationsOpen: 1 },
  { id: '5', name: 'Tech Solutions ME', period: 'January 2024', status: 'in_progress', progress: 45, dueDate: '2024-02-18', trialBalanceUploaded: true, adjustingEntries: 5, clarificationsOpen: 3 },
  { id: '6', name: 'Hospitality Group', period: 'January 2024', status: 'pending', progress: 0, dueDate: '2024-02-25', trialBalanceUploaded: false, adjustingEntries: 0, clarificationsOpen: 0 },
];

interface AdjustingEntry {
  id: string;
  client: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  status: 'pending' | 'approved' | 'posted';
  createdBy: string;
  createdAt: string;
}

const adjustingEntries: AdjustingEntry[] = [
  { id: '1', client: 'Al Rashid Trading', description: 'Prepaid expense adjustment', debitAccount: 'Prepaid Expenses', creditAccount: 'Expense Account', amount: 15000, status: 'pending', createdBy: 'Sarah J.', createdAt: '2024-02-05' },
  { id: '2', client: 'Al Rashid Trading', description: 'Accrued salaries', debitAccount: 'Salary Expense', creditAccount: 'Accrued Liabilities', amount: 45000, status: 'approved', createdBy: 'Sarah J.', createdAt: '2024-02-04' },
  { id: '3', client: 'Al Rashid Trading', description: 'Depreciation - January', debitAccount: 'Depreciation Expense', creditAccount: 'Accumulated Depreciation', amount: 8500, status: 'posted', createdBy: 'Ahmed K.', createdAt: '2024-02-03' },
  { id: '4', client: 'Dubai Traders', description: 'Revenue accrual', debitAccount: 'Accounts Receivable', creditAccount: 'Revenue', amount: 32000, status: 'pending', createdBy: 'Lisa M.', createdAt: '2024-02-06' },
];

const statusConfig = {
  pending: { label: 'Pending', icon: <Clock className="h-4 w-4" />, className: 'bg-muted text-muted-foreground' },
  in_progress: { label: 'In Progress', icon: <Clock className="h-4 w-4" />, className: 'bg-primary/10 text-primary border-primary/30' },
  review: { label: 'Under Review', icon: <Eye className="h-4 w-4" />, className: 'bg-secondary/10 text-secondary border-secondary/30' },
  completed: { label: 'Completed', icon: <CheckCircle2 className="h-4 w-4" />, className: 'bg-success/10 text-success border-success/30' },
  approved: { label: 'Approved', icon: <CheckCircle2 className="h-4 w-4" />, className: 'bg-success/10 text-success border-success/30' },
  posted: { label: 'Posted', icon: <CheckCircle2 className="h-4 w-4" />, className: 'bg-primary/10 text-primary border-primary/30' },
};

export default function EmployeeAccounting() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const pendingCount = accountingClients.filter(c => c.status === 'pending').length;
  const inProgressCount = accountingClients.filter(c => c.status === 'in_progress').length;
  const completedCount = accountingClients.filter(c => c.status === 'completed').length;

  return (
    <DashboardLayout title="Accounting" subtitle="Monthly bookkeeping and accounting status">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-bold">{accountingClients.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-warning/10 p-3">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{inProgressCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-success/10 p-3">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-destructive/10 p-3">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clarifications</p>
                <p className="text-2xl font-bold">{accountingClients.reduce((sum, c) => sum + c.clarificationsOpen, 0)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Monthly Status</TabsTrigger>
            <TabsTrigger value="entries">Adjusting Entries</TabsTrigger>
            <TabsTrigger value="clarifications">Clarifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">January 2024 - Accounting Status</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Current Period
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Trial Balance</TableHead>
                      <TableHead>Adj. Entries</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accountingClients.map((client) => {
                      const status = statusConfig[client.status];
                      const isOverdue = new Date(client.dueDate) < new Date() && client.status !== 'completed';
                      
                      return (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={client.progress} className="w-20 h-2" />
                              <span className="text-sm text-muted-foreground">{client.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {client.trialBalanceUploaded ? (
                              <Badge variant="outline" className="gap-1 bg-success/10 text-success border-success/30">
                                <CheckCircle2 className="h-3 w-3" />
                                Uploaded
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="gap-1">
                                <Clock className="h-3 w-3" />
                                Pending
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {client.adjustingEntries > 0 ? (
                              <Badge variant="secondary">{client.adjustingEntries}</Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn('gap-1', status.className)}>
                              {status.icon}
                              {status.label}
                            </Badge>
                          </TableCell>
                          <TableCell className={cn(isOverdue && 'text-destructive font-medium')}>
                            {new Date(client.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Upload className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="entries">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Adjusting Entries Log</CardTitle>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    New Entry
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Debit</TableHead>
                      <TableHead>Credit</TableHead>
                      <TableHead>Amount (AED)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adjustingEntries.map((entry) => {
                      const status = statusConfig[entry.status];
                      
                      return (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">{entry.client}</TableCell>
                          <TableCell>{entry.description}</TableCell>
                          <TableCell className="text-sm">{entry.debitAccount}</TableCell>
                          <TableCell className="text-sm">{entry.creditAccount}</TableCell>
                          <TableCell className="font-mono">{entry.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn('gap-1', status.className)}>
                              {status.icon}
                              {status.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {entry.status === 'pending' && (
                                <Button variant="ghost" size="sm" className="h-8">
                                  Approve
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clarifications">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {accountingClients.filter(c => c.clarificationsOpen > 0).map((client) => (
                    <div key={client.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{client.name}</h4>
                        <Badge variant="secondary">{client.clarificationsOpen} open</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 text-sm">
                          <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p>Please confirm the nature of payment to vendor XYZ on Jan 15</p>
                            <p className="text-xs text-muted-foreground mt-1">Sent 2 days ago • Awaiting response</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
