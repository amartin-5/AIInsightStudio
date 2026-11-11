import type { ReactNode } from 'react';

import wallpaper from '../assets/shell/wallpaper.png';
import { Stage, StageBackdrop, StageScrim, StageWallpaper } from './shell.styles';

type DesktopStageProps = {
  children: ReactNode;
};

/**
 * Presentation desktop behind the Windows app mock.
 * Wallpaper + Figma stage scrims from TokenHub frame 453:9193.
 */
export function DesktopStage({ children }: DesktopStageProps) {
  return (
    <Stage>
      <StageBackdrop aria-hidden>
        <StageWallpaper src={wallpaper} alt="" />
        <StageScrim />
      </StageBackdrop>
      {children}
    </Stage>
  );
}
