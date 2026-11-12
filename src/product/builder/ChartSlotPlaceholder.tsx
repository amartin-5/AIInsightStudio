import styled from 'styled-components';
import { Plus } from 'lucide-react';

type Props = {
  label?: string;
  selected?: boolean;
  onClick?: () => void;
};

const Root = styled.button<{ $selected: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-300);
  min-height: 220px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: var(--space-500);
  border: var(--stroke-100) solid
    ${(p) =>
      p.$selected ? 'var(--color-primary-primary)' : 'var(--color-stroke-border)'};
  border-radius: var(--radius-300);
  background: var(--color-surfaces-container);
  box-shadow: ${(p) => (p.$selected ? 'var(--elevation-2)' : 'var(--elevation-0)')};
  color: var(--color-text-icon-secondary);
  cursor: pointer;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;

  &:hover {
    border-color: var(--color-primary-primary);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: var(--stroke-200) solid var(--color-primary-primary);
    outline-offset: 2px;
  }
`;

const IconWell = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-1000);
  background: var(--color-surfaces-on-container-high);
  color: var(--color-text-icon-primary);
`;

const Label = styled.span`
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
  color: var(--color-text-icon-secondary);
`;

/** Empty canvas cell — click to target for AI insert or open the widget library. */
export function ChartSlotPlaceholder({
  label = 'Add chart',
  selected = false,
  onClick,
}: Props) {
  return (
    <Root type="button" $selected={selected} onClick={onClick} aria-pressed={selected}>
      <Label>{label}</Label>
      <IconWell aria-hidden>
        <Plus size={24} />
      </IconWell>
    </Root>
  );
}
