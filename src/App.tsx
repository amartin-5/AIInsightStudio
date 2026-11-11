import { CakeProvider } from '@cake-admin/cakeand';

import { AppWindow, DesktopStage } from './shell';

/**
 * Insight Studio — phase 1 blank shell.
 * Theme must stay in sync with data-theme on <html> in index.html.
 */
export default function App() {
  return (
    <CakeProvider mode="light.a">
      <DesktopStage>
        <AppWindow />
      </DesktopStage>
    </CakeProvider>
  );
}
