import styled from 'styled-components';
import { Dropdown } from '@cake-admin/cakeand';

export type MatchFilters = {
  confederation: string;
  tournament: string;
  year: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
};

type Props = {
  value: MatchFilters;
  onChange: (next: MatchFilters) => void;
};

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--space-200);
  min-width: 0;
  padding: var(--space-300) var(--space-400);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-1);
`;

const Vs = styled.span`
  align-self: center;
  padding-bottom: var(--space-100);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
`;

const Field = styled.div`
  flex: 1 1 120px;
  min-width: 110px;
  max-width: 180px;
`;

export const DEFAULT_MATCH_FILTERS: MatchFilters = {
  confederation: 'uefa',
  tournament: 'wwc',
  year: '2023',
  homeTeam: 'sco',
  awayTeam: 'eng',
  date: '2023-08-16',
};

/** Compact match-context filter strip for custom report canvases. */
export function MatchFilterBar({ value, onChange }: Props) {
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
          options={[
            { label: 'World Cup', value: 'wwc' },
            { label: 'Euro', value: 'euro' },
            { label: 'Friendly', value: 'friendly' },
          ]}
        />
      </Field>
      <Field>
        <Dropdown
          label="Year"
          value={value.year}
          onValueChange={(v) => patch('year', v)}
          options={[
            { label: '2023', value: '2023' },
            { label: '2022', value: '2022' },
            { label: '2019', value: '2019' },
          ]}
        />
      </Field>
      <Field>
        <Dropdown
          label="Home"
          value={value.homeTeam}
          onValueChange={(v) => patch('homeTeam', v)}
          options={[
            { label: 'Scotland', value: 'sco' },
            { label: 'England', value: 'eng' },
            { label: 'Spain', value: 'esp' },
            { label: 'Australia', value: 'aus' },
          ]}
        />
      </Field>
      <Vs aria-hidden>vs</Vs>
      <Field>
        <Dropdown
          label="Away"
          value={value.awayTeam}
          onValueChange={(v) => patch('awayTeam', v)}
          options={[
            { label: 'England', value: 'eng' },
            { label: 'Scotland', value: 'sco' },
            { label: 'Spain', value: 'esp' },
            { label: 'Australia', value: 'aus' },
          ]}
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
