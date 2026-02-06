import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DocumentUpload } from '@/components/documents/DocumentUpload';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Filter, 
  Download, 
  Eye, 
  FileText,
  FileSpreadsheet,
  File,
  Clock,
  Lock,
  Users,
  FolderOpen,
  Upload
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  client: string;
  folder: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  version: number;
  visibility: 'internal' | 'client';
}

const documents: Document[] = [
  { id: '1', name: 'Audit Working Paper - Cash.xlsx', client: 'Al Rashid Trading', folder: 'Working Papers', type: 'excel', size: 2400000, uploadedBy: 'Sarah Johnson', uploadedAt: '2024-02-07T10:30:00', version: 3, visibility: 'internal' },
  { id: '2', name: 'Management Letter Draft.docx', client: 'Al Rashid Trading', folder: 'Drafts', type: 'doc', size: 1800000, uploadedBy: 'Mike Chen', uploadedAt: '2024-02-06T14:20:00', version: 2, visibility: 'internal' },
  { id: '3', name: 'Partner Review Notes.pdf', client: 'Emirates Motors', folder: 'Review Notes', type: 'pdf', size: 950000, uploadedBy: 'Emily Davis', uploadedAt: '2024-02-05T09:15:00', version: 1, visibility: 'internal' },
  { id: '4', name: 'VAT Computation Q4 2023.xlsx', client: 'Gulf Properties', folder: 'VAT', type: 'excel', size: 1200000, uploadedBy: 'Lisa Martinez', uploadedAt: '2024-02-04T16:45:00', version: 1, visibility: 'client' },
  { id: '5', name: 'Audit Report Final.pdf', client: 'Dubai Traders', folder: 'Final Reports', type: 'pdf', size: 3500000, uploadedBy: 'Sarah Johnson', uploadedAt: '2024-02-03T11:00:00', version: 1, visibility: 'client' },
  { id: '6', name: 'CT Computation Template.xlsx', client: 'Tech Solutions', folder: 'Templates', type: 'excel', size: 450000, uploadedBy: 'Mike Chen', uploadedAt: '2024-02-02T08:30:00', version: 5, visibility: 'internal' },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-5 w-5 text-destructive" />;
    case 'excel':
      return <FileSpreadsheet className="h-5 w-5 text-success" />;
    case 'doc':
      return <FileText className="h-5 w-5 text-primary" />;
    default:
      return <File className="h-5 w-5 text-muted-foreground" />;
  }
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function EmployeeDocuments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || doc.visibility === selectedTab;
    return matchesSearch && matchesTab;
  });

  return (
    <DashboardLayout title="Documents" subtitle="Manage internal working papers and files">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold">{documents.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-warning/10 p-3">
                <Lock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Internal Only</p>
                <p className="text-2xl font-bold">{documents.filter(d => d.visibility === 'internal').length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-success/10 p-3">
                <Users className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Client Visible</p>
                <p className="text-2xl font-bold">{documents.filter(d => d.visibility === 'client').length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-secondary/10 p-3">
                <Upload className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Uploaded Today</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upload Section */}
          <div>
            <DocumentUpload />
          </div>

          {/* Document List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-lg">All Documents</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search documents..."
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
                    <TabsTrigger value="internal" className="gap-1">
                      <Lock className="h-3 w-3" />
                      Internal
                    </TabsTrigger>
                    <TabsTrigger value="client" className="gap-1">
                      <Users className="h-3 w-3" />
                      Client Visible
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Visibility</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {getFileIcon(doc.type)}
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{formatFileSize(doc.size)}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{doc.client}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              'gap-1',
                              doc.visibility === 'internal' 
                                ? 'bg-warning/10 text-warning border-warning/30' 
                                : 'bg-success/10 text-success border-success/30'
                            )}
                          >
                            {doc.visibility === 'internal' ? (
                              <Lock className="h-3 w-3" />
                            ) : (
                              <Users className="h-3 w-3" />
                            )}
                            {doc.visibility === 'internal' ? 'Internal' : 'Client'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">v{doc.version}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {new Date(doc.uploadedAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredDocuments.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">
                    No documents found
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
