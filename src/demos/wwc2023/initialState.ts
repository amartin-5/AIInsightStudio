import type { DemoSnapshot, ReportRecord } from '../../product/types';
import {
  buildAustraliaPages,
  buildEnglandPages,
  buildPlayerComparisonPages,
  buildSpainPages,
} from './dataset';

function englandReport(): ReportRecord {
  return {
    id: 'england-opponent',
    name: 'England opponent analysis',
    templateId: 'opponent-analysis',
    templateType: 'Opponent analysis',
    lastUpdated: '12 minutes ago',
    status: 'Updated',
    owner: 'You',
    sharing: 'Shared with 3',
    team: 'England',
    period: 'Entire tournament',
    audience: 'Analyst',
    demoSources: [
      'Women’s World Cup 2023 match data',
      'Team performance data',
      'Player performance data',
      'Match events',
      'Lineups and formations',
      'Analyst notes',
    ],
    context: [
      { id: 'c1', label: 'Women’s World Cup 2023 match data', kind: 'data' },
      { id: 'c2', label: 'England team performance', kind: 'data' },
      { id: 'c3', label: 'Match events', kind: 'data' },
      { id: 'c4', label: 'Lineups and formations', kind: 'data' },
      { id: 'c5', label: 'Analyst notes', kind: 'note' },
      { id: 'c6', label: 'Current report objects', kind: 'object' },
    ],
    chat: [],
    schedule: null,
    pages: buildEnglandPages(),
  };
}

function australiaReport(): ReportRecord {
  return {
    id: 'australia-overview',
    name: 'Australia tournament overview',
    templateId: 'tournament-overview',
    templateType: 'Tournament overview',
    lastUpdated: 'Yesterday',
    status: 'Refresh scheduled',
    owner: 'You',
    sharing: 'Private',
    team: 'Australia',
    period: 'Entire tournament',
    audience: 'Executive',
    demoSources: ['Women’s World Cup 2023 match data', 'Team performance data'],
    context: [
      { id: 'a1', label: 'Women’s World Cup 2023 match data', kind: 'data' },
      { id: 'a2', label: 'Australia team performance', kind: 'data' },
      { id: 'a3', label: 'Current report objects', kind: 'object' },
    ],
    chat: [],
    schedule: {
      id: 'sch-aus',
      cadence: 'Daily',
      when: 'Tomorrow at 8:00 AM',
      aiPrompt: 'Summarize significant changes and update the executive summary.',
      notify: 'both',
      requireReview: false,
    },
    pages: buildAustraliaPages(),
  };
}

function spainReport(): ReportRecord {
  return {
    id: 'spain-performance',
    name: 'Spain performance report',
    templateId: 'team-performance',
    templateType: 'Team performance',
    lastUpdated: '2 days ago',
    status: 'Shared',
    owner: 'A. Patel',
    sharing: 'Shared with team',
    team: 'Spain',
    period: 'Entire tournament',
    audience: 'Analyst',
    demoSources: ['Women’s World Cup 2023 match data', 'Team performance data'],
    context: [
      { id: 's1', label: 'Spain team performance', kind: 'data' },
      { id: 's2', label: 'Match events', kind: 'data' },
    ],
    chat: [],
    schedule: null,
    pages: buildSpainPages(),
  };
}

function playerCompareReport(): ReportRecord {
  return {
    id: 'player-comparison',
    name: 'Player comparison',
    templateId: 'player-comparison',
    templateType: 'Player comparison',
    lastUpdated: '3 days ago',
    status: 'Draft',
    owner: 'You',
    sharing: 'Private',
    period: 'Entire tournament',
    audience: 'Analyst',
    demoSources: ['Player performance data'],
    context: [{ id: 'pc1', label: 'Player performance data', kind: 'data' }],
    chat: [],
    schedule: null,
    pages: buildPlayerComparisonPages(),
  };
}

function knockoutReport(): ReportRecord {
  return {
    id: 'knockout-summary',
    name: 'Knockout stage summary',
    templateId: 'tournament-overview',
    templateType: 'Tournament overview',
    lastUpdated: '4 days ago',
    status: 'Needs review',
    owner: 'You',
    sharing: 'Shared with 1',
    period: 'Knockout stage',
    audience: 'General audience',
    demoSources: ['Women’s World Cup 2023 match data'],
    context: [{ id: 'k1', label: 'Women’s World Cup 2023 match data', kind: 'data' }],
    chat: [],
    schedule: {
      id: 'sch-ko',
      cadence: 'When new data is available',
      when: 'When new data is available',
      aiPrompt: 'Summarize knockout-stage changes.',
      notify: 'in-app',
      requireReview: true,
    },
    pages: [
      {
        id: 'ko-1',
        name: 'Summary',
        objects: [
          {
            id: 'ko-ai',
            kind: 'ai-summary',
            title: 'Knockout stage summary',
            body: 'Simulated: knockout matches featured lower chance quality and tighter defensive spacing across several teams.',
          },
        ],
      },
    ],
  };
}

export function createInitialSnapshot(): DemoSnapshot {
  return {
    reports: [
      australiaReport(),
      englandReport(),
      spainReport(),
      playerCompareReport(),
      knockoutReport(),
    ],
    activeReportId: 'england-opponent',
    notifications: [
      {
        id: 'n1',
        title: 'England opponent analysis was refreshed.',
        detail: '12 objects refreshed with simulated demo data.',
        time: '12 min ago',
        tone: 'success',
        read: false,
        reportId: 'england-opponent',
      },
      {
        id: 'n2',
        title: 'Three significant changes were found.',
        detail: 'Review chance quality and knockout-stage trends.',
        time: '12 min ago',
        tone: 'warning',
        read: false,
        reportId: 'england-opponent',
      },
      {
        id: 'n3',
        title: 'New demo data is available.',
        detail: 'Women’s World Cup 2023 match data updated (simulated).',
        time: '1 hr ago',
        tone: 'info',
        read: true,
      },
      {
        id: 'n4',
        title: 'Australia tournament overview is ready for review.',
        detail: 'Scheduled refresh completed.',
        time: 'Yesterday',
        tone: 'info',
        read: true,
        reportId: 'australia-overview',
      },
      {
        id: 'n5',
        title: 'A scheduled report was shared.',
        detail: 'Knockout stage summary shared for comment.',
        time: '2 days ago',
        tone: 'info',
        read: true,
        reportId: 'knockout-summary',
      },
      {
        id: 'n6',
        title: 'One report object could not be refreshed.',
        detail: 'Spatial visualization remains a placeholder.',
        time: '2 days ago',
        tone: 'error',
        read: false,
        reportId: 'england-opponent',
      },
    ],
    activities: [
      { id: 'act1', text: 'England opponent analysis was refreshed.', time: '12 min ago' },
      { id: 'act2', text: 'A. Patel shared Spain performance report.', time: 'Yesterday' },
      { id: 'act3', text: 'Scheduled Australia tournament overview completed.', time: 'Yesterday' },
      { id: 'act4', text: 'New source data became available (demo).', time: '1 hr ago' },
    ],
    scheduled: [
      {
        id: 'sa1',
        text: 'Australia tournament overview refreshes tomorrow at 8:00 AM',
        when: 'Tomorrow · 8:00 AM',
      },
      {
        id: 'sa2',
        text: 'Knockout stage summary refreshes when new data is available',
        when: 'On new data',
      },
      {
        id: 'sa3',
        text: 'Weekly performance email sends Monday at 9:00 AM',
        when: 'Monday · 9:00 AM',
      },
    ],
  };
}
