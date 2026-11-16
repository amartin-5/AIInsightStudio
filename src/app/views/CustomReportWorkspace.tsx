import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, IconButton, TextInput } from '@cake-admin/cakeand';
import {
  ArrowUp,
  Columns2,
  Download,
  LayoutGrid,
  Maximize2,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  Save,
  Share2,
  Sparkles,
} from 'lucide-react';

import {
  AiChartProposal,
  CustomReportCanvas,
  DEFAULT_MATCH_CONTEXT,
  GuidedTourCard,
  teamCodeShort,
  type MatchContext,
} from '../../product/builder';
import type { ReportObjectSlot } from '../../product/types';
import { useAppState } from '../AppState';
import { ChatAnswerActions } from '../components/ChatAnswerActions';
import { DashboardDetailsEditor } from '../components/DashboardDetailsEditor';
import { DashboardMetaLine } from '../components/DashboardMetaLine';
import { PresentChrome } from '../components/PresentChrome';
import {
  ActionRow,
  AiChatScroll,
  AiComposer,
  AiEmptyState,
  AiPanel,
  AiPanelSection,
  BodyText,
  ChatBubble,
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
import { ICON_SIZE } from '../../iconSize';

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

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-200);
  padding: var(--space-300) var(--space-400);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  min-width: 0;
`;

const TitleText = styled.h2`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-bold);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/**
 * Custom / blank report builder: AI guide while drafting, normal Ask chat after first save.
 * Dashboard title / tags / match filters open via “Edit dashboard selections” sub-editor.
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
    suggestedPrompts,
    editMode,
    setEditMode,
    setAiCollapsed,
    setSelectedSlot,
    setBuilderTourStep,
    setBuilderTourOpen,
    setPanel,
    setPinPayload,
    sendPrompt,
    saveReport,
    swapObjectSlots,
    addChartProposalToReport,
    presentMode,
    setPresentMode,
    setCompareContext,
  } = useAppState();

  const [draft, setDraft] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const page = activeReport?.pages.find((p) => p.id === activePageId) ?? activeReport?.pages[0];

  useEffect(() => {
    if (!editMode) setDetailsOpen(false);
  }, [editMode]);

  if (!activeReport || !page) return null;

  const isGuide = activeReport.status === 'Draft';
  const prompts = isGuide ? builderSuggestedPrompts : suggestedPrompts.slice(0, 3);
  const matchContext: MatchContext = activeReport.matchContext ?? { ...DEFAULT_MATCH_CONTEXT };

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

  const openLibrary = (slot?: ReportObjectSlot) => {
    if (slot) setSelectedSlot(slot);
    setPanel('widget-library');
  };

  const submitDraft = () => {
    if (!draft.trim()) return;
    sendPrompt(draft.trim());
    setDraft('');
  };

  const homeShort = teamCodeShort(matchContext.homeTeam);
  const awayShort = matchContext.awayTeam ? teamCodeShort(matchContext.awayTeam) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <SplitWorkspace>
        <AiPanel
          $width={aiWidth}
          $collapsed={aiCollapsed}
          aria-label={isGuide ? 'AI builder panel' : 'AI panel'}
        >
          <PanelHeader>
            {!aiCollapsed && <Strong>{isGuide ? 'AI guide' : 'Ask'}</Strong>}
            <IconButton
              label={aiCollapsed ? 'Expand AI panel' : 'Collapse AI panel'}
              icon={aiCollapsed ? <PanelLeftOpen size={ICON_SIZE} /> : <PanelLeftClose size={ICON_SIZE} />}
              size="xs"
              intent="secondary"
              variant="ghost"
              onClick={() => setAiCollapsed(!aiCollapsed)}
            />
          </PanelHeader>

          {!aiCollapsed && (
            <>
              {isGuide && builderTourOpen && (
                <GuidedTourCard
                  stepIndex={builderTourStep}
                  onNext={() => setBuilderTourStep(Math.min(builderTourStep + 1, 4))}
                  onDismiss={() => setBuilderTourOpen(false)}
                />
              )}

              <AiChatScroll>
                {activeReport.chat.length === 0 && (
                  <AiEmptyState>
                    {isGuide ? (
                      <>
                        <Strong>Get the ball rolling towards new insights</Strong>
                        <BodyText>
                          Chat to generate a chart, or open the widget library to drag in content.
                        </BodyText>
                      </>
                    ) : (
                      <Muted>Ask about Women’s World Cup 2023 data on this board</Muted>
                    )}
                  </AiEmptyState>
                )}

                {(activeReport.chat.length === 0 ||
                  (isGuide && activeReport.chat.length <= 1)) && (
                  <PromptChipRow>
                    {prompts.map((prompt) => (
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
                    {isGuide &&
                      message.role === 'assistant' &&
                      message.chartProposal &&
                      !message.pending && (
                        <AiChartProposal
                          proposal={message.chartProposal}
                          onAddToReport={() => addChartProposalToReport(message.chartProposal!)}
                          onFollowUp={() =>
                            sendPrompt(
                              'Create a Women’s World Cup 2023 data analysis of England vs Spain total metrics',
                            )
                          }
                        />
                      )}
                    {message.role === 'assistant' && !message.pending && (
                      <ChatAnswerActions
                        message={message}
                        onPin={
                          isGuide
                            ? undefined
                            : () => {
                                setPinPayload({
                                  title: 'Pinned WWC 2023 insight',
                                  body: message.content,
                                });
                                setPanel('pin');
                              }
                        }
                      />
                    )}
                  </div>
                ))}
              </AiChatScroll>

              <AiComposer>
                <TextInput
                  aria-label={isGuide ? 'Chat with Insight Studio' : 'Ask Insight Studio'}
                  placeholder={
                    isGuide
                      ? 'Ask about WWC 2023 data or charts…'
                      : 'Ask about WWC 2023, this board, or Spain…'
                  }
                  value={draft}
                  startIcon={isGuide ? <Sparkles size={ICON_SIZE} /> : undefined}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') submitDraft();
                  }}
                />
                <IconButton
                  label="Send"
                  icon={<ArrowUp size={14} strokeWidth={2.5} />}
                  size="sm"
                  intent="primary"
                  variant="fill"
                  onClick={submitDraft}
                  disabled={!draft.trim()}
                />
              </AiComposer>
              <AiPanelSection>
                {isGuide && (
                  <Button
                    fullWidth
                    intent="secondary"
                    variant="tonal"
                    startIcon={<LayoutGrid size={ICON_SIZE} />}
                    onClick={() => openLibrary()}
                  >
                    View widget library
                  </Button>
                )}
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
              <TitleText>{activeReport.name}</TitleText>
              <DashboardMetaLine
                report={activeReport}
                statusLabel={isGuide ? 'Draft' : activeReport.status}
                editMode={editMode}
                detailsOpen={detailsOpen}
                onEditSelections={() => setDetailsOpen((open) => !open)}
              />
            </ToolbarTitle>
            <ActionRow>
              {editMode ? (
                <>
                  <Button
                    size="sm"
                    intent="secondary"
                    variant="ghost"
                    underline={false}
                    onClick={() => {
                      setDetailsOpen(false);
                      setEditMode(false);
                    }}
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    intent="primary"
                    variant="fill"
                    startIcon={<Save size={ICON_SIZE} />}
                    onClick={() => {
                      saveReport();
                      setDetailsOpen(false);
                      setEditMode(false);
                    }}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  {isGuide && (
                    <IconButton
                      label="Save dashboard"
                      icon={<Save size={ICON_SIZE} />}
                      size="xs"
                      intent="secondary"
                      variant="tonal"
                      onClick={saveReport}
                    />
                  )}
                  <IconButton
                    label="Edit"
                    icon={<Pencil size={ICON_SIZE} />}
                    size="xs"
                    intent="secondary"
                    variant="ghost"
                    onClick={() => setEditMode(true)}
                  />
                  <IconButton
                    label="Share"
                    icon={<Share2 size={ICON_SIZE} />}
                    size="xs"
                    intent="secondary"
                    variant="ghost"
                    onClick={() => setPanel('share')}
                  />
                  <IconButton
                    label="Export"
                    icon={<Download size={ICON_SIZE} />}
                    size="xs"
                    intent="secondary"
                    variant="ghost"
                    onClick={() => setPanel('export')}
                  />
                  <IconButton
                    label={activeReport.compare?.enabled ? 'Comparing' : 'Compare'}
                    icon={<Columns2 size={ICON_SIZE} />}
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
                    icon={<Maximize2 size={ICON_SIZE} />}
                    size="xs"
                    intent="secondary"
                    variant="ghost"
                    onClick={() => setPresentMode(true)}
                  />
                  <IconButton
                    label="Comments"
                    icon={<MessageSquare size={ICON_SIZE} />}
                    size="xs"
                    intent="secondary"
                    variant="ghost"
                  />
                </>
              )}
            </ActionRow>
          </Toolbar>

          <ReportCanvas>
            <CanvasPad>
              <DashboardDetailsEditor
                open={editMode && detailsOpen}
                report={activeReport}
                onClose={() => setDetailsOpen(false)}
              />
              <MatchHeader>
                <ScoreLine>
                  {awayShort
                    ? `2 ${homeShort} vs ${awayShort} 1`
                    : `${homeShort} · ${matchContext.year || '—'}`}
                </ScoreLine>
                <Muted>
                  {matchContext.tournament
                    ? `${matchContext.tournament.toUpperCase()} · ${matchContext.year}`
                    : 'Match context'}
                </Muted>
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
