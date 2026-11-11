import { useState } from 'react';
import {
  Badge,
  Button,
  Dropdown,
  IconButton,
  Switch,
  TextInput,
} from '@cake-admin/cakeand';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  MessageSquare,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  RefreshCw,
  Share2,
  Sparkles,
} from 'lucide-react';

import { ReportObjectView } from '../../product/ReportObjectView';
import { useAppState } from '../AppState';
import {
  ActionRow,
  AiChatScroll,
  AiPanel,
  AiPanelSection,
  BodyText,
  ChatBubble,
  DemoBadge,
  ListStack,
  MetaRow,
  MetaStack,
  Muted,
  PageTabs,
  PromptChipRow,
  ReportCanvas,
  ReportPane,
  SplitWorkspace,
  StatusBanner,
  Strong,
  SurfaceCard,
  Toolbar,
  ToolbarTitle,
  WrapButtonSlot,
} from '../ui.styles';

export function WorkspaceView() {
  const {
    snapshot,
    activeReport,
    activePageId,
    aiCollapsed,
    aiWidth,
    editMode,
    presentMode,
    statusMessage,
    suggestedPrompts,
    config,
    setActiveReport,
    setActivePage,
    setAiCollapsed,
    setEditMode,
    setPresentMode,
    setPanel,
    setPinPayload,
    sendPrompt,
    addPage,
    renamePage,
    removePage,
    duplicatePage,
    movePage,
    addContext,
    removeContext,
  } = useAppState();

  const [draft, setDraft] = useState('');
  const [showContext, setShowContext] = useState(false);
  const page = activeReport?.pages.find((p) => p.id === activePageId) ?? activeReport?.pages[0];

  if (!activeReport || !page) {
    return (
      <div style={{ padding: 'var(--space-500)' }}>
        <Strong>No reports</Strong>
        <BodyText>Create a report from a template to open the workspace.</BodyText>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {statusMessage && (
        <StatusBanner role="status" aria-live="polite">
          <Sparkles size={16} aria-hidden />
          {statusMessage}
        </StatusBanner>
      )}
      <SplitWorkspace>
        <AiPanel $width={aiWidth} $collapsed={aiCollapsed} aria-label="AI panel">
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
            {!aiCollapsed && <Strong>AI</Strong>}
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
              <AiPanelSection style={{ borderBottom: 'var(--stroke-100) solid var(--color-stroke-border)' }}>
                <Dropdown
                  label="Active report"
                  value={activeReport.id}
                  onValueChange={setActiveReport}
                  options={snapshot.reports.slice(0, 4).map((r) => ({
                    label: r.name,
                    value: r.id,
                  }))}
                />
                <ActionRow>
                  <Button
                    size="sm"
                    intent="secondary"
                    variant="tonal"
                    endIcon={<ChevronDown size={16} />}
                    onClick={() => setShowContext((v) => !v)}
                  >
                    Context · {activeReport.context.length}
                  </Button>
                  <Button
                    size="sm"
                    intent="secondary"
                    variant="ghost"
                    onClick={() =>
                      addContext({
                        id: `ctx-${Date.now()}`,
                        label: 'Uploaded file (demo)',
                        kind: 'file',
                      })
                    }
                  >
                    + Add context
                  </Button>
                  <Button
                    size="sm"
                    intent="secondary"
                    variant="ghost"
                    onClick={() => {
                      const last = activeReport.context[activeReport.context.length - 1];
                      if (last) removeContext(last.id);
                    }}
                  >
                    − Remove context
                  </Button>
                </ActionRow>
                {showContext && (
                  <ListStack>
                    {activeReport.context.map((item) => (
                      <SurfaceCard key={item.id} as="div">
                        <ActionRow style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Muted style={{ flex: '1 1 auto' }}>{item.label}</Muted>
                          <Button size="xs" intent="secondary" variant="ghost" onClick={() => removeContext(item.id)}>
                            Remove
                          </Button>
                        </ActionRow>
                      </SurfaceCard>
                    ))}
                  </ListStack>
                )}
              </AiPanelSection>

              <AiChatScroll>
                {activeReport.chat.length === 0 && (
                  <PromptChipRow>
                    <Muted>Suggested prompts</Muted>
                    {suggestedPrompts.map((prompt) => (
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
                  <div key={message.id} style={{ display: 'grid', gap: 'var(--space-150)', minWidth: 0 }}>
                    <ChatBubble $role={message.role}>{message.content}</ChatBubble>
                    {message.role === 'assistant' && !message.pending && (
                      <>
                        {message.sources && (
                          <Muted>Sources: {message.sources.join(' · ')}</Muted>
                        )}
                        <ActionRow>
                          <Button
                            size="xs"
                            onClick={() => {
                              setPinPayload({
                                title: 'Pinned AI insight',
                                body: message.content,
                              });
                              setPanel('pin');
                            }}
                          >
                            Pin to report
                          </Button>
                          <Button
                            size="xs"
                            intent="secondary"
                            variant="ghost"
                            onClick={() => sendPrompt(`Follow up: ${message.content.slice(0, 80)}`)}
                          >
                            Ask a follow-up
                          </Button>
                          <Button
                            size="xs"
                            intent="secondary"
                            variant="ghost"
                            onClick={() => navigator.clipboard?.writeText(message.content)}
                          >
                            Copy
                          </Button>
                          <Button
                            size="xs"
                            intent="secondary"
                            variant="ghost"
                            onClick={() => sendPrompt(activeReport.chat.find((m) => m.role === 'user')?.content ?? 'Regenerate')}
                          >
                            Regenerate
                          </Button>
                        </ActionRow>
                      </>
                    )}
                  </div>
                ))}
              </AiChatScroll>

              <AiPanelSection style={{ borderTop: 'var(--stroke-100) solid var(--color-stroke-border)' }}>
                <Muted>{activeReport.name}</Muted>
                <TextInput
                  aria-label="Ask Insight Studio"
                  placeholder="Ask about this report…"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && draft.trim()) {
                      sendPrompt(draft.trim());
                      setDraft('');
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    if (!draft.trim()) return;
                    sendPrompt(draft.trim());
                    setDraft('');
                  }}
                >
                  Send
                </Button>
              </AiPanelSection>
            </>
          )}
        </AiPanel>

        <ReportPane aria-label="Standing report">
          <Toolbar>
            <ToolbarTitle>
              <Strong>{activeReport.name}</Strong>
              <MetaStack>
                <MetaRow>
                  <Muted as="span" style={{ display: 'inline' }}>
                    {config.competitionLabel}
                  </Muted>
                  <DemoBadge>{config.dataBadge}</DemoBadge>
                  <Badge color="secondary" tone="subtle" dot={false}>
                    {activeReport.sharing}
                  </Badge>
                </MetaRow>
                <Muted>
                  Updated {activeReport.lastUpdated} · {activeReport.context.length} sources ·{' '}
                  {activeReport.owner}
                </Muted>
              </MetaStack>
            </ToolbarTitle>
            <ActionRow>
              <Button
                size="sm"
                intent="secondary"
                variant="outline"
                startIcon={<RefreshCw size={16} />}
                onClick={() => setPanel('refresh')}
              >
                Refresh
              </Button>
              <Button
                size="sm"
                intent="secondary"
                variant="outline"
                startIcon={<Share2 size={16} />}
                onClick={() => setPanel('share')}
              >
                Share
              </Button>
              <Button
                size="sm"
                intent="secondary"
                variant="outline"
                startIcon={<Download size={16} />}
                onClick={() => setPanel('export')}
              >
                Export
              </Button>
              <Button
                size="sm"
                intent="secondary"
                variant="ghost"
                startIcon={<MoreHorizontal size={16} />}
                onClick={() => setPanel('schedule')}
              >
                More
              </Button>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-100)' }}>
                <span style={{ fontSize: 'var(--type-size-caption)' }}>Edit</span>
                <Switch checked={editMode} onCheckedChange={setEditMode} aria-label="Edit mode" />
              </label>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-100)' }}>
                <span style={{ fontSize: 'var(--type-size-caption)' }}>Present</span>
                <Switch checked={presentMode} onCheckedChange={setPresentMode} aria-label="Present mode" />
              </label>
              <IconButton
                label="Comments"
                icon={<MessageSquare />}
                size="xs"
                intent="secondary"
                variant="ghost"
              />
            </ActionRow>
          </Toolbar>

          <PageTabs>
            {activeReport.pages.map((p) => (
              <Button
                key={p.id}
                size="sm"
                intent="secondary"
                variant={p.id === page.id ? 'tonal' : 'ghost'}
                onClick={() => setActivePage(p.id)}
              >
                {p.name}
              </Button>
            ))}
            {editMode && (
              <>
                <Button size="sm" intent="secondary" variant="ghost" startIcon={<Plus size={16} />} onClick={addPage}>
                  Add page
                </Button>
                <IconButton
                  label="Rename page"
                  icon={<MoreHorizontal />}
                  size="xs"
                  intent="secondary"
                  variant="ghost"
                  onClick={() => {
                    const name = window.prompt('Rename page', page.name);
                    if (name) renamePage(page.id, name);
                  }}
                />
                <IconButton
                  label="Duplicate page"
                  icon={<Copy />}
                  size="xs"
                  intent="secondary"
                  variant="ghost"
                  onClick={() => duplicatePage(page.id)}
                />
                <IconButton
                  label="Move page left"
                  icon={<ChevronLeft />}
                  size="xs"
                  intent="secondary"
                  variant="ghost"
                  onClick={() => movePage(page.id, 'up')}
                />
                <IconButton
                  label="Move page right"
                  icon={<ChevronRight />}
                  size="xs"
                  intent="secondary"
                  variant="ghost"
                  onClick={() => movePage(page.id, 'down')}
                />
                <Button
                  size="sm"
                  intent="secondary"
                  variant="ghost"
                  onClick={() => {
                    if (window.confirm(`Remove page “${page.name}”?`)) removePage(page.id);
                  }}
                >
                  Remove page
                </Button>
                <Button size="sm" onClick={() => setPanel('add-object')}>
                  Add object
                </Button>
              </>
            )}
          </PageTabs>

          <ReportCanvas>
            {page.objects.length === 0 ? (
              <SurfaceCard>
                <Strong>This page is empty</Strong>
                <BodyText>Add an object or ask AI to create content for “{page.name}”.</BodyText>
                <Button onClick={() => setPanel('add-object')}>Add object</Button>
              </SurfaceCard>
            ) : (
              page.objects.map((object) => (
                <ReportObjectView key={object.id} pageId={page.id} object={object} />
              ))
            )}
          </ReportCanvas>
        </ReportPane>
      </SplitWorkspace>
    </div>
  );
}
