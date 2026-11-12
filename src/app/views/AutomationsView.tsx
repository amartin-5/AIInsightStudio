import { Badge, Button, Switch } from '@cake-admin/cakeand';
import { Plus, Workflow } from 'lucide-react';
import styled from 'styled-components';

import { TeamCrest } from '../../product/teams/TeamCrest';
import type { Automation } from '../../product/types';
import { useAppState } from '../AppState';
import {
  ActionRow,
  BodyText,
  CardBody,
  CardFooter,
  ListStack,
  MetaRow,
  Muted,
  PageHeader,
  PageSubtitle,
  PageTitle,
  ScrollArea,
  Strong,
  SurfaceCard,
  TitleBlock,
} from '../ui.styles';

const EmptyState = styled.div`
  display: grid;
  gap: var(--space-300);
  justify-items: start;
  padding: var(--space-600);
  border: var(--stroke-100) dashed var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-on-container);
`;

const EmptyIcon = styled.div`
  display: grid;
  place-items: center;
  width: var(--space-800);
  height: var(--space-800);
  border-radius: var(--radius-200);
  background: var(--color-primary-primary-overlay);
  color: var(--color-primary-primary);
`;

const CardTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-300);
  min-width: 0;
`;

const TriggerLine = styled(BodyText)`
  margin: 0;
`;

export function automationTriggerLabel(automation: Automation) {
  if (automation.triggerKind === 'any-match') return 'Every match';
  if (automation.triggerKind === 'team') return `When ${automation.team} plays`;
  return automation.requirements ?? 'Custom match requirements';
}

export function AutomationsView() {
  const {
    snapshot,
    openAutomationEditor,
    toggleAutomation,
    openWorkspace,
    simulateFullTime,
    automationPending,
  } = useAppState();

  const activeCount = snapshot.automations.filter((a) => a.enabled).length;

  return (
    <ScrollArea>
      <PageHeader>
        <TitleBlock>
          <PageTitle>Automations</PageTitle>
          <PageSubtitle>
            Auto-generate reports from match data using a template — when a team
            plays, when any match finishes, or when a match meets your rules.
          </PageSubtitle>
        </TitleBlock>
        <ActionRow>
          <Button
            intent="secondary"
            variant="outline"
            disabled={automationPending}
            onClick={() =>
              simulateFullTime({
                team: 'England',
                matchLabel: 'England 2–1 Colombia',
              })
            }
          >
            {automationPending ? 'Generating…' : 'Simulate full time'}
          </Button>
          <Button startIcon={<Plus size={16} />} onClick={() => openAutomationEditor()}>
            New automation
          </Button>
        </ActionRow>
      </PageHeader>

      <MetaRow style={{ marginBottom: 'var(--space-400)' }}>
        <Muted>
          {activeCount} active · {snapshot.automations.length} total
          {' · '}
          Post-match runs wait after FT (demo delay is short)
        </Muted>
      </MetaRow>

      <ListStack>
        {snapshot.automations.length === 0 && (
          <EmptyState>
            <EmptyIcon aria-hidden>
              <Workflow size={20} />
            </EmptyIcon>
            <Strong>No automations yet</Strong>
            <BodyText>
              Create one to generate a report whenever Spain plays — or for every
              match in the tournament.
            </BodyText>
            <Button onClick={() => openAutomationEditor()}>New automation</Button>
          </EmptyState>
        )}

        {snapshot.automations.map((automation) => (
          <SurfaceCard key={automation.id} as="div">
            <CardBody>
              <CardTop>
                <div style={{ minWidth: 0, display: 'grid', gap: 'var(--space-100)' }}>
                  <ActionRow style={{ gap: 'var(--space-200)', alignItems: 'center' }}>
                    {automation.triggerKind === 'team' && automation.team ? (
                      <TeamCrest team={automation.team} size="sm" />
                    ) : null}
                    <Strong>{automation.name}</Strong>
                    <Badge
                      color={automation.enabled ? 'green' : 'disabled'}
                      tone="subtle"
                      dot={false}
                    >
                      {automation.enabled ? 'Active' : 'Paused'}
                    </Badge>
                  </ActionRow>
                  <TriggerLine>{automationTriggerLabel(automation)}</TriggerLine>
                  <Muted>
                    Template · {automation.templateName}
                    {automation.triggerEvent === 'full-time'
                      ? ` · ${automation.delayMinutes ?? 30} min after FT`
                      : ''}
                    {automation.requireReview ? ' · Requires review' : ''}
                    {' · '}
                    Notify ·{' '}
                    {automation.notify === 'both'
                      ? 'In-app & email'
                      : automation.notify === 'email'
                        ? 'Email'
                        : 'In-app'}
                  </Muted>
                  {automation.lastRun && (
                    <Muted>
                      Last run · {automation.lastRun}
                      {automation.lastMatch ? ` · ${automation.lastMatch}` : ''}
                      {' · '}
                      {automation.runsGenerated} reports generated
                    </Muted>
                  )}
                </div>
                <Switch
                  label="Enabled"
                  checked={automation.enabled}
                  onCheckedChange={(checked) =>
                    toggleAutomation(automation.id, checked)
                  }
                />
              </CardTop>
            </CardBody>
            <CardFooter>
              <Button
                size="sm"
                intent="secondary"
                variant="outline"
                onClick={() => openAutomationEditor(automation)}
              >
                Edit
              </Button>
              {automation.lastReportId && (
                <Button
                  size="sm"
                  intent="secondary"
                  variant="ghost"
                  onClick={() => openWorkspace(automation.lastReportId)}
                >
                  Open last report
                </Button>
              )}
            </CardFooter>
          </SurfaceCard>
        ))}
      </ListStack>
    </ScrollArea>
  );
}
