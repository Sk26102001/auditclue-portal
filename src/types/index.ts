export type UserRole = 'client' | 'employee' | 'admin' | 'super_admin';

export type EngagementType = 'audit' | 'vat' | 'corporate_tax' | 'accounting' | 'advisory' | 'payroll';

export type TaskStatus = 'not_started' | 'in_progress' | 'pending_client' | 'under_review' | 'submitted' | 'completed';

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export type RequestStatus = 'open' | 'responded' | 'closed';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  organization?: string;
}

export interface Client {
  id: string;
  name: string;
  trn?: string;
  corporateTaxNo?: string;
  licenseDetails?: string;
  financialYearEnd?: string;
  engagements: EngagementType[];
  assignedPartner?: string;
  assignedManager?: string;
}

export interface Engagement {
  id: string;
  clientId: string;
  type: EngagementType;
  status: TaskStatus;
  dueDate: string;
  assignedTo: string[];
  progress: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  engagementId: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  name: string;
  folder: string;
  uploadedBy: string;
  uploadedAt: string;
  version: number;
  size: number;
  type: string;
  clientVisible: boolean;
}

export interface Invoice {
  id: string;
  clientId: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
}

export interface Request {
  id: string;
  clientId: string;
  title: string;
  description: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  responses: RequestResponse[];
}

export interface RequestResponse {
  id: string;
  requestId: string;
  message: string;
  attachments?: string[];
  createdBy: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}
