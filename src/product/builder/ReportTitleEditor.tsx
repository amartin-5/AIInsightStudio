import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IconButton, TextInput } from '@cake-admin/cakeand';
import { Check, Pencil, X } from 'lucide-react';

type Props = {
  value: string;
  onChange: (next: string) => void;
  editable?: boolean;
};

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  min-width: 0;
`;

const TitleButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: var(--space-200);
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-bold);
  line-height: 1.3;
  text-align: left;
  cursor: pointer;

  &:hover {
    color: var(--color-primary-primary);
  }

  &:focus-visible {
    outline: var(--stroke-200) solid var(--color-primary-primary);
    outline-offset: 2px;
    border-radius: var(--radius-100);
  }
`;

const TitleText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EditRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: var(--space-150);
  min-width: 0;
  flex: 1 1 240px;
`;

/** Inline rename control for custom reports — click title or pencil to edit. */
export function ReportTitleEditor({ value, onChange, editable = true }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  const commit = () => {
    const next = draft.trim() || 'Untitled';
    onChange(next);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  if (!editable) {
    return <TitleText>{value}</TitleText>;
  }

  if (editing) {
    return (
      <EditRow>
        <TextInput
          aria-label="Report name"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit();
            if (e.key === 'Escape') cancel();
          }}
          size="sm"
        />
        <IconButton
          label="Save report name"
          icon={<Check />}
          size="xs"
          onClick={commit}
        />
        <IconButton
          label="Cancel rename"
          icon={<X />}
          size="xs"
          intent="secondary"
          variant="ghost"
          onClick={cancel}
        />
      </EditRow>
    );
  }

  return (
    <Row>
      <TitleButton type="button" onClick={() => setEditing(true)}>
        <TitleText>{value}</TitleText>
      </TitleButton>
      <IconButton
        label="Rename report"
        icon={<Pencil />}
        size="xs"
        intent="secondary"
        variant="ghost"
        onClick={() => setEditing(true)}
      />
    </Row>
  );
}
