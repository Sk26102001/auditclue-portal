import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { EngagementType, TaskStatus } from '@/types';
import { 
  ClipboardCheck, 
  Receipt, 
  Building2, 
  Calculator, 
  Lightbulb,
  Users,
  Calendar,
} from 'lucide-react';

interface EngagementCardProps {
  type: EngagementType;
  clientName?: string;
  status: TaskStatus;
  progress: number;
  dueDate: string;
  assignedTo?: string[];
}

const engagementConfig: Record<EngagementType, { label: string; icon: React.ReactNode; color: string }> = {
  audit: { 
    label: 'Audit', 
    icon: <ClipboardCheck className="h-5 w-5" />,
    color: 'bg-primary/10 text-primary border-primary/30'
  },
  vat: { 
    label: 'VAT', 
    icon: <Receipt className="h-5 w-5" />,
    color: 'bg-secondary/10 text-secondary border-secondary/30'
  },
  corporate_tax: { 
    label: 'Corporate Tax', 
    icon: <Building2 className="h-5 w-5" />,
    color: 'bg-warning/10 text-warning border-warning/30'
  },
  accounting: { 
    label: 'Accounting', 
    icon: <Calculator className="h-5 w-5" />,
    color: 'bg-success/10 text-success border-success/30'
  },
  advisory: { 
    label: 'Advisory', 
    icon: <Lightbulb className="h-5 w-5" />,
    color: 'bg-chart-4/10 text-chart-4 border-chart-4/30'
  },
  payroll: { 
    label: 'Payroll', 
    icon: <Users className="h-5 w-5" />,
    color: 'bg-chart-5/10 text-chart-5 border-chart-5/30'
  },
};

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  not_started: { label: 'Not Started', className: 'bg-muted text-muted-foreground' },
  in_progress: { label: 'In Progress', className: 'bg-primary/10 text-primary' },
  pending_client: { label: 'Pending Client', className: 'status-pending' },
  under_review: { label: 'Under Review', className: 'status-review' },
  submitted: { label: 'Submitted', className: 'bg-secondary/10 text-secondary' },
  completed: { label: 'Completed', className: 'status-completed' },
};

export function EngagementCard({ type, clientName, status, progress, dueDate, assignedTo }: EngagementCardProps) {
  const config = engagementConfig[type];
  const statusConf = statusConfig[status];
  
  const daysUntilDue = Math.ceil(
    (new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  const isOverdue = daysUntilDue < 0;
  const isUrgent = daysUntilDue >= 0 && daysUntilDue <= 7;

  return (
    <Card className="card-hover">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn('rounded-lg border p-2', config.color)}>
              {config.icon}
            </div>
            <div>
              <CardTitle className="text-base">{config.label}</CardTitle>
              {clientName && (
                <p className="text-sm text-muted-foreground">{clientName}</p>
              )}
            </div>
          </div>
          <Badge variant="outline" className={statusConf.className}>
            {statusConf.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className={cn(
              isOverdue ? 'text-destructive font-medium' : 
              isUrgent ? 'text-warning font-medium' : 
              'text-muted-foreground'
            )}>
              {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` :
               isUrgent ? `Due in ${daysUntilDue} days` :
               new Date(dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          
          {assignedTo && assignedTo.length > 0 && (
            <div className="flex -space-x-2">
              {assignedTo.slice(0, 3).map((name, i) => (
                <div
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium"
                  title={name}
                >
                  {name.charAt(0)}
                </div>
              ))}
              {assignedTo.length > 3 && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-medium text-primary-foreground">
                  +{assignedTo.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
