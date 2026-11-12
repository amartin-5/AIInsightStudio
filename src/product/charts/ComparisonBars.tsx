import styled from 'styled-components';

import { TeamMark } from '../teams/TeamCrest';
import { DATAVIS } from './datavis';

export type ComparisonRow = {
  label: string;
  left: number;
  right: number;
  format?: (value: number) => string;
};

type Props = {
  leftLabel: string;
  rightLabel: string;
  rows: ComparisonRow[];
  leftColor?: string;
  rightColor?: string;
  ariaLabel: string;
};

const Root = styled.div`
  display: grid;
  gap: var(--space-300);
  min-width: 0;
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-300);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--space-100);
  min-width: 0;
`;

const Swatch = styled.span<{ $color: string }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: var(--space-100);
  border-radius: var(--radius-1000);
  background: ${(p) => p.$color};
`;

const Row = styled.div`
  display: grid;
  gap: var(--space-100);
  min-width: 0;
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  gap: var(--space-200);
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
`;

const Track = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-100);
  align-items: center;
`;

const BarSlot = styled.div<{ $align: 'left' | 'right' }>`
  display: flex;
  justify-content: ${(p) => (p.$align === 'left' ? 'flex-end' : 'flex-start')};
  height: 10px;
  border-radius: var(--radius-1000);
  background: var(--color-surfaces-on-container);
  overflow: hidden;
`;

const Fill = styled.div<{ $color: string; $pct: number }>`
  height: 100%;
  width: ${(p) => `${Math.max(4, Math.min(100, p.$pct))}%`};
  border-radius: var(--radius-1000);
  background: ${(p) => p.$color};
`;

export function ComparisonBars({
  leftLabel,
  rightLabel,
  rows,
  leftColor = DATAVIS.indigo,
  rightColor = DATAVIS.cyan,
  ariaLabel,
}: Props) {
  const max = Math.max(...rows.flatMap((r) => [r.left, r.right]), 1);

  return (
    <Root role="img" aria-label={ariaLabel}>
      <Legend>
        <LegendItem>
          <Swatch $color={leftColor} />
          <TeamMark team={leftLabel} size="sm" />
        </LegendItem>
        <LegendItem>
          <Swatch $color={rightColor} />
          <TeamMark team={rightLabel} size="sm" />
        </LegendItem>
      </Legend>
      {rows.map((row) => {
        const fmt = row.format ?? ((v: number) => String(v));
        return (
          <Row key={row.label}>
            <Label>
              <span>{row.label}</span>
              <span>
                {fmt(row.left)} · {fmt(row.right)}
              </span>
            </Label>
            <Track>
              <BarSlot $align="left">
                <Fill $color={leftColor} $pct={(row.left / max) * 100} />
              </BarSlot>
              <BarSlot $align="right">
                <Fill $color={rightColor} $pct={(row.right / max) * 100} />
              </BarSlot>
            </Track>
          </Row>
        );
      })}
    </Root>
  );
}
