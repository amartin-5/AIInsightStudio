import { useAppState } from '../app/AppState';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { MainWorkspace } from './MainWorkspace';
import { MainColumn, WindowFrame, WindowInner } from './shell.styles';

/**
 * Translucent Windows-style application container.
 * Present mode hides sidebar and header for a full-bleed canvas.
 */
export function AppWindow() {
  const { presentMode } = useAppState();

  return (
    <WindowFrame role="application" aria-label="Insight Studio">
      <WindowInner>
        {!presentMode && <AppSidebar />}
        <MainColumn>
          {!presentMode && <AppHeader />}
          <MainWorkspace />
        </MainColumn>
      </WindowInner>
    </WindowFrame>
  );
}
