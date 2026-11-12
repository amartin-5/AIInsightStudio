import styled from 'styled-components';
import { Sparkles } from 'lucide-react';

type Props = {
  eyebrow?: string;
  title: string;
  body: string;
  footer?: string;
};

const Root = styled.div`
  display: grid;
  gap: var(--space-200);
  padding: var(--space-400);
  border-radius: var(--radius-300);
  border: var(--stroke-100) solid var(--color-stroke-border);
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-primary-primary) 8%, var(--color-surfaces-container)) 0%,
    var(--color-surfaces-container) 55%
  );
  box-shadow: var(--elevation-1);
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-100);
  color: var(--color-primary-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
`;

const Title = styled.h4`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
`;

const Body = styled.p`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.5;
`;

const Footer = styled.p`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

export function AiInsightCard({
  eyebrow = 'AI tactical forecast',
  title,
  body,
  footer = 'Powered by Lenovo',
}: Props) {
  return (
    <Root>
      <Eyebrow>
        <Sparkles size={14} aria-hidden />
        {eyebrow}
      </Eyebrow>
      <Title>{title}</Title>
      <Body>{body}</Body>
      {footer && <Footer>{footer}</Footer>}
    </Root>
  );
}
