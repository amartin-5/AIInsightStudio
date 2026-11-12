import { CakeProvider } from '@cake-admin/cakeand';
import { Toast as RadixToast } from 'radix-ui';

import { AppStateProvider, useAppState } from './app/AppState';
import { OnboardingFlow } from './app/onboarding/OnboardingFlow';
import { AppWindow, DesktopStage } from './shell';

/**
 * Insight Studio — HelloPC Windows shell with demo product experience.
 * Theme must stay in sync with data-theme on <html> in index.html.
 */
export default function App() {
  return (
    <CakeProvider mode="light.a">
      <RadixToast.Provider swipeDirection="right">
        <AppStateProvider>
          <DesktopStage>
            <AppShellGate />
          </DesktopStage>
        </AppStateProvider>
      </RadixToast.Provider>
    </CakeProvider>
  );
}

function AppShellGate() {
  const { sessionReady } = useAppState();
  return sessionReady ? <AppWindow /> : <OnboardingFlow />;
}
