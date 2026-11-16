import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Badge, Button, Chip } from '@cake-admin/cakeand';
import { Pencil, Swords } from 'lucide-react';

import {
  DEFAULT_MATCH_CONTEXT,
  formatMatchContextSummary,
  tournamentLabel,
} from '../../product/builder';
import type { ReportRecord } from '../../product/types';
import { TeamCrest } from '../../product/teams/TeamCrest';
import { ICON_SIZE } from '../../iconSize';
import { ActionRow, Muted } from '../ui.styles';

const Shell = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-300) var(--space-400);
  flex: none;
  padding: var(--space-350) var(--space-400);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  background:
    linear-gradient(
      135deg,
      var(--color-surfaces-primary) 0%,
      var(--color-tonal-tonal-lightest) 48%,
      var(--color-surfaces-container-blur-high) 100%
    );
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  min-width: 0;
`;

const Identity = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--space-300);
  min-width: 0;
  flex: 1 1 16rem;
`;

const CrestWell = styled.div`
  flex: none;
  display: grid;
  place-items: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: var(--radius-200);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-1);
  border: var(--stroke-100) solid var(--color-stroke-border-low);
`;

const CopyStack = styled.div`
  display: grid;
  gap: var(--space-150);
  min-width: 0;
  flex: 1 1 auto;
`;

const Title = styled.h1`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-title);
  font-weight: var(--font-weight-bold);
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MetaStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-150);
  min-width: 0;
`;

const MatchPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--space-100);
  max-width: 100%;
  padding: var(--space-050) var(--space-150);
  border-radius: var(--radius-1000);
  background: var(--color-tonal-tonal-overlay);
  color: var(--color-text-icon-on-tonal);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
  line-height: 1.3;
`;

const MatchText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-100);
  align-items: center;
  min-width: 0;
`;

const Actions = styled(ActionRow)`
  flex: 0 1 auto;
  justify-content: flex-end;
  padding-top: var(--space-050);
`;

type Props = {
  report: ReportRecord;
  /** Crest / home team display name. */
  team?: string;
  statusLabel?: string;
  competitionLabel?: string;
  editMode?: boolean;
  detailsOpen: boolean;
  onEditSelections: () => void;
  actions: ReactNode;
};

/**
 * Modern report chrome: crest + title + colored meta strip, with actions on the right.
 */
export function ReportDashboardHeader({
  report,
  team,
  statusLabel,
  competitionLabel,
  editMode = false,
  detailsOpen,
  onEditSelections,
  actions,
}: Props) {
  const status = statusLabel ?? report.status;
  const tags = report.tags ?? [];
  const matchContext = report.matchContext ?? DEFAULT_MATCH_CONTEXT;
  const matchSummary = matchContext.tournament
    ? formatMatchContextSummary(matchContext)
    : '';
  const crestTeam = team || report.team || '';
  const tournament =
    matchContext.tournament && !matchSummary
      ? tournamentLabel(matchContext.tournament)
      : competitionLabel;

  return (
    <Shell aria-label="Dashboard header">
      <Identity>
        {crestTeam ? (
          <CrestWell aria-hidden>
            <TeamCrest team={crestTeam} size={40} />
          </CrestWell>
        ) : null}
        <CopyStack>
          <Title title={report.name}>{report.name}</Title>
          <MetaStrip>
            <Badge color="secondary" tone="subtle" dot={false}>
              {status}
            </Badge>
            {report.templateType ? (
              <Badge color="blue" tone="subtle" dot={false}>
                {report.templateType}
              </Badge>
            ) : null}
            {report.sharing ? (
              <Badge color="secondary" tone="subtle" dot={false}>
                {report.sharing}
              </Badge>
            ) : null}
            {matchSummary ? (
              <MatchPill title={matchSummary}>
                <Swords size={ICON_SIZE} aria-hidden />
                <MatchText>{matchSummary}</MatchText>
              </MatchPill>
            ) : tournament ? (
              <Muted as="span" style={{ display: 'inline' }}>
                {tournament}
              </Muted>
            ) : null}
            {report.lastUpdated ? (
              <Muted as="span" style={{ display: 'inline' }}>
                Updated {report.lastUpdated}
              </Muted>
            ) : null}
            {editMode && (
              <Button
                size="xs"
                intent="secondary"
                variant={detailsOpen ? 'tonal' : 'ghost'}
                startIcon={<Pencil size={ICON_SIZE} />}
                onClick={onEditSelections}
                underline={false}
              >
                Details
              </Button>
            )}
          </MetaStrip>
          {tags.length > 0 && !detailsOpen && (
            <TagRow aria-label="Dashboard tags">
              {tags.map((tag) => (
                <Chip key={tag} size="sm" type="secondary">
                  {tag}
                </Chip>
              ))}
            </TagRow>
          )}
          {editMode && !detailsOpen && !matchContext.tournament && !matchContext.homeTeam && (
            <Muted>Set tournament and teams in Details.</Muted>
          )}
        </CopyStack>
      </Identity>
      <Actions>{actions}</Actions>
    </Shell>
  );
}
