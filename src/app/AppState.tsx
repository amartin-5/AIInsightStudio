import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { resolveAiResponse, suggestedPrompts } from '../demos/wwc2023/aiResponses';
import { demoConfig } from '../demos/wwc2023/config';
import { createInitialSnapshot } from '../demos/wwc2023/initialState';
import { templates } from '../demos/wwc2023/templates';
import type {
  ChatMessage,
  ContextItem,
  DemoSnapshot,
  NavId,
  NotificationItem,
  RefreshSchedule,
  ReportObject,
  ReportPage,
  ReportRecord,
  ViewMode,
} from '../product/types';

export type SetupDraft = {
  templateId: string;
  name: string;
  sources: string[];
  team: string;
  period: string;
  audience: string;
};

export type ToastState = { message: string; actionLabel?: string; onAction?: () => void } | null;

export type PanelKind =
  | null
  | 'notifications'
  | 'share'
  | 'export'
  | 'refresh'
  | 'schedule'
  | 'context'
  | 'changes'
  | 'add-object'
  | 'pin'
  | 'template-preview'
  | 'reset';

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
  editMode: boolean;
  presentMode: boolean;
  panel: PanelKind;
  pinPayload: { title: string; body: string } | null;
  toast: ToastState;
  statusMessage: string | null;
  templates: typeof templates;
  config: typeof demoConfig;
  suggestedPrompts: string[];
  activeReport: ReportRecord | undefined;
  unreadCount: number;
  setView: (view: ViewMode) => void;
  setNav: (nav: NavId) => void;
  openHome: () => void;
  openTemplates: () => void;
  openWorkspace: (reportId?: string) => void;
  setPreviewTemplate: (id: string | null) => void;
  startSetup: (templateId: string) => void;
  updateSetup: (patch: Partial<SetupDraft>) => void;
  createReportFromSetup: () => void;
  setActiveReport: (id: string) => void;
  setActivePage: (id: string) => void;
  setAiCollapsed: (v: boolean) => void;
  setAiWidth: (v: number) => void;
  setEditMode: (v: boolean) => void;
  setPresentMode: (v: boolean) => void;
  setPanel: (panel: PanelKind) => void;
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
  saveSchedule: (schedule: RefreshSchedule) => void;
  markNotificationRead: (id: string) => void;
  dismissNotification: (id: string) => void;
  shareReport: () => void;
  exportReport: () => void;
  resetDemo: () => void;
  askAiAboutObject: (title: string) => void;
  insertAiCreatedObject: (prompt: string) => void;
};

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
  const [activePageId, setActivePageId] = useState('exec');
  const [aiCollapsed, setAiCollapsed] = useState(false);
  const [aiWidth, setAiWidth] = useState(320);
  const [editMode, setEditMode] = useState(true);
  const [presentMode, setPresentMode] = useState(false);
  const [panel, setPanel] = useState<PanelKind>(null);
  const [pinPayload, setPinPayload] = useState<{ title: string; body: string } | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const activeReport = snapshot.reports.find((r) => r.id === snapshot.activeReportId);

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

  const openWorkspace = useCallback((reportId?: string) => {
    setSnapshot((prev) => ({
      ...prev,
      activeReportId: reportId ?? prev.activeReportId,
    }));
    setView('workspace');
    setNav('reports');
    setActivePageId((current) => current || 'exec');
  }, []);

  const startSetup = useCallback((templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    setSetup({
      templateId,
      name:
        templateId === 'opponent-analysis'
          ? 'England opponent analysis'
          : `${template?.name ?? 'New'} report`,
      sources: demoConfig.dataSources.map((s) => s.id),
      team: 'England',
      period: 'Entire tournament',
      audience: 'Analyst',
    });
    setPreviewTemplateId(null);
    setView('setup');
  }, []);

  const updateSetup = useCallback((patch: Partial<SetupDraft>) => {
    setSetup((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const createReportFromSetup = useCallback(() => {
    if (!setup) return;
    setView('generating');
    setGenerationStep(0);
    const steps = [0, 1, 2, 3, 4];
    steps.forEach((step, index) => {
      window.setTimeout(() => {
        setGenerationStep(step);
        if (step === 4) {
          const template = templates.find((t) => t.id === setup.templateId);
          const base = createInitialSnapshot().reports.find((r) => r.id === 'england-opponent');
          const newReport: ReportRecord = {
            ...(base ?? createInitialSnapshot().reports[1]),
            id: uid('report'),
            name: setup.name,
            templateId: setup.templateId,
            templateType: template?.name ?? 'Report',
            team: setup.team,
            period: setup.period,
            audience: setup.audience,
            lastUpdated: 'Just now',
            status: 'Updated',
            owner: 'You',
            sharing: 'Private',
            chat: [],
            schedule: null,
            demoSources: demoConfig.dataSources
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
          setActivePageId(newReport.pages[0]?.id ?? 'exec');
          setSetup(null);
          setView('workspace');
          setNav('reports');
          setToast({ message: 'Report ready' });
        }
      }, index * 700);
    });
  }, [setup]);

  const setActiveReport = useCallback((id: string) => {
    setSnapshot((prev) => ({ ...prev, activeReportId: id }));
    const report = snapshot.reports.find((r) => r.id === id);
    setActivePageId(report?.pages[0]?.id ?? 'exec');
    setView('workspace');
    setNav('reports');
  }, [snapshot.reports]);

  const sendPrompt = useCallback(
    (prompt: string) => {
      const userMsg: ChatMessage = { id: uid('u'), role: 'user', content: prompt };
      const pending: ChatMessage = {
        id: uid('a'),
        role: 'assistant',
        content: 'Working…',
        pending: true,
      };
      updateActiveReport((report) => ({
        ...report,
        chat: [...report.chat, userMsg, pending],
      }));
      window.setTimeout(() => {
        const answer = resolveAiResponse(prompt);
        updateActiveReport((report) => ({
          ...report,
          chat: report.chat.map((m) =>
            m.id === pending.id
              ? {
                  ...m,
                  pending: false,
                  content: answer.content,
                  sources: answer.sources,
                }
              : m,
          ),
        }));
      }, 900);
    },
    [updateActiveReport],
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
      updateActiveReport((report) => ({
        ...report,
        pages: report.pages.map((p) =>
          p.id === activePageId ? { ...p, objects: [...p.objects, object] } : p,
        ),
      }));
      setPanel(null);
      setToast({ message: 'Object added' });
    },
    [updateActiveReport, activePageId],
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
                          body: `${o.body ?? ''}\n\nRefresh note (simulated): values restated from demo data.`,
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

  const saveSchedule = useCallback(
    (schedule: RefreshSchedule) => {
      updateActiveReport((report) => ({
        ...report,
        schedule,
        status: 'Refresh scheduled',
      }));
      setSnapshot((prev) => ({
        ...prev,
        scheduled: [
          {
            id: schedule.id,
            text: `${activeReport?.name ?? 'Report'} · ${schedule.cadence} · ${schedule.when}`,
            when: schedule.when,
          },
          ...prev.scheduled,
        ],
      }));
      setPanel(null);
      setToast({ message: 'Schedule created' });
    },
    [activeReport?.name, updateActiveReport],
  );

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
      setToast({ message: 'Export complete (simulated)' });
    }, 1200);
  }, []);

  const resetDemo = useCallback(() => {
    setSnapshot(createInitialSnapshot());
    setView('home');
    setNav('home');
    setSetup(null);
    setPreviewTemplateId(null);
    setActivePageId('exec');
    setPanel(null);
    setPinPayload(null);
    setEditMode(true);
    setPresentMode(false);
    setAiCollapsed(false);
    setToast({ message: 'Demo reset' });
  }, []);

  const askAiAboutObject = useCallback(
    (title: string) => {
      setAiCollapsed(false);
      sendPrompt(`Explain and suggest updates for “${title}”.`);
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
          body: 'Simulated object: group-stage vs knockout-stage attacking performance comparison.',
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
      editMode,
      presentMode,
      panel,
      pinPayload,
      toast,
      statusMessage,
      templates,
      config: demoConfig,
      suggestedPrompts,
      activeReport,
      unreadCount: snapshot.notifications.filter((n) => !n.read).length,
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
      openWorkspace,
      setPreviewTemplate: setPreviewTemplateId,
      startSetup,
      updateSetup,
      createReportFromSetup,
      setActiveReport,
      setActivePage: setActivePageId,
      setAiCollapsed,
      setAiWidth,
      setEditMode,
      setPresentMode,
      setPanel,
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
      saveSchedule,
      markNotificationRead,
      dismissNotification,
      shareReport,
      exportReport,
      resetDemo,
      askAiAboutObject,
      insertAiCreatedObject,
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
      editMode,
      presentMode,
      panel,
      pinPayload,
      toast,
      statusMessage,
      activeReport,
      openHome,
      openTemplates,
      openWorkspace,
      startSetup,
      updateSetup,
      createReportFromSetup,
      setActiveReport,
      sendPrompt,
      pinToPage,
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
      saveSchedule,
      markNotificationRead,
      dismissNotification,
      shareReport,
      exportReport,
      resetDemo,
      askAiAboutObject,
      insertAiCreatedObject,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
