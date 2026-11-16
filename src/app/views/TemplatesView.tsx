import { useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Badge,
  Button,
  Card,
  Chip,
  Modal,
  ModalContent,
  ModalFooter,
  SimpleCard,
} from '@cake-admin/cakeand';
import { Plus, Sparkles } from 'lucide-react';

import { templateCategories } from '../../demos/wwc2023/templates';
import { useAppState } from '../AppState';
import {
  CatalogCategoryPills,
  CatalogResultMeta,
  CatalogToolbar,
} from '../components/CatalogToolbar';
import { TemplatePreviewArt } from '../components/TemplatePreviewArt';
import {
  ActionRow,
  BodyText,
  CardFooter,
  ListRowCard,
  ListStack,
  MetaRow,
  Muted,
  PageHeader,
  PageSubtitle,
  PageTitle,
  ScrollArea,
  Strong,
  TitleBlock,
} from '../ui.styles';
import { ICON_SIZE } from '../../iconSize';

const Intro = styled.div`
  display: grid;
  gap: var(--space-500);
  margin-bottom: var(--space-600);
`;

const HeaderActions = styled(ActionRow)`
  flex: none;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: var(--space-500);
  align-items: stretch;
`;

const TemplateCardShell = styled.div`
  min-width: 0;
  height: 100%;
  transition: transform 180ms ease, box-shadow 180ms ease;

  &:hover {
    transform: translateY(-2px);
  }

  & > * {
    height: 100%;
  }
`;

const MediaBadge = styled.div`
  position: absolute;
  top: var(--space-300);
  right: var(--space-300);
  z-index: 3;
`;

const CardMeta = styled.div`
  display: grid;
  gap: var(--space-200);
  margin-top: var(--space-200);
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

const ListMedia = styled.div`
  flex: none;
  width: 112px;
  min-height: 84px;
  border-radius: var(--radius-200);
  overflow: hidden;
`;

const PreviewStack = styled.div`
  display: grid;
  gap: var(--space-400);
  min-width: 0;
`;

const PreviewMedia = styled.div`
  min-width: 0;
  border-radius: var(--radius-300);
  overflow: hidden;
`;

const PreviewFacts = styled.div`
  display: grid;
  gap: var(--space-300);
  min-width: 0;
`;

const Fact = styled.div`
  display: grid;
  gap: var(--space-050);
  min-width: 0;
`;

const FactLabel = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.04em;
  line-height: 1.35;
  text-transform: uppercase;
`;

export function TemplatesView() {
  const {
    templates,
    openCreateReport,
    previewTemplateId,
    setPreviewTemplate,
  } = useAppState();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState<'recommended' | 'name'>('recommended');

  const filtered = useMemo(() => {
    let list = [...templates];
    if (category === 'Recommended') list = list.filter((t) => t.recommended);
    else if (category !== 'All') list = list.filter((t) => t.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.purpose.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      );
    }
    list.sort((a, b) =>
      sort === 'name'
        ? a.name.localeCompare(b.name)
        : Number(b.recommended) - Number(a.recommended) || a.name.localeCompare(b.name),
    );
    return list;
  }, [templates, category, query, sort]);

  const preview = templates.find((t) => t.id === previewTemplateId);
  const resultLabel =
    category === 'All' ? 'All templates' : category === 'Recommended' ? 'Recommended' : category;

  return (
    <ScrollArea>
      <Intro>
        <PageHeader>
          <TitleBlock>
            <PageTitle>Templates</PageTitle>
            <PageSubtitle>
              Curated workflows for match analysis, briefings, and executive summaries — start
              polished, stay editable.
            </PageSubtitle>
          </TitleBlock>
          <HeaderActions>
            <Button
              size="md"
              intent="secondary"
              variant="outline"
              startIcon={<Sparkles size={ICON_SIZE} />}
              onClick={() => openCreateReport('custom-ai')}
            >
              Custom AI build
            </Button>
            <Button size="md" startIcon={<Plus size={ICON_SIZE} />} onClick={() => openCreateReport('blank')}>
              Blank template
            </Button>
          </HeaderActions>
        </PageHeader>
      </Intro>

      <CatalogToolbar
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Search templates"
        searchAriaLabel="Search templates"
        sortValue={sort}
        onSortChange={(value) => setSort(value as 'recommended' | 'name')}
        sortOptions={[
          { value: 'recommended', label: 'Recommended' },
          { value: 'name', label: 'A–Z' },
        ]}
        showLayoutToggle
        layoutValue={viewMode}
        onLayoutChange={setViewMode}
        layoutAriaLabel="Template layout"
      />

      <CatalogCategoryPills
        categories={templateCategories}
        value={category}
        onChange={setCategory}
        ariaLabel="Template types"
        leadingIconFor={(cat) =>
          cat === 'Recommended' ? <Sparkles size={ICON_SIZE} /> : undefined
        }
      />

      <CatalogResultMeta label={resultLabel} count={filtered.length} noun="template" />

      {filtered.length === 0 ? (
        <EmptyState>
          <Strong>No templates match</Strong>
          <BodyText>Try another type or clear the search.</BodyText>
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
      ) : viewMode === 'grid' ? (
        <TemplateGrid>
          {filtered.map((template) => (
            <TemplateCardShell key={template.id}>
              <Card elevation="low">
                <SimpleCard
                  media={
                    <TemplatePreviewArt
                      templateId={template.id}
                      category={template.category}
                      badge={
                        template.recommended ? (
                          <MediaBadge>
                            <Chip size="sm" type="info" leadingIcon={<Sparkles size={ICON_SIZE} />}>
                              Recommended
                            </Chip>
                          </MediaBadge>
                        ) : undefined
                      }
                    />
                  }
                  title={template.name}
                  body={
                    <CardMeta>
                      <BodyText>{template.purpose}</BodyText>
                      <MetaRow>
                        <Badge color="secondary" tone="subtle" dot={false}>
                          {template.audience}
                        </Badge>
                        <Muted>
                          {template.pages} pages · {template.requiredData.length} data categories
                        </Muted>
                      </MetaRow>
                    </CardMeta>
                  }
                  actions={
                    <ActionRow>
                      <Button
                        size="sm"
                        intent="secondary"
                        variant="outline"
                        onClick={() => setPreviewTemplate(template.id)}
                      >
                        Preview
                      </Button>
                      <Button size="sm" onClick={() => openCreateReport(template.id)}>
                        Use template
                      </Button>
                    </ActionRow>
                  }
                />
              </Card>
            </TemplateCardShell>
          ))}
        </TemplateGrid>
      ) : (
        <ListStack>
          {filtered.map((template) => (
            <ListRowCard key={template.id} as="div">
              <ListMedia aria-hidden>
                <TemplatePreviewArt
                  templateId={template.id}
                  category={template.category}
                  compact
                  showCategory={false}
                />
              </ListMedia>
              <div
                style={{
                  display: 'grid',
                  gap: 'var(--space-200)',
                  flex: '1 1 280px',
                  minWidth: 0,
                }}
              >
                <MetaRow>
                  <Strong>{template.name}</Strong>
                  {template.recommended && (
                    <Chip size="sm" type="info" leadingIcon={<Sparkles size={ICON_SIZE} />}>
                      Recommended
                    </Chip>
                  )}
                </MetaRow>
                <BodyText>{template.purpose}</BodyText>
                <Muted>
                  {template.category} · {template.audience} · {template.pages} pages
                </Muted>
              </div>
              <CardFooter style={{ marginTop: 0, paddingTop: 0 }}>
                <Button
                  size="sm"
                  intent="secondary"
                  variant="outline"
                  onClick={() => setPreviewTemplate(template.id)}
                >
                  Preview
                </Button>
                <Button size="sm" onClick={() => openCreateReport(template.id)}>
                  Use template
                </Button>
              </CardFooter>
            </ListRowCard>
          ))}
        </ListStack>
      )}

      <Modal
        open={Boolean(preview)}
        onOpenChange={(open) => !open && setPreviewTemplate(null)}
        title={preview?.name ?? 'Template preview'}
        subtitle={preview?.purpose}
        footer={
          <ModalFooter
            checkbox={false}
            primaryActionLabel="Use this template"
            secondaryActionLabel="Close"
            onPrimaryAction={() => {
              if (!preview) return;
              setPreviewTemplate(null);
              openCreateReport(preview.id);
            }}
            onSecondaryAction={() => setPreviewTemplate(null)}
          />
        }
      >
        {preview && (
          <ModalContent descriptionAsDialogDescription={false}>
            <PreviewStack>
              <PreviewMedia>
                <TemplatePreviewArt
                  templateId={preview.id}
                  category={preview.category}
                  tall
                  badge={
                    preview.recommended ? (
                      <MediaBadge>
                        <Chip size="sm" type="info" leadingIcon={<Sparkles size={ICON_SIZE} />}>
                          Recommended
                        </Chip>
                      </MediaBadge>
                    ) : undefined
                  }
                />
              </PreviewMedia>
              <PreviewFacts>
                <Fact>
                  <FactLabel>Recommended use</FactLabel>
                  <BodyText>{preview.audience}</BodyText>
                </Fact>
                <Fact>
                  <FactLabel>Included pages</FactLabel>
                  <BodyText>{preview.sections.join(', ')}</BodyText>
                </Fact>
                <Fact>
                  <FactLabel>Report objects</FactLabel>
                  <BodyText>{preview.objects.join(', ') || 'None'}</BodyText>
                </Fact>
                <Fact>
                  <FactLabel>Required information</FactLabel>
                  <BodyText>{preview.requiredData.join(', ')}</BodyText>
                </Fact>
                <Fact>
                  <FactLabel>Suggested AI prompts</FactLabel>
                  <BodyText>{preview.suggestedPrompts.join(' · ')}</BodyText>
                </Fact>
                <Fact>
                  <FactLabel>Refresh behavior</FactLabel>
                  <BodyText>{preview.refreshBehavior}</BodyText>
                </Fact>
                {preview.editableFields && preview.editableFields.length > 0 && (
                  <Fact>
                    <FactLabel>Editable fields</FactLabel>
                    <BodyText>
                      {preview.editableFields
                        .map((field) => field.replace(/-/g, ' '))
                        .join(' · ')}
                    </BodyText>
                  </Fact>
                )}
              </PreviewFacts>
            </PreviewStack>
          </ModalContent>
        )}
      </Modal>
    </ScrollArea>
  );
}
