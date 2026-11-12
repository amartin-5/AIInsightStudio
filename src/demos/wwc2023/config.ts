export const demoConfig = {
  id: 'wwc2023',
  name: 'Women’s World Cup 2023',
  productName: 'Insight Studio',
  tagline: 'Create, refresh, and share analytics reports with AI.',
  competitionLabel: 'Women’s World Cup 2023',
  teams: [
    'England',
    'Spain',
    'Australia',
    'Sweden',
    'Japan',
    'United States',
    'France',
    'Netherlands',
  ],
  periods: ['Entire tournament', 'Group stage', 'Knockout stage', 'Selected matches'],
  audiences: ['Analyst', 'Coach', 'Executive', 'General audience'],
  dataSources: [
    { id: 'matches', label: 'Women’s World Cup 2023 match data' },
    { id: 'team', label: 'Team performance data' },
    { id: 'player', label: 'Player performance data' },
    { id: 'events', label: 'Match events' },
    { id: 'lineups', label: 'Lineups and formations' },
    { id: 'notes', label: 'Analyst notes' },
  ],
} as const;

export type DemoConfig = typeof demoConfig;
