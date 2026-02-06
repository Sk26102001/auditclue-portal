import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Receipt,
  FileCheck,
  BarChart3,
  Users,
  Briefcase,
  CheckSquare,
  ClipboardList,
  Calculator,
  Shield,
  Settings,
  FolderOpen,
  Clock,
  Building2,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const clientNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/client', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Documents', href: '/client/documents', icon: <FolderOpen className="h-5 w-5" /> },
  { label: 'Requests', href: '/client/requests', icon: <MessageSquare className="h-5 w-5" /> },
  { label: 'Invoices', href: '/client/invoices', icon: <Receipt className="h-5 w-5" /> },
  { label: 'Agreements', href: '/client/agreements', icon: <FileCheck className="h-5 w-5" /> },
  { label: 'Compliance', href: '/client/compliance', icon: <BarChart3 className="h-5 w-5" /> },
];

const employeeNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/employee', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Clients', href: '/employee/clients', icon: <Building2 className="h-5 w-5" /> },
  { label: 'Tasks', href: '/employee/tasks', icon: <CheckSquare className="h-5 w-5" /> },
  { label: 'Audit', href: '/employee/audit', icon: <ClipboardList className="h-5 w-5" /> },
  { label: 'Accounting', href: '/employee/accounting', icon: <Calculator className="h-5 w-5" /> },
  { label: 'VAT & Tax', href: '/employee/tax', icon: <FileText className="h-5 w-5" /> },
  { label: 'Documents', href: '/employee/documents', icon: <FolderOpen className="h-5 w-5" /> },
  { label: 'Timesheet', href: '/employee/timesheet', icon: <Clock className="h-5 w-5" /> },
];

const adminNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Users', href: '/admin/users', icon: <Users className="h-5 w-5" /> },
  { label: 'Clients', href: '/admin/clients', icon: <Building2 className="h-5 w-5" /> },
  { label: 'Engagements', href: '/admin/engagements', icon: <Briefcase className="h-5 w-5" /> },
  { label: 'Integrations', href: '/admin/integrations', icon: <Settings className="h-5 w-5" /> },
  { label: 'Audit Logs', href: '/admin/logs', icon: <Shield className="h-5 w-5" /> },
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const getNavItems = (): NavItem[] => {
    if (!user) return [];
    switch (user.role) {
      case 'client':
        return clientNavItems;
      case 'employee':
        return employeeNavItems;
      case 'admin':
      case 'super_admin':
        return adminNavItems;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground">
      <div className="flex h-full flex-col">
{/* Logo */}
<div className="flex h-17  bg-white items-center gap-3  px-6">
  {/* Optional icon container – remove if not needed */}
  {/* <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
    {/* <Shield className="h-5 w-5 text-sidebar-primary-foreground" /> */}
  {/* </div> */} 

  {/* Logo Image */}
  <img
    src="/logo2.png"
    alt="Auditclue Logo"
    className="h-20 w-auto object-contain  ml-10 "
  />
</div>


        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <p className="truncate text-xs text-sidebar-foreground/60">{user?.organization}</p>
            </div>
          </div>
          <Button
            variant="sidebar"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </aside>
  );
}





// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { cn } from '@/lib/utils';
// import { useAuth } from '@/contexts/AuthContext';
// import {
//   LayoutDashboard,
//   FileText,
//   MessageSquare,
//   Receipt,
//   FileCheck,
//   BarChart3,
//   Users,
//   Briefcase,
//   CheckSquare,
//   ClipboardList,
//   Calculator,
//   Shield,
//   Settings,
//   FolderOpen,
//   Clock,
//   Building2,
//   LogOut,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// interface NavItem {
//   label: string;
//   href: string;
//   icon: React.ReactNode;
// }

// const clientNavItems: NavItem[] = [
//   { label: 'Dashboard', href: '/client', icon: <LayoutDashboard className="h-5 w-5" /> },
//   { label: 'Documents', href: '/client/documents', icon: <FolderOpen className="h-5 w-5" /> },
//   { label: 'Requests', href: '/client/requests', icon: <MessageSquare className="h-5 w-5" /> },
//   { label: 'Invoices', href: '/client/invoices', icon: <Receipt className="h-5 w-5" /> },
//   { label: 'Agreements', href: '/client/agreements', icon: <FileCheck className="h-5 w-5" /> },
//   { label: 'Compliance', href: '/client/compliance', icon: <BarChart3 className="h-5 w-5" /> },
// ];

// const employeeNavItems: NavItem[] = [
//   { label: 'Dashboard', href: '/employee', icon: <LayoutDashboard className="h-5 w-5" /> },
//   { label: 'Clients', href: '/employee/clients', icon: <Building2 className="h-5 w-5" /> },
//   { label: 'Tasks', href: '/employee/tasks', icon: <CheckSquare className="h-5 w-5" /> },
//   { label: 'Audit', href: '/employee/audit', icon: <ClipboardList className="h-5 w-5" /> },
//   { label: 'Accounting', href: '/employee/accounting', icon: <Calculator className="h-5 w-5" /> },
//   { label: 'VAT & Tax', href: '/employee/tax', icon: <FileText className="h-5 w-5" /> },
//   { label: 'Documents', href: '/employee/documents', icon: <FolderOpen className="h-5 w-5" /> },
//   { label: 'Timesheet', href: '/employee/timesheet', icon: <Clock className="h-5 w-5" /> },
// ];

// const adminNavItems: NavItem[] = [
//   { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
//   { label: 'Users', href: '/admin/users', icon: <Users className="h-5 w-5" /> },
//   { label: 'Clients', href: '/admin/clients', icon: <Building2 className="h-5 w-5" /> },
//   { label: 'Engagements', href: '/admin/engagements', icon: <Briefcase className="h-5 w-5" /> },
//   { label: 'Integrations', href: '/admin/integrations', icon: <Settings className="h-5 w-5" /> },
//   { label: 'Audit Logs', href: '/admin/logs', icon: <Shield className="h-5 w-5" /> },
// ];

// export function Sidebar() {
//   const location = useLocation();
//   const { user, logout } = useAuth();

//   const getNavItems = (): NavItem[] => {
//     if (!user) return [];
//     switch (user.role) {
//       case 'client':
//         return clientNavItems;
//       case 'employee':
//         return employeeNavItems;
//       case 'admin':
//       case 'super_admin':
//         return adminNavItems;
//       default:
//         return [];
//     }
//   };

//   const navItems = getNavItems();

//   return (
//     <aside
//       className={cn(
//         "fixed left-0 top-0 z-40 h-screen w-64",
//         "bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950",
//         "border-r border-gray-800/60",
//         "text-gray-200 shadow-2xl"
//       )}
//     >
//       <div className="flex h-full flex-col">
// {/* Logo / Brand Section */}
// <div className="px-4 pt-5 pb-2">
//   <div className="flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl bg-white/10 border border-white/10 shadow-2xl">
//     <img 
//       src="./logo.jpeg" 
//       alt="AuditClue Logo" 
//       className="h-full w-full object-cover rounded-2xl mix-blend-normal" 
//     />
//   </div>
// </div>
// {/* Decorative Divider */}
// <div className="mx-6 mb-4 border-b border-gray-800/50" />
// {/* Border separator moved below the padding for a cleaner look */}
// <div className="border-b border-gray-800/70 mx-3 mb-2" />

//         {/* Navigation - premium feel */}
//         <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
//           {navItems.map((item) => {
//             const isActive = location.pathname === item.href;

//             return (
//               <Link
//                 key={item.href}
//                 to={item.href}
//                 className={cn(
//                   "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
//                   isActive
//                     ? "bg-gradient-to-r from-amber-600/20 to-orange-600/10 text-amber-300 border-l-4 border-amber-500 font-semibold shadow-sm"
//                     : "text-gray-300 hover:bg-gray-800/40 hover:text-amber-300 hover:translate-x-1"
//                 )}
//               >
//                 <span className={cn(
//                   "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
//                   isActive ? "bg-amber-500/20 text-amber-300" : "text-gray-400 group-hover:text-amber-400"
//                 )}>
//                   {React.cloneElement(item.icon as React.ReactElement, {
//                     className: "h-5 w-5"
//                   })}
//                 </span>
//                 {item.label}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* User section - clean premium style */}
//         <div className="border-t border-gray-800/70 p-5">
//           <div className="mb-4 flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-600/30 to-orange-600/20 text-amber-300 font-semibold text-lg border border-amber-500/30 shadow-sm">
//               {user?.name?.charAt(0)?.toUpperCase() || 'U'}
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="truncate text-base font-semibold text-white">
//                 {user?.name || 'User'}
//               </p>
//               <p className="truncate text-xs text-gray-400 mt-0.5">
//                 {user?.organization || user?.role?.toUpperCase() || 'Account'}
//               </p>
//             </div>
//           </div>

// {/* <Button
//   variant="ghost"
//   size="sm"
//   className="w-full justify-start gap-2 text-gray-300 bg-gray-800/60 hover:bg-gray-700/70 hover:text-amber-300 transition-all"
//   onClick={logout}
// >
//   <LogOut className="h-4 w-4" />
//   Sign Out
// </Button> */}
//            <Button
//             variant="ghost"
//             size="sm"
//             className={cn(
//               "w-full justify-start gap-3 rounded-xl px-4 py-2 text-gray-400 font-semibold text-xs transition-all duration-200 bg-gray-800/60",
//               "hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 border border-transparent"
//             )}
//             onClick={logout}
//           >
//             <LogOut className="h-4 w-4" />
//             SIGN OUT
//           </Button>

//         </div>
//       </div>
//     </aside>
//   );
// }



// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { cn } from '@/lib/utils';
// import { useAuth } from '@/contexts/AuthContext';
// import {
//   LayoutDashboard,
//   FileText,
//   MessageSquare,
//   Receipt,
//   FileCheck,
//   BarChart3,
//   Users,
//   Briefcase,
//   CheckSquare,
//   ClipboardList,
//   Calculator,
//   Shield,
//   Settings,
//   FolderOpen,
//   Clock,
//   Building2,
//   LogOut,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// interface NavItem {
//   label: string;
//   href: string;
//   icon: React.ReactNode;
// }

// const clientNavItems: NavItem[] = [
//   { label: 'Dashboard', href: '/client', icon: <LayoutDashboard className="h-5 w-5" /> },
//   { label: 'Documents', href: '/client/documents', icon: <FolderOpen className="h-5 w-5" /> },
//   { label: 'Requests', href: '/client/requests', icon: <MessageSquare className="h-5 w-5" /> },
//   { label: 'Invoices', href: '/client/invoices', icon: <Receipt className="h-5 w-5" /> },
//   { label: 'Agreements', href: '/client/agreements', icon: <FileCheck className="h-5 w-5" /> },
//   { label: 'Compliance', href: '/client/compliance', icon: <BarChart3 className="h-5 w-5" /> },
// ];

// const employeeNavItems: NavItem[] = [
//   { label: 'Dashboard', href: '/employee', icon: <LayoutDashboard className="h-5 w-5" /> },
//   { label: 'Clients', href: '/employee/clients', icon: <Building2 className="h-5 w-5" /> },
//   { label: 'Tasks', href: '/employee/tasks', icon: <CheckSquare className="h-5 w-5" /> },
//   { label: 'Audit', href: '/employee/audit', icon: <ClipboardList className="h-5 w-5" /> },
//   { label: 'Accounting', href: '/employee/accounting', icon: <Calculator className="h-5 w-5" /> },
//   { label: 'VAT & Tax', href: '/employee/tax', icon: <FileText className="h-5 w-5" /> },
//   { label: 'Documents', href: '/employee/documents', icon: <FolderOpen className="h-5 w-5" /> },
//   { label: 'Timesheet', href: '/employee/timesheet', icon: <Clock className="h-5 w-5" /> },
// ];

// const adminNavItems: NavItem[] = [
//   { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
//   { label: 'Users', href: '/admin/users', icon: <Users className="h-5 w-5" /> },
//   { label: 'Clients', href: '/admin/clients', icon: <Building2 className="h-5 w-5" /> },
//   { label: 'Engagements', href: '/admin/engagements', icon: <Briefcase className="h-5 w-5" /> },
//   { label: 'Integrations', href: '/admin/integrations', icon: <Settings className="h-5 w-5" /> },
//   { label: 'Audit Logs', href: '/admin/logs', icon: <Shield className="h-5 w-5" /> },
// ];

// export function Sidebar() {
//   const location = useLocation();
//   const { user, logout } = useAuth();

//   const getNavItems = (): NavItem[] => {
//     if (!user) return [];
//     switch (user.role) {
//       case 'client': return clientNavItems;
//       case 'employee': return employeeNavItems;
//       case 'admin':
//       case 'super_admin': return adminNavItems;
//       default: return [];
//     }
//   };

//   const navItems = getNavItems();

//   return (
//     <aside
//       className={cn(
//         "fixed left-0 top-0 z-40 h-screen w-64",
//         "bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950",
//         "border-r border-gray-800/60",
//         "text-gray-200 shadow-2xl"
//       )}
//     >
//       <div className="flex h-full flex-col">
// {/* Logo Section */}
// <div className="flex h-32 items-center justify-center border-b border-gray-800/70 px-6">
//   <div className="relative flex h-20 w-full items-center justify-center overflow-hidden rounded-xl bg-white/50 p-3 transition-all ">
//     <img 
//       src="./logos.png" 
//       alt="Company Logo" 
//       className="h-full w-full object-contain" // Removed mix-blend-lighten for better clarity
//     />
//   </div>
// </div>

//         {/* Navigation */}
//         <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6 scrollbar-hide">
//           {navItems.map((item) => {
//             const isActive = location.pathname === item.href;
//             return (
//               <Link
//                 key={item.href}
//                 to={item.href}
//                 className={cn(
//                   "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
//                   isActive
//                     ? "bg-gradient-to-r from-amber-600/20 to-orange-600/10 text-amber-300 border-l-4 border-amber-500 font-semibold shadow-sm"
//                     : "text-gray-400 hover:bg-gray-800/40 hover:text-amber-300 hover:translate-x-1"
//                 )}
//               >
//                 <span className={cn(
//                   "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
//                   isActive ? "bg-amber-500/20 text-amber-300" : "text-gray-500 group-hover:text-amber-400"
//                 )}>
//                   {React.cloneElement(item.icon as React.ReactElement, {
//                     className: "h-5 w-5"
//                   })}
//                 </span>
//                 {item.label}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* User Section */}
//         <div className="border-t border-gray-800/70 p-5 bg-black/20">
//           <div className="mb-4 flex items-center gap-3">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-600/30 to-orange-600/20 text-amber-300 font-semibold text-lg border border-amber-500/30 shadow-sm">
//               {user?.name?.charAt(0)?.toUpperCase() || 'U'}
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="truncate text-sm font-bold text-white">
//                 {user?.name || 'User'}
//               </p>
//               <p className="truncate text-[10px] text-gray-500 uppercase tracking-tighter">
//                 {user?.organization || 'Personal Account'}
//               </p>
//             </div>
//           </div>

//           <Button
//             variant="ghost"
//             size="sm"
//             className={cn(
//               "w-full justify-start gap-3 rounded-xl px-4 py-2 text-gray-400 font-semibold text-xs transition-all duration-200",
//               "hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 border border-transparent"
//             )}
//             onClick={logout}
//           >
//             <LogOut className="h-4 w-4" />
//             SIGN OUT
//           </Button>
//         </div>
//       </div>
//     </aside>
//   );
// }