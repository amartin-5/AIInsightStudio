import { useEffect, useMemo, useState } from 'react';
import { Button, Checkbox, Dropdown, IconButton, ProgressBar, TextInput } from '@cake-admin/cakeand';
import { ArrowLeft, LayoutTemplate, Sparkles, SquareDashed, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import {
  DEFAULT_MATCH_CONTEXT,
  MatchContextFields,
  isMatchContextComplete,
  type MatchContext,
} from '../../product/builder';
import { ICON_SIZE } from '../../iconSize';
import { useAppState } from '../AppState';

const SPECIAL_CUSTOM_AI = 'custom-ai';
const SPECIAL_BLANK = 'blank';

const Scrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  padding: var(--space-400);
  background: var(--color-overlay-scrim);
  backdrop-filter: blur(8px);
`;

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  width: min(56rem, 100%);
  height: min(42rem, 100%);
  border-radius: var(--radius-400);
  border: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-container-blur);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  box-shadow: var(--elevation-high);
  overflow: hidden;
  min-height: 0;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-300);
  padding: var(--space-400) var(--space-500);
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-primary);
  flex: none;
`;

const TitleBlock = styled.div`
  display: grid;
  gap: var(--space-050);
  min-width: 0;
`;

const Title = styled.h2`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-title);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
`;

const Subtitle = styled.p`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
`;

const Body = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: var(--space-500);
`;

const PickStack = styled.div`
  display: grid;
  gap: var(--space-600);
`;

const Section = styled.section`
  display: grid;
  gap: var(--space-300);
`;

const SectionLabel = styled.h3`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const StartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-400);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 11rem), 1fr));
  gap: var(--space-300);
`;

const TemplateTile = styled.button<{ $active?: boolean }>`
  box-sizing: border-box;
  display: grid;
  gap: var(--space-200);
  padding: var(--space-400);
  text-align: start;
  border: var(--stroke-150) solid
    ${(p) => (p.$active ? 'var(--color-primary-primary)' : 'var(--color-stroke-border)')};
  border-radius: var(--radius-300);
  background: ${(p) =>
    p.$active ? 'var(--color-primary-primary-overlay)' : 'var(--color-surfaces-container)'};
  box-shadow: var(--elevation-2);
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--elevation-3);
  }
`;

const TileName = styled.span`
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-bold);
`;

const TileMeta = styled.span`
  color: var(--color-text-icon-secondary);
  font-size: var(--type-size-caption);
`;

const Footer = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-300);
  padding: var(--space-400) var(--space-500);
  border-top: var(--stroke-100) solid var(--color-stroke-border);
  background: var(--color-surfaces-container-blur-high);
  flex: none;
`;

const SetupStack = styled.div`
  display: grid;
  gap: var(--space-500);
  max-width: 40rem;
`;

const generationLabels = [
  'Preparing template',
  'Connecting data sources',
  'Generating report objects',
  'Creating initial AI summary',
  'Report ready',
];

type Step = 'pick' | 'context' | 'setup';

/**
 * Centered create-report console — pick → match context → setup/generate.
 */
export function CreateReportOverlay() {
  const {
    panel,
    setPanel,
    startSetup,
    startCustomBuild,
    startBlankBuild,
    setup,
    updateSetup,
    createReportFromSetup,
    view,
    generationStep,
    config,
    recentTemplateIds,
    createPreset,
    clearCreatePreset,
    templates,
  } = useAppState();

  const [step, setStep] = useState<Step>('pick');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [matchContext, setMatchContext] = useState<MatchContext>({ ...DEFAULT_MATCH_CONTEXT });

  const open = panel === 'create-report' || view === 'generating';

  const catalogTemplates = useMemo(() => templates.filter((t) => t.id !== 'blank'), []);

  const recentTemplates = useMemo(() => {
    const byId = new Map(catalogTemplates.map((t) => [t.id, t]));
    const ordered: typeof catalogTemplates = [];
    for (const id of recentTemplateIds) {
      const hit = byId.get(id);
      if (hit) {
        ordered.push(hit);
        byId.delete(id);
      }
    }
    for (const t of catalogTemplates) {
      if (byId.has(t.id)) ordered.push(t);
    }
    return ordered;
  }, [catalogTemplates, recentTemplateIds]);

  useEffect(() => {
    if (panel !== 'create-report' || !createPreset) return;
    setSelectedId(createPreset);
    setStep('context');
    setMatchContext({ ...DEFAULT_MATCH_CONTEXT });
  }, [panel, createPreset]);

  if (!open) return null;

  const close = () => {
    setPanel(null);
    clearCreatePreset();
    setStep('pick');
    setSelectedId(null);
    setMatchContext({ ...DEFAULT_MATCH_CONTEXT });
  };

  const subtitle =
    step === 'pick'
      ? 'Start with AI, a blank canvas, or a recently used template'
      : step === 'context'
        ? 'Choose tournament, year, and home team — away is optional'
        : 'Tune sources and audience before Insight Studio builds the board';

  if (view === 'generating') {
    const progress = ((generationStep + 1) / generationLabels.length) * 100;
    return createPortal(
      <Scrim role="dialog" aria-modal="true" aria-label="Creating report">
        <Shell>
          <Header>
            <TitleBlock>
              <Title>Creating report</Title>
              <Subtitle>{generationLabels[generationStep]}</Subtitle>
            </TitleBlock>
          </Header>
          <Body>
            <SetupStack>
              <ProgressBar
                value={progress}
                label="Creating report"
                labelValue={`${Math.round(progress)}%`}
                helperText={generationLabels[generationStep]}
                showLabelIcon={false}
                showHelperIcon={false}
              />
              {generationLabels.map((label, index) => (
                <TileMeta key={label}>
                  {index <= generationStep ? '✓' : '·'} {label}
                </TileMeta>
              ))}
            </SetupStack>
          </Body>
        </Shell>
      </Scrim>,
      document.body,
    );
  }

  return createPortal(
    <Scrim role="dialog" aria-modal="true" aria-label="Create report">
      <Shell>
        <Header>
          <TitleBlock>
            <Title>Create report</Title>
            <Subtitle>{subtitle}</Subtitle>
          </TitleBlock>
          <IconButton
            label="Close"
            icon={<X size={ICON_SIZE} />}
            size="sm"
            intent="secondary"
            variant="tonal"
            onClick={close}
          />
        </Header>

        <Body>
          {step === 'pick' && (
            <PickStack>
              <Section>
                <SectionLabel>Start</SectionLabel>
                <StartGrid>
                  <TemplateTile
                    type="button"
                    $active={selectedId === SPECIAL_CUSTOM_AI}
                    onClick={() => setSelectedId(SPECIAL_CUSTOM_AI)}
                  >
                    <Sparkles size={ICON_SIZE} />
                    <TileName>Custom AI build</TileName>
                    <TileMeta>Chat-led creation with widget library</TileMeta>
                  </TemplateTile>
                  <TemplateTile
                    type="button"
                    $active={selectedId === SPECIAL_BLANK}
                    onClick={() => setSelectedId(SPECIAL_BLANK)}
                  >
                    <SquareDashed size={ICON_SIZE} />
                    <TileName>Blank template</TileName>
                    <TileMeta>Empty canvas — import widgets manually</TileMeta>
                  </TemplateTile>
                </StartGrid>
              </Section>

              <Section>
                <SectionLabel>Templates · recently used</SectionLabel>
                <TemplateGrid>
                  {recentTemplates.map((template) => (
                    <TemplateTile
                      key={template.id}
                      type="button"
                      $active={selectedId === template.id}
                      onClick={() => setSelectedId(template.id)}
                    >
                      <LayoutTemplate size={ICON_SIZE} />
                      <TileName>{template.name}</TileName>
                      <TileMeta>
                        {template.category} · {template.pages} pages
                      </TileMeta>
                    </TemplateTile>
                  ))}
                </TemplateGrid>
              </Section>
            </PickStack>
          )}

          {step === 'context' && (
            <SetupStack>
              <Section>
                <SectionLabel>Match context</SectionLabel>
                <MatchContextFields value={matchContext} onChange={setMatchContext} awayOptional />
              </Section>
            </SetupStack>
          )}

          {step === 'setup' && setup && (
            <SetupStack>
              <TextInput
                label="Report name"
                value={setup.name}
                onChange={(e) => updateSetup({ name: e.target.value })}
              />
              <div>
                <TileName>Data sources</TileName>
                <div style={{ display: 'grid', gap: 'var(--space-150)', marginTop: 'var(--space-200)' }}>
                  {config.dataSources.map((source) => (
                    <Checkbox
                      key={source.id}
                      label={source.label}
                      checked={setup.sources.includes(source.id)}
                      onCheckedChange={(checked) => {
                        const on = checked === true;
                        updateSetup({
                          sources: on
                            ? [...setup.sources, source.id]
                            : setup.sources.filter((s) => s !== source.id),
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
              <Dropdown
                label="Team"
                value={setup.team}
                onValueChange={(value) => updateSetup({ team: value })}
                options={config.teams.map((team) => ({ label: team, value: team }))}
              />
              <Dropdown
                label="Period"
                value={setup.period}
                onValueChange={(value) => updateSetup({ period: value })}
                options={config.periods.map((period) => ({ label: period, value: period }))}
              />
              <Dropdown
                label="Audience"
                value={setup.audience}
                onValueChange={(value) => updateSetup({ audience: value })}
                options={config.audiences.map((audience) => ({
                  label: audience,
                  value: audience,
                }))}
              />
            </SetupStack>
          )}
        </Body>

        <Footer>
          {step === 'pick' ? (
            <Button intent="secondary" variant="ghost" onClick={close}>
              Cancel
            </Button>
          ) : (
            <Button
              intent="secondary"
              variant="ghost"
              startIcon={<ArrowLeft size={ICON_SIZE} />}
              onClick={() => {
                if (step === 'setup') {
                  setStep('context');
                  return;
                }
                if (createPreset) {
                  close();
                  return;
                }
                setStep('pick');
              }}
            >
              Back
            </Button>
          )}
          {step === 'pick' && (
            <Button
              intent="primary"
              variant="fill"
              disabled={!selectedId}
              onClick={() => {
                if (!selectedId) return;
                setMatchContext({ ...DEFAULT_MATCH_CONTEXT });
                setStep('context');
              }}
            >
              Continue
            </Button>
          )}
          {step === 'context' && (
            <Button
              intent="primary"
              variant="fill"
              disabled={!selectedId || !isMatchContextComplete(matchContext)}
              onClick={() => {
                if (!selectedId || !isMatchContextComplete(matchContext)) return;
                if (selectedId === SPECIAL_CUSTOM_AI) {
                  clearCreatePreset();
                  startCustomBuild(matchContext);
                  return;
                }
                if (selectedId === SPECIAL_BLANK) {
                  clearCreatePreset();
                  startBlankBuild(matchContext);
                  return;
                }
                startSetup(selectedId, matchContext);
                setStep('setup');
              }}
            >
              Continue
            </Button>
          )}
          {step === 'setup' && (
            <Button
              intent="primary"
              variant="fill"
              onClick={() => {
                clearCreatePreset();
                setPanel(null);
                createReportFromSetup();
              }}
            >
              Create report
            </Button>
          )}
        </Footer>
      </Shell>
    </Scrim>,
    document.body,
  );
}
