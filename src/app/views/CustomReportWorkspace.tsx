import { useState } from 'react';
import styled from 'styled-components';
import { Button, IconButton, TextInput } from '@cake-admin/cakeand';
import {
  Columns2,
  Copy,
  Download,
  LayoutGrid,
  Maximize2,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
} from 'lucide-react';

import {
  AiChartProposal,
  CustomReportCanvas,
  DEFAULT_MATCH_FILTERS,
  GuidedTourCard,
  MatchFilterBar,
  ReportTitleEditor,
  type MatchFilters,
} from '../../product/builder';
import type { ReportObjectSlot } from '../../product/types';
import { useAppState } from '../AppState';
import { PresentChrome } from '../components/PresentChrome';
import {
  ActionRow,
  AiChatScroll,
  AiEmptyState,
  AiPanel,
  AiPanelSection,
  BodyText,
  ChatBubble,
  MetaRow,
  Muted,
  PromptChipRow,
  ReportCanvas,
  ReportPane,
  SplitWorkspace,
  Strong,
  Toolbar,
  ToolbarTitle,
  WrapButtonSlot,
} from '../ui.styles';

const MatchHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-300);
  margin: var(--space-400) 0;
`;

const ScoreLine = styled.p`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-title);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
`;

const CanvasPad = styled.div`
  display: grid;
  gap: var(--space-400);
  min-width: 0;
`;

/**
 * Custom / blank report builder: AI chat + widget library + slotted canvas.
 * Reuses product/builder pieces so the same chrome can power templates later.
 */
export function CustomReportWorkspace() {
  const {
    activeReport,
    activePageId,
    aiCollapsed,
    aiWidth,
    selectedSlot,
    builderTourStep,
    builderTourOpen,
    builderSuggestedPrompts,
    setAiCollapsed,
    setSelectedSlot,
    setBuilderTourStep,
    setBuilderTourOpen,
    setPanel,
    sendPrompt,
    renameReport,
    swapObjectSlots,
    addChartProposalToReport,
    exportReport,
    presentMode,
    setPresentMode,
    setCompareContext,
  } = useAppState();

  const [draft, setDraft] = useState('');
  const [filters, setFilters] = useState<MatchFilters>(DEFAULT_MATCH_FILTERS);
  const page = activeReport?.pages.find((p) => p.id === activePageId) ?? activeReport?.pages[0];

  if (!activeReport || !page) return null;

  if (presentMode) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <PresentChrome />
        <ReportCanvas style={{ flex: 1 }}>
          <CanvasPad>
            <CustomReportCanvas
              page={page}
              selectedSlot={null}
              onSelectSlot={() => undefined}
              onRequestAdd={() => undefined}
              onSwapSlots={swapObjectSlots}
            />
          </CanvasPad>
        </ReportCanvas>
      </div>
    );
  }

  const teamLabel = (code: string) => {
    const map: Record<string, string> = {
      sco: 'SCO',
      eng: 'ENG',
      esp: 'ESP',
      aus: 'AUS',
    };
    return map[code] ?? code.toUpperCase();
  };

  const openLibrary = (slot?: ReportObjectSlot) => {
    if (slot) setSelectedSlot(slot);
    setPanel('widget-library');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <SplitWorkspace>
        <AiPanel $width={aiWidth} $collapsed={aiCollapsed} aria-label="AI builder panel">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-200)',
              padding: 'var(--space-300) var(--space-400)',
              borderBottom: 'var(--stroke-100) solid var(--color-stroke-border)',
              minWidth: 0,
            }}
          >
            {!aiCollapsed && <Strong>AI guide</Strong>}
            <IconButton
              label={aiCollapsed ? 'Expand AI panel' : 'Collapse AI panel'}
              icon={aiCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
              size="xs"
              intent="secondary"
              variant="ghost"
              onClick={() => setAiCollapsed(!aiCollapsed)}
            />
          </div>

          {!aiCollapsed && (
            <>
              {builderTourOpen && (
                <GuidedTourCard
                  stepIndex={builderTourStep}
                  onNext={() =>
                    setBuilderTourStep(Math.min(builderTourStep + 1, 4))
                  }
                  onDismiss={() => setBuilderTourOpen(false)}
                />
              )}

              <AiChatScroll>
                {activeReport.chat.length === 0 && (
                  <AiEmptyState>
                    <Strong>Get the ball rolling towards new insights</Strong>
                    <BodyText>
                      Chat to generate a chart, or open the widget library to drag in content.
                    </BodyText>
                  </AiEmptyState>
                )}

                {activeReport.chat.length > 0 && activeReport.chat.length <= 1 && (
                  <PromptChipRow>
                    {builderSuggestedPrompts.map((prompt) => (
                      <WrapButtonSlot key={prompt}>
                        <Button
                          size="sm"
                          intent="secondary"
                          variant="outline"
                          onClick={() => sendPrompt(prompt)}
                        >
                          {prompt}
                        </Button>
                      </WrapButtonSlot>
                    ))}
                  </PromptChipRow>
                )}

                {activeReport.chat.map((message) => (
                  <div key={message.id} style={{ display: 'grid', gap: 'var(--space-150)' }}>
                    <ChatBubble $role={message.role}>{message.content}</ChatBubble>
                    {message.role === 'assistant' && message.chartProposal && !message.pending && (
                      <AiChartProposal
                        proposal={message.chartProposal}
                        onAddToReport={() =>
                          addChartProposalToReport(message.chartProposal!)
                        }
                        onFollowUp={() =>
                          sendPrompt('Create a data analysis of the total metrics')
                        }
                      />
                    )}
                    {message.role === 'assistant' && !message.pending && !message.chartProposal && (
                      <ActionRow>
                        <IconButton
                          label="Copy answer"
                          icon={<Copy size={16} strokeWidth={2} />}
                          size="sm"
                          intent="secondary"
                          variant="ghost"
                          onClick={() => navigator.clipboard?.writeText(message.content)}
                        />
                      </ActionRow>
                    )}
                  </div>
                ))}
              </AiChatScroll>

              <AiPanelSection style={{ borderTop: 'var(--stroke-100) solid var(--color-stroke-border)' }}>
                <TextInput
                  aria-label="Chat with Insight Studio"
                  placeholder="Chat with Insight Studio"
                  value={draft}
                  startIcon={<Sparkles size={16} />}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && draft.trim()) {
                      sendPrompt(draft.trim());
                      setDraft('');
                    }
                  }}
                />
                <Button
                  fullWidth
                  intent="secondary"
                  variant="tonal"
                  startIcon={<LayoutGrid size={16} />}
                  onClick={() => openLibrary()}
                >
                  View widget library
                </Button>
                <Muted style={{ textAlign: 'center', fontSize: 'var(--type-size-caption)' }}>
                  Answers are generated with AI. Please double-check for accuracy.
                </Muted>
              </AiPanelSection>
            </>
          )}
        </AiPanel>

        <ReportPane aria-label="Custom report canvas">
          <Toolbar>
            <ToolbarTitle>
              <ReportTitleEditor value={activeReport.name} onChange={renameReport} />
              <MetaRow>
                <Muted>Draft · Custom report</Muted>
              </MetaRow>
            </ToolbarTitle>
            <ActionRow>
              <IconButton
                label="Export as PDF"
                icon={<Download size={16} />}
                size="xs"
                intent="secondary"
                variant="ghost"
                onClick={exportReport}
              />
              <IconButton
                label={activeReport.compare?.enabled ? 'Comparing' : 'Compare'}
                icon={<Columns2 size={16} />}
                size="xs"
                intent="secondary"
                variant={activeReport.compare?.enabled ? 'tonal' : 'ghost'}
                onClick={() => {
                  setCompareContext({ enabled: activeReport.compare?.enabled ?? false });
                  setPanel('compare');
                }}
              />
              <IconButton
                label="Present"
                icon={<Maximize2 size={16} />}
                size="xs"
                intent="secondary"
                variant="ghost"
                onClick={() => setPresentMode(true)}
              />
              <IconButton
                label="Comments"
                icon={<MessageSquare size={16} />}
                size="xs"
                intent="secondary"
                variant="ghost"
              />
            </ActionRow>
          </Toolbar>

          <ReportCanvas>
            <CanvasPad>
              <MatchFilterBar value={filters} onChange={setFilters} />
              <MatchHeader>
                <ScoreLine>
                  2 {teamLabel(filters.homeTeam)} vs {teamLabel(filters.awayTeam)} 1
                </ScoreLine>
                <Muted>Group · Selected match · {filters.year}</Muted>
              </MatchHeader>
              <CustomReportCanvas
                page={page}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
                onRequestAdd={(slot) => openLibrary(slot)}
                onSwapSlots={swapObjectSlots}
              />
            </CanvasPad>
          </ReportCanvas>
        </ReportPane>
      </SplitWorkspace>
    </div>
  );
}
