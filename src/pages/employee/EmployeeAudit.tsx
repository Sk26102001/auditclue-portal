import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { 
  ClipboardList, 
  FileText, 
  Upload,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  Eye,
  Download,
  User
} from 'lucide-react';

interface AuditProgram {
  id: string;
  name: string;
  area: string;
  progress: number;
  items: {
    id: string;
    description: string;
    completed: boolean;
    assignedTo: string;
    workingPaper?: string;
    reviewNotes?: string;
  }[];
}

interface AuditEngagement {
  id: string;
  client: string;
  period: string;
  status: 'planning' | 'fieldwork' | 'review' | 'reporting' | 'completed';
  progress: number;
  partner: string;
  manager: string;
  dueDate: string;
}

const auditEngagements: AuditEngagement[] = [
  { id: '1', client: 'Al Rashid Trading LLC', period: 'FY 2023', status: 'fieldwork', progress: 65, partner: 'Emily Davis', manager: 'Sarah Johnson', dueDate: '2024-03-31' },
  { id: '2', client: 'Dubai Traders FZE', period: 'FY 2023', status: 'planning', progress: 25, partner: 'Emily Davis', manager: 'Lisa Martinez', dueDate: '2024-04-15' },
  { id: '3', client: 'Hospitality Group', period: 'FY 2023', status: 'review', progress: 85, partner: 'Emily Davis', manager: 'Sarah Johnson', dueDate: '2024-03-15' },
];

const auditPrograms: AuditProgram[] = [
  {
    id: '1',
    name: 'Cash & Bank',
    area: 'Assets',
    progress: 80,
    items: [
      { id: '1-1', description: 'Obtain bank confirmations for all accounts', completed: true, assignedTo: 'Sarah J.', workingPaper: 'CB-1' },
      { id: '1-2', description: 'Perform bank reconciliation review', completed: true, assignedTo: 'Sarah J.', workingPaper: 'CB-2' },
      { id: '1-3', description: 'Test outstanding checks', completed: true, assignedTo: 'Ahmed K.', workingPaper: 'CB-3' },
      { id: '1-4', description: 'Verify deposits in transit', completed: false, assignedTo: 'Ahmed K.', reviewNotes: 'Pending client response' },
      { id: '1-5', description: 'Document conclusions', completed: false, assignedTo: 'Sarah J.' },
    ],
  },
  {
    id: '2',
    name: 'Revenue & Receivables',
    area: 'Income',
    progress: 60,
    items: [
      { id: '2-1', description: 'Perform cut-off testing', completed: true, assignedTo: 'Lisa M.', workingPaper: 'RR-1' },
      { id: '2-2', description: 'Confirm major receivables', completed: true, assignedTo: 'Lisa M.', workingPaper: 'RR-2' },
      { id: '2-3', description: 'Test aging schedule', completed: false, assignedTo: 'Lisa M.' },
      { id: '2-4', description: 'Evaluate allowance for doubtful accounts', completed: false, assignedTo: 'Sarah J.' },
      { id: '2-5', description: 'Document conclusions', completed: false, assignedTo: 'Sarah J.' },
    ],
  },
  {
    id: '3',
    name: 'Fixed Assets',
    area: 'Assets',
    progress: 40,
    items: [
      { id: '3-1', description: 'Obtain fixed asset register', completed: true, assignedTo: 'Ahmed K.', workingPaper: 'FA-1' },
      { id: '3-2', description: 'Physical verification of additions', completed: true, assignedTo: 'Ahmed K.', workingPaper: 'FA-2' },
      { id: '3-3', description: 'Test depreciation calculations', completed: false, assignedTo: 'Ahmed K.' },
      { id: '3-4', description: 'Review disposals', completed: false, assignedTo: 'Ahmed K.' },
      { id: '3-5', description: 'Document conclusions', completed: false, assignedTo: 'Sarah J.' },
    ],
  },
];

const statusConfig = {
  planning: { label: 'Planning', className: 'bg-muted text-muted-foreground' },
  fieldwork: { label: 'Fieldwork', className: 'bg-primary/10 text-primary border-primary/30' },
  review: { label: 'Review', className: 'bg-secondary/10 text-secondary border-secondary/30' },
  reporting: { label: 'Reporting', className: 'bg-warning/10 text-warning border-warning/30' },
  completed: { label: 'Completed', className: 'bg-success/10 text-success border-success/30' },
};

export default function EmployeeAudit() {
  const [selectedEngagement, setSelectedEngagement] = useState(auditEngagements[0]);

  return (
    <DashboardLayout title="Audit Module" subtitle="Manage audit engagements and working papers">
      <div className="space-y-6">
        {/* Engagement Selection */}
        <div className="grid gap-4 md:grid-cols-3">
          {auditEngagements.map((engagement) => {
            const status = statusConfig[engagement.status];
            const isSelected = selectedEngagement.id === engagement.id;
            
            return (
              <Card 
                key={engagement.id}
                className={cn(
                  'cursor-pointer transition-all hover:shadow-md',
                  isSelected && 'ring-2 ring-primary'
                )}
                onClick={() => setSelectedEngagement(engagement)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{engagement.client}</h4>
                      <p className="text-sm text-muted-foreground">{engagement.period}</p>
                    </div>
                    <Badge variant="outline" className={status.className}>
                      {status.label}
                    </Badge>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{engagement.progress}%</span>
                    </div>
                    <Progress value={engagement.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Due: {new Date(engagement.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                    <span>{engagement.manager}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Selected Engagement Details */}
        <Tabs defaultValue="programs" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="programs">Audit Programs</TabsTrigger>
              <TabsTrigger value="workingpapers">Working Papers</TabsTrigger>
              <TabsTrigger value="issues">Issues & Notes</TabsTrigger>
            </TabsList>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Working Paper
            </Button>
          </div>

          <TabsContent value="programs" className="space-y-4">
            <Accordion type="multiple" className="space-y-3">
              {auditPrograms.map((program) => (
                <AccordionItem key={program.id} value={program.id} className="border rounded-lg">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                          <ClipboardList className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{program.name}</p>
                          <p className="text-sm text-muted-foreground">{program.area}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{program.progress}%</p>
                          <p className="text-xs text-muted-foreground">
                            {program.items.filter(i => i.completed).length}/{program.items.length} items
                          </p>
                        </div>
                        <Progress value={program.progress} className="w-24 h-2" />
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-2 mt-2">
                      {program.items.map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            'flex items-start gap-3 rounded-lg border p-3',
                            item.completed && 'bg-success/5 border-success/20'
                          )}
                        >
                          <Checkbox checked={item.completed} className="mt-0.5" />
                          <div className="flex-1">
                            <p className={cn('text-sm', item.completed && 'line-through text-muted-foreground')}>
                              {item.description}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <Badge variant="secondary" className="text-xs gap-1">
                                <User className="h-3 w-3" />
                                {item.assignedTo}
                              </Badge>
                              {item.workingPaper && (
                                <Badge variant="outline" className="text-xs gap-1">
                                  <FileText className="h-3 w-3" />
                                  {item.workingPaper}
                                </Badge>
                              )}
                              {item.reviewNotes && (
                                <span className="text-xs text-warning flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  {item.reviewNotes}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Upload className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="workingpapers">
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {['CB-1', 'CB-2', 'CB-3', 'RR-1', 'RR-2', 'FA-1', 'FA-2'].map((wp) => (
                    <div key={wp} className="flex items-center gap-3 rounded-lg border p-4">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{wp}</p>
                        <p className="text-xs text-muted-foreground">Uploaded 2 days ago</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4">
                    <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium">Pending Bank Confirmation</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Bank confirmation for Account #1234 not yet received. Follow up required.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">Cash & Bank</Badge>
                        <span className="text-xs text-muted-foreground">Added 3 days ago by Sarah J.</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Resolve</Button>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border p-4">
                    <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium">Review Note: Revenue Cut-off</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Please expand sample size for invoices dated after Dec 28. Current sample insufficient.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">Revenue</Badge>
                        <span className="text-xs text-muted-foreground">Added 1 day ago by Emily D. (Partner)</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Address</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
