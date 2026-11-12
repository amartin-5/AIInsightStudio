import { useState, type DragEvent } from 'react';
import styled from 'styled-components';

import { ReportObjectView } from '../ReportObjectView';
import type { ReportObject, ReportObjectSlot, ReportPage } from '../types';
import { CUSTOM_GRID_SLOTS } from './builderSlots';
import { ChartSlotPlaceholder } from './ChartSlotPlaceholder';

type Props = {
  page: ReportPage;
  selectedSlot: ReportObjectSlot | null;
  onSelectSlot: (slot: ReportObjectSlot) => void;
  onRequestAdd: (slot: ReportObjectSlot) => void;
  onSwapSlots: (from: ReportObjectSlot, to: ReportObjectSlot) => void;
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-400);
  align-content: start;
  min-width: 0;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Cell = styled.div<{ $dragging: boolean; $over: boolean }>`
  min-width: 0;
  min-height: 220px;
  opacity: ${(p) => (p.$dragging ? 0.55 : 1)};
  outline: ${(p) =>
    p.$over ? 'var(--stroke-200) dashed var(--color-primary-primary)' : 'none'};
  outline-offset: 2px;
  border-radius: var(--radius-300);
`;

function objectInSlot(objects: ReportObject[], slot: ReportObjectSlot) {
  return objects.find((object) => object.slot === slot) ?? null;
}

/**
 * Reusable 3×2 custom-report canvas: empty slots, selection, and drag-to-rearrange.
 */
export function CustomReportCanvas({
  page,
  selectedSlot,
  onSelectSlot,
  onRequestAdd,
  onSwapSlots,
}: Props) {
  const [dragSlot, setDragSlot] = useState<ReportObjectSlot | null>(null);
  const [overSlot, setOverSlot] = useState<ReportObjectSlot | null>(null);

  const onDragStart = (slot: ReportObjectSlot, event: DragEvent) => {
    if (!objectInSlot(page.objects, slot)) {
      event.preventDefault();
      return;
    }
    setDragSlot(slot);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', slot);
  };

  const onDrop = (slot: ReportObjectSlot, event: DragEvent) => {
    event.preventDefault();
    const from = (event.dataTransfer.getData('text/plain') || dragSlot) as ReportObjectSlot | '';
    setOverSlot(null);
    setDragSlot(null);
    if (!from || from === slot) return;
    onSwapSlots(from, slot);
  };

  return (
    <Grid aria-label="Custom report canvas">
      {CUSTOM_GRID_SLOTS.map((slot) => {
        const object = objectInSlot(page.objects, slot);
        return (
          <Cell
            key={slot}
            $dragging={dragSlot === slot}
            $over={overSlot === slot && dragSlot !== slot}
            draggable={Boolean(object)}
            onDragStart={(e) => onDragStart(slot, e)}
            onDragOver={(e) => {
              e.preventDefault();
              setOverSlot(slot);
            }}
            onDragLeave={() => setOverSlot((current) => (current === slot ? null : current))}
            onDrop={(e) => onDrop(slot, e)}
            onDragEnd={() => {
              setDragSlot(null);
              setOverSlot(null);
            }}
          >
            {object ? (
              <div
                onClick={() => onSelectSlot(slot)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelectSlot(slot);
                }}
                role="button"
                tabIndex={0}
                aria-pressed={selectedSlot === slot}
              >
                <ReportObjectView pageId={page.id} object={object} />
              </div>
            ) : (
              <ChartSlotPlaceholder
                selected={selectedSlot === slot}
                onClick={() => {
                  onSelectSlot(slot);
                  onRequestAdd(slot);
                }}
              />
            )}
          </Cell>
        );
      })}
    </Grid>
  );
}
