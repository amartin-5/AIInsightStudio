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
  /** Optional portrait — explore/demo imagery or generated placeholder. */
  photo?: string;
};

const Card = styled.div`
  display: grid;
  grid-template-rows: minmax(140px, 42%) auto;
  gap: 0;
  min-height: 100%;
  border-radius: var(--radius-400);
  border: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-3);
  overflow: hidden;
  min-width: 0;
`;

const Portrait = styled.div<{ $color: string; $photo?: string }>`
  position: relative;
  min-height: 140px;
  background:
    linear-gradient(
      180deg,
      transparent 35%,
      var(--color-surfaces-container) 100%
    ),
    ${(p) =>
      p.$photo
        ? `center/cover no-repeat url(${p.$photo})`
        : `linear-gradient(145deg, ${p.$color} 0%, var(--color-surfaces-inverse-container) 100%)`};
`;

const PortraitFallback = styled.span`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--color-text-icon-inverse);
  font-family: var(--font-family);
  font-size: var(--type-size-greeting);
  font-weight: var(--font-weight-bold);
  opacity: 0.55;
`;

const Body = styled.div`
  display: grid;
  gap: var(--space-300);
  padding: var(--space-300) var(--space-400) var(--space-400);
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-200);
`;

const Meta = styled.div`
  display: grid;
  gap: var(--space-050);
  min-width: 0;
`;

const Name = styled.span`
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-bold);
  line-height: 1.25;
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
  grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
  gap: var(--space-150);
`;

const StatCell = styled.div`
  display: grid;
  gap: 2px;
  padding: var(--space-200);
  border-radius: var(--radius-150);
  background: var(--color-surfaces-on-container-high);
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
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-bold);
`;

export function PlayerSpotlight({
  name,
  team,
  position,
  initial,
  accentColor,
  stats,
  photo,
}: Props) {
  return (
    <Card>
      <Portrait $color={accentColor} $photo={photo}>
        {!photo && <PortraitFallback aria-hidden>{initial}</PortraitFallback>}
      </Portrait>
      <Body>
        <Header>
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
            <StatCell key={stat.label}>
              <StatLabel>{stat.label}</StatLabel>
              <StatValue>{stat.value}</StatValue>
            </StatCell>
          ))}
        </Stats>
      </Body>
    </Card>
  );
}
