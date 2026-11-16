import { Button, Checkbox, Dropdown, ProgressBar, TextInput } from '@cake-admin/cakeand';
import { ArrowLeft } from 'lucide-react';
import styled from 'styled-components';

import {
  MatchContextFields,
  isMatchContextComplete,
  type MatchContext,
} from '../../product/builder';
import { TeamCrest } from '../../product/teams/TeamCrest';
import { useAppState } from '../AppState';
import {
  ActionRow,
  BodyText,
  ListStack,
  Muted,
  PageHeader,
  PageSubtitle,
  PageTitle,
  ScrollArea,
  Section,
  SectionTitle,
  SetupGrid,
  Strong,
  SurfaceCard,
  TitleBlock,
} from '../ui.styles';
import { ICON_SIZE } from '../../iconSize';

const generationLabels = [
  'Preparing template',
  'Connecting data sources',
  'Generating report objects',
  'Creating initial AI summary',
  'Report ready',
];

export function SetupView() {
  const {
    view,
    setup,
    config,
    generationStep,
    openTemplates,
    updateSetup,
    createReportFromSetup,
  } = useAppState();

  if (view === 'generating') {
    const progress = ((generationStep + 1) / generationLabels.length) * 100;
    return (
      <ScrollArea>
        <PageHeader>
          <div>
            <PageTitle>Creating report</PageTitle>
            <PageSubtitle>{generationLabels[generationStep]}</PageSubtitle>
          </div>
        </PageHeader>
        <SurfaceCard>
          <ProgressBar
            value={progress}
            label="Creating report"
            labelValue={`${Math.round(progress)}%`}
            helperText={generationLabels[generationStep]}
            showLabelIcon={false}
            showHelperIcon={false}
          />
          <ListStack>
            {generationLabels.map((label, index) => (
              <Muted key={label}>
                {index <= generationStep ? '✓' : '·'} {label}
              </Muted>
            ))}
          </ListStack>
        </SurfaceCard>
      </ScrollArea>
    );
  }

  if (!setup) {
    return (
      <ScrollArea>
        <SurfaceCard>
          <Strong>No data selected</Strong>
          <BodyText>Choose a template to begin setup.</BodyText>
          <Button onClick={openTemplates}>Browse templates</Button>
        </SurfaceCard>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea>
      <PageHeader>
        <TitleBlock>
          <ActionRow>
            <Button
              size="sm"
              intent="secondary"
              variant="ghost"
              startIcon={<ArrowLeft size={ICON_SIZE} />}
              onClick={openTemplates}
            >
              Back to templates
            </Button>
          </ActionRow>
          <PageTitle>Configure report</PageTitle>
          <PageSubtitle>Opponent analysis setup · Women’s World Cup 2023</PageSubtitle>
        </TitleBlock>
      </PageHeader>

      <Section>
        <SectionTitle>1. Name the report</SectionTitle>
        <TextInput
          label="Report name"
          value={setup.name}
          onChange={(e) => updateSetup({ name: e.target.value })}
        />
      </Section>

      <Section>
        <SectionTitle>2. Select data</SectionTitle>
        <Muted>Select the sources to include in this report.</Muted>
        <ListStack>
          {config.dataSources.map((source) => {
            const checked = setup.sources.includes(source.id);
            return (
              <SurfaceCard key={source.id} as="div">
                <Checkbox
                  label={source.label}
                  checked={checked}
                  onCheckedChange={(next) => {
                    const on = next === true;
                    updateSetup({
                      sources: on
                        ? [...setup.sources, source.id]
                        : setup.sources.filter((id) => id !== source.id),
                    });
                  }}
                />
              </SurfaceCard>
            );
          })}
        </ListStack>
      </Section>

      <Section>
        <SectionTitle>3. Match context</SectionTitle>
        <Muted>Tournament, year, and home team are required. Away is optional.</Muted>
        <MatchContextFields
          value={setup.matchContext}
          onChange={(next: MatchContext) => updateSetup({ matchContext: next })}
          awayOptional
        />
      </Section>

      <Section>
        <SectionTitle>4. Configure the analysis</SectionTitle>
        <SetupGrid>
          <TeamField>
            <TeamCrest team={setup.team} size="lg" labelled />
            <Dropdown
              label="Team to analyze"
              value={setup.team}
              onValueChange={(value) => updateSetup({ team: value })}
              options={config.teams.map((team) => ({ label: team, value: team }))}
            />
          </TeamField>
          <Dropdown
            label="Comparison or reporting period"
            value={setup.period}
            onValueChange={(value) => updateSetup({ period: value })}
            options={config.periods.map((period) => ({ label: period, value: period }))}
          />
          <Dropdown
            label="Report audience"
            value={setup.audience}
            onValueChange={(value) => updateSetup({ audience: value })}
            options={config.audiences.map((audience) => ({ label: audience, value: audience }))}
          />
        </SetupGrid>
      </Section>

      <ActionRow>
        <Button
          size="lg"
          onClick={createReportFromSetup}
          disabled={
            !setup.name.trim() ||
            setup.sources.length === 0 ||
            !isMatchContextComplete(setup.matchContext)
          }
        >
          Create report
        </Button>
      </ActionRow>
    </ScrollArea>
  );
}

const TeamField = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--space-300);
  min-width: 0;

  & > :last-child {
    flex: 1 1 200px;
    min-width: 0;
  }
`;
