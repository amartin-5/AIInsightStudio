import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Button, Chip, ContentSwitcher, TextInput } from '@cake-admin/cakeand';
import { LayoutGrid, List, Search } from 'lucide-react';

import { FilterBar, MetaRow, Muted } from '../ui.styles';

export type CatalogSortOption = {
  value: string;
  label: string;
};

export type CatalogToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  sortValue: string;
  onSortChange: (value: string) => void;
  sortOptions: CatalogSortOption[];
  layoutValue?: 'grid' | 'list';
  onLayoutChange?: (value: 'grid' | 'list') => void;
  showLayoutToggle?: boolean;
  layoutAriaLabel?: string;
};

export type CatalogCategoryPillsProps = {
  categories: readonly string[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
  leadingIconFor?: (category: string) => ReactNode | undefined;
};

export type CatalogResultMetaProps = {
  label: string;
  count: number;
  noun?: string;
};

const Toolbar = styled(FilterBar)`
  align-items: center;
  gap: var(--space-300);
  padding: var(--space-300) var(--space-400);
  margin-bottom: var(--space-400);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-1000);
  background: var(--color-surfaces-container-blur-high);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: var(--elevation-0);
`;

const SearchSlot = styled.div`
  flex: 1 1 240px;
  max-width: 360px;
  min-width: 0;
`;

const PillRow = styled(MetaRow)`
  margin-bottom: var(--space-500);
  gap: var(--space-150);
`;

const ResultMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-200);
  margin-bottom: var(--space-400);
  min-width: 0;
`;

const ResultLabel = styled.span`
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-medium);
  letter-spacing: -0.01em;
  line-height: 1.35;
`;

/** Shared search / sort / layout chrome used by Templates, Library, and similar catalogs. */
export function CatalogToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search',
  searchAriaLabel = 'Search',
  sortValue,
  onSortChange,
  sortOptions,
  layoutValue = 'grid',
  onLayoutChange,
  showLayoutToggle = false,
  layoutAriaLabel = 'Layout',
}: CatalogToolbarProps) {
  return (
    <Toolbar>
      <SearchSlot>
        <TextInput
          aria-label={searchAriaLabel}
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          startIcon={<Search size={16} />}
          size="sm"
        />
      </SearchSlot>
      {sortOptions.map((option) => (
        <Button
          key={option.value}
          size="sm"
          intent="secondary"
          variant={sortValue === option.value ? 'tonal' : 'ghost'}
          onClick={() => onSortChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
      {showLayoutToggle && onLayoutChange && (
        <ContentSwitcher
          aria-label={layoutAriaLabel}
          size="sm"
          iconOnly
          value={layoutValue}
          onValueChange={(value) => onLayoutChange(value as 'grid' | 'list')}
          options={[
            { value: 'grid', label: 'Grid', icon: <LayoutGrid size={16} /> },
            { value: 'list', label: 'List', icon: <List size={16} /> },
          ]}
        />
      )}
    </Toolbar>
  );
}

export function CatalogCategoryPills({
  categories,
  value,
  onChange,
  ariaLabel = 'Categories',
  leadingIconFor,
}: CatalogCategoryPillsProps) {
  return (
    <PillRow role="toolbar" aria-label={ariaLabel}>
      {categories.map((category) => (
        <Chip
          key={category}
          size="sm"
          type={value === category ? 'primary' : 'secondary'}
          onClick={() => onChange(category)}
          aria-pressed={value === category}
          leadingIcon={leadingIconFor?.(category)}
        >
          {category}
        </Chip>
      ))}
    </PillRow>
  );
}

export function CatalogResultMeta({ label, count, noun = 'item' }: CatalogResultMetaProps) {
  const plural = count === 1 ? noun : `${noun}s`;
  return (
    <ResultMeta>
      <ResultLabel>{label}</ResultLabel>
      <Muted>
        {count} {plural}
      </Muted>
    </ResultMeta>
  );
}
