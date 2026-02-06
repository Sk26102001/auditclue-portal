import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Building2, 
  Briefcase, 
  TrendingUp,
  ArrowRight,
  Activity,
  CheckCircle2,
  Clock,
  AlertTriangle,
  DollarSign
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const engagementData = [
  { name: 'Audit', active: 12, completed: 8 },
  { name: 'VAT', active: 25, completed: 45 },
  { name: 'Corp Tax', active: 18, completed: 5 },
  { name: 'Accounting', active: 15, completed: 28 },
  { name: 'Advisory', active: 6, completed: 4 },
];

const revenueByService = [
  { name: 'Audit', value: 450000, color: 'hsl(var(--chart-1))' },
  { name: 'VAT', value: 280000, color: 'hsl(var(--chart-2))' },
  { name: 'Corporate Tax', value: 320000, color: 'hsl(var(--chart-3))' },
  { name: 'Accounting', value: 180000, color: 'hsl(var(--chart-4))' },
  { name: 'Advisory', value: 120000, color: 'hsl(var(--chart-5))' },
];

const recentActivity = [
  { id: '1', action: 'New client onboarded', detail: 'Dubai Investments LLC', time: '2 hours ago', type: 'success' },
  { id: '2', action: 'Invoice paid', detail: 'INV-2024-089 - AED 15,000', time: '4 hours ago', type: 'success' },
  { id: '3', action: 'VAT return submitted', detail: 'Emirates Trading - Q4 2023', time: '5 hours ago', type: 'info' },
  { id: '4', action: 'Overdue invoice', detail: 'INV-2024-045 - 10 days overdue', time: '1 day ago', type: 'warning' },
  { id: '5', action: 'Audit completed', detail: 'Gulf Properties FY 2023', time: '2 days ago', type: 'success' },
];

const topEmployees = [
  { name: 'Sarah Johnson', role: 'Senior Manager', tasks: 45, completion: 92 },
  { name: 'Mike Chen', role: 'Manager', tasks: 38, completion: 88 },
  { name: 'Lisa Martinez', role: 'Senior Associate', tasks: 52, completion: 85 },
  { name: 'Ahmed Khan', role: 'Associate', tasks: 34, completion: 91 },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout 
      title="Admin Dashboard"
      subtitle="Overview of firm performance"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Clients"
            value={156}
            icon={<Building2 className="h-6 w-6" />}
            variant="primary"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Active Engagements"
            value={76}
            icon={<Briefcase className="h-6 w-6" />}
            variant="secondary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Team Members"
            value={24}
            icon={<Users className="h-6 w-6" />}
            variant="success"
          />
          <StatCard
            title="Revenue (YTD)"
            value="AED 1.35M"
            icon={<DollarSign className="h-6 w-6" />}
            variant="warning"
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Engagement Overview */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Engagements by Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="active" name="Active" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="completed" name="Completed" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue by Service */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Revenue by Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <div className="h-48 w-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueByService}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {revenueByService.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`AED ${(value / 1000).toFixed(0)}K`, '']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {revenueByService.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                      <span className="ml-auto text-sm font-medium">
                        AED {(item.value / 1000).toFixed(0)}K
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity and Team */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  Recent Activity
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View all <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <div className={cn(
                    'rounded-full p-1.5',
                    activity.type === 'success' && 'bg-success/10 text-success',
                    activity.type === 'warning' && 'bg-warning/10 text-warning',
                    activity.type === 'info' && 'bg-primary/10 text-primary'
                  )}>
                    {activity.type === 'success' && <CheckCircle2 className="h-4 w-4" />}
                    {activity.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                    {activity.type === 'info' && <Clock className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  Team Performance
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View all <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {topEmployees.map((employee, index) => (
                <div key={employee.name} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{employee.tasks} tasks</p>
                        <p className="text-xs text-muted-foreground">{employee.completion}% completion</p>
                      </div>
                    </div>
                    <Progress value={employee.completion} className="mt-2 h-1.5" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}





