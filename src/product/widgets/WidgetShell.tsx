import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Badge } from '@cake-admin/cakeand';

type Props = {
  title: string;
  description?: string;
  category?: string;
  children: ReactNode;
};

const Shell = styled.article`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  min-width: 0;
  height: 100%;
  padding: var(--space-500);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-2);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-100);
  min-width: 0;
`;

const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-200);
`;

const Title = styled.h3`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
`;

const Description = styled.p`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  line-height: 1.45;
`;

const Body = styled.div`
  min-width: 0;
  flex: 1 1 auto;
`;

/** Shared card chrome for reusable library widgets. */
export function WidgetShell({ title, description, category, children }: Props) {
  return (
    <Shell>
      <Header>
        <TitleRow>
          <Title>{title}</Title>
          {category && (
            <Badge color="secondary" tone="subtle" dot={false}>
              {category}
            </Badge>
          )}
        </TitleRow>
        {description && <Description>{description}</Description>}
      </Header>
      <Body>{children}</Body>
    </Shell>
  );
}
