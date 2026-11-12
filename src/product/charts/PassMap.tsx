import styled from 'styled-components';

import { DATAVIS } from './datavis';
import { PitchSvg } from './PitchSvg';

export type PassArrow = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  kind: 'complete' | 'incomplete' | 'assist';
};

type Props = {
  passes: PassArrow[];
  ariaLabel: string;
  stats?: { complete: number; incomplete: number; assist: number };
};

const Root = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(120px, 0.7fr);
  gap: var(--space-400);
  align-items: center;
  min-width: 0;
`;

const Field = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 105 / 68;
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

const Stats = styled.dl`
  margin: 0;
  display: grid;
  gap: var(--space-300);
`;

const StatRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-200);
`;

const StatLabel = styled.dt`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-bold);
`;

const StatValue = styled.dd<{ $color: string }>`
  margin: 0;
  color: ${(p) => p.$color};
  font-family: var(--font-family);
  font-size: var(--type-size-title);
  font-weight: var(--font-weight-bold);
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-300);
  margin-top: var(--space-200);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

const Swatch = styled.span<{ $color: string }>`
  display: inline-block;
  width: 14px;
  height: 2px;
  margin-right: var(--space-100);
  vertical-align: middle;
  background: ${(p) => p.$color};
`;

const KIND_COLOR = {
  complete: DATAVIS.blue,
  incomplete: DATAVIS.jade,
  assist: DATAVIS.gold,
} as const;

export function PassMap({ passes, ariaLabel, stats }: Props) {
  return (
    <div>
      <Root role="img" aria-label={ariaLabel}>
        <Field>
          <PitchSvg orientation="horizontal" />
          <Overlay viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              {(['complete', 'incomplete', 'assist'] as const).map((kind) => (
                <marker
                  key={kind}
                  id={`pass-arrow-${kind}`}
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L6,3 L0,6 Z" fill={KIND_COLOR[kind]} />
                </marker>
              ))}
            </defs>
            {passes.map((pass, index) => (
              <line
                key={index}
                x1={pass.x1}
                y1={pass.y1}
                x2={pass.x2}
                y2={pass.y2}
                stroke={KIND_COLOR[pass.kind]}
                strokeWidth={pass.kind === 'assist' ? 1.4 : 0.9}
                opacity={0.85}
                markerEnd={`url(#pass-arrow-${pass.kind})`}
              />
            ))}
          </Overlay>
        </Field>
        {stats && (
          <Stats>
            <StatRow>
              <StatLabel>Complete</StatLabel>
              <StatValue $color={DATAVIS.blue}>{stats.complete}</StatValue>
            </StatRow>
            <StatRow>
              <StatLabel>Incomplete</StatLabel>
              <StatValue $color={DATAVIS.cyan}>{stats.incomplete}</StatValue>
            </StatRow>
            <StatRow>
              <StatLabel>Assist</StatLabel>
              <StatValue $color={DATAVIS.blue}>{stats.assist}</StatValue>
            </StatRow>
          </Stats>
        )}
      </Root>
      <Legend>
        <span>
          <Swatch $color={KIND_COLOR.complete} />
          Complete
        </span>
        <span>
          <Swatch $color={KIND_COLOR.incomplete} />
          Incomplete
        </span>
        <span>
          <Swatch $color={KIND_COLOR.assist} />
          Assist
        </span>
      </Legend>
    </div>
  );
}
