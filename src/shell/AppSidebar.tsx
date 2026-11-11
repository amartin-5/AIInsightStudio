import { useState } from 'react';
import { Sidebar, SidebarItem, SidebarNav } from '@cake-admin/cakeand';
import {
  Bell,
  CalendarClock,
  ChartColumn,
  FileText,
  Home,
  LayoutTemplate,
  Share2,
} from 'lucide-react';

import { useAppState } from '../app/AppState';
import type { NavId } from '../product/types';
import { LogoMark, SidebarHost } from './shell.styles';

/**
 * Insight Studio navigation inside the preserved translucent SidebarNav shell.
 */
export function AppSidebar() {
  const { nav, setNav, setPanel } = useAppState();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarHost>
      <Sidebar
        value={nav}
        onValueChange={(value) => {
          const next = value as NavId;
          setNav(next);
          if (next === 'notifications') setPanel(null);
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
              <ChartColumn strokeWidth={2} />
            </LogoMark>
          }
          productName="Lenovo"
          appName="Insight Studio"
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        >
          <SidebarItem value="home" icon={<Home />}>
            Home
          </SidebarItem>
          <SidebarItem value="reports" icon={<FileText />}>
            Reports
          </SidebarItem>
          <SidebarItem value="templates" icon={<LayoutTemplate />}>
            Templates
          </SidebarItem>
          <SidebarItem value="shared" icon={<Share2 />}>
            Shared with me
          </SidebarItem>
          <SidebarItem value="scheduled" icon={<CalendarClock />}>
            Scheduled
          </SidebarItem>
          <SidebarItem value="notifications" icon={<Bell />}>
            Notifications
          </SidebarItem>
        </SidebarNav>
      </Sidebar>
    </SidebarHost>
  );
}
