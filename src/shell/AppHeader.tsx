import { Counter, IconButton, MenuContainer, MenuItem } from '@cake-admin/cakeand';
import { Bell, LogOut, Search, Settings } from 'lucide-react';
import { DropdownMenu } from 'radix-ui';

import { useAppState } from '../app/AppState';
import avatarGlyph from '../assets/shell/icon-avatar.svg';
import {
  AvatarButton,
  HeaderBar,
  HeaderCenter,
  HeaderUtilities,
  NotificationDot,
  NotificationWrap,
  ProfileMenuHost,
  SearchField,
  SearchIconSlot,
  SearchInput,
  UtilityCluster,
} from './shell.styles';
import { WindowControls } from './WindowControls';
import { ICON_SIZE, ICON_SIZE_LG } from '../iconSize';

/**
 * Shell header utilities — search, notifications, account menu, window chrome.
 */
export function AppHeader() {
  const { unreadCount, setPanel, setNav, openTemplates, signOut } = useAppState();

  return (
    <HeaderBar>
      <HeaderCenter>
        <SearchField>
          <SearchIconSlot aria-hidden>
            <Search size={ICON_SIZE} />
          </SearchIconSlot>
          <SearchInput
            type="search"
            placeholder="Search"
            aria-label="Search"
            onKeyDown={(event) => {
              if (event.key === 'Enter') openTemplates();
            }}
          />
        </SearchField>
      </HeaderCenter>

      <HeaderUtilities>
        <UtilityCluster>
          <NotificationWrap>
            <IconButton
              label="Notifications"
              icon={<Bell size={ICON_SIZE_LG} />}
              size="sm"
              intent="secondary"
              variant="ghost"
              onClick={() => setPanel('notifications')}
            />
            {unreadCount > 0 && (
              <>
                <NotificationDot aria-hidden />
                <span
                  style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    overflow: 'hidden',
                    clip: 'rect(0 0 0 0)',
                  }}
                >
                  <Counter count={unreadCount} />
                </span>
              </>
            )}
          </NotificationWrap>

          <ProfileMenuHost>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <AvatarButton type="button" aria-label="Account menu">
                  <img src={avatarGlyph} alt="" width={16} height={16} />
                </AvatarButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content asChild sideOffset={8} align="end">
                  <MenuContainer width={220} style={{ zIndex: 20 }}>
                    <DropdownMenu.Item asChild>
                      <MenuItem
                        showLeftSlot
                        showRightSlot={false}
                        leftSlot={<Settings size={ICON_SIZE} />}
                        onClick={() => setNav('settings')}
                      >
                        Settings
                      </MenuItem>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                      <MenuItem
                        showLeftSlot
                        showRightSlot={false}
                        leftSlot={<LogOut size={ICON_SIZE} />}
                        onClick={signOut}
                      >
                        Log out
                      </MenuItem>
                    </DropdownMenu.Item>
                  </MenuContainer>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </ProfileMenuHost>
        </UtilityCluster>

        <WindowControls />
      </HeaderUtilities>
    </HeaderBar>
  );
}
