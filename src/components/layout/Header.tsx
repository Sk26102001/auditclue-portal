// import React from 'react';
// import { Bell, Search, HelpCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Badge } from '@/components/ui/badge';

// interface HeaderProps {
//   title: string;
//   subtitle?: string;
// }

// export function Header({ title, subtitle }: HeaderProps) {
//   return (
//     <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div>
//         <h1 className="text-xl font-semibold text-foreground">{title}</h1>
//         {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
//       </div>

//       <div className="flex items-center gap-4">
//         {/* Search */}
//         <div className="relative hidden md:block">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search..."
//             className="w-64 pl-9"
//           />
//         </div>

//         {/* Help */}
//         <Button variant="ghost" size="icon" className="text-muted-foreground">
//           <HelpCircle className="h-5 w-5" />
//         </Button>

//         {/* Notifications */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon" className="relative text-muted-foreground">
//               <Bell className="h-5 w-5" />
//               <Badge className="absolute -right-4 -top-1 h-5 w-5 rounded-full p-0 text-xs">
//                 3
//               </Badge>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="w-80 bg-popover">
//             <DropdownMenuLabel>Notifications</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
//               <span className="font-medium">New document uploaded</span>
//               <span className="text-xs text-muted-foreground">
//                 Al Rashid Trading uploaded Q3 financials
//               </span>
//             </DropdownMenuItem>
//             <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
//               <span className="font-medium">Invoice overdue</span>
//               <span className="text-xs text-muted-foreground">
//                 INV-2024-001 is 5 days overdue
//               </span>
//             </DropdownMenuItem>
//             <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
//               <span className="font-medium">VAT deadline approaching</span>
//               <span className="text-xs text-muted-foreground">
//                 Q4 VAT return due in 7 days
//               </span>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// }

import React from 'react';
import { Bell, Search, HelpCircle, FileText, AlertCircle, CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div>
        <h1 className="text-xl font-semibold text-foreground tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-64 pl-9 bg-muted/50 border-none focus-visible:ring-teal-500"
          />
        </div>

        {/* Help */}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-orange-600">
          <HelpCircle className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-orange-600 transition-all">
              <Bell className="h-5 w-5" />
              <Badge 
                className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-red-600 p-0 text-[10px] font-bold text-white"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-80 p-1 shadow-2xl border-slate-200">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm font-bold text-slate-900">Notifications</span>
              <Badge variant="outline" className="text-[10px] font-medium border-slate-200">3 New</Badge>
            </div>
            <DropdownMenuSeparator />
            
            <div className="max-h-[350px] overflow-y-auto">
              
              {/* Document Notification - Blue/Info Theme */}
              <DropdownMenuItem className="flex gap-3 p-3 cursor-pointer focus:bg-slate-50 border-b border-slate-50 last:border-0">
                <div className="flex-shrink-0 mt-1 h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-xs text-slate-900">New document uploaded</span>
                  <span className="text-[11px] text-slate-500 leading-relaxed">
                    Al Rashid Trading uploaded Q3 financials
                  </span>
                </div>
              </DropdownMenuItem>

              {/* Overdue Notification - Red/Urgent Theme */}
              <DropdownMenuItem className="flex gap-3 p-3 cursor-pointer focus:bg-red-50/50 border-b border-slate-50 last:border-0">
                <div className="flex-shrink-0 mt-1 h-8 w-8 rounded-full bg-red-50 flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-xs text-red-700">Invoice overdue</span>
                  <span className="text-[11px] text-red-600/70 leading-relaxed font-medium">
                    INV-2024-001 is 5 days overdue
                  </span>
                </div>
              </DropdownMenuItem>

              {/* Deadline Notification - Orange/Warning Theme */}
              <DropdownMenuItem className="flex gap-3 p-3 cursor-pointer focus:bg-orange-50/50">
                <div className="flex-shrink-0 mt-1 h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center">
                  <CalendarClock className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-xs text-orange-800">VAT deadline approaching</span>
                  <span className="text-[11px] text-orange-700/70 leading-relaxed">
                    Q4 VAT return due in 7 days
                  </span>
                </div>
              </DropdownMenuItem>

            </div>

            <DropdownMenuSeparator />
            <div className="p-1">
              <Button variant="ghost" className="w-full text-[11px] text-slate-500 hover:text-orange-600 font-bold h-9">
                See all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}