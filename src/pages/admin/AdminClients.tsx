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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Plus, 
  MoreHorizontal,
  Building2,
  Eye,
  Edit,
  Trash2,
  Filter,
  Users,
  FileText,
  DollarSign
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  trn: string;
  corporateTaxNo: string;
  industry: string;
  engagements: number;
  activeEngagements: number;
  partner: string;
  manager: string;
  status: 'active' | 'inactive' | 'prospect';
  revenue: number;
  createdAt: string;
}

const clients: Client[] = [
  { id: '1', name: 'Al Rashid Trading LLC', trn: '100123456789012', corporateTaxNo: 'CT-001234', industry: 'Trading', engagements: 4, activeEngagements: 3, partner: 'Emily Davis', manager: 'Sarah Johnson', status: 'active', revenue: 85000, createdAt: '2022-03-15' },
  { id: '2', name: 'Emirates Motors', trn: '100234567890123', corporateTaxNo: 'CT-002345', industry: 'Automotive', engagements: 2, activeEngagements: 2, partner: 'Emily Davis', manager: 'Mike Chen', status: 'active', revenue: 45000, createdAt: '2023-01-20' },
  { id: '3', name: 'Gulf Properties LLC', trn: '100345678901234', corporateTaxNo: 'CT-003456', industry: 'Real Estate', engagements: 3, activeEngagements: 2, partner: 'David Williams', manager: 'Sarah Johnson', status: 'active', revenue: 120000, createdAt: '2021-06-10' },
  { id: '4', name: 'Dubai Traders FZE', trn: '100456789012345', corporateTaxNo: 'CT-004567', industry: 'Trading', engagements: 2, activeEngagements: 1, partner: 'Emily Davis', manager: 'Lisa Martinez', status: 'active', revenue: 35000, createdAt: '2023-06-05' },
  { id: '5', name: 'Tech Solutions ME', trn: '100567890123456', corporateTaxNo: 'CT-005678', industry: 'Technology', engagements: 2, activeEngagements: 0, partner: 'David Williams', manager: 'Mike Chen', status: 'inactive', revenue: 28000, createdAt: '2022-09-12' },
  { id: '6', name: 'Hospitality Group', trn: '100678901234567', corporateTaxNo: 'CT-006789', industry: 'Hospitality', engagements: 5, activeEngagements: 4, partner: 'Emily Davis', manager: 'Sarah Johnson', status: 'active', revenue: 150000, createdAt: '2020-11-28' },
  { id: '7', name: 'New Venture LLC', trn: '', corporateTaxNo: '', industry: 'Consulting', engagements: 0, activeEngagements: 0, partner: '', manager: '', status: 'prospect', revenue: 0, createdAt: '2024-02-01' },
];

const statusConfig = {
  active: { label: 'Active', className: 'bg-success/10 text-success border-success/30' },
  inactive: { label: 'Inactive', className: 'bg-muted text-muted-foreground' },
  prospect: { label: 'Prospect', className: 'bg-warning/10 text-warning border-warning/30' },
};

export default function AdminClients() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.trn.includes(searchQuery)
  );

  const totalRevenue = clients.reduce((sum, c) => sum + c.revenue, 0);
  const activeCount = clients.filter(c => c.status === 'active').length;

  return (
    <DashboardLayout title="Client Management" subtitle="Manage all client accounts">
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
                <Users className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold">{activeCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-secondary/10 p-3">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Engagements</p>
                <p className="text-2xl font-bold">{clients.reduce((sum, c) => sum + c.engagements, 0)}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-warning/10 p-3">
                <DollarSign className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">AED {(totalRevenue / 1000).toFixed(0)}K</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg">All Clients</CardTitle>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Client
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Add New Client</DialogTitle>
                      <DialogDescription>
                        Enter the client details to create a new account.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Company Name</Label>
                        <Input id="name" placeholder="Enter company name" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="trn">TRN</Label>
                          <Input id="trn" placeholder="Tax Registration Number" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="ctno">CT Number</Label>
                          <Input id="ctno" placeholder="Corporate Tax Number" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input id="industry" placeholder="Select industry" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="partner">Engagement Partner</Label>
                          <Input id="partner" placeholder="Select partner" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="manager">Engagement Manager</Label>
                          <Input id="manager" placeholder="Select manager" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Create Client</Button>
                    </div>
                  </DialogContent>
                </Dialog>
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
                  <TableHead>Partner</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => {
                  const status = statusConfig[client.status];
                  
                  return (
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
                      <TableCell className="font-mono text-sm">
                        {client.trn || <span className="text-muted-foreground">-</span>}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{client.activeEngagements}</span>
                          <span className="text-muted-foreground">/ {client.engagements}</span>
                        </div>
                      </TableCell>
                      <TableCell>{client.partner || <span className="text-muted-foreground">Unassigned</span>}</TableCell>
                      <TableCell className="font-medium">
                        {client.revenue > 0 ? `AED ${client.revenue.toLocaleString()}` : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={status.className}>
                          {status.label}
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
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Engagements
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
