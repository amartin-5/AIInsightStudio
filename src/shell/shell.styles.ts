import styled from 'styled-components';

/** Full-viewport desktop behind the Windows app mock. */
export const Stage = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: var(--space-500);
  overflow: auto;
`;

export const StageBackdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  background: #03013d;
`;

export const StageWallpaper = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/** Figma DesktopStage gradient overlays (frame 453:9193). */
export const StageScrim = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(
      180deg,
      rgba(147, 97, 221, 0.3) 0%,
      rgba(89, 59, 157, 0.375) 21.938%,
      rgba(51, 33, 114, 0.45) 43.877%,
      rgba(24, 15, 84, 0.525) 65.816%,
      rgba(3, 1, 61, 0.6) 87.754%
    ),
    linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
`;

/** Translucent Windows app frame — TokenHub container geometry. */
export const WindowFrame = styled.div`
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  width: min(1440px, 100%);
  height: min(778px, calc(100vh - var(--space-800)));
  min-height: 560px;
  overflow: hidden;
  border: 8px solid var(--color-stroke-border-container-os);
  border-radius: var(--radius-150);
  background: var(--color-surfaces-container-blur-high);
  backdrop-filter: blur(45px);
  -webkit-backdrop-filter: blur(45px);
  box-shadow: var(--elevation-5);
`;

export const WindowInner = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100%;
  min-width: 0;
  overflow: hidden;
`;

export const SidebarHost = styled.div`
  display: flex;
  flex: none;
  align-items: stretch;
  height: 100%;
  min-height: 0;

  /* HelloPC Sidebar is a horizontal flex tabs root; only the nav rail lives here. */
  & > [data-orientation='vertical'],
  & > * {
    height: 100%;
  }
`;

export const MainColumn = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  align-items: stretch;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow: hidden;
`;

export const HeaderBar = styled.header`
  display: flex;
  flex: none;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-500);
  box-sizing: border-box;
  width: 100%;
  padding: var(--space-300) var(--space-300) var(--space-100) var(--space-500);
`;

export const HeaderCenter = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  min-width: 0;
`;

export const HeaderUtilities = styled.div`
  display: flex;
  flex: none;
  align-items: center;
  gap: var(--space-500);
`;

export const UtilityCluster = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-300);
`;

export const WindowControlCluster = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-050);
`;

/** Pill search field matching TokenHub header chrome. */
export const SearchField = styled.label`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: var(--space-100);
  width: min(320px, 100%);
  height: 32px;
  padding-inline: var(--space-200);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-1000);
  background: var(--color-surfaces-on-container-high);
  color: var(--color-text-icon-secondary);

  &:focus-within {
    outline: var(--stroke-150) solid var(--color-primary-primary);
    outline-offset: var(--space-025);
  }
`;

export const SearchInput = styled.input`
  flex: 1 1 auto;
  min-width: 0;
  height: 100%;
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.35;

  &::placeholder {
    color: var(--color-text-icon-placeholder);
  }

  &:focus {
    outline: none;
  }
`;

export const SearchIconSlot = styled.span`
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--color-text-icon-secondary);

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const NotificationWrap = styled.span`
  position: relative;
  display: inline-flex;
`;

export const NotificationDot = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 6px;
  height: 6px;
  border-radius: var(--radius-1000);
  background: var(--color-error-error);
  pointer-events: none;
`;

export const AvatarButton = styled.button`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: var(--radius-1000);
  background: var(--color-primary-primary-overlay);
  color: var(--color-primary-primary);
  cursor: default;

  &:focus-visible {
    outline: var(--stroke-200) solid var(--color-primary-primary);
    outline-offset: var(--space-025);
  }

  img,
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const WorkspaceSurface = styled.main`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: var(--color-surfaces-on-container-high);
`;

/** Generic stand-in app mark for the SidebarNav 32px logo slot. */
export const LogoMark = styled.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-150);
  background: var(--color-primary-primary);
  color: var(--color-text-icon-inverse);

  svg {
    width: 18px;
    height: 18px;
  }
`;
