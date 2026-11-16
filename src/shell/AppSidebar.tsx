import { useEffect, useRef } from 'react';
import { Sidebar, SidebarItem, SidebarNav } from '@cake-admin/cakeand';
import {
  ChartColumn,
  Compass,
  FileText,
  Home,
  LayoutGrid,
  LayoutTemplate,
  Settings,
  Workflow,
} from 'lucide-react';

import { useAppState } from '../app/AppState';
import type { NavId } from '../product/types';
import { LogoMark, SidebarHost, TokenHubNav } from './shell.styles';
import { ICON_SIZE } from '../iconSize';

/**
 * Insight Studio navigation — TokenHub translucent SidebarNav + fill-only selection.
 * Opening a report collapses the rail; only the user expands it again (app-wide).
 */
export function AppSidebar() {
  const { nav, view, setNav, sidebarCollapsed, setSidebarCollapsed } = useAppState();
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
          onValueChange={(value) => setNav(value as NavId)}
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
                // Radix skips onValueChange when already selected; force library
                // return when leaving an open report workspace.
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
