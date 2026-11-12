import australiaCrest from '../../assets/crests/australia.svg';
import colombiaCrest from '../../assets/crests/colombia.svg';
import costaRicaCrest from '../../assets/crests/costa-rica.svg';
import englandCrest from '../../assets/crests/england.png';
import franceCrest from '../../assets/crests/france.svg';
import japanCrest from '../../assets/crests/japan.svg';
import netherlandsCrest from '../../assets/crests/netherlands.png';
import spainCrest from '../../assets/crests/spain.png';
import swedenCrest from '../../assets/crests/sweden.svg';
import switzerlandCrest from '../../assets/crests/switzerland.svg';
import unitedStatesCrest from '../../assets/crests/united-states.svg';
import zambiaCrest from '../../assets/crests/zambia.svg';

/** Teams with crest artwork available in the app. */
export type CrestKey =
  | 'Australia'
  | 'Colombia'
  | 'Costa Rica'
  | 'England'
  | 'France'
  | 'Japan'
  | 'Netherlands'
  | 'Spain'
  | 'Sweden'
  | 'Switzerland'
  | 'United States'
  | 'USA'
  | 'Zambia';

const CREST_ASSETS: Record<CrestKey, string> = {
  Australia: australiaCrest,
  Colombia: colombiaCrest,
  'Costa Rica': costaRicaCrest,
  England: englandCrest,
  France: franceCrest,
  Japan: japanCrest,
  Netherlands: netherlandsCrest,
  Spain: spainCrest,
  Sweden: swedenCrest,
  Switzerland: switzerlandCrest,
  'United States': unitedStatesCrest,
  USA: unitedStatesCrest,
  Zambia: zambiaCrest,
};

const ALIASES: Record<string, CrestKey> = {
  aus: 'Australia',
  australia: 'Australia',
  col: 'Colombia',
  colombia: 'Colombia',
  crc: 'Costa Rica',
  'costa rica': 'Costa Rica',
  eng: 'England',
  england: 'England',
  fra: 'France',
  france: 'France',
  jpn: 'Japan',
  japan: 'Japan',
  ned: 'Netherlands',
  nederland: 'Netherlands',
  netherlands: 'Netherlands',
  esp: 'Spain',
  spain: 'Spain',
  swe: 'Sweden',
  sweden: 'Sweden',
  sui: 'Switzerland',
  switzerland: 'Switzerland',
  usa: 'USA',
  us: 'USA',
  'united states': 'United States',
  'u.s.': 'USA',
  'u.s.a.': 'USA',
  zam: 'Zambia',
  zambia: 'Zambia',
};

const SHORT_CODES: Record<string, string> = {
  Australia: 'AUS',
  Colombia: 'COL',
  'Costa Rica': 'CRC',
  England: 'ENG',
  France: 'FRA',
  Japan: 'JPN',
  Netherlands: 'NED',
  Spain: 'ESP',
  Sweden: 'SWE',
  Switzerland: 'SUI',
  'United States': 'USA',
  USA: 'USA',
  Zambia: 'ZAM',
};

export function resolveCrestKey(team?: string | null): CrestKey | null {
  if (!team) return null;
  const trimmed = team.trim();
  if (!trimmed) return null;
  if (trimmed in CREST_ASSETS) return trimmed as CrestKey;

  const lower = trimmed.toLowerCase();
  const exact = ALIASES[lower];
  if (exact) return exact;

  // Match labels like "England shots" / "Spain possession".
  const aliases = Object.keys(ALIASES).sort((a, b) => b.length - a.length);
  for (const alias of aliases) {
    if (lower.startsWith(`${alias} `) || lower.startsWith(`${alias}·`) || lower.startsWith(`${alias}-`)) {
      return ALIASES[alias];
    }
  }
  return null;
}

export function getCrestSrc(team?: string | null): string | null {
  const key = resolveCrestKey(team);
  return key ? CREST_ASSETS[key] : null;
}

export function getTeamShortCode(team?: string | null): string {
  if (!team) return '??';
  const key = resolveCrestKey(team);
  if (key) return SHORT_CODES[key] ?? key.slice(0, 3).toUpperCase();
  const letters = team.replace(/[^A-Za-z]/g, '');
  return (letters.slice(0, 3) || team.slice(0, 3)).toUpperCase();
}

export function hasCrest(team?: string | null): boolean {
  return getCrestSrc(team) !== null;
}
