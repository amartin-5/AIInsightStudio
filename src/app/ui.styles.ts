import styled, { css, keyframes } from 'styled-components';

const drawerSlideIn = keyframes`
  from {
    transform: translateX(12px);
    opacity: 0.72;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const drawerSlideInFromLeft = keyframes`
  from {
    transform: translateX(-12px);
    opacity: 0.72;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

/**
 * HelloPC Button/Chip/Badge labels default to nowrap + ellipsis.
 * Prefer wrapping so product copy stays fully readable.
 * Skips icon-only controls (IconButton / SVG actions) so glyphs stay
 * square and fully visible — those use AccessibleIcon, not aria-label.
 * Also skips Radio / Checkbox / Switch roots: their indicator is an empty
 * bordered span, and `height: auto` collapses unchecked rings to a line.
 */
const showFullLabelText = css`
  button:not([aria-label]):not(:has(svg)):not([role='radio']):not([role='checkbox']):not([role='switch']),
  [role='button']:not([aria-label]):not(:has(svg)) {
    height: auto !important;
    white-space: normal !important;
    overflow: visible !important;
  }

  button:not([aria-label]):not(:has(svg)):not([role='radio']):not([role='checkbox']):not([role='switch']) span,
  [role='button']:not([aria-label]):not(:has(svg)) span {
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: clip !important;
    height: auto !important;
    max-width: 100%;
    overflow-wrap: break-word;
  }

  /* Restore HelloPC Radio/Checkbox indicator geometry if an ancestor rule fought it.
     Skip ContentSwitcher segments — those are also role=radio but carry text labels
     inside nested spans, and must keep content-sized widths. */
  button[role='radio']:not(:has(span span)),
  button[role='checkbox']:not(:has(span span)) {
    width: var(--space-500) !important;
    height: var(--space-500) !important;
    min-width: var(--space-500);
    min-height: var(--space-500);
    flex-shrink: 0;
    overflow: visible !important;
  }

  button[role='radio']:not(:has(span span)) > span,
  button[role='checkbox']:not(:has(span span)) > span {
    width: var(--space-300) !important;
    height: var(--space-300) !important;
    min-width: var(--space-300);
    min-height: var(--space-300);
    aspect-ratio: 1;
    flex-shrink: 0;
    overflow: visible !important;
    box-sizing: border-box;
  }

  button[role='checkbox']:not(:has(span span)) > span {
    width: var(--space-350) !important;
    height: var(--space-350) !important;
    min-width: var(--space-350);
    min-height: var(--space-350);
    border-radius: var(--radius-50);
  }
`;

/** TokenHub report/home page gutters: 48 left / 48 right / 24 top / 48 bottom. */
export const ScrollArea = styled.div`
  box-sizing: border-box;
  flex: 1 1 auto;
  min-height: 0;
  width: 0;
  min-width: 100%;
  max-width: 100%;
  overflow: auto;
  padding: var(--space-500) var(--space-800) var(--space-800);
  ${showFullLabelText}
`;

export const PageHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-500);
  margin-bottom: var(--space-500);
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-100);
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
  line-height: 1.35;
  overflow-wrap: anywhere;
`;

export const PageSubtitle = styled.p`
  margin: 0;
  max-width: 52ch;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-regular);
  line-height: 1.35;
  overflow-wrap: break-word;
`;

/**
 * TokenHub report header card — indigo → violet gradient banner.
 * Stops match TokenHub ReportPage; not available as tokens.
 */
export const HeroBanner = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-500);
  width: 100%;
  min-width: 0;
  margin-bottom: var(--space-500);
  padding: var(--space-500);
  border-radius: var(--radius-300);
  background-image: linear-gradient(8deg, rgb(21, 47, 197) 14%, rgb(160, 120, 255) 87%);
  box-shadow: var(--elevation-2);
`;

export const HeroTitle = styled.h1`
  margin: 0;
  color: var(--color-text-icon-on-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-page);
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
  overflow-wrap: break-word;
`;

export const HeroSubtitle = styled.p`
  margin: 0;
  max-width: 48ch;
  color: var(--color-text-icon-on-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.35;
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
  gap: var(--space-300);
  margin-bottom: var(--space-500);
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
  line-height: 1.35;
  overflow-wrap: break-word;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  gap: var(--space-500);
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
  box-shadow: var(--elevation-2);
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
  min-height: 120px;
  border-radius: var(--radius-200);
  background:
    linear-gradient(146deg, rgb(4, 27, 149) 2.5%, rgb(83, 103, 246) 55%, rgb(89, 177, 255) 100%);
  color: var(--color-text-icon-inverse);
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
  border-radius: var(--radius-300);
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
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 160px), 1fr));
  gap: var(--space-300);
`;

export const KpiTile = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--space-100);
  min-width: 0;
  padding: var(--space-400);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-2);
`;

export const SplitWorkspace = styled.div`
  position: relative;
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
  width: ${(p) => (p.$collapsed ? '44px' : `min(${p.$width}px, 28%)`)};
  min-width: ${(p) => (p.$collapsed ? '44px' : '240px')};
  max-width: 320px;
  border-right: var(--stroke-100) solid var(--color-stroke-border);
  border-left: 3px solid var(--color-primary-primary);
  background: var(--color-surfaces-container-blur);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  box-shadow: var(--elevation-3);
  min-height: 0;
  overflow: hidden;
`;

/** Floating chat card over the report canvas (ChatGPT-style dock). */
export const FloatingChat = styled.aside`
  position: absolute;
  left: var(--space-400);
  bottom: var(--space-400);
  z-index: 4;
  display: flex;
  flex-direction: column;
  width: min(360px, calc(100% - var(--space-800)));
  height: min(520px, calc(100% - var(--space-800)));
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-left: 3px solid var(--color-primary-primary);
  border-radius: var(--radius-400);
  background: var(--color-surfaces-container-blur);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  box-shadow: var(--elevation-5);
  overflow: hidden;
`;

export const FloatingChatFab = styled.div`
  position: absolute;
  left: var(--space-400);
  bottom: var(--space-400);
  z-index: 4;
`;

export const AiPanelHeader = styled.div<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(p) => (p.$collapsed ? 'center' : 'space-between')};
  gap: var(--space-200);
  min-height: 48px;
  padding: var(--space-200) var(--space-300);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-primary);
  min-width: 0;
`;

export const AiPanelSection = styled.div`
  display: grid;
  gap: var(--space-200);
  padding: var(--space-300);
  min-width: 0;
  overflow-x: hidden;
  ${showFullLabelText}
`;

export const AiChatScroll = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: var(--space-300);
  display: flex;
  flex-direction: column;
  gap: var(--space-250);

  /* Keep chat action IconButtons at designed size (avoid label-wrap rules). */
  ${ActionRow} {
    align-items: center;
  }

  ${ActionRow} button {
    flex: 0 0 auto;
    overflow: visible;
  }
`;

export const AiEmptyState = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: flex-end;
  gap: var(--space-250);
  min-height: 0;
  min-width: 0;
  padding: var(--space-200) 0;
  color: var(--color-text-icon-secondary);

  & > strong,
  & > span:first-child {
    color: var(--color-text-icon-primary);
    font-size: var(--type-size-body);
    font-weight: var(--font-weight-bold);
  }
`;

export const AiComposer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--space-150);
  align-items: center;
  padding: var(--space-250) var(--space-300) var(--space-300);
  border-top: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-container-blur-high);
  min-width: 0;

  /* Keep send glyph optically centered in the circular fill control */
  & > button {
    transition: transform 120ms ease;
  }

  & > button:not(:disabled):hover {
    transform: scale(1.06);
  }

  & > button svg {
    width: 14px;
    height: 14px;
    margin-inline-start: 1px;
  }
`;

export const ChatMessageBlock = styled.div`
  display: grid;
  gap: var(--space-100);
  min-width: 0;
`;

export const ReportPane = styled.section`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: transparent;
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-200) var(--space-300);
  flex: none;
  padding: var(--space-150) var(--space-300);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-container-blur-high);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  min-width: 0;
  ${showFullLabelText}
`;

export const ToolbarTitle = styled.div`
  display: grid;
  gap: var(--space-050);
  min-width: 0;
  flex: 1 1 200px;
`;

export const PageTabs = styled.div`
  display: flex;
  gap: var(--space-100);
  align-items: center;
  flex: none;
  box-sizing: border-box;
  /* Equal block padding — kept intact via flex:none so the pane cannot crush it. */
  padding: var(--space-150) var(--space-300);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-container-blur-high);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  overflow-x: auto;
  min-width: 0;

  /* Keep page labels readable instead of clipping mid-word */
  & button {
    flex: none;
    white-space: nowrap;
  }
`;

/** Dedicated edit chrome under page tabs — keeps tabs readable. */
export const EditBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-300);
  flex: none;
  padding: var(--space-200) var(--space-400);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-primary-primary-overlay);
  min-width: 0;
`;

export const EditBarGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-150);
  min-width: 0;
`;

export const ReportCanvas = styled.div<{ $editing?: boolean }>`
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  /* Only the report page scrolls — widgets/charts never scroll themselves. */
  overflow-x: hidden;
  overflow-y: auto;
  /* Solid surface so canvas inset does not visually merge with PageTabs padding. */
  background: var(--color-surfaces-canvas);
  padding: ${(p) =>
    p.$editing ? 'var(--space-600) var(--space-800)' : 'var(--space-400)'};
  display: block;
  ${showFullLabelText}
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
  border-left: 3px solid var(--color-primary-primary);
  background: var(--color-surfaces-container-blur);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  box-shadow: var(--elevation-4);
  min-width: 0;
  animation: ${drawerSlideIn} 200ms ease;
`;

export const DrawerSubtitle = styled.p`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

export const FormatTile = styled.button<{ $active?: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-250) var(--space-300);
  border: var(--stroke-100) solid
    ${(p) => (p.$active ? 'var(--color-primary-primary)' : 'var(--color-stroke-border)')};
  border-radius: var(--radius-200);
  background: ${(p) =>
    p.$active ? 'var(--color-primary-primary-overlay)' : 'var(--color-surfaces-container)'};
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  text-align: start;
  transition: background 140ms ease, border-color 140ms ease;

  &:hover {
    background: var(--color-primary-primary-overlay);
  }
`;

/**
 * Wider notifications host — HelloPC NotificationPanel caps at 432px and
 * Notification cards at 480px; the footer packs timestamp + actions on one
 * row, which overlaps when the drawer is narrow.
 * Opens from the left, next to the sidebar notifications item.
 */
export const NotificationsDrawer = styled(SideDrawer)`
  right: auto;
  left: 0;
  width: min(560px, 100%);
  border-left: none;
  border-right: 3px solid var(--color-primary-primary);
  animation-name: ${drawerSlideInFromLeft};

  & > section {
    max-width: none;
    height: 100%;
    border-radius: 0;
    box-shadow: none;
    border: 0;
  }

  & article {
    max-width: none;
  }

  /* Give each notification more vertical room and stack meta above actions. */
  & article > div {
    gap: var(--space-400);
    padding: var(--space-500);
  }

  & article > div > div:last-child {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-200);
    padding-left: var(--space-700);
  }

  ${showFullLabelText}
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-200);
  padding: var(--space-500);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-primary);
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
  ${showFullLabelText}
`;

export const ChatBubble = styled.div<{ $role: 'user' | 'assistant' | 'system' }>`
  align-self: ${(p) => (p.$role === 'user' ? 'flex-end' : 'flex-start')};
  box-sizing: border-box;
  max-width: 100%;
  min-width: 0;
  padding: var(--space-200) var(--space-300);
  border-radius: var(--radius-200);
  border: var(--stroke-100) solid
    ${(p) =>
      p.$role === 'user' ? 'transparent' : 'var(--color-stroke-border)'};
  background: ${(p) =>
    p.$role === 'user'
      ? 'var(--color-primary-primary-overlay)'
      : 'var(--color-surfaces-on-container-high)'};
  box-shadow: ${(p) => (p.$role === 'assistant' ? 'var(--elevation-1)' : 'none')};
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.45;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const PromptChipRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-100);
  min-width: 0;
`;

/** Forces HelloPC buttons to wrap long prompt copy instead of truncating. */
export const WrapButtonSlot = styled.div`
  min-width: 0;
  width: 100%;
  max-width: 100%;

  & > button:not([role='radio']):not([role='checkbox']):not([role='switch']),
  & button:not([role='radio']):not([role='checkbox']):not([role='switch']) {
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

  & button:not([role='radio']):not([role='checkbox']):not([role='switch']) *,
  & button:not([role='radio']):not([role='checkbox']):not([role='switch']) span {
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

export const SoftBadge = styled.span`
  display: inline-flex;
  align-items: center;
  flex: none;
  max-width: 100%;
  padding: var(--space-050) var(--space-150);
  border-radius: var(--radius-1000);
  background: var(--color-warning-warn-overlay);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
  line-height: 1.3;
  white-space: normal;
  overflow-wrap: break-word;
`;

export const ObjectCard = styled.article<{
  $editing?: boolean;
  $modular?: boolean;
  $bare?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: ${(p) => (p.$bare ? 0 : p.$editing ? 'var(--space-400)' : 'var(--space-200)')};
  min-width: 0;
  width: 100%;
  height: auto;
  padding: ${(p) =>
    p.$bare ? 0 : p.$editing ? 'var(--space-500)' : 'var(--space-300)'};
  border: ${(p) =>
    p.$bare
      ? 'none'
      : `var(--stroke-100) solid ${
          p.$editing ? 'var(--color-primary-primary)' : 'var(--color-stroke-border)'
        }`};
  border-radius: ${(p) => (p.$bare ? 0 : 'var(--radius-400)')};
  background: ${(p) => (p.$bare ? 'transparent' : 'var(--color-surfaces-container)')};
  box-shadow: ${(p) => (p.$bare ? 'none' : 'var(--elevation-2)')};
  overflow: visible;
  position: relative;

  &::before {
    content: ${(p) => (p.$bare ? 'none' : "''")};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    border-radius: var(--radius-400) var(--radius-400) 0 0;
    background: var(--color-primary-primary-overlay);
    pointer-events: none;
  }
`;

export const WidgetDragHandle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-100);
  color: var(--color-text-icon-secondary);
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  &:hover {
    background: var(--color-surfaces-on-container);
    color: var(--color-text-icon-primary);
  }
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
  gap: var(--space-100);
  min-width: 0;
  flex: 1 1 160px;
`;

export const InlineMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-100);
  flex: none;
`;

export const TableWrap = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: visible;
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-200);
  -webkit-overflow-scrolling: touch;
`;

export const SimpleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
  font-family: var(--font-family);
  font-size: var(--type-size-body);

  th,
  td {
    padding: var(--space-250) var(--space-300);
    border-bottom: var(--stroke-100) solid var(--color-stroke-border-low);
    text-align: left;
    color: var(--color-text-icon-primary);
    vertical-align: middle;
    line-height: 1.5;
    white-space: nowrap;
  }

  th {
    background: var(--color-surfaces-on-container);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-icon-secondary);
  }

  /* Longer prose columns (notes, observations) wrap and claim leftover width. */
  th:last-child,
  td:last-child {
    white-space: normal;
    width: 40%;
    min-width: 10rem;
    overflow-wrap: break-word;
  }

  tbody tr:last-child td {
    border-bottom: none;
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
