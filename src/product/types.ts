/** Domain-agnostic product types. Scenario labels come from config/dataset. */

export type NavId =
  | 'home'
  | 'explore'
  | 'reports'
  | 'templates'
  | 'library'
  | 'automations'
  | 'settings';

export type ViewMode =
  | 'home'
  | 'explore'
  | 'reports'
  | 'templates'
  | 'library'
  | 'automations'
  | 'settings'
  | 'setup'
  | 'workspace'
  | 'generating'
  | 'custom-ai-build';

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
  | 'video'
  | 'kpi-row'
  | 'player-list'
  | 'scoreboard'
  | 'event-list';

/**
 * Named dashboard compositions for report pages.
 * Objects place themselves with `slot` — unknown slots fall through to the stack.
 */
export type PageLayout =
  | 'stack'
  | 'match-live'
  | 'match-review'
  | 'summary-dashboard'
  | 'analytics-split'
  | 'compare-split'
  | 'custom-grid'
  | 'opponent-board';

/** Side-by-side compare state persisted on a report. */
export type CompareContext = {
  enabled: boolean;
  leftTeam: string;
  rightTeam: string;
  leftPeriod?: string;
  rightPeriod?: string;
  leftMatchId?: string;
  rightMatchId?: string;
};

/** How the AI chat docks relative to the report canvas. */
export type ChatPlacement = 'embedded' | 'floating';

export type ReportObjectSlot =
  | 'header'
  | 'media'
  | 'side'
  | 'events'
  | 'insight'
  | 'notes'
  | 'chart-a'
  | 'chart-b'
  | 'chart-c'
  | 'main'
  | 'metrics'
  | 'slot-1'
  | 'slot-2'
  | 'slot-3'
  | 'slot-4'
  | 'slot-5'
  | 'slot-6';

/** Free-form dashboard placement on a 12-column modular grid. */
export type ObjectGrid = {
  x: number;
  y: number;
  w: number;
  h: number;
};

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
  /** Key into product/charts/chartCatalog */
  chartId?: string;
  pinnedFromAi?: boolean;
  /** Placement inside a non-stack page layout */
  slot?: ReportObjectSlot;
  /** Free-form x/y/w/h when the page uses the modular grid editor */
  grid?: ObjectGrid;
  /** Scoreboard fields when kind is `scoreboard` */
  homeTeam?: string;
  awayTeam?: string;
  homeScore?: number | string;
  awayScore?: number | string;
  matchStatus?: string;
  matchMeta?: string;
  live?: boolean;
  /** Event rows when kind is `event-list` — [minute, text, tone?] */
  events?: Array<{ id: string; minute: string; text: string; tone?: 'goal' | 'card' | 'sub' | 'neutral' }>;
  /** Match/row ids into the demo source corpus for lineage drill-down. */
  sourceRefs?: string[];
  /** Stable key for a single metric within a multi-KPI object. */
  metricKey?: string;
};

export type ReportPage = {
  id: string;
  name: string;
  /** Dashboard composition; defaults to vertical stack */
  layout?: PageLayout;
  objects: ReportObject[];
};

export type ContextItem = {
  id: string;
  label: string;
  kind: 'data' | 'report' | 'object' | 'note' | 'file';
};

/** Chart the AI proposes for one-click insert into a custom report. */
export type ChartProposal = {
  chartId: string;
  title: string;
  caption: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  /** Optional deeper WWC 2023 grounding shown via the answer info control. */
  detail?: string;
  sources?: string[];
  pending?: boolean;
  /** When set, the chat UI can preview and pin this chart onto the canvas. */
  chartProposal?: ChartProposal;
};

/** Fields callers can leave editable when reusing a saved template. */
export type TemplateEditableField =
  | 'match-context'
  | 'report-name'
  | 'data-sources'
  | 'audience'
  | 'team-period'
  | 'widget-layout'
  | 'analyst-notes';

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
  /** Present when the template was saved from a report. */
  editableFields?: TemplateEditableField[];
  savedFromReportId?: string;
};

/** Match scope chosen before create; editable later in edit mode. */
export type ReportMatchContext = {
  tournament: string;
  year: string;
  homeTeam: string;
  awayTeam: string;
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
  /** Freeform labels for library filters and board chrome. */
  tags?: string[];
  pages: ReportPage[];
  context: ContextItem[];
  chat: ChatMessage[];
  schedule?: RefreshSchedule | null;
  sourceLabels: string[];
  /** Optional A/B compare context for workspace compare mode. */
  compare?: CompareContext;
  /** Tournament / year / home (+ optional away) that seed charts. */
  matchContext?: ReportMatchContext;
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

/** When a match should spawn a report from a template. */
export type AutomationTriggerKind = 'any-match' | 'team' | 'requirements';

export type Automation = {
  id: string;
  name: string;
  enabled: boolean;
  /** What match event starts generation. */
  triggerKind: AutomationTriggerKind;
  /** Team filter when triggerKind is `team` (e.g. Spain). */
  team?: string;
  /** Free-text match filter when triggerKind is `requirements`. */
  requirements?: string;
  /** Match lifecycle event that fires the automation. */
  triggerEvent?: 'full-time';
  /** Minutes after the trigger event before generation (product default 30). */
  delayMinutes?: number;
  templateId: string;
  templateName: string;
  notify: 'in-app' | 'email' | 'both';
  requireReview: boolean;
  lastRun?: string;
  lastMatch?: string;
  lastReportId?: string;
  runsGenerated: number;
};

/** Active lineage drill-down target in the workspace. */
export type LineageTarget = {
  objectId: string;
  metricKey?: string;
  title?: string;
};

export type DemoSnapshot = {
  reports: ReportRecord[];
  notifications: NotificationItem[];
  activities: ActivityItem[];
  automations: Automation[];
  activeReportId: string;
};
