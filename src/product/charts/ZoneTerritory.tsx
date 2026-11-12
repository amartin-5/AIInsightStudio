import styled from 'styled-components';

import { TeamMark } from '../teams/TeamCrest';
import { DATAVIS } from './datavis';

export type ZoneColumn = {
  percent: number;
  count: number;
};

type Props = {
  leftLabel: string;
  rightLabel: string;
  leftZones: ZoneColumn[];
  rightZones: ZoneColumn[];
  leftColor?: string;
  rightColor?: string;
  ariaLabel: string;
};

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-400);
  min-width: 0;
`;

const TeamBlock = styled.div`
  display: grid;
  gap: var(--space-200);
  min-width: 0;
`;

const TeamLabel = styled.div`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.04em;
`;

const Pitch = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  aspect-ratio: 105 / 68;
  border-radius: var(--radius-200);
  border: var(--stroke-100) solid var(--color-stroke-border);
  overflow: hidden;
  background: var(--color-surfaces-on-container);
`;

const Zone = styled.div<{ $color: string; $pct: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: var(--space-050);
  background: color-mix(
    in srgb,
    ${(p) => p.$color} ${(p) => Math.max(12, Math.min(85, p.$pct))}%,
    var(--color-surfaces-on-container)
  );
  color: var(--color-text-icon-inverse);
  font-family: var(--font-family);
  text-align: center;
`;

const Pct = styled.span`
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
`;

const Count = styled.span`
  font-size: 10px;
  opacity: 0.9;
  line-height: 1.2;
`;

function ZonePitch({
  zones,
  color,
}: {
  zones: ZoneColumn[];
  color: string;
}) {
  return (
    <Pitch>
      {zones.map((zone, index) => (
        <Zone key={index} $color={color} $pct={zone.percent}>
          <Pct>{zone.percent}%</Pct>
          <Count>{zone.count}</Count>
        </Zone>
      ))}
    </Pitch>
  );
}

export function ZoneTerritory({
  leftLabel,
  rightLabel,
  leftZones,
  rightZones,
  leftColor = DATAVIS.blue,
  rightColor = DATAVIS.jade,
  ariaLabel,
}: Props) {
  return (
    <Root role="img" aria-label={ariaLabel}>
      <TeamBlock>
        <TeamLabel>
          <TeamMark team={leftLabel} size="sm" />
        </TeamLabel>
        <ZonePitch zones={leftZones} color={leftColor} />
      </TeamBlock>
      <TeamBlock>
        <TeamLabel>
          <TeamMark team={rightLabel} size="sm" />
        </TeamLabel>
        <ZonePitch zones={rightZones} color={rightColor} />
      </TeamBlock>
    </Root>
  );
}
