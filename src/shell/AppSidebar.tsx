import { useEffect, useState } from 'react';
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

/**
 * Insight Studio navigation — TokenHub translucent SidebarNav + fill-only selection.
 * Collapses automatically while a report workspace is open; expands on library views.
 */
export function AppSidebar() {
  const { nav, view, setNav } = useAppState();
  const autoCollapsed = view === 'workspace';
  const [collapsed, setCollapsed] = useState(autoCollapsed);

  useEffect(() => {
    setCollapsed(autoCollapsed);
  }, [autoCollapsed]);

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
                <ChartColumn strokeWidth={2} />
              </LogoMark>
            }
            productName="Lenovo"
            appName="Insight Studio"
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            style={{ flex: 'none', paddingBottom: 'var(--space-200)' }}
          >
            <SidebarItem value="home" icon={<Home />}>
              Home
            </SidebarItem>
            <SidebarItem value="explore" icon={<Compass />}>
              Explore
            </SidebarItem>
            <SidebarItem
              value="reports"
              icon={<FileText />}
              onClick={() => {
                // Radix skips onValueChange when already selected; force library
                // return when leaving an open report workspace.
                if (nav === 'reports') setNav('reports');
              }}
            >
              Reports
            </SidebarItem>
            <SidebarItem value="templates" icon={<LayoutTemplate />}>
              Templates
            </SidebarItem>
            <SidebarItem value="library" icon={<LayoutGrid />}>
              Library
            </SidebarItem>
            <SidebarItem value="automations" icon={<Workflow />}>
              Automations
            </SidebarItem>
            <SidebarItem value="settings" icon={<Settings />}>
              Settings
            </SidebarItem>
          </SidebarNav>
        </Sidebar>
      </TokenHubNav>
    </SidebarHost>
  );
}
