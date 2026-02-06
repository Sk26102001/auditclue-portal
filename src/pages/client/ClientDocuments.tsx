import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DocumentUpload } from '@/components/documents/DocumentUpload';
import { FolderTree, sampleFolders } from '@/components/documents/FolderTree';
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
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  FileText,
  FileSpreadsheet,
  Image,
  File,
  Clock
} from 'lucide-react';

interface DocumentFile {
  id: string;
  name: string;
  folder: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  version: number;
}

const documents: DocumentFile[] = [
  { id: '1', name: 'Bank Statement Q4 2023.pdf', folder: 'Audit', type: 'pdf', size: 2400000, uploadedBy: 'Ahmed Al Rashid', uploadedAt: '2024-02-05T10:30:00', version: 1 },
  { id: '2', name: 'Sales Invoice Register.xlsx', folder: 'VAT', type: 'excel', size: 1800000, uploadedBy: 'Sarah Johnson', uploadedAt: '2024-02-04T14:20:00', version: 2 },
  { id: '3', name: 'Fixed Assets Schedule.xlsx', folder: 'Audit', type: 'excel', size: 950000, uploadedBy: 'Mike Chen', uploadedAt: '2024-02-03T09:15:00', version: 1 },
  { id: '4', name: 'Trade License Copy.pdf', folder: 'Contracts', type: 'pdf', size: 1200000, uploadedBy: 'Ahmed Al Rashid', uploadedAt: '2024-02-01T16:45:00', version: 1 },
  { id: '5', name: 'VAT Return Q3 2023.pdf', folder: 'VAT', type: 'pdf', size: 850000, uploadedBy: 'Sarah Johnson', uploadedAt: '2024-01-28T11:00:00', version: 1 },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-5 w-5 text-destructive" />;
    case 'excel':
      return <FileSpreadsheet className="h-5 w-5 text-success" />;
    case 'image':
      return <Image className="h-5 w-5 text-secondary" />;
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

export default function ClientDocuments() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = !selectedFolder || doc.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  return (
    <DashboardLayout title="Documents" subtitle="Manage and access your documents">
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar - Folder Tree */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Folders</CardTitle>
            </CardHeader>
            <CardContent>
              <FolderTree
                items={sampleFolders}
                selectedId={selectedFolder || undefined}
                onSelect={(item) => setSelectedFolder(item.type === 'folder' ? item.name : null)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6 lg:col-span-3">
          {/* Upload */}
          <DocumentUpload folder={selectedFolder || undefined} />

          {/* Document List */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-lg">
                  {selectedFolder ? `${selectedFolder} Documents` : 'All Documents'}
                </CardTitle>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Folder</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getFileIcon(doc.type)}
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{doc.folder}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatFileSize(doc.size)}
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
                      <TableCell>
                        <Badge variant="outline">v{doc.version}</Badge>
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
    </DashboardLayout>
  );
}
