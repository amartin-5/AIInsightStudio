import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  builderSuggestedPrompts,
  blankReportGreeting,
  customAiBuildGreeting,
  contextFromReport,
  resolveAiResponse,
  suggestedPrompts,
} from '../demos/wwc2023/aiResponses';
import {
  buildAutomatedReport,
  buildAutomationNotification,
  DEMO_AUTOMATION_DELAY_MS,
  matchingAutomations,
  type FullTimeEvent,
} from '../demos/wwc2023/automationRunner';
import { demoConfig } from '../demos/wwc2023/config';
import {
  DEFAULT_AFFILIATION_ID,
  getAffiliationOption,
  getExploreProfile,
  type ExploreMatch,
  type ExploreTeamProfile,
} from '../demos/wwc2023/exploreProfiles';
import { createInitialSnapshot } from '../demos/wwc2023/initialState';
import { defaultRecentTemplateIds, templates as seedTemplates } from '../demos/wwc2023/templates';
import {
  CUSTOM_GRID_SLOTS,
  matchContextFromExplore,
  teamCodeLabel,
  type MatchContext,
} from '../product/builder';
import { nextFreeGrid } from '../product/grid/layoutFromSlots';
import type {
  Automation,
  ChartProposal,
  ChatMessage,
  ChatPlacement,
  CompareContext,
  ContextItem,
  DemoSnapshot,
  LineageTarget,
  NavId,
  NotificationItem,
  ObjectGrid,
  RefreshSchedule,
  ReportMatchContext,
  ReportObject,
  ReportObjectSlot,
  ReportPage,
  ReportRecord,
  ReportTemplate,
  TemplateEditableField,
  ViewMode,
} from '../product/types';
import {
  DEFAULT_USER_PROFILE,
  type OnboardingStep,
  type UserProfile,
} from './userProfile';

export type SetupDraft = {
  templateId: string;
  name: string;
  sources: string[];
  team: string;
  period: string;
  audience: string;
  matchContext: ReportMatchContext;
};

/** Preset selection when opening the create console (skips pick when set). */
export type CreatePreset = 'custom-ai' | 'blank' | string;

export type ToastState = { message: string; actionLabel?: string; onAction?: () => void } | null;

export type PanelKind =
  | null
  | 'notifications'
  | 'share'
  | 'export'
  | 'settings'
  | 'schedule'
  | 'automation'
  | 'context'
  | 'lineage'
  | 'changes'
  | 'add-object'
  | 'widget-library'
  | 'compare'
  | 'pin'
  | 'template-preview'
  | 'reset'
  | 'create-report';

export type AutomationDraft = {
  id?: string;
  name: string;
  triggerKind: Automation['triggerKind'];
  team: string;
  requirements: string;
  templateId: string;
  notify: Automation['notify'];
  requireReview: boolean;
  enabled: boolean;
  triggerEvent: 'full-time';
  delayMinutes: number;
};

type AppStateValue = {
  view: ViewMode;
  nav: NavId;
  snapshot: DemoSnapshot;
  setup: SetupDraft | null;
  previewTemplateId: string | null;
  generationStep: number;
  activePageId: string;
  aiCollapsed: boolean;
  aiWidth: number;
  chatPlacement: ChatPlacement;
  /** App nav rail — opening a report collapses it; only the user expands it. */
  sidebarCollapsed: boolean;
  editMode: boolean;
  presentMode: boolean;
  panel: PanelKind;
  pinPayload: { title: string; body: string } | null;
  lineageTarget: LineageTarget | null;
  automationDraft: AutomationDraft | null;
  automationPending: boolean;
  toast: ToastState;
  statusMessage: string | null;
  templates: ReportTemplate[];
  saveReportAsTemplate: (input: {
    name: string;
    purpose?: string;
    category?: string;
    editableFields: TemplateEditableField[];
  }) => void;
  config: typeof demoConfig;
  suggestedPrompts: string[];
  activeReport: ReportRecord | undefined;
  unreadCount: number;
  /** Profile affiliation — the user’s home national/club team. */
  affiliatedTeamId: string;
  /** Explore page team; mirrors affiliation unless the user temporarily switches. */
  exploreTeamId: string;
  affiliatedTeam: ExploreTeamProfile;
  exploreTeam: ExploreTeamProfile;
  isViewingOtherTeam: boolean;
  setAffiliatedTeamId: (id: string) => void;
  setExploreTeamId: (id: string) => void;
  resetExploreToAffiliation: () => void;
  /** False until the welcome / login / profile onboarding completes. */
  sessionReady: boolean;
  onboardingStep: OnboardingStep;
  userProfile: UserProfile;
  setOnboardingStep: (step: OnboardingStep) => void;
  updateUserProfile: (patch: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  signOut: () => void;
  setView: (view: ViewMode) => void;
  setNav: (nav: NavId) => void;
  openHome: () => void;
  openTemplates: () => void;
  /** Fullscreen create-report shell (primary New report CTA). Optional preset skips pick. */
  openCreateReport: (preset?: CreatePreset) => void;
  createPreset: CreatePreset | null;
  clearCreatePreset: () => void;
  openWorkspace: (reportId?: string) => void;
  /** Open a match-scoped dashboard for an Explore past-match row. */
  openMatchDashboard: (team: ExploreTeamProfile, match: ExploreMatch) => void;
  setPreviewTemplate: (id: string | null) => void;
  startSetup: (templateId: string, matchContext?: MatchContext) => void;
  updateSetup: (patch: Partial<SetupDraft>) => void;
  createReportFromSetup: () => void;
  setActiveReport: (id: string) => void;
  setActivePage: (id: string) => void;
  setAiCollapsed: (v: boolean) => void;
  setAiWidth: (v: number) => void;
  setChatPlacement: (v: ChatPlacement) => void;
  setSidebarCollapsed: (v: boolean) => void;
  setEditMode: (v: boolean) => void;
  setPresentMode: (v: boolean) => void;
  advancePresentPage: (direction: 1 | -1) => void;
  setPanel: (panel: PanelKind) => void;
  openLineage: (target: LineageTarget) => void;
  closeLineage: () => void;
  toggleCompareMode: () => void;
  setCompareContext: (patch: Partial<CompareContext>) => void;
  setToast: (toast: ToastState) => void;
  sendPrompt: (prompt: string) => void;
  pinToPage: (pageId: string) => void;
  setPinPayload: (payload: { title: string; body: string } | null) => void;
  addContext: (item: ContextItem) => void;
  removeContext: (id: string) => void;
  updateObject: (pageId: string, objectId: string, patch: Partial<ReportObject>) => void;
  removeObject: (pageId: string, objectId: string) => void;
  duplicateObject: (pageId: string, objectId: string) => void;
  moveObject: (pageId: string, objectId: string, direction: 'up' | 'down') => void;
  addObjectToPage: (object: ReportObject) => void;
  addPage: () => void;
  renamePage: (pageId: string, name: string) => void;
  removePage: (pageId: string) => void;
  duplicatePage: (pageId: string) => void;
  movePage: (pageId: string, direction: 'up' | 'down') => void;
  runRefresh: (opts: {
    preserveNotes: boolean;
    generateSummary: boolean;
    notify: boolean;
  }) => void;
  /** Instant dashboard refresh with an "Updated [timestamp]" toast. */
  quickRefresh: () => void;
  saveSchedule: (schedule: RefreshSchedule) => void;
  openAutomationEditor: (automation?: Automation) => void;
  closeAutomationEditor: () => void;
  updateAutomationDraft: (patch: Partial<AutomationDraft>) => void;
  saveAutomation: () => void;
  toggleAutomation: (id: string, enabled: boolean) => void;
  deleteAutomation: (id: string) => void;
  simulateFullTime: (event?: FullTimeEvent) => void;
  markNotificationRead: (id: string) => void;
  dismissNotification: (id: string) => void;
  shareReport: () => void;
  exportReport: () => void;
  resetDemo: () => void;
  askAiAboutObject: (title: string) => void;
  insertAiCreatedObject: (prompt: string) => void;
  /** Chat-led immersive Custom AI creation stage (requires match context). */
  startCustomBuild: (matchContext: MatchContext) => void;
  /** Empty modular canvas with standard chat in the workspace (requires match context). */
  startBlankBuild: (matchContext: MatchContext) => void;
  /** Update match scope in edit mode and refresh chart bindings. */
  updateMatchContext: (next: MatchContext) => void;
  /** Leave Custom AI stage and open the saved dashboard in the standard workspace. */
  finishCustomAiBuild: () => void;
  /** Cancel Custom AI stage without opening the workspace canvas. */
  cancelCustomAiBuild: () => void;
  /** Persist a draft dashboard; switches AI guide → normal Ask chat. */
  saveReport: () => void;
  recentTemplateIds: string[];
  touchRecentTemplate: (templateId: string) => void;
  renameReport: (name: string, options?: { silent?: boolean }) => void;
  /** Replace dashboard tags (edit mode). */
  setReportTags: (tags: string[]) => void;
  selectedSlot: ReportObjectSlot | null;
  setSelectedSlot: (slot: ReportObjectSlot | null) => void;
  builderTourStep: number;
  setBuilderTourStep: (step: number) => void;
  builderTourOpen: boolean;
  setBuilderTourOpen: (open: boolean) => void;
  swapObjectSlots: (from: ReportObjectSlot, to: ReportObjectSlot) => void;
  addChartProposalToReport: (proposal: ChartProposal) => void;
  builderSuggestedPrompts: string[];
  /** Persist free-form modular grid positions for a page. */
  updateObjectGrids: (
    pageId: string,
    items: Array<{ id: string; grid: ObjectGrid }>,
    options?: { mergeHeightOnly?: boolean },
  ) => void;
};

const RECENT_TEMPLATES_KEY = 'ais-recent-templates';

function loadRecentTemplateIds(): string[] {
  try {
    const raw = window.localStorage.getItem(RECENT_TEMPLATES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed) && parsed.every((id) => typeof id === 'string')) {
        return parsed as string[];
      }
    }
  } catch {
    /* demo localStorage may be unavailable */
  }
  return [...defaultRecentTemplateIds];
}

function persistRecentTemplateIds(ids: string[]) {
  try {
    window.localStorage.setItem(RECENT_TEMPLATES_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

function createBlankCustomReport(
  greeting: string = blankReportGreeting,
  matchContext: MatchContext,
): ReportRecord {
  const pageId = uid('page');
  return {
    id: uid('report'),
    name: 'Untitled',
    templateId: 'blank',
    templateType: 'Custom report',
    lastUpdated: 'Just now',
    status: 'Draft',
    owner: 'You',
    sharing: 'Private',
    team: teamCodeLabel(matchContext.homeTeam),
    period: matchContext.year ? `${matchContext.year} season` : 'Selected matches',
    audience: 'Analyst',
    tags: ['Custom', teamCodeLabel(matchContext.homeTeam)].filter(Boolean),
    matchContext: { ...matchContext },
    pages: [
      {
        id: pageId,
        name: 'Page 1',
        layout: 'custom-grid',
        objects: [],
      },
    ],
    context: demoConfig.dataSources.slice(0, 3).map((s) => ({
      id: s.id,
      label: s.label,
      kind: 'data' as const,
    })),
    chat: [
      {
        id: uid('a'),
        role: 'assistant',
        content: greeting,
      },
    ],
    schedule: null,
    sourceLabels: demoConfig.dataSources.slice(0, 3).map((s) => s.label),
  };
}


const AppStateContext = createContext<AppStateValue | null>(null);

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<DemoSnapshot>(() => createInitialSnapshot());
  const [view, setView] = useState<ViewMode>('home');
  const [nav, setNav] = useState<NavId>('home');
  const [setup, setSetup] = useState<SetupDraft | null>(null);
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState(0);
  const [activePageId, setActivePageId] = useState('board');
  const [aiCollapsed, setAiCollapsed] = useState(false);
  const [chatPlacement, setChatPlacement] = useState<'embedded' | 'floating'>('embedded');
  const [aiWidth, setAiWidth] = useState(300);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [presentMode, setPresentMode] = useState(false);
  const [panel, setPanel] = useState<PanelKind>(null);
  const [createPreset, setCreatePreset] = useState<CreatePreset | null>(null);
  const [savedTemplates, setSavedTemplates] = useState<ReportTemplate[]>([]);
  const templates = useMemo(
    () => [...savedTemplates, ...seedTemplates],
    [savedTemplates],
  );
  const [pinPayload, setPinPayload] = useState<{ title: string; body: string } | null>(null);
  const [lineageTarget, setLineageTarget] = useState<LineageTarget | null>(null);
  const [automationDraft, setAutomationDraft] = useState<AutomationDraft | null>(null);
  const [automationPending, setAutomationPending] = useState(false);
  const automationTimerRef = useRef<number | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<ReportObjectSlot | null>('slot-1');
  const [builderTourStep, setBuilderTourStep] = useState(0);
  const [builderTourOpen, setBuilderTourOpen] = useState(false);
  const [recentTemplateIds, setRecentTemplateIds] = useState<string[]>(() =>
    loadRecentTemplateIds(),
  );
  const [affiliatedTeamId, setAffiliatedTeamIdState] = useState(DEFAULT_AFFILIATION_ID);
  const [exploreTeamId, setExploreTeamIdState] = useState(DEFAULT_AFFILIATION_ID);
  const [sessionReady, setSessionReady] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('welcome');
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);

  const activeReport = snapshot.reports.find((r) => r.id === snapshot.activeReportId);
  const affiliatedTeam = getExploreProfile(affiliatedTeamId);
  const exploreTeam = getExploreProfile(exploreTeamId);
  const isViewingOtherTeam = exploreTeamId !== affiliatedTeamId;

  const setAffiliatedTeamId = useCallback((id: string) => {
    const next = getAffiliationOption(id).id;
    setAffiliatedTeamIdState(next);
    setExploreTeamIdState(next);
    setUserProfile((prev) => ({ ...prev, affiliatedTeamId: next }));
  }, []);

  const setExploreTeamId = useCallback((id: string) => {
    setExploreTeamIdState(getAffiliationOption(id).id);
  }, []);

  const resetExploreToAffiliation = useCallback(() => {
    setExploreTeamIdState(affiliatedTeamId);
  }, [affiliatedTeamId]);

  const updateUserProfile = useCallback((patch: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...patch }));
  }, []);

  const completeOnboarding = useCallback(() => {
    const teamId = getAffiliationOption(userProfile.affiliatedTeamId).id;
    const nextProfile: UserProfile = {
      ...userProfile,
      displayName: userProfile.displayName.trim() || 'Guest',
      email: userProfile.email.trim(),
      jobTitle: userProfile.jobTitle.trim(),
      affiliatedTeamId: teamId,
      affiliationKind: getAffiliationOption(teamId).kind,
    };
    setUserProfile(nextProfile);
    setAffiliatedTeamIdState(teamId);
    setExploreTeamIdState(teamId);
    setAiCollapsed(!nextProfile.aiPanelOpen);

    const landing = nextProfile.defaultHome;
    if (
      landing === 'home' ||
      landing === 'explore' ||
      landing === 'reports' ||
      landing === 'templates' ||
      landing === 'automations' ||
      landing === 'settings'
    ) {
      setNav(landing);
      setView(landing === 'reports' ? 'reports' : (landing as ViewMode));
    } else {
      setNav('home');
      setView('home');
    }

    setSessionReady(true);
    setToast({ message: 'Welcome to Insight Studio' });
  }, [userProfile]);

  const signOut = useCallback(() => {
    setSessionReady(false);
    setOnboardingStep('welcome');
    setUserProfile(DEFAULT_USER_PROFILE);
    setAffiliatedTeamIdState(DEFAULT_AFFILIATION_ID);
    setExploreTeamIdState(DEFAULT_AFFILIATION_ID);
    setPanel(null);
    setPresentMode(false);
    setToast({ message: 'Signed out' });
  }, []);

  const updateActiveReport = useCallback((updater: (report: ReportRecord) => ReportRecord) => {
    setSnapshot((prev) => ({
      ...prev,
      reports: prev.reports.map((r) =>
        r.id === prev.activeReportId ? updater(structuredClone(r)) : r,
      ),
    }));
  }, []);

  const openHome = useCallback(() => {
    setView('home');
    setNav('home');
  }, []);

  const openTemplates = useCallback(() => {
    setView('templates');
    setNav('templates');
    setPreviewTemplateId(null);
  }, []);

  const openCreateReport = useCallback((preset?: CreatePreset) => {
    setCreatePreset(preset ?? null);
    setPanel('create-report');
  }, []);

  const clearCreatePreset = useCallback(() => {
    setCreatePreset(null);
  }, []);

  const openWorkspace = useCallback((reportId?: string) => {
    setSnapshot((prev) => ({
      ...prev,
      activeReportId: reportId ?? prev.activeReportId,
    }));
    setView('workspace');
    setNav('reports');
    setActivePageId((current) => current || 'board');
  }, []);

  const openMatchDashboard = useCallback(
    (team: ExploreTeamProfile, match: ExploreMatch) => {
      const matchContext = matchContextFromExplore(team.crestTeam || team.name, match);
      const base =
        createInitialSnapshot().reports.find((r) => r.id === 'england-opponent') ??
        createInitialSnapshot().reports[0];
      const template = templates.find((t) => t.id === 'match-analysis');
      const report: ReportRecord = {
        ...base,
        id: uid('report'),
        name: `${team.name} vs ${match.opponent} · ${match.round}`,
        templateId: 'match-analysis',
        templateType: template?.name ?? 'Match analysis',
        lastUpdated: 'Just now',
        status: 'Updated',
        owner: 'You',
        sharing: 'Private',
        team: team.name,
        period: `${match.competition} · ${match.date}`,
        audience: 'Analyst',
        tags: ['Match', match.round, match.competition].filter(Boolean),
        matchContext,
        chat: [
          {
            id: uid('a'),
            role: 'assistant',
            content: `Match dashboard for ${team.name} vs ${match.opponent} (${match.round}, ${match.date}). Result ${match.result}. ${match.takeaway} Ask for deeper cuts or pin visuals to the board.`,
          },
        ],
        schedule: null,
        sourceLabels: demoConfig.dataSources.slice(0, 3).map((s) => s.label),
        context: demoConfig.dataSources.slice(0, 3).map((s) => ({
          id: s.id,
          label: s.label,
          kind: 'data' as const,
        })),
      };
      setSnapshot((prev) => ({
        ...prev,
        reports: [report, ...prev.reports],
        activeReportId: report.id,
      }));
      setActivePageId(report.pages[0]?.id ?? 'board');
      setSelectedSlot('slot-1');
      setEditMode(false);
      setAiCollapsed(false);
      setPreviewTemplateId(null);
      setSetup(null);
      setPanel(null);
      setView('workspace');
      setNav('reports');
      setToast({ message: `Opened ${team.name} vs ${match.opponent}` });
    },
    [templates],
  );

  const touchRecentTemplate = useCallback((templateId: string) => {
    if (!templateId || templateId === 'blank' || templateId === 'custom-ai') return;
    setRecentTemplateIds((prev) => {
      const next = [templateId, ...prev.filter((id) => id !== templateId)];
      persistRecentTemplateIds(next);
      return next;
    });
  }, []);

  const openBlankReport = useCallback(
    (options: {
      greeting: string;
      view: ViewMode;
      toast: string;
      matchContext: MatchContext;
      tourOpen?: boolean;
    }) => {
      const report = createBlankCustomReport(options.greeting, options.matchContext);
      setSnapshot((prev) => ({
        ...prev,
        reports: [report, ...prev.reports],
        activeReportId: report.id,
      }));
      setActivePageId(report.pages[0].id);
      setSelectedSlot('slot-1');
      setBuilderTourStep(0);
      setBuilderTourOpen(options.tourOpen ?? false);
      setEditMode(true);
      setAiCollapsed(false);
      setPreviewTemplateId(null);
      setSetup(null);
      setCreatePreset(null);
      setPanel(null);
      setView(options.view);
      setNav('reports');
      setToast({ message: options.toast });
    },
    [],
  );

  const startBlankBuild = useCallback(
    (matchContext: MatchContext) => {
      openBlankReport({
        greeting: blankReportGreeting,
        view: 'workspace',
        toast: 'Blank report ready — add widgets from the library or chat',
        matchContext,
      });
    },
    [openBlankReport],
  );

  const startCustomBuild = useCallback(
    (matchContext: MatchContext) => {
      openBlankReport({
        greeting: customAiBuildGreeting,
        view: 'custom-ai-build',
        toast: 'Describe what you need — finish whenever you’re ready',
        matchContext,
      });
    },
    [openBlankReport],
  );

  const updateMatchContext = useCallback(
    (next: MatchContext) => {
      updateActiveReport((report) => ({
        ...report,
        matchContext: { ...next },
        team: teamCodeLabel(next.homeTeam),
        period: next.year ? `${next.year} season` : report.period,
        lastUpdated: 'Just now',
      }));
      setStatusMessage('Updating charts for match context…');
      window.setTimeout(() => setStatusMessage(null), 900);
      setToast({ message: 'Charts updated for match context' });
    },
    [updateActiveReport],
  );

  const saveReport = useCallback(() => {
    updateActiveReport((report) => ({
      ...report,
      status: report.status === 'Draft' ? 'Updated' : report.status,
      lastUpdated: 'Just now',
    }));
    setBuilderTourOpen(false);
    setToast({ message: 'Dashboard saved' });
  }, [updateActiveReport]);

  const finishCustomAiBuild = useCallback(() => {
    updateActiveReport((report) => ({
      ...report,
      status: report.status === 'Draft' ? 'Updated' : report.status,
      lastUpdated: 'Just now',
    }));
    setBuilderTourOpen(false);
    setView('workspace');
    setNav('reports');
    setAiCollapsed(false);
    setEditMode(true);
    setToast({ message: 'Dashboard ready' });
  }, [updateActiveReport]);

  const cancelCustomAiBuild = useCallback(() => {
    setView('reports');
    setNav('reports');
    setToast({ message: 'Draft saved in Reports' });
  }, []);

  const startSetup = useCallback(
    (templateId: string, matchContext?: MatchContext) => {
      if (templateId === 'blank') {
        if (matchContext) startBlankBuild(matchContext);
        else openCreateReport('blank');
        return;
      }
      touchRecentTemplate(templateId);
      const template = templates.find((t) => t.id === templateId);
      const homeName = matchContext ? teamCodeLabel(matchContext.homeTeam) : 'England';
      setSetup({
        templateId,
        name:
          templateId === 'opponent-analysis'
            ? `${homeName} opponent analysis`
            : `${template?.name ?? 'New'} report`,
        sources: demoConfig.dataSources.map((s) => s.id),
        team: homeName,
        period: matchContext?.year ? `${matchContext.year} season` : 'Entire tournament',
        audience: template?.audience?.split('/')[0]?.trim() || 'Analyst',
        matchContext: matchContext
          ? { ...matchContext }
          : { tournament: 'wwc', year: '2023', homeTeam: 'eng', awayTeam: '' },
      });
      setPreviewTemplateId(null);
      setView('setup');
    },
    [startBlankBuild, touchRecentTemplate, openCreateReport, templates],
  );

  const updateSetup = useCallback((patch: Partial<SetupDraft>) => {
    setSetup((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const createReportFromSetup = useCallback(() => {
    if (!setup) return;
    touchRecentTemplate(setup.templateId);
    setView('generating');
    setGenerationStep(0);
    const steps = [0, 1, 2, 3, 4];
    steps.forEach((step, index) => {
      window.setTimeout(() => {
        setGenerationStep(step);
        if (step === 4) {
          const template = templates.find((t) => t.id === setup.templateId);
          const isBlank = setup.templateId === 'blank';
          const base = createInitialSnapshot().reports.find((r) => r.id === 'england-opponent');
          const blank = createBlankCustomReport(blankReportGreeting, setup.matchContext);
          const newReport: ReportRecord = isBlank
            ? {
                ...blank,
                name: setup.name.trim() || 'Untitled',
                team: setup.team,
                period: setup.period,
                audience: setup.audience,
                matchContext: { ...setup.matchContext },
                sourceLabels: demoConfig.dataSources
                  .filter((s) => setup.sources.includes(s.id))
                  .map((s) => s.label),
                context: demoConfig.dataSources
                  .filter((s) => setup.sources.includes(s.id))
                  .map((s) => ({
                    id: s.id,
                    label: s.label,
                    kind: 'data' as const,
                  })),
              }
            : {
                ...(base ?? createInitialSnapshot().reports[1]),
                id: uid('report'),
                name: setup.name,
                templateId: setup.templateId,
                templateType: template?.name ?? 'Report',
                team: setup.team,
                period: setup.period,
                audience: setup.audience,
                matchContext: { ...setup.matchContext },
                lastUpdated: 'Just now',
                status: 'Updated',
                owner: 'You',
                sharing: 'Private',
                chat: [],
                schedule: null,
                sourceLabels: demoConfig.dataSources
                  .filter((s) => setup.sources.includes(s.id))
                  .map((s) => s.label),
                context: demoConfig.dataSources
                  .filter((s) => setup.sources.includes(s.id))
                  .map((s) => ({
                    id: s.id,
                    label: s.label,
                    kind: 'data' as const,
                  })),
              };
          setSnapshot((prev) => ({
            ...prev,
            reports: [newReport, ...prev.reports.filter((r) => r.id !== newReport.id)],
            activeReportId: newReport.id,
          }));
          setActivePageId(newReport.pages[0]?.id ?? 'board');
          if (isBlank) {
            setSelectedSlot('slot-1');
            setBuilderTourStep(0);
            setBuilderTourOpen(false);
            setEditMode(true);
            setAiCollapsed(false);
          }
          setSetup(null);
          setView('workspace');
          setNav('reports');
          setToast({ message: 'Report ready' });
        }
      }, index * 700);
    });
  }, [setup, touchRecentTemplate, templates]);

  const setActiveReport = useCallback((id: string) => {
    setSnapshot((prev) => ({ ...prev, activeReportId: id }));
    const report = snapshot.reports.find((r) => r.id === id);
    setActivePageId(report?.pages[0]?.id ?? 'board');
    setView('workspace');
    setNav('reports');
  }, [snapshot.reports]);

  const sendPrompt = useCallback(
    (prompt: string) => {
      const userMsg: ChatMessage = { id: uid('u'), role: 'user', content: prompt };
      const pending: ChatMessage = {
        id: uid('a'),
        role: 'assistant',
        content: 'Working from Women’s World Cup 2023 sources…',
        pending: true,
      };
      const liveReport =
        snapshot.reports.find((r) => r.id === snapshot.activeReportId) ??
        snapshot.reports[0];
      const reportCtx = liveReport
        ? contextFromReport(liveReport, activePageId)
        : undefined;
      updateActiveReport((report) => ({
        ...report,
        chat: [...report.chat, userMsg, pending],
      }));
      window.setTimeout(() => {
        const answer = resolveAiResponse(prompt, reportCtx);
        updateActiveReport((report) => ({
          ...report,
          chat: report.chat.map((m) =>
            m.id === pending.id
              ? {
                  ...m,
                  pending: false,
                  content: answer.content,
                  detail: answer.detail,
                  sources: answer.sources,
                  chartProposal: answer.chartProposal,
                }
              : m,
          ),
        }));
      }, 900);
    },
    [updateActiveReport, activePageId, snapshot.activeReportId, snapshot.reports],
  );

  const renameReport = useCallback(
    (name: string, options?: { silent?: boolean }) => {
      const next = name.trim() || 'Untitled';
      updateActiveReport((report) => ({
        ...report,
        name: next,
        lastUpdated: 'Just now',
      }));
      if (!options?.silent) setToast({ message: `Renamed to “${next}”` });
    },
    [updateActiveReport],
  );

  const setReportTags = useCallback(
    (tags: string[]) => {
      const cleaned = Array.from(
        new Set(tags.map((tag) => tag.trim()).filter(Boolean)),
      );
      updateActiveReport((report) => ({
        ...report,
        tags: cleaned,
        lastUpdated: 'Just now',
      }));
    },
    [updateActiveReport],
  );

  const nextEmptySlot = useCallback(
    (objects: ReportObject[], preferred?: ReportObjectSlot | null): ReportObjectSlot => {
      if (preferred && !objects.some((o) => o.slot === preferred)) return preferred;
      return (
        CUSTOM_GRID_SLOTS.find((slot) => !objects.some((o) => o.slot === slot)) ?? 'slot-1'
      );
    },
    [],
  );

  const swapObjectSlots = useCallback(
    (from: ReportObjectSlot, to: ReportObjectSlot) => {
      updateActiveReport((report) => ({
        ...report,
        pages: report.pages.map((p) => {
          if (p.id !== activePageId) return p;
          const fromObj = p.objects.find((o) => o.slot === from);
          const toObj = p.objects.find((o) => o.slot === to);
          if (!fromObj) return p;
          return {
            ...p,
            objects: p.objects.map((o) => {
              if (o.id === fromObj.id) return { ...o, slot: to };
              if (toObj && o.id === toObj.id) return { ...o, slot: from };
              return o;
            }),
          };
        }),
        lastUpdated: 'Just now',
      }));
      setSelectedSlot(to);
    },
    [activePageId, updateActiveReport],
  );

  const addChartProposalToReport = useCallback(
    (proposal: ChartProposal) => {
      updateActiveReport((report) => {
        const page =
          report.pages.find((p) => p.id === activePageId) ?? report.pages[0];
        if (!page) return report;
        const slot = nextEmptySlot(page.objects, selectedSlot);
        const object: ReportObject = {
          id: uid('chart'),
          kind: 'chart',
          title: proposal.title,
          body: proposal.caption,
          chartId: proposal.chartId,
          pinnedFromAi: true,
          slot,
        };
        return {
          ...report,
          pages: report.pages.map((p) =>
            p.id === page.id ? { ...p, objects: [...p.objects, object] } : p,
          ),
          lastUpdated: 'Just now',
        };
      });
      setToast({ message: `Added “${proposal.title}” to the report` });
      setBuilderTourStep((step) => Math.max(step, 2));
    },
    [activePageId, nextEmptySlot, selectedSlot, updateActiveReport],
  );

  const pinToPage = useCallback(
    (pageId: string) => {
      if (!pinPayload) return;
      const object: ReportObject = {
        id: uid('pin'),
        kind: 'ai-summary',
        title: pinPayload.title,
        body: pinPayload.body,
        pinnedFromAi: true,
      };
      updateActiveReport((report) => ({
        ...report,
        pages: report.pages.map((p) =>
          p.id === pageId ? { ...p, objects: [...p.objects, object] } : p,
        ),
        lastUpdated: 'Just now',
      }));
      setActivePageId(pageId);
      setPanel(null);
      setPinPayload(null);
      setToast({
        message: `Added to ${activeReport?.name ?? 'report'}`,
        actionLabel: 'View',
        onAction: () => {
          setView('workspace');
          setActivePageId(pageId);
        },
      });
    },
    [pinPayload, updateActiveReport, activeReport?.name],
  );

  const addContext = useCallback(
    (item: ContextItem) => {
      updateActiveReport((report) => ({
        ...report,
        context: [...report.context, item],
      }));
      setToast({ message: 'Context added' });
    },
    [updateActiveReport],
  );

  const removeContext = useCallback(
    (id: string) => {
      updateActiveReport((report) => ({
        ...report,
        context: report.context.filter((c) => c.id !== id),
      }));
    },
    [updateActiveReport],
  );

  const updateObject = useCallback(
    (pageId: string, objectId: string, patch: Partial<ReportObject>) => {
      updateActiveReport((report) => ({
        ...report,
        pages: report.pages.map((p) =>
          p.id !== pageId
            ? p
            : {
                ...p,
                objects: p.objects.map((o) => (o.id === objectId ? { ...o, ...patch } : o)),
              },
        ),
      }));
    },
    [updateActiveReport],
  );

  const removeObject = useCallback(
    (pageId: string, objectId: string) => {
      updateActiveReport((report) => ({
        ...report,
        pages: report.pages.map((p) =>
          p.id !== pageId ? p : { ...p, objects: p.objects.filter((o) => o.id !== objectId) },
        ),
      }));
    },
    [updateActiveReport],
  );

  const duplicateObject = useCallback(
    (pageId: string, objectId: string) => {
      updateActiveReport((report) => ({
        ...report,
        pages: report.pages.map((p) => {
          if (p.id !== pageId) return p;
          const target = p.objects.find((o) => o.id === objectId);
          if (!target) return p;
          return {
            ...p,
            objects: [...p.objects, { ...structuredClone(target), id: uid('obj'), title: `${target.title} (copy)` }],
          };
        }),
      }));
    },
    [updateActiveReport],
  );

  const moveObject = useCallback(
    (pageId: string, objectId: string, direction: 'up' | 'down') => {
      updateActiveReport((report) => ({
        ...report,
        pages: report.pages.map((p) => {
          if (p.id !== pageId) return p;
          const index = p.objects.findIndex((o) => o.id === objectId);
          if (index < 0) return p;
          const next = [...p.objects];
          const swapWith = direction === 'up' ? index - 1 : index + 1;
          if (swapWith < 0 || swapWith >= next.length) return p;
          [next[index], next[swapWith]] = [next[swapWith], next[index]];
          return { ...p, objects: next };
        }),
      }));
    },
    [updateActiveReport],
  );

  const addObjectToPage = useCallback(
    (object: ReportObject) => {
      updateActiveReport((report) => {
        const page = report.pages.find((p) => p.id === activePageId) ?? report.pages[0];
        const needsSlot =
          page?.layout === 'custom-grid' && !object.slot;
        const slotted: ReportObject = needsSlot
          ? { ...object, slot: nextEmptySlot(page.objects, selectedSlot) }
          : object;
        const withGrid: ReportObject = slotted.grid
          ? slotted
          : {
              ...slotted,
              grid: nextFreeGrid(page?.objects ?? [], slotted.kind),
            };
        return {
          ...report,
          pages: report.pages.map((p) =>
            p.id === (page?.id ?? activePageId)
              ? { ...p, objects: [...p.objects, withGrid] }
              : p,
          ),
          lastUpdated: 'Just now',
        };
      });
      setPanel(null);
      setToast({ message: 'Object added' });
    },
    [updateActiveReport, activePageId, nextEmptySlot, selectedSlot],
  );

  const updateObjectGrids = useCallback(
    (
      pageId: string,
      items: Array<{ id: string; grid: ObjectGrid }>,
      options?: { mergeHeightOnly?: boolean },
    ) => {
      const byId = new Map(items.map((item) => [item.id, item.grid]));
      updateActiveReport((report) => ({
        ...report,
        pages: report.pages.map((p) => {
          if (p.id !== pageId) return p;
          return {
            ...p,
            objects: p.objects.map((object) => {
              const next = byId.get(object.id);
              if (!next) return object;
              if (options?.mergeHeightOnly) {
                const current = object.grid;
                if (!current || next.h <= current.h) return object;
                return { ...object, grid: { ...current, h: next.h } };
              }
              return { ...object, grid: next };
            }),
          };
        }),
      }));
    },
    [updateActiveReport],
  );

  const addPage = useCallback(() => {
    const page: ReportPage = {
      id: uid('page'),
      name: 'New page',
      objects: [],
    };
    updateActiveReport((report) => ({ ...report, pages: [...report.pages, page] }));
    setActivePageId(page.id);
  }, [updateActiveReport]);

  const renamePage = useCallback(
    (pageId: string, name: string) => {
      updateActiveReport((report) => ({
        ...report,
        pages: report.pages.map((p) => (p.id === pageId ? { ...p, name } : p)),
      }));
    },
    [updateActiveReport],
  );

  const removePage = useCallback(
    (pageId: string) => {
      updateActiveReport((report) => {
        const pages = report.pages.filter((p) => p.id !== pageId);
        return { ...report, pages: pages.length ? pages : report.pages };
      });
    },
    [updateActiveReport],
  );

  const duplicatePage = useCallback(
    (pageId: string) => {
      updateActiveReport((report) => {
        const page = report.pages.find((p) => p.id === pageId);
        if (!page) return report;
        const copy = {
          ...structuredClone(page),
          id: uid('page'),
          name: `${page.name} (copy)`,
        };
        return { ...report, pages: [...report.pages, copy] };
      });
    },
    [updateActiveReport],
  );

  const movePage = useCallback(
    (pageId: string, direction: 'up' | 'down') => {
      updateActiveReport((report) => {
        const index = report.pages.findIndex((p) => p.id === pageId);
        if (index < 0) return report;
        const next = [...report.pages];
        const swapWith = direction === 'up' ? index - 1 : index + 1;
        if (swapWith < 0 || swapWith >= next.length) return report;
        [next[index], next[swapWith]] = [next[swapWith], next[index]];
        return { ...report, pages: next };
      });
    },
    [updateActiveReport],
  );

  const runRefresh = useCallback(
    (opts: { preserveNotes: boolean; generateSummary: boolean; notify: boolean }) => {
      setPanel(null);
      setStatusMessage('Checking data…');
      const sequence = [
        'Checking data',
        'Refreshing 12 objects',
        'Preserving manually entered content',
        'Generating change summary',
        'Complete',
      ];
      sequence.forEach((label, index) => {
        window.setTimeout(() => {
          setStatusMessage(label);
          if (index === sequence.length - 1) {
            updateActiveReport((report) => ({
              ...report,
              lastUpdated: 'Just now',
              status: 'Needs review',
              pages: report.pages.map((p) => ({
                ...p,
                objects: p.objects.map((o) =>
                  opts.preserveNotes && o.preserveOnRefresh
                    ? o
                    : o.kind === 'ai-summary'
                      ? {
                          ...o,
                          body: `${o.body ?? ''}\n\nRefresh note: values restated from source data.`,
                        }
                      : o,
                ),
              })),
            }));
            if (opts.notify) {
              const note: NotificationItem = {
                id: uid('n'),
                title: `${activeReport?.name ?? 'Report'} was refreshed.`,
                detail: opts.generateSummary
                  ? '12 objects refreshed · 3 significant changes found'
                  : 'Refresh complete',
                time: 'Just now',
                tone: 'success',
                read: false,
                reportId: activeReport?.id,
              };
              setSnapshot((prev) => ({
                ...prev,
                notifications: [note, ...prev.notifications],
              }));
            }
            setPanel('changes');
            setStatusMessage(null);
            setToast({ message: 'Report updated' });
          }
        }, index * 650);
      });
    },
    [activeReport?.id, activeReport?.name, updateActiveReport],
  );

  const quickRefresh = useCallback(() => {
    const stamp = new Date().toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
    updateActiveReport((report) => ({
      ...report,
      lastUpdated: stamp,
      status: 'Updated',
    }));
    setToast({ message: `Updated ${stamp}` });
  }, [updateActiveReport]);

  const saveSchedule = useCallback(
    (schedule: RefreshSchedule) => {
      updateActiveReport((report) => ({
        ...report,
        schedule,
        status: 'Refresh scheduled',
      }));
      setSnapshot((prev) => ({
        ...prev,
        activities: [
          {
            id: uid('act'),
            text: `${activeReport?.name ?? 'Report'} refresh scheduled · ${schedule.when}`,
            time: 'Just now',
          },
          ...prev.activities,
        ],
      }));
      setPanel(null);
      setToast({ message: 'Schedule created' });
    },
    [activeReport?.name, updateActiveReport],
  );

  const openAutomationEditor = useCallback((automation?: Automation) => {
    if (automation) {
      setAutomationDraft({
        id: automation.id,
        name: automation.name,
        triggerKind: automation.triggerKind,
        team: automation.team ?? demoConfig.teams[0],
        requirements: automation.requirements ?? '',
        templateId: automation.templateId,
        notify: automation.notify,
        requireReview: automation.requireReview,
        enabled: automation.enabled,
        triggerEvent: automation.triggerEvent ?? 'full-time',
        delayMinutes: automation.delayMinutes ?? 30,
      });
    } else {
      setAutomationDraft({
        name: '',
        triggerKind: 'team',
        team: 'Spain',
        requirements: '',
        templateId: 'match-analysis',
        notify: 'both',
        requireReview: false,
        enabled: true,
        triggerEvent: 'full-time',
        delayMinutes: 30,
      });
    }
    setPanel('automation');
  }, []);

  const closeAutomationEditor = useCallback(() => {
    setAutomationDraft(null);
    setPanel(null);
  }, []);

  const updateAutomationDraft = useCallback((patch: Partial<AutomationDraft>) => {
    setAutomationDraft((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const saveAutomation = useCallback(() => {
    if (!automationDraft) return;
    const template = templates.find((t) => t.id === automationDraft.templateId);
    const templateName = template?.name ?? 'Template';
    const name =
      automationDraft.name.trim() ||
      (automationDraft.triggerKind === 'any-match'
        ? `Every match · ${templateName}`
        : automationDraft.triggerKind === 'team'
          ? `${automationDraft.team} match reports`
          : `Custom match · ${templateName}`);

    const next: Automation = {
      id: automationDraft.id ?? uid('auto'),
      name,
      enabled: automationDraft.enabled,
      triggerKind: automationDraft.triggerKind,
      team: automationDraft.triggerKind === 'team' ? automationDraft.team : undefined,
      requirements:
        automationDraft.triggerKind === 'requirements'
          ? automationDraft.requirements.trim() || 'Custom match filter'
          : undefined,
      triggerEvent: automationDraft.triggerEvent,
      delayMinutes: automationDraft.delayMinutes,
      templateId: automationDraft.templateId,
      templateName,
      notify: automationDraft.notify,
      requireReview: automationDraft.requireReview,
      lastRun: automationDraft.id
        ? snapshot.automations.find((a) => a.id === automationDraft.id)?.lastRun
        : undefined,
      lastMatch: automationDraft.id
        ? snapshot.automations.find((a) => a.id === automationDraft.id)?.lastMatch
        : undefined,
      lastReportId: automationDraft.id
        ? snapshot.automations.find((a) => a.id === automationDraft.id)?.lastReportId
        : undefined,
      runsGenerated: automationDraft.id
        ? (snapshot.automations.find((a) => a.id === automationDraft.id)?.runsGenerated ?? 0)
        : 0,
    };

    setSnapshot((prev) => {
      const exists = prev.automations.some((a) => a.id === next.id);
      return {
        ...prev,
        automations: exists
          ? prev.automations.map((a) => (a.id === next.id ? next : a))
          : [next, ...prev.automations],
        activities: [
          {
            id: uid('act'),
            text: exists ? `Updated automation “${next.name}”.` : `Created automation “${next.name}”.`,
            time: 'Just now',
          },
          ...prev.activities,
        ],
      };
    });
    setAutomationDraft(null);
    setPanel(null);
    setToast({ message: automationDraft.id ? 'Automation updated' : 'Automation created' });
  }, [automationDraft, snapshot.automations]);

  const toggleAutomation = useCallback((id: string, enabled: boolean) => {
    setSnapshot((prev) => ({
      ...prev,
      automations: prev.automations.map((a) => (a.id === id ? { ...a, enabled } : a)),
    }));
    setToast({ message: enabled ? 'Automation enabled' : 'Automation paused' });
  }, []);

  const deleteAutomation = useCallback((id: string) => {
    setSnapshot((prev) => ({
      ...prev,
      automations: prev.automations.filter((a) => a.id !== id),
    }));
    setAutomationDraft(null);
    setPanel(null);
    setToast({ message: 'Automation deleted' });
  }, []);

  const simulateFullTime = useCallback((event?: FullTimeEvent) => {
    const ft: FullTimeEvent = event ?? {
      team: 'England',
      matchLabel: 'England 2–1 Colombia',
    };
    const matched = matchingAutomations(snapshot.automations, ft);
    if (!matched.length) {
      setToast({ message: 'No enabled automations match this full-time event' });
      return;
    }
    if (automationTimerRef.current != null) {
      window.clearTimeout(automationTimerRef.current);
    }
    setAutomationPending(true);
    const delayLabel = matched[0]?.delayMinutes ?? 30;
    setToast({
      message: `Full time · generating in ${delayLabel} min (demo: ${DEMO_AUTOMATION_DELAY_MS / 1000}s)`,
    });
    automationTimerRef.current = window.setTimeout(() => {
      const reports = matched.map((automation) => buildAutomatedReport(automation, ft));
      const notifications = matched.map((automation, index) =>
        buildAutomationNotification(automation, reports[index], ft),
      );
      setSnapshot((prev) => ({
        ...prev,
        reports: [...reports, ...prev.reports],
        activeReportId: reports[0]?.id ?? prev.activeReportId,
        notifications: [...notifications, ...prev.notifications],
        automations: prev.automations.map((automation) => {
          const idx = matched.findIndex((m) => m.id === automation.id);
          if (idx < 0) return automation;
          return {
            ...automation,
            lastRun: 'Just now',
            lastMatch: ft.matchLabel,
            lastReportId: reports[idx].id,
            runsGenerated: automation.runsGenerated + 1,
          };
        }),
        activities: [
          {
            id: uid('act'),
            text: `Automation generated ${reports.length} report${reports.length === 1 ? '' : 's'} after ${ft.matchLabel}.`,
            time: 'Just now',
          },
          ...prev.activities,
        ],
      }));
      if (reports[0]) {
        setActivePageId(reports[0].pages[0]?.id ?? 'board');
        setView('workspace');
        setNav('automations');
      }
      setAutomationPending(false);
      automationTimerRef.current = null;
      setToast({
        message: matched.some((a) => a.requireReview)
          ? 'Report ready for review'
          : 'Automated report generated',
        actionLabel: 'Open',
        onAction: () => {
          if (reports[0]) {
            setSnapshot((prev) => ({ ...prev, activeReportId: reports[0].id }));
            setActivePageId(reports[0].pages[0]?.id ?? 'board');
            setView('workspace');
            setNav('reports');
          }
        },
      });
    }, DEMO_AUTOMATION_DELAY_MS);
  }, [snapshot.automations]);

  const openLineage = useCallback((target: LineageTarget) => {
    setLineageTarget(target);
    setPanel('lineage');
  }, []);

  const closeLineage = useCallback(() => {
    setLineageTarget(null);
    setPanel(null);
  }, []);

  const defaultCompare = useCallback(
    (report: ReportRecord): CompareContext => ({
      enabled: false,
      leftTeam: report.team ?? demoConfig.teams[0] ?? 'England',
      rightTeam:
        report.team === 'Spain'
          ? 'England'
          : demoConfig.teams.find((t) => t !== report.team) ?? 'Spain',
      leftPeriod: report.period,
      rightPeriod: report.period,
    }),
    [],
  );

  const toggleCompareMode = useCallback(() => {
    updateActiveReport((report) => {
      const current = report.compare ?? defaultCompare(report);
      return {
        ...report,
        compare: { ...current, enabled: !current.enabled },
      };
    });
  }, [defaultCompare, updateActiveReport]);

  const setCompareContext = useCallback(
    (patch: Partial<CompareContext>) => {
      updateActiveReport((report) => {
        const current = report.compare ?? defaultCompare(report);
        return {
          ...report,
          compare: { ...current, ...patch, enabled: patch.enabled ?? current.enabled },
        };
      });
    },
    [defaultCompare, updateActiveReport],
  );

  const advancePresentPage = useCallback(
    (direction: 1 | -1) => {
      if (!activeReport?.pages.length) return;
      const pages = activeReport.pages;
      const index = Math.max(
        0,
        pages.findIndex((p) => p.id === activePageId),
      );
      const next = pages[(index + direction + pages.length) % pages.length];
      if (next) setActivePageId(next.id);
    },
    [activePageId, activeReport?.pages],
  );

  useEffect(() => {
    if (!presentMode) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPresentMode(false);
        return;
      }
      if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'PageDown') {
        event.preventDefault();
        advancePresentPage(1);
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        advancePresentPage(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [presentMode, advancePresentPage]);

  useEffect(() => {
    return () => {
      if (automationTimerRef.current != null) {
        window.clearTimeout(automationTimerRef.current);
      }
    };
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setSnapshot((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setSnapshot((prev) => ({
      ...prev,
      notifications: prev.notifications.filter((n) => n.id !== id),
    }));
  }, []);

  const shareReport = useCallback(() => {
    updateActiveReport((report) => ({
      ...report,
      sharing: 'Shared with 4',
      status: report.status === 'Draft' ? 'Shared' : report.status,
    }));
    setPanel(null);
    setToast({ message: 'Report shared', actionLabel: 'Undo' });
  }, [updateActiveReport]);

  const exportReport = useCallback(() => {
    setPanel(null);
    setStatusMessage('Export in progress…');
    window.setTimeout(() => {
      setStatusMessage(null);
      setToast({ message: 'Export complete' });
    }, 1200);
  }, []);

  const saveReportAsTemplate = useCallback(
    (input: {
      name: string;
      purpose?: string;
      category?: string;
      editableFields: TemplateEditableField[];
    }) => {
      const report = snapshot.reports.find((r) => r.id === snapshot.activeReportId);
      if (!report) return;
      const name = input.name.trim();
      if (!name) return;

      const objectTitles = report.pages.flatMap((page) =>
        page.objects.map((object) => object.title),
      );
      const template: ReportTemplate = {
        id: uid('tmpl'),
        name,
        purpose:
          input.purpose?.trim() ||
          `Reusable layout saved from “${report.name}”. Editable fields stay open when someone uses this template.`,
        category: input.category?.trim() || 'Custom',
        audience: report.audience || 'Analyst',
        pages: Math.max(1, report.pages.length),
        sections: report.pages.map((page) => page.name),
        requiredData: report.sourceLabels.length
          ? report.sourceLabels
          : ['Connected sources'],
        objects: objectTitles.length ? objectTitles.slice(0, 12) : ['Modular widgets'],
        suggestedPrompts: [...builderSuggestedPrompts],
        refreshBehavior:
          'Refresh bound widgets from match context; preserve fields marked editable.',
        recommended: true,
        editableFields: input.editableFields,
        savedFromReportId: report.id,
      };

      setSavedTemplates((prev) => [template, ...prev.filter((t) => t.id !== template.id)]);
      touchRecentTemplate(template.id);
      setPanel(null);
      setToast({
        message: `Template “${template.name}” saved`,
        actionLabel: 'View templates',
        onAction: () => {
          setView('templates');
          setNav('templates');
        },
      });
    },
    [snapshot.activeReportId, snapshot.reports, touchRecentTemplate],
  );

  const resetDemo = useCallback(() => {
    if (automationTimerRef.current != null) {
      window.clearTimeout(automationTimerRef.current);
      automationTimerRef.current = null;
    }
    setSnapshot(createInitialSnapshot());
    setView('home');
    setNav('home');
    setSetup(null);
    setPreviewTemplateId(null);
    setActivePageId('board');
    setPanel(null);
    setPinPayload(null);
    setLineageTarget(null);
    setAutomationDraft(null);
    setAutomationPending(false);
    setSavedTemplates([]);
    setEditMode(true);
    setPresentMode(false);
    setAiCollapsed(false);
    setToast({ message: 'Application reset' });
  }, []);

  const askAiAboutObject = useCallback(
    (title: string) => {
      setAiCollapsed(false);
      sendPrompt(
        `Explain “${title}” using Women’s World Cup 2023 data on this dashboard and suggest updates.`,
      );
    },
    [sendPrompt],
  );

  const insertAiCreatedObject = useCallback(
    (prompt: string) => {
      sendPrompt(prompt);
      window.setTimeout(() => {
        addObjectToPage({
          id: uid('ai-obj'),
          kind: 'comparison',
          title: 'AI-created comparison',
          body: 'Group-stage vs knockout-stage attacking performance comparison.',
          chartId: 'england-group-knockout',
          pinnedFromAi: true,
        });
      }, 1000);
    },
    [addObjectToPage, sendPrompt],
  );

  const value = useMemo<AppStateValue>(
    () => ({
      view,
      nav,
      snapshot,
      setup,
      previewTemplateId,
      generationStep,
      activePageId,
      aiCollapsed,
      aiWidth,
      chatPlacement,
      sidebarCollapsed,
      editMode,
      presentMode,
      panel,
      pinPayload,
      lineageTarget,
      automationDraft,
      automationPending,
      toast,
      statusMessage,
      templates,
      config: demoConfig,
      suggestedPrompts,
      activeReport,
      unreadCount: snapshot.notifications.filter((n) => !n.read).length,
      affiliatedTeamId,
      exploreTeamId,
      affiliatedTeam,
      exploreTeam,
      isViewingOtherTeam,
      setAffiliatedTeamId,
      setExploreTeamId,
      resetExploreToAffiliation,
      sessionReady,
      onboardingStep,
      userProfile,
      setOnboardingStep,
      updateUserProfile,
      completeOnboarding,
      signOut,
      setView,
      setNav: (next) => {
        setNav(next);
        if (next === 'templates') setView('templates');
        else if (next === 'home') setView('home');
        else if (next === 'reports') setView('reports');
        else setView(next);
      },
      openHome,
      openTemplates,
      openCreateReport,
      createPreset,
      clearCreatePreset,
      openWorkspace,
      openMatchDashboard,
      setPreviewTemplate: setPreviewTemplateId,
      startSetup,
      updateSetup,
      createReportFromSetup,
      setActiveReport,
      setActivePage: setActivePageId,
      setAiCollapsed,
      setAiWidth,
      setChatPlacement,
      setSidebarCollapsed,
      setEditMode,
      setPresentMode,
      advancePresentPage,
      setPanel,
      openLineage,
      closeLineage,
      toggleCompareMode,
      setCompareContext,
      setToast,
      sendPrompt,
      pinToPage,
      setPinPayload,
      addContext,
      removeContext,
      updateObject,
      removeObject,
      duplicateObject,
      moveObject,
      addObjectToPage,
      addPage,
      renamePage,
      removePage,
      duplicatePage,
      movePage,
      runRefresh,
      quickRefresh,
      saveSchedule,
      openAutomationEditor,
      closeAutomationEditor,
      updateAutomationDraft,
      saveAutomation,
      toggleAutomation,
      deleteAutomation,
      simulateFullTime,
      markNotificationRead,
      dismissNotification,
      shareReport,
      exportReport,
      saveReportAsTemplate,
      resetDemo,
      askAiAboutObject,
      insertAiCreatedObject,
      startCustomBuild,
      startBlankBuild,
      updateMatchContext,
      finishCustomAiBuild,
      cancelCustomAiBuild,
      saveReport,
      recentTemplateIds,
      touchRecentTemplate,
      renameReport,
      setReportTags,
      selectedSlot,
      setSelectedSlot,
      builderTourStep,
      setBuilderTourStep,
      builderTourOpen,
      setBuilderTourOpen,
      swapObjectSlots,
      addChartProposalToReport,
      builderSuggestedPrompts,
      updateObjectGrids,
    }),
    [
      view,
      nav,
      snapshot,
      setup,
      previewTemplateId,
      generationStep,
      activePageId,
      aiCollapsed,
      aiWidth,
      chatPlacement,
      sidebarCollapsed,
      editMode,
      presentMode,
      panel,
      pinPayload,
      lineageTarget,
      automationDraft,
      automationPending,
      toast,
      statusMessage,
      activeReport,
      affiliatedTeamId,
      exploreTeamId,
      affiliatedTeam,
      exploreTeam,
      isViewingOtherTeam,
      setAffiliatedTeamId,
      setExploreTeamId,
      resetExploreToAffiliation,
      sessionReady,
      onboardingStep,
      userProfile,
      updateUserProfile,
      completeOnboarding,
      signOut,
      openHome,
      openTemplates,
      openCreateReport,
      createPreset,
      clearCreatePreset,
      openWorkspace,
      openMatchDashboard,
      startSetup,
      updateSetup,
      createReportFromSetup,
      setActiveReport,
      sendPrompt,
      pinToPage,
      openLineage,
      closeLineage,
      toggleCompareMode,
      setCompareContext,
      advancePresentPage,
      addContext,
      removeContext,
      updateObject,
      removeObject,
      duplicateObject,
      moveObject,
      addObjectToPage,
      addPage,
      renamePage,
      removePage,
      duplicatePage,
      movePage,
      runRefresh,
      quickRefresh,
      saveSchedule,
      openAutomationEditor,
      closeAutomationEditor,
      updateAutomationDraft,
      saveAutomation,
      toggleAutomation,
      deleteAutomation,
      simulateFullTime,
      markNotificationRead,
      dismissNotification,
      shareReport,
      exportReport,
      saveReportAsTemplate,
      resetDemo,
      askAiAboutObject,
      insertAiCreatedObject,
      startCustomBuild,
      startBlankBuild,
      updateMatchContext,
      finishCustomAiBuild,
      cancelCustomAiBuild,
      saveReport,
      recentTemplateIds,
      touchRecentTemplate,
      renameReport,
      setReportTags,
      selectedSlot,
      builderTourStep,
      builderTourOpen,
      swapObjectSlots,
      addChartProposalToReport,
      updateObjectGrids,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
