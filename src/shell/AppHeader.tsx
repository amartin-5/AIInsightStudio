import { HeaderBar, HeaderUtilities } from './shell.styles';
import { WindowControls } from './WindowControls';

/**
 * Slim shell header — window chrome only.
 * Search, notifications, and profile moved out to reclaim vertical space.
 */
export function AppHeader() {
  return (
    <HeaderBar>
      <HeaderUtilities>
        <WindowControls />
      </HeaderUtilities>
    </HeaderBar>
  );
}
