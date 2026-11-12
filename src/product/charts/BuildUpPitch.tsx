import styled from 'styled-components';

import { DATAVIS } from './datavis';
import { PitchSvg } from './PitchSvg';

type Props = {
  widthMeters: number;
  heightMeters: number;
  depthMeters: number;
  ariaLabel: string;
  color?: string;
};

const Root = styled.div`
  position: relative;
  width: 100%;
  max-width: 220px;
  aspect-ratio: 68 / 105;
  margin-inline: auto;
  border-radius: var(--radius-300);
  border: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-on-container);
  color: var(--color-text-icon-secondary);
  overflow: hidden;
`;

const Box = styled.div<{ $color: string }>`
  position: absolute;
  left: 22%;
  top: 34%;
  width: 56%;
  height: 28%;
  border: var(--stroke-150) solid ${(p) => p.$color};
  background: color-mix(in srgb, ${(p) => p.$color} 28%, transparent);
  border-radius: var(--radius-100);
`;

const Dim = styled.span<{
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $centerX?: boolean;
}>`
  position: absolute;
  top: ${(p) => p.$top ?? 'auto'};
  left: ${(p) => p.$left ?? 'auto'};
  right: ${(p) => p.$right ?? 'auto'};
  bottom: ${(p) => p.$bottom ?? 'auto'};
  transform: ${(p) => (p.$centerX ? 'translateX(-50%)' : 'none')};
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  white-space: normal;
  overflow-wrap: break-word;
  max-width: 40%;
  text-align: center;
`;
const Caption = styled.p`
  margin: var(--space-200) 0 0;
  text-align: center;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

export function BuildUpPitch({
  widthMeters,
  heightMeters,
  depthMeters,
  ariaLabel,
  color = DATAVIS.blue,
}: Props) {
  return (
    <div>
      <Root role="img" aria-label={ariaLabel}>
        <PitchSvg orientation="vertical" />
        <Box $color={color} />
        <Dim $top="30%" $left="50%" $centerX>
          {widthMeters}m
        </Dim>
        <Dim $top="46%" $left="6%">
          {heightMeters}m
        </Dim>
        <Dim $top="46%" $right="6%">
          {depthMeters}m
        </Dim>
      </Root>
      <Caption>Build-up line</Caption>
    </div>
  );
}
