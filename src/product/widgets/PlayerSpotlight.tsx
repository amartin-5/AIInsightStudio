import styled from 'styled-components';

import { TeamCrest } from '../teams/TeamCrest';

export type PlayerStat = { label: string; value: string };

type Props = {
  name: string;
  team: string;
  position: string;
  initial: string;
  accentColor: string;
  stats: PlayerStat[];
};

const Card = styled.div`
  display: grid;
  gap: var(--space-300);
  padding: var(--space-400);
  border-radius: var(--radius-300);
  border: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-on-container);
  min-width: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-200);
`;

const Avatar = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-1000);
  border: var(--stroke-150) solid ${(p) => p.$color};
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-bold);
`;

const Meta = styled.div`
  display: grid;
  gap: 2px;
  min-width: 0;
`;

const Name = styled.span`
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-bold);
`;

const Sub = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--space-100);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

const Stats = styled.dl`
  margin: 0;
  display: grid;
  gap: var(--space-100);
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: var(--space-200);
`;

const StatLabel = styled.dt`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

const StatValue = styled.dd`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
`;

export function PlayerSpotlight({
  name,
  team,
  position,
  initial,
  accentColor,
  stats,
}: Props) {
  return (
    <Card>
      <Header>
        <Avatar $color={accentColor}>{initial}</Avatar>
        <Meta>
          <Name>{name}</Name>
          <Sub>
            <TeamCrest team={team} size="sm" />
            <span>
              {team} · {position}
            </span>
          </Sub>
        </Meta>
      </Header>
      <Stats>
        {stats.map((stat) => (
          <StatRow key={stat.label}>
            <StatLabel>{stat.label}</StatLabel>
            <StatValue>{stat.value}</StatValue>
          </StatRow>
        ))}
      </Stats>
    </Card>
  );
}
