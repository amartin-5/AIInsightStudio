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
  gap: var(--space-300);
`;

const Counts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-200);
  text-align: center;
`;

const CountBlock = styled.div`
  display: grid;
  gap: var(--space-050);
`;

const Value = styled.span<{ $color?: string }>`
  color: ${(p) => p.$color ?? 'var(--color-text-icon-primary)'};
  font-family: var(--font-family);
  font-size: var(--type-size-greeting);
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
`;

const Label = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

const Bar = styled.div<{ $left: number; $mid: number; $right: number }>`
  display: grid;
  grid-template-columns: ${(p) => `${p.$left}fr ${p.$mid}fr ${p.$right}fr`};
  height: 10px;
  border-radius: var(--radius-1000);
  overflow: hidden;
  background: var(--color-surfaces-on-container);
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
        <CountBlock>
          <TeamMark team={leftLabel} size="sm" />
          <Value $color={leftColor}>{leftWins}</Value>
          <Label>Wins</Label>
        </CountBlock>
        <CountBlock>
          <Value>{draws}</Value>
          <Label>Draws</Label>
        </CountBlock>
        <CountBlock>
          <TeamMark team={rightLabel} size="sm" />
          <Value $color={rightColor}>{rightWins}</Value>
          <Label>Wins</Label>
        </CountBlock>
      </Counts>
      <Bar $left={leftWins / total} $mid={draws / total} $right={rightWins / total}>
        <Seg $color={leftColor} />
        <Seg $color="var(--color-surfaces-on-container-high)" />
        <Seg $color={rightColor} />
      </Bar>
    </Root>
  );
}
