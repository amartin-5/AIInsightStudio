import { IconButton, RichTooltip } from '@cake-admin/cakeand';
import { CircleAlert, Copy, Pin } from 'lucide-react';
import styled from 'styled-components';

import { ICON_SIZE } from '../../iconSize';
import type { ChatMessage } from '../../product/types';
import { ActionRow, BodyText, Muted } from '../ui.styles';

const DetailTrigger = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-icon-secondary);
  line-height: 0;
`;

const DetailStack = styled.div`
  display: grid;
  gap: var(--space-300);
  min-width: 0;
`;

const SourceList = styled.ul`
  margin: 0;
  padding-left: var(--space-400);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  line-height: 1.45;
`;

type Props = {
  message: ChatMessage;
  onPin?: () => void;
  showCopy?: boolean;
};

/**
 * Pin / WWC detail (!) / Copy row under assistant answers.
 * Dense grounding lives in the info popover so the bubble stays conversational.
 */
export function ChatAnswerActions({ message, onPin, showCopy = true }: Props) {
  const sources =
    message.sources?.filter((s) => !s.startsWith('FIFA')).slice(0, 6) ?? [];
  const hasDetail = Boolean(message.detail?.trim()) || sources.length > 0;

  return (
    <ActionRow>
      {onPin && (
        <IconButton
          label="Pin to report"
          icon={<Pin size={ICON_SIZE} />}
          size="xs"
          intent="secondary"
          variant="ghost"
          onClick={onPin}
        />
      )}
      {hasDetail && (
        <RichTooltip
          trigger={
            <DetailTrigger>
              <CircleAlert size={ICON_SIZE} aria-hidden />
            </DetailTrigger>
          }
          triggerAriaLabel="WWC 2023 detail and sources"
          title="WWC 2023 detail"
          showFooter={false}
          side="top"
          align="start"
          width={360}
        >
          <DetailStack>
            {message.detail?.trim() && <BodyText>{message.detail}</BodyText>}
            {sources.length > 0 && (
              <div>
                <Muted>Sources</Muted>
                <SourceList>
                  {sources.map((source) => (
                    <li key={source}>{source}</li>
                  ))}
                </SourceList>
              </div>
            )}
          </DetailStack>
        </RichTooltip>
      )}
      {showCopy && (
        <IconButton
          label="Copy answer"
          icon={<Copy size={ICON_SIZE} />}
          size="xs"
          intent="secondary"
          variant="ghost"
          onClick={() => navigator.clipboard?.writeText(message.content)}
        />
      )}
    </ActionRow>
  );
}
