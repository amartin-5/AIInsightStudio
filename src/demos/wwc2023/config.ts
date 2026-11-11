export const demoConfig = {
  id: 'wwc2023',
  name: 'Women’s World Cup 2023',
  productName: 'Insight Studio',
  tagline: 'Create, refresh, and share analytics reports with AI.',
  dataDisclaimer: 'This prototype uses simulated data for demonstration purposes.',
  dataBadge: 'Demo data',
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
    { id: 'matches', label: 'Women’s World Cup 2023 match data', demo: true },
    { id: 'team', label: 'Team performance data', demo: true },
    { id: 'player', label: 'Player performance data', demo: true },
    { id: 'events', label: 'Match events', demo: true },
    { id: 'lineups', label: 'Lineups and formations', demo: true },
    { id: 'notes', label: 'Analyst notes', demo: true },
  ],
} as const;

export type DemoConfig = typeof demoConfig;
