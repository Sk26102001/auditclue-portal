import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Calendar, FileText, Receipt, Building2 } from 'lucide-react';

interface Deadline {
  id: string;
  title: string;
  type: 'vat' | 'corporate_tax' | 'audit' | 'other';
  date: string;
  client?: string;
}

interface DeadlineCalendarProps {
  deadlines: Deadline[];
}

const typeConfig = {
  vat: { 
    label: 'VAT', 
    icon: <Receipt className="h-4 w-4" />,
    className: 'bg-secondary/10 text-secondary border-secondary/30'
  },
  corporate_tax: { 
    label: 'CT', 
    icon: <Building2 className="h-4 w-4" />,
    className: 'bg-warning/10 text-warning border-warning/30'
  },
  audit: { 
    label: 'Audit', 
    icon: <FileText className="h-4 w-4" />,
    className: 'bg-primary/10 text-primary border-primary/30'
  },
  other: { 
    label: 'Other', 
    icon: <Calendar className="h-4 w-4" />,
    className: 'bg-muted text-muted-foreground border-border'
  },
};

export function DeadlineCalendar({ deadlines }: DeadlineCalendarProps) {
  const sortedDeadlines = [...deadlines].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const groupedByMonth = sortedDeadlines.reduce((acc, deadline) => {
    const monthKey = new Date(deadline.date).toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    });
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(deadline);
    return acc;
  }, {} as Record<string, Deadline[]>);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedByMonth).map(([month, monthDeadlines]) => (
          <div key={month}>
            <h4 className="mb-3 text-sm font-semibold text-muted-foreground">{month}</h4>
            <div className="space-y-2">
              {monthDeadlines.map((deadline) => {
                const config = typeConfig[deadline.type];
                const daysUntil = Math.ceil(
                  (new Date(deadline.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );
                const isUrgent = daysUntil <= 7 && daysUntil >= 0;
                const isOverdue = daysUntil < 0;

                return (
                  <div
                    key={deadline.id}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border p-3',
                      isOverdue && 'border-destructive/30 bg-destructive/5',
                      isUrgent && !isOverdue && 'border-warning/30 bg-warning/5'
                    )}
                  >
                    <div className={cn('rounded-lg border p-2', config.className)}>
                      {config.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{deadline.title}</p>
                      {deadline.client && (
                        <p className="text-sm text-muted-foreground">{deadline.client}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {new Date(deadline.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                      <p className={cn(
                        'text-xs',
                        isOverdue ? 'text-destructive font-medium' :
                        isUrgent ? 'text-warning font-medium' :
                        'text-muted-foreground'
                      )}>
                        {isOverdue ? `${Math.abs(daysUntil)}d overdue` :
                         daysUntil === 0 ? 'Today' :
                         daysUntil === 1 ? 'Tomorrow' :
                         `${daysUntil}d left`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
