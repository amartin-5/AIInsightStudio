import { IconButton } from '@cake-admin/cakeand';
import { Minus, Square, X } from 'lucide-react';

import { WindowControlCluster } from './shell.styles';
import { ICON_SIZE } from '../iconSize';

/**
 * Decorative Windows chrome. Non-functional for this demo shell.
 * Sized to HelloPC IconButton xs (24px) — WCAG 2.5.8 Target Size Minimum.
 */
export function WindowControls() {
  return (
    <WindowControlCluster aria-hidden>
      <IconButton
        label="Minimize"
        icon={<Minus size={ICON_SIZE} />}
        size="xs"
        intent="secondary"
        variant="ghost"
        tabIndex={-1}
        onClick={(event) => event.preventDefault()}
      />
      <IconButton
        label="Maximize"
        icon={<Square size={ICON_SIZE} />}
        size="xs"
        intent="secondary"
        variant="ghost"
        tabIndex={-1}
        onClick={(event) => event.preventDefault()}
      />
      <IconButton
        label="Close"
        icon={<X size={ICON_SIZE} />}
        size="xs"
        intent="secondary"
        variant="ghost"
        tabIndex={-1}
        onClick={(event) => event.preventDefault()}
      />
    </WindowControlCluster>
  );
}
