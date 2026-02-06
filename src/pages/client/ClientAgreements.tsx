import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  FileCheck, 
  Download, 
  Eye, 
  Pen,
  Search,
  Filter,
  FileText,
  Shield,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface Agreement {
  id: string;
  title: string;
  type: 'engagement_letter' | 'nda' | 'amendment' | 'consent';
  engagement: string;
  status: 'pending_signature' | 'signed' | 'expired';
  createdAt: string;
  signedAt?: string;
  expiresAt?: string;
  signedBy?: string;
}

const agreements: Agreement[] = [
  { 
    id: '1', 
    title: 'Audit Engagement Letter FY 2023', 
    type: 'engagement_letter', 
    engagement: 'Audit', 
    status: 'signed', 
    createdAt: '2024-01-05', 
    signedAt: '2024-01-08',
    signedBy: 'Ahmed Al Rashid'
  },
  { 
    id: '2', 
    title: 'VAT Services Agreement 2024', 
    type: 'engagement_letter', 
    engagement: 'VAT', 
    status: 'pending_signature', 
    createdAt: '2024-02-01'
  },
  { 
    id: '3', 
    title: 'Non-Disclosure Agreement', 
    type: 'nda', 
    engagement: 'General', 
    status: 'signed', 
    createdAt: '2023-06-15', 
    signedAt: '2023-06-16',
    signedBy: 'Ahmed Al Rashid',
    expiresAt: '2025-06-15'
  },
  { 
    id: '4', 
    title: 'Corporate Tax Advisory - Fee Amendment', 
    type: 'amendment', 
    engagement: 'Corporate Tax', 
    status: 'signed', 
    createdAt: '2024-01-20', 
    signedAt: '2024-01-22',
    signedBy: 'Ahmed Al Rashid'
  },
  { 
    id: '5', 
    title: 'Management Representation Letter', 
    type: 'consent', 
    engagement: 'Audit', 
    status: 'pending_signature', 
    createdAt: '2024-02-05'
  },
];

const typeConfig = {
  engagement_letter: { label: 'Engagement Letter', icon: <FileText className="h-4 w-4" /> },
  nda: { label: 'NDA', icon: <Shield className="h-4 w-4" /> },
  amendment: { label: 'Amendment', icon: <FileCheck className="h-4 w-4" /> },
  consent: { label: 'Consent Letter', icon: <FileText className="h-4 w-4" /> },
};

const statusConfig = {
  pending_signature: { label: 'Pending Signature', icon: <Clock className="h-4 w-4" />, className: 'bg-warning/10 text-warning border-warning/30' },
  signed: { label: 'Signed', icon: <CheckCircle2 className="h-4 w-4" />, className: 'bg-success/10 text-success border-success/30' },
  expired: { label: 'Expired', icon: <AlertTriangle className="h-4 w-4" />, className: 'bg-destructive/10 text-destructive border-destructive/30' },
};

export default function ClientAgreements() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgreements = agreements.filter((agreement) =>
    agreement.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCount = agreements.filter(a => a.status === 'pending_signature').length;

  return (
    <DashboardLayout title="Agreements" subtitle="View and sign engagement letters and agreements">
      <div className="space-y-6">
        {/* Pending Signature Alert */}
        {pendingCount > 0 && (
          <Card className="border-warning/30 bg-warning/5">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-warning/10 p-3">
                <Pen className="h-6 w-6 text-warning" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Documents Pending Your Signature</h3>
                <p className="text-sm text-muted-foreground">
                  You have {pendingCount} document{pendingCount > 1 ? 's' : ''} awaiting your signature.
                </p>
              </div>
              <Button className="gap-2">
                <Pen className="h-4 w-4" />
                Review & Sign
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Agreements</p>
                <p className="text-2xl font-bold">{agreements.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-success/10 p-3">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Signed</p>
                <p className="text-2xl font-bold">{agreements.filter(a => a.status === 'signed').length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-warning/10 p-3">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agreements Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileCheck className="h-5 w-5 text-muted-foreground" />
                All Agreements
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search agreements..."
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgreements.map((agreement) => {
                  const type = typeConfig[agreement.type];
                  const status = statusConfig[agreement.status];
                  
                  return (
                    <TableRow key={agreement.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            {type.icon}
                          </div>
                          <div>
                            <p className="font-medium">{agreement.title}</p>
                            {agreement.signedBy && (
                              <p className="text-xs text-muted-foreground">
                                Signed by {agreement.signedBy}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{type.label}</Badge>
                      </TableCell>
                      <TableCell>{agreement.engagement}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn('gap-1', status.className)}>
                          {status.icon}
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {agreement.signedAt 
                          ? new Date(agreement.signedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                          : new Date(agreement.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          {agreement.status === 'pending_signature' && (
                            <Button size="sm" className="h-8 gap-1">
                              <Pen className="h-3 w-3" />
                              Sign
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {filteredAgreements.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                No agreements found
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
