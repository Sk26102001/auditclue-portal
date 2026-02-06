import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { 
  Clock, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Save,
  Send,
  Calendar,
  Building2,
  Briefcase
} from 'lucide-react';

interface TimeEntry {
  id: string;
  client: string;
  engagement: string;
  description: string;
  hours: number[];
  total: number;
}

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = ['Feb 5', 'Feb 6', 'Feb 7', 'Feb 8', 'Feb 9', 'Feb 10', 'Feb 11'];

const timeEntries: TimeEntry[] = [
  { id: '1', client: 'Al Rashid Trading LLC', engagement: 'Audit', description: 'Bank reconciliation review', hours: [4, 6, 5, 4, 3, 0, 0], total: 22 },
  { id: '2', client: 'Emirates Motors', engagement: 'VAT', description: 'VAT return preparation', hours: [2, 0, 2, 3, 2, 0, 0], total: 9 },
  { id: '3', client: 'Gulf Properties LLC', engagement: 'Corporate Tax', description: 'CT registration support', hours: [1, 2, 1, 0, 2, 0, 0], total: 6 },
  { id: '4', client: 'Internal', engagement: 'Admin', description: 'Team meetings & training', hours: [1, 0, 0, 1, 1, 0, 0], total: 3 },
];

const clients = [
  'Al Rashid Trading LLC',
  'Emirates Motors',
  'Gulf Properties LLC',
  'Dubai Traders FZE',
  'Tech Solutions ME',
  'Internal',
];

const engagements = ['Audit', 'VAT', 'Corporate Tax', 'Accounting', 'Advisory', 'Admin'];

export default function EmployeeTimesheet() {
  const [entries, setEntries] = useState(timeEntries);

  const dailyTotals = weekDays.map((_, dayIndex) =>
    entries.reduce((sum, entry) => sum + entry.hours[dayIndex], 0)
  );
  const weekTotal = entries.reduce((sum, entry) => sum + entry.total, 0);
  const targetHours = 40;

  const updateHours = (entryId: string, dayIndex: number, value: number) => {
    setEntries(entries.map(entry => {
      if (entry.id === entryId) {
        const newHours = [...entry.hours];
        newHours[dayIndex] = value;
        return { ...entry, hours: newHours, total: newHours.reduce((a, b) => a + b, 0) };
      }
      return entry;
    }));
  };

  return (
    <DashboardLayout title="Timesheet" subtitle="Track your time across engagements">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">{weekTotal}h</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-success/10 p-3">
                <Briefcase className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Billable</p>
                <p className="text-2xl font-bold">{weekTotal - 3}h</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-secondary/10 p-3">
                <Building2 className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clients</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Weekly Target</p>
                <p className="text-sm font-medium">{weekTotal}/{targetHours}h</p>
              </div>
              <Progress value={(weekTotal / targetHours) * 100} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2">
                {weekTotal >= targetHours ? 'Target achieved!' : `${targetHours - weekTotal}h remaining`}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Week Navigation */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Feb 5 - Feb 11, 2024</span>
                </div>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Draft
                </Button>
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Submit
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Client</TableHead>
                  <TableHead className="w-[120px]">Engagement</TableHead>
                  <TableHead>Description</TableHead>
                  {weekDays.map((day, i) => (
                    <TableHead key={day} className="w-[70px] text-center">
                      <div>{day}</div>
                      <div className="text-xs font-normal text-muted-foreground">{dates[i]}</div>
                    </TableHead>
                  ))}
                  <TableHead className="w-[70px] text-center">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.client}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{entry.engagement}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{entry.description}</TableCell>
                    {entry.hours.map((hours, dayIndex) => (
                      <TableCell key={dayIndex} className="p-1">
                        <Input
                          type="number"
                          min="0"
                          max="24"
                          step="0.5"
                          value={hours || ''}
                          onChange={(e) => updateHours(entry.id, dayIndex, parseFloat(e.target.value) || 0)}
                          className={cn(
                            'h-9 w-full text-center',
                            dayIndex >= 5 && 'bg-muted/50'
                          )}
                        />
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-semibold">{entry.total}</TableCell>
                  </TableRow>
                ))}
                {/* Daily Totals Row */}
                <TableRow className="bg-muted/30 font-semibold">
                  <TableCell colSpan={3}>Daily Total</TableCell>
                  {dailyTotals.map((total, i) => (
                    <TableCell key={i} className={cn(
                      'text-center',
                      total > 8 && 'text-warning',
                      total === 0 && 'text-muted-foreground'
                    )}>
                      {total}
                    </TableCell>
                  ))}
                  <TableCell className="text-center text-primary">{weekTotal}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Add Row */}
            <div className="mt-4 flex items-center gap-4 rounded-lg border border-dashed p-4">
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client} value={client}>{client}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Engagement" />
                </SelectTrigger>
                <SelectContent>
                  {engagements.map((eng) => (
                    <SelectItem key={eng} value={eng}>{eng}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input placeholder="Description" className="flex-1" />
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Row
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Time by Client Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Time by Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id} className="flex items-center gap-4">
                  <div className="w-[200px] font-medium">{entry.client}</div>
                  <div className="flex-1">
                    <Progress value={(entry.total / weekTotal) * 100} className="h-3" />
                  </div>
                  <div className="w-[60px] text-right text-sm">
                    {entry.total}h ({Math.round((entry.total / weekTotal) * 100)}%)
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
