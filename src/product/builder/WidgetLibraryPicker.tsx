import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Badge, Button, Chip, TextInput } from '@cake-admin/cakeand';
import { Plus, Search } from 'lucide-react';

import {
  WIDGET_CATEGORIES,
  WIDGET_LIBRARY,
  type WidgetCategory,
  type WidgetLibraryEntry,
} from '../widgets';
import { ICON_SIZE } from '../../iconSize';

type Props = {
  onPick: (entry: WidgetLibraryEntry) => void;
  /** When true, the grid fills its parent instead of capping at a modal height. */
  compact?: boolean;
};

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-300);
  margin-bottom: var(--space-400);
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-150);
  min-width: 0;
  flex: 1 1 240px;
`;

const SearchWrap = styled.div`
  flex: 0 1 240px;
  min-width: 160px;
`;

const Grid = styled.div<{ $compact?: boolean }>`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(100%, ${(p) => (p.$compact ? '10rem' : '220px')}), 1fr)
  );
  gap: ${(p) => (p.$compact ? 'var(--space-300)' : 'var(--space-400)')};
  max-height: ${(p) => (p.$compact ? 'none' : 'min(60vh, 560px)')};
  overflow: auto;
  padding: var(--space-050);
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: var(--space-200);
  min-width: 0;
  padding: var(--space-300);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-1);
`;

const Preview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  padding: var(--space-200);
  border-radius: var(--radius-200);
  background: var(--color-surfaces-on-container-high);
  overflow: hidden;
`;

const Title = styled.h3`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
`;

const Description = styled.p`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  line-height: 1.4;
`;

/**
 * Searchable widget catalog grid — used by the builder modal and anywhere
 * a report needs to pick from the library.
 */
export function WidgetLibraryPicker({ onPick, compact }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<WidgetCategory | 'All'>('All');

  const filtered = useMemo(() => {
    let list = [...WIDGET_LIBRARY];
    if (category !== 'All') list = list.filter((entry) => entry.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (entry) =>
          entry.title.toLowerCase().includes(q) ||
          entry.description.toLowerCase().includes(q) ||
          entry.category.toLowerCase().includes(q),
      );
    }
    return list;
  }, [category, query]);

  return (
    <div>
      <Toolbar>
        <Chips role="toolbar" aria-label="Widget categories">
          {WIDGET_CATEGORIES.map((c) => (
            <Chip
              key={c}
              size="sm"
              type={category === c ? 'primary' : 'secondary'}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
            >
              {c === 'All' ? 'All widgets' : c}
            </Chip>
          ))}
        </Chips>
        <SearchWrap>
          <TextInput
            aria-label="Search widgets"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            startIcon={<Search size={ICON_SIZE} />}
            size="sm"
          />
        </SearchWrap>
      </Toolbar>

      <Grid $compact={compact}>
        {filtered.map((entry) => (
          <Card key={entry.id}>
            <Preview>{entry.render()}</Preview>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-100)' }}>
              <Title>{entry.title}</Title>
              <Badge color="secondary" tone="subtle" dot={false}>
                {entry.category}
              </Badge>
            </div>
            <Description>{entry.description}</Description>
            <Button
              size="sm"
              intent="secondary"
              variant="outline"
              startIcon={<Plus size={ICON_SIZE} />}
              onClick={() => onPick(entry)}
            >
              Add to report
            </Button>
          </Card>
        ))}
      </Grid>
    </div>
  );
}
