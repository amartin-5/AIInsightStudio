import { OverlayHost } from '../app/overlays/OverlayHost';
import { useAppState } from '../app/AppState';
import { WorkspaceRoot } from '../app/ui.styles';
import { HomeView } from '../app/views/HomeView';
import {
  NotificationsView,
  ReportsLibraryView,
  ScheduledView,
  SharedView,
} from '../app/views/SimpleListViews';
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
        {view === 'reports' && <ReportsLibraryView />}
        {view === 'templates' && <TemplatesView />}
        {(view === 'setup' || view === 'generating') && <SetupView />}
        {view === 'workspace' && <WorkspaceView />}
        {view === 'shared' && <SharedView />}
        {view === 'scheduled' && <ScheduledView />}
        {view === 'notifications' && <NotificationsView />}
        <OverlayHost />
      </WorkspaceRoot>
    </WorkspaceSurface>
  );
}
