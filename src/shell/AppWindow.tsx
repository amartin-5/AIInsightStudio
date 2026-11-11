import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { MainWorkspace } from './MainWorkspace';
import { MainColumn, WindowFrame, WindowInner } from './shell.styles';

/**
 * Translucent Windows-style application container.
 */
export function AppWindow() {
  return (
    <WindowFrame role="application" aria-label="Insight Studio">
      <WindowInner>
        <AppSidebar />
        <MainColumn>
          <AppHeader />
          <MainWorkspace />
        </MainColumn>
      </WindowInner>
    </WindowFrame>
  );
}
