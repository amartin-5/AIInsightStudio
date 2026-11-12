import { useEffect, useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Checkbox,
  Dropdown,
  IconButton,
  Radio,
  RadioGroup,
  TextInput,
} from '@cake-admin/cakeand';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Filter,
  Users,
  Workflow,
  X,
} from 'lucide-react';
import styled from 'styled-components';

import { TeamCrest } from '../../product/teams/TeamCrest';
import { useAppState } from '../AppState';
import {
  ActionRow,
  BodyText,
  Muted,
  Strong,
} from '../ui.styles';

type StepId = 'trigger' | 'template' | 'finish';

const STEPS: { id: StepId; label: string }[] = [
  { id: 'trigger', label: 'Trigger' },
  { id: 'template', label: 'Template' },
  { id: 'finish', label: 'Finish' },
];

const TRIGGER_OPTIONS = [
  {
    kind: 'any-match' as const,
    title: 'Every match',
    detail: 'Generate a report whenever any match finishes and new data arrives.',
    icon: CalendarDays,
  },
  {
    kind: 'team' as const,
    title: 'When a team plays',
    detail: 'Follow one team — for example, create a report every time Spain plays.',
    icon: Users,
  },
  {
    kind: 'requirements' as const,
    title: 'Match requirements',
    detail: 'Describe a filter in plain language, like knockout-stage matches only.',
    icon: Filter,
  },
];

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  z-index: 8;
  display: grid;
  place-items: stretch;
  padding: var(--space-400);
  background: var(--color-overlay-scrim);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

const Stage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
  width: 100%;
  height: 100%;
  border-radius: var(--radius-400);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-5);
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-400);
  padding: var(--space-500) var(--space-600);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  flex: none;
`;

const HeaderCopy = styled.div`
  display: grid;
  gap: var(--space-100);
  min-width: 0;
  flex: 1 1 280px;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--space-100);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-page);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.4px;
  line-height: 1.3;
`;

const Subtitle = styled.p`
  margin: 0;
  max-width: 54ch;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.45;
`;

const StepRail = styled.ol`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-150);
  margin: 0;
  padding: 0;
  list-style: none;
  flex: none;
`;

const StepPill = styled.li<{ $state: 'done' | 'current' | 'todo' }>`
  display: inline-flex;
  align-items: center;
  gap: var(--space-100);
  padding: var(--space-100) var(--space-250);
  border-radius: var(--radius-1000);
  border: var(--stroke-100) solid
    ${(p) =>
      p.$state === 'current'
        ? 'var(--color-primary-primary)'
        : 'var(--color-stroke-border)'};
  background: ${(p) =>
    p.$state === 'current'
      ? 'var(--color-primary-primary-overlay)'
      : p.$state === 'done'
        ? 'var(--color-surfaces-on-container)'
        : 'transparent'};
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
  line-height: 1.3;
`;

const StepIndex = styled.span<{ $state: 'done' | 'current' | 'todo' }>`
  display: grid;
  place-items: center;
  width: var(--space-400);
  height: var(--space-400);
  border-radius: var(--radius-1000);
  background: ${(p) =>
    p.$state === 'current'
      ? 'var(--color-primary-primary)'
      : 'var(--color-surfaces-on-container-high)'};
  color: ${(p) =>
    p.$state === 'current'
      ? 'var(--color-text-icon-on-primary)'
      : 'var(--color-text-icon-secondary)'};
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
`;

const Body = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: var(--space-600);
  display: grid;
  gap: var(--space-600);
  align-content: start;
`;

const Section = styled.section`
  display: grid;
  gap: var(--space-400);
  min-width: 0;
`;

const SectionIntro = styled.div`
  display: grid;
  gap: var(--space-100);
  min-width: 0;
`;

const TriggerRadioGroup = styled(RadioGroup)`
  display: grid;
  gap: var(--space-400);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
`;

const TriggerOption = styled.div<{ $selected?: boolean }>`
  display: grid;
  gap: var(--space-250);
  justify-items: start;
  text-align: left;
  min-width: 0;
  padding: var(--space-400);
  border-radius: var(--radius-300);
  border: var(--stroke-150) solid
    ${(p) =>
      p.$selected ? 'var(--color-primary-primary)' : 'var(--color-stroke-border)'};
  background: ${(p) =>
    p.$selected
      ? 'var(--color-primary-primary-overlay)'
      : 'var(--color-surfaces-on-container)'};

  & [role='radio'] {
    flex: 0 0 auto;
    width: var(--space-500);
    height: var(--space-500);
    min-width: var(--space-500);
    min-height: var(--space-500);
  }

  & [role='radio'] > span {
    flex: 0 0 auto;
    width: var(--space-300);
    height: var(--space-300);
    min-width: var(--space-300);
    min-height: var(--space-300);
    aspect-ratio: 1;
    border-radius: var(--radius-1000);
  }
`;

const TriggerCopy = styled.div`
  display: grid;
  gap: var(--space-100);
  min-width: 0;
`;

const ChoiceIcon = styled.div<{ $selected?: boolean }>`
  display: grid;
  place-items: center;
  width: var(--space-700);
  height: var(--space-700);
  border-radius: var(--radius-200);
  background: ${(p) =>
    p.$selected
      ? 'var(--color-primary-primary)'
      : 'var(--color-surfaces-on-container-high)'};
  color: ${(p) =>
    p.$selected
      ? 'var(--color-text-icon-on-primary)'
      : 'var(--color-text-icon-secondary)'};
`;

const TeamGrid = styled.div`
  display: grid;
  gap: var(--space-250);
  min-width: 0;

  /* RadioGroup root is the only child; lay options out in a responsive grid. */
  & > [role='radiogroup'] {
    display: grid;
    gap: var(--space-250);
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
`;

const TeamRadioRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  min-width: 0;
  padding: var(--space-200) var(--space-250);
  border-radius: var(--radius-200);
  border: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-on-container);

  /* Keep HelloPC radio rings circular — label text wrap must not squash the control. */
  & [role='radio'] {
    flex: 0 0 auto;
    width: var(--space-500);
    height: var(--space-500);
    min-width: var(--space-500);
    min-height: var(--space-500);
  }

  & [role='radio'] > span {
    flex: 0 0 auto;
    width: var(--space-300);
    height: var(--space-300);
    min-width: var(--space-300);
    min-height: var(--space-300);
    aspect-ratio: 1;
    border-radius: var(--radius-1000);
  }
`;

const TemplateGrid = styled.div`
  display: grid;
  gap: var(--space-400);
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
`;

const TemplateCard = styled.button<{ $selected?: boolean }>`
  appearance: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  min-width: 0;
  height: 100%;
  padding: var(--space-400);
  border-radius: var(--radius-300);
  border: var(--stroke-150) solid
    ${(p) =>
      p.$selected ? 'var(--color-primary-primary)' : 'var(--color-stroke-border)'};
  background: ${(p) =>
    p.$selected
      ? 'var(--color-primary-primary-overlay)'
      : 'var(--color-surfaces-on-container)'};
  color: inherit;
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 var(--stroke-150) var(--color-primary-primary);
  }
`;

const TemplateMedia = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  min-height: 96px;
  padding: var(--space-300);
  border-radius: var(--radius-200);
  background:
    linear-gradient(146deg, rgb(4, 27, 149) 2.5%, rgb(83, 103, 246) 55%, rgb(89, 177, 255) 100%);
  color: var(--color-text-icon-inverse);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
`;

const FinishLayout = styled.div`
  display: grid;
  gap: var(--space-500);
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FormStack = styled.div`
  display: grid;
  gap: var(--space-400);
  min-width: 0;
`;

const PreviewCard = styled.aside`
  display: grid;
  gap: var(--space-300);
  padding: var(--space-500);
  border-radius: var(--radius-300);
  border: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-on-container);
  min-width: 0;
`;

const PreviewTitle = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  color: var(--color-primary-primary);
`;

const Footer = styled.footer`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-300);
  padding: var(--space-400) var(--space-600);
  border-top: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-container-blur-high);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  flex: none;
`;

function stepState(index: number, current: number): 'done' | 'current' | 'todo' {
  if (index < current) return 'done';
  if (index === current) return 'current';
  return 'todo';
}

export function AutomationComposer() {
  const {
    automationDraft,
    updateAutomationDraft,
    saveAutomation,
    deleteAutomation,
    closeAutomationEditor,
    config,
    templates,
  } = useAppState();

  const [step, setStep] = useState<StepId>('trigger');

  useEffect(() => {
    setStep('trigger');
  }, [automationDraft?.id]);

  const stepIndex = STEPS.findIndex((s) => s.id === step);
  const isEdit = Boolean(automationDraft?.id);
  const selectedTemplate = useMemo(
    () => templates.find((t) => t.id === automationDraft?.templateId),
    [templates, automationDraft?.templateId],
  );

  if (!automationDraft) return null;

  const triggerSummary =
    automationDraft.triggerKind === 'any-match'
      ? 'Every match'
      : automationDraft.triggerKind === 'team'
        ? `When ${automationDraft.team} plays`
        : automationDraft.requirements.trim() || 'Custom match requirements';

  const canContinue =
    step === 'trigger'
      ? automationDraft.triggerKind !== 'requirements' ||
        automationDraft.requirements.trim().length > 0
      : step === 'template'
        ? Boolean(automationDraft.templateId)
        : true;

  const goNext = () => {
    if (step === 'trigger') setStep('template');
    else if (step === 'template') setStep('finish');
  };

  const goBack = () => {
    if (step === 'finish') setStep('template');
    else if (step === 'template') setStep('trigger');
    else closeAutomationEditor();
  };

  return (
    <Scrim role="presentation" onClick={closeAutomationEditor}>
      <Stage
        role="dialog"
        aria-modal="true"
        aria-labelledby="automation-composer-title"
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <HeaderCopy>
            <Eyebrow>
              <Workflow size={14} aria-hidden />
              {isEdit ? 'Edit automation' : 'New automation'}
            </Eyebrow>
            <Title id="automation-composer-title">
              {step === 'trigger' && 'When should a report be generated?'}
              {step === 'template' && 'Which template should it use?'}
              {step === 'finish' && 'Name it and set delivery'}
            </Title>
            <Subtitle>
              {step === 'trigger' &&
                'Pick a match event that starts report generation — every match, a team you follow, or a custom rule.'}
              {step === 'template' &&
                'Choose a library template, or blank if you want to shape the report later.'}
              {step === 'finish' &&
                'Confirm the name, notifications, and whether new reports need review before sharing.'}
            </Subtitle>
          </HeaderCopy>
          <ActionRow style={{ alignItems: 'flex-start' }}>
            <StepRail aria-label="Automation setup steps">
              {STEPS.map((item, index) => {
                const state = stepState(index, stepIndex);
                return (
                  <StepPill key={item.id} $state={state}>
                    <StepIndex $state={state}>{index + 1}</StepIndex>
                    {item.label}
                  </StepPill>
                );
              })}
            </StepRail>
            <IconButton
              label="Close"
              icon={<X />}
              size="sm"
              intent="secondary"
              variant="ghost"
              onClick={closeAutomationEditor}
            />
          </ActionRow>
        </Header>

        <Body>
          {step === 'trigger' && (
            <Section>
              <SectionIntro>
                <Strong>Trigger</Strong>
                <Muted>Insight Studio watches match data and runs this automation when the rule matches.</Muted>
              </SectionIntro>
              <TriggerRadioGroup
                value={automationDraft.triggerKind}
                onValueChange={(kind) =>
                  updateAutomationDraft({
                    triggerKind: kind as typeof automationDraft.triggerKind,
                  })
                }
                aria-label="Automation trigger"
              >
                {TRIGGER_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const selected = automationDraft.triggerKind === option.kind;
                  return (
                    <TriggerOption key={option.kind} $selected={selected}>
                      <ChoiceIcon $selected={selected}>
                        <Icon size={20} aria-hidden />
                      </ChoiceIcon>
                      <TriggerCopy>
                        <Radio value={option.kind} label={option.title} />
                        <Muted>{option.detail}</Muted>
                      </TriggerCopy>
                    </TriggerOption>
                  );
                })}
              </TriggerRadioGroup>

              {automationDraft.triggerKind === 'team' && (
                <Section>
                  <SectionIntro>
                    <Strong>Team to follow</Strong>
                    <Muted>A report generates whenever this team appears in a match.</Muted>
                  </SectionIntro>
                  <TeamGrid>
                    <RadioGroup
                      value={automationDraft.team}
                      onValueChange={(team) => updateAutomationDraft({ team })}
                      aria-label="Team to follow"
                    >
                      {config.teams.map((team) => (
                        <TeamRadioRow key={team}>
                          <TeamCrest team={team} size="sm" />
                          <Radio value={team} label={team} />
                        </TeamRadioRow>
                      ))}
                    </RadioGroup>
                  </TeamGrid>
                </Section>
              )}

              {automationDraft.triggerKind === 'requirements' && (
                <TextInput
                  label="Match requirements"
                  placeholder="Knockout stage matches only"
                  value={automationDraft.requirements}
                  onChange={(e) => updateAutomationDraft({ requirements: e.target.value })}
                  helperText="Describe the filter in plain language."
                />
              )}
            </Section>
          )}

          {step === 'template' && (
            <Section>
              <SectionIntro>
                <Strong>Report template</Strong>
                <Muted>Each run creates a new report from this template using the matched match data.</Muted>
              </SectionIntro>
              <TemplateGrid>
                {templates.map((template) => {
                  const selected = automationDraft.templateId === template.id;
                  return (
                    <TemplateCard
                      key={template.id}
                      type="button"
                      $selected={selected}
                      aria-pressed={selected}
                      onClick={() => updateAutomationDraft({ templateId: template.id })}
                    >
                      <TemplateMedia>
                        {template.recommended ? 'Recommended' : template.category}
                      </TemplateMedia>
                      <ActionRow style={{ gap: 'var(--space-150)', alignItems: 'center' }}>
                        <Strong>{template.name}</Strong>
                        {template.recommended && (
                          <Badge color="indigo" tone="subtle" dot={false}>
                            Recommended
                          </Badge>
                        )}
                      </ActionRow>
                      <BodyText>{template.purpose}</BodyText>
                      <Muted>
                        {template.audience} · {template.pages} pages
                      </Muted>
                    </TemplateCard>
                  );
                })}
              </TemplateGrid>
            </Section>
          )}

          {step === 'finish' && (
            <FinishLayout>
              <FormStack>
                <TextInput
                  label="Automation name"
                  placeholder="Spain match reports"
                  value={automationDraft.name}
                  onChange={(e) => updateAutomationDraft({ name: e.target.value })}
                  helperText="Leave blank to auto-name from the trigger and template."
                />
                <Dropdown
                  label="Notification"
                  value={automationDraft.notify}
                  onValueChange={(v) =>
                    updateAutomationDraft({
                      notify: v as typeof automationDraft.notify,
                    })
                  }
                  options={[
                    { label: 'In-app notification', value: 'in-app' },
                    { label: 'Email', value: 'email' },
                    { label: 'Both', value: 'both' },
                  ]}
                />
                <Dropdown
                  label="Delay after full time"
                  value={String(automationDraft.delayMinutes)}
                  onValueChange={(v) =>
                    updateAutomationDraft({ delayMinutes: Number(v) || 30 })
                  }
                  options={[
                    { label: 'Immediately (demo)', value: '0' },
                    { label: '5 minutes', value: '5' },
                    { label: '15 minutes', value: '15' },
                    { label: '30 minutes', value: '30' },
                    { label: '60 minutes', value: '60' },
                  ]}
                  helperText="Product default is 30 minutes after full time."
                />
                <Checkbox
                  label="Require review before sharing"
                  checked={automationDraft.requireReview}
                  onCheckedChange={(checked) =>
                    updateAutomationDraft({ requireReview: checked === true })
                  }
                />
                <Checkbox
                  label="Enable automation now"
                  checked={automationDraft.enabled}
                  onCheckedChange={(checked) =>
                    updateAutomationDraft({ enabled: checked === true })
                  }
                />
                {isEdit && (
                  <Button
                    intent="secondary"
                    variant="ghost"
                    onClick={() => deleteAutomation(automationDraft.id!)}
                  >
                    Delete automation
                  </Button>
                )}
              </FormStack>

              <PreviewCard aria-label="Automation summary">
                <PreviewTitle>
                  <Workflow size={18} aria-hidden />
                  <Strong>Ready to run</Strong>
                </PreviewTitle>
                <BodyText>
                  When <strong>{triggerSummary.toLowerCase()}</strong>, Insight Studio will
                  generate a report using{' '}
                  <strong>{selectedTemplate?.name ?? 'the selected template'}</strong>.
                </BodyText>
                <Muted>
                  After full time · wait {automationDraft.delayMinutes} min · Notify ·{' '}
                  {automationDraft.notify === 'both'
                    ? 'In-app & email'
                    : automationDraft.notify === 'email'
                      ? 'Email'
                      : 'In-app'}
                  {automationDraft.requireReview ? ' · Requires review' : ''}
                  {automationDraft.enabled ? ' · Starts active' : ' · Starts paused'}
                </Muted>
                {automationDraft.triggerKind === 'team' && (
                  <ActionRow style={{ alignItems: 'center', gap: 'var(--space-200)' }}>
                    <TeamCrest team={automationDraft.team} size="md" labelled />
                    <Muted>Following {automationDraft.team}</Muted>
                  </ActionRow>
                )}
              </PreviewCard>
            </FinishLayout>
          )}
        </Body>

        <Footer>
          <Button
            intent="secondary"
            variant="ghost"
            startIcon={<ArrowLeft size={16} />}
            onClick={goBack}
          >
            {step === 'trigger' ? 'Cancel' : 'Back'}
          </Button>
          <ActionRow>
            {step !== 'finish' ? (
              <Button
                endIcon={<ArrowRight size={16} />}
                disabled={!canContinue}
                onClick={goNext}
              >
                Continue
              </Button>
            ) : (
              <Button onClick={saveAutomation}>
                {isEdit ? 'Save automation' : 'Create automation'}
              </Button>
            )}
          </ActionRow>
        </Footer>
      </Stage>
    </Scrim>
  );
}
