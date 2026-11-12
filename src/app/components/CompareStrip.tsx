import { Dropdown } from '@cake-admin/cakeand';
import { Columns2 } from 'lucide-react';
import styled from 'styled-components';

import { TeamCrest } from '../../product/teams/TeamCrest';
import { useAppState } from '../AppState';
import { BodyText, MetaRow, Muted, Strong } from '../ui.styles';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-500);
  min-width: 0;
`;

const VersusRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: var(--space-300);
  align-items: end;
  min-width: 0;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-200);
  min-width: 0;
`;

const SideHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-150);
  min-width: 0;
`;

const Versus = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-bottom: var(--space-200);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.04em;
  text-transform: uppercase;

  @media (max-width: 640px) {
    padding-bottom: 0;
    justify-self: center;
  }
`;

/**
 * Team / period selectors for the compare overlay.
 */
export function CompareForm() {
  const { activeReport, config, setCompareContext } = useAppState();
  const compare = activeReport?.compare;
  if (!compare) return null;

  const teamOptions = config.teams.map((team) => ({ label: team, value: team }));
  const periodOptions = config.periods.map((period) => ({ label: period, value: period }));

  return (
    <Form aria-label="Compare settings">
      <MetaRow>
        <Columns2 size={16} aria-hidden />
        <BodyText>Pick two sides to compare in this report.</BodyText>
      </MetaRow>

      <VersusRow>
        <Side>
          <SideHeader>
            <TeamCrest team={compare.leftTeam} size="sm" />
            <Strong>Left</Strong>
          </SideHeader>
          <Dropdown
            label="Team"
            value={compare.leftTeam}
            onValueChange={(value) => setCompareContext({ leftTeam: value })}
            options={teamOptions}
          />
          <Dropdown
            label="Period"
            value={compare.leftPeriod ?? config.periods[0]}
            onValueChange={(value) => setCompareContext({ leftPeriod: value })}
            options={periodOptions}
          />
        </Side>

        <Versus aria-hidden>vs</Versus>

        <Side>
          <SideHeader>
            <TeamCrest team={compare.rightTeam} size="sm" />
            <Strong>Right</Strong>
          </SideHeader>
          <Dropdown
            label="Team"
            value={compare.rightTeam}
            onValueChange={(value) => setCompareContext({ rightTeam: value })}
            options={teamOptions}
          />
          <Dropdown
            label="Period"
            value={compare.rightPeriod ?? config.periods[0]}
            onValueChange={(value) => setCompareContext({ rightPeriod: value })}
            options={periodOptions}
          />
        </Side>
      </VersusRow>

      <Muted>
        {compare.leftTeam} · {compare.leftPeriod ?? 'All periods'} vs {compare.rightTeam} ·{' '}
        {compare.rightPeriod ?? 'All periods'}
      </Muted>
    </Form>
  );
}

/** @deprecated Prefer CompareForm inside the compare modal. */
export const CompareStrip = CompareForm;
