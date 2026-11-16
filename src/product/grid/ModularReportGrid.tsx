import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import GridLayout, { type LayoutItem } from 'react-grid-layout/legacy';
import styled from 'styled-components';

import { useAppState } from '../../app/AppState';
import { ReportObjectView } from '../ReportObjectView';
import type { ObjectGrid, ReportObject, ReportPage } from '../types';
import { ensureObjectGrids } from './layoutFromSlots';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

type Props = {
  page: ReportPage;
  /** Force edit interactions even when global editMode is off (custom builder). */
  forceEditable?: boolean;
};

const GridHost = styled.div<{ $editing: boolean }>`
  width: 100%;
  min-width: 0;

  .react-grid-item {
    transition: ${(p) => (p.$editing ? 'transform 180ms ease, box-shadow 180ms ease' : 'none')};
    overflow: visible !important;
  }

  .react-grid-item.react-grid-placeholder {
    background: var(--color-primary-primary-overlay);
    border-radius: var(--radius-300);
    opacity: 0.55;
  }

  .react-grid-item > .react-resizable-handle::after {
    border-color: var(--color-primary-primary);
  }

  .react-grid-item.react-draggable-dragging,
  .react-grid-item.resizing {
    z-index: 3;
    box-shadow: var(--elevation-4);
  }

  ${(p) =>
    p.$editing &&
    `
    .react-grid-item {
      cursor: grab;
    }
    .react-grid-item:active {
      cursor: grabbing;
    }
  `}
`;

const Tile = styled.div`
  height: auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const Measure = styled.div`
  width: 100%;
  min-width: 0;
`;

const ROW_HEIGHT = 36;
const COLS = 12;
const MARGIN: [number, number] = [16, 16];
const ROW_STEP = ROW_HEIGHT + MARGIN[1];

function toLayout(objects: ReportObject[]): LayoutItem[] {
  return objects.map((object) => {
    const g = object.grid ?? { x: 0, y: 0, w: 4, h: 4 };
    return {
      i: object.id,
      x: g.x,
      y: g.y,
      w: g.w,
      h: g.h,
      minW: 2,
      minH: 2,
    };
  });
}

function layoutToGrid(item: LayoutItem): ObjectGrid {
  return { x: item.x, y: item.y, w: item.w, h: item.h };
}

function heightToGridUnits(px: number) {
  return Math.max(2, Math.ceil((px + MARGIN[1]) / ROW_STEP));
}

function useHostWidth(hostRef: React.RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;
    const apply = () => {
      setWidth(Math.max(320, Math.floor(node.getBoundingClientRect().width)));
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(node);
    return () => ro.disconnect();
  }, [hostRef]);

  return width;
}

type FitTileProps = {
  objectId: string;
  pageId: string;
  currentH: number;
  enabled: boolean;
  children: ReactNode;
};

/**
 * Measures widget content and grows the grid cell so nothing is clipped.
 * Only expands (never shrinks) while the user is actively resizing in edit mode.
 */
function ContentFitTile({ objectId, pageId, currentH, enabled, children }: FitTileProps) {
  const { updateObjectGrids } = useAppState();
  const measureRef = useRef<HTMLDivElement>(null);
  const lastH = useRef(currentH);

  useEffect(() => {
    lastH.current = currentH;
  }, [currentH]);

  useEffect(() => {
    if (!enabled) return;
    const node = measureRef.current;
    if (!node) return;

    let frame = 0;
    const apply = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const px = Math.ceil(node.getBoundingClientRect().height);
        if (px < 40) return;
        const nextH = heightToGridUnits(px);
        if (nextH <= lastH.current) return;
        lastH.current = nextH;
        updateObjectGrids(pageId, [{ id: objectId, grid: { x: 0, y: 0, w: 0, h: nextH } }], {
          mergeHeightOnly: true,
        });
      });
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [enabled, objectId, pageId, updateObjectGrids]);

  return <Measure ref={measureRef}>{children}</Measure>;
}

/**
 * Free-form modular dashboard grid. Edit mode enables drag + resize;
 * view mode locks x/y/w but cells auto-grow to fit content height.
 */
export function ModularReportGrid({ page, forceEditable = false }: Props) {
  const { editMode, updateObjectGrids } = useAppState();
  const editable = forceEditable || editMode;
  const hostRef = useRef<HTMLDivElement>(null);
  const width = useHostWidth(hostRef);
  const seededRef = useRef<string | null>(null);

  const objects = useMemo(() => ensureObjectGrids(page.objects), [page.objects]);
  const layout = useMemo(() => toLayout(objects), [objects]);

  useEffect(() => {
    const missing = page.objects.some((object) => !object.grid);
    if (!missing) return;
    const key = `${page.id}:${page.objects.map((o) => o.id).join(',')}`;
    if (seededRef.current === key) return;
    seededRef.current = key;
    updateObjectGrids(
      page.id,
      objects.map((object) => ({
        id: object.id,
        grid: object.grid!,
      })),
    );
  }, [objects, page.id, page.objects, updateObjectGrids]);

  const persist = (next: readonly LayoutItem[]) => {
    updateObjectGrids(
      page.id,
      next.map((item) => ({ id: item.i, grid: layoutToGrid(item) })),
    );
  };

  return (
    <GridHost ref={hostRef} $editing={editable} aria-label="Modular report grid">
      <GridLayout
        className="modular-report-grid"
        layout={layout}
        cols={COLS}
        rowHeight={ROW_HEIGHT}
        width={width}
        margin={MARGIN}
        containerPadding={[0, 0]}
        isDraggable={editable}
        isResizable={editable}
        compactType="vertical"
        draggableHandle=".widget-drag-handle"
        onDragStop={persist}
        onResizeStop={persist}
      >
        {objects.map((object) => (
          <Tile key={object.id}>
            <ContentFitTile
              objectId={object.id}
              pageId={page.id}
              currentH={object.grid?.h ?? 4}
              enabled
            >
              <ReportObjectView
                pageId={page.id}
                object={object}
                modular
                showDragHandle={editable}
              />
            </ContentFitTile>
          </Tile>
        ))}
      </GridLayout>
    </GridHost>
  );
}
