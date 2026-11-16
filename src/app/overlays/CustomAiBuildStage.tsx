import { useState } from 'react';
import { Button, IconButton, TextInput } from '@cake-admin/cakeand';
import { ArrowUp, Check, LayoutGrid, Sparkles, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import {
  AiChartProposal,
  CustomReportCanvas,
  ReportTitleEditor,
  WidgetLibraryPicker,
  formatMatchContextSummary,
  widgetToReportObject,
} from '../../product/builder';
import type { ReportObjectSlot } from '../../product/types';
import { ICON_SIZE } from '../../iconSize';
import { useAppState } from '../AppState';
import { ChatAnswerActions } from '../components/ChatAnswerActions';
import {
  AiChatScroll,
  AiComposer,
  AiEmptyState,
  BodyText,
  ChatBubble,
  Muted,
  PromptChipRow,
  Strong,
  WrapButtonSlot,
} from '../ui.styles';

const Scrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 45;
  display: grid;
  place-items: stretch;
  background: var(--color-surfaces-canvas);
`;

const Stage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
  height: 100%;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-300);
  padding: var(--space-400) var(--space-500);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-primary);
  flex: none;
`;

const HeaderCopy = styled.div`
  display: grid;
  gap: var(--space-050);
  min-width: 0;
`;

const Title = styled.h1`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-title);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
`;

const Subtitle = styled.p`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
`;

const HeaderActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-200);
`;

const Body = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(18rem, 26rem) minmax(0, 1fr) minmax(16rem, 22rem);
  gap: 0;

  @media (max-width: 1100px) {
    grid-template-columns: minmax(16rem, 22rem) minmax(0, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(14rem, 40%) minmax(0, 1fr);
  }
`;

const ChatColumn = styled.aside`
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  border-right: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-container-blur);
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  padding: var(--space-300) var(--space-400);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  flex: none;
`;

const PreviewColumn = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  background: var(--color-surfaces-canvas);
`;

const PreviewToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-200);
  padding: var(--space-300) var(--space-400);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  flex: none;
`;

const PreviewScroll = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: var(--space-400);
`;

const CanvasPad = styled.div`
  display: grid;
  gap: var(--space-400);
  min-width: 0;
`;

const LibraryColumn = styled.aside`
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  border-left: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-container);
  padding: var(--space-400);
  overflow: auto;

  @media (max-width: 1100px) {
    display: none;
  }
`;

const LibraryTitle = styled.h2`
  margin: 0 0 var(--space-300);
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-bold);
`;

const ComposerPad = styled.div`
  flex: none;
  padding: var(--space-300) var(--space-400) var(--space-400);
  border-top: var(--stroke-100) solid var(--color-stroke-border);
  display: grid;
  gap: var(--space-200);
`;

/**
 * Full-viewport Custom AI creation: chat-led, widget library beside a live preview.
 * Finish opens the draft in the standard workspace; unfinished steps are fine.
 */
export function CustomAiBuildStage() {
  const {
    view,
    activeReport,
    activePageId,
    selectedSlot,
    builderSuggestedPrompts,
    setSelectedSlot,
    sendPrompt,
    renameReport,
    swapObjectSlots,
    addChartProposalToReport,
    addObjectToPage,
    finishCustomAiBuild,
    cancelCustomAiBuild,
    setPanel,
  } = useAppState();

  const [draft, setDraft] = useState('');

  if (view !== 'custom-ai-build' || !activeReport) return null;

  const page = activeReport.pages.find((p) => p.id === activePageId) ?? activeReport.pages[0];
  if (!page) return null;

  const objectCount = page.objects.length;

  const openLibraryModal = (slot?: ReportObjectSlot) => {
    if (slot) setSelectedSlot(slot);
    setPanel('widget-library');
  };

  return createPortal(
    <Scrim role="dialog" aria-modal="true" aria-label="Custom AI build">
      <Stage>
        <Header>
          <HeaderCopy>
            <Title>Custom AI build</Title>
            <Subtitle>
              Chat to shape the board, pull widgets anytime — finish when it feels ready
            </Subtitle>
          </HeaderCopy>
          <HeaderActions>
            <Muted>
              {objectCount === 0
                ? 'No widgets yet — that’s fine'
                : `${objectCount} widget${objectCount === 1 ? '' : 's'} on board`}
            </Muted>
            <Button intent="secondary" variant="ghost" onClick={cancelCustomAiBuild}>
              Cancel
            </Button>
            <Button
              intent="primary"
              variant="fill"
              startIcon={<Check size={ICON_SIZE} />}
              onClick={finishCustomAiBuild}
            >
              Finish
            </Button>
            <IconButton
              label="Close"
              icon={<X size={ICON_SIZE} />}
              size="sm"
              intent="secondary"
              variant="tonal"
              onClick={cancelCustomAiBuild}
            />
          </HeaderActions>
        </Header>

        <Body>
          <ChatColumn aria-label="AI chat">
            <ChatHeader>
              <Sparkles size={ICON_SIZE} />
              <Strong>Guide</Strong>
            </ChatHeader>

            <AiChatScroll>
              {activeReport.chat.length === 0 && (
                <AiEmptyState>
                  <Strong>What should this dashboard show?</Strong>
                  <BodyText>
                    Ask for charts or insights, or add widgets from the library. Skip anything you
                    do not need yet.
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
                      onAddToReport={() => addChartProposalToReport(message.chartProposal!)}
                      onFollowUp={() =>
                        sendPrompt(
                          'Create a Women’s World Cup 2023 data analysis of England vs Spain total metrics',
                        )
                      }
                    />
                  )}
                  {message.role === 'assistant' && !message.pending && (
                    <ChatAnswerActions message={message} />
                  )}
                </div>
              ))}
            </AiChatScroll>

            <ComposerPad>
              <AiComposer>
                <TextInput
                  aria-label="Chat with Insight Studio"
                  placeholder="Describe the dashboard you want…"
                  value={draft}
                  startIcon={<Sparkles size={ICON_SIZE} />}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && draft.trim()) {
                      sendPrompt(draft.trim());
                      setDraft('');
                    }
                  }}
                />
                <IconButton
                  label="Send"
                  icon={<ArrowUp size={14} strokeWidth={2.5} />}
                  size="sm"
                  intent="primary"
                  variant="fill"
                  onClick={() => {
                    if (!draft.trim()) return;
                    sendPrompt(draft.trim());
                    setDraft('');
                  }}
                  disabled={!draft.trim()}
                />
              </AiComposer>
              <Button
                fullWidth
                intent="secondary"
                variant="tonal"
                startIcon={<LayoutGrid size={ICON_SIZE} />}
                onClick={() => openLibraryModal()}
              >
                Open widget library
              </Button>
              <Muted style={{ textAlign: 'center', fontSize: 'var(--type-size-caption)' }}>
                Answers are generated with AI. Please double-check for accuracy.
              </Muted>
            </ComposerPad>
          </ChatColumn>

          <PreviewColumn aria-label="Live dashboard preview">
            <PreviewToolbar>
              <div style={{ minWidth: 0 }}>
                <ReportTitleEditor value={activeReport.name} onChange={renameReport} />
                <Muted>
                  Live preview · Draft
                  {activeReport.matchContext
                    ? ` · ${formatMatchContextSummary(activeReport.matchContext)}`
                    : ''}
                </Muted>
              </div>
            </PreviewToolbar>
            <PreviewScroll>
              <CanvasPad>
                <CustomReportCanvas
                  page={page}
                  selectedSlot={selectedSlot}
                  onSelectSlot={setSelectedSlot}
                  onRequestAdd={(slot) => openLibraryModal(slot)}
                  onSwapSlots={swapObjectSlots}
                />
              </CanvasPad>
            </PreviewScroll>
          </PreviewColumn>

          <LibraryColumn aria-label="Widget library">
            <LibraryTitle>Widget library</LibraryTitle>
            <WidgetLibraryPicker
              compact
              onPick={(entry) => {
                addObjectToPage(
                  widgetToReportObject(entry, {
                    slot: selectedSlot ?? undefined,
                  }),
                );
              }}
            />
          </LibraryColumn>
        </Body>
      </Stage>
    </Scrim>,
    document.body,
  );
}
