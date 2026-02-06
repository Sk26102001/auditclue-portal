import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { 
  Receipt, 
  Building2, 
  ClipboardCheck,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComplianceItem {
  id: string;
  title: string;
  type: 'vat' | 'corporate_tax' | 'audit';
  period: string;
  status: 'completed' | 'in_progress' | 'pending' | 'overdue';
  dueDate: string;
  submittedDate?: string;
  ftaReference?: string;
  progress: number;
}

const complianceItems: ComplianceItem[] = [
  { id: '1', title: 'VAT Return', type: 'vat', period: 'Q4 2023', status: 'completed', dueDate: '2024-01-28', submittedDate: '2024-01-25', ftaReference: 'VAT-2024-001234', progress: 100 },
  { id: '2', title: 'VAT Return', type: 'vat', period: 'Q1 2024', status: 'in_progress', dueDate: '2024-04-28', progress: 45 },
  { id: '3', title: 'Corporate Tax Registration', type: 'corporate_tax', status: 'completed', period: 'Initial', dueDate: '2024-06-30', submittedDate: '2024-01-15', ftaReference: 'CT-REG-567890', progress: 100 },
  { id: '4', title: 'Corporate Tax Return', type: 'corporate_tax', period: 'FY 2024', status: 'pending', dueDate: '2025-09-30', progress: 0 },
  { id: '5', title: 'Annual Audit', type: 'audit', period: 'FY 2023', status: 'in_progress', dueDate: '2024-03-31', progress: 65 },
  { id: '6', title: 'VAT Return', type: 'vat', period: 'Q3 2023', status: 'completed', dueDate: '2023-10-28', submittedDate: '2023-10-25', ftaReference: 'VAT-2023-098765', progress: 100 },
];

const typeConfig = {
  vat: { label: 'VAT', icon: <Receipt className="h-5 w-5" />, color: 'bg-secondary/10 text-secondary border-secondary/30' },
  corporate_tax: { label: 'Corporate Tax', icon: <Building2 className="h-5 w-5" />, color: 'bg-warning/10 text-warning border-warning/30' },
  audit: { label: 'Audit', icon: <ClipboardCheck className="h-5 w-5" />, color: 'bg-primary/10 text-primary border-primary/30' },
};

const statusConfig = {
  completed: { label: 'Completed', icon: <CheckCircle2 className="h-4 w-4" />, className: 'bg-success/10 text-success border-success/30' },
  in_progress: { label: 'In Progress', icon: <Clock className="h-4 w-4" />, className: 'bg-primary/10 text-primary border-primary/30' },
  pending: { label: 'Pending', icon: <Clock className="h-4 w-4" />, className: 'bg-muted text-muted-foreground' },
  overdue: { label: 'Overdue', icon: <AlertTriangle className="h-4 w-4" />, className: 'bg-destructive/10 text-destructive border-destructive/30' },
};

function ComplianceCard({ item }: { item: ComplianceItem }) {
  const type = typeConfig[item.type];
  const status = statusConfig[item.status];
  const daysUntilDue = Math.ceil((new Date(item.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isUrgent = daysUntilDue <= 14 && daysUntilDue > 0 && item.status !== 'completed';

  return (
    <Card className={cn('transition-all hover:shadow-md', isUrgent && 'border-warning/50')}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn('rounded-lg border p-2.5', type.color)}>
              {type.icon}
            </div>
            <div>
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.period}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn('gap-1', status.className)}>
            {status.icon}
            {status.label}
          </Badge>
        </div>

        {item.status !== 'completed' && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{item.progress}%</span>
            </div>
            <Progress value={item.progress} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className={cn(
              isUrgent ? 'text-warning font-medium' : 'text-muted-foreground'
            )}>
              Due: {new Date(item.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          
          {item.ftaReference && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <FileText className="h-3 w-3" />
              {item.ftaReference}
            </Badge>
          )}
        </div>

        {item.submittedDate && (
          <div className="mt-3 pt-3 border-t flex items-center gap-2 text-sm text-success">
            <CheckCircle2 className="h-4 w-4" />
            Submitted on {new Date(item.submittedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ClientCompliance() {
  const vatItems = complianceItems.filter(item => item.type === 'vat');
  const ctItems = complianceItems.filter(item => item.type === 'corporate_tax');
  const auditItems = complianceItems.filter(item => item.type === 'audit');

  const completedCount = complianceItems.filter(i => i.status === 'completed').length;
  const inProgressCount = complianceItems.filter(i => i.status === 'in_progress').length;

  return (
    <DashboardLayout title="Compliance Tracker" subtitle="Track your UAE statutory compliance status">
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Filings</p>
                <p className="text-2xl font-bold">{complianceItems.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-success/10 p-3">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-warning/10 p-3">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{inProgressCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-secondary/10 p-3">
                <ExternalLink className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">FTA Portal</p>
                <Button variant="link" className="h-auto p-0 text-secondary">
                  Access Portal →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* VAT Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-secondary/10 p-2 text-secondary">
              <Receipt className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold">VAT Returns</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vatItems.map((item) => (
              <ComplianceCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Corporate Tax Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-warning/10 p-2 text-warning">
              <Building2 className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold">Corporate Tax</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ctItems.map((item) => (
              <ComplianceCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Audit Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold">Audit</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {auditItems.map((item) => (
              <ComplianceCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
