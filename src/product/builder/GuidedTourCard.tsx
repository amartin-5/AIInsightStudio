import styled from 'styled-components';
import { Button } from '@cake-admin/cakeand';

import { BUILDER_TOUR_STEPS } from './builderSlots';

type Props = {
  stepIndex: number;
  onNext: () => void;
  onDismiss?: () => void;
};

const Card = styled.section`
  display: grid;
  gap: var(--space-400);
  padding: var(--space-500);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-bottom: var(--stroke-200) solid var(--color-primary-primary);
  border-radius: 0 0 var(--radius-200) 0;
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-2);
`;

const Eyebrow = styled.p`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.5;
`;

const Title = styled.h2`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-bold);
  line-height: 1.4;
`;

const Body = styled.p`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  line-height: 1.45;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-300);
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-150);
`;

const Dot = styled.span<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: var(--radius-1000);
  background: ${(p) =>
    p.$active ? 'var(--color-primary-primary)' : 'var(--color-stroke-border)'};
`;

/** Step-by-step coach mark for the custom report builder. */
export function GuidedTourCard({ stepIndex, onNext, onDismiss }: Props) {
  const step = BUILDER_TOUR_STEPS[Math.min(stepIndex, BUILDER_TOUR_STEPS.length - 1)];
  const isLast = stepIndex >= BUILDER_TOUR_STEPS.length - 1;

  return (
    <Card aria-label="Build your first report">
      <div style={{ display: 'grid', gap: 'var(--space-300)' }}>
        <Eyebrow>Build your first report</Eyebrow>
        <Title>{step.title}</Title>
        <Body>{step.body}</Body>
      </div>
      <Footer>
        <Dots aria-hidden>
          {BUILDER_TOUR_STEPS.map((s, i) => (
            <Dot key={s.id} $active={i === stepIndex} />
          ))}
        </Dots>
        <Button
          size="sm"
          onClick={() => {
            if (isLast) onDismiss?.();
            else onNext();
          }}
        >
          {isLast ? 'Play on!' : 'Next'}
        </Button>
      </Footer>
    </Card>
  );
}
