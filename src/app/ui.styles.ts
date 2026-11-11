import styled from 'styled-components';

export const ScrollArea = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: var(--space-600) var(--space-700) var(--space-800);
`;

export const PageHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-400);
  margin-bottom: var(--space-600);
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-150);
  min-width: 0;
  flex: 1 1 280px;
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-page);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.4px;
  line-height: 1.25;
  overflow-wrap: anywhere;
`;

export const PageSubtitle = styled.p`
  margin: 0;
  max-width: 52ch;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.5;
  overflow-wrap: break-word;
`;

export const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-200);
  min-width: 0;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-400);
  margin-bottom: var(--space-700);
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-200);
  min-width: 0;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-title);
  font-weight: var(--font-weight-bold);
  line-height: 1.3;
  overflow-wrap: break-word;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: var(--space-400);
  align-items: stretch;
`;

export const SurfaceCard = styled.article`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  min-width: 0;
  height: 100%;
  padding: var(--space-500);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-0);
  overflow: visible;
`;

export const CardBody = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--space-200);
  min-width: 0;
`;

export const CardFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-200);
  margin-top: auto;
  padding-top: var(--space-100);
`;

export const ListRowCard = styled(SurfaceCard)`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-400);
  height: auto;
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-100) var(--space-150);
  min-width: 0;
`;

export const MetaStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-050);
  min-width: 0;
`;

export const Muted = styled.span`
  display: block;
  min-width: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  line-height: 1.45;
  overflow-wrap: break-word;
  white-space: normal;
`;

export const BodyText = styled.p`
  margin: 0;
  min-width: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.5;
  overflow-wrap: break-word;
`;

export const Strong = styled.span`
  display: block;
  min-width: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
  overflow-wrap: break-word;
`;

export const ListStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
`;

export const PreviewThumb = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  min-height: 104px;
  border-radius: var(--radius-200);
  background: var(--color-surfaces-on-container);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  line-height: 1.4;
  text-align: center;
  padding: var(--space-300);
  overflow-wrap: break-word;
`;

export const PlaceholderViz = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  border: var(--stroke-100) dashed var(--color-stroke-border-high);
  border-radius: var(--radius-200);
  background: var(--color-surfaces-on-container-high);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  line-height: 1.45;
  text-align: center;
  padding: var(--space-500);
  overflow-wrap: break-word;
`;

export const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 148px), 1fr));
  gap: var(--space-300);
`;

export const KpiTile = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--space-100);
  min-width: 0;
  padding: var(--space-300);
  border: var(--stroke-100) solid var(--color-stroke-border-low);
  border-radius: var(--radius-200);
  background: var(--color-surfaces-on-container-high);
`;

export const SplitWorkspace = styled.div`
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  width: 100%;
  overflow: hidden;
`;

export const AiPanel = styled.aside<{ $width: number; $collapsed: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex: none;
  flex-direction: column;
  width: ${(p) => (p.$collapsed ? '48px' : `min(${p.$width}px, 40%)`)};
  min-width: ${(p) => (p.$collapsed ? '48px' : '280px')};
  max-width: 420px;
  border-right: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-container);
  min-height: 0;
  overflow: hidden;
`;

export const AiPanelSection = styled.div`
  display: grid;
  gap: var(--space-300);
  padding: var(--space-400);
  min-width: 0;
  overflow-x: hidden;
`;

export const AiChatScroll = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: var(--space-400);
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
`;

export const ReportPane = styled.section`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: var(--color-surfaces-on-container-high);
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-300) var(--space-400);
  padding: var(--space-400) var(--space-500);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-container);
  min-width: 0;
`;

export const ToolbarTitle = styled.div`
  display: grid;
  gap: var(--space-150);
  min-width: 0;
  flex: 1 1 240px;
`;

export const PageTabs = styled.div`
  display: flex;
  gap: var(--space-100);
  align-items: center;
  padding: var(--space-250) var(--space-500);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  overflow-x: auto;
  min-width: 0;

  /* Keep page labels readable instead of clipping mid-word */
  & button {
    flex: none;
    white-space: nowrap;
  }
`;

export const ReportCanvas = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  overflow: auto;
  padding: var(--space-500) var(--space-600);
  display: grid;
  gap: var(--space-400);
`;

export const SideDrawer = styled.aside`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  width: min(400px, 100%);
  border-left: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-3);
  min-width: 0;
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-200);
  padding: var(--space-500);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  min-width: 0;
`;

export const DrawerBody = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: var(--space-500);
  display: flex;
  flex-direction: column;
  gap: var(--space-400);
`;

export const ChatBubble = styled.div<{ $role: 'user' | 'assistant' | 'system' }>`
  align-self: ${(p) => (p.$role === 'user' ? 'flex-end' : 'flex-start')};
  box-sizing: border-box;
  max-width: 100%;
  min-width: 0;
  padding: var(--space-250) var(--space-300);
  border-radius: var(--radius-200);
  background: ${(p) =>
    p.$role === 'user'
      ? 'var(--color-primary-primary-overlay)'
      : 'var(--color-surfaces-on-container)'};
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.5;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const PromptChipRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-150);
  min-width: 0;
`;

/** Forces HelloPC buttons to wrap long prompt copy instead of truncating. */
export const WrapButtonSlot = styled.div`
  min-width: 0;
  width: 100%;
  max-width: 100%;

  & > button,
  & button {
    width: 100%;
    max-width: 100%;
    height: auto !important;
    min-height: 36px;
    justify-content: flex-start;
    align-items: flex-start;
    white-space: normal !important;
    text-align: left;
    line-height: 1.4;
    padding-block: var(--space-150);
    overflow: visible !important;
  }

  & button *,
  & button span {
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: clip !important;
    height: auto !important;
    max-width: 100%;
    overflow-wrap: break-word;
  }
`;

export const StatusBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--space-200);
  padding: var(--space-250) var(--space-500);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-info-info-overlay);
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  line-height: 1.45;
  overflow-wrap: break-word;
`;

export const ToastBar = styled.div`
  position: absolute;
  left: 50%;
  bottom: var(--space-500);
  z-index: 8;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-200);
  max-width: min(560px, calc(100% - var(--space-800)));
  padding: var(--space-250) var(--space-400);
  border-radius: var(--radius-1000);
  background: var(--color-secondary-secondary);
  color: var(--color-text-icon-inverse);
  box-shadow: var(--elevation-3);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.4;
  overflow-wrap: break-word;
`;

export const DemoBadge = styled.span`
  display: inline-flex;
  align-items: center;
  flex: none;
  padding: var(--space-050) var(--space-150);
  border-radius: var(--radius-1000);
  background: var(--color-warning-warn-overlay);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
  line-height: 1.3;
  white-space: nowrap;
`;

export const ObjectCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  min-width: 0;
  padding: var(--space-500);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-container);
  overflow: visible;
`;

export const ObjectHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-300);
  min-width: 0;
`;

export const ObjectTitleBlock = styled.div`
  display: grid;
  gap: var(--space-150);
  min-width: 0;
  flex: 1 1 200px;
`;

export const InlineMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--space-050);
  flex: none;
`;

export const TableWrap = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: auto;
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-200);
`;

export const SimpleTable = styled.table`
  width: 100%;
  min-width: 520px;
  border-collapse: collapse;
  font-family: var(--font-family);
  font-size: var(--type-size-caption);

  th,
  td {
    padding: var(--space-200) var(--space-250);
    border-bottom: var(--stroke-100) solid var(--color-stroke-border-low);
    text-align: left;
    color: var(--color-text-icon-primary);
    vertical-align: top;
    line-height: 1.45;
    overflow-wrap: break-word;
  }

  th {
    background: var(--color-surfaces-on-container);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-icon-secondary);
    white-space: nowrap;
  }
`;

export const WorkspaceRoot = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-height: 0;
  width: 100%;
`;

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-200);
  margin-bottom: var(--space-400);
  min-width: 0;
`;

export const SetupGrid = styled.div`
  display: grid;
  gap: var(--space-400);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
`;
