import styled from 'styled-components';

import { TeamMark } from '../teams/TeamCrest';

type Props = {
  leftLabel: string;
  rightLabel: string;
  leftValue: number;
  rightValue: number;
  leftColor: string;
  rightColor: string;
  unit?: string;
  ariaLabel: string;
};

const Root = styled.div`
  display: grid;
  gap: var(--space-200);
`;

const Labels = styled.div`
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
  height: 10px;
`;

const Slot = styled.div<{ $align: 'left' | 'right' }>`
  display: flex;
  justify-content: ${(p) => (p.$align === 'left' ? 'flex-end' : 'flex-start')};
  border-radius: var(--radius-1000);
  background: var(--color-surfaces-on-container);
  overflow: hidden;
`;

const Fill = styled.div<{ $color: string; $pct: number }>`
  width: ${(p) => `${Math.max(4, Math.min(100, p.$pct))}%`};
  height: 100%;
  border-radius: var(--radius-1000);
  background: ${(p) => p.$color};
`;

const Values = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

export function PossessionSplit({
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
  leftColor,
  rightColor,
  unit = '%',
  ariaLabel,
}: Props) {
  const total = leftValue + rightValue || 1;

  return (
    <Root role="img" aria-label={ariaLabel}>
      <Labels>
        <TeamMark team={leftLabel} size="sm" />
        <TeamMark team={rightLabel} size="sm" />
      </Labels>
      <Track>
        <Slot $align="left">
          <Fill $color={leftColor} $pct={(leftValue / total) * 100} />
        </Slot>
        <Slot $align="right">
          <Fill $color={rightColor} $pct={(rightValue / total) * 100} />
        </Slot>
      </Track>
      <Values>
        <span>
          {leftValue}
          {unit}
        </span>
        <span>
          {rightValue}
          {unit}
        </span>
      </Values>
    </Root>
  );
}
