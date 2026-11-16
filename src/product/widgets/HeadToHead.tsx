import styled from 'styled-components';

import { TeamMark } from '../teams/TeamCrest';

type Props = {
  leftLabel: string;
  rightLabel: string;
  leftWins: number;
  draws: number;
  rightWins: number;
  leftColor: string;
  rightColor: string;
  ariaLabel: string;
};

const Root = styled.div`
  display: grid;
  gap: var(--space-400);
  padding: var(--space-200) 0;
`;

const Counts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-200);
  text-align: center;
`;

const CountBlock = styled.div`
  display: grid;
  gap: var(--space-100);
  padding: var(--space-300) var(--space-200);
  border-radius: var(--radius-200);
  background: var(--color-surfaces-on-container-high);
  border: var(--stroke-100) solid var(--color-stroke-border);
  justify-items: center;
`;

const Value = styled.span<{ $color?: string }>`
  color: ${(p) => p.$color ?? 'var(--color-text-icon-primary)'};
  font-family: var(--font-family);
  font-size: var(--type-size-page);
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
  letter-spacing: -0.02em;
`;

const Label = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
`;

const Bar = styled.div<{ $left: number; $mid: number; $right: number }>`
  display: grid;
  grid-template-columns: ${(p) => `${Math.max(p.$left, 0.08)}fr ${Math.max(p.$mid, 0.08)}fr ${Math.max(p.$right, 0.08)}fr`};
  height: 14px;
  border-radius: var(--radius-1000);
  overflow: hidden;
  background: var(--color-surfaces-on-container);
  border: var(--stroke-100) solid var(--color-stroke-border);
`;

const Seg = styled.span<{ $color: string }>`
  background: ${(p) => p.$color};
`;

export function HeadToHead({
  leftLabel,
  rightLabel,
  leftWins,
  draws,
  rightWins,
  leftColor,
  rightColor,
  ariaLabel,
}: Props) {
  const total = Math.max(1, leftWins + draws + rightWins);

  return (
    <Root role="img" aria-label={ariaLabel}>
      <Counts>
        <CountBlock style={{ borderTop: `3px solid ${leftColor}` }}>
          <TeamMark team={leftLabel} size="sm" />
          <Value $color={leftColor}>{leftWins}</Value>
          <Label>Wins</Label>
        </CountBlock>
        <CountBlock>
          <Value>{draws}</Value>
          <Label>Draws</Label>
        </CountBlock>
        <CountBlock style={{ borderTop: `3px solid ${rightColor}` }}>
          <TeamMark team={rightLabel} size="sm" />
          <Value $color={rightColor}>{rightWins}</Value>
          <Label>Wins</Label>
        </CountBlock>
      </Counts>
      <Bar $left={leftWins / total} $mid={draws / total} $right={rightWins / total}>
        <Seg $color={leftColor} />
        <Seg $color="var(--color-surfaces-on-container-low)" />
        <Seg $color={rightColor} />
      </Bar>
    </Root>
  );
}
