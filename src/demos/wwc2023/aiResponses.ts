import type { ChartProposal } from '../../product/types';

type AiAnswer = {
  content: string;
  sources: string[];
  chartProposal?: ChartProposal;
};

const responses: Record<string, AiAnswer> = {
  default: {
    content:
      'Based on the selected sources, England showed structured buildup and adaptable shape across the tournament. Chance quality was strongest in the group stage and declined in knockout matches, while defensive organization remained comparatively stable.',
    sources: [
      'Women’s World Cup 2023 match data',
      'England team performance',
      'Match events',
    ],
  },
  summarize: {
    content:
      'England finished as runners-up with five wins, one draw, and one loss across seven matches. Strengths included controlled possession phases and late-game adjustments. The clearest change was reduced chance quality after the group stage.',
    sources: ['Women’s World Cup 2023 match data', 'England team performance'],
  },
  changed: {
    content:
      'Between group and knockout stages, shot volume remained similar but expected-goal quality declined. Defensive recoveries stayed stable, while final-third entries became more conservative against higher-ranked opponents.',
    sources: ['Match events', 'England team performance', 'Current report objects'],
  },
  attacking: {
    content:
      'England’s strongest attacking patterns were wide overloads into cutbacks and coordinated movements after regain. Set-piece delivery from the right created repeatable entries. Efficiency dropped when forced into low-percentage central shots in the final.',
    sources: ['Match events', 'Lineups and formations'],
  },
  compare: {
    content:
      'Compared with Spain, England averaged lower possession but similar shot volume in knockout matches. Spain created higher average chance quality; England relied more on transitional moments and set pieces.',
    sources: ['Team performance data', 'Women’s World Cup 2023 match data'],
  },
  briefing: {
    content:
      'Opponent briefing: Expect a compact mid-block, patient buildup, and threat from wide overloads and set pieces. Press triggers are most effective on lateral switches. Late-game shape becomes more conservative when protecting a lead.',
    sources: ['Analyst notes', 'England team performance', 'Lineups and formations'],
  },
  findings: {
    content:
      'Recommended additions: (1) group vs knockout chance-quality comparison, (2) set-piece contribution callout, (3) vulnerability note on half-space switches. I can pin any of these into the active report page.',
    sources: ['Current report objects', 'Match events'],
  },
};

export function resolveAiResponse(prompt: string): AiAnswer {
  const p = prompt.toLowerCase();
  if (
    p.includes('bar chart') ||
    p.includes('wins by country') ||
    p.includes('generate a chart') ||
    (p.includes('chart') && (p.includes('win') || p.includes('tournament')))
  ) {
    return {
      content: 'Here’s a chart of tournament wins by country. Add it to a selected canvas slot.',
      sources: ['Women’s World Cup historical results', 'Team performance data'],
      chartProposal: {
        chartId: 'england-goals-bar',
        title: 'Tournament wins by country',
        caption: 'This graph shows the number of tournaments won by each country.',
      },
    };
  }
  if (p.includes('summarize') || p.includes('tournament performance')) return responses.summarize;
  if (p.includes('changed') || (p.includes('group') && p.includes('knockout'))) return responses.changed;
  if (p.includes('attack')) return responses.attacking;
  if (p.includes('compare') || p.includes('spain')) return responses.compare;
  if (p.includes('brief')) return responses.briefing;
  if (p.includes('finding') || p.includes('added')) return responses.findings;
  if (p.includes('data analysis') || p.includes('total metrics')) {
    return {
      content:
        'Executive summary: possession and chance quality tell different stories across this matchup. The higher-possession side controlled tempo, while the counter-attacking side converted fewer but higher-quality looks. Set pieces remain the clearest swing factor.',
      sources: ['Match events', 'Team performance data'],
    };
  }
  if (p.includes('group-stage') || p.includes('knockout-stage attacking')) {
    return {
      content:
        'Created a comparison object: group-stage attacking volume and chance quality were higher than knockout-stage output, while possession remained relatively stable.',
      sources: ['England team performance', 'Match events'],
      chartProposal: {
        chartId: 'england-group-knockout',
        title: 'AI-created comparison',
        caption: 'Group-stage vs knockout-stage attacking performance.',
      },
    };
  }
  return responses.default;
}

export const suggestedPrompts = [
  'Summarize this report',
  'What changed in knockout matches?',
  'Compare with Spain',
];

export const builderSuggestedPrompts = [
  'Generate a chart',
  'Show me a bar chart of World Cup wins by country.',
  'Tell me more about what you can do.',
];
