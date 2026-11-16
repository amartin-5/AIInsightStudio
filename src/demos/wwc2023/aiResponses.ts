import type { ChartProposal, ReportObject, ReportRecord } from '../../product/types';
import {
  australiaKpis,
  englandKpis,
  englandMatches,
  englandPlayers,
  finalMatchKpis,
  spainKpis,
} from './dataset';

type AiAnswer = {
  /** Short, demo-friendly plain-language reply shown in the bubble. */
  content: string;
  /** Deeper WWC 2023 grounding for the info popover. */
  detail?: string;
  sources: string[];
  chartProposal?: ChartProposal;
};

/** Snapshot of the open report so answers can cite the dashboard. */
export type AiReportContext = {
  name: string;
  team?: string;
  period?: string;
  templateType?: string;
  pageName?: string;
  objectTitles: string[];
  sourceLabels: string[];
  compareLeft?: string;
  compareRight?: string;
};

const WWC = 'FIFA Women’s World Cup 2023 (Australia & New Zealand)';
const SRC_MATCH = 'Women’s World Cup 2023 match data';
const SRC_TEAM = 'Team performance data';
const SRC_EVENTS = 'Match events';
const SRC_LINEUPS = 'Lineups and formations';
const SRC_PLAYER = 'Player performance data';
const SRC_NOTES = 'Analyst notes';

function kpiLine(items: Array<{ title: string; value: string; hint?: string }>, limit = 4) {
  return items
    .slice(0, limit)
    .map((k) => `${k.title} ${k.value}${k.hint ? ` (${k.hint})` : ''}`)
    .join('; ');
}

function englandPathSummary() {
  return englandMatches
    .map((m) => `${m.stage} vs ${m.opponent} ${m.result} (xG ${m.xg})`)
    .join(' → ');
}

function boardNote(ctx?: AiReportContext) {
  if (!ctx?.objectTitles.length) return '';
  return `Open page “${ctx.pageName ?? 'report'}” widgets: ${ctx.objectTitles.slice(0, 8).join(', ')}${ctx.objectTitles.length > 8 ? '…' : ''}.`;
}

function sourcesFor(ctx?: AiReportContext, extra: string[] = []) {
  const base = ctx?.sourceLabels?.length
    ? ctx.sourceLabels
    : [SRC_MATCH, SRC_TEAM, SRC_EVENTS];
  return Array.from(new Set([...extra, ...base]));
}

function answer(
  content: string,
  detail: string,
  sources: string[],
  chartProposal?: ChartProposal,
): AiAnswer {
  return { content, detail, sources, chartProposal };
}

function summarizeEngland(ctx?: AiReportContext): AiAnswer {
  return answer(
    'England finished as runners-up with five wins, one draw, and one loss across seven matches. Strengths included controlled possession phases and late-game adjustments. The clearest change was reduced chance quality after the group stage.',
    `${WWC}. Tournament KPIs: ${kpiLine(englandKpis, 5)}. Full path: ${englandPathSummary()}. Chance quality peaked vs China PR (6–1, xG 3.4) and fell in the Final vs Spain (0–1, England xG 0.9 vs Spain 1.8). ${boardNote(ctx)}`,
    sourcesFor(ctx, [SRC_MATCH, SRC_TEAM]),
  );
}

function summarizeAustralia(ctx?: AiReportContext): AiAnswer {
  return answer(
    'Australia’s host run showed strong early intensity and width, with a clear peak against Canada and a tougher semi-final against England where transitions hurt them late.',
    `${WWC}. Australia metrics: ${kpiLine(australiaKpis, 5)}. Peak: Group vs Canada 4–0. SF vs England 1–3 exposed rest-defense spacing after PPDA rose. ${boardNote(ctx)}`,
    sourcesFor(ctx, [SRC_MATCH, SRC_TEAM, SRC_PLAYER]),
  );
}

function summarizeSpain(ctx?: AiReportContext): AiAnswer {
  return answer(
    'Spain maintained high possession and structured chance creation, with efficient finishing in knockout matches — that profile carried them to the title.',
    `${WWC} champions. Spain metrics: ${kpiLine(spainKpis, 5)}. Final vs England (Sydney, 20 Aug 2023): Spain 1–0, winner at 86′ after England introduced width around 70′. ${boardNote(ctx)}`,
    sourcesFor(ctx, [SRC_MATCH, SRC_TEAM, SRC_EVENTS]),
  );
}

function summarizeKnockout(ctx?: AiReportContext): AiAnswer {
  return answer(
    'Knockout matches featured lower chance quality and tighter defensive spacing. Games were often decided late or on penalties.',
    `${WWC} KO stage: avg xG fell from ~2.1 (group) to ~1.4; clean sheets in 8/15 KO matches; three penalty shootouts including Australia–France. England KO path: Nigeria (pens), Colombia 2–1, Australia 3–1, Spain 0–1. ${boardNote(ctx)}`,
    sourcesFor(ctx, [SRC_MATCH, SRC_EVENTS]),
  );
}

function summarizeGeneric(ctx?: AiReportContext): AiAnswer {
  const team = ctx?.team?.toLowerCase();
  if (team === 'australia') return summarizeAustralia(ctx);
  if (team === 'spain') return summarizeSpain(ctx);
  if (ctx?.name.toLowerCase().includes('knockout') || ctx?.period?.toLowerCase().includes('knockout')) {
    return summarizeKnockout(ctx);
  }
  if (ctx?.name.toLowerCase().includes('player')) {
    return answer(
      'On this comparison board, Mercer leads finishing, Blake balances creation and progression, and Quinn anchors defensive actions — pick by opponent press style.',
      `${WWC} player board: ${englandPlayers.map((p) => `${p.label} — ${p.metric} in ${p.minutes}′`).join('; ')}. ${boardNote(ctx)}`,
      sourcesFor(ctx, [SRC_PLAYER, SRC_MATCH]),
    );
  }
  return summarizeEngland(ctx);
}

function groupVsKnockout(ctx?: AiReportContext): AiAnswer {
  const group = englandMatches.filter((m) => m.stage === 'Group');
  const ko = englandMatches.filter((m) => m.stage !== 'Group');
  const avg = (rows: typeof englandMatches) =>
    (rows.reduce((s, m) => s + Number(m.xg), 0) / rows.length).toFixed(1);
  return answer(
    'Between group and knockout stages, shot volume stayed similar but expected-goal quality declined. Defensive recoveries held up, while final-third entries got more conservative against stronger opponents.',
    `${WWC} England group avg xG ~${avg(group)} (Haiti, Denmark, China PR) vs knockout avg xG ~${avg(ko)} (Nigeria, Colombia, Australia, Spain). ${boardNote(ctx)}`,
    sourcesFor(ctx, [SRC_MATCH, SRC_EVENTS]),
    {
      chartId: 'england-group-knockout',
      title: 'England · group vs knockout attacking',
      caption: `${WWC}: England attacking volume and chance quality, group vs knockout.`,
    },
  );
}

function finalMatch(ctx?: AiReportContext): AiAnswer {
  return answer(
    'In the Final, England created fewer high-quality looks than Spain. Possession was close, but Spain’s late chance decided it.',
    `${WWC} Final — Spain 1–0 England. KPIs: ${kpiLine(finalMatchKpis)}. England 48% / 9 shots / 3 OT / xG 0.9; Spain 52% / 16 / 7 / 1.8. Events: yellow 29′, England width 70′, Spain goal 86′. ${boardNote(ctx)}`,
    sourcesFor(ctx, [SRC_MATCH, SRC_EVENTS, SRC_LINEUPS]),
  );
}

function compareSpain(ctx?: AiReportContext): AiAnswer {
  return answer(
    'Compared with Spain, England averaged lower possession but similar shot volume in knockout matches. Spain created higher average chance quality; England relied more on transitional moments and set pieces.',
    `${WWC}. England: ${kpiLine(englandKpis, 4)}. Spain: ${kpiLine(spainKpis, 4)}. Compare context: ${ctx?.compareLeft ?? 'England'} vs ${ctx?.compareRight ?? 'Spain'}. Final was Spain 1–0. ${boardNote(ctx)}`,
    sourcesFor(ctx, [SRC_MATCH, SRC_TEAM]),
  );
}

function attackingPatterns(ctx?: AiReportContext): AiAnswer {
  return answer(
    'England’s strongest attacking patterns were wide overloads into cutbacks and coordinated movements after regain. Set-piece delivery from the right created repeatable entries. Efficiency dropped when forced into low-percentage central shots in the Final.',
    `${WWC} attack detail: best open-play volume vs China PR and Australia; Final open-play xG stayed under 0.5 against Spain’s mid-block. See shot map, xG timeline, and factor bars on the opponent board. ${boardNote(ctx)}`,
    sourcesFor(ctx, [SRC_EVENTS, SRC_LINEUPS, SRC_MATCH]),
  );
}

function opponentBriefing(ctx?: AiReportContext): AiAnswer {
  return answer(
    'Opponent briefing: Expect a compact mid-block, patient buildup, and threat from wide overloads and set pieces. Press triggers are most effective on lateral switches. Late-game shape becomes more conservative when protecting a lead.',
    `${WWC} Spain brief: half-space combinations over high cross volume; still created the higher-quality 86′ look in the Final. Use scoreboard, KPIs, and momentum widgets as the live brief. ${boardNote(ctx)}`,
    sourcesFor(ctx, [SRC_NOTES, SRC_TEAM, SRC_LINEUPS, SRC_MATCH]),
  );
}

function playersAnswer(ctx?: AiReportContext): AiAnswer {
  return answer(
    'Key England players on this board cover finishing, progression, and defensive anchoring — useful for role-fit conversations before the next matchup.',
    `${WWC}: ${englandPlayers.map((p) => `${p.label} (${p.position}) — ${p.metric}, ${p.minutes}′, ${p.observation}`).join(' ')} ${boardNote(ctx)}`,
    sourcesFor(ctx, [SRC_PLAYER, SRC_MATCH]),
  );
}

function explainObject(prompt: string, ctx?: AiReportContext): AiAnswer | null {
  const m = prompt.match(/explain.*?[“"](.+?)[”"]/i) || prompt.match(/for\s+[“"](.+?)[”"]/i);
  const title = m?.[1]?.trim();
  if (!title) return null;
  const lower = title.toLowerCase();
  if (lower.includes('score') || lower.includes('spain vs') || lower.includes('final')) {
    return finalMatch(ctx);
  }
  if (lower.includes('kpi') || lower.includes('metric')) {
    return answer(
      `“${title}” is tracking the live match and tournament metrics on this board. Chance quality and shape shifts are the story to watch.`,
      `${WWC}. Final-match KPIs: ${kpiLine(finalMatchKpis)}. Tournament England KPIs: ${kpiLine(englandKpis, 4)}. ${boardNote(ctx)}`,
      sourcesFor(ctx, [SRC_MATCH, SRC_TEAM]),
    );
  }
  if (lower.includes('player') || lower.includes('spotlight')) return playersAnswer(ctx);
  return answer(
    `Here’s a quick read on “${title}” from this report — I can also summarize the tournament, compare with Spain, or walk the Final metrics if you want to go deeper.`,
    `${WWC}. Object “${title}” on “${ctx?.name ?? 'this report'}”. ${boardNote(ctx)} Sources: ${(ctx?.sourceLabels ?? [SRC_MATCH]).slice(0, 4).join(', ')}.`,
    sourcesFor(ctx),
  );
}

function chartProposal(ctx?: AiReportContext): AiAnswer {
  return answer(
    'Here’s a chart of England’s goals across their Women’s World Cup 2023 matches. Add it to a selected canvas slot.',
    `${WWC}. Series follows Haiti → Denmark → China PR → Nigeria → Colombia → Australia → Spain from match data. ${boardNote(ctx)}`,
    sourcesFor(ctx, [SRC_MATCH, SRC_TEAM]),
    {
      chartId: 'england-goals-bar',
      title: 'England goals by match · WWC 2023',
      caption: `${WWC}: England goals scored across seven tournament matches.`,
    },
  );
}

function capabilities(ctx?: AiReportContext): AiAnswer {
  return answer(
    'I can summarize this report, compare England with Spain, call out group-to-knockout changes, brief an opponent, or propose charts for the canvas. Ask in plain language — I’ll keep the answer short.',
    `${WWC} demo scope for “${ctx?.name ?? 'Untitled'}”. ${boardNote(ctx)} I stay on tournament match, team, event, and player sources only.`,
    sourcesFor(ctx),
  );
}

function findings(ctx?: AiReportContext): AiAnswer {
  return answer(
    'Recommended additions: (1) group vs knockout chance-quality comparison, (2) set-piece contribution callout, (3) vulnerability note on half-space switches. I can pin any of these into the active report page.',
    `${WWC}. England group avg xG was higher than knockout; Final open-play xG stayed under 0.5; Australia SF and Spain Final both punished half-space switches. ${boardNote(ctx)}`,
    sourcesFor(ctx, [SRC_EVENTS, SRC_MATCH]),
  );
}

function dataAnalysis(ctx?: AiReportContext): AiAnswer {
  return answer(
    'Executive summary: possession and chance quality tell different stories across this matchup. The higher-possession side controlled tempo, while transitional looks and set pieces were the clearest swing factors.',
    `${WWC}. Spain ~63% tournament possession / Final 52%; England’s best KO xG spike was Australia SF (2.1); Spain’s 86′ winner decided the Final. ${boardNote(ctx)}`,
    sourcesFor(ctx, [SRC_EVENTS, SRC_TEAM, SRC_MATCH]),
  );
}

function buildContextFromReport(report: ReportRecord, pageId?: string): AiReportContext {
  const page = report.pages.find((p) => p.id === pageId) ?? report.pages[0];
  return {
    name: report.name,
    team: report.team,
    period: report.period,
    templateType: report.templateType,
    pageName: page?.name,
    objectTitles: (page?.objects ?? []).map((o: ReportObject) => o.title),
    sourceLabels: report.sourceLabels,
    compareLeft: report.compare?.leftTeam,
    compareRight: report.compare?.rightTeam,
  };
}

/**
 * Demo AI resolver — plain-language bubble copy, with WWC 2023 detail
 * available via the answer info control.
 */
export function resolveAiResponse(prompt: string, ctx?: AiReportContext): AiAnswer {
  const p = prompt.toLowerCase();

  const explained = explainObject(prompt, ctx);
  if (explained) return explained;

  if (
    p.includes('what can you') ||
    p.includes('what do you') ||
    p.includes('tell me more about what you can') ||
    (p.includes('help me') && p.includes('do'))
  ) {
    return capabilities(ctx);
  }

  if (
    p.includes('bar chart') ||
    p.includes('wins by country') ||
    p.includes('generate a chart') ||
    p.includes('goals by match') ||
    (p.includes('chart') && (p.includes('win') || p.includes('tournament') || p.includes('goal')))
  ) {
    return chartProposal(ctx);
  }

  if (p.includes('final') && (p.includes('spain') || p.includes('match') || p.includes('metric'))) {
    return finalMatch(ctx);
  }

  if (p.includes('australia') || p.includes('matilda')) return summarizeAustralia(ctx);
  if (p.includes('player') || p.includes('mercer') || p.includes('blake') || p.includes('quinn')) {
    return playersAnswer(ctx);
  }
  if (p.includes('summarize') || p.includes('tournament performance') || p.includes('overview')) {
    return summarizeGeneric(ctx);
  }
  if (p.includes('knockout') && !p.includes('group')) return summarizeKnockout(ctx);
  if (p.includes('changed') || (p.includes('group') && p.includes('knockout'))) {
    return groupVsKnockout(ctx);
  }
  if (p.includes('group-stage') || p.includes('knockout-stage attacking')) {
    return groupVsKnockout(ctx);
  }
  if (p.includes('attack')) return attackingPatterns(ctx);
  if (p.includes('compare') || p.includes('spain') || p.includes('versus') || p.includes('vs spain')) {
    return compareSpain(ctx);
  }
  if (p.includes('brief') || p.includes('opponent')) return opponentBriefing(ctx);
  if (p.includes('finding') || p.includes('added') || p.includes('recommend')) return findings(ctx);
  if (p.includes('data analysis') || p.includes('total metrics') || p.includes('executive')) {
    return dataAnalysis(ctx);
  }

  return answer(
    'Based on the selected sources, England showed structured buildup and adaptable shape across the tournament. Chance quality was strongest in the group stage and declined in knockout matches, while defensive organization remained comparatively stable.',
    `${WWC}. ${kpiLine(englandKpis, 4)}. Path: ${englandPathSummary()}. ${boardNote(ctx)}`,
    sourcesFor(ctx, [SRC_MATCH, SRC_TEAM, SRC_EVENTS]),
  );
}

export function contextFromReport(report: ReportRecord, pageId?: string): AiReportContext {
  return buildContextFromReport(report, pageId);
}

export const suggestedPrompts = [
  'Summarize this report',
  'What changed in knockout matches?',
  'Compare with Spain',
];

export const builderSuggestedPrompts = [
  'Generate a chart',
  'Show me England goals by match',
  'Tell me more about what you can do.',
];

export const blankReportGreeting =
  'Hi! I can help find charts and insights from the Women’s World Cup 2023. What would you like to explore?';

export const customAiBuildGreeting =
  'Let’s build your dashboard together. Tell me what you want to see — match trends, player form, opponent scouting — or add widgets from the library. You can leave anything unfinished and open the board when you’re ready.';
