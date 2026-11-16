import { Minus, Square, X } from 'lucide-react';

import { WindowControlButton, WindowControlCluster } from './shell.styles';

/**
 * Decorative Windows chrome. Non-functional for this demo shell.
 * Compact 16px targets so OS chrome does not compete with report canvas.
 */
export function WindowControls() {
  return (
    <WindowControlCluster aria-hidden>
      <WindowControlButton type="button" tabIndex={-1} aria-label="Minimize" onClick={(e) => e.preventDefault()}>
        <Minus size={10} strokeWidth={2.5} />
      </WindowControlButton>
      <WindowControlButton type="button" tabIndex={-1} aria-label="Maximize" onClick={(e) => e.preventDefault()}>
        <Square size={9} strokeWidth={2.5} />
      </WindowControlButton>
      <WindowControlButton type="button" tabIndex={-1} aria-label="Close" onClick={(e) => e.preventDefault()}>
        <X size={10} strokeWidth={2.5} />
      </WindowControlButton>
    </WindowControlCluster>
  );
}
