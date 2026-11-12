/** Women’s World Cup 2023 scenario values for Insight Studio. */

export const englandKpis = [
  { id: 'matches', title: 'Matches played', value: '7', hint: 'Group + knockout' },
  { id: 'wins', title: 'Wins', value: '5', hint: '1 draw · 1 loss' },
  { id: 'goals', title: 'Goals', value: '13', hint: 'Tournament total' },
  { id: 'conceded', title: 'Goals conceded', value: '4', hint: 'Tournament total' },
  { id: 'xg', title: 'Expected goals', value: '11.8', hint: 'xG model' },
  { id: 'poss', title: 'Possession', value: '54%', hint: 'Tournament average' },
  { id: 'shots', title: 'Shots / match', value: '14.2', hint: 'Average' },
  { id: 'pass', title: 'Passing accuracy', value: '86%', hint: 'Tournament average' },
];

/** Final match strip — Shape / Possession / xG / Shots / PPDA */
export const finalMatchKpis = [
  { id: 'shape', title: 'Shape', value: '4-3-3', hint: 'Base formation' },
  { id: 'poss', title: 'Possession', value: '48%', hint: 'vs Spain 52%' },
  { id: 'xg', title: 'xG', value: '0.9', hint: 'Spain 1.8' },
  { id: 'shots', title: 'Shots / on target', value: '9 / 3', hint: 'Spain 16 / 7' },
  { id: 'ppda', title: 'PPDA', value: '11.2', hint: 'Press intensity' },
];

export type MatchSourceRow = {
  id: string;
  opponent: string;
  stage: string;
  result: string;
  goals: string;
  possession: string;
  shots: string;
  xg: string;
  note: string;
};

/** Canonical match-level rows for lineage drill-down. */
export const englandMatches: MatchSourceRow[] = [
  {
    id: 'eng-haiti',
    opponent: 'Haiti',
    stage: 'Group',
    result: 'W 1–0',
    goals: '1',
    possession: '58%',
    shots: '12',
    xg: '1.4',
    note: 'Controlled opener with limited chance volume.',
  },
  {
    id: 'eng-denmark',
    opponent: 'Denmark',
    stage: 'Group',
    result: 'W 1–0',
    goals: '1',
    possession: '55%',
    shots: '11',
    xg: '1.1',
    note: 'Compact defensive block; efficient finishing.',
  },
  {
    id: 'eng-china',
    opponent: 'China PR',
    stage: 'Group',
    result: 'W 6–1',
    goals: '6',
    possession: '61%',
    shots: '22',
    xg: '3.4',
    note: 'Peak attacking output in the group stage.',
  },
  {
    id: 'eng-nigeria',
    opponent: 'Nigeria',
    stage: 'R16',
    result: 'W 0–0 (4–2 P)',
    goals: '0',
    possession: '57%',
    shots: '15',
    xg: '1.6',
    note: 'Chance quality dipped; progressed on penalties.',
  },
  {
    id: 'eng-colombia',
    opponent: 'Colombia',
    stage: 'QF',
    result: 'W 2–1',
    goals: '2',
    possession: '52%',
    shots: '13',
    xg: '1.8',
    note: 'Adjusted shape mid-game after early pressure.',
  },
  {
    id: 'eng-australia',
    opponent: 'Australia',
    stage: 'SF',
    result: 'W 3–1',
    goals: '3',
    possession: '49%',
    shots: '14',
    xg: '2.1',
    note: 'Transition threat created decisive advantages.',
  },
  {
    id: 'eng-spain',
    opponent: 'Spain',
    stage: 'Final',
    result: 'L 0–1',
    goals: '0',
    possession: '48%',
    shots: '9',
    xg: '0.9',
    note: 'Lower shot quality; limited final-third entries.',
  },
];

export const MATCH_SOURCE_COLUMNS = [
  'Opponent',
  'Stage',
  'Result',
  'Goals',
  'Poss.',
  'Shots',
  'xG',
  'Note',
];

export function matchRowsForRefs(refs?: string[]): MatchSourceRow[] {
  if (!refs?.length) return englandMatches;
  const set = new Set(refs);
  const filtered = englandMatches.filter((row) => set.has(row.id));
  return filtered.length ? filtered : englandMatches;
}

export const englandPlayers = [
  {
    id: 'p1',
    label: 'Player A',
    position: 'Forward',
    matches: '7',
    minutes: '612',
    metric: '5 goals',
    observation: 'Primary finishing outlet in open play.',
  },
  {
    id: 'p2',
    label: 'Player B',
    position: 'Midfielder',
    matches: '7',
    minutes: '630',
    metric: '87% pass',
    observation: 'Stabilized buildup under pressure.',
  },
  {
    id: 'p3',
    label: 'Player C',
    position: 'Defender',
    matches: '6',
    minutes: '540',
    metric: '18 recoveries',
    observation: 'Key in defensive rest shape.',
  },
  {
    id: 'p4',
    label: 'Player D',
    position: 'Forward',
    matches: '7',
    minutes: '498',
    metric: '3 assists',
    observation: 'Created width in attacking channels.',
  },
];

export const aiOverview =
  'England demonstrated a structured, adaptable approach throughout the tournament, with controlled buildup, strong defensive organization, and the ability to adjust shape across different opponents. The report highlights where England created consistent advantages, where attacking output became less efficient, and which patterns may be most relevant for future opposition planning.';

export const analystNoteSample =
  'Manual note: Review first-half pressing triggers against mid-block opponents. Preserve this note during refreshes.';

export function buildEnglandPages() {
  return [
    {
      id: 'board',
      name: 'Opponent board',
      layout: 'opponent-board' as const,
      objects: [
        {
          id: 'board-score',
          kind: 'scoreboard' as const,
          title: 'Spain vs England',
          homeTeam: 'England',
          awayTeam: 'Spain',
          homeScore: 0,
          awayScore: 1,
          matchStatus: 'FT',
          matchMeta: 'Final · Sydney · Full match',
          slot: 'header' as const,
        },
        {
          id: 'board-kpis',
          kind: 'kpi-row' as const,
          title: 'Match metrics',
          metricHint: 'final-match',
          sourceRefs: ['eng-spain'],
          slot: 'metrics' as const,
        },
        {
          id: 'board-ins-1',
          kind: 'ai-summary' as const,
          title: 'What changed',
          body: 'Chance quality dropped in the second half while Spain’s progressive carries into the box increased.',
          slot: 'insight' as const,
        },
        {
          id: 'board-ins-2',
          kind: 'ai-summary' as const,
          title: 'Pressing',
          body: 'PPDA rose after 60′ — England’s mid-block sat deeper and Spain found half-space switches.',
          slot: 'insight' as const,
        },
        {
          id: 'board-ins-3',
          kind: 'ai-summary' as const,
          title: 'Set pieces',
          body: 'England’s clearest looks came from dead-ball delivery; open-play xG stayed below 0.5.',
          slot: 'insight' as const,
        },
        {
          id: 'board-form',
          kind: 'chart' as const,
          title: 'Form guide',
          chartId: 'england-spain-form',
          sourceRefs: ['eng-spain'],
          slot: 'insight' as const,
        },
        {
          id: 'board-pitch',
          kind: 'spatial' as const,
          title: 'Lineup & formation',
          chartId: 'england-pitch',
          slot: 'chart-a' as const,
        },
        {
          id: 'board-shots',
          kind: 'chart' as const,
          title: 'Shot map',
          chartId: 'england-spain-shot-map',
          sourceRefs: ['eng-spain'],
          slot: 'chart-b' as const,
        },
        {
          id: 'board-xg',
          kind: 'chart' as const,
          title: 'xG timeline',
          chartId: 'england-spain-momentum',
          sourceRefs: ['eng-spain'],
          slot: 'chart-c' as const,
        },
        {
          id: 'board-passes',
          kind: 'spatial' as const,
          title: 'Pass network',
          chartId: 'england-final-passes',
          sourceRefs: ['eng-spain'],
          slot: 'notes' as const,
        },
        {
          id: 'board-donut',
          kind: 'chart' as const,
          title: 'Shot outcomes',
          chartId: 'england-shot-donut',
          sourceRefs: ['eng-spain'],
          slot: 'media' as const,
        },
        {
          id: 'board-events',
          kind: 'event-list' as const,
          title: 'Key events',
          slot: 'events' as const,
          events: [
            { id: 'be1', minute: "29'", text: 'Yellow card — England midfielder', tone: 'card' as const },
            { id: 'be2', minute: "70'", text: 'Substitution — England introduce width', tone: 'sub' as const },
            { id: 'be3', minute: "86'", text: 'Goal — Spain convert late chance', tone: 'goal' as const },
            { id: 'be4', minute: "90+3'", text: 'Final whistle — Spain 1–0 England', tone: 'neutral' as const },
          ],
        },
        {
          id: 'board-stats',
          kind: 'chart' as const,
          title: 'Team stats',
          chartId: 'england-spain-team-stats',
          sourceRefs: ['eng-spain'],
          slot: 'main' as const,
        },
        {
          id: 'board-zones',
          kind: 'chart' as const,
          title: 'Activity zones',
          chartId: 'england-spain-zones',
          sourceRefs: ['eng-spain'],
          slot: 'side' as const,
        },
        {
          id: 'board-factors',
          kind: 'chart' as const,
          title: 'Possession & factors',
          chartId: 'england-spain-factors',
          sourceRefs: ['eng-spain'],
          slot: 'slot-1' as const,
        },
        {
          id: 'board-players',
          kind: 'chart' as const,
          title: 'Player spotlights',
          chartId: 'england-key-players',
          sourceRefs: ['eng-spain'],
          slot: 'slot-2' as const,
        },
        {
          id: 'board-replay',
          kind: 'video' as const,
          title: 'AI tactical replay',
          body: 'Key moments · Final third & late goal sequence',
          metricHint: '3:48',
          slot: 'slot-3' as const,
        },
      ],
    },
    {
      id: 'review',
      name: 'Match review',
      layout: 'match-review' as const,
      objects: [
        {
          id: 'review-score',
          kind: 'scoreboard' as const,
          title: 'England vs Spain',
          homeTeam: 'England',
          awayTeam: 'Spain',
          homeScore: 0,
          awayScore: 1,
          matchStatus: 'FT',
          matchMeta: 'Final · Sydney · 20 Aug 2023',
          slot: 'header' as const,
        },
        {
          id: 'review-video',
          kind: 'video' as const,
          title: 'Tactical replay',
          body: 'AI-selected sequences · Final third transitions',
          metricHint: '4:12',
          slot: 'media' as const,
        },
        {
          id: 'review-events',
          kind: 'event-list' as const,
          title: 'Key events',
          slot: 'events' as const,
          events: [
            { id: 're1', minute: "29'", text: 'Yellow card — England midfielder', tone: 'card' as const },
            { id: 're2', minute: "70'", text: 'Substitution — England introduce width', tone: 'sub' as const },
            { id: 're3', minute: "86'", text: 'Goal — Spain convert late chance', tone: 'goal' as const },
            { id: 're4', minute: "90+3'", text: 'Final whistle — Spain 1–0 England', tone: 'neutral' as const },
          ],
        },
        {
          id: 'review-pitch',
          kind: 'spatial' as const,
          title: 'Average positions',
          chartId: 'england-pitch',
          slot: 'side' as const,
        },
        {
          id: 'review-momentum',
          kind: 'chart' as const,
          title: 'Match momentum',
          chartId: 'england-spain-momentum',
          slot: 'chart-a' as const,
        },
        {
          id: 'review-passes',
          kind: 'chart' as const,
          title: 'Pass network',
          chartId: 'england-final-passes',
          slot: 'chart-b' as const,
        },
        {
          id: 'review-shots',
          kind: 'chart' as const,
          title: 'Shot outcomes',
          chartId: 'england-shot-donut',
          slot: 'chart-c' as const,
        },
      ],
    },
    {
      id: 'tournament',
      name: 'Tournament',
      layout: 'summary-dashboard' as const,
      objects: [
        {
          id: 'tour-ai',
          kind: 'ai-summary' as const,
          title: 'Tournament summary',
          body: aiOverview,
          slot: 'insight' as const,
        },
        {
          id: 'tour-kpis',
          kind: 'kpi-row' as const,
          title: 'Key metrics',
          sourceRefs: [
            'eng-haiti',
            'eng-denmark',
            'eng-china',
            'eng-nigeria',
            'eng-colombia',
            'eng-australia',
            'eng-spain',
          ],
          slot: 'metrics' as const,
        },
        {
          id: 'tour-radar',
          kind: 'chart' as const,
          title: 'Performance profile',
          chartId: 'england-radar',
          sourceRefs: [
            'eng-haiti',
            'eng-denmark',
            'eng-china',
            'eng-nigeria',
            'eng-colombia',
            'eng-australia',
            'eng-spain',
          ],
          slot: 'main' as const,
        },
        {
          id: 'tour-goals',
          kind: 'chart' as const,
          title: 'Goals by match',
          chartId: 'england-goals-bar',
          sourceRefs: [
            'eng-haiti',
            'eng-denmark',
            'eng-china',
            'eng-nigeria',
            'eng-colombia',
            'eng-australia',
            'eng-spain',
          ],
          slot: 'chart-a' as const,
        },
        {
          id: 'tour-poss',
          kind: 'chart' as const,
          title: 'Possession trend',
          chartId: 'england-possession-line',
          sourceRefs: [
            'eng-haiti',
            'eng-denmark',
            'eng-china',
            'eng-nigeria',
            'eng-colombia',
            'eng-australia',
            'eng-spain',
          ],
          slot: 'chart-b' as const,
        },
        {
          id: 'tour-note',
          kind: 'analyst-note' as const,
          title: 'Analyst notes',
          body: analystNoteSample,
          preserveOnRefresh: true,
          slot: 'notes' as const,
        },
      ],
    },
  ];
}

export function buildAustraliaPages() {
  return [
    {
      id: 'summary',
      name: 'Tournament summary',
      layout: 'summary-dashboard' as const,
      objects: [
        {
          id: 'aus-ai',
          kind: 'ai-summary' as const,
          title: 'AI-generated overview',
          body: 'Australia showed strong home-tournament intensity, progressive attacking width, and late-tournament fatigue indicators.',
          slot: 'insight' as const,
        },
        {
          id: 'aus-kpis',
          kind: 'kpi-row' as const,
          title: 'Key metrics',
          slot: 'metrics' as const,
        },
        {
          id: 'aus-goals',
          kind: 'chart' as const,
          title: 'Goals by match',
          chartId: 'australia-goals-bar',
          slot: 'main' as const,
        },
        {
          id: 'aus-note',
          kind: 'text' as const,
          title: 'Tournament arc',
          body: 'Peak efficiency vs Canada; transition vulnerability exposed in the semi-final against England.',
          slot: 'notes' as const,
        },
      ],
    },
    {
      id: 'progress',
      name: 'Match progression',
      layout: 'analytics-split' as const,
      objects: [
        {
          id: 'aus-table',
          kind: 'table' as const,
          title: 'Match progression',
          columns: ['Opponent', 'Stage', 'Result', 'Observation'],
          rows: [
            ['Ireland', 'Group', 'W 1–0', 'Controlled opener.'],
            ['Nigeria', 'Group', 'D 3–2', 'Open transitional game.'],
            ['Canada', 'Group', 'W 4–0', 'Peak attacking efficiency.'],
            ['Denmark', 'R16', 'W 2–0', 'Structured mid-block break.'],
            ['France', 'QF', 'W 0–0 (7–6 P)', 'Low chance volume; progressed.'],
            ['England', 'SF', 'L 1–3', 'Transition vulnerability exposed.'],
          ],
          slot: 'main' as const,
        },
        {
          id: 'aus-players-side',
          kind: 'player-list' as const,
          title: 'Key players',
          slot: 'metrics' as const,
        },
      ],
    },
    {
      id: 'players',
      name: 'Key players',
      objects: [
        {
          id: 'aus-players',
          kind: 'player-list' as const,
          title: 'Key players',
        },
      ],
    },
  ];
}

export function buildSpainPages() {
  return [
    {
      id: 'overview',
      name: 'Overall performance',
      layout: 'summary-dashboard' as const,
      objects: [
        {
          id: 'esp-ai',
          kind: 'ai-summary' as const,
          title: 'AI summary',
          body: 'Spain maintained high possession and structured chance creation, with efficient finishing in knockout matches.',
          slot: 'insight' as const,
        },
        {
          id: 'esp-kpis',
          kind: 'kpi-row' as const,
          title: 'Key metrics',
          slot: 'metrics' as const,
        },
        {
          id: 'esp-chart',
          kind: 'chart' as const,
          title: 'Chance creation (xG)',
          chartId: 'spain-xg-bar',
          slot: 'main' as const,
        },
      ],
    },
    {
      id: 'attack',
      name: 'Attacking profile',
      layout: 'analytics-split' as const,
      objects: [
        {
          id: 'esp-attack-chart',
          kind: 'chart' as const,
          title: 'Chance creation (xG)',
          chartId: 'spain-xg-bar',
          slot: 'main' as const,
        },
        {
          id: 'esp-pass',
          kind: 'metric' as const,
          title: 'Possession',
          metricValue: '63%',
          metricHint: 'Tournament average',
          slot: 'metrics' as const,
        },
        {
          id: 'esp-compare',
          kind: 'chart' as const,
          title: 'Attacking contribution',
          chartId: 'wwc-attack-stacked',
          slot: 'chart-a' as const,
        },
      ],
    },
    {
      id: 'final-review',
      name: 'Final review',
      layout: 'match-review' as const,
      objects: [
        {
          id: 'esp-final-score',
          kind: 'scoreboard' as const,
          title: 'Spain vs England',
          homeTeam: 'Spain',
          awayTeam: 'England',
          homeScore: 1,
          awayScore: 0,
          matchStatus: 'FT',
          matchMeta: 'Final · Sydney',
          slot: 'header' as const,
        },
        {
          id: 'esp-final-video',
          kind: 'video' as const,
          title: 'Winning sequence replay',
          body: 'Late chance conversion · Final third',
          metricHint: '1:04',
          slot: 'media' as const,
        },
        {
          id: 'esp-final-events',
          kind: 'event-list' as const,
          title: 'Key events',
          slot: 'events' as const,
          events: [
            { id: 'se1', minute: "70'", text: 'England introduce width', tone: 'sub' as const },
            { id: 'se2', minute: "86'", text: 'Goal — Spain', tone: 'goal' as const },
          ],
        },
        {
          id: 'esp-final-pitch',
          kind: 'spatial' as const,
          title: 'Spain shape',
          chartId: 'england-pitch',
          slot: 'side' as const,
        },
        {
          id: 'esp-final-momentum',
          kind: 'chart' as const,
          title: 'Match momentum',
          chartId: 'england-spain-momentum',
          slot: 'chart-a' as const,
        },
        {
          id: 'esp-final-shots',
          kind: 'chart' as const,
          title: 'Shot outcomes',
          chartId: 'england-shot-donut',
          slot: 'chart-b' as const,
        },
        {
          id: 'esp-final-xg',
          kind: 'chart' as const,
          title: 'Chance quality',
          chartId: 'england-xg-scatter',
          slot: 'chart-c' as const,
        },
      ],
    },
  ];
}

export function buildPlayerComparisonPages() {
  return [
    {
      id: 'compare',
      name: 'Comparison',
      layout: 'compare-split' as const,
      objects: [
        {
          id: 'cmp-table',
          kind: 'table' as const,
          title: 'Player comparison',
          columns: ['Player', 'Minutes', 'Goals', 'Assists', 'Shots', 'Passing', 'Defensive'],
          rows: [
            ['Player A', '612', '5', '1', '18', '78%', '12'],
            ['Player B', '630', '1', '3', '9', '87%', '28'],
            ['Player C', '540', '0', '0', '2', '91%', '41'],
          ],
          sourceRefs: [
            'eng-haiti',
            'eng-denmark',
            'eng-china',
            'eng-nigeria',
            'eng-colombia',
            'eng-australia',
            'eng-spain',
          ],
          slot: 'main' as const,
        },
        {
          id: 'cmp-ai',
          kind: 'ai-summary' as const,
          title: 'AI-generated comparison',
          body: 'Player A leads finishing output; Player B balances creation and progression; Player C anchors defensive actions.',
          slot: 'side' as const,
        },
        {
          id: 'cmp-radar',
          kind: 'chart' as const,
          title: 'Player A profile',
          chartId: 'player-compare-radar',
          sourceRefs: [
            'eng-haiti',
            'eng-denmark',
            'eng-china',
            'eng-nigeria',
            'eng-colombia',
            'eng-australia',
            'eng-spain',
          ],
          slot: 'chart-a' as const,
        },
      ],
    },
  ];
}
