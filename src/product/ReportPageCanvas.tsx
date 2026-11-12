import styled from 'styled-components';

import { useAppState } from '../app/AppState';
import { ReportObjectView } from './ReportObjectView';
import type { PageLayout, ReportObject, ReportObjectSlot, ReportPage } from './types';

type Props = {
  page: ReportPage;
};

const Stack = styled.div<{ $editing?: boolean }>`
  display: grid;
  gap: ${(p) => (p.$editing ? 'var(--space-500)' : 'var(--space-300)')};
  min-width: 0;
  height: auto;
  align-content: start;
`;

const LayoutRoot = styled.div<{ $layout: Exclude<PageLayout, 'stack'>; $editing?: boolean }>`
  display: grid;
  gap: ${(p) => (p.$editing ? 'var(--space-500)' : 'var(--space-300)')};
  min-width: 0;
  align-content: start;
  /* Content-sized rows only — never compress widgets into the viewport. */
  grid-auto-rows: auto;
  height: auto;

  ${(p) =>
    p.$layout === 'opponent-board' &&
    `
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr);
    grid-template-areas:
      'header header header'
      'metrics metrics metrics'
      'insight insight insight'
      'chart-a chart-b chart-c'
      'notes media events'
      'main main side'
      'slot-1 slot-2 slot-3';

    @media (max-width: 1200px) {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      grid-template-areas:
        'header header'
        'metrics metrics'
        'insight insight'
        'chart-a chart-b'
        'chart-c notes'
        'media events'
        'main side'
        'slot-1 slot-2'
        'slot-3 slot-3';
    }

    @media (max-width: 800px) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'header'
        'metrics'
        'insight'
        'chart-a'
        'chart-b'
        'chart-c'
        'notes'
        'media'
        'events'
        'main'
        'side'
        'slot-1'
        'slot-2'
        'slot-3';
    }
  `}

  ${(p) =>
    p.$layout === 'match-live' &&
    `
    grid-template-columns: minmax(0, 1.7fr) minmax(220px, 0.75fr);
    grid-template-areas:
      'header header'
      'media side'
      'insight insight';

    @media (max-width: 1100px) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'header'
        'media'
        'side'
        'insight';
    }
  `}

  ${(p) =>
    p.$layout === 'match-review' &&
    `
    grid-template-columns: minmax(0, 1.25fr) minmax(180px, 0.55fr) minmax(220px, 0.7fr);
    grid-template-areas:
      'header header header'
      'media events side'
      'chart-a chart-b chart-c';

    @media (max-width: 1200px) {
      grid-template-columns: minmax(0, 1.4fr) minmax(220px, 0.8fr);
      grid-template-areas:
        'header header'
        'media events'
        'side side'
        'chart-a chart-b'
        'chart-c chart-c';
    }

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'header'
        'media'
        'events'
        'side'
        'chart-a'
        'chart-b'
        'chart-c';
    }
  `}

  ${(p) =>
    p.$layout === 'summary-dashboard' &&
    `
    grid-template-columns: minmax(0, 1.5fr) minmax(240px, 0.85fr);
    grid-template-areas:
      'insight metrics'
      'main main'
      'chart-a chart-b'
      'notes notes';

    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'insight'
        'metrics'
        'main'
        'chart-a'
        'chart-b'
        'notes';
    }
  `}

  ${(p) =>
    p.$layout === 'analytics-split' &&
    `
    grid-template-columns: minmax(0, 1.5fr) minmax(240px, 0.75fr);
    grid-template-areas:
      'main metrics'
      'chart-a chart-b'
      'chart-c notes';

    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'main'
        'metrics'
        'chart-a'
        'chart-b'
        'chart-c'
        'notes';
    }
  `}

  ${(p) =>
    p.$layout === 'compare-split' &&
    `
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-areas:
      'header header'
      'main side'
      'chart-a chart-b'
      'metrics metrics'
      'notes notes';

    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'header'
        'main'
        'side'
        'chart-a'
        'chart-b'
        'metrics'
        'notes';
    }
  `}

  ${(p) =>
    p.$layout === 'custom-grid' &&
    `
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-areas:
      'slot-1 slot-2 slot-3'
      'slot-4 slot-5 slot-6';

    @media (max-width: 1100px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-areas:
        'slot-1 slot-2'
        'slot-3 slot-4'
        'slot-5 slot-6';
    }

    @media (max-width: 700px) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'slot-1'
        'slot-2'
        'slot-3'
        'slot-4'
        'slot-5'
        'slot-6';
    }
  `}
`;

const Slot = styled.div<{ $area: ReportObjectSlot; $columns?: number }>`
  grid-area: ${(p) => p.$area};
  display: grid;
  gap: var(--space-200);
  min-width: 0;
  min-height: auto;
  height: auto;
  align-content: start;
  align-items: start;
  overflow: visible;
  ${(p) =>
    p.$columns && p.$columns > 1
      ? `
    grid-template-columns: repeat(${p.$columns}, minmax(0, 1fr));
    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  `
      : ''}
`;

function objectsForSlot(objects: ReportObject[], slot: ReportObjectSlot) {
  return objects.filter((object) => object.slot === slot);
}

function renderSlot(
  pageId: string,
  objects: ReportObject[],
  slot: ReportObjectSlot,
  columns?: number,
) {
  const slotted = objectsForSlot(objects, slot);
  if (!slotted.length) return null;
  return (
    <Slot $area={slot} $columns={columns}>
      {slotted.map((object) => (
        <ReportObjectView key={object.id} pageId={pageId} object={object} />
      ))}
    </Slot>
  );
}

const MATCH_LIVE_SLOTS: ReportObjectSlot[] = ['header', 'media', 'side', 'insight'];
const MATCH_REVIEW_SLOTS: ReportObjectSlot[] = [
  'header',
  'media',
  'events',
  'side',
  'chart-a',
  'chart-b',
  'chart-c',
];
const SUMMARY_SLOTS: ReportObjectSlot[] = ['insight', 'metrics', 'main', 'chart-a', 'chart-b', 'notes'];
const ANALYTICS_SLOTS: ReportObjectSlot[] = ['main', 'metrics', 'chart-a', 'chart-b', 'chart-c', 'notes'];
const COMPARE_SLOTS: ReportObjectSlot[] = [
  'header',
  'main',
  'side',
  'chart-a',
  'chart-b',
  'metrics',
  'notes',
];
const CUSTOM_GRID_SLOTS: ReportObjectSlot[] = [
  'slot-1',
  'slot-2',
  'slot-3',
  'slot-4',
  'slot-5',
  'slot-6',
];
const OPPONENT_BOARD_SLOTS: ReportObjectSlot[] = [
  'header',
  'metrics',
  'insight',
  'chart-a',
  'chart-b',
  'chart-c',
  'notes',
  'media',
  'events',
  'main',
  'side',
  'slot-1',
  'slot-2',
  'slot-3',
];

function slotsForLayout(layout: Exclude<PageLayout, 'stack'>): ReportObjectSlot[] {
  switch (layout) {
    case 'match-live':
      return MATCH_LIVE_SLOTS;
    case 'match-review':
      return MATCH_REVIEW_SLOTS;
    case 'summary-dashboard':
      return SUMMARY_SLOTS;
    case 'analytics-split':
      return ANALYTICS_SLOTS;
    case 'custom-grid':
      return CUSTOM_GRID_SLOTS;
    case 'compare-split':
      return COMPARE_SLOTS;
    case 'opponent-board':
      return OPPONENT_BOARD_SLOTS;
    default:
      return SUMMARY_SLOTS;
  }
}

/**
 * Renders a report page as either a vertical stack or a named dashboard composition.
 * Unslotted objects append below the layout so edit-mode additions still appear.
 */
export function ReportPageCanvas({ page }: Props) {
  const { editMode } = useAppState();
  const layout = page.layout ?? 'stack';
  const slotted = new Set(
    page.objects.filter((object) => object.slot).map((object) => object.id),
  );
  const leftovers = page.objects.filter((object) => !slotted.has(object.id));

  if (layout === 'stack') {
    return (
      <Stack $editing={editMode}>
        {page.objects.map((object) => (
          <ReportObjectView key={object.id} pageId={page.id} object={object} />
        ))}
      </Stack>
    );
  }

  return (
    <Stack $editing={editMode}>
      <LayoutRoot $layout={layout} $editing={editMode}>
        {slotsForLayout(layout).map((slot) => {
          const count = objectsForSlot(page.objects, slot).length;
          const columns = layout === 'opponent-board' && slot === 'insight' && count > 1 ? count : undefined;
          return renderSlot(page.id, page.objects, slot, columns);
        })}
      </LayoutRoot>
      {leftovers.length > 0 && (
        <Stack $editing={editMode}>
          {leftovers.map((object) => (
            <ReportObjectView key={object.id} pageId={page.id} object={object} />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
