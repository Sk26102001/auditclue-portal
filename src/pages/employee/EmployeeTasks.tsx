import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Plus, 
  Calendar, 
  AlertCircle,
  Clock,
  CheckCircle2,
  Circle,
  MoreHorizontal,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { Task, TaskStatus } from '@/types';

// Extended mock data
const allTasks: Task[] = [
  { id: '1', title: 'Review bank reconciliation - Al Rashid Trading', description: 'Complete bank reconciliation review for Dec 2023', engagementId: '1', status: 'in_progress', priority: 'high', dueDate: '2024-02-10', assignedTo: 'Sarah J.', createdAt: '2024-02-01', updatedAt: '2024-02-05' },
  { id: '2', title: 'Prepare VAT computation - Emirates Motors', description: 'Q4 2023 VAT return preparation', engagementId: '2', status: 'under_review', priority: 'urgent', dueDate: '2024-02-08', assignedTo: 'Sarah J.', createdAt: '2024-02-01', updatedAt: '2024-02-06' },
  { id: '3', title: 'Complete fixed assets testing', description: 'Physical verification and testing of FA additions', engagementId: '1', status: 'not_started', priority: 'medium', dueDate: '2024-02-15', assignedTo: 'Sarah J.', createdAt: '2024-02-03', updatedAt: '2024-02-03' },
  { id: '4', title: 'Draft management letter points', description: 'Compile observations from audit testing', engagementId: '1', status: 'not_started', priority: 'low', dueDate: '2024-02-20', assignedTo: 'Sarah J.', createdAt: '2024-02-04', updatedAt: '2024-02-04' },
  { id: '5', title: 'Revenue cut-off testing', description: 'Test sales invoices around year-end', engagementId: '1', status: 'completed', priority: 'high', dueDate: '2024-02-05', assignedTo: 'Sarah J.', createdAt: '2024-01-28', updatedAt: '2024-02-05' },
  { id: '6', title: 'Inventory observation report', description: 'Prepare report on inventory count attendance', engagementId: '1', status: 'completed', priority: 'medium', dueDate: '2024-02-03', assignedTo: 'Sarah J.', createdAt: '2024-01-25', updatedAt: '2024-02-03' },
  { id: '7', title: 'CT registration review - Gulf Properties', description: 'Review corporate tax registration documents', engagementId: '3', status: 'pending_client', priority: 'medium', dueDate: '2024-02-18', assignedTo: 'Sarah J.', createdAt: '2024-02-05', updatedAt: '2024-02-05' },
];

const statusConfig: Record<TaskStatus, { label: string; icon: React.ReactNode; className: string }> = {
  not_started: { label: 'To Do', icon: <Circle className="h-4 w-4" />, className: 'text-muted-foreground' },
  in_progress: { label: 'In Progress', icon: <Clock className="h-4 w-4" />, className: 'text-primary' },
  pending_client: { label: 'Pending', icon: <AlertCircle className="h-4 w-4" />, className: 'text-warning' },
  under_review: { label: 'Review', icon: <Clock className="h-4 w-4" />, className: 'text-secondary' },
  submitted: { label: 'Submitted', icon: <CheckCircle2 className="h-4 w-4" />, className: 'text-secondary' },
  completed: { label: 'Done', icon: <CheckCircle2 className="h-4 w-4" />, className: 'text-success' },
};

const priorityConfig = {
  low: { label: 'Low', className: 'bg-muted text-muted-foreground border-muted' },
  medium: { label: 'Medium', className: 'bg-primary/10 text-primary border-primary/30' },
  high: { label: 'High', className: 'bg-warning/10 text-warning border-warning/30' },
  urgent: { label: 'Urgent', className: 'bg-destructive/10 text-destructive border-destructive/30' },
};

function TaskCard({ task }: { task: Task }) {
  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className={cn(
      'group rounded-lg border bg-card p-4 transition-all hover:shadow-md',
      isOverdue && task.status !== 'completed' && 'border-destructive/30'
    )}>
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Checkbox checked={task.status === 'completed'} className="mt-1" />
          <div>
            <h4 className={cn(
              'font-medium',
              task.status === 'completed' && 'line-through text-muted-foreground'
            )}>
              {task.title}
            </h4>
            {task.description && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="outline" className={cn('text-xs gap-1', status.className)}>
          {status.icon}
          {status.label}
        </Badge>
        <Badge variant="outline" className={cn('text-xs', priority.className)}>
          {priority.label}
        </Badge>
        <div className={cn(
          'flex items-center gap-1 text-xs ml-auto',
          isOverdue ? 'text-destructive' : 'text-muted-foreground'
        )}>
          <Calendar className="h-3 w-3" />
          {new Date(task.dueDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
          })}
        </div>
      </div>
    </div>
  );
}

export default function EmployeeTasks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredTasks = allTasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const groupedByStatus = {
    active: filteredTasks.filter(t => ['not_started', 'in_progress', 'pending_client'].includes(t.status)),
    review: filteredTasks.filter(t => ['under_review', 'submitted'].includes(t.status)),
    completed: filteredTasks.filter(t => t.status === 'completed'),
  };

  return (
    <DashboardLayout title="Tasks" subtitle="Manage your work assignments">
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="not_started">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="pending_client">Pending</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active" className="gap-2">
              Active
              <Badge variant="secondary" className="ml-1">{groupedByStatus.active.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="review" className="gap-2">
              In Review
              <Badge variant="secondary" className="ml-1">{groupedByStatus.review.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              Completed
              <Badge variant="secondary" className="ml-1">{groupedByStatus.completed.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-3">
            {groupedByStatus.active.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No active tasks
                </CardContent>
              </Card>
            ) : (
              groupedByStatus.active.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </TabsContent>

          <TabsContent value="review" className="space-y-3">
            {groupedByStatus.review.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No tasks in review
                </CardContent>
              </Card>
            ) : (
              groupedByStatus.review.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3">
            {groupedByStatus.completed.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No completed tasks
                </CardContent>
              </Card>
            ) : (
              groupedByStatus.completed.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
