import styled from 'styled-components';
import { Badge } from '@cake-admin/cakeand';

import { TeamMark } from '../teams/TeamCrest';

type Props = {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number | string;
  awayScore?: number | string;
  status: string;
  meta?: string;
  live?: boolean;
  ariaLabel?: string;
};

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-300);
  padding: var(--space-300) var(--space-400);
  border-radius: var(--radius-300);
  border: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-on-container);
`;

const Teams = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-300);
  min-width: 0;
`;

const Score = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--space-150);
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-title);
  font-weight: var(--font-weight-bold);
`;

const Sep = styled.span`
  color: var(--color-text-icon-secondary);
  font-weight: var(--font-weight-regular);
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-200);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

export function MatchScoreboard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  meta,
  live = false,
  ariaLabel,
}: Props) {
  const hasScore = homeScore !== undefined && awayScore !== undefined;

  return (
    <Root role="group" aria-label={ariaLabel ?? `${homeTeam} versus ${awayTeam}`}>
      <Teams>
        <TeamMark team={homeTeam} size="lg" />
        {hasScore ? (
          <Score>
            {homeScore}
            <Sep>–</Sep>
            {awayScore}
          </Score>
        ) : (
          <Sep>vs</Sep>
        )}
        <TeamMark team={awayTeam} size="lg" />
      </Teams>
      <Meta>
        {live && (
          <Badge color="destructive" tone="solid" dot={false}>
            LIVE
          </Badge>
        )}
        <span>{status}</span>
        {meta && <span>{meta}</span>}
      </Meta>
    </Root>
  );
}
