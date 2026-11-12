import { OverlayHost } from '../app/overlays/OverlayHost';
import { useAppState } from '../app/AppState';
import { WorkspaceRoot } from '../app/ui.styles';
import { AutomationsView } from '../app/views/AutomationsView';
import { ExploreView } from '../app/views/ExploreView';
import { HomeView } from '../app/views/HomeView';
import { LibraryView } from '../app/views/LibraryView';
import { ReportsLibraryView } from '../app/views/ReportsLibraryView';
import { SettingsView } from '../app/views/SettingsView';
import { SetupView } from '../app/views/SetupView';
import { TemplatesView } from '../app/views/TemplatesView';
import { WorkspaceView } from '../app/views/WorkspaceView';
import { WorkspaceSurface } from './shell.styles';

/**
 * Main content host. Preserves the shell surface while swapping product views.
 */
export function MainWorkspace() {
  const { view } = useAppState();

  return (
    <WorkspaceSurface aria-label="Workspace">
      <WorkspaceRoot>
        {view === 'home' && <HomeView />}
        {view === 'explore' && <ExploreView />}
        {view === 'reports' && <ReportsLibraryView />}
        {view === 'templates' && <TemplatesView />}
        {view === 'library' && <LibraryView />}
        {(view === 'setup' || view === 'generating') && <SetupView />}
        {view === 'workspace' && <WorkspaceView />}
        {view === 'automations' && <AutomationsView />}
        {view === 'settings' && <SettingsView />}
        <OverlayHost />
      </WorkspaceRoot>
    </WorkspaceSurface>
  );
}
