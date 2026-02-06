import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  Download, 
  Eye, 
  CreditCard,
  Receipt,
  FileText,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter
} from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  description: string;
  amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
}

const invoices: Invoice[] = [
  { id: '1', invoiceNumber: 'INV-2024-001', description: 'Audit Services FY 2023', amount: 45000, currency: 'AED', status: 'overdue', issuedDate: '2024-01-15', dueDate: '2024-02-01' },
  { id: '2', invoiceNumber: 'INV-2024-002', description: 'VAT Return Preparation Q4 2023', amount: 8500, currency: 'AED', status: 'sent', issuedDate: '2024-02-01', dueDate: '2024-02-28' },
  { id: '3', invoiceNumber: 'INV-2023-045', description: 'Corporate Tax Registration', amount: 12000, currency: 'AED', status: 'paid', issuedDate: '2024-01-01', dueDate: '2024-01-15', paidDate: '2024-01-12' },
  { id: '4', invoiceNumber: 'INV-2023-044', description: 'Monthly Accounting - December 2023', amount: 5500, currency: 'AED', status: 'paid', issuedDate: '2023-12-28', dueDate: '2024-01-10', paidDate: '2024-01-08' },
  { id: '5', invoiceNumber: 'INV-2023-043', description: 'VAT Return Preparation Q3 2023', amount: 8500, currency: 'AED', status: 'paid', issuedDate: '2023-10-28', dueDate: '2023-11-15', paidDate: '2023-11-10' },
  { id: '6', invoiceNumber: 'INV-2024-003', description: 'Advisory Services - Tax Planning', amount: 15000, currency: 'AED', status: 'draft', issuedDate: '2024-02-05', dueDate: '2024-02-20' },
];

const statusConfig = {
  draft: { label: 'Draft', icon: <FileText className="h-4 w-4" />, className: 'bg-muted text-muted-foreground' },
  sent: { label: 'Sent', icon: <Clock className="h-4 w-4" />, className: 'bg-primary/10 text-primary border-primary/30' },
  paid: { label: 'Paid', icon: <CheckCircle2 className="h-4 w-4" />, className: 'bg-success/10 text-success border-success/30' },
  overdue: { label: 'Overdue', icon: <AlertCircle className="h-4 w-4" />, className: 'bg-destructive/10 text-destructive border-destructive/30' },
};

export default function ClientInvoices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = 
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = 
      selectedTab === 'all' || 
      inv.status === selectedTab ||
      (selectedTab === 'outstanding' && ['sent', 'overdue'].includes(inv.status));
    return matchesSearch && matchesTab;
  });

  const totalOutstanding = invoices
    .filter(inv => ['sent', 'overdue'].includes(inv.status))
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalOverdue = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalPaid = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <DashboardLayout title="Invoices" subtitle="View and manage your invoices">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-warning/10 p-3">
                <DollarSign className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-2xl font-bold">AED {totalOutstanding.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-destructive/10 p-3">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">AED {totalOverdue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-success/10 p-3">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Paid (YTD)</p>
                <p className="text-2xl font-bold">AED {totalPaid.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoice List */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Receipt className="h-5 w-5 text-muted-foreground" />
                Invoice History
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="outstanding">Outstanding</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
            </Tabs>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => {
                  const status = statusConfig[invoice.status];
                  const isOverdue = invoice.status === 'overdue';
                  
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell className="font-semibold">
                        {invoice.currency} {invoice.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn('gap-1', status.className)}>
                          {status.icon}
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className={cn(isOverdue && 'text-destructive font-medium')}>
                        {new Date(invoice.dueDate).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          {['sent', 'overdue'].includes(invoice.status) && (
                            <Button size="sm" className="h-8 gap-1">
                              <CreditCard className="h-3 w-3" />
                              Pay
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {filteredInvoices.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                No invoices found
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statement of Account */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Statement of Account</CardTitle>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download SOA
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-6 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">Statement of Account</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Download your complete statement of account including all invoices and payments.
              </p>
              <Button variant="outline">Generate SOA</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
