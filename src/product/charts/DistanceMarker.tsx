import styled from 'styled-components';

import { DATAVIS } from './datavis';
import { PitchSvg } from './PitchSvg';

type Props = {
  distanceMeters: number;
  ariaLabel: string;
  fromColor?: string;
  toColor?: string;
};

const Root = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 105 / 68;
  max-height: 220px;
  margin-inline: auto;
  border-radius: var(--radius-300);
  border: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-on-container);
  color: var(--color-text-icon-secondary);
  overflow: hidden;
`;

const Overlay = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const Caption = styled.p`
  margin: var(--space-200) 0 0;
  text-align: center;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-bold);
`;

export function DistanceMarker({
  distanceMeters,
  ariaLabel,
  fromColor = DATAVIS.red,
  toColor = DATAVIS.blue,
}: Props) {
  return (
    <div>
      <Root role="img" aria-label={ariaLabel}>
        <PitchSvg orientation="horizontal" />
        <Overlay viewBox="0 0 100 100" preserveAspectRatio="none">
          <line
            x1="38"
            y1="48"
            x2="62"
            y2="52"
            stroke="var(--color-stroke-border-high)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
          <circle cx="38" cy="48" r="2.2" fill={fromColor} />
          <circle cx="62" cy="52" r="2.2" fill={toColor} />
        </Overlay>
      </Root>
      <Caption>Average distance {distanceMeters.toFixed(1)} m</Caption>
    </div>
  );
}
