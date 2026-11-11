import { CakeProvider } from '@cake-admin/cakeand';

import { AppStateProvider } from './app/AppState';
import { AppWindow, DesktopStage } from './shell';

/**
 * Insight Studio — HelloPC Windows shell with demo product experience.
 * Theme must stay in sync with data-theme on <html> in index.html.
 */
export default function App() {
  return (
    <CakeProvider mode="light.a">
      <AppStateProvider>
        <DesktopStage>
          <AppWindow />
        </DesktopStage>
      </AppStateProvider>
    </CakeProvider>
  );
}
