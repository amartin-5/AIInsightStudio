import { useMemo, useState } from 'react';
import { Badge, Button, Switch } from '@cake-admin/cakeand';
import { Plus, Workflow } from 'lucide-react';
import styled from 'styled-components';

import { TeamCrest } from '../../product/teams/TeamCrest';
import type { Automation } from '../../product/types';
import { useAppState } from '../AppState';
import { CatalogToolbar } from '../components/CatalogToolbar';
import {
  ActionRow,
  BodyText,
  CardBody,
  CardFooter,
  ListStack,
  MetaRow,
  Muted,
  PageHeader,
  PageSubtitle,
  PageTitle,
  ScrollArea,
  Strong,
  SurfaceCard,
  TitleBlock,
} from '../ui.styles';
import { ICON_SIZE, ICON_SIZE_LG } from '../../iconSize';

type StatusFilter = 'all' | 'active' | 'paused';
type SortKey = 'name' | 'status';

const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
];

const EmptyState = styled.div`
  display: grid;
  gap: var(--space-300);
  justify-items: start;
  padding: var(--space-600);
  border: var(--stroke-100) dashed var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-on-container);
`;

const EmptyIcon = styled.div`
  display: grid;
  place-items: center;
  width: var(--space-800);
  height: var(--space-800);
  border-radius: var(--radius-200);
  background: var(--color-primary-primary-overlay);
  color: var(--color-primary-primary);
`;

const CardTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-300);
  min-width: 0;
`;

const TriggerLine = styled(BodyText)`
  margin: 0;
`;

export function automationTriggerLabel(automation: Automation) {
  if (automation.triggerKind === 'any-match') return 'Every match';
  if (automation.triggerKind === 'team') return `When ${automation.team} plays`;
  return automation.requirements ?? 'Custom match requirements';
}

export function AutomationsView() {
  const {
    snapshot,
    openAutomationEditor,
    toggleAutomation,
    openWorkspace,
    simulateFullTime,
    automationPending,
  } = useAppState();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sort, setSort] = useState<SortKey>('name');

  const activeCount = snapshot.automations.filter((a) => a.enabled).length;

  const filtered = useMemo(() => {
    let list = [...snapshot.automations];

    if (statusFilter === 'active') list = list.filter((a) => a.enabled);
    else if (statusFilter === 'paused') list = list.filter((a) => !a.enabled);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((a) => {
        const haystack = [
          a.name,
          automationTriggerLabel(a),
          a.templateName,
          a.team,
          a.requirements,
          a.lastMatch,
          a.enabled ? 'active' : 'paused',
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    list.sort((a, b) => {
      if (sort === 'status') {
        if (a.enabled !== b.enabled) return a.enabled ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [snapshot.automations, statusFilter, query, sort]);

  return (
    <ScrollArea>
      <PageHeader>
        <TitleBlock>
          <PageTitle>Automations</PageTitle>
          <PageSubtitle>
            Auto-generate reports from match data using a template — when a team
            plays, when any match finishes, or when a match meets your rules.
          </PageSubtitle>
        </TitleBlock>
        <ActionRow>
          <Button
            intent="secondary"
            variant="outline"
            disabled={automationPending}
            onClick={() =>
              simulateFullTime({
                team: 'England',
                matchLabel: 'England 2–1 Colombia',
              })
            }
          >
            {automationPending ? 'Generating…' : 'Simulate full time'}
          </Button>
          <Button startIcon={<Plus size={ICON_SIZE} />} onClick={() => openAutomationEditor()}>
            New automation
          </Button>
        </ActionRow>
      </PageHeader>

      <CatalogToolbar
        filterOptions={STATUS_FILTERS}
        filterValue={statusFilter}
        onFilterChange={(value) => setStatusFilter(value as StatusFilter)}
        filterAriaLabel="Automation status"
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Search automations"
        searchAriaLabel="Search automations"
        sortValue={sort}
        onSortChange={(value) => setSort(value as SortKey)}
        sortOptions={[
          { value: 'name', label: 'A–Z' },
          { value: 'status', label: 'Status' },
        ]}
      />

      <MetaRow style={{ marginBottom: 'var(--space-400)' }}>
        <Muted>
          {activeCount} active · {snapshot.automations.length} total
          {filtered.length !== snapshot.automations.length
            ? ` · ${filtered.length} shown`
            : ''}
          {' · '}
          Post-match runs wait after FT (demo delay is short)
        </Muted>
      </MetaRow>

      <ListStack>
        {snapshot.automations.length === 0 && (
          <EmptyState>
            <EmptyIcon aria-hidden>
              <Workflow size={ICON_SIZE_LG} />
            </EmptyIcon>
            <Strong>No automations yet</Strong>
            <BodyText>
              Create one to generate a report whenever Spain plays — or for every
              match in the tournament.
            </BodyText>
            <Button onClick={() => openAutomationEditor()}>New automation</Button>
          </EmptyState>
        )}

        {snapshot.automations.length > 0 && filtered.length === 0 && (
          <EmptyState>
            <EmptyIcon aria-hidden>
              <Workflow size={ICON_SIZE_LG} />
            </EmptyIcon>
            <Strong>No automations match</Strong>
            <BodyText>Try another filter or clear the search.</BodyText>
            <Button
              intent="secondary"
              onClick={() => {
                setQuery('');
                setStatusFilter('all');
              }}
            >
              Clear filters
            </Button>
          </EmptyState>
        )}

        {filtered.map((automation) => (
          <SurfaceCard key={automation.id} as="div">
            <CardBody>
              <CardTop>
                <div style={{ minWidth: 0, display: 'grid', gap: 'var(--space-100)' }}>
                  <ActionRow style={{ gap: 'var(--space-200)', alignItems: 'center' }}>
                    {automation.triggerKind === 'team' && automation.team ? (
                      <TeamCrest team={automation.team} size="sm" />
                    ) : null}
                    <Strong>{automation.name}</Strong>
                    <Badge
                      color={automation.enabled ? 'green' : 'disabled'}
                      tone="subtle"
                      dot={false}
                    >
                      {automation.enabled ? 'Active' : 'Paused'}
                    </Badge>
                  </ActionRow>
                  <TriggerLine>{automationTriggerLabel(automation)}</TriggerLine>
                  <Muted>
                    Template · {automation.templateName}
                    {automation.triggerEvent === 'full-time'
                      ? ` · ${automation.delayMinutes ?? 30} min after FT`
                      : ''}
                    {automation.requireReview ? ' · Requires review' : ''}
                    {' · '}
                    Notify ·{' '}
                    {automation.notify === 'both'
                      ? 'In-app & email'
                      : automation.notify === 'email'
                        ? 'Email'
                        : 'In-app'}
                  </Muted>
                  {automation.lastRun && (
                    <Muted>
                      Last run · {automation.lastRun}
                      {automation.lastMatch ? ` · ${automation.lastMatch}` : ''}
                      {' · '}
                      {automation.runsGenerated} reports generated
                    </Muted>
                  )}
                </div>
                <Switch
                  label="Enabled"
                  checked={automation.enabled}
                  onCheckedChange={(checked) =>
                    toggleAutomation(automation.id, checked)
                  }
                />
              </CardTop>
            </CardBody>
            <CardFooter>
              <Button
                size="sm"
                intent="secondary"
                variant="outline"
                onClick={() => openAutomationEditor(automation)}
              >
                Edit
              </Button>
              {automation.lastReportId && (
                <Button
                  size="sm"
                  intent="secondary"
                  variant="ghost"
                  onClick={() => openWorkspace(automation.lastReportId)}
                >
                  Open last report
                </Button>
              )}
            </CardFooter>
          </SurfaceCard>
        ))}
      </ListStack>
    </ScrollArea>
  );
}
