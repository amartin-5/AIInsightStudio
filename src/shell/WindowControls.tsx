import { IconButton } from '@cake-admin/cakeand';
import { Minus, Square, X } from 'lucide-react';

import { WindowControlCluster } from './shell.styles';

/**
 * Decorative Windows chrome. Non-functional for this demo shell.
 * Sized to HelloPC IconButton xs (24px) to match the header utility row.
 */
export function WindowControls() {
  return (
    <WindowControlCluster aria-hidden>
      <IconButton
        label="Minimize"
        icon={<Minus />}
        size="xs"
        intent="secondary"
        variant="ghost"
        tabIndex={-1}
        onClick={(event) => event.preventDefault()}
      />
      <IconButton
        label="Maximize"
        icon={<Square />}
        size="xs"
        intent="secondary"
        variant="ghost"
        tabIndex={-1}
        onClick={(event) => event.preventDefault()}
      />
      <IconButton
        label="Close"
        icon={<X />}
        size="xs"
        intent="secondary"
        variant="ghost"
        tabIndex={-1}
        onClick={(event) => event.preventDefault()}
      />
    </WindowControlCluster>
  );
}
