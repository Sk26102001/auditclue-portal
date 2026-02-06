import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Plus, 
  MoreHorizontal,
  Building2,
  Eye,
  FileText,
  MessageSquare,
  Filter,
  Calendar
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  trn: string;
  industry: string;
  engagements: string[];
  assignedPartner: string;
  assignedManager: string;
  financialYearEnd: string;
  status: 'active' | 'inactive';
  lastActivity: string;
}

const clients: Client[] = [
  { id: '1', name: 'Al Rashid Trading LLC', trn: '100123456789012', industry: 'Trading', engagements: ['Audit', 'VAT', 'Accounting'], assignedPartner: 'Emily Davis', assignedManager: 'Sarah Johnson', financialYearEnd: 'December', status: 'active', lastActivity: '2 hours ago' },
  { id: '2', name: 'Emirates Motors', trn: '100234567890123', industry: 'Automotive', engagements: ['VAT', 'Corporate Tax'], assignedPartner: 'Emily Davis', assignedManager: 'Mike Chen', financialYearEnd: 'December', status: 'active', lastActivity: '5 hours ago' },
  { id: '3', name: 'Gulf Properties LLC', trn: '100345678901234', industry: 'Real Estate', engagements: ['Corporate Tax', 'Advisory'], assignedPartner: 'David Williams', assignedManager: 'Sarah Johnson', financialYearEnd: 'March', status: 'active', lastActivity: 'Yesterday' },
  { id: '4', name: 'Dubai Traders FZE', trn: '100456789012345', industry: 'Trading', engagements: ['Audit', 'VAT'], assignedPartner: 'Emily Davis', assignedManager: 'Lisa Martinez', financialYearEnd: 'December', status: 'active', lastActivity: '3 days ago' },
  { id: '5', name: 'Tech Solutions ME', trn: '100567890123456', industry: 'Technology', engagements: ['Accounting', 'VAT'], assignedPartner: 'David Williams', assignedManager: 'Mike Chen', financialYearEnd: 'June', status: 'inactive', lastActivity: '2 weeks ago' },
  { id: '6', name: 'Hospitality Group', trn: '100678901234567', industry: 'Hospitality', engagements: ['Audit', 'VAT', 'Corporate Tax', 'Payroll'], assignedPartner: 'Emily Davis', assignedManager: 'Sarah Johnson', financialYearEnd: 'December', status: 'active', lastActivity: '1 day ago' },
];

const engagementColors: Record<string, string> = {
  'Audit': 'bg-primary/10 text-primary',
  'VAT': 'bg-secondary/10 text-secondary',
  'Corporate Tax': 'bg-warning/10 text-warning',
  'Accounting': 'bg-success/10 text-success',
  'Advisory': 'bg-chart-4/10 text-chart-4',
  'Payroll': 'bg-chart-5/10 text-chart-5',
};

export default function EmployeeClients() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.trn.includes(searchQuery)
  );

  return (
    <DashboardLayout title="Clients" subtitle="Manage assigned client portfolio">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-bold">{clients.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-success/10 p-3">
                <Building2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{clients.filter(c => c.status === 'active').length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-secondary/10 p-3">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Engagements</p>
                <p className="text-2xl font-bold">{clients.reduce((sum, c) => sum + c.engagements.length, 0)}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-warning/10 p-3">
                <Calendar className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Year-End This Month</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg">Client Portfolio</CardTitle>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Client
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>TRN</TableHead>
                  <TableHead>Engagements</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>FY End</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {client.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-xs text-muted-foreground">{client.industry}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{client.trn}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {client.engagements.slice(0, 3).map((eng) => (
                          <Badge key={eng} variant="secondary" className={cn('text-xs', engagementColors[eng])}>
                            {eng}
                          </Badge>
                        ))}
                        {client.engagements.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{client.engagements.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{client.assignedManager}</TableCell>
                    <TableCell>{client.financialYearEnd}</TableCell>
                    <TableCell>
                      <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Documents
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredClients.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                No clients found
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
