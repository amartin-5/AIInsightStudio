/** Domain-agnostic product types. Demo labels come from demo config/dataset. */

export type NavId =
  | 'home'
  | 'reports'
  | 'templates'
  | 'shared'
  | 'scheduled'
  | 'notifications';

export type ViewMode =
  | 'home'
  | 'reports'
  | 'templates'
  | 'shared'
  | 'scheduled'
  | 'notifications'
  | 'setup'
  | 'workspace'
  | 'generating';

export type ReportStatus =
  | 'Updated'
  | 'Refresh scheduled'
  | 'Draft'
  | 'Shared'
  | 'Needs review';

export type ObjectKind =
  | 'metric'
  | 'chart'
  | 'table'
  | 'ai-summary'
  | 'text'
  | 'analyst-note'
  | 'comparison'
  | 'timeline'
  | 'spatial'
  | 'source-list'
  | 'image'
  | 'kpi-row'
  | 'player-list';

export type ReportObject = {
  id: string;
  kind: ObjectKind;
  title: string;
  preserveOnRefresh?: boolean;
  body?: string;
  metricValue?: string;
  metricHint?: string;
  rows?: string[][];
  columns?: string[];
  placeholderLabel?: string;
  pinnedFromAi?: boolean;
};

export type ReportPage = {
  id: string;
  name: string;
  objects: ReportObject[];
};

export type ContextItem = {
  id: string;
  label: string;
  kind: 'data' | 'report' | 'object' | 'note' | 'file';
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  sources?: string[];
  pending?: boolean;
};

export type ReportTemplate = {
  id: string;
  name: string;
  purpose: string;
  category: string;
  audience: string;
  pages: number;
  sections: string[];
  requiredData: string[];
  objects: string[];
  suggestedPrompts: string[];
  refreshBehavior: string;
  recommended: boolean;
};

export type ReportRecord = {
  id: string;
  name: string;
  templateId: string;
  templateType: string;
  lastUpdated: string;
  status: ReportStatus;
  owner: string;
  sharing: string;
  team?: string;
  period?: string;
  audience?: string;
  pages: ReportPage[];
  context: ContextItem[];
  chat: ChatMessage[];
  schedule?: RefreshSchedule | null;
  demoSources: string[];
};

export type RefreshSchedule = {
  id: string;
  cadence: string;
  when: string;
  aiPrompt: string;
  notify: 'in-app' | 'email' | 'both';
  requireReview: boolean;
};

export type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
  tone: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  reportId?: string;
};

export type ActivityItem = {
  id: string;
  text: string;
  time: string;
};

export type ScheduledActivity = {
  id: string;
  text: string;
  when: string;
};

export type DemoSnapshot = {
  reports: ReportRecord[];
  notifications: NotificationItem[];
  activities: ActivityItem[];
  scheduled: ScheduledActivity[];
  activeReportId: string;
};
