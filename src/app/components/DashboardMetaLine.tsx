import styled from 'styled-components';
import { Button, Chip } from '@cake-admin/cakeand';
import { Pencil } from 'lucide-react';

import {
  DEFAULT_MATCH_CONTEXT,
  formatMatchContextSummary,
} from '../../product/builder';
import type { ReportRecord } from '../../product/types';
import { ICON_SIZE } from '../../iconSize';
import { MetaRow, Muted } from '../ui.styles';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-200);
  min-width: 0;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-150);
  align-items: center;
  min-width: 0;
`;

type Props = {
  report: ReportRecord;
  /** Extra status fragment before template type, e.g. Draft / Updated. */
  statusLabel?: string;
  /** Only show “Edit dashboard selections” while canvas edit mode is on. */
  editMode?: boolean;
  detailsOpen: boolean;
  onEditSelections: () => void;
};

export function dashboardMetaSummary(report: ReportRecord, statusLabel?: string): string {
  const status = statusLabel ?? report.status;
  const type = report.templateType || 'Report';
  const match = report.matchContext?.tournament
    ? formatMatchContextSummary(report.matchContext)
    : '';
  return [status, type, match].filter(Boolean).join(' · ');
}

/**
 * Status / context summary with “Edit dashboard selections” to open the metadata sub-editor.
 */
export function DashboardMetaLine({
  report,
  statusLabel,
  editMode = false,
  detailsOpen,
  onEditSelections,
}: Props) {
  const tags = report.tags ?? [];
  const summary = dashboardMetaSummary(report, statusLabel);
  const hasMatch = Boolean(
    (report.matchContext ?? DEFAULT_MATCH_CONTEXT).tournament ||
      report.matchContext?.homeTeam,
  );
  const showEditor = editMode && detailsOpen;

  return (
    <div style={{ display: 'grid', gap: 'var(--space-150)' }}>
      <Row>
        <MetaRow>
          <Muted as="span" style={{ display: 'inline' }}>
            {summary}
          </Muted>
        </MetaRow>
        {editMode && (
          <Button
            size="xs"
            intent="secondary"
            variant={detailsOpen ? 'tonal' : 'ghost'}
            startIcon={<Pencil size={ICON_SIZE} />}
            onClick={onEditSelections}
            underline={false}
          >
            Edit dashboard selections
          </Button>
        )}
      </Row>
      {!showEditor && tags.length > 0 && (
        <TagRow aria-label="Dashboard tags">
          {tags.map((tag) => (
            <Chip key={tag} size="sm" type="secondary">
              {tag}
            </Chip>
          ))}
        </TagRow>
      )}
      {editMode && !showEditor && !hasMatch && (
        <Muted>Set tournament and teams via Edit dashboard selections.</Muted>
      )}
    </div>
  );
}
