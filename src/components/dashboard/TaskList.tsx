import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/types';
import { Calendar, AlertCircle } from 'lucide-react';

interface TaskListProps {
  title: string;
  tasks: Task[];
  showClient?: boolean;
}

const priorityConfig = {
  low: { label: 'Low', className: 'bg-muted text-muted-foreground' },
  medium: { label: 'Medium', className: 'bg-primary/10 text-primary' },
  high: { label: 'High', className: 'bg-warning/10 text-warning' },
  urgent: { label: 'Urgent', className: 'bg-destructive/10 text-destructive' },
};

const statusConfig = {
  not_started: { label: 'Not Started', className: 'bg-muted text-muted-foreground' },
  in_progress: { label: 'In Progress', className: 'bg-primary/10 text-primary' },
  pending_client: { label: 'Pending', className: 'status-pending' },
  under_review: { label: 'Review', className: 'status-review' },
  submitted: { label: 'Submitted', className: 'bg-secondary/10 text-secondary' },
  completed: { label: 'Done', className: 'status-completed' },
};

export function TaskList({ title, tasks, showClient }: TaskListProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="secondary">{tasks.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No tasks to display
          </p>
        ) : (
          tasks.map((task) => {
            const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
            const priorityConf = priorityConfig[task.priority];
            const statusConf = statusConfig[task.status];

            return (
              <div
                key={task.id}
                className={cn(
                  'flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50',
                  isOverdue && 'border-destructive/30 bg-destructive/5'
                )}
              >
                <Checkbox
                  checked={task.status === 'completed'}
                  className="mt-0.5"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn(
                      'font-medium',
                      task.status === 'completed' && 'line-through text-muted-foreground'
                    )}>
                      {task.title}
                    </p>
                    <Badge variant="outline" className={cn('shrink-0 text-xs', statusConf.className)}>
                      {statusConf.label}
                    </Badge>
                  </div>
                  
                  {task.description && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {task.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-3 pt-1">
                    <Badge variant="outline" className={cn('text-xs', priorityConf.className)}>
                      {priorityConf.label}
                    </Badge>
                    
                    <div className={cn(
                      'flex items-center gap-1 text-xs',
                      isOverdue ? 'text-destructive' : 'text-muted-foreground'
                    )}>
                      {isOverdue ? (
                        <AlertCircle className="h-3 w-3" />
                      ) : (
                        <Calendar className="h-3 w-3" />
                      )}
                      {new Date(task.dueDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
