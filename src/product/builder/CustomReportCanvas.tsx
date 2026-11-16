import { Button } from '@cake-admin/cakeand';
import { Plus } from 'lucide-react';
import styled from 'styled-components';

import { ModularReportGrid } from '../grid/ModularReportGrid';
import type { ReportObjectSlot, ReportPage } from '../types';
import { ICON_SIZE } from '../../iconSize';

type Props = {
  page: ReportPage;
  selectedSlot: ReportObjectSlot | null;
  onSelectSlot: (slot: ReportObjectSlot) => void;
  onRequestAdd: (slot: ReportObjectSlot) => void;
  onSwapSlots: (from: ReportObjectSlot, to: ReportObjectSlot) => void;
};

const Canvas = styled.div`
  display: grid;
  gap: var(--space-400);
  min-width: 0;
`;

const EmptyState = styled.div`
  display: grid;
  place-items: center;
  gap: var(--space-300);
  min-height: 280px;
  padding: var(--space-800);
  border: var(--stroke-150) dashed var(--color-stroke-border);
  border-radius: var(--radius-400);
  background: var(--color-surfaces-container-blur);
  backdrop-filter: blur(24px);
  text-align: center;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
`;

/**
 * Custom-report canvas: modular free-form grid with always-on edit.
 * Legacy slot callbacks kept for library/AI insert wiring.
 */
export function CustomReportCanvas({
  page,
  onRequestAdd,
}: Props) {
  if (page.objects.length === 0) {
    return (
      <Canvas aria-label="Custom report canvas">
        <EmptyState>
          <div>Drop widgets onto a modular sports dashboard</div>
          <Button
            intent="primary"
            variant="fill"
            startIcon={<Plus size={ICON_SIZE} />}
            onClick={() => onRequestAdd('slot-1')}
          >
            Add widget
          </Button>
        </EmptyState>
      </Canvas>
    );
  }

  return (
    <Canvas aria-label="Custom report canvas">
      <ModularReportGrid page={page} forceEditable />
    </Canvas>
  );
}
