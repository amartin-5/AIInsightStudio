import styled from 'styled-components';

import { DATAVIS } from '../charts/datavis';
import { TeamMark } from '../teams/TeamCrest';
import { teamAccent } from '../teams/teamColors';

export type FormResult = 'W' | 'D' | 'L';

type Props = {
  leftLabel: string;
  rightLabel: string;
  leftForm: FormResult[];
  rightForm: FormResult[];
  ariaLabel: string;
};

const Root = styled.div`
  display: grid;
  gap: var(--space-400);
  padding: var(--space-200) 0;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-200);
  padding: var(--space-250) var(--space-300);
  border-radius: var(--radius-200);
  background: var(--color-surfaces-on-container-high);
  border: var(--stroke-100) solid var(--color-stroke-border);
`;

const Dots = styled.div`
  display: flex;
  gap: var(--space-100);
`;

const Dot = styled.span<{ $result: FormResult }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-1000);
  background: ${(p) =>
    p.$result === 'W'
      ? 'var(--color-success-success)'
      : p.$result === 'D'
        ? DATAVIS.neutral
        : 'var(--color-error-error)'};
  color: var(--color-text-icon-inverse);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-300);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

export function FormGuide({
  leftLabel,
  rightLabel,
  leftForm,
  rightForm,
  ariaLabel,
}: Props) {
  return (
    <Root role="img" aria-label={ariaLabel}>
      <Row style={{ borderLeft: `3px solid ${teamAccent(leftLabel).primary}` }}>
        <TeamMark team={leftLabel} size="sm" />
        <Dots>
          {leftForm.map((result, index) => (
            <Dot key={`l-${index}`} $result={result}>
              {result}
            </Dot>
          ))}
        </Dots>
      </Row>
      <Row style={{ borderLeft: `3px solid ${teamAccent(rightLabel).primary}` }}>
        <TeamMark team={rightLabel} size="sm" />
        <Dots>
          {rightForm.map((result, index) => (
            <Dot key={`r-${index}`} $result={result}>
              {result}
            </Dot>
          ))}
        </Dots>
      </Row>
      <Legend>
        <span>W win</span>
        <span>D draw</span>
        <span>L loss</span>
      </Legend>
    </Root>
  );
}
