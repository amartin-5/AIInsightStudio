import styled from 'styled-components';
import { Button } from '@cake-admin/cakeand';
import { Plus, Sparkles } from 'lucide-react';

import { renderChartById } from '../charts';
import type { ChartProposal } from '../types';

type Props = {
  proposal: ChartProposal;
  onAddToReport: () => void;
  onFollowUp?: () => void;
};

const Card = styled.div`
  display: grid;
  gap: var(--space-300);
  min-width: 0;
  padding: var(--space-400);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-1);
`;

const Caption = styled.p`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.45;
`;

const Preview = styled.div`
  min-width: 0;
  min-height: 160px;
  padding: var(--space-200);
  border-radius: var(--radius-200);
  background: var(--color-surfaces-on-container-high);
  overflow: hidden;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-200);
`;

/** Chat-embedded chart preview with insert actions for the custom builder. */
export function AiChartProposal({ proposal, onAddToReport, onFollowUp }: Props) {
  return (
    <Card>
      <Caption>{proposal.caption}</Caption>
      <Preview aria-label={proposal.title}>{renderChartById(proposal.chartId)}</Preview>
      <Actions>
        <Button size="sm" startIcon={<Plus size={16} />} onClick={onAddToReport}>
          Add to report
        </Button>
        {onFollowUp && (
          <Button
            size="sm"
            intent="secondary"
            variant="outline"
            startIcon={<Sparkles size={16} />}
            onClick={onFollowUp}
          >
            Create a data analysis
          </Button>
        )}
      </Actions>
    </Card>
  );
}
