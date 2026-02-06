import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { 
  Receipt, 
  Building2, 
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Upload,
  Eye,
  Calendar,
  ArrowRight
} from 'lucide-react';

interface TaxEngagement {
  id: string;
  client: string;
  type: 'vat' | 'corporate_tax';
  period: string;
  status: 'not_started' | 'preparation' | 'review' | 'filed';
  progress: number;
  dueDate: string;
  assignedTo: string;
}

const taxEngagements: TaxEngagement[] = [
  { id: '1', client: 'Al Rashid Trading LLC', type: 'vat', period: 'Q1 2024', status: 'preparation', progress: 45, dueDate: '2024-04-28', assignedTo: 'Sarah J.' },
  { id: '2', client: 'Emirates Motors', type: 'vat', period: 'Q1 2024', status: 'review', progress: 85, dueDate: '2024-04-28', assignedTo: 'Lisa M.' },
  { id: '3', client: 'Gulf Properties LLC', type: 'corporate_tax', period: 'FY 2024', status: 'not_started', progress: 0, dueDate: '2025-09-30', assignedTo: 'Mike C.' },
  { id: '4', client: 'Dubai Traders FZE', type: 'vat', period: 'Q1 2024', status: 'filed', progress: 100, dueDate: '2024-04-28', assignedTo: 'Ahmed K.' },
  { id: '5', client: 'Hospitality Group', type: 'vat', period: 'Q1 2024', status: 'preparation', progress: 30, dueDate: '2024-04-28', assignedTo: 'Sarah J.' },
  { id: '6', client: 'Tech Solutions ME', type: 'corporate_tax', period: 'FY 2024', status: 'preparation', progress: 20, dueDate: '2025-09-30', assignedTo: 'Mike C.' },
];

interface ChecklistItem {
  id: string;
  description: string;
  completed: boolean;
  required: boolean;
}

const vatChecklist: ChecklistItem[] = [
  { id: '1', description: 'Obtain sales register for the period', completed: true, required: true },
  { id: '2', description: 'Obtain purchase register for the period', completed: true, required: true },
  { id: '3', description: 'Verify VAT amounts on sales invoices', completed: true, required: true },
  { id: '4', description: 'Verify input VAT on purchase invoices', completed: false, required: true },
  { id: '5', description: 'Reconcile with accounting records', completed: false, required: true },
  { id: '6', description: 'Prepare VAT computation', completed: false, required: true },
  { id: '7', description: 'Review by Manager', completed: false, required: true },
  { id: '8', description: 'Upload to FTA portal', completed: false, required: true },
  { id: '9', description: 'Obtain acknowledgment', completed: false, required: true },
];

const ctChecklist: ChecklistItem[] = [
  { id: '1', description: 'Obtain trial balance', completed: true, required: true },
  { id: '2', description: 'Review financial statements', completed: true, required: true },
  { id: '3', description: 'Identify permanent differences', completed: false, required: true },
  { id: '4', description: 'Identify temporary differences', completed: false, required: true },
  { id: '5', description: 'Calculate taxable income', completed: false, required: true },
  { id: '6', description: 'Apply reliefs and exemptions', completed: false, required: true },
  { id: '7', description: 'Compute corporate tax liability', completed: false, required: true },
  { id: '8', description: 'Partner review', completed: false, required: true },
  { id: '9', description: 'File return on FTA portal', completed: false, required: true },
];

const typeConfig = {
  vat: { label: 'VAT', icon: <Receipt className="h-5 w-5" />, color: 'bg-secondary/10 text-secondary border-secondary/30' },
  corporate_tax: { label: 'Corporate Tax', icon: <Building2 className="h-5 w-5" />, color: 'bg-warning/10 text-warning border-warning/30' },
};

const statusConfig = {
  not_started: { label: 'Not Started', className: 'bg-muted text-muted-foreground' },
  preparation: { label: 'Preparation', className: 'bg-primary/10 text-primary border-primary/30' },
  review: { label: 'Under Review', className: 'bg-secondary/10 text-secondary border-secondary/30' },
  filed: { label: 'Filed', className: 'bg-success/10 text-success border-success/30' },
};

export default function EmployeeTax() {
  const [selectedType, setSelectedType] = useState<'vat' | 'corporate_tax'>('vat');
  const [selectedEngagement, setSelectedEngagement] = useState<TaxEngagement | null>(null);

  const filteredEngagements = taxEngagements.filter(e => e.type === selectedType);
  const checklist = selectedType === 'vat' ? vatChecklist : ctChecklist;

  return (
    <DashboardLayout title="VAT & Corporate Tax" subtitle="Manage tax compliance engagements">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-secondary/10 p-3">
                <Receipt className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">VAT Returns</p>
                <p className="text-2xl font-bold">{taxEngagements.filter(e => e.type === 'vat').length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-warning/10 p-3">
                <Building2 className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CT Returns</p>
                <p className="text-2xl font-bold">{taxEngagements.filter(e => e.type === 'corporate_tax').length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{taxEngagements.filter(e => ['preparation', 'review'].includes(e.status)).length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-success/10 p-3">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Filed</p>
                <p className="text-2xl font-bold">{taxEngagements.filter(e => e.status === 'filed').length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedType} onValueChange={(v) => setSelectedType(v as 'vat' | 'corporate_tax')} className="space-y-4">
          <TabsList>
            <TabsTrigger value="vat" className="gap-2">
              <Receipt className="h-4 w-4" />
              VAT Returns
            </TabsTrigger>
            <TabsTrigger value="corporate_tax" className="gap-2">
              <Building2 className="h-4 w-4" />
              Corporate Tax
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedType} className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Engagements List */}
              <div className="lg:col-span-2 space-y-3">
                {filteredEngagements.map((engagement) => {
                  const type = typeConfig[engagement.type];
                  const status = statusConfig[engagement.status];
                  const isSelected = selectedEngagement?.id === engagement.id;
                  const daysUntilDue = Math.ceil((new Date(engagement.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  
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
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={cn('rounded-lg border p-2', type.color)}>
                              {type.icon}
                            </div>
                            <div>
                              <h4 className="font-medium">{engagement.client}</h4>
                              <p className="text-sm text-muted-foreground">{engagement.period}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className={status.className}>
                                  {status.label}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {engagement.assignedTo}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{engagement.progress}%</p>
                            <p className={cn(
                              'text-xs',
                              daysUntilDue <= 14 ? 'text-warning' : 'text-muted-foreground'
                            )}>
                              {daysUntilDue} days left
                            </p>
                            <Progress value={engagement.progress} className="w-20 h-2 mt-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Checklist */}
              <div>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      {selectedType === 'vat' ? 'VAT' : 'CT'} Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {checklist.map((item, index) => (
                      <div
                        key={item.id}
                        className={cn(
                          'flex items-start gap-3 rounded-lg border p-3',
                          item.completed && 'bg-success/5 border-success/20'
                        )}
                      >
                        <Checkbox checked={item.completed} className="mt-0.5" />
                        <div className="flex-1">
                          <p className={cn(
                            'text-sm',
                            item.completed && 'line-through text-muted-foreground'
                          )}>
                            {index + 1}. {item.description}
                          </p>
                        </div>
                        {item.completed && (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Filing Workflow */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Filing Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  {['Preparation', 'Internal Review', 'Manager Approval', 'Filed on FTA', 'Acknowledgment'].map((step, index) => (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center gap-2">
                        <div className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full border-2',
                          index < 2 ? 'bg-success text-success-foreground border-success' : 
                          index === 2 ? 'bg-primary text-primary-foreground border-primary' :
                          'bg-muted text-muted-foreground border-muted'
                        )}>
                          {index < 2 ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        <span className="text-xs text-center max-w-[80px]">{step}</span>
                      </div>
                      {index < 4 && (
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </React.Fragment>
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
