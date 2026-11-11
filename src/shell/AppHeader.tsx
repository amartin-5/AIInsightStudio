import { IconButton } from '@cake-admin/cakeand';
import { Bell, Search } from 'lucide-react';

import avatarGlyph from '../assets/shell/icon-avatar.svg';
import {
  AvatarButton,
  HeaderBar,
  HeaderCenter,
  HeaderUtilities,
  NotificationDot,
  NotificationWrap,
  SearchField,
  SearchIconSlot,
  SearchInput,
  UtilityCluster,
} from './shell.styles';
import { WindowControls } from './WindowControls';

/**
 * Empty shell header: search field, utility slots, and decorative window chrome.
 * Top-bar controls use HelloPC IconButton size="xs" (24px).
 */
export function AppHeader() {
  return (
    <HeaderBar>
      <HeaderCenter>
        <SearchField>
          <SearchIconSlot aria-hidden>
            <Search />
          </SearchIconSlot>
          <SearchInput
            type="search"
            placeholder="Search"
            aria-label="Search"
            readOnly
          />
        </SearchField>
      </HeaderCenter>

      <HeaderUtilities>
        <UtilityCluster>
          <NotificationWrap>
            <IconButton
              label="Notifications"
              icon={<Bell />}
              size="xs"
              intent="secondary"
              variant="ghost"
              onClick={(event) => event.preventDefault()}
            />
            <NotificationDot aria-hidden />
          </NotificationWrap>

          <AvatarButton
            type="button"
            aria-label="Account"
            onClick={(event) => event.preventDefault()}
          >
            <img src={avatarGlyph} alt="" width={16} height={16} />
          </AvatarButton>
        </UtilityCluster>

        <WindowControls />
      </HeaderUtilities>
    </HeaderBar>
  );
}
