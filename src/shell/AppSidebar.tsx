import { useState } from 'react';
import { Sidebar, SidebarNav } from '@cake-admin/cakeand';
import { ChartColumn } from 'lucide-react';

import { LogoMark, SidebarHost } from './shell.styles';

/**
 * Empty navigation rail. Brand lockup only — no SidebarItems in phase 1.
 */
export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarHost>
      <Sidebar
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
          {null}
        </SidebarNav>
      </Sidebar>
    </SidebarHost>
  );
}
