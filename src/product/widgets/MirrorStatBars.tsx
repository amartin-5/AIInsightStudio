import styled from 'styled-components';

import { TeamMark } from '../teams/TeamCrest';

export type MirrorStatRow = {
  label: string;
  left: number;
  right: number;
  format?: (value: number) => string;
};

type Props = {
  leftLabel: string;
  rightLabel: string;
  rows: MirrorStatRow[];
  leftColor: string;
  rightColor: string;
  ariaLabel: string;
};

const Root = styled.div`
  display: grid;
  gap: var(--space-300);
`;

const Legend = styled.div`
  display: flex;
  justify-content: space-between;
  gap: var(--space-200);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 56px 1fr auto 1fr 56px;
  align-items: center;
  gap: var(--space-150);
  min-width: 0;
`;

const Value = styled.span`
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  text-align: center;
`;

const Label = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  text-align: center;
  white-space: normal;
  overflow-wrap: break-word;
`;

const Slot = styled.div<{ $align: 'left' | 'right' }>`
  display: flex;
  justify-content: ${(p) => (p.$align === 'left' ? 'flex-end' : 'flex-start')};
  height: 8px;
  border-radius: var(--radius-1000);
  background: var(--color-surfaces-on-container);
  overflow: hidden;
`;

const Fill = styled.div<{ $color: string; $pct: number }>`
  width: ${(p) => `${Math.max(3, Math.min(100, p.$pct))}%`};
  height: 100%;
  border-radius: var(--radius-1000);
  background: ${(p) => p.$color};
`;

export function MirrorStatBars({
  leftLabel,
  rightLabel,
  rows,
  leftColor,
  rightColor,
  ariaLabel,
}: Props) {
  const max = Math.max(...rows.flatMap((r) => [r.left, r.right]), 1);

  return (
    <Root role="img" aria-label={ariaLabel}>
      <Legend>
        <TeamMark team={leftLabel} size="sm" />
        <TeamMark team={rightLabel} size="sm" />
      </Legend>
      {rows.map((row) => {
        const fmt = row.format ?? ((v: number) => String(v));
        return (
          <Row key={row.label}>
            <Value>{fmt(row.left)}</Value>
            <Slot $align="left">
              <Fill $color={leftColor} $pct={(row.left / max) * 100} />
            </Slot>
            <Label>{row.label}</Label>
            <Slot $align="right">
              <Fill $color={rightColor} $pct={(row.right / max) * 100} />
            </Slot>
            <Value>{fmt(row.right)}</Value>
          </Row>
        );
      })}
    </Root>
  );
}
