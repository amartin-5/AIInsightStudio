import styled from 'styled-components';

import { DATAVIS } from './datavis';
import { PitchSvg } from './PitchSvg';

export type HeatBlob = { x: number; y: number; intensity: number };

type Props = {
  blobs: HeatBlob[];
  ariaLabel: string;
  color?: string;
};

const Root = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 105 / 68;
  max-height: 280px;
  margin-inline: auto;
  border-radius: var(--radius-300);
  border: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-on-container);
  color: var(--color-text-icon-secondary);
  overflow: hidden;
`;

const Layer = styled.div`
  position: absolute;
  inset: 0;
`;

const Blob = styled.span<{ $x: number; $y: number; $intensity: number; $color: string }>`
  position: absolute;
  left: ${(p) => p.$x}%;
  top: ${(p) => p.$y}%;
  width: ${(p) => 28 + p.$intensity * 36}px;
  height: ${(p) => 20 + p.$intensity * 28}px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    color-mix(in srgb, ${(p) => p.$color} ${(p) => 35 + p.$intensity * 45}%, transparent) 0%,
    transparent 70%
  );
  pointer-events: none;
`;

export function HeatmapPitch({ blobs, ariaLabel, color = DATAVIS.blue }: Props) {
  return (
    <Root role="img" aria-label={ariaLabel}>
      <Layer>
        <PitchSvg orientation="horizontal" />
      </Layer>
      <Layer>
        {blobs.map((blob, index) => (
          <Blob
            key={`${blob.x}-${blob.y}-${index}`}
            $x={blob.x}
            $y={blob.y}
            $intensity={Math.max(0, Math.min(1, blob.intensity))}
            $color={color}
          />
        ))}
      </Layer>
    </Root>
  );
}
