import styled from 'styled-components';

export type MatchEvent = {
  id: string;
  minute: string;
  text: string;
  tone?: 'goal' | 'card' | 'sub' | 'neutral';
};

type Props = {
  events: MatchEvent[];
  ariaLabel: string;
};

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: var(--space-200);
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-200);
  align-items: start;
`;

const Minute = styled.span<{ $tone: NonNullable<MatchEvent['tone']> }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 28px;
  padding: 0 var(--space-150);
  border-radius: var(--radius-1000);
  background: ${(p) =>
    p.$tone === 'goal'
      ? 'color-mix(in srgb, var(--color-error-error) 18%, var(--color-surfaces-on-container))'
      : p.$tone === 'card'
        ? 'color-mix(in srgb, var(--color-warning-warn) 22%, var(--color-surfaces-on-container))'
        : p.$tone === 'sub'
          ? 'color-mix(in srgb, var(--color-success-success) 18%, var(--color-surfaces-on-container))'
          : 'var(--color-surfaces-on-container)'};
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
`;

const Text = styled.span`
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.4;
`;

export function EventTimeline({ events, ariaLabel }: Props) {
  return (
    <List role="list" aria-label={ariaLabel}>
      {events.map((event) => (
        <Item key={event.id}>
          <Minute $tone={event.tone ?? 'neutral'}>{event.minute}</Minute>
          <Text>{event.text}</Text>
        </Item>
      ))}
    </List>
  );
}
