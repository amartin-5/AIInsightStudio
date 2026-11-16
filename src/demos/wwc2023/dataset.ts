/** Women’s World Cup 2023 scenario values for Insight Studio. */

import photoForward from '../../assets/explore/spotlight-celebration.jpg';
import photoMid from '../../assets/explore/card-match-1.jpg';
import photoDef from '../../assets/explore/card-match-2.jpg';
import photoWide from '../../assets/explore/card-match-3.jpg';

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

export const australiaKpis = [
  { id: 'matches', title: 'Matches played', value: '7', hint: 'Host run to SF' },
  { id: 'wins', title: 'Wins', value: '5', hint: '1 draw · 1 loss' },
  { id: 'goals', title: 'Goals', value: '11', hint: 'Tournament total' },
  { id: 'conceded', title: 'Goals conceded', value: '5', hint: 'Tournament total' },
  { id: 'xg', title: 'Expected goals', value: '10.4', hint: 'xG model' },
  { id: 'poss', title: 'Possession', value: '51%', hint: 'Tournament average' },
  { id: 'shots', title: 'Shots / match', value: '13.1', hint: 'Average' },
  { id: 'ppda', title: 'PPDA', value: '9.8', hint: 'Press intensity' },
];

export const spainKpis = [
  { id: 'matches', title: 'Matches played', value: '7', hint: 'Champions' },
  { id: 'wins', title: 'Wins', value: '6', hint: '1 draw · 0 losses' },
  { id: 'goals', title: 'Goals', value: '18', hint: 'Tournament total' },
  { id: 'conceded', title: 'Goals conceded', value: '3', hint: 'Tournament total' },
  { id: 'xg', title: 'Expected goals', value: '15.2', hint: 'xG model' },
  { id: 'poss', title: 'Possession', value: '63%', hint: 'Tournament average' },
  { id: 'shots', title: 'Shots / match', value: '16.4', hint: 'Average' },
  { id: 'pass', title: 'Passing accuracy', value: '89%', hint: 'Tournament average' },
];

export const knockoutKpis = [
  { id: 'matches', title: 'KO matches', value: '15', hint: 'R16 → Final' },
  { id: 'avgXg', title: 'Avg xG / match', value: '1.4', hint: 'Down from group 2.1' },
  { id: 'pens', title: 'Penalty shootouts', value: '3', hint: 'Including AUS–FRA' },
  { id: 'lateGoals', title: 'Goals after 75′', value: '9', hint: 'Decisive windows' },
  { id: 'clean', title: 'Clean sheets', value: '8', hint: '53% of KO games' },
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

export type DemoPlayer = {
  id: string;
  label: string;
  position: string;
  matches: string;
  minutes: string;
  metric: string;
  observation: string;
  photo: string;
  initial: string;
};

/** Demo personas — photographic crops are stadium/match atmosphere stand-ins. */
export const englandPlayers: DemoPlayer[] = [
  {
    id: 'p1',
    label: 'Ava Mercer',
    position: 'Forward',
    matches: '7',
    minutes: '612',
    metric: '5 goals',
    observation: 'Primary finishing outlet in open play.',
    photo: photoForward,
    initial: 'A',
  },
  {
    id: 'p2',
    label: 'Jordan Blake',
    position: 'Midfielder',
    matches: '7',
    minutes: '630',
    metric: '87% pass',
    observation: 'Stabilized buildup under pressure.',
    photo: photoMid,
    initial: 'J',
  },
  {
    id: 'p3',
    label: 'Casey Quinn',
    position: 'Defender',
    matches: '6',
    minutes: '540',
    metric: '18 recoveries',
    observation: 'Key in defensive rest shape.',
    photo: photoDef,
    initial: 'C',
  },
  {
    id: 'p4',
    label: 'Riley Shaw',
    position: 'Forward',
    matches: '7',
    minutes: '498',
    metric: '3 assists',
    observation: 'Created width in attacking channels.',
    photo: photoWide,
    initial: 'R',
  },
];

export const australiaPlayers: DemoPlayer[] = [
  {
    id: 'ap1',
    label: 'Sam Kerr',
    position: 'Forward',
    matches: '4',
    minutes: '312',
    metric: '2 goals',
    observation: 'Injury-limited minutes; still the reference runner in behind.',
    photo: photoForward,
    initial: 'S',
  },
  {
    id: 'ap2',
    label: 'Hayley Raso',
    position: 'Forward',
    matches: '7',
    minutes: '540',
    metric: '3 goals',
    observation: 'Width + early crosses created Australia’s best open-play looks.',
    photo: photoWide,
    initial: 'H',
  },
  {
    id: 'ap3',
    label: 'Katrina Gorry',
    position: 'Midfielder',
    matches: '7',
    minutes: '598',
    metric: '84% pass',
    observation: 'Progressive carrier through the first press line.',
    photo: photoMid,
    initial: 'K',
  },
  {
    id: 'ap4',
    label: 'Alanna Kennedy',
    position: 'Defender',
    matches: '7',
    minutes: '630',
    metric: '22 clearances',
    observation: 'Anchored rest defense when the mid-block sat deeper.',
    photo: photoDef,
    initial: 'A',
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
          title: 'Host run — what mattered',
          body: 'Australia’s ceiling was the Canada 4–0: high press + early width created a +2.1 xG swing. The semi-final vs England flipped that script — rest-defense spacing opened after 60′, and England’s second and third goals came from the same half-space corridor.',
          slot: 'insight' as const,
        },
        {
          id: 'aus-kpis',
          kind: 'kpi-row' as const,
          title: 'Tournament metrics',
          metricHint: 'australia',
          sourceRefs: ['eng-australia'],
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
          kind: 'ai-summary' as const,
          title: 'Executive takeaway',
          body: 'Peak efficiency vs Canada; transition vulnerability exposed in the semi-final. For future host cycles, prioritize rest-defense drills when the mid-block sits deeper than PPDA 11.',
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
          columns: ['Opponent', 'Stage', 'Result', 'xG', 'Observation'],
          rows: [
            ['Ireland', 'Group', 'W 1–0', '1.4', 'Controlled opener; low chaos.'],
            ['Nigeria', 'Group', 'D 3–2', '2.6', 'Open transitional game.'],
            ['Canada', 'Group', 'W 4–0', '3.1', 'Peak attacking efficiency.'],
            ['Denmark', 'R16', 'W 2–0', '1.8', 'Structured mid-block break.'],
            ['France', 'QF', 'W 7–6 P', '0.9', 'Low chance volume; progressed.'],
            ['England', 'SF', 'L 1–3', '1.1', 'Transition vulnerability exposed.'],
          ],
          slot: 'main' as const,
        },
        {
          id: 'aus-press',
          kind: 'ai-summary' as const,
          title: 'Pressing arc',
          body: 'PPDA stayed under 10 through the quarter-final, then rose to 12.4 in the semi — England found switches into the vacated half-spaces once Australia’s first press fatigued.',
          slot: 'metrics' as const,
        },
        {
          id: 'aus-compare',
          kind: 'chart' as const,
          title: 'Attacking contribution',
          chartId: 'wwc-attack-stacked',
          slot: 'chart-a' as const,
        },
      ],
    },
    {
      id: 'players',
      name: 'Key players',
      layout: 'summary-dashboard' as const,
      objects: [
        {
          id: 'aus-players-ai',
          kind: 'ai-summary' as const,
          title: 'Player watchlist',
          body: 'Raso’s width carried creation when Kerr’s minutes were limited. Gorry’s progressive carries were the reliable bridge through the first press line.',
          slot: 'insight' as const,
        },
        {
          id: 'aus-players',
          kind: 'player-list' as const,
          title: 'Matildas spotlights',
          metricHint: 'australia',
          slot: 'main' as const,
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
          title: 'Champions profile',
          body: 'Spain controlled 63% possession and converted knockout xG at 1.4 goals per 1.0 xG — the most efficient finishing rate among finalists. Structured chance creation from half-spaces, not volume crossing, defined the title run.',
          slot: 'insight' as const,
        },
        {
          id: 'esp-kpis',
          kind: 'kpi-row' as const,
          title: 'Tournament metrics',
          metricHint: 'spain',
          sourceRefs: ['eng-spain'],
          slot: 'metrics' as const,
        },
        {
          id: 'esp-chart',
          kind: 'chart' as const,
          title: 'Chance creation (xG)',
          chartId: 'spain-xg-bar',
          slot: 'main' as const,
        },
        {
          id: 'esp-exec',
          kind: 'ai-summary' as const,
          title: 'Why Spain won',
          body: 'They never abandoned positional play under scoreboard pressure. England’s late width forced a deeper Spanish mid-block, but Spain still created the higher-quality late look that decided the final.',
          slot: 'notes' as const,
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
          metricHint: 'Tournament average · +9pp vs England',
          slot: 'metrics' as const,
        },
        {
          id: 'esp-attack-ai',
          kind: 'ai-summary' as const,
          title: 'Creation pattern',
          body: 'Primary threat: third-man combinations into the right half-space, then cutbacks. Cross share stayed under 18% of entries — unusual for a tournament winner.',
          slot: 'notes' as const,
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
          matchMeta: 'Final · Sydney · 20 Aug 2023',
          slot: 'header' as const,
        },
        {
          id: 'esp-final-video',
          kind: 'video' as const,
          title: 'Winning sequence replay',
          body: '86′ chance conversion · Final third',
          metricHint: '1:04',
          slot: 'media' as const,
        },
        {
          id: 'esp-final-events',
          kind: 'event-list' as const,
          title: 'Key events',
          slot: 'events' as const,
          events: [
            { id: 'se1', minute: "29'", text: 'Yellow — England midfielder', tone: 'card' as const },
            { id: 'se2', minute: "70'", text: 'England introduce width', tone: 'sub' as const },
            { id: 'se3', minute: "86'", text: 'Goal — Spain convert late chance', tone: 'goal' as const },
            { id: 'se4', minute: "90+3'", text: 'Final whistle — Spain 1–0', tone: 'neutral' as const },
          ],
        },
        {
          id: 'esp-final-pitch',
          kind: 'spatial' as const,
          title: 'Average positions',
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
          id: 'cmp-header',
          kind: 'ai-summary' as const,
          title: 'England watchlist — role fit',
          body: 'Three complementary profiles: Mercer finishes, Blake progresses, Quinn protects. Selection hinges on whether the next opponent forces a mid-block or a high press.',
          slot: 'header' as const,
        },
        {
          id: 'cmp-table',
          kind: 'table' as const,
          title: 'Player comparison',
          columns: ['Player', 'Minutes', 'Goals', 'Assists', 'Shots', 'Passing', 'Defensive'],
          rows: [
            ['Ava Mercer', '612', '5', '1', '18', '78%', '12'],
            ['Jordan Blake', '630', '1', '3', '9', '87%', '28'],
            ['Casey Quinn', '540', '0', '0', '2', '91%', '41'],
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
          title: 'Who to start',
          body: 'Mercer leads finishing output (0.82 goals/90). Blake balances creation and progression — best vs mid-blocks. Quinn anchors defensive actions when protecting a lead after 70′.',
          slot: 'side' as const,
        },
        {
          id: 'cmp-radar',
          kind: 'chart' as const,
          title: 'Ava Mercer profile',
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
        {
          id: 'cmp-players',
          kind: 'player-list' as const,
          title: 'Spotlight cards',
          metricHint: 'england',
          slot: 'chart-b' as const,
        },
      ],
    },
  ];
}

export function buildKnockoutPages() {
  return [
    {
      id: 'ko-summary',
      name: 'Knockout overview',
      layout: 'summary-dashboard' as const,
      objects: [
        {
          id: 'ko-ai',
          kind: 'ai-summary' as const,
          title: 'Knockout stage patterns',
          body: 'Across 15 knockout matches, average xG fell from 2.1 (group) to 1.4. Clean sheets rose to 53%. The decisive games were decided after 75′ or on penalties — preparation should prioritize late-game rest defense and set-piece volume.',
          slot: 'insight' as const,
        },
        {
          id: 'ko-kpis',
          kind: 'kpi-row' as const,
          title: 'Knockout metrics',
          metricHint: 'knockout',
          slot: 'metrics' as const,
        },
        {
          id: 'ko-chart',
          kind: 'chart' as const,
          title: 'Attacking contribution by stage',
          chartId: 'wwc-attack-stacked',
          slot: 'main' as const,
        },
        {
          id: 'ko-note',
          kind: 'ai-summary' as const,
          title: 'Scouting implication',
          body: 'Expect lower chance quality and tighter defensive spacing. Favor squads that can create without open transitions — Spain’s half-space combinations are the reference pattern.',
          slot: 'notes' as const,
        },
      ],
    },
    {
      id: 'ko-bracket',
      name: 'Path to the final',
      layout: 'analytics-split' as const,
      objects: [
        {
          id: 'ko-table',
          kind: 'table' as const,
          title: 'Semi-final & final path',
          columns: ['Match', 'Score', 'xG', 'Deciding factor'],
          rows: [
            ['AUS–ENG SF', '1–3', '1.1–2.4', 'England half-space switches after 60′'],
            ['ESP–SWE SF', '2–1', '1.9–1.2', 'Spain late cutback quality'],
            ['ESP–ENG Final', '1–0', '1.8–0.9', '86′ conversion after England width push'],
          ],
          slot: 'main' as const,
        },
        {
          id: 'ko-h2h',
          kind: 'comparison' as const,
          title: 'England vs Spain — tournament',
          body: 'Head-to-head across the competition cycle.',
          slot: 'metrics' as const,
        },
        {
          id: 'ko-form',
          kind: 'chart' as const,
          title: 'Form into the final',
          chartId: 'england-spain-form',
          slot: 'chart-a' as const,
        },
      ],
    },
  ];
}
