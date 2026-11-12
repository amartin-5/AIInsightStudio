import styled from 'styled-components';

export type KpiStat = {
  id: string;
  label: string;
  value: string;
  hint?: string;
  tone?: 'default' | 'negative' | 'positive' | 'accent';
};

type Props = {
  items: KpiStat[];
  ariaLabel: string;
  onSelectItem?: (item: KpiStat) => void;
};

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: var(--space-200);
`;

const Cell = styled.button`
  display: grid;
  gap: var(--space-050);
  padding: var(--space-300);
  border-radius: var(--radius-200);
  background: var(--color-surfaces-on-container);
  text-align: center;
  border: none;
  cursor: pointer;
  font: inherit;
  color: inherit;

  &:focus-visible {
    outline: var(--stroke-200) solid var(--color-primary-primary);
    outline-offset: var(--space-050);
  }
`;

const Value = styled.span<{ $tone: NonNullable<KpiStat['tone']> }>`
  color: ${(p) =>
    p.$tone === 'negative'
      ? 'var(--color-error-error)'
      : p.$tone === 'positive'
        ? 'var(--color-success-success)'
        : p.$tone === 'accent'
          ? 'var(--color-primary-primary)'
          : 'var(--color-text-icon-primary)'};
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

const Hint = styled.span<{ $tone: NonNullable<KpiStat['tone']> }>`
  color: ${(p) =>
    p.$tone === 'negative'
      ? 'var(--color-error-error)'
      : p.$tone === 'positive'
        ? 'var(--color-success-success)'
        : 'var(--color-text-icon-secondary)'};
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

export function KpiStatRow({ items, ariaLabel, onSelectItem }: Props) {
  return (
    <Root role="group" aria-label={ariaLabel}>
      {items.map((item) => {
        const tone = item.tone ?? 'default';
        return (
          <Cell
            key={item.id}
            type="button"
            onClick={() => onSelectItem?.(item)}
            aria-label={`${item.label}: ${item.value}. View sources`}
          >
            <Value $tone={tone}>{item.value}</Value>
            <Label>{item.label}</Label>
            {item.hint && <Hint $tone={tone}>{item.hint}</Hint>}
          </Cell>
        );
      })}
    </Root>
  );
}
