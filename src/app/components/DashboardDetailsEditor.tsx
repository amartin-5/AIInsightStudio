import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Chip,
  Modal,
  ModalContent,
  ModalFooter,
  TextInput,
} from '@cake-admin/cakeand';
import { Plus, SlidersHorizontal } from 'lucide-react';

import {
  DEFAULT_MATCH_CONTEXT,
  MatchContextFields,
  type MatchContext,
} from '../../product/builder';
import type { ReportRecord } from '../../product/types';
import { ICON_SIZE } from '../../iconSize';
import { useAppState } from '../AppState';
import { Muted } from '../ui.styles';

const BodyStack = styled.div`
  display: grid;
  gap: var(--space-600);
  min-width: 0;
  padding-top: var(--space-200);
`;

const Section = styled.section`
  display: grid;
  gap: var(--space-400);
  min-width: 0;

  &:not(:first-child) {
    padding-top: var(--space-500);
    border-top: var(--stroke-100) solid var(--color-stroke-border);
  }
`;

const SectionHead = styled.div`
  display: grid;
  gap: var(--space-100);
  min-width: 0;
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subtitle);
  font-weight: var(--font-weight-bold);
  line-height: 1.3;
`;

const SectionHint = styled(Muted)`
  display: block;
  line-height: 1.45;
`;

const TagBlock = styled.div`
  display: grid;
  gap: var(--space-300);
  min-width: 0;
`;

const TagGroup = styled.div`
  display: grid;
  gap: var(--space-150);
  min-width: 0;
`;

const GroupLabel = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-150);
  align-items: center;
  min-width: 0;
`;

const TagAddRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-200);
  align-items: flex-end;
  min-width: 0;
`;

const SUGGESTED_TAGS = ['Performance', 'Briefing', 'Match', 'Scouting', 'Executive', 'Custom'];

type Props = {
  open: boolean;
  report: ReportRecord;
  onClose: () => void;
};

/**
 * Modal sub-editor for dashboard metadata: title, tags, and match filters.
 */
export function DashboardDetailsEditor({ open, report, onClose }: Props) {
  const { renameReport, setReportTags, updateMatchContext } = useAppState();
  const [titleDraft, setTitleDraft] = useState(report.name);
  const [tagDraft, setTagDraft] = useState('');

  const tags = report.tags ?? [];
  const matchContext: MatchContext = report.matchContext ?? { ...DEFAULT_MATCH_CONTEXT };
  const suggestions = SUGGESTED_TAGS.filter(
    (tag) => !tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );

  useEffect(() => {
    if (!open) return;
    setTitleDraft(report.name);
    setTagDraft('');
  }, [open, report.id, report.name]);

  const addTag = (raw: string) => {
    const next = raw.trim();
    if (!next) return;
    if (tags.some((tag) => tag.toLowerCase() === next.toLowerCase())) {
      setTagDraft('');
      return;
    }
    setReportTags([...tags, next]);
    setTagDraft('');
  };

  const commitTitle = () => {
    const next = titleDraft.trim() || 'Untitled';
    setTitleDraft(next);
    if (next !== report.name) renameReport(next);
  };

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      title="Dashboard details"
      modalIconSlot={<SlidersHorizontal />}
      showClose
      footer={
        <ModalFooter
          checkbox={false}
          primaryActionLabel="Done"
          onPrimaryAction={onClose}
          secondaryActionLabel="Discard"
          onSecondaryAction={onClose}
        />
      }
    >
      <ModalContent description="Update the board title, tags, and match filters used by charts.">
        <BodyStack>
          <Section>
            <SectionHead>
              <SectionTitle>Title</SectionTitle>
              <SectionHint>Shown in the library, workspace chrome, and share dialog.</SectionHint>
            </SectionHead>
            <TextInput
              label="Dashboard title"
              required
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={commitTitle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  (e.target as HTMLInputElement).blur();
                }
              }}
              placeholder="Dashboard title"
            />
          </Section>

          <Section>
            <SectionHead>
              <SectionTitle>Tags</SectionTitle>
              <SectionHint>Used in the library and board chrome.</SectionHint>
            </SectionHead>
            <TagBlock>
              <TagGroup>
                <GroupLabel>Applied</GroupLabel>
                <TagRow aria-label="Editable tags">
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      size="sm"
                      type="secondary"
                      onRemove={() => setReportTags(tags.filter((t) => t !== tag))}
                    >
                      {tag}
                    </Chip>
                  ))}
                  {tags.length === 0 && <Muted>No tags yet</Muted>}
                </TagRow>
              </TagGroup>

              <TagGroup>
                <GroupLabel>Add a tag</GroupLabel>
                <TagAddRow>
                  <div style={{ flex: '1 1 12rem', minWidth: 0 }}>
                    <TextInput
                      label="New tag"
                      value={tagDraft}
                      placeholder="e.g. Scouting"
                      size="sm"
                      onChange={(e) => setTagDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag(tagDraft);
                        }
                      }}
                    />
                  </div>
                  <Button
                    size="sm"
                    intent="secondary"
                    variant="tonal"
                    startIcon={<Plus size={ICON_SIZE} />}
                    onClick={() => addTag(tagDraft)}
                    disabled={!tagDraft.trim()}
                  >
                    Add
                  </Button>
                </TagAddRow>
              </TagGroup>

              {suggestions.length > 0 && (
                <TagGroup>
                  <GroupLabel>Suggestions</GroupLabel>
                  <TagRow aria-label="Suggested tags">
                    {suggestions.map((tag) => (
                      <Chip key={tag} size="sm" type="secondary" onClick={() => addTag(tag)}>
                        {tag}
                      </Chip>
                    ))}
                  </TagRow>
                </TagGroup>
              )}
            </TagBlock>
          </Section>

          <Section>
            <SectionHead>
              <SectionTitle>Match filters</SectionTitle>
              <SectionHint>Changes refresh charts bound to this scope.</SectionHint>
            </SectionHead>
            <MatchContextFields
              value={matchContext}
              onChange={updateMatchContext}
              awayOptional
            />
          </Section>
        </BodyStack>
      </ModalContent>
    </Modal>
  );
}
