import styled from 'styled-components';

import { DATAVIS } from './datavis';
import { PitchSvg } from './PitchSvg';

type Props = {
  /** 8×12 intensity grid (0–1), attacking third emphasized visually. */
  cells: number[][];
  ariaLabel: string;
  color?: string;
};

const Root = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 68 / 105;
  max-height: 320px;
  margin-inline: auto;
  border-radius: var(--radius-300);
  border: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-on-container);
  color: var(--color-text-icon-secondary);
  overflow: hidden;
`;

const Grid = styled.div`
  position: absolute;
  left: 8%;
  right: 8%;
  top: 6%;
  bottom: 42%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 2px;
`;

const Cell = styled.span<{ $intensity: number; $color: string }>`
  border-radius: 2px;
  background: color-mix(
    in srgb,
    ${(p) => p.$color} ${(p) => Math.round(p.$intensity * 90)}%,
    transparent
  );
`;

export function ActionGrid({ cells, ariaLabel, color = DATAVIS.blue }: Props) {
  return (
    <Root role="img" aria-label={ariaLabel}>
      <PitchSvg orientation="vertical" />
      <Grid>
        {cells.flatMap((row, rowIndex) =>
          row.map((intensity, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              $intensity={Math.max(0, Math.min(1, intensity))}
              $color={color}
            />
          )),
        )}
      </Grid>
    </Root>
  );
}
