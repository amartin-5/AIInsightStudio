import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  ContentSwitcher,
  Modal,
  ModalContent,
  ModalFooter,
  TextInput,
} from '@cake-admin/cakeand';
import { ArrowLeft, LayoutGrid, List, Search } from 'lucide-react';

import { templateCategories } from '../../demos/wwc2023/templates';
import { useAppState } from '../AppState';
import {
  ActionRow,
  BodyText,
  CardBody,
  CardFooter,
  CardGrid,
  FilterBar,
  ListRowCard,
  ListStack,
  MetaRow,
  Muted,
  PageHeader,
  PageSubtitle,
  PageTitle,
  PreviewThumb,
  ScrollArea,
  Strong,
  SurfaceCard,
  TitleBlock,
} from '../ui.styles';

export function TemplatesView() {
  const {
    templates,
    openHome,
    startSetup,
    previewTemplateId,
    setPreviewTemplate,
  } = useAppState();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
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

  return (
    <ScrollArea>
      <PageHeader>
        <TitleBlock>
          <ActionRow>
            <Button
              size="sm"
              intent="secondary"
              variant="ghost"
              startIcon={<ArrowLeft size={16} />}
              onClick={openHome}
            >
              Back
            </Button>
          </ActionRow>
          <PageTitle>Start a new report</PageTitle>
          <PageSubtitle>Choose a validated workflow or begin with a blank report.</PageSubtitle>
        </TitleBlock>
      </PageHeader>

      <FilterBar>
        <div style={{ flex: '1 1 260px', maxWidth: 400, minWidth: 0 }}>
          <TextInput
            aria-label="Search templates"
            placeholder="Search templates"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            startIcon={<Search size={16} />}
            size="sm"
          />
        </div>
        <Button
          size="sm"
          intent="secondary"
          variant={sort === 'recommended' ? 'tonal' : 'ghost'}
          onClick={() => setSort('recommended')}
        >
          Sort: Recommended
        </Button>
        <Button
          size="sm"
          intent="secondary"
          variant={sort === 'name' ? 'tonal' : 'ghost'}
          onClick={() => setSort('name')}
        >
          Sort: Name
        </Button>
        <ContentSwitcher
          aria-label="Template layout"
          size="sm"
          iconOnly
          value={viewMode}
          onValueChange={setViewMode}
          options={[
            { value: 'grid', label: 'Grid', icon: <LayoutGrid size={16} /> },
            { value: 'list', label: 'List', icon: <List size={16} /> },
          ]}
        />
      </FilterBar>

      <FilterBar>
        {templateCategories.map((cat) => (
          <Button
            key={cat}
            size="sm"
            intent="secondary"
            variant={category === cat ? 'tonal' : 'ghost'}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </FilterBar>

      {filtered.length === 0 ? (
        <SurfaceCard>
          <Strong>No templates match the filter</Strong>
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
        </SurfaceCard>
      ) : viewMode === 'grid' ? (
        <CardGrid>
          {filtered.map((template) => (
            <SurfaceCard key={template.id}>
              <PreviewThumb>{template.name} preview</PreviewThumb>
              <CardBody>
                <Strong>{template.name}</Strong>
                <BodyText>{template.purpose}</BodyText>
                <MetaRow>
                  <Badge color="secondary" tone="subtle" dot={false}>
                    {template.audience}
                  </Badge>
                </MetaRow>
                <Muted>
                  {template.pages} pages · {template.requiredData.length} data categories
                </Muted>
              </CardBody>
              <CardFooter>
                <Button
                  size="sm"
                  intent="secondary"
                  variant="outline"
                  onClick={() => setPreviewTemplate(template.id)}
                >
                  Preview
                </Button>
                <Button size="sm" onClick={() => startSetup(template.id)}>
                  Use template
                </Button>
              </CardFooter>
            </SurfaceCard>
          ))}
        </CardGrid>
      ) : (
        <ListStack>
          {filtered.map((template) => (
            <ListRowCard key={template.id} as="div">
              <CardBody style={{ flex: '1 1 280px' }}>
                <Strong>{template.name}</Strong>
                <BodyText>{template.purpose}</BodyText>
                <Muted>
                  {template.audience} · {template.pages} pages · {template.category}
                </Muted>
              </CardBody>
              <CardFooter style={{ marginTop: 0, paddingTop: 0 }}>
                <Button
                  size="sm"
                  intent="secondary"
                  variant="outline"
                  onClick={() => setPreviewTemplate(template.id)}
                >
                  Preview
                </Button>
                <Button size="sm" onClick={() => startSetup(template.id)}>
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
            primaryActionLabel="Use this template"
            secondaryActionLabel="Close"
            onPrimaryAction={() => preview && startSetup(preview.id)}
            onSecondaryAction={() => setPreviewTemplate(null)}
          />
        }
      >
        {preview && (
          <ModalContent descriptionAsDialogDescription={false}>
            <div style={{ display: 'grid', gap: 'var(--space-400)', minWidth: 0 }}>
              <PreviewThumb style={{ minHeight: 148 }}>Larger preview placeholder</PreviewThumb>
              <BodyText>
                <strong>Recommended use:</strong> {preview.audience}
              </BodyText>
              <BodyText>
                <strong>Included pages:</strong> {preview.sections.join(', ')}
              </BodyText>
              <BodyText>
                <strong>Included report objects:</strong> {preview.objects.join(', ') || 'None'}
              </BodyText>
              <BodyText>
                <strong>Required information:</strong> {preview.requiredData.join(', ')}
              </BodyText>
              <BodyText>
                <strong>Suggested AI prompts:</strong> {preview.suggestedPrompts.join(' · ')}
              </BodyText>
              <BodyText>
                <strong>Refresh behavior:</strong> {preview.refreshBehavior}
              </BodyText>
            </div>
          </ModalContent>
        )}
      </Modal>
    </ScrollArea>
  );
}
