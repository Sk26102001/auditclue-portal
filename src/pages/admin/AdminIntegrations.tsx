import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { 
  Settings, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Key,
  Database,
  Mail,
  Cloud,
  FileText,
  Shield
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  settings?: {
    label: string;
    value: string;
    type: 'text' | 'password' | 'toggle';
  }[];
}

const integrations: Integration[] = [
  {
    id: 'zoho-books',
    name: 'Zoho Books',
    description: 'Sync invoices, payments, and statement of accounts',
    icon: <FileText className="h-6 w-6" />,
    status: 'connected',
    lastSync: '2024-02-07T10:30:00',
    settings: [
      { label: 'Organization ID', value: 'ORG-123456', type: 'text' },
      { label: 'API Key', value: '••••••••••••', type: 'password' },
      { label: 'Auto Sync', value: 'true', type: 'toggle' },
    ],
  },
  {
    id: 'zoho-mail',
    name: 'Zoho Mail',
    description: 'Send email notifications and reminders',
    icon: <Mail className="h-6 w-6" />,
    status: 'connected',
    lastSync: '2024-02-07T12:00:00',
    settings: [
      { label: 'SMTP Server', value: 'smtp.zoho.com', type: 'text' },
      { label: 'From Email', value: 'notifications@auditclue.ae', type: 'text' },
    ],
  },
  {
    id: 'aws-s3',
    name: 'AWS S3',
    description: 'Cloud storage for documents and files',
    icon: <Cloud className="h-6 w-6" />,
    status: 'connected',
    lastSync: '2024-02-07T08:00:00',
    settings: [
      { label: 'Bucket Name', value: 'auditclue-documents', type: 'text' },
      { label: 'Region', value: 'me-south-1', type: 'text' },
      { label: 'Access Key', value: '••••••••••••', type: 'password' },
    ],
  },
  {
    id: 'fta-portal',
    name: 'UAE FTA Portal',
    description: 'VAT and Corporate Tax submissions (Manual)',
    icon: <Shield className="h-6 w-6" />,
    status: 'disconnected',
    settings: [
      { label: 'Portal URL', value: 'https://eservices.tax.gov.ae', type: 'text' },
    ],
  },
];

const statusConfig = {
  connected: { label: 'Connected', icon: <CheckCircle2 className="h-4 w-4" />, className: 'bg-success/10 text-success border-success/30' },
  disconnected: { label: 'Not Connected', icon: <AlertCircle className="h-4 w-4" />, className: 'bg-muted text-muted-foreground' },
  error: { label: 'Error', icon: <AlertCircle className="h-4 w-4" />, className: 'bg-destructive/10 text-destructive border-destructive/30' },
};

export default function AdminIntegrations() {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  return (
    <DashboardLayout title="Integrations" subtitle="Manage third-party connections">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Integrations</p>
                <p className="text-2xl font-bold">{integrations.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-success/10 p-3">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Connected</p>
                <p className="text-2xl font-bold">{integrations.filter(i => i.status === 'connected').length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-warning/10 p-3">
                <RefreshCw className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Sync</p>
                <p className="text-lg font-bold">2 hours ago</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-secondary/10 p-3">
                <Database className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data Synced</p>
                <p className="text-lg font-bold">1.2 GB</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Integration List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Available Integrations</h2>
            {integrations.map((integration) => {
              const status = statusConfig[integration.status];
              const isSelected = selectedIntegration?.id === integration.id;
              
              return (
                <Card 
                  key={integration.id}
                  className={cn(
                    'cursor-pointer transition-all hover:shadow-md',
                    isSelected && 'ring-2 ring-primary'
                  )}
                  onClick={() => setSelectedIntegration(integration)}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className={cn(
                      'rounded-lg p-3',
                      integration.status === 'connected' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                    )}>
                      {integration.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{integration.name}</h4>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                    <Badge variant="outline" className={cn('gap-1', status.className)}>
                      {status.icon}
                      {status.label}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Integration Details */}
          <div className="lg:col-span-2">
            {selectedIntegration ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'rounded-lg p-3',
                        selectedIntegration.status === 'connected' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                      )}>
                        {selectedIntegration.icon}
                      </div>
                      <div>
                        <CardTitle>{selectedIntegration.name}</CardTitle>
                        <CardDescription>{selectedIntegration.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className={statusConfig[selectedIntegration.status].className}>
                      {statusConfig[selectedIntegration.status].label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedIntegration.lastSync && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <RefreshCw className="h-4 w-4" />
                      Last synced: {new Date(selectedIntegration.lastSync).toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  )}

                  <div className="space-y-4">
                    <h4 className="font-medium">Configuration</h4>
                    {selectedIntegration.settings?.map((setting, index) => (
                      <div key={index} className="grid gap-2">
                        <Label>{setting.label}</Label>
                        {setting.type === 'toggle' ? (
                          <div className="flex items-center gap-2">
                            <Switch checked={setting.value === 'true'} />
                            <span className="text-sm text-muted-foreground">
                              {setting.value === 'true' ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        ) : (
                          <Input 
                            type={setting.type} 
                            value={setting.value} 
                            readOnly 
                            className="bg-muted"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4">
                    {selectedIntegration.status === 'connected' ? (
                      <>
                        <Button variant="outline" className="gap-2">
                          <RefreshCw className="h-4 w-4" />
                          Sync Now
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Key className="h-4 w-4" />
                          Update Credentials
                        </Button>
                        <Button variant="outline" className="gap-2 text-destructive hover:text-destructive">
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Connect
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Settings className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">Select an Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose an integration from the list to view and manage its settings.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
