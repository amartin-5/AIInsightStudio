import { useEffect, useRef } from 'react';
import { Sidebar, SidebarItem, SidebarNav } from '@cake-admin/cakeand';
import {
  Bell,
  ChartColumn,
  Compass,
  FileText,
  Home,
  LayoutGrid,
  LayoutTemplate,
  Settings,
  Workflow,
} from 'lucide-react';
import styled from 'styled-components';

import { useAppState } from '../app/AppState';
import type { NavId } from '../product/types';
import { LogoMark, SidebarHost, TokenHubNav } from './shell.styles';
import { ICON_SIZE } from '../iconSize';

/**
 * Badge host only — do not size this box. SidebarItem forces leading svgs to
 * 24px; a fixed 16px wrap clips/misaligns the bell vs the other nav icons.
 */
const BellIconWrap = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const NavBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 7px;
  height: 7px;
  border-radius: var(--radius-1000);
  background: var(--color-error-error);
  border: var(--stroke-100) solid var(--color-surfaces-container);
  pointer-events: none;
`;

/**
 * Insight Studio navigation — TokenHub translucent SidebarNav + fill-only selection.
 * Opening a report collapses the rail; only the user expands it again (app-wide).
 * Notifications opens the existing panel without changing the main view.
 */
export function AppSidebar() {
  const {
    nav,
    view,
    panel,
    setNav,
    sidebarCollapsed,
    setSidebarCollapsed,
    setPanel,
    unreadCount,
  } = useAppState();
  const previousView = useRef(view);

  useEffect(() => {
    const enteredWorkspace =
      view === 'workspace' && previousView.current !== 'workspace';
    previousView.current = view;
    if (enteredWorkspace) {
      setSidebarCollapsed(true);
    }
  }, [view, setSidebarCollapsed]);

  return (
    <SidebarHost>
      <TokenHubNav>
        <Sidebar
          value={nav}
          onValueChange={(value) => {
            if (value === 'notifications') {
              setPanel(panel === 'notifications' ? null : 'notifications');
              return;
            }
            if (panel === 'notifications') setPanel(null);
            setNav(value as NavId);
          }}
          style={{
            height: '100%',
            gap: 0,
            alignItems: 'stretch',
          }}
        >
          <SidebarNav
            aria-label="Main navigation"
            surface="translucent"
            logo={
              <LogoMark aria-hidden>
                <ChartColumn size={ICON_SIZE} />
              </LogoMark>
            }
            productName="Lenovo"
            appName="Insight Studio"
            collapsed={sidebarCollapsed}
            onCollapsedChange={setSidebarCollapsed}
            style={{ flex: 'none', paddingBottom: 'var(--space-200)' }}
          >
            <SidebarItem
              value="notifications"
              data-notifications-trigger=""
              icon={
                <BellIconWrap>
                  <Bell size={ICON_SIZE} />
                  {unreadCount > 0 && <NavBadge aria-hidden />}
                </BellIconWrap>
              }
            >
              Notifications
            </SidebarItem>
            <SidebarItem value="home" icon={<Home size={ICON_SIZE} />}>
              Home
            </SidebarItem>
            <SidebarItem value="explore" icon={<Compass size={ICON_SIZE} />}>
              Explore
            </SidebarItem>
            <SidebarItem
              value="reports"
              icon={<FileText size={ICON_SIZE} />}
              onClick={() => {
                if (nav === 'reports') setNav('reports');
              }}
            >
              Reports
            </SidebarItem>
            <SidebarItem value="templates" icon={<LayoutTemplate size={ICON_SIZE} />}>
              Templates
            </SidebarItem>
            <SidebarItem value="library" icon={<LayoutGrid size={ICON_SIZE} />}>
              Library
            </SidebarItem>
            <SidebarItem value="automations" icon={<Workflow size={ICON_SIZE} />}>
              Automations
            </SidebarItem>
            <SidebarItem value="settings" icon={<Settings size={ICON_SIZE} />}>
              Settings
            </SidebarItem>
          </SidebarNav>
        </Sidebar>
      </TokenHubNav>
    </SidebarHost>
  );
}
