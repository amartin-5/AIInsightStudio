import styled from 'styled-components';

import { DATAVIS_SERIES } from '../charts/datavis';

export type FactorItem = {
  id: string;
  label: string;
  value: number;
  color?: string;
};

type Props = {
  items: FactorItem[];
  ariaLabel: string;
};

const Root = styled.div`
  display: grid;
  gap: var(--space-300);
`;

const Row = styled.div`
  display: grid;
  gap: var(--space-100);
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: var(--space-200);
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

const Track = styled.div`
  height: 8px;
  border-radius: var(--radius-1000);
  background: var(--color-surfaces-on-container);
  overflow: hidden;
`;

const Fill = styled.div<{ $color: string; $pct: number }>`
  width: ${(p) => `${Math.max(2, Math.min(100, p.$pct))}%`};
  height: 100%;
  border-radius: var(--radius-1000);
  background: ${(p) => p.$color};
`;

export function FactorBars({ items, ariaLabel }: Props) {
  return (
    <Root role="img" aria-label={ariaLabel}>
      {items.map((item, index) => (
        <Row key={item.id}>
          <Meta>
            <span>{item.label}</span>
            <span>{item.value}%</span>
          </Meta>
          <Track>
            <Fill
              $color={item.color ?? DATAVIS_SERIES[index % DATAVIS_SERIES.length]}
              $pct={item.value}
            />
          </Track>
        </Row>
      ))}
    </Root>
  );
}
