/**
 * Accessible team accent pairs for dual-team charts/widgets.
 * Values come from the Hello PC datavis palette (same light/dark) so contrast
 * stays readable on canvas surfaces — not literal kit hex that can fail AA.
 */
import { DATAVIS } from '../charts/datavis';
import { resolveCrestKey, type CrestKey } from './crests';

export type TeamAccent = {
  /** Primary fill / series color */
  primary: string;
  /** Softer companion for overlays / secondary series */
  soft: string;
  /** Short label for legends */
  label: string;
};

const TEAM_ACCENTS: Partial<Record<CrestKey, TeamAccent>> = {
  England: { primary: DATAVIS.indigo, soft: DATAVIS.blue, label: 'ENG' },
  Spain: { primary: DATAVIS.gold, soft: DATAVIS.amber, label: 'ESP' },
  Australia: { primary: DATAVIS.yellow, soft: DATAVIS.gold, label: 'AUS' },
  Sweden: { primary: DATAVIS.amber, soft: DATAVIS.yellow, label: 'SWE' },
  Japan: { primary: DATAVIS.blue, soft: DATAVIS.cyan, label: 'JPN' },
  'United States': { primary: DATAVIS.cyan, soft: DATAVIS.blue, label: 'USA' },
  USA: { primary: DATAVIS.cyan, soft: DATAVIS.blue, label: 'USA' },
  France: { primary: DATAVIS.indigo, soft: DATAVIS.purple, label: 'FRA' },
  Netherlands: { primary: DATAVIS.amber, soft: DATAVIS.red, label: 'NED' },
  Colombia: { primary: DATAVIS.gold, soft: DATAVIS.yellow, label: 'COL' },
  Switzerland: { primary: DATAVIS.red, soft: DATAVIS.pink, label: 'SUI' },
  Zambia: { primary: DATAVIS.jade, soft: DATAVIS.lime, label: 'ZAM' },
  'Costa Rica': { primary: DATAVIS.red, soft: DATAVIS.gold, label: 'CRC' },
};

const FALLBACK: TeamAccent = {
  primary: DATAVIS.indigo,
  soft: DATAVIS.cyan,
  label: 'TEAM',
};

export function teamAccent(team: string | undefined | null): TeamAccent {
  if (!team) return FALLBACK;
  const key = resolveCrestKey(team);
  return (key && TEAM_ACCENTS[key]) || FALLBACK;
}

/** Two-team contrast pair — swaps soft when primaries collide. */
export function teamPair(leftTeam: string, rightTeam: string) {
  const left = teamAccent(leftTeam);
  const right = teamAccent(rightTeam);
  if (left.primary === right.primary) {
    return {
      leftColor: left.primary,
      rightColor: right.soft !== left.primary ? right.soft : DATAVIS.cyan,
      left,
      right,
    };
  }
  return {
    leftColor: left.primary,
    rightColor: right.primary,
    left,
    right,
  };
}
