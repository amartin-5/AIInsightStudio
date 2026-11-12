import styled from 'styled-components';

export type GoalMark = {
  id: string;
  minute: number;
  team: string;
  selected?: boolean;
};

type Props = {
  marks: GoalMark[];
  startMinute?: number;
  endMinute?: number;
  ariaLabel: string;
  onSelect?: (id: string) => void;
};

const Root = styled.div`
  display: grid;
  gap: var(--space-200);
`;

const Track = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-100);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  padding-bottom: var(--space-150);
`;

const Mark = styled.button<{ $selected: boolean }>`
  appearance: none;
  border: 0;
  background: transparent;
  padding: var(--space-100) var(--space-050);
  cursor: pointer;
  display: grid;
  gap: var(--space-050);
  justify-items: center;
  min-width: 0;
  border-bottom: 3px solid
    ${(p) => (p.$selected ? 'var(--color-error-error)' : 'transparent')};
  margin-bottom: -2px;
`;

const Team = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

const Minute = styled.span<{ $selected: boolean }>`
  color: ${(p) =>
    p.$selected ? 'var(--color-text-icon-primary)' : 'var(--color-text-icon-secondary)'};
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: ${(p) =>
    p.$selected ? 'var(--font-weight-bold)' : 'var(--font-weight-regular)'};
`;

const Ends = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

export function GoalTimeline({
  marks,
  startMinute = 0,
  endMinute = 90,
  ariaLabel,
  onSelect,
}: Props) {
  return (
    <Root role="navigation" aria-label={ariaLabel}>
      <Ends>
        <span>{startMinute}&apos;</span>
        <span>{endMinute}&apos;</span>
      </Ends>
      <Track>
        {marks.map((mark) => (
          <Mark
            key={mark.id}
            type="button"
            $selected={Boolean(mark.selected)}
            onClick={() => onSelect?.(mark.id)}
            aria-pressed={Boolean(mark.selected)}
          >
            <Team>{mark.team}</Team>
            <Minute $selected={Boolean(mark.selected)}>⚽ {mark.minute}&apos;</Minute>
          </Mark>
        ))}
      </Track>
    </Root>
  );
}
