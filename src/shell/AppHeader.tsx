import { Counter, IconButton } from '@cake-admin/cakeand';
import { Bell, MoreHorizontal, Search } from 'lucide-react';

import { useAppState } from '../app/AppState';
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
 * Shell header utilities. Preserves TokenHub chrome; wires notifications + reset.
 */
export function AppHeader() {
  const { unreadCount, setPanel, openTemplates } = useAppState();

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
              icon={<Bell />}
              size="xs"
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

          <AvatarButton
            type="button"
            aria-label="Account"
            onClick={(event) => event.preventDefault()}
          >
            <img src={avatarGlyph} alt="" width={16} height={16} />
          </AvatarButton>

          <IconButton
            label="More application actions"
            icon={<MoreHorizontal />}
            size="xs"
            intent="secondary"
            variant="ghost"
            onClick={() => setPanel('reset')}
          />
        </UtilityCluster>

        <WindowControls />
      </HeaderUtilities>
    </HeaderBar>
  );
}
