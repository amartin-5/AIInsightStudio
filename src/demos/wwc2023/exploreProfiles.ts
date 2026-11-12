/** Team-centered Explore content for national and club affiliations. */

export type AffiliationKind = 'national' | 'club';

export type AffiliationOption = {
  id: string;
  name: string;
  kind: AffiliationKind;
  shortLabel: string;
};

export type ExploreMatch = {
  id: string;
  opponent: string;
  competition: string;
  round: string;
  result: string;
  scoreline: string;
  date: string;
  goalsFor: number;
  goalsAgainst: number;
  possession: string;
  xg: string;
  takeaway: string;
  outcome: 'win' | 'draw' | 'loss';
};

export type ExploreInsight = {
  id: string;
  title: string;
  detail: string;
};

export type UpcomingMatch = {
  id: string;
  opponent: string;
  competition: string;
  when: string;
  venue: string;
  prepFocus: string;
  watchOut: string;
};

export type ExploreTeamProfile = {
  id: string;
  name: string;
  kind: AffiliationKind;
  crestTeam: string;
  tagline: string;
  reportId?: string;
  record: string;
  winRate: number;
  goalsFor: number;
  goalsAgainst: number;
  xg: string;
  pastMatches: ExploreMatch[];
  strengths: ExploreInsight[];
  failures: ExploreInsight[];
  upcoming: UpcomingMatch[];
};

export const affiliationOptions: AffiliationOption[] = [
  { id: 'england', name: 'England', kind: 'national', shortLabel: 'ENG' },
  { id: 'spain', name: 'Spain', kind: 'national', shortLabel: 'ESP' },
  { id: 'australia', name: 'Australia', kind: 'national', shortLabel: 'AUS' },
  { id: 'united-states', name: 'United States', kind: 'national', shortLabel: 'USA' },
  { id: 'france', name: 'France', kind: 'national', shortLabel: 'FRA' },
  { id: 'japan', name: 'Japan', kind: 'national', shortLabel: 'JPN' },
  { id: 'sweden', name: 'Sweden', kind: 'national', shortLabel: 'SWE' },
  { id: 'netherlands', name: 'Netherlands', kind: 'national', shortLabel: 'NED' },
  { id: 'arsenal-wfc', name: 'Arsenal WFC', kind: 'club', shortLabel: 'ARS' },
  { id: 'barcelona-femeni', name: 'Barcelona Femení', kind: 'club', shortLabel: 'BAR' },
  { id: 'lyon-feminines', name: 'Olympique Lyonnais Féminin', kind: 'club', shortLabel: 'OL' },
  { id: 'chelsea-women', name: 'Chelsea Women', kind: 'club', shortLabel: 'CHE' },
];

const englandProfile: ExploreTeamProfile = {
  id: 'england',
  name: 'England',
  kind: 'national',
  crestTeam: 'England',
  tagline: 'Recap the Lionesses’ knockout run and prep the next opposition brief.',
  reportId: 'england-opponent',
  record: '5–1–1',
  winRate: 71,
  goalsFor: 13,
  goalsAgainst: 4,
  xg: '11.8',
  pastMatches: [
    {
      id: 'eng-final',
      opponent: 'Spain',
      competition: 'WWC 2023',
      round: 'Final',
      result: 'L 0–1',
      scoreline: '0–1',
      date: '20 Aug 2023',
      goalsFor: 0,
      goalsAgainst: 1,
      possession: '48%',
      xg: '0.9',
      takeaway: 'Chance quality dropped; limited final-third entries decided the match.',
      outcome: 'loss',
    },
    {
      id: 'eng-sf',
      opponent: 'Australia',
      competition: 'WWC 2023',
      round: 'Semi-final',
      result: 'W 3–1',
      scoreline: '3–1',
      date: '16 Aug 2023',
      goalsFor: 3,
      goalsAgainst: 1,
      possession: '49%',
      xg: '2.1',
      takeaway: 'Transition threat created decisive advantages after a high-tempo first half.',
      outcome: 'win',
    },
    {
      id: 'eng-qf',
      opponent: 'Colombia',
      competition: 'WWC 2023',
      round: 'Quarter-final',
      result: 'W 2–1',
      scoreline: '2–1',
      date: '12 Aug 2023',
      goalsFor: 2,
      goalsAgainst: 1,
      possession: '52%',
      xg: '1.8',
      takeaway: 'Shape adjusted mid-game after early pressure; finishing stayed clinical.',
      outcome: 'win',
    },
    {
      id: 'eng-r16',
      opponent: 'Nigeria',
      competition: 'WWC 2023',
      round: 'Round of 16',
      result: 'W 0–0 (4–2 P)',
      scoreline: '0–0',
      date: '7 Aug 2023',
      goalsFor: 0,
      goalsAgainst: 0,
      possession: '57%',
      xg: '1.6',
      takeaway: 'Chance quality dipped; progressed on penalties despite territorial control.',
      outcome: 'win',
    },
  ],
  strengths: [
    {
      id: 'eng-s1',
      title: 'Defensive rest shape',
      detail: 'Compact mid-block limited central progression across knockout matches.',
    },
    {
      id: 'eng-s2',
      title: 'Transition finishing',
      detail: 'Direct outlets after recoveries produced high-value chances vs Australia.',
    },
    {
      id: 'eng-s3',
      title: 'Set-piece threat',
      detail: 'Delivery quality and second-ball wins remained a reliable scoring route.',
    },
  ],
  failures: [
    {
      id: 'eng-f1',
      title: 'Final-third chance quality',
      detail: 'xG fell to 0.9 in the final — entries without clean finishing patterns.',
    },
    {
      id: 'eng-f2',
      title: 'Late-game width',
      detail: 'Width after 70′ arrived too late against Spain’s settled block.',
    },
    {
      id: 'eng-f3',
      title: 'Penalty-shootout variance',
      detail: 'R16 exposed open-play inefficiency when chance volume did not convert.',
    },
  ],
  upcoming: [
    {
      id: 'eng-u1',
      opponent: 'France',
      competition: 'Nations League',
      when: 'Fri · 19:45',
      venue: 'Wembley Stadium',
      prepFocus: 'Protect rest shape vs French wide overloads; rehearse first-phase exits.',
      watchOut: 'France’s far-post crosses after switch-of-play.',
    },
    {
      id: 'eng-u2',
      opponent: 'Netherlands',
      competition: 'Nations League',
      when: 'Tue · 20:00',
      venue: 'Away',
      prepFocus: 'Press triggers on Dutch buildup; plan for mid-block patience.',
      watchOut: 'Cutbacks from the half-spaces.',
    },
  ],
};

const spainProfile: ExploreTeamProfile = {
  id: 'spain',
  name: 'Spain',
  kind: 'national',
  crestTeam: 'Spain',
  tagline: 'Champions’ recap — possession control, chance quality, and next-cycle prep.',
  reportId: 'spain-performance',
  record: '6–0–1',
  winRate: 86,
  goalsFor: 18,
  goalsAgainst: 7,
  xg: '15.2',
  pastMatches: [
    {
      id: 'esp-final',
      opponent: 'England',
      competition: 'WWC 2023',
      round: 'Final',
      result: 'W 1–0',
      scoreline: '1–0',
      date: '20 Aug 2023',
      goalsFor: 1,
      goalsAgainst: 0,
      possession: '52%',
      xg: '1.4',
      takeaway: 'Patient circulation and a late clinical finish sealed the title.',
      outcome: 'win',
    },
    {
      id: 'esp-sf',
      opponent: 'Sweden',
      competition: 'WWC 2023',
      round: 'Semi-final',
      result: 'W 2–1',
      scoreline: '2–1',
      date: '15 Aug 2023',
      goalsFor: 2,
      goalsAgainst: 1,
      possession: '61%',
      xg: '2.3',
      takeaway: 'Sustained territorial pressure broke a compact Swedish block.',
      outcome: 'win',
    },
    {
      id: 'esp-qf',
      opponent: 'Netherlands',
      competition: 'WWC 2023',
      round: 'Quarter-final',
      result: 'W 2–1 (a.e.t.)',
      scoreline: '2–1',
      date: '11 Aug 2023',
      goalsFor: 2,
      goalsAgainst: 1,
      possession: '58%',
      xg: '2.0',
      takeaway: 'Extra-time composure and superior chance quality decided the tie.',
      outcome: 'win',
    },
  ],
  strengths: [
    {
      id: 'esp-s1',
      title: 'Structured possession',
      detail: 'High pass networks under pressure created repeatable progressive patterns.',
    },
    {
      id: 'esp-s2',
      title: 'Chance quality',
      detail: 'Knockout xG stayed above tournament average with efficient shot selection.',
    },
    {
      id: 'esp-s3',
      title: 'Late-game control',
      detail: 'Managed game state well after taking leads in deep knockout rounds.',
    },
  ],
  failures: [
    {
      id: 'esp-f1',
      title: 'Transition vulnerability',
      detail: 'Occasional exposure on counters when fullbacks were high.',
    },
    {
      id: 'esp-f2',
      title: 'Set-piece concession risk',
      detail: 'Aerial duels against physical sides remain a soft spot to monitor.',
    },
  ],
  upcoming: [
    {
      id: 'esp-u1',
      opponent: 'Italy',
      competition: 'Nations League',
      when: 'Fri · 18:00',
      venue: 'Home',
      prepFocus: 'Maintain circulation tempo; rehearse rest-defense after turnovers.',
      watchOut: 'Italy’s direct balls into the channels.',
    },
    {
      id: 'esp-u2',
      opponent: 'Sweden',
      competition: 'Nations League',
      when: 'Tue · 19:00',
      venue: 'Away',
      prepFocus: 'Break a deep mid-block with third-man runs and switch play.',
      watchOut: 'Second-ball recoveries from long clearances.',
    },
  ],
};

const australiaProfile: ExploreTeamProfile = {
  id: 'australia',
  name: 'Australia',
  kind: 'national',
  crestTeam: 'Australia',
  tagline: 'Home-tournament intensity, fatigue signals, and the next Nations League window.',
  reportId: 'australia-overview',
  record: '4–1–2',
  winRate: 57,
  goalsFor: 10,
  goalsAgainst: 8,
  xg: '9.4',
  pastMatches: [
    {
      id: 'aus-sf',
      opponent: 'England',
      competition: 'WWC 2023',
      round: 'Semi-final',
      result: 'L 1–3',
      scoreline: '1–3',
      date: '16 Aug 2023',
      goalsFor: 1,
      goalsAgainst: 3,
      possession: '51%',
      xg: '1.2',
      takeaway: 'Intensity stayed high, but transition defense collapsed after the hour.',
      outcome: 'loss',
    },
    {
      id: 'aus-qf',
      opponent: 'France',
      competition: 'WWC 2023',
      round: 'Quarter-final',
      result: 'W 0–0 (7–6 P)',
      scoreline: '0–0',
      date: '12 Aug 2023',
      goalsFor: 0,
      goalsAgainst: 0,
      possession: '47%',
      xg: '1.1',
      takeaway: 'Resilience and shootout nerve carried a low-chance knockout night.',
      outcome: 'win',
    },
    {
      id: 'aus-r16',
      opponent: 'Denmark',
      competition: 'WWC 2023',
      round: 'Round of 16',
      result: 'W 2–0',
      scoreline: '2–0',
      date: '7 Aug 2023',
      goalsFor: 2,
      goalsAgainst: 0,
      possession: '54%',
      xg: '1.7',
      takeaway: 'Wide progressive attacks created clear finishing opportunities.',
      outcome: 'win',
    },
  ],
  strengths: [
    {
      id: 'aus-s1',
      title: 'Home intensity',
      detail: 'Press height and duel success peaked in front of home crowds.',
    },
    {
      id: 'aus-s2',
      title: 'Attacking width',
      detail: 'Progressive carries from wide channels created cutback chances.',
    },
  ],
  failures: [
    {
      id: 'aus-f1',
      title: 'Late-tournament fatigue',
      detail: 'Sprint volume and rest-defense quality dipped after the quarter-final.',
    },
    {
      id: 'aus-f2',
      title: 'Counter-press gaps',
      detail: 'England exploited spaces behind advanced fullbacks in the semi-final.',
    },
  ],
  upcoming: [
    {
      id: 'aus-u1',
      opponent: 'Canada',
      competition: 'Friendly window',
      when: 'Sat · 17:00',
      venue: 'Sydney',
      prepFocus: 'Rebuild rest-defense habits; manage minutes for key runners.',
      watchOut: 'Canada’s vertical transitions through midfield.',
    },
  ],
};

function nationalLite(
  id: string,
  name: string,
  crestTeam: string,
  tagline: string,
  seed: Partial<ExploreTeamProfile>,
): ExploreTeamProfile {
  return {
    id,
    name,
    kind: 'national',
    crestTeam,
    tagline,
    record: seed.record ?? '3–1–2',
    winRate: seed.winRate ?? 50,
    goalsFor: seed.goalsFor ?? 8,
    goalsAgainst: seed.goalsAgainst ?? 7,
    xg: seed.xg ?? '7.5',
    pastMatches: seed.pastMatches ?? [],
    strengths: seed.strengths ?? [],
    failures: seed.failures ?? [],
    upcoming: seed.upcoming ?? [],
    reportId: seed.reportId,
  };
}

function clubProfile(
  id: string,
  name: string,
  crestTeam: string,
  tagline: string,
  seed: Partial<ExploreTeamProfile>,
): ExploreTeamProfile {
  return {
    id,
    name,
    kind: 'club',
    crestTeam,
    tagline,
    record: seed.record ?? '8–2–1',
    winRate: seed.winRate ?? 73,
    goalsFor: seed.goalsFor ?? 24,
    goalsAgainst: seed.goalsAgainst ?? 9,
    xg: seed.xg ?? '22.0',
    pastMatches: seed.pastMatches ?? [],
    strengths: seed.strengths ?? [],
    failures: seed.failures ?? [],
    upcoming: seed.upcoming ?? [],
    reportId: seed.reportId,
  };
}

const usaProfile = nationalLite(
  'united-states',
  'United States',
  'United States',
  'Recap recent friendlies and prep the next competitive window.',
  {
    record: '4–0–1',
    winRate: 80,
    goalsFor: 12,
    goalsAgainst: 4,
    xg: '11.1',
    pastMatches: [
      {
        id: 'usa-1',
        opponent: 'Canada',
        competition: 'Friendly',
        round: 'Matchday',
        result: 'W 3–0',
        scoreline: '3–0',
        date: 'Last window',
        goalsFor: 3,
        goalsAgainst: 0,
        possession: '58%',
        xg: '2.4',
        takeaway: 'High press forced turnovers that became early goals.',
        outcome: 'win',
      },
      {
        id: 'usa-2',
        opponent: 'Japan',
        competition: 'Friendly',
        round: 'Matchday',
        result: 'W 1–0',
        scoreline: '1–0',
        date: 'Last window',
        goalsFor: 1,
        goalsAgainst: 0,
        possession: '51%',
        xg: '1.3',
        takeaway: 'Controlled a technical opponent with disciplined rest shape.',
        outcome: 'win',
      },
    ],
    strengths: [
      {
        id: 'usa-s1',
        title: 'Press intensity',
        detail: 'Forced turnovers in the opponent half at a high rate.',
      },
      {
        id: 'usa-s2',
        title: 'Aerial set pieces',
        detail: 'Delivery and near-post attacks remain a primary scoring route.',
      },
    ],
    failures: [
      {
        id: 'usa-f1',
        title: 'Buildup under press',
        detail: 'First-phase exits can stall against aggressive mid-press sides.',
      },
    ],
    upcoming: [
      {
        id: 'usa-u1',
        opponent: 'Mexico',
        competition: 'Friendly window',
        when: 'Sun · 16:00',
        venue: 'Home',
        prepFocus: 'Rehearse progressive exits against a mid-block.',
        watchOut: 'Direct balls into the channels on transitions.',
      },
    ],
  },
);

const franceProfile = nationalLite('france', 'France', 'France', 'Review Les Bleues’ recent form and the next Nations League fixtures.', {
  record: '3–2–1',
  winRate: 50,
  goalsFor: 9,
  goalsAgainst: 6,
  xg: '8.8',
  pastMatches: [
    {
      id: 'fra-1',
      opponent: 'Australia',
      competition: 'WWC 2023',
      round: 'Quarter-final',
      result: 'L 0–0 (6–7 P)',
      scoreline: '0–0',
      date: '12 Aug 2023',
      goalsFor: 0,
      goalsAgainst: 0,
      possession: '53%',
      xg: '1.5',
      takeaway: 'Territory without conversion; shootout ended the run.',
      outcome: 'loss',
    },
  ],
  strengths: [
    {
      id: 'fra-s1',
      title: 'Individual quality in the final third',
      detail: '1v1 creators can unlock settled blocks on short sequences.',
    },
  ],
  failures: [
    {
      id: 'fra-f1',
      title: 'Knockout finishing',
      detail: 'Chance conversion dipped when matches tightened.',
    },
  ],
  upcoming: [
    {
      id: 'fra-u1',
      opponent: 'England',
      competition: 'Nations League',
      when: 'Fri · 19:45',
      venue: 'Away',
      prepFocus: 'Exploit wide overloads; track England’s rest-defense triggers.',
      watchOut: 'England’s transition outlets after recoveries.',
    },
  ],
});

const japanProfile = nationalLite('japan', 'Japan', 'Japan', 'Technical control, pressing traps, and upcoming window prep.', {
  record: '3–1–2',
  winRate: 50,
  goalsFor: 7,
  goalsAgainst: 5,
  xg: '6.9',
  pastMatches: [
    {
      id: 'jpn-1',
      opponent: 'Sweden',
      competition: 'WWC 2023',
      round: 'Round of 16',
      result: 'L 0–2',
      scoreline: '0–2',
      date: '11 Aug 2023',
      goalsFor: 0,
      goalsAgainst: 2,
      possession: '56%',
      xg: '0.8',
      takeaway: 'Possession without penetration against a compact Swedish block.',
      outcome: 'loss',
    },
  ],
  strengths: [
    {
      id: 'jpn-s1',
      title: 'Combination play',
      detail: 'Short combinations under pressure remain a hallmark.',
    },
  ],
  failures: [
    {
      id: 'jpn-f1',
      title: 'Box presence',
      detail: 'Need more runners arriving in the box against deep blocks.',
    },
  ],
  upcoming: [
    {
      id: 'jpn-u1',
      opponent: 'United States',
      competition: 'Friendly window',
      when: 'Sat · 15:00',
      venue: 'Away',
      prepFocus: 'Survive early press; build through midfield triangles.',
      watchOut: 'USA aerial set pieces.',
    },
  ],
});

const swedenProfile = nationalLite('sweden', 'Sweden', 'Sweden', 'Physical structure, set pieces, and the next competitive fixtures.', {
  record: '4–0–2',
  winRate: 67,
  goalsFor: 11,
  goalsAgainst: 6,
  xg: '10.2',
  pastMatches: [
    {
      id: 'swe-1',
      opponent: 'Spain',
      competition: 'WWC 2023',
      round: 'Semi-final',
      result: 'L 1–2',
      scoreline: '1–2',
      date: '15 Aug 2023',
      goalsFor: 1,
      goalsAgainst: 2,
      possession: '39%',
      xg: '1.0',
      takeaway: 'Compact block held long, but Spain’s sustained pressure told.',
      outcome: 'loss',
    },
  ],
  strengths: [
    {
      id: 'swe-s1',
      title: 'Defensive block',
      detail: 'Low/mid-block spacing frustrates possession-dominant sides.',
    },
  ],
  failures: [
    {
      id: 'swe-f1',
      title: 'Sustained territorial defense',
      detail: 'Fatigue under long possession spells remains a risk.',
    },
  ],
  upcoming: [
    {
      id: 'swe-u1',
      opponent: 'Spain',
      competition: 'Nations League',
      when: 'Tue · 19:00',
      venue: 'Home',
      prepFocus: 'Stay compact; attack transitions and set pieces.',
      watchOut: 'Spain’s third-man combinations between the lines.',
    },
  ],
});

const netherlandsProfile = nationalLite(
  'netherlands',
  'Netherlands',
  'Netherlands',
  'Oranje form review and prep for the next Nations League round.',
  {
    record: '3–1–2',
    winRate: 50,
    goalsFor: 9,
    goalsAgainst: 7,
    xg: '8.1',
    pastMatches: [
      {
        id: 'ned-1',
        opponent: 'Spain',
        competition: 'WWC 2023',
        round: 'Quarter-final',
        result: 'L 1–2 (a.e.t.)',
        scoreline: '1–2',
        date: '11 Aug 2023',
        goalsFor: 1,
        goalsAgainst: 2,
        possession: '42%',
        xg: '1.1',
        takeaway: 'Competitive for 90′, but extra-time quality gap decided it.',
        outcome: 'loss',
      },
    ],
    strengths: [
      {
        id: 'ned-s1',
        title: 'Half-space cutbacks',
        detail: 'Attacks from the half-spaces create recurring cutback chances.',
      },
    ],
    failures: [
      {
        id: 'ned-f1',
        title: 'Extra-time management',
        detail: 'Decision quality dropped when matches went beyond 90′.',
      },
    ],
    upcoming: [
      {
        id: 'ned-u1',
        opponent: 'England',
        competition: 'Nations League',
        when: 'Tue · 20:00',
        venue: 'Home',
        prepFocus: 'Use cutbacks early; deny England transition lanes.',
        watchOut: 'England’s set-piece delivery.',
      },
    ],
  },
);

const arsenalProfile = clubProfile(
  'arsenal-wfc',
  'Arsenal WFC',
  'England',
  'Club form recap — recent WSL results, strengths, and the next fixture prep.',
  {
    record: '7–2–1',
    winRate: 70,
    goalsFor: 22,
    goalsAgainst: 8,
    xg: '20.4',
    pastMatches: [
      {
        id: 'ars-1',
        opponent: 'Chelsea Women',
        competition: 'WSL',
        round: 'Matchday 8',
        result: 'D 1–1',
        scoreline: '1–1',
        date: 'Last weekend',
        goalsFor: 1,
        goalsAgainst: 1,
        possession: '49%',
        xg: '1.2',
        takeaway: 'Even territorial battle; need cleaner box entries next time.',
        outcome: 'draw',
      },
      {
        id: 'ars-2',
        opponent: 'Manchester City',
        competition: 'WSL',
        round: 'Matchday 7',
        result: 'W 2–0',
        scoreline: '2–0',
        date: '2 weeks ago',
        goalsFor: 2,
        goalsAgainst: 0,
        possession: '46%',
        xg: '1.8',
        takeaway: 'Compact out of possession and clinical on the counter.',
        outcome: 'win',
      },
    ],
    strengths: [
      {
        id: 'ars-s1',
        title: 'Wide overloads',
        detail: 'Left-side combinations create recurring cutback chances.',
      },
      {
        id: 'ars-s2',
        title: 'Counter-press',
        detail: 'Immediate pressure after turnovers wins the ball high.',
      },
    ],
    failures: [
      {
        id: 'ars-f1',
        title: 'Derby chance quality',
        detail: 'xG stayed middling against Chelsea despite territorial spells.',
      },
    ],
    upcoming: [
      {
        id: 'ars-u1',
        opponent: 'Tottenham Hotspur',
        competition: 'WSL',
        when: 'Sun · 14:30',
        venue: 'Emirates Stadium',
        prepFocus: 'Start fast; punish a deeper block with early switches.',
        watchOut: 'Direct balls into the channels on transitions.',
      },
    ],
  },
);

const barcelonaProfile = clubProfile(
  'barcelona-femeni',
  'Barcelona Femení',
  'Spain',
  'Dominant possession patterns, recent Liga F results, and UWCL prep.',
  {
    record: '9–0–0',
    winRate: 100,
    goalsFor: 34,
    goalsAgainst: 3,
    xg: '28.6',
    pastMatches: [
      {
        id: 'bar-1',
        opponent: 'Real Madrid Femenino',
        competition: 'Liga F',
        round: 'Matchday 9',
        result: 'W 3–0',
        scoreline: '3–0',
        date: 'Last weekend',
        goalsFor: 3,
        goalsAgainst: 0,
        possession: '68%',
        xg: '2.9',
        takeaway: 'Controlled the derby with relentless territorial pressure.',
        outcome: 'win',
      },
    ],
    strengths: [
      {
        id: 'bar-s1',
        title: 'Positional play',
        detail: 'Superior spacing and third-man combinations break most blocks.',
      },
    ],
    failures: [
      {
        id: 'bar-f1',
        title: 'Rare transition exposure',
        detail: 'When the press is bypassed, recovery runs must stay sharper.',
      },
    ],
    upcoming: [
      {
        id: 'bar-u1',
        opponent: 'Chelsea Women',
        competition: 'UWCL',
        when: 'Wed · 18:45',
        venue: 'Home',
        prepFocus: 'Break a compact mid-block; manage rest-defense vs counters.',
        watchOut: 'Chelsea’s direct channels after turnovers.',
      },
    ],
  },
);

const lyonProfile = clubProfile(
  'lyon-feminines',
  'Olympique Lyonnais Féminin',
  'France',
  'Club dynasty form — recent Division 1 results and European prep.',
  {
    record: '8–1–1',
    winRate: 80,
    goalsFor: 26,
    goalsAgainst: 6,
    xg: '23.1',
    pastMatches: [
      {
        id: 'ol-1',
        opponent: 'Paris Saint-Germain',
        competition: 'Division 1',
        round: 'Matchday 8',
        result: 'W 2–1',
        scoreline: '2–1',
        date: 'Last weekend',
        goalsFor: 2,
        goalsAgainst: 1,
        possession: '55%',
        xg: '1.9',
        takeaway: 'Won the derby with late composure after a midfield battle.',
        outcome: 'win',
      },
    ],
    strengths: [
      {
        id: 'ol-s1',
        title: 'Experienced knockout DNA',
        detail: 'Game management in tight European ties remains elite.',
      },
    ],
    failures: [
      {
        id: 'ol-f1',
        title: 'Occasional slow starts',
        detail: 'First 15′ territorial control has dipped in recent home matches.',
      },
    ],
    upcoming: [
      {
        id: 'ol-u1',
        opponent: 'Bayern Munich',
        competition: 'UWCL',
        when: 'Thu · 18:45',
        venue: 'Away',
        prepFocus: 'Survive early intensity; attack transitions after the hour.',
        watchOut: 'Bayern’s vertical presses on first-phase exits.',
      },
    ],
  },
);

const chelseaProfile = clubProfile(
  'chelsea-women',
  'Chelsea Women',
  'England',
  'WSL title race recap, recent form, and the next big fixture.',
  {
    record: '8–1–1',
    winRate: 80,
    goalsFor: 25,
    goalsAgainst: 7,
    xg: '21.8',
    pastMatches: [
      {
        id: 'che-1',
        opponent: 'Arsenal WFC',
        competition: 'WSL',
        round: 'Matchday 8',
        result: 'D 1–1',
        scoreline: '1–1',
        date: 'Last weekend',
        goalsFor: 1,
        goalsAgainst: 1,
        possession: '51%',
        xg: '1.4',
        takeaway: 'Shared the points in a high-intensity London derby.',
        outcome: 'draw',
      },
    ],
    strengths: [
      {
        id: 'che-s1',
        title: 'Direct channel attacks',
        detail: 'Vertical balls into the channels create early finishing chances.',
      },
    ],
    failures: [
      {
        id: 'che-f1',
        title: 'Derby control spells',
        detail: 'Need longer territorial phases against Arsenal’s counter-press.',
      },
    ],
    upcoming: [
      {
        id: 'che-u1',
        opponent: 'Barcelona Femení',
        competition: 'UWCL',
        when: 'Wed · 18:45',
        venue: 'Away',
        prepFocus: 'Stay compact; attack transitions and set pieces.',
        watchOut: 'Barcelona’s third-man combinations between the lines.',
      },
    ],
  },
);

export const exploreProfiles: Record<string, ExploreTeamProfile> = {
  england: englandProfile,
  spain: spainProfile,
  australia: australiaProfile,
  'united-states': usaProfile,
  france: franceProfile,
  japan: japanProfile,
  sweden: swedenProfile,
  netherlands: netherlandsProfile,
  'arsenal-wfc': arsenalProfile,
  'barcelona-femeni': barcelonaProfile,
  'lyon-feminines': lyonProfile,
  'chelsea-women': chelseaProfile,
};

export const DEFAULT_AFFILIATION_ID = 'england';

export function getExploreProfile(id: string): ExploreTeamProfile {
  return exploreProfiles[id] ?? englandProfile;
}

export function getAffiliationOption(id: string): AffiliationOption {
  return (
    affiliationOptions.find((option) => option.id === id) ??
    affiliationOptions[0]
  );
}

export function affiliationDropdownOptions(kind?: AffiliationKind) {
  return affiliationOptions
    .filter((option) => (kind ? option.kind === kind : true))
    .map((option) => ({
      label: `${option.name} · ${option.kind === 'national' ? 'National' : 'Club'}`,
      value: option.id,
    }));
}
