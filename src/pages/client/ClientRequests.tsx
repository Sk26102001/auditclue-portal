import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Paperclip,
  Send,
  Search,
  Filter
} from 'lucide-react';

interface Request {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'responded' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  engagement: string;
  responses: {
    id: string;
    message: string;
    from: string;
    fromRole: 'client' | 'team';
    createdAt: string;
    attachments?: string[];
  }[];
}

const requests: Request[] = [
  {
    id: '1',
    title: 'Bank statements for Q4 2023',
    description: 'Please provide bank statements for all accounts for October, November, and December 2023.',
    status: 'open',
    priority: 'high',
    createdAt: '2024-02-05T10:30:00',
    updatedAt: '2024-02-05T10:30:00',
    engagement: 'Audit',
    responses: [
      { id: '1', message: 'Please upload the bank statements at your earliest convenience. We need these to proceed with the cash and bank audit procedures.', from: 'Sarah Johnson', fromRole: 'team', createdAt: '2024-02-05T10:30:00' },
    ],
  },
  {
    id: '2',
    title: 'Supplier invoices verification',
    description: 'We need copies of invoices from your top 5 suppliers for the year 2023.',
    status: 'responded',
    priority: 'medium',
    createdAt: '2024-02-03T14:20:00',
    updatedAt: '2024-02-06T09:15:00',
    engagement: 'Audit',
    responses: [
      { id: '1', message: 'Please provide invoices from your major suppliers for our verification.', from: 'Mike Chen', fromRole: 'team', createdAt: '2024-02-03T14:20:00' },
      { id: '2', message: 'I have uploaded the invoices in the Documents section under Audit folder.', from: 'Ahmed Al Rashid', fromRole: 'client', createdAt: '2024-02-06T09:15:00', attachments: ['Supplier_Invoices_2023.zip'] },
    ],
  },
  {
    id: '3',
    title: 'VAT registration certificate',
    description: 'Please share a copy of your VAT registration certificate for our records.',
    status: 'closed',
    priority: 'low',
    createdAt: '2024-01-28T11:00:00',
    updatedAt: '2024-01-30T15:45:00',
    engagement: 'VAT',
    responses: [
      { id: '1', message: 'We need a copy of your VAT registration certificate.', from: 'Lisa Martinez', fromRole: 'team', createdAt: '2024-01-28T11:00:00' },
      { id: '2', message: 'Here is the certificate.', from: 'Ahmed Al Rashid', fromRole: 'client', createdAt: '2024-01-29T10:00:00', attachments: ['VAT_Certificate.pdf'] },
      { id: '3', message: 'Thank you. This request is now closed.', from: 'Lisa Martinez', fromRole: 'team', createdAt: '2024-01-30T15:45:00' },
    ],
  },
];

const statusConfig = {
  open: { label: 'Open', icon: <AlertCircle className="h-4 w-4" />, className: 'bg-warning/10 text-warning border-warning/30' },
  responded: { label: 'Responded', icon: <Clock className="h-4 w-4" />, className: 'bg-primary/10 text-primary border-primary/30' },
  closed: { label: 'Closed', icon: <CheckCircle2 className="h-4 w-4" />, className: 'bg-success/10 text-success border-success/30' },
};

function RequestCard({ request, onClick }: { request: Request; onClick: () => void }) {
  const status = statusConfig[request.status];
  
  return (
    <Card className="cursor-pointer transition-all hover:shadow-md" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={cn('text-xs gap-1', status.className)}>
                {status.icon}
                {status.label}
              </Badge>
              <Badge variant="secondary" className="text-xs">{request.engagement}</Badge>
            </div>
            <h4 className="font-medium mb-1">{request.title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{request.description}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">
              {new Date(request.updatedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
              })}
            </p>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <MessageSquare className="h-3 w-3" />
              {request.responses.length}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ClientRequests() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || req.status === selectedTab;
    return matchesSearch && matchesTab;
  });

  return (
    <DashboardLayout title="Requests" subtitle="View and respond to information requests">
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs and List */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="open" className="gap-1">
              Open
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                {requests.filter(r => r.status === 'open').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="responded">Responded</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-3">
            {filteredRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No requests found
                </CardContent>
              </Card>
            ) : (
              filteredRequests.map((request) => (
                <Dialog key={request.id}>
                  <DialogTrigger asChild>
                    <div>
                      <RequestCard request={request} onClick={() => setSelectedRequest(request)} />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cn('text-xs gap-1', statusConfig[request.status].className)}>
                          {statusConfig[request.status].icon}
                          {statusConfig[request.status].label}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">{request.engagement}</Badge>
                      </div>
                      <DialogTitle>{request.title}</DialogTitle>
                      <DialogDescription>{request.description}</DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex-1 overflow-y-auto space-y-4 py-4">
                      {request.responses.map((response) => (
                        <div
                          key={response.id}
                          className={cn(
                            'flex gap-3',
                            response.fromRole === 'client' && 'flex-row-reverse'
                          )}
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                            {response.from.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className={cn(
                            'max-w-[80%] rounded-lg p-3',
                            response.fromRole === 'client' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          )}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium">{response.from}</span>
                              <span className={cn(
                                'text-xs',
                                response.fromRole === 'client' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                              )}>
                                {new Date(response.createdAt).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                            <p className="text-sm">{response.message}</p>
                            {response.attachments && response.attachments.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {response.attachments.map((file, i) => (
                                  <Badge key={i} variant="secondary" className="gap-1">
                                    <Paperclip className="h-3 w-3" />
                                    {file}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {request.status !== 'closed' && (
                      <div className="flex gap-2 pt-4 border-t">
                        <Textarea
                          placeholder="Type your response..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1 min-h-[80px]"
                        />
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="icon">
                            <Paperclip className="h-4 w-4" />
                          </Button>
                          <Button size="icon">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              ))
            )}
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
