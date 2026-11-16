import { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  IconButton,
  MenuContainer,
  MenuItem,
  TextInput,
} from '@cake-admin/cakeand';
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Copy,
  Download,
  Maximize2,
  MessageSquare,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Settings,
  Share2,
  Sparkles,
  SquareStack,
  Trash2,
} from 'lucide-react';
import { DropdownMenu } from 'radix-ui';
import styled from 'styled-components';

import { ICON_SIZE, ICON_SIZE_LG } from '../../iconSize';
import { ReportPageCanvas } from '../../product/ReportPageCanvas';
import { TeamCrest } from '../../product/teams/TeamCrest';
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
  AiPanelHeader,
  BodyText,
  ChatBubble,
  ChatMessageBlock,
  EditBar,
  EditBarGroup,
  FloatingChat,
  FloatingChatFab,
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
import { CustomReportWorkspace } from './CustomReportWorkspace';

export function WorkspaceView() {
  const {
    activeReport,
    activePageId,
    aiCollapsed,
    aiWidth,
    chatPlacement,
    editMode,
    presentMode,
    statusMessage,
    suggestedPrompts,
    config,
    setActivePage,
    setAiCollapsed,
    setChatPlacement,
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
    setCompareContext,
    quickRefresh,
    saveReport,
  } = useAppState();

  const [draft, setDraft] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const page = activeReport?.pages.find((p) => p.id === activePageId) ?? activeReport?.pages[0];

  useEffect(() => {
    if (!editMode) setDetailsOpen(false);
  }, [editMode]);
  const floating = chatPlacement === 'floating';
  const showEmbedded = !floating;
  const showFloatingCard = floating && !aiCollapsed;
  const showFloatingFab = floating && aiCollapsed;

  if (!activeReport || !page) {
    return (
      <div style={{ padding: 'var(--space-500)' }}>
        <Strong>No reports</Strong>
        <BodyText>Create a report from a template to open the workspace.</BodyText>
      </div>
    );
  }

  if (activeReport.templateId === 'blank' || page.layout === 'custom-grid') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        {statusMessage && !presentMode && (
          <StatusBanner role="status" aria-live="polite">
            <Sparkles size={ICON_SIZE} aria-hidden />
            {statusMessage}
          </StatusBanner>
        )}
        <CustomReportWorkspace />
      </div>
    );
  }

  if (presentMode) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <PresentChrome />
        <ReportCanvas style={{ flex: 1 }}>
          <ReportPageCanvas page={page} />
        </ReportCanvas>
      </div>
    );
  }

  const submitDraft = () => {
    if (!draft.trim()) return;
    sendPrompt(draft.trim());
    setDraft('');
  };

  const chatBody = (
    <>
      <AiChatScroll>
        {activeReport.chat.length === 0 && (
          <AiEmptyState>
            <Muted>Ask about Women’s World Cup 2023 data on this board</Muted>
            <PromptChipRow>
              {suggestedPrompts.slice(0, 3).map((prompt) => (
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
          </AiEmptyState>
        )}

        {activeReport.chat.map((message) => (
          <ChatMessageBlock key={message.id}>
            <ChatBubble $role={message.role}>{message.content}</ChatBubble>
            {message.role === 'assistant' && !message.pending && (
              <ChatAnswerActions
                message={message}
                onPin={() => {
                  setPinPayload({
                    title: 'Pinned WWC 2023 insight',
                    body: message.content,
                  });
                  setPanel('pin');
                }}
              />
            )}
          </ChatMessageBlock>
        ))}
      </AiChatScroll>

      <AiComposer>
        <TextInput
          aria-label="Ask Insight Studio"
          placeholder="Ask about WWC 2023, this board, or Spain…"
          value={draft}
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
    </>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {statusMessage && (
        <StatusBanner role="status" aria-live="polite">
          <Sparkles size={ICON_SIZE} aria-hidden />
          {statusMessage}
        </StatusBanner>
      )}
      <SplitWorkspace>
        {showEmbedded && (
          <AiPanel $width={aiWidth} $collapsed={aiCollapsed} aria-label="AI panel">
            <AiPanelHeader $collapsed={aiCollapsed}>
              {!aiCollapsed && <Strong>Ask</Strong>}
              <HeaderActions>
                {!aiCollapsed && (
                  <IconButton
                    label="Float chat over report"
                    icon={<SquareStack size={ICON_SIZE} />}
                    size="xs"
                    intent="secondary"
                    variant="ghost"
                    onClick={() => {
                      setChatPlacement('floating');
                      setAiCollapsed(false);
                    }}
                  />
                )}
                <IconButton
                  label={aiCollapsed ? 'Expand AI panel' : 'Collapse AI panel'}
                  icon={
                    aiCollapsed ? (
                      <PanelLeftOpen size={ICON_SIZE} />
                    ) : (
                      <PanelLeftClose size={ICON_SIZE} />
                    )
                  }
                  size="xs"
                  intent="secondary"
                  variant="ghost"
                  onClick={() => setAiCollapsed(!aiCollapsed)}
                />
              </HeaderActions>
            </AiPanelHeader>
            {!aiCollapsed && chatBody}
          </AiPanel>
        )}

        <ReportPane aria-label="Standing report">
          <Toolbar>
            <ToolbarTitle>
              <TitleWithCrest>
                {activeReport.team ? <TeamCrest team={activeReport.team} size="lg" /> : null}
                <Strong>{activeReport.name}</Strong>
              </TitleWithCrest>
              <DashboardMetaLine
                report={activeReport}
                statusLabel={activeReport.status}
                editMode={editMode}
                detailsOpen={detailsOpen}
                onEditSelections={() => setDetailsOpen((open) => !open)}
              />
              <MetaExtras>
                <Muted as="span" style={{ display: 'inline' }}>
                  {config.competitionLabel}
                </Muted>
                <Badge color="secondary" tone="subtle" dot={false}>
                  {activeReport.sharing}
                </Badge>
                <Muted as="span" style={{ display: 'inline' }}>
                  Updated {activeReport.lastUpdated}
                </Muted>
              </MetaExtras>
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
                  {floating && (
                    <IconButton
                      label="Dock chat to side"
                      icon={<PanelLeftOpen size={ICON_SIZE} />}
                      size="xs"
                      intent="secondary"
                      variant="ghost"
                      onClick={() => {
                        setChatPlacement('embedded');
                        setAiCollapsed(false);
                      }}
                    />
                  )}
                  <IconButton
                    label="Refresh"
                    icon={<RefreshCw size={ICON_SIZE} />}
                    size="xs"
                    intent="secondary"
                    variant="ghost"
                    onClick={quickRefresh}
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
                    label="Report settings"
                    icon={<Settings size={ICON_SIZE} />}
                    size="xs"
                    intent="secondary"
                    variant="ghost"
                    onClick={() => setPanel('settings')}
                  />
                  <IconButton
                    label="Edit"
                    icon={<Pencil size={ICON_SIZE} />}
                    size="xs"
                    intent="secondary"
                    variant="ghost"
                    onClick={() => setEditMode(true)}
                  />
                </>
              )}
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
              <Button
                size="sm"
                intent="secondary"
                variant="ghost"
                startIcon={<Plus size={ICON_SIZE} />}
                onClick={addPage}
              >
                Add page
              </Button>
            )}
          </PageTabs>

          {editMode && (
            <EditBar>
              <EditBarGroup>
                <Muted>Editing page</Muted>
                <Strong style={{ fontSize: 'var(--type-size-body)' }}>{page.name}</Strong>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <IconButton
                      label="Page options"
                      icon={<MoreHorizontal size={ICON_SIZE} />}
                      size="xs"
                      intent="secondary"
                      variant="ghost"
                    />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content asChild sideOffset={8} align="start">
                      <MenuContainer width={220} style={{ zIndex: 30 }}>
                        <DropdownMenu.Item asChild>
                          <MenuItem
                            showLeftSlot
                            showRightSlot={false}
                            leftSlot={<Pencil size={ICON_SIZE} />}
                            onClick={() => {
                              const name = window.prompt('Rename page', page.name);
                              if (name) renamePage(page.id, name);
                            }}
                          >
                            Rename
                          </MenuItem>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item asChild>
                          <MenuItem
                            showLeftSlot
                            showRightSlot={false}
                            leftSlot={<Copy size={ICON_SIZE} />}
                            onClick={() => duplicatePage(page.id)}
                          >
                            Duplicate
                          </MenuItem>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item asChild>
                          <MenuItem
                            showLeftSlot
                            showRightSlot={false}
                            leftSlot={<ChevronLeft size={ICON_SIZE} />}
                            onClick={() => movePage(page.id, 'up')}
                          >
                            Move left
                          </MenuItem>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item asChild>
                          <MenuItem
                            showLeftSlot
                            showRightSlot={false}
                            leftSlot={<ChevronRight size={ICON_SIZE} />}
                            onClick={() => movePage(page.id, 'down')}
                          >
                            Move right
                          </MenuItem>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item asChild>
                          <MenuItem
                            showLeftSlot
                            showRightSlot={false}
                            leftSlot={<Trash2 size={ICON_SIZE} />}
                            onClick={() => {
                              if (window.confirm(`Remove page “${page.name}”?`)) {
                                removePage(page.id);
                              }
                            }}
                          >
                            Delete page
                          </MenuItem>
                        </DropdownMenu.Item>
                      </MenuContainer>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </EditBarGroup>
              <Button
                size="sm"
                startIcon={<Plus size={ICON_SIZE} />}
                onClick={() => setPanel('widget-library')}
              >
                Add object
              </Button>
            </EditBar>
          )}

          <ReportCanvas $editing={editMode}>
            <CanvasStack>
              <DashboardDetailsEditor
                open={editMode && detailsOpen}
                report={activeReport}
                onClose={() => setDetailsOpen(false)}
              />
              {page.objects.length === 0 ? (
                <SurfaceCard>
                  <Strong>This page is empty</Strong>
                  <BodyText>Add an object or ask AI to create content for “{page.name}”.</BodyText>
                  {editMode ? (
                    <Button onClick={() => setPanel('widget-library')}>Add object</Button>
                  ) : (
                    <Button intent="secondary" variant="outline" onClick={() => setEditMode(true)}>
                      Enter edit mode
                    </Button>
                  )}
                </SurfaceCard>
              ) : (
                <ReportPageCanvas page={page} />
              )}
            </CanvasStack>
          </ReportCanvas>
        </ReportPane>

        {showFloatingCard && (
          <FloatingChat aria-label="Floating AI chat">
            <AiPanelHeader>
              <Strong>Ask</Strong>
              <HeaderActions>
                <IconButton
                  label="Dock chat to side"
                  icon={<PanelLeftOpen size={ICON_SIZE} />}
                  size="xs"
                  intent="secondary"
                  variant="ghost"
                  onClick={() => {
                    setChatPlacement('embedded');
                    setAiCollapsed(false);
                  }}
                />
                <IconButton
                  label="Minimize chat"
                  icon={<PanelLeftClose size={ICON_SIZE} />}
                  size="xs"
                  intent="secondary"
                  variant="ghost"
                  onClick={() => setAiCollapsed(true)}
                />
              </HeaderActions>
            </AiPanelHeader>
            {chatBody}
          </FloatingChat>
        )}

        {showFloatingFab && (
          <FloatingChatFab>
            <IconButton
              label="Open AI chat"
              icon={<MessageSquare size={ICON_SIZE_LG} />}
              size="md"
              intent="primary"
              variant="fill"
              onClick={() => setAiCollapsed(false)}
            />
          </FloatingChatFab>
        )}
      </SplitWorkspace>
    </div>
  );
}

const TitleWithCrest = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-200);
  min-width: 0;
`;

const MetaExtras = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-200);
  min-width: 0;
`;

const CanvasStack = styled.div`
  display: grid;
  gap: var(--space-400);
  min-width: 0;
`;

const HeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-050);
  margin-inline-start: auto;
`;
