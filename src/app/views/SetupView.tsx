import { Button, Checkbox, Dropdown, ProgressBar, TextInput } from '@cake-admin/cakeand';
import { ArrowLeft } from 'lucide-react';

import { useAppState } from '../AppState';
import {
  ActionRow,
  BodyText,
  DemoBadge,
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

const generationLabels = [
  'Preparing template',
  'Connecting demo data',
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
          <DemoBadge>{config.dataBadge}</DemoBadge>
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
              startIcon={<ArrowLeft size={16} />}
              onClick={openTemplates}
            >
              Back to templates
            </Button>
          </ActionRow>
          <PageTitle>Configure report</PageTitle>
          <PageSubtitle>Opponent analysis setup · simulated demo data only</PageSubtitle>
        </TitleBlock>
        <DemoBadge>{config.dataBadge}</DemoBadge>
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
        <Muted>Clearly labeled demo sources — not a live service.</Muted>
        <ListStack>
          {config.dataSources.map((source) => {
            const checked = setup.sources.includes(source.id);
            return (
              <SurfaceCard key={source.id} as="div">
                <Checkbox
                  label={`${source.label} (Demo data)`}
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
        <SectionTitle>3. Configure the analysis</SectionTitle>
        <SetupGrid>
          <Dropdown
            label="Team to analyze"
            value={setup.team}
            onValueChange={(value) => updateSetup({ team: value })}
            options={config.teams.map((team) => ({ label: team, value: team }))}
          />
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
          disabled={!setup.name.trim() || setup.sources.length === 0}
        >
          Create report
        </Button>
      </ActionRow>
    </ScrollArea>
  );
}
