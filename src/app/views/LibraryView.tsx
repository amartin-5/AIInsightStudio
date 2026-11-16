import { useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Badge,
  Button,
  IconButton,
  Modal,
  ModalContent,
  ModalFooter,
} from '@cake-admin/cakeand';
import { Expand, FilePlus2, Plus } from 'lucide-react';

import { widgetToReportObject } from '../../product/builder';
import {
  WIDGET_CATEGORIES,
  WIDGET_LIBRARY,
  type WidgetCategory,
  type WidgetLibraryEntry,
} from '../../product/widgets';
import { useAppState } from '../AppState';
import {
  CatalogCategoryPills,
  CatalogResultMeta,
  CatalogToolbar,
} from '../components/CatalogToolbar';
import {
  ActionRow,
  BodyText,
  CardFooter,
  Muted,
  PageHeader,
  PageSubtitle,
  PageTitle,
  ScrollArea,
  Strong,
  TitleBlock,
} from '../ui.styles';
import { ICON_SIZE, ICON_SIZE_LG } from '../../iconSize';

const LibraryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: var(--space-500);
  align-items: stretch;
`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  gap: var(--space-200);
  padding: var(--space-300);
  background-image: linear-gradient(
    180deg,
    transparent 0%,
    color-mix(in srgb, var(--color-surfaces-container) 88%, transparent) 55%,
    var(--color-surfaces-container) 100%
  );
  opacity: 0;
  pointer-events: none;
  transition: opacity 160ms ease;
`;

const Card = styled.article`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--space-200);
  min-width: 0;
  height: 100%;
  min-height: 360px;
  padding: var(--space-400);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-2);
  overflow: hidden;
  transition: box-shadow 160ms ease, transform 160ms ease;

  &:hover,
  &:focus-within {
    transform: translateY(-2px);
    box-shadow: var(--elevation-3);
  }

  &:hover ${HoverOverlay},
  &:focus-within ${HoverOverlay} {
    opacity: 1;
    pointer-events: auto;
  }
`;

const CardHeader = styled.div`
  display: grid;
  gap: var(--space-100);
  min-width: 0;
  flex: none;
`;

const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-150);
`;

const CardTitle = styled.h3`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
`;

const CardDescription = styled.p`
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  line-height: 1.4;
`;

const Preview = styled.div`
  position: relative;
  flex: 1 1 auto;
  min-height: 220px;
  max-height: 220px;
  border-radius: var(--radius-200);
  border: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-on-container);
  overflow: hidden;
`;

const PreviewInner = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: var(--space-300);
  overflow: auto;
`;

const OverlayActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-150);
`;

const FullscreenBody = styled.div`
  display: grid;
  gap: var(--space-400);
  min-width: 0;
  min-height: min(70vh, 640px);
`;

const FullscreenPreview = styled.div`
  box-sizing: border-box;
  min-height: min(60vh, 560px);
  padding: var(--space-500);
  border-radius: var(--radius-300);
  border: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-on-container);
  overflow: auto;
`;

const EmptyState = styled.div`
  display: grid;
  gap: var(--space-300);
  justify-items: start;
  padding: var(--space-700) var(--space-600);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-400);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-0);
`;

export function LibraryView() {
  const { activeReport, addObjectToPage, openWorkspace, startSetup, setToast } = useAppState();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<WidgetCategory | 'All'>('All');
  const [sort, setSort] = useState<'name' | 'category'>('name');
  const [previewId, setPreviewId] = useState<string | null>(null);

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
    list.sort((a, b) =>
      sort === 'category'
        ? a.category.localeCompare(b.category) || a.title.localeCompare(b.title)
        : a.title.localeCompare(b.title),
    );
    return list;
  }, [category, query, sort]);

  const preview = WIDGET_LIBRARY.find((entry) => entry.id === previewId) ?? null;
  const resultLabel = category === 'All' ? 'All widgets' : category;

  const addToReport = (entry: WidgetLibraryEntry) => {
    if (!activeReport) {
      setToast({ message: 'Open or create a report first' });
      return;
    }
    addObjectToPage(widgetToReportObject(entry));
    setToast({
      message: `Added “${entry.title}” to ${activeReport.name}`,
      actionLabel: 'Open report',
      onAction: () => openWorkspace(activeReport.id),
    });
  };

  const createNewReport = () => {
    setPreviewId(null);
    startSetup('blank');
  };

  return (
    <ScrollArea>
      <PageHeader>
        <TitleBlock>
          <PageTitle>Library</PageTitle>
          <PageSubtitle>
            Reusable Women’s World Cup data visualizations and match widgets for Insight Studio
            reports.
          </PageSubtitle>
        </TitleBlock>
      </PageHeader>

      <CatalogToolbar
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Search widgets"
        searchAriaLabel="Search widgets"
        sortValue={sort}
        onSortChange={(value) => setSort(value as 'name' | 'category')}
        sortOptions={[
          { value: 'name', label: 'A–Z' },
          { value: 'category', label: 'Category' },
        ]}
      />

      <CatalogCategoryPills
        categories={[...WIDGET_CATEGORIES]}
        value={category}
        onChange={(value) => setCategory(value as WidgetCategory | 'All')}
        ariaLabel="Widget categories"
      />

      <CatalogResultMeta label={resultLabel} count={filtered.length} noun="widget" />

      {filtered.length === 0 ? (
        <EmptyState>
          <Strong>No widgets match</Strong>
          <BodyText>Try another category or clear the search.</BodyText>
          <CardFooter>
            <Button
              size="sm"
              intent="secondary"
              onClick={() => {
                setQuery('');
                setCategory('All');
              }}
            >
              Clear filters
            </Button>
          </CardFooter>
        </EmptyState>
      ) : (
        <LibraryGrid>
          {filtered.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <TitleRow>
                  <CardTitle>{entry.title}</CardTitle>
                  <Badge color="secondary" tone="subtle" dot={false}>
                    {entry.category}
                  </Badge>
                </TitleRow>
                <CardDescription>{entry.description}</CardDescription>
              </CardHeader>
              <Preview>
                <PreviewInner>{entry.render()}</PreviewInner>
                <HoverOverlay>
                  <OverlayActions>
                    <Button
                      size="sm"
                      intent="secondary"
                      variant="outline"
                      startIcon={<Plus size={ICON_SIZE} />}
                      onClick={() => addToReport(entry)}
                    >
                      Add to a report
                    </Button>
                    <Button
                      size="sm"
                      intent="secondary"
                      variant="tonal"
                      startIcon={<FilePlus2 size={ICON_SIZE} />}
                      onClick={createNewReport}
                    >
                      Create a new report
                    </Button>
                    <IconButton
                      label={`Open full screen sample of ${entry.title}`}
                      icon={<Expand size={ICON_SIZE_LG} />}
                      size="sm"
                      intent="secondary"
                      variant="outline"
                      onClick={() => setPreviewId(entry.id)}
                    />
                  </OverlayActions>
                </HoverOverlay>
              </Preview>
            </Card>
          ))}
        </LibraryGrid>
      )}

      <Modal
        open={Boolean(preview)}
        onOpenChange={(open) => !open && setPreviewId(null)}
        title={preview?.title ?? 'Widget sample'}
        subtitle={preview?.description}
        footer={
          <ModalFooter
            checkbox={false}
            actions={
              <ActionRow>
                <Button
                  size="sm"
                  intent="secondary"
                  variant="ghost"
                  onClick={() => setPreviewId(null)}
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  intent="secondary"
                  variant="outline"
                  startIcon={<Plus size={ICON_SIZE} />}
                  onClick={() => {
                    if (!preview) return;
                    addToReport(preview);
                    setPreviewId(null);
                  }}
                >
                  Add to a report
                </Button>
                <Button size="sm" startIcon={<FilePlus2 size={ICON_SIZE} />} onClick={createNewReport}>
                  Create a new report
                </Button>
              </ActionRow>
            }
          />
        }
      >
        {preview && (
          <ModalContent descriptionAsDialogDescription={false}>
            <FullscreenBody>
              <Muted>{preview.category}</Muted>
              <FullscreenPreview>{preview.render()}</FullscreenPreview>
            </FullscreenBody>
          </ModalContent>
        )}
      </Modal>
    </ScrollArea>
  );
}
