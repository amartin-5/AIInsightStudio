import styled from 'styled-components';
import { Dropdown } from '@cake-admin/cakeand';

/** Match scope used to seed and refresh custom / AI dashboards. */
export type MatchContext = {
  tournament: string;
  year: string;
  homeTeam: string;
  /** Empty string when opponent is not set (optional). */
  awayTeam: string;
};

export type MatchFilters = MatchContext & {
  confederation: string;
  date: string;
};

type FieldsProps = {
  value: MatchContext;
  onChange: (next: MatchContext) => void;
  /** When true, away can be cleared; create flow uses this. */
  awayOptional?: boolean;
};

type BarProps = {
  value: MatchFilters;
  onChange: (next: MatchFilters) => void;
};

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--space-200);
  min-width: 0;
  padding: var(--space-300) var(--space-400);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-1);
`;

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-400) var(--space-300);
  align-items: start;
  width: 100%;
  min-width: 0;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

/** Sits beside the control, below the shared label row. */
const Vs = styled.span`
  align-self: start;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  /* Label line + gap between label and control */
  padding-top: calc(var(--type-size-caption) + var(--space-200));
`;

const Field = styled.div`
  min-width: 0;
  width: 100%;
`;

const VsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--space-200);
  align-items: start;
  grid-column: 1 / -1;
  width: 100%;
  min-width: 0;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    gap: var(--space-300);

    ${Vs} {
      display: none;
    }
  }
`;

export const TOURNAMENT_OPTIONS = [
  { label: 'World Cup', value: 'wwc' },
  { label: 'Euro', value: 'euro' },
  { label: 'Friendly', value: 'friendly' },
];

export const YEAR_OPTIONS = [
  { label: '2023', value: '2023' },
  { label: '2022', value: '2022' },
  { label: '2019', value: '2019' },
];

export const TEAM_OPTIONS = [
  { label: 'Scotland', value: 'sco' },
  { label: 'England', value: 'eng' },
  { label: 'Spain', value: 'esp' },
  { label: 'Australia', value: 'aus' },
];

/** Extra explore / fixture names → codes (beyond create-flow TEAM_OPTIONS). */
const TEAM_NAME_TO_CODE: Record<string, string> = {
  england: 'eng',
  spain: 'esp',
  australia: 'aus',
  scotland: 'sco',
  sweden: 'swe',
  netherlands: 'ned',
  japan: 'jpn',
  france: 'fra',
  'united states': 'usa',
  usa: 'usa',
  colombia: 'col',
  nigeria: 'nga',
  denmark: 'den',
  norway: 'nor',
  germany: 'ger',
  brazil: 'bra',
  canada: 'can',
  china: 'chn',
  italy: 'ita',
  'south africa': 'rsa',
  morocco: 'mar',
  jamaica: 'jam',
  haiti: 'hai',
  'costa rica': 'crc',
  switzerland: 'sui',
  portugal: 'por',
  'new zealand': 'nzl',
  philippines: 'phi',
  ireland: 'irl',
  wales: 'wal',
  'arsenal wfc': 'ars',
  arsenal: 'ars',
  'barcelona femení': 'bar',
  'barcelona femenì': 'bar',
  barcelona: 'bar',
  'olympique lyonnais féminin': 'ol',
  'olympique lyonnais feminines': 'ol',
  lyon: 'ol',
  'chelsea women': 'che',
  chelsea: 'che',
};

const EXTRA_CODE_LABELS: Record<string, string> = {
  eng: 'England',
  esp: 'Spain',
  aus: 'Australia',
  sco: 'Scotland',
  swe: 'Sweden',
  ned: 'Netherlands',
  jpn: 'Japan',
  fra: 'France',
  usa: 'United States',
  col: 'Colombia',
  nga: 'Nigeria',
  den: 'Denmark',
  nor: 'Norway',
  ger: 'Germany',
  bra: 'Brazil',
  can: 'Canada',
  chn: 'China',
  ita: 'Italy',
  rsa: 'South Africa',
  mar: 'Morocco',
  jam: 'Jamaica',
  hai: 'Haiti',
  crc: 'Costa Rica',
  sui: 'Switzerland',
  por: 'Portugal',
  nzl: 'New Zealand',
  phi: 'Philippines',
  irl: 'Ireland',
  wal: 'Wales',
  ars: 'Arsenal WFC',
  bar: 'Barcelona Femení',
  ol: 'Olympique Lyonnais Féminin',
  che: 'Chelsea Women',
};

export const DEFAULT_MATCH_CONTEXT: MatchContext = {
  tournament: '',
  year: '',
  homeTeam: '',
  awayTeam: '',
};

/** Legacy defaults for demos that still need a full filter strip. */
export const DEFAULT_MATCH_FILTERS: MatchFilters = {
  confederation: 'uefa',
  tournament: 'wwc',
  year: '2023',
  homeTeam: 'sco',
  awayTeam: 'eng',
  date: '2023-08-16',
};

/** Map a crest / opponent display name to a match-context team code. */
export function teamLabelToCode(label: string): string {
  const key = label.trim().toLowerCase();
  if (!key) return '';
  const fromOptions = TEAM_OPTIONS.find((t) => t.label.toLowerCase() === key);
  if (fromOptions) return fromOptions.value;
  if (TEAM_NAME_TO_CODE[key]) return TEAM_NAME_TO_CODE[key];
  const compact = key.replace(/[^a-z0-9]/g, '');
  return compact.slice(0, 3) || 'unk';
}

/** Build match scope from an Explore past-match row. */
export function matchContextFromExplore(
  homeLabel: string,
  match: { opponent: string; competition: string; date: string },
): MatchContext {
  const yearHit = `${match.date} ${match.competition}`.match(/\b(20\d{2})\b/);
  const year = yearHit?.[1] ?? '2023';
  const competition = match.competition.toLowerCase();
  const tournament = /wwc|world cup/.test(competition)
    ? 'wwc'
    : /euro/.test(competition)
      ? 'euro'
      : 'friendly';
  return {
    tournament,
    year,
    homeTeam: teamLabelToCode(homeLabel),
    awayTeam: teamLabelToCode(match.opponent),
  };
}

export function teamCodeLabel(code: string): string {
  if (!code) return '—';
  const hit = TEAM_OPTIONS.find((t) => t.value === code);
  if (hit) return hit.label;
  return EXTRA_CODE_LABELS[code] ?? code.toUpperCase();
}

export function teamCodeShort(code: string): string {
  if (!code) return '—';
  return code.toUpperCase();
}

export function tournamentLabel(value: string): string {
  return TOURNAMENT_OPTIONS.find((t) => t.value === value)?.label ?? value;
}

export function isMatchContextComplete(value: MatchContext): boolean {
  return Boolean(value.tournament && value.year && value.homeTeam);
}

export function formatMatchContextSummary(value: MatchContext): string {
  const home = teamCodeLabel(value.homeTeam);
  const away = value.awayTeam ? teamCodeLabel(value.awayTeam) : null;
  const match = away ? `${home} vs ${away}` : home;
  const tournament = tournamentLabel(value.tournament);
  return [tournament, value.year, match].filter(Boolean).join(' · ');
}

/**
 * Required match scope fields: Tournament, Year, Home; Away optional.
 */
export function MatchContextFields({ value, onChange, awayOptional = true }: FieldsProps) {
  const patch = (key: keyof MatchContext, next: string) => onChange({ ...value, [key]: next });

  const awayOptions = awayOptional
    ? [{ label: 'Any / optional', value: '' }, ...TEAM_OPTIONS]
    : TEAM_OPTIONS;

  return (
    <FieldsGrid aria-label="Match context">
      <Field>
        <Dropdown
          label="Tournament"
          required
          value={value.tournament}
          placeholder="Select tournament"
          onValueChange={(v) => patch('tournament', v)}
          options={TOURNAMENT_OPTIONS}
        />
      </Field>
      <Field>
        <Dropdown
          label="Year"
          required
          value={value.year}
          placeholder="Select year"
          onValueChange={(v) => patch('year', v)}
          options={YEAR_OPTIONS}
        />
      </Field>
      <VsRow>
        <Field>
          <Dropdown
            label="Home"
            required
            value={value.homeTeam}
            placeholder="Select home team"
            onValueChange={(v) => patch('homeTeam', v)}
            options={TEAM_OPTIONS}
          />
        </Field>
        <Vs aria-hidden>vs</Vs>
        <Field>
          <Dropdown
            label="Away"
            value={value.awayTeam}
            placeholder={awayOptional ? 'Optional' : 'Select away team'}
            onValueChange={(v) => patch('awayTeam', v)}
            options={awayOptions}
          />
        </Field>
      </VsRow>
    </FieldsGrid>
  );
}

/** Compact match-context filter strip (legacy full set). Prefer MatchContextFields. */
export function MatchFilterBar({ value, onChange }: BarProps) {
  const patch = (key: keyof MatchFilters, next: string) =>
    onChange({ ...value, [key]: next });

  return (
    <Bar aria-label="Match filters">
      <Field>
        <Dropdown
          label="Confederation"
          value={value.confederation}
          onValueChange={(v) => patch('confederation', v)}
          options={[
            { label: 'UEFA', value: 'uefa' },
            { label: 'CONMEBOL', value: 'conmebol' },
            { label: 'AFC', value: 'afc' },
            { label: 'CAF', value: 'caf' },
            { label: 'CONCACAF', value: 'concacaf' },
          ]}
        />
      </Field>
      <Field>
        <Dropdown
          label="Tournament"
          value={value.tournament}
          onValueChange={(v) => patch('tournament', v)}
          options={TOURNAMENT_OPTIONS}
        />
      </Field>
      <Field>
        <Dropdown
          label="Year"
          value={value.year}
          onValueChange={(v) => patch('year', v)}
          options={YEAR_OPTIONS}
        />
      </Field>
      <Field>
        <Dropdown
          label="Home"
          value={value.homeTeam}
          onValueChange={(v) => patch('homeTeam', v)}
          options={TEAM_OPTIONS}
        />
      </Field>
      <Vs aria-hidden>vs</Vs>
      <Field>
        <Dropdown
          label="Away"
          value={value.awayTeam}
          onValueChange={(v) => patch('awayTeam', v)}
          options={TEAM_OPTIONS}
        />
      </Field>
      <Field>
        <Dropdown
          label="Date"
          value={value.date}
          onValueChange={(v) => patch('date', v)}
          options={[
            { label: '16 Aug 2023', value: '2023-08-16' },
            { label: '20 Aug 2023', value: '2023-08-20' },
            { label: '11 Jun 2025', value: '2025-06-11' },
          ]}
        />
      </Field>
    </Bar>
  );
}
