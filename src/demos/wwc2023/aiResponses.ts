const responses: Record<string, { content: string; sources: string[] }> = {
  default: {
    content:
      'Based on the selected demo sources, England showed structured buildup and adaptable shape across the tournament. Chance quality was strongest in the group stage and declined in knockout matches, while defensive organization remained comparatively stable. This is a simulated response for demonstration.',
    sources: [
      'Women’s World Cup 2023 match data',
      'England team performance',
      'Match events',
    ],
  },
  summarize: {
    content:
      'England finished as runners-up with five wins, one draw, and one loss across seven matches (simulated). Strengths included controlled possession phases and late-game adjustments. The clearest change was reduced chance quality after the group stage.',
    sources: ['Women’s World Cup 2023 match data', 'England team performance'],
  },
  changed: {
    content:
      'Between group and knockout stages, shot volume remained similar but expected-goal quality declined (simulated). Defensive recoveries stayed stable, while final-third entries became more conservative against higher-ranked opponents.',
    sources: ['Match events', 'England team performance', 'Current report objects'],
  },
  attacking: {
    content:
      'England’s strongest attacking patterns were wide overloads into cutbacks and coordinated movements after regain. Set-piece delivery from the right created repeatable entries. Efficiency dropped when forced into low-percentage central shots in the final.',
    sources: ['Match events', 'Lineups and formations'],
  },
  compare: {
    content:
      'Compared with Spain (simulated), England averaged lower possession but similar shot volume in knockout matches. Spain created higher average chance quality; England relied more on transitional moments and set pieces.',
    sources: ['Team performance data', 'Women’s World Cup 2023 match data'],
  },
  briefing: {
    content:
      'Opponent briefing (simulated): Expect a compact mid-block, patient buildup, and threat from wide overloads and set pieces. Press triggers are most effective on lateral switches. Late-game shape becomes more conservative when protecting a lead.',
    sources: ['Analyst notes', 'England team performance', 'Lineups and formations'],
  },
  findings: {
    content:
      'Recommended additions: (1) group vs knockout chance-quality comparison, (2) set-piece contribution callout, (3) vulnerability note on half-space switches. I can pin any of these into the active report page.',
    sources: ['Current report objects', 'Match events'],
  },
};

export function resolveAiResponse(prompt: string) {
  const p = prompt.toLowerCase();
  if (p.includes('summarize') || p.includes('tournament performance')) return responses.summarize;
  if (p.includes('changed') || (p.includes('group') && p.includes('knockout'))) return responses.changed;
  if (p.includes('attack')) return responses.attacking;
  if (p.includes('compare') || p.includes('spain')) return responses.compare;
  if (p.includes('brief')) return responses.briefing;
  if (p.includes('finding') || p.includes('added')) return responses.findings;
  if (p.includes('group-stage') || p.includes('knockout-stage attacking')) {
    return {
      content:
        'Created a simulated comparison object: group-stage attacking volume and chance quality were higher than knockout-stage output, while possession remained relatively stable.',
      sources: ['England team performance', 'Match events'],
    };
  }
  return responses.default;
}

export const suggestedPrompts = [
  'Summarize England’s tournament performance.',
  'What changed between the group and knockout stages?',
  'Identify England’s strongest attacking patterns.',
  'Compare England’s performance with Spain.',
  'Create a concise opponent briefing.',
  'Which findings should be added to this report?',
];
