import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Plus, 
  Filter,
  Briefcase,
  ClipboardCheck,
  Receipt,
  Building2,
  Calculator,
  Lightbulb,
  Users,
  Calendar,
  Eye
} from 'lucide-react';

interface Engagement {
  id: string;
  client: string;
  type: 'audit' | 'vat' | 'corporate_tax' | 'accounting' | 'advisory' | 'payroll';
  period: string;
  status: 'not_started' | 'in_progress' | 'under_review' | 'completed';
  progress: number;
  partner: string;
  manager: string;
  team: string[];
  startDate: string;
  dueDate: string;
  fee: number;
  billedAmount: number;
}

const engagements: Engagement[] = [
  { id: '1', client: 'Al Rashid Trading LLC', type: 'audit', period: 'FY 2023', status: 'in_progress', progress: 65, partner: 'Emily Davis', manager: 'Sarah Johnson', team: ['Ahmed K.', 'Lisa M.'], startDate: '2024-01-15', dueDate: '2024-03-31', fee: 45000, billedAmount: 30000 },
  { id: '2', client: 'Al Rashid Trading LLC', type: 'vat', period: 'Q1 2024', status: 'in_progress', progress: 45, partner: 'Emily Davis', manager: 'Sarah Johnson', team: ['Ahmed K.'], startDate: '2024-01-01', dueDate: '2024-04-28', fee: 8500, billedAmount: 0 },
  { id: '3', client: 'Emirates Motors', type: 'vat', period: 'Q1 2024', status: 'under_review', progress: 85, partner: 'Emily Davis', manager: 'Mike Chen', team: ['Lisa M.'], startDate: '2024-01-01', dueDate: '2024-04-28', fee: 8500, billedAmount: 0 },
  { id: '4', client: 'Gulf Properties LLC', type: 'corporate_tax', period: 'FY 2024', status: 'in_progress', progress: 20, partner: 'David Williams', manager: 'Sarah Johnson', team: ['Mike C.'], startDate: '2024-02-01', dueDate: '2025-09-30', fee: 35000, billedAmount: 0 },
  { id: '5', client: 'Dubai Traders FZE', type: 'audit', period: 'FY 2023', status: 'completed', progress: 100, partner: 'Emily Davis', manager: 'Lisa Martinez', team: ['Ahmed K.'], startDate: '2023-12-01', dueDate: '2024-02-28', fee: 38000, billedAmount: 38000 },
  { id: '6', client: 'Hospitality Group', type: 'accounting', period: 'Monthly', status: 'in_progress', progress: 60, partner: 'Emily Davis', manager: 'Sarah Johnson', team: ['Lisa M.', 'Ahmed K.'], startDate: '2024-01-01', dueDate: '2024-12-31', fee: 60000, billedAmount: 25000 },
  { id: '7', client: 'Tech Solutions ME', type: 'advisory', period: 'Q1 2024', status: 'not_started', progress: 0, partner: 'David Williams', manager: 'Mike Chen', team: [], startDate: '2024-03-01', dueDate: '2024-04-30', fee: 25000, billedAmount: 0 },
];

const typeConfig = {
  audit: { label: 'Audit', icon: <ClipboardCheck className="h-4 w-4" />, color: 'bg-primary/10 text-primary border-primary/30' },
  vat: { label: 'VAT', icon: <Receipt className="h-4 w-4" />, color: 'bg-secondary/10 text-secondary border-secondary/30' },
  corporate_tax: { label: 'Corporate Tax', icon: <Building2 className="h-4 w-4" />, color: 'bg-warning/10 text-warning border-warning/30' },
  accounting: { label: 'Accounting', icon: <Calculator className="h-4 w-4" />, color: 'bg-success/10 text-success border-success/30' },
  advisory: { label: 'Advisory', icon: <Lightbulb className="h-4 w-4" />, color: 'bg-chart-4/10 text-chart-4 border-chart-4/30' },
  payroll: { label: 'Payroll', icon: <Users className="h-4 w-4" />, color: 'bg-chart-5/10 text-chart-5 border-chart-5/30' },
};

const statusConfig = {
  not_started: { label: 'Not Started', className: 'bg-muted text-muted-foreground' },
  in_progress: { label: 'In Progress', className: 'bg-primary/10 text-primary border-primary/30' },
  under_review: { label: 'Under Review', className: 'bg-secondary/10 text-secondary border-secondary/30' },
  completed: { label: 'Completed', className: 'bg-success/10 text-success border-success/30' },
};

export default function AdminEngagements() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredEngagements = engagements.filter((eng) => {
    const matchesSearch = eng.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || eng.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalFees = engagements.reduce((sum, e) => sum + e.fee, 0);
  const totalBilled = engagements.reduce((sum, e) => sum + e.billedAmount, 0);
  const inProgressCount = engagements.filter(e => ['in_progress', 'under_review'].includes(e.status)).length;

  return (
    <DashboardLayout title="Engagement Management" subtitle="Configure and monitor all engagements">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Engagements</p>
                <p className="text-2xl font-bold">{engagements.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-secondary/10 p-3">
                <Calendar className="h-6 w-6 text-secondary" />
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
                <Receipt className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Fees</p>
                <p className="text-2xl font-bold">AED {(totalFees / 1000).toFixed(0)}K</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-warning/10 p-3">
                <Receipt className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Billed</p>
                <p className="text-2xl font-bold">AED {(totalBilled / 1000).toFixed(0)}K</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagements Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg">All Engagements</CardTitle>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search engagements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="audit">Audit</SelectItem>
                    <SelectItem value="vat">VAT</SelectItem>
                    <SelectItem value="corporate_tax">Corporate Tax</SelectItem>
                    <SelectItem value="accounting">Accounting</SelectItem>
                    <SelectItem value="advisory">Advisory</SelectItem>
                    <SelectItem value="payroll">Payroll</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Engagement
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEngagements.map((engagement) => {
                  const type = typeConfig[engagement.type];
                  const status = statusConfig[engagement.status];
                  const daysUntilDue = Math.ceil((new Date(engagement.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  const isUrgent = daysUntilDue <= 14 && daysUntilDue > 0 && engagement.status !== 'completed';
                  
                  return (
                    <TableRow key={engagement.id}>
                      <TableCell className="font-medium">{engagement.client}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn('gap-1', type.color)}>
                          {type.icon}
                          {type.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{engagement.period}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={engagement.progress} className="w-16 h-2" />
                          <span className="text-sm text-muted-foreground">{engagement.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex -space-x-2">
                          {engagement.team.slice(0, 3).map((member, i) => (
                            <div
                              key={i}
                              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium"
                              title={member}
                            >
                              {member.charAt(0)}
                            </div>
                          ))}
                          {engagement.team.length > 3 && (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-medium text-primary-foreground">
                              +{engagement.team.length - 3}
                            </div>
                          )}
                          {engagement.team.length === 0 && (
                            <span className="text-muted-foreground text-sm">Unassigned</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className={cn(isUrgent && 'text-warning font-medium')}>
                        {new Date(engagement.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </TableCell>
                      <TableCell className="font-medium">AED {engagement.fee.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={status.className}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {filteredEngagements.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                No engagements found
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
