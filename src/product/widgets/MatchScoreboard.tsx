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
  gap: var(--space-400);
  padding: var(--space-400) var(--space-500);
  border-radius: var(--radius-400);
  border: var(--stroke-100) solid var(--color-stroke-border);
  background:
    linear-gradient(
      120deg,
      var(--color-surfaces-primary) 0%,
      var(--color-surfaces-container) 42%,
      var(--color-surfaces-on-container-high) 100%
    );
  box-shadow: var(--elevation-3);
  min-height: 100%;
`;

const Teams = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-400);
  min-width: 0;
`;

const Score = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--space-200);
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-page);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.02em;
  line-height: 1;
`;

const Sep = styled.span`
  color: var(--color-text-icon-secondary);
  font-weight: var(--font-weight-regular);
  font-size: var(--type-size-title);
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-200);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
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
          <Score>
            {homeTeam}
            <Sep>vs</Sep>
            {awayTeam}
          </Score>
        )}
        <TeamMark team={awayTeam} size="lg" />
      </Teams>
      <Meta>
        {live ? (
          <Badge color="destructive" tone="subtle" dot>
            LIVE
          </Badge>
        ) : (
          <Badge color="secondary" tone="subtle" dot={false}>
            {status}
          </Badge>
        )}
        {meta && <span>{meta}</span>}
      </Meta>
    </Root>
  );
}
