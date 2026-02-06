import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { EngagementCard } from '@/components/dashboard/EngagementCard';
import { TaskList } from '@/components/dashboard/TaskList';
import { DeadlineCalendar } from '@/components/dashboard/DeadlineCalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileCheck, 
  Clock, 
  AlertTriangle, 
  Receipt,
  MessageSquare,
  ArrowRight,
  Download
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Task, Engagement } from '@/types';

// Sample data
const engagements: Engagement[] = [
  { id: '1', clientId: 'c1', type: 'audit', status: 'in_progress', dueDate: '2024-03-31', assignedTo: ['Sarah J.', 'Mike C.'], progress: 65 },
  { id: '2', clientId: 'c1', type: 'vat', status: 'pending_client', dueDate: '2024-02-28', assignedTo: ['Ahmed K.'], progress: 80 },
  { id: '3', clientId: 'c1', type: 'corporate_tax', status: 'not_started', dueDate: '2024-06-30', assignedTo: ['Sarah J.'], progress: 0 },
  { id: '4', clientId: 'c1', type: 'accounting', status: 'under_review', dueDate: '2024-02-15', assignedTo: ['Lisa M.'], progress: 90 },
];

const pendingTasks: Task[] = [
  { id: '1', title: 'Upload bank statements for Q4 2023', engagementId: '1', status: 'pending_client', priority: 'high', dueDate: '2024-02-10', assignedTo: 'Client', createdAt: '2024-02-01', updatedAt: '2024-02-01' },
  { id: '2', title: 'Confirm inventory count details', engagementId: '1', status: 'pending_client', priority: 'medium', dueDate: '2024-02-12', assignedTo: 'Client', createdAt: '2024-02-01', updatedAt: '2024-02-01' },
  { id: '3', title: 'Provide supplier invoices for verification', engagementId: '2', status: 'pending_client', priority: 'urgent', dueDate: '2024-02-08', assignedTo: 'Client', createdAt: '2024-02-01', updatedAt: '2024-02-01' },
];

const deadlines = [
  { id: '1', title: 'Q4 2023 VAT Return', type: 'vat' as const, date: '2024-02-28', client: 'Al Rashid Trading' },
  { id: '2', title: 'FY 2023 Audit Completion', type: 'audit' as const, date: '2024-03-31', client: 'Al Rashid Trading' },
  { id: '3', title: 'Corporate Tax Registration', type: 'corporate_tax' as const, date: '2024-06-30', client: 'Al Rashid Trading' },
];

const recentInvoices = [
  { id: 'INV-2024-001', amount: 15000, status: 'overdue', dueDate: '2024-02-01' },
  { id: 'INV-2024-002', amount: 8500, status: 'sent', dueDate: '2024-02-28' },
  { id: 'INV-2023-045', amount: 12000, status: 'paid', dueDate: '2024-01-15' },
];

export default function ClientDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout 
      title={`Welcome back, ${user?.name?.split(' ')[0]}`}
      subtitle={user?.organization}
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Engagements"
            value={4}
            icon={<FileCheck className="h-6 w-6" />}
            variant="primary"
          />
          <StatCard
            title="Pending Actions"
            value={3}
            icon={<Clock className="h-6 w-6" />}
            variant="warning"
          />
          <StatCard
            title="Open Requests"
            value={2}
            icon={<MessageSquare className="h-6 w-6" />}
            variant="secondary"
          />
          <StatCard
            title="Outstanding"
            value="AED 23,500"
            icon={<Receipt className="h-6 w-6" />}
            variant="destructive"
          />
        </div>

        {/* Engagements */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Engagements</h2>
            <Button variant="ghost" size="sm">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {engagements.map((engagement) => (
              <EngagementCard
                key={engagement.id}
                type={engagement.type}
                status={engagement.status}
                progress={engagement.progress}
                dueDate={engagement.dueDate}
                assignedTo={engagement.assignedTo}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Pending Tasks */}
          <div className="lg:col-span-2">
            <TaskList 
              title="Pending from You" 
              tasks={pendingTasks}
            />
          </div>

          {/* Deadlines */}
          <div>
            <DeadlineCalendar deadlines={deadlines} />
          </div>
        </div>

        {/* Recent Invoices */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Receipt className="h-5 w-5 text-muted-foreground" />
                Recent Invoices
              </CardTitle>
              <Button variant="ghost" size="sm">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">
                      Due: {new Date(invoice.dueDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">AED {invoice.amount.toLocaleString()}</p>
                      <Badge
                        variant="outline"
                        className={
                          invoice.status === 'paid' ? 'status-completed' :
                          invoice.status === 'overdue' ? 'status-overdue' :
                          'status-pending'
                        }
                      >
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}




// import React from 'react';
// import { DashboardLayout } from '@/components/layout/DashboardLayout';
// import { StatCard } from '@/components/dashboard/StatCard';
// import { EngagementCard } from '@/components/dashboard/EngagementCard';
// import { TaskList } from '@/components/dashboard/TaskList';
// import { DeadlineCalendar } from '@/components/dashboard/DeadlineCalendar';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import {
//   FileCheck,
//   Clock,
//   Receipt,
//   MessageSquare,
//   ArrowRight,
//   Download,
//   Plus,
//   FileText,
//   Calculator,
//   CalendarCheck,
//   BarChart3,
//   Sparkles,
// } from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext';
// import { Task, Engagement } from '@/types';

// // ────────────────────────────────────────────────
// // Recharts imports (make sure to install: npm install recharts)
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from 'recharts';

// // Sample data
// const engagements: Engagement[] = [
//   { id: '1', clientId: 'c1', type: 'audit', status: 'in_progress', dueDate: '2024-03-31', assignedTo: ['Sarah J.', 'Mike C.'], progress: 65 },
//   { id: '2', clientId: 'c1', type: 'vat', status: 'pending_client', dueDate: '2024-02-28', assignedTo: ['Ahmed K.'], progress: 80 },
//   { id: '3', clientId: 'c1', type: 'corporate_tax', status: 'not_started', dueDate: '2024-06-30', assignedTo: ['Sarah J.'], progress: 0 },
//   { id: '4', clientId: 'c1', type: 'accounting', status: 'under_review', dueDate: '2024-02-15', assignedTo: ['Lisa M.'], progress: 90 },
// ];

// const pendingTasks: Task[] = [
//   { id: '1', title: 'Upload bank statements for Q4 2023', engagementId: '1', status: 'pending_client', priority: 'high', dueDate: '2024-02-10', assignedTo: 'Client', createdAt: '2024-02-01', updatedAt: '2024-02-01' },
//   { id: '2', title: 'Confirm inventory count details', engagementId: '1', status: 'pending_client', priority: 'medium', dueDate: '2024-02-12', assignedTo: 'Client', createdAt: '2024-02-01', updatedAt: '2024-02-01' },
//   { id: '3', title: 'Provide supplier invoices for verification', engagementId: '2', status: 'pending_client', priority: 'urgent', dueDate: '2024-02-08', assignedTo: 'Client', createdAt: '2024-02-01', updatedAt: '2024-02-01' },
// ];

// const deadlines = [
//   { id: '1', title: 'Q4 2023 VAT Return', type: 'vat' as const, date: '2024-02-28', client: 'Al Rashid Trading' },
//   { id: '2', title: 'FY 2023 Audit Completion', type: 'audit' as const, date: '2024-03-31', client: 'Al Rashid Trading' },
//   { id: '3', title: 'Corporate Tax Registration', type: 'corporate_tax' as const, date: '2024-06-30', client: 'Al Rashid Trading' },
// ];

// const recentInvoices = [
//   { id: 'INV-2024-001', amount: 15000, status: 'overdue', dueDate: '2024-02-01' },
//   { id: 'INV-2024-002', amount: 8500, status: 'sent', dueDate: '2024-02-28' },
//   { id: 'INV-2023-045', amount: 12000, status: 'paid', dueDate: '2024-01-15' },
// ];

// // Chart data
// const monthlyEngagements = [
//   { month: 'Jan', engagements: 3, completed: 2 },
//   { month: 'Feb', engagements: 5, completed: 4 },
//   { month: 'Mar', engagements: 4, completed: 3 },
//   { month: 'Apr', engagements: 6, completed: 5 },
//   { month: 'May', engagements: 7, completed: 6 },
//   { month: 'Jun', engagements: 5, completed: 4 },
//   { month: 'Jul', engagements: 4, completed: 3 },
//   { month: 'Aug', engagements: 6, completed: 5 },
//   { month: 'Sep', engagements: 8, completed: 7 },
//   { month: 'Oct', engagements: 7, completed: 6 },
//   { month: 'Nov', engagements: 5, completed: 4 },
//   { month: 'Dec', engagements: 4, completed: 3 },
// ];

// const revenueTrend = [
//   { month: 'Jan', revenue: 45000 },
//   { month: 'Feb', revenue: 62000 },
//   { month: 'Mar', revenue: 58000 },
//   { month: 'Apr', revenue: 75000 },
//   { month: 'May', revenue: 92000 },
//   { month: 'Jun', revenue: 88000 },
//   { month: 'Jul', revenue: 65000 },
//   { month: 'Aug', revenue: 98000 },
//   { month: 'Sep', revenue: 112000 },
//   { month: 'Oct', revenue: 105000 },
//   { month: 'Nov', revenue: 78000 },
//   { month: 'Dec', revenue: 89000 },
// ];

// export default function ClientDashboard() {
//   const { user } = useAuth();

//   return (
//     <DashboardLayout
//       title={`Welcome back, ${user?.name?.split(' ')[0] || 'Client'}`}
//       subtitle={user?.organization || 'Your Financial Dashboard'}
//     >
//       <div className="space-y-8 pb-12">
//         {/* Quick Actions */}
//         {/* <Card className="border-orange-200/60 bg-gradient-to-r from-orange-50/80 to-white dark:from-orange-950/30 dark:to-background">
//           <CardHeader className="pb-4">
//             <div className="flex items-center justify-between">
//               <CardTitle className="flex items-center gap-2.5 text-xl">
//                 <Sparkles className="h-5 w-5 text-orange-600" />
//                 Quick Actions
//               </CardTitle>
//               <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-100">
//                 View Services
//               </Button>
//             </div>
//             <CardDescription>Common tasks you perform most often</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
//               {[
//                 { icon: FileText, label: 'Upload Document' },
//                 { icon: Calculator, label: 'Request Quote' },
//                 { icon: CalendarCheck, label: 'Schedule Call' },
//                 { icon: BarChart3, label: 'View Reports' },
//                 { icon: Plus, label: 'New Request' },
//                 { icon: MessageSquare, label: 'Send Message' },
//               ].map((item, i) => (
//                 <Button
//                   key={i}
//                   variant="outline"
//                   className="h-24 flex-col gap-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50/70 dark:hover:bg-orange-950/40 transition-colors"
//                 >
//                   <item.icon className="h-6 w-6 text-orange-600" />
//                   <span className="text-xs font-medium">{item.label}</span>
//                 </Button>
//               ))}
//             </div>
//           </CardContent>
//         </Card> */}
  
//          {/* Clean Quick Actions */}
//          <Card className="border-orange-200/60 bg-gradient-to-r from-orange-50/80 to-white dark:from-orange-950/30 dark:to-background">
//            <CardHeader className="pb-4">
//              <CardTitle className="text-lg flex items-center gap-2">
//                <Sparkles className="h-4 w-4 text-orange-600" />
//                Quick Actions
//              </CardTitle>
//              {/* <CardDescription className="text-sm">
//                Frequently used shortcuts
//              </CardDescription> */}
//            </CardHeader>
//            <CardContent>
//              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
//               {[
//                 { icon: FileText, label: 'Upload Document' },
//                 { icon: Calculator, label: 'Request Quote' },
//                 { icon: CalendarCheck, label: 'Schedule Call' },
//                 { icon: BarChart3, label: 'View Reports' },
//                 { icon: Plus, label: 'New Request' },
//                 { icon: MessageSquare, label: 'Send Message' },
//               ].map((item, i) => (
//                 <Button
//                   key={i}
//                   variant="outline"
//                   className="h-auto py-4 flex flex-col items-center gap-2 border-border/60 hover:border-orange-400/60 hover:bg-orange-50/30 transition-colors text-sm font-medium"
//                 >
//                   <item.icon className="h-5 w-5 text-orange-600" />
//                   {item.label}
//                 </Button>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Stats */}
//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           <StatCard
//             title="Active Engagements"
//             value={4}
//             icon={<FileCheck className="h-7 w-7 text-orange-600" />}
//             variant="default"
//             className="border-orange-200/50 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 bg-gradient-to-br from-orange-50/30 to-white dark:from-orange-950/20"
//           />
//           <StatCard
//             title="Pending Actions"
//             value={3}
//             icon={<Clock className="h-7 w-7 text-amber-600" />}
//             variant="warning"
//             className="border-orange-200/50 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
//           />
//           <StatCard
//             title="Open Requests"
//             value={2}
//             icon={<MessageSquare className="h-7 w-7 text-blue-600" />}
//             variant="secondary"
//             className="border-orange-200/50 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
//           />
//           <StatCard
//             title="Outstanding"
//             value="AED 23,500"
//             icon={<Receipt className="h-7 w-7 text-red-600" />}
//             variant="destructive"
//             className="border-orange-200/50 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 bg-gradient-to-br from-red-50/30 to-white dark:from-red-950/20"
//           />
//         </div>

//         {/* Bar Chart - Monthly Engagement Activity */}
//         <section className="space-y-6">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-semibold tracking-tight">Monthly Engagement Activity</h2>
//             <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50">
//               Last 12 Months
//             </Button>
//           </div>

//           <Card className="border-orange-100 shadow-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-lg flex items-center gap-2">
//                 <BarChart3 className="h-5 w-5 text-orange-600" />
//                 Engagements & Completions
//               </CardTitle>
//               <CardDescription>Monthly breakdown of started vs completed engagements</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-[320px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={monthlyEngagements}
//                     margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                     <XAxis dataKey="month" stroke="#6b7280" />
//                     <YAxis stroke="#6b7280" />
//                     <Tooltip
//                       contentStyle={{ backgroundColor: 'white', borderColor: '#fed7aa', borderRadius: '8px' }}
//                       labelStyle={{ color: '#c2410c' }}
//                     />
//                     <Legend wrapperStyle={{ paddingTop: '10px' }} />
//                     <Bar dataKey="engagements" name="Started" fill="#f97316" radius={[4, 4, 0, 0]} />
//                     <Bar dataKey="completed" name="Completed" fill="#ea580c" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         {/* Your Engagements */}
//         <section>
//           <div className="mb-5 flex items-center justify-between">
//             <h2 className="text-xl font-semibold tracking-tight">Your Engagements</h2>
//             <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50">
//               View all <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </div>
//           <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
//             {engagements.map((engagement) => (
//               <EngagementCard
//                 key={engagement.id}
//                 type={engagement.type}
//                 status={engagement.status}
//                 progress={engagement.progress}
//                 dueDate={engagement.dueDate}
//                 assignedTo={engagement.assignedTo}
//               />
//             ))}
//           </div>
//         </section>

//         <div className="grid gap-8 lg:grid-cols-3">
//           {/* Pending Tasks */}
//           <div className="lg:col-span-2">
//             <TaskList title="Pending from You" tasks={pendingTasks} />
//           </div>

//           {/* Deadlines */}
//           <div>
//             <DeadlineCalendar deadlines={deadlines} />
//           </div>
//         </div>

//         {/* Revenue Trend - Line Chart */}
//         <section className="space-y-6">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-semibold tracking-tight">Revenue Trend</h2>
//           </div>

//           <Card className="border-orange-100 shadow-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-lg flex items-center gap-2">
//                 <BarChart3 className="h-5 w-5 text-orange-600" />
//                 Monthly Billed Revenue (AED)
//               </CardTitle>
//               <CardDescription>12-month revenue performance</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-[320px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart
//                     data={revenueTrend}
//                     margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                     <XAxis dataKey="month" stroke="#6b7280" />
//                     <YAxis
//                       stroke="#6b7280"
//                       tickFormatter={(value) => `AED ${(value / 1000).toFixed(0)}k`}
//                     />
//                     <Tooltip
//                       formatter={(value: number) => [`AED ${value.toLocaleString()}`, 'Revenue']}
//                       contentStyle={{ backgroundColor: 'white', borderColor: '#fed7aa', borderRadius: '8px' }}
//                       labelStyle={{ color: '#c2410c' }}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="revenue"
//                       stroke="#f97316"
//                       strokeWidth={3}
//                       dot={{ r: 4, fill: '#f97316', stroke: '#fff', strokeWidth: 2 }}
//                       activeDot={{ r: 8 }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         {/* Recent Invoices */}
//         <Card className="border-orange-100 shadow-sm">
//           <CardHeader className="pb-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-950/60">
//                   <Receipt className="h-5 w-5 text-orange-600" />
//                 </div>
//                 <div>
//                   <CardTitle className="text-xl">Recent Invoices</CardTitle>
//                   <CardDescription>Latest billing activity</CardDescription>
//                 </div>
//               </div>
//               <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50">
//                 View all <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {recentInvoices.map((invoice) => (
//                 <div
//                   key={invoice.id}
//                   className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
//                 >
//                   <div>
//                     <p className="font-semibold tracking-tight">{invoice.id}</p>
//                     <p className="text-sm text-muted-foreground">
//                       Due:{' '}
//                       {new Date(invoice.dueDate).toLocaleDateString('en-GB', {
//                         day: 'numeric',
//                         month: 'short',
//                         year: 'numeric',
//                       })}
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-5">
//                     <div className="text-right">
//                       <p className="text-lg font-bold">AED {invoice.amount.toLocaleString()}</p>
//                       <Badge
//                         variant="outline"
//                         className={
//                           invoice.status === 'paid'
//                             ? 'bg-green-100 text-green-800 border-green-300'
//                             : invoice.status === 'overdue'
//                             ? 'bg-red-100 text-red-800 border-red-300'
//                             : 'bg-amber-100 text-amber-800 border-amber-300'
//                         }
//                       >
//                         {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
//                       </Badge>
//                     </div>
//                     <Button variant="ghost" size="icon" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
//                       <Download className="h-5 w-5" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   );
// }




// import React, { useState } from 'react';
// import { DashboardLayout } from '@/components/layout/DashboardLayout';
// import { StatCard } from '@/components/dashboard/StatCard';
// import { EngagementCard } from '@/components/dashboard/EngagementCard';
// import { TaskList } from '@/components/dashboard/TaskList';
// import { DeadlineCalendar } from '@/components/dashboard/DeadlineCalendar';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   FileCheck,
//   Clock,
//   Receipt,
//   MessageSquare,
//   ArrowRight,
//   Download,
//   Plus,
//   FileText,
//   Calculator,
//   CalendarCheck,
//   BarChart3,
//   Sparkles,
//   TrendingUp,
// } from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext';
// import { Task, Engagement } from '@/types';

// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from 'recharts';

// // --- Data Structures ---

// const engagementDataByYear: Record<string, any[]> = {
//   "2024": [
//     { month: 'Jan', engagements: 3, completed: 2 },
//     { month: 'Feb', engagements: 5, completed: 4 },
//     { month: 'Mar', engagements: 4, completed: 3 },
//     { month: 'Apr', engagements: 6, completed: 5 },
//     { month: 'May', engagements: 7, completed: 6 },
//     { month: 'Jun', engagements: 5, completed: 4 },
//     { month: 'Jul', engagements: 4, completed: 3 },
//     { month: 'Aug', engagements: 6, completed: 5 },
//     { month: 'Sep', engagements: 8, completed: 7 },
//     { month: 'Oct', engagements: 7, completed: 6 },
//     { month: 'Nov', engagements: 5, completed: 4 },
//     { month: 'Dec', engagements: 4, completed: 3 },
//   ],
//   "2023": [
//     { month: 'Jan', engagements: 2, completed: 1 },
//     { month: 'Feb', engagements: 4, completed: 3 },
//     { month: 'Mar', engagements: 3, completed: 2 },
//     { month: 'Apr', engagements: 5, completed: 4 },
//     { month: 'May', engagements: 6, completed: 5 },
//     { month: 'Jun', engagements: 4, completed: 3 },
//     { month: 'Jul', engagements: 3, completed: 2 },
//     { month: 'Aug', engagements: 4, completed: 4 },
//     { month: 'Sep', engagements: 5, completed: 4 },
//     { month: 'Oct', engagements: 6, completed: 5 },
//     { month: 'Nov', engagements: 3, completed: 2 },
//     { month: 'Dec', engagements: 2, completed: 2 },
//   ]
// };

// const revenueDataByYear: Record<string, any[]> = {
//   "2024": [
//     { month: 'Jan', revenue: 45000 },
//     { month: 'Feb', revenue: 62000 },
//     { month: 'Mar', revenue: 58000 },
//     { month: 'Apr', revenue: 75000 },
//     { month: 'May', revenue: 92000 },
//     { month: 'Jun', revenue: 88000 },
//     { month: 'Jul', revenue: 65000 },
//     { month: 'Aug', revenue: 98000 },
//     { month: 'Sep', revenue: 112000 },
//     { month: 'Oct', revenue: 105000 },
//     { month: 'Nov', revenue: 78000 },
//     { month: 'Dec', revenue: 89000 },
//   ],
//   "2023": [
//     { month: 'Jan', revenue: 38000 },
//     { month: 'Feb', revenue: 42000 },
//     { month: 'Mar', revenue: 45000 },
//     { month: 'Apr', revenue: 48000 },
//     { month: 'May', revenue: 55000 },
//     { month: 'Jun', revenue: 52000 },
//     { month: 'Jul', revenue: 50000 },
//     { month: 'Aug', revenue: 58000 },
//     { month: 'Sep', revenue: 65000 },
//     { month: 'Oct', revenue: 62000 },
//     { month: 'Nov', revenue: 59000 },
//     { month: 'Dec', revenue: 61000 },
//   ]
// };

// const engagements: Engagement[] = [
//   { id: '1', clientId: 'c1', type: 'audit', status: 'in_progress', dueDate: '2024-03-31', assignedTo: ['Sarah J.', 'Mike C.'], progress: 65 },
//   { id: '2', clientId: 'c1', type: 'vat', status: 'pending_client', dueDate: '2024-02-28', assignedTo: ['Ahmed K.'], progress: 80 },
//   { id: '3', clientId: 'c1', type: 'corporate_tax', status: 'not_started', dueDate: '2024-06-30', assignedTo: ['Sarah J.'], progress: 0 },
//   { id: '4', clientId: 'c1', type: 'accounting', status: 'under_review', dueDate: '2024-02-15', assignedTo: ['Lisa M.'], progress: 90 },
// ];

// const pendingTasks: Task[] = [
//   { id: '1', title: 'Upload bank statements for Q4 2023', engagementId: '1', status: 'pending_client', priority: 'high', dueDate: '2024-02-10', assignedTo: 'Client', createdAt: '2024-02-01', updatedAt: '2024-02-01' },
//   { id: '2', title: 'Confirm inventory count details', engagementId: '1', status: 'pending_client', priority: 'medium', dueDate: '2024-02-12', assignedTo: 'Client', createdAt: '2024-02-01', updatedAt: '2024-02-01' },
//   { id: '3', title: 'Provide supplier invoices for verification', engagementId: '2', status: 'pending_client', priority: 'urgent', dueDate: '2024-02-08', assignedTo: 'Client', createdAt: '2024-02-01', updatedAt: '2024-02-01' },
// ];

// const deadlines = [
//   { id: '1', title: 'Q4 2023 VAT Return', type: 'vat' as const, date: '2024-02-28', client: 'Al Rashid Trading' },
//   { id: '2', title: 'FY 2023 Audit Completion', type: 'audit' as const, date: '2024-03-31', client: 'Al Rashid Trading' },
//   { id: '3', title: 'Corporate Tax Registration', type: 'corporate_tax' as const, date: '2024-06-30', client: 'Al Rashid Trading' },
// ];

// const recentInvoices = [
//   { id: 'INV-2024-001', amount: 15000, status: 'overdue', dueDate: '2024-02-01' },
//   { id: 'INV-2024-002', amount: 8500, status: 'sent', dueDate: '2024-02-28' },
//   { id: 'INV-2023-045', amount: 12000, status: 'paid', dueDate: '2024-01-15' },
// ];

// export default function ClientDashboard() {
//   const { user } = useAuth();
  
//   // States for filters
//   const [selectedEngagementYear, setSelectedEngagementYear] = useState("2024");
//   const [selectedRevenueYear, setSelectedRevenueYear] = useState("2024");

//   return (
//     <DashboardLayout
//       title={`Welcome back, ${user?.name?.split(' ')[0] || 'Client'}`}
//       subtitle={user?.organization || 'Your Financial Dashboard'}
//     >
//       <div className="space-y-8 pb-12">
//         {/* Quick Actions */}
//         <Card className="border-orange-200/60 bg-gradient-to-r from-orange-50/80 to-white dark:from-orange-950/30 dark:to-background">
//           <CardHeader className="pb-4">
//             <CardTitle className="text-lg flex items-center gap-2">
//               <Sparkles className="h-4 w-4 text-orange-600" />
//               Quick Actions
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
//               {[
//                 { icon: FileText, label: 'Upload Document' },
//                 { icon: Calculator, label: 'Request Quote' },
//                 { icon: CalendarCheck, label: 'Schedule Call' },
//                 { icon: BarChart3, label: 'View Reports' },
//                 { icon: Plus, label: 'New Request' },
//                 { icon: MessageSquare, label: 'Send Message' },
//               ].map((item, i) => (
//                 <Button
//                   key={i}
//                   variant="outline"
//                   className="h-auto py-4 flex flex-col items-center gap-2 border-border/60 hover:border-orange-400/60 hover:bg-orange-50/30 transition-colors text-sm font-medium"
//                 >
//                   <item.icon className="h-5 w-5 text-orange-600" />
//                   {item.label}
//                 </Button>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Stats Grid */}
//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           <StatCard
//             title="Active Engagements"
//             value={4}
//             icon={<FileCheck className="h-7 w-7 text-orange-600" />}
//             className="border-orange-200/50 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 bg-gradient-to-br from-orange-50/30 to-white"
//           />
//           <StatCard
//             title="Pending Actions"
//             value={3}
//             icon={<Clock className="h-7 w-7 text-amber-600" />}
//             className="border-orange-200/50 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
//           />
//           <StatCard
//             title="Open Requests"
//             value={2}
//             icon={<MessageSquare className="h-7 w-7 text-blue-600" />}
//             className="border-orange-200/50 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
//           />
//           <StatCard
//             title="Outstanding"
//             value="AED 23,500"
//             icon={<Receipt className="h-7 w-7 text-red-600" />}
//             className="border-orange-200/50 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 bg-gradient-to-br from-red-50/30 to-white"
//           />
//         </div>

//         {/* Bar Chart Section */}
//         <section className="space-y-6">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-semibold tracking-tight">Monthly Engagement Activity</h2>
//             <div className="flex items-center gap-3">
//               <span className="text-sm font-medium text-muted-foreground">Year:</span>
//               <Select value={selectedEngagementYear} onValueChange={setSelectedEngagementYear}>
//                 <SelectTrigger className="w-[120px] border-orange-200 text-orange-900 focus:ring-orange-500">
//                   <SelectValue placeholder="Year" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="2024">2024</SelectItem>
//                   <SelectItem value="2023">2023</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <Card className="border-orange-100 shadow-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-lg flex items-center gap-2">
//                 <BarChart3 className="h-5 w-5 text-orange-600" />
//                 Engagements & Completions ({selectedEngagementYear})
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="h-[320px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={engagementDataByYear[selectedEngagementYear]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
//                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
//                     <Tooltip cursor={{ fill: '#fff7ed' }} contentStyle={{ borderRadius: '8px', border: '1px solid #fed7aa' }} />
//                     <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '20px' }} />
//                     <Bar dataKey="engagements" name="Started" fill="#f97316" radius={[4, 4, 0, 0]} />
//                     <Bar dataKey="completed" name="Completed" fill="#ea580c" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         {/* Revenue Trend - Line Chart with Filter */}
//         <section className="space-y-6">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-semibold tracking-tight">Revenue Trend</h2>
//             <div className="flex items-center gap-3">
//               <span className="text-sm font-medium text-muted-foreground">Year:</span>
//               <Select value={selectedRevenueYear} onValueChange={setSelectedRevenueYear}>
//                 <SelectTrigger className="w-[120px] border-orange-200 text-orange-900 focus:ring-orange-500">
//                   <SelectValue placeholder="Year" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="2024">2024</SelectItem>
//                   <SelectItem value="2023">2023</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <Card className="border-orange-100 shadow-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-lg flex items-center gap-2">
//                 <TrendingUp className="h-5 w-5 text-orange-600" />
//                 Monthly Billed Revenue (AED) - {selectedRevenueYear}
//               </CardTitle>
//               <CardDescription>Visualizing performance trends for the selected year</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-[320px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={revenueDataByYear[selectedRevenueYear]} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
//                     <YAxis 
//                         axisLine={false} 
//                         tickLine={false} 
//                         tick={{ fontSize: 12 }}
//                         tickFormatter={(value) => `AED ${(value / 1000).toFixed(0)}k`} 
//                     />
//                     <Tooltip 
//                         formatter={(value: number) => [`AED ${value.toLocaleString()}`, 'Revenue']}
//                         contentStyle={{ borderRadius: '8px', border: '1px solid #fed7aa' }} 
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="revenue"
//                       stroke="#f97316"
//                       strokeWidth={3}
//                       dot={{ r: 4, fill: '#f97316', stroke: '#fff', strokeWidth: 2 }}
//                       activeDot={{ r: 6 }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         {/* Your Engagements Section */}
//         <section>
//           <div className="mb-5 flex items-center justify-between">
//             <h2 className="text-xl font-semibold tracking-tight">Your Engagements</h2>
//             <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50">
//               View all <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </div>
//           <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
//             {engagements.map((engagement) => (
//               <EngagementCard
//                 key={engagement.id}
//                 type={engagement.type}
//                 status={engagement.status}
//                 progress={engagement.progress}
//                 dueDate={engagement.dueDate}
//                 assignedTo={engagement.assignedTo}
//               />
//             ))}
//           </div>
//         </section>

//         <div className="grid gap-8 lg:grid-cols-3">
//           <div className="lg:col-span-2">
//             <TaskList title="Pending from You" tasks={pendingTasks} />
//           </div>
//           <div>
//             <DeadlineCalendar deadlines={deadlines} />
//           </div>
//         </div>

//         {/* Recent Invoices */}
//         <Card className="border-orange-100 shadow-sm">
//           <CardHeader className="pb-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="rounded-full bg-orange-100 p-2">
//                   <Receipt className="h-5 w-5 text-orange-600" />
//                 </div>
//                 <div>
//                   <CardTitle className="text-xl">Recent Invoices</CardTitle>
//                   <CardDescription>Latest billing activity</CardDescription>
//                 </div>
//               </div>
//               <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50">
//                 View all <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {recentInvoices.map((invoice) => (
//                 <div
//                   key={invoice.id}
//                   className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
//                 >
//                   <div>
//                     <p className="font-semibold tracking-tight">{invoice.id}</p>
//                     <p className="text-sm text-muted-foreground">
//                       Due: {new Date(invoice.dueDate).toLocaleDateString('en-GB', {
//                         day: 'numeric',
//                         month: 'short',
//                         year: 'numeric',
//                       })}
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-5">
//                     <div className="text-right">
//                       <p className="text-lg font-bold">AED {invoice.amount.toLocaleString()}</p>
//                       <Badge
//                         variant="outline"
//                         className={
//                           invoice.status === 'paid'
//                             ? 'bg-green-100 text-green-800 border-green-300'
//                             : invoice.status === 'overdue'
//                             ? 'bg-red-100 text-red-800 border-red-300'
//                             : 'bg-amber-100 text-amber-800 border-amber-300'
//                         }
//                       >
//                         {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
//                       </Badge>
//                     </div>
//                     <Button variant="ghost" size="icon" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
//                       <Download className="h-5 w-5" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   );
// }