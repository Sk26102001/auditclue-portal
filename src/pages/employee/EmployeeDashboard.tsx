import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { EngagementCard } from '@/components/dashboard/EngagementCard';
import { TaskList } from '@/components/dashboard/TaskList';
import { DeadlineCalendar } from '@/components/dashboard/DeadlineCalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  CheckSquare, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Task, Engagement } from '@/types';

// Sample data for employee
const myEngagements: Engagement[] = [
  { id: '1', clientId: 'c1', type: 'audit', status: 'in_progress', dueDate: '2024-03-31', assignedTo: ['Sarah J.', 'Mike C.'], progress: 65 },
  { id: '2', clientId: 'c2', type: 'vat', status: 'under_review', dueDate: '2024-02-28', assignedTo: ['Sarah J.'], progress: 90 },
  { id: '3', clientId: 'c3', type: 'corporate_tax', status: 'in_progress', dueDate: '2024-04-15', assignedTo: ['Sarah J.', 'Lisa M.'], progress: 35 },
];

const myTasks: Task[] = [
  { id: '1', title: 'Review bank reconciliation - Al Rashid Trading', engagementId: '1', status: 'in_progress', priority: 'high', dueDate: '2024-02-10', assignedTo: 'Sarah J.', createdAt: '2024-02-01', updatedAt: '2024-02-05' },
  { id: '2', title: 'Prepare VAT computation - Emirates Motors', engagementId: '2', status: 'under_review', priority: 'urgent', dueDate: '2024-02-08', assignedTo: 'Sarah J.', createdAt: '2024-02-01', updatedAt: '2024-02-06' },
  { id: '3', title: 'Complete fixed assets testing', engagementId: '1', status: 'not_started', priority: 'medium', dueDate: '2024-02-15', assignedTo: 'Sarah J.', createdAt: '2024-02-03', updatedAt: '2024-02-03' },
  { id: '4', title: 'Draft management letter points', engagementId: '1', status: 'not_started', priority: 'low', dueDate: '2024-02-20', assignedTo: 'Sarah J.', createdAt: '2024-02-04', updatedAt: '2024-02-04' },
];

const deadlines = [
  { id: '1', title: 'Emirates Motors - VAT Q4', type: 'vat' as const, date: '2024-02-28', client: 'Emirates Motors' },
  { id: '2', title: 'Al Rashid Trading - Audit', type: 'audit' as const, date: '2024-03-31', client: 'Al Rashid Trading' },
  { id: '3', title: 'Gulf Properties - CT Filing', type: 'corporate_tax' as const, date: '2024-04-15', client: 'Gulf Properties' },
  { id: '4', title: 'Dubai Traders - VAT Q1', type: 'vat' as const, date: '2024-04-28', client: 'Dubai Traders' },
];

const recentClients = [
  { id: '1', name: 'Al Rashid Trading LLC', engagement: 'Audit', lastActivity: '2 hours ago' },
  { id: '2', name: 'Emirates Motors', engagement: 'VAT', lastActivity: '5 hours ago' },
  { id: '3', name: 'Gulf Properties', engagement: 'Corporate Tax', lastActivity: 'Yesterday' },
];

export default function EmployeeDashboard() {
  const { user } = useAuth();

  // Calculate task stats
  const completedTasks = myTasks.filter(t => t.status === 'completed').length;
  const overdueTasks = myTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length;
  const inProgressTasks = myTasks.filter(t => t.status === 'in_progress').length;

  return (
    <DashboardLayout 
      title={`Good morning, ${user?.name?.split(' ')[0]}`}
      subtitle="Here's your workload overview"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Assigned Clients"
            value={8}
            icon={<Building2 className="h-6 w-6" />}
            variant="primary"
          />
          <StatCard
            title="Active Tasks"
            value={myTasks.length}
            icon={<CheckSquare className="h-6 w-6" />}
            variant="secondary"
          />
          <StatCard
            title="Due This Week"
            value={3}
            icon={<Clock className="h-6 w-6" />}
            variant="warning"
          />
          <StatCard
            title="Overdue Items"
            value={overdueTasks}
            icon={<AlertTriangle className="h-6 w-6" />}
            variant="destructive"
          />
        </div>

        {/* Weekly Progress */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Weekly Progress</CardTitle>
              <Badge variant="secondary" className="gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% vs last week
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Tasks Completed</span>
                  <span className="font-medium">7 / 12</span>
                </div>
                <Progress value={58} className="h-3" />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Billable Hours</span>
                  <span className="font-medium">32 / 40</span>
                </div>
                <Progress value={80} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Engagements */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">My Active Engagements</h2>
            <Button variant="ghost" size="sm">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {myEngagements.map((engagement) => (
              <EngagementCard
                key={engagement.id}
                type={engagement.type}
                clientName={
                  engagement.id === '1' ? 'Al Rashid Trading' :
                  engagement.id === '2' ? 'Emirates Motors' :
                  'Gulf Properties'
                }
                status={engagement.status}
                progress={engagement.progress}
                dueDate={engagement.dueDate}
                assignedTo={engagement.assignedTo}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* My Tasks */}
          <div className="lg:col-span-2">
            <TaskList title="My Tasks" tasks={myTasks} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Deadlines */}
            <DeadlineCalendar deadlines={deadlines} />

            {/* Recent Clients */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Clients</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentClients.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-muted-foreground">{client.engagement}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{client.lastActivity}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
