import { useMemo, useState } from 'react';
import { Badge, Button, IconButton } from '@cake-admin/cakeand';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  MessageSquare,
  Plus,
  RefreshCw,
  Share2,
  Sparkles,
  Star,
} from 'lucide-react';
import styled from 'styled-components';

import { TeamCrest } from '../../product/teams/TeamCrest';
import type { ReportRecord } from '../../product/types';
import { useAppState } from '../AppState';
import { CatalogToolbar } from '../components/CatalogToolbar';
import {
  ActionRow,
  BodyText,
  CardBody,
  CardFooter,
  Muted,
  PreviewThumb,
  ScrollArea,
  Section,
  SectionHeader,
  SectionTitle,
  Strong,
  SurfaceCard,
} from '../ui.styles';
import { ICON_SIZE } from '../../iconSize';

type FilterTab = 'recent' | 'favorites' | 'shared';
type SortKey = 'modified' | 'name' | 'status';

const FILTER_OPTIONS: { value: FilterTab; label: string }[] = [
  { value: 'recent', label: 'Recent' },
  { value: 'favorites', label: 'Favorites' },
  { value: 'shared', label: 'Shared with me' },
];

const INITIAL_FAVORITES = new Set(['england-opponent', 'australia-overview']);

function greetingForNow(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function activityForReport(report: ReportRecord) {
  if (report.status === 'Shared' || report.sharing.toLowerCase().includes('shared')) {
    return {
      icon: <Share2 size={ICON_SIZE} aria-hidden />,
      label:
        report.owner === 'You'
          ? `Shared · ${report.sharing}`
          : `${report.owner} shared this report`,
    };
  }
  if (report.status === 'Refresh scheduled' || report.schedule) {
    return {
      icon: <RefreshCw size={ICON_SIZE} aria-hidden />,
      label: report.schedule
        ? `Refresh scheduled · ${report.schedule.when}`
        : 'Refresh scheduled',
    };
  }
  if (report.status === 'Needs review') {
    return {
      icon: <MessageSquare size={ICON_SIZE} aria-hidden />,
      label: 'Needs review before sharing',
    };
  }
  if (report.status === 'Draft') {
    return {
      icon: <FileText size={ICON_SIZE} aria-hidden />,
      label: 'Draft · only you can see this',
    };
  }
  return {
    icon: <RefreshCw size={ICON_SIZE} aria-hidden />,
    label: `Updated · ${report.lastUpdated}`,
  };
}

function reportPath(report: ReportRecord) {
  const parts = ['Reports', report.templateType];
  if (report.team) parts.push(report.team);
  return parts.join(' › ');
}

function statusBadgeColor(status: ReportRecord['status']) {
  if (status === 'Needs review') return 'amber' as const;
  if (status === 'Draft') return 'disabled' as const;
  if (status === 'Shared') return 'blue' as const;
  if (status === 'Refresh scheduled') return 'indigo' as const;
  return 'green' as const;
}

export function ReportsLibraryView() {
  const { snapshot, openWorkspace, openCreateReport } = useAppState();
  const [recommendedOpen, setRecommendedOpen] = useState(true);
  const [filter, setFilter] = useState<FilterTab>('recent');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('modified');
  const [favorites, setFavorites] = useState(() => new Set(INITIAL_FAVORITES));

  const recommended = snapshot.reports.slice(0, 5);

  const filtered = useMemo(() => {
    let list = [...snapshot.reports];

    if (filter === 'favorites') {
      list = list.filter((r) => favorites.has(r.id));
    } else if (filter === 'shared') {
      list = list.filter((r) => r.sharing.toLowerCase().includes('shared'));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.templateType.toLowerCase().includes(q) ||
          r.owner.toLowerCase().includes(q) ||
          r.status.toLowerCase().includes(q) ||
          (r.team?.toLowerCase().includes(q) ?? false),
      );
    }

    list.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'status') return a.status.localeCompare(b.status);
      // Demo data uses relative labels; keep the snapshot order as "most recent first".
      return (
        snapshot.reports.findIndex((r) => r.id === a.id) -
        snapshot.reports.findIndex((r) => r.id === b.id)
      );
    });

    return list;
  }, [snapshot.reports, filter, favorites, query, sort]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <ScrollArea>
      <GreetingBlock>
        <Greeting>{greetingForNow()}</Greeting>
        <ActionRow>
          <Button
            size="md"
            intent="secondary"
            variant="outline"
            startIcon={<Sparkles size={ICON_SIZE} />}
            onClick={() => openCreateReport('custom-ai')}
          >
            Custom AI build
          </Button>
          <Button size="md" startIcon={<Plus size={ICON_SIZE} />} onClick={() => openCreateReport()}>
            New report
          </Button>
        </ActionRow>
      </GreetingBlock>

      <Section>
        <SectionHeader>
          <SectionToggle
            type="button"
            aria-expanded={recommendedOpen}
            onClick={() => setRecommendedOpen((v) => !v)}
          >
            <SectionTitle>Recommended for you</SectionTitle>
            {recommendedOpen ? <ChevronUp size={ICON_SIZE} aria-hidden /> : <ChevronDown size={ICON_SIZE} aria-hidden />}
          </SectionToggle>
        </SectionHeader>

        {recommendedOpen && (
          <HorizontalScroll role="list" aria-label="Recommended reports">
            {recommended.map((report) => {
              const activity = activityForReport(report);
              return (
                <RecCard
                  key={report.id}
                  role="listitem"
                  as="button"
                  type="button"
                  onClick={() => openWorkspace(report.id)}
                >
                  <ActivityLine>
                    {activity.icon}
                    <span>{activity.label}</span>
                  </ActivityLine>
                  <RecTitle>{report.name}</RecTitle>
                  <Muted>{report.lastUpdated}</Muted>
                  <RecPreview>
                    {report.team ? (
                      <RecTeamPreview>
                        <TeamCrest team={report.team} size={48} />
                        <span>{report.templateType}</span>
                      </RecTeamPreview>
                    ) : (
                      report.templateType
                    )}
                  </RecPreview>
                </RecCard>
              );
            })}
          </HorizontalScroll>
        )}
      </Section>

      <Section>
        <CatalogToolbar
          filterOptions={FILTER_OPTIONS}
          filterValue={filter}
          onFilterChange={(value) => setFilter(value as FilterTab)}
          filterAriaLabel="Report filters"
          searchValue={query}
          onSearchChange={setQuery}
          searchPlaceholder="Search for a report"
          searchAriaLabel="Search for a report"
          sortMode="dropdown"
          sortValue={sort}
          onSortChange={(value) => setSort(value as SortKey)}
          sortAriaLabel="Sort reports"
          sortOptions={[
            { label: 'Date modified', value: 'modified' },
            { label: 'Name', value: 'name' },
            { label: 'Status', value: 'status' },
          ]}
        />

        <FileList aria-label="Reports">
          <FileHeader>
            <span>Name</span>
            <span>Date modified</span>
          </FileHeader>

          {filtered.length === 0 ? (
            <EmptyState>
              <Strong>No reports match</Strong>
              <BodyText>
                {filter === 'favorites'
                  ? 'Star a report to add it to Favorites.'
                  : filter === 'shared'
                    ? 'Shared reports will appear here.'
                    : 'Try another filter or clear the search.'}
              </BodyText>
              <CardFooter>
                <Button
                  size="sm"
                  intent="secondary"
                  onClick={() => {
                    setQuery('');
                    setFilter('recent');
                  }}
                >
                  Clear filters
                </Button>
              </CardFooter>
            </EmptyState>
          ) : (
            filtered.map((report) => {
              const isFavorite = favorites.has(report.id);
              return (
                <FileRow key={report.id}>
                  <FileMain type="button" onClick={() => openWorkspace(report.id)}>
                    <FileIcon aria-hidden>
                      {report.team ? <TeamCrest team={report.team} size={22} /> : <FileText size={ICON_SIZE} />}
                    </FileIcon>
                    <FileTextBlock>
                      <FileName>{report.name}</FileName>
                      <FileMeta>
                        {reportPath(report)}
                        <MetaDot aria-hidden>·</MetaDot>
                        <Badge color={statusBadgeColor(report.status)} tone="subtle" dot={false}>
                          {report.status}
                        </Badge>
                      </FileMeta>
                    </FileTextBlock>
                  </FileMain>
                  <FileDate>{report.lastUpdated}</FileDate>
                  <FileActions>
                    <IconButton
                      size="xs"
                      intent="secondary"
                      variant="ghost"
                      label={isFavorite ? `Remove ${report.name} from favorites` : `Add ${report.name} to favorites`}
                      icon={<Star size={ICON_SIZE} fill={isFavorite ? 'currentColor' : 'none'} />}
                      onClick={() => toggleFavorite(report.id)}
                    />
                  </FileActions>
                </FileRow>
              );
            })
          )}
        </FileList>
      </Section>
    </ScrollArea>
  );
}

const GreetingBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-300) var(--space-400);
  margin-bottom: var(--space-600);
`;

const Greeting = styled.h1`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-greeting);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.4px;
  line-height: 1.2;
`;

const SectionToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: var(--space-150);
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--color-text-icon-primary);
  cursor: pointer;

  &:focus-visible {
    outline: var(--stroke-150) solid var(--color-primary-primary);
    outline-offset: var(--space-050);
    border-radius: var(--radius-100);
  }
`;

const HorizontalScroll = styled.div`
  display: flex;
  align-items: stretch;
  gap: var(--space-300);
  overflow-x: auto;
  padding-bottom: var(--space-100);
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: var(--space-100);
  }
`;

const RecCard = styled(SurfaceCard)`
  flex: 0 0 min(280px, 78vw);
  align-self: stretch;
  width: min(280px, 78vw);
  height: auto;
  min-height: 100%;
  padding: var(--space-300);
  gap: var(--space-150);
  text-align: left;
  cursor: pointer;
  scroll-snap-align: start;
  box-shadow: none;
  transition: border-color 120ms ease, background 120ms ease;

  &:hover {
    border-color: var(--color-stroke-border-high);
    background: var(--color-surfaces-on-container-high);
  }

  &:focus-visible {
    outline: var(--stroke-150) solid var(--color-primary-primary);
    outline-offset: var(--space-050);
  }
`;

const ActivityLine = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--space-100);
  min-width: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  line-height: 1.4;

  & > span {
    flex: 1 1 auto;
    min-width: 0;
    width: 0;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  & > svg {
    flex: none;
    margin-top: 1px;
  }
`;

const RecTitle = styled(Strong)`
  font-size: var(--type-size-body);
  white-space: normal;
  overflow-wrap: break-word;
`;

const RecPreview = styled(PreviewThumb)`
  flex: none;
  width: 100%;
  min-height: 148px;
  height: 148px;
  margin-top: auto;
  border: var(--stroke-100) solid var(--color-stroke-border-low);
`;

const RecTeamPreview = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-150);
  color: var(--color-text-icon-inverse);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-top: var(--stroke-100) solid var(--color-stroke-border);
`;

const FileHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(96px, 140px) 48px;
  gap: var(--space-200);
  align-items: center;
  padding: var(--space-200) var(--space-100);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
  line-height: 1.4;
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
`;

const FileRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(96px, 140px) 48px;
  gap: var(--space-200);
  align-items: center;
  min-width: 0;
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
`;

const FileMain = styled.button`
  display: flex;
  align-items: flex-start;
  gap: var(--space-200);
  min-width: 0;
  margin: 0;
  padding: var(--space-300) var(--space-100);
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  border-radius: var(--radius-100);

  &:hover {
    background: var(--color-surfaces-on-container-high);
  }

  &:focus-visible {
    outline: var(--stroke-150) solid var(--color-primary-primary);
    outline-offset: calc(-1 * var(--space-025));
  }
`;

const FileIcon = styled.span`
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-top: var(--space-025);
  border-radius: var(--radius-100);
  background: var(--color-primary-primary-overlay);
  color: var(--color-primary-primary);
`;

const FileTextBlock = styled.span`
  display: flex;
  flex-direction: column;
  gap: var(--space-050);
  min-width: 0;
`;

const FileName = styled.span`
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
  overflow-wrap: break-word;
`;

const FileMeta = styled.span`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-100);
  min-width: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  line-height: 1.4;
`;

const MetaDot = styled.span`
  color: var(--color-text-icon-placeholder);
`;

const FileDate = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  line-height: 1.4;
  text-align: right;
  overflow-wrap: anywhere;
`;

const FileActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EmptyState = styled(CardBody)`
  padding: var(--space-500) var(--space-100);
`;
