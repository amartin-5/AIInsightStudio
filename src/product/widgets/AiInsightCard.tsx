import styled from 'styled-components';
import { Sparkles } from 'lucide-react';
import { ICON_SIZE } from '../../iconSize';

type Props = {
  eyebrow?: string;
  title: string;
  body: string;
  footer?: string;
};

const Root = styled.div`
  display: grid;
  gap: var(--space-250);
  padding: var(--space-500);
  border-radius: var(--radius-400);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-left: 3px solid var(--color-primary-primary);
  background: linear-gradient(
    135deg,
    var(--color-surfaces-primary) 0%,
    var(--color-surfaces-container) 48%,
    var(--color-surfaces-on-container-high) 100%
  );
  box-shadow: var(--elevation-3);
  min-height: 100%;
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
        <Sparkles size={ICON_SIZE} aria-hidden />
        {eyebrow}
      </Eyebrow>
      <Title>{title}</Title>
      <Body>{body}</Body>
      {footer && <Footer>{footer}</Footer>}
    </Root>
  );
}
