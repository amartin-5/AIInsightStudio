import { Button, IconButton } from '@cake-admin/cakeand';
import { ChevronLeft, ChevronRight, Minimize2 } from 'lucide-react';
import styled from 'styled-components';

import { useAppState } from '../AppState';
import { ActionRow, Muted, Strong } from '../ui.styles';
import { ICON_SIZE, ICON_SIZE_LG } from '../../iconSize';

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-300);
  flex: none;
  padding: var(--space-200) var(--space-400);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-container-blur-high);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  min-width: 0;
`;

const TitleBlock = styled.div`
  display: grid;
  gap: var(--space-050);
  min-width: 0;
`;

/**
 * Slim chrome shown only while present mode is active.
 */
export function PresentChrome() {
  const {
    activeReport,
    activePageId,
    setPresentMode,
    setActivePage,
    advancePresentPage,
  } = useAppState();

  if (!activeReport) return null;
  const page =
    activeReport.pages.find((p) => p.id === activePageId) ?? activeReport.pages[0];
  const index = Math.max(
    0,
    activeReport.pages.findIndex((p) => p.id === page?.id),
  );

  return (
    <Bar aria-label="Present mode controls">
      <TitleBlock>
        <Strong>{activeReport.name}</Strong>
        <Muted>
          {page?.name ?? 'Page'} · {index + 1} / {activeReport.pages.length}
        </Muted>
      </TitleBlock>
      <ActionRow>
        {activeReport.pages.map((p) => (
          <Button
            key={p.id}
            size="sm"
            intent="secondary"
            variant={p.id === page?.id ? 'tonal' : 'ghost'}
            onClick={() => setActivePage(p.id)}
          >
            {p.name}
          </Button>
        ))}
        <IconButton
          label="Previous page"
          icon={<ChevronLeft size={ICON_SIZE_LG} />}
          size="sm"
          intent="secondary"
          variant="ghost"
          onClick={() => advancePresentPage(-1)}
        />
        <IconButton
          label="Next page"
          icon={<ChevronRight size={ICON_SIZE_LG} />}
          size="sm"
          intent="secondary"
          variant="ghost"
          onClick={() => advancePresentPage(1)}
        />
        <Button
          size="sm"
          intent="secondary"
          variant="outline"
          startIcon={<Minimize2 size={ICON_SIZE} />}
          onClick={() => setPresentMode(false)}
        >
          Exit
        </Button>
      </ActionRow>
    </Bar>
  );
}
