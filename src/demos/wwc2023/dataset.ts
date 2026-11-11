/** Simulated Women’s World Cup 2023 demo values — not official or live data. */

export const englandKpis = [
  { id: 'matches', title: 'Matches played', value: '7', hint: 'Group + knockout' },
  { id: 'wins', title: 'Wins', value: '5', hint: '1 draw · 1 loss' },
  { id: 'goals', title: 'Goals', value: '13', hint: 'Simulated total' },
  { id: 'conceded', title: 'Goals conceded', value: '4', hint: 'Simulated total' },
  { id: 'xg', title: 'Expected goals', value: '11.8', hint: 'Demo xG model' },
  { id: 'poss', title: 'Possession', value: '54%', hint: 'Tournament average' },
  { id: 'shots', title: 'Shots / match', value: '14.2', hint: 'Simulated' },
  { id: 'pass', title: 'Passing accuracy', value: '86%', hint: 'Simulated' },
];

export const englandMatches = [
  ['Haiti', 'Group', 'W 1–0', '1', '58%', '12', '1.4', 'Controlled opener with limited chance volume.'],
  ['Denmark', 'Group', 'W 1–0', '1', '55%', '11', '1.1', 'Compact defensive block; efficient finishing.'],
  ['China PR', 'Group', 'W 6–1', '6', '61%', '22', '3.4', 'Peak attacking output in the group stage.'],
  ['Nigeria', 'R16', 'W 0–0 (4–2 P)', '0', '57%', '15', '1.6', 'Chance quality dipped; progressed on penalties.'],
  ['Colombia', 'QF', 'W 2–1', '2', '52%', '13', '1.8', 'Adjusted shape mid-game after early pressure.'],
  ['Australia', 'SF', 'W 3–1', '3', '49%', '14', '2.1', 'Transition threat created decisive advantages.'],
  ['Spain', 'Final', 'L 0–1', '0', '48%', '9', '0.9', 'Lower shot quality; limited final-third entries.'],
];

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
      id: 'exec',
      name: 'Executive summary',
      objects: [
        {
          id: 'exec-meta',
          kind: 'text' as const,
          title: 'Report context',
          body: 'Team: England · Competition: Women’s World Cup 2023 · Period: Entire tournament · Type: Opponent analysis · Data status: Demo data',
        },
        {
          id: 'exec-ai',
          kind: 'ai-summary' as const,
          title: 'AI-generated summary',
          body: aiOverview,
        },
        {
          id: 'exec-kpis',
          kind: 'kpi-row' as const,
          title: 'Key metrics',
        },
      ],
    },
    {
      id: 'team',
      name: 'Team performance',
      objects: [
        {
          id: 'team-shape',
          kind: 'spatial' as const,
          title: 'Team shape and lineup',
          placeholderLabel:
            'Spatial visualization placeholder — approved pitch component not available in this project.',
        },
        {
          id: 'team-table',
          kind: 'table' as const,
          title: 'Performance over time',
          columns: [
            'Opponent',
            'Stage',
            'Result',
            'Goals',
            'Possession',
            'Shots',
            'xG',
            'AI observation',
          ],
          rows: englandMatches,
        },
      ],
    },
    {
      id: 'attack',
      name: 'Attacking analysis',
      objects: [
        {
          id: 'attack-shots',
          kind: 'chart' as const,
          title: 'Shot-location distribution',
          placeholderLabel: 'Chart placeholder — HelloPC viz / ECharts not installed. Ask before adding.',
        },
        {
          id: 'attack-chance',
          kind: 'chart' as const,
          title: 'Chance creation',
          placeholderLabel: 'Chart placeholder — structural stand-in for chance creation.',
        },
        {
          id: 'attack-channels',
          kind: 'comparison' as const,
          title: 'Attacking channels',
          body: 'Left channel: elevated entries in group stage. Central: peak vs China PR. Right: reduced volume in final.',
        },
        {
          id: 'attack-final',
          kind: 'metric' as const,
          title: 'Final-third entries / match',
          metricValue: '38',
          metricHint: 'Simulated average',
        },
        {
          id: 'attack-set',
          kind: 'text' as const,
          title: 'Set-piece contribution',
          body: 'Simulated: 3 goals from set pieces; strongest delivery patterns on the right flank.',
        },
      ],
    },
    {
      id: 'defense',
      name: 'Defensive analysis',
      objects: [
        {
          id: 'def-conceded',
          kind: 'chart' as const,
          title: 'Goals and chances conceded',
          placeholderLabel: 'Chart placeholder — defensive concession trend.',
        },
        {
          id: 'def-actions',
          kind: 'metric' as const,
          title: 'Defensive actions / match',
          metricValue: '46',
          metricHint: 'Simulated',
        },
        {
          id: 'def-press',
          kind: 'metric' as const,
          title: 'Pressure indicators',
          metricValue: '112',
          metricHint: 'Pressures / match (demo)',
        },
        {
          id: 'def-recoveries',
          kind: 'metric' as const,
          title: 'Ball recoveries / match',
          metricValue: '51',
          metricHint: 'Simulated',
        },
        {
          id: 'def-vuln',
          kind: 'ai-summary' as const,
          title: 'Areas of vulnerability',
          body: 'Simulated finding: vulnerability increased on switches of play into the half-spaces during knockout matches.',
        },
      ],
    },
    {
      id: 'players',
      name: 'Key players',
      objects: [
        {
          id: 'player-list',
          kind: 'player-list' as const,
          title: 'Key players',
        },
      ],
    },
    {
      id: 'trends',
      name: 'Match trends',
      objects: [
        {
          id: 'trend-gk',
          kind: 'comparison' as const,
          title: 'Group stage vs knockout',
          body: 'Group: higher chance quality and shot volume. Knockout: possession stable, chance quality declined.',
        },
        {
          id: 'trend-half',
          kind: 'comparison' as const,
          title: 'First half vs second half',
          body: 'Simulated: stronger control in first halves; late-game adjustments improved defensive rest defense.',
        },
        {
          id: 'trend-opp',
          kind: 'text' as const,
          title: 'Performance by opponent type',
          body: 'Against mid-blocks: controlled buildup. Against high press: more direct outlets and wider overloads.',
        },
        {
          id: 'trend-ai',
          kind: 'ai-summary' as const,
          title: 'Significant changes detected by AI',
          body: 'Chance quality declined after the group stage while defensive organization remained comparatively stable.',
        },
      ],
    },
    {
      id: 'sources',
      name: 'Sources and notes',
      objects: [
        {
          id: 'note-1',
          kind: 'analyst-note' as const,
          title: 'Analyst notes',
          body: analystNoteSample,
          preserveOnRefresh: true,
        },
        {
          id: 'sources-list',
          kind: 'source-list' as const,
          title: 'Sources and methodology',
          body: 'Demo sources: match data, team performance, player performance, match events, lineups, analyst notes. Period: Women’s World Cup 2023 (simulated). Last refresh: 12 minutes ago. Data-quality status: Demo — suitable for presentation only.',
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
      objects: [
        {
          id: 'aus-ai',
          kind: 'ai-summary' as const,
          title: 'AI-generated overview',
          body: 'Simulated: Australia showed strong home-tournament intensity, progressive attacking width, and late-tournament fatigue indicators.',
        },
        {
          id: 'aus-kpis',
          kind: 'kpi-row' as const,
          title: 'Key metrics',
        },
      ],
    },
    {
      id: 'progress',
      name: 'Match progression',
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
      objects: [
        {
          id: 'esp-ai',
          kind: 'ai-summary' as const,
          title: 'AI summary',
          body: 'Simulated: Spain maintained high possession and structured chance creation, with efficient finishing in knockout matches.',
        },
        {
          id: 'esp-kpis',
          kind: 'kpi-row' as const,
          title: 'Key metrics',
        },
      ],
    },
    {
      id: 'attack',
      name: 'Attacking profile',
      objects: [
        {
          id: 'esp-chart',
          kind: 'chart' as const,
          title: 'Chance creation',
          placeholderLabel: 'Chart placeholder — Spain chance creation.',
        },
        {
          id: 'esp-pass',
          kind: 'metric' as const,
          title: 'Possession',
          metricValue: '63%',
          metricHint: 'Simulated tournament average',
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
        },
        {
          id: 'cmp-ai',
          kind: 'ai-summary' as const,
          title: 'AI-generated comparison',
          body: 'Simulated: Player A leads finishing output; Player B balances creation and progression; Player C anchors defensive actions.',
        },
      ],
    },
  ];
}
