import { Badge, Button } from '@cake-admin/cakeand';
import { Plus, Sparkles } from 'lucide-react';
import styled from 'styled-components';

import { TeamCrest } from '../../product/teams/TeamCrest';
import { teamAccent } from '../../product/teams/teamColors';
import type { ReportRecord } from '../../product/types';
import { useAppState } from '../AppState';
import {
  ActionRow,
  BodyText,
  CardBody,
  CardFooter,
  CardGrid,
  HeroBanner,
  HeroSubtitle,
  HeroTitle,
  ListStack,
  MetaRow,
  MetaStack,
  Muted,
  ScrollArea,
  Section,
  SectionHeader,
  SectionTitle,
  Strong,
  SurfaceCard,
  TitleBlock,
} from '../ui.styles';
import { ICON_SIZE } from '../../iconSize';

function insightBlurb(report: ReportRecord): string {
  for (const page of report.pages) {
    const ai = page.objects.find((object) => object.kind === 'ai-summary' && object.body);
    if (ai?.body) return ai.body;
  }
  return `${report.templateType} · ${report.period ?? 'Full competition'} · ready to explore.`;
}

function highlightMetrics(report: ReportRecord): string[] {
  const kpi = report.pages
    .flatMap((page) => page.objects)
    .find((object) => object.kind === 'kpi-row');
  if (kpi?.metricHint === 'final-match') {
    return ['Final FT', 'xG edge', 'PPDA shift'];
  }
  if (report.team === 'Spain') return ['63% poss', '18 goals', 'Champions'];
  if (report.team === 'Australia') return ['SF run', '11 goals', 'Host press'];
  if (report.id === 'knockout-summary') return ['1.4 avg xG', '53% CS', 'Late drama'];
  if (report.id === 'player-comparison') return ['Mercer 5G', 'Blake prog.', 'Quinn shield'];
  return ['7 matches', 'AI brief', 'Live charts'];
}

export function HomeView() {
  const { snapshot, config, openCreateReport, openWorkspace } = useAppState();

  return (
    <ScrollArea>
      <HeroBanner>
        <TitleBlock>
          <HeroTitle>{config.productName}</HeroTitle>
          <HeroSubtitle>{config.tagline}</HeroSubtitle>
        </TitleBlock>
        <ActionRow>
          <Button
            size="md"
            intent="secondary"
            variant="outline"
            startIcon={<Sparkles size={ICON_SIZE} />}
            onClick={() => openCreateReport('custom-ai')}
          >
            Custom AI build
          </Button>
          <Button size="md" startIcon={<Plus size={ICON_SIZE} />} onClick={() => openCreateReport()}>
            New report
          </Button>
        </ActionRow>
      </HeroBanner>

      <Section>
        <SectionHeader>
          <SectionTitle>Recent reports</SectionTitle>
        </SectionHeader>
        <CardGrid>
          {snapshot.reports.map((report) => {
            const accent = teamAccent(report.team).primary;
            const metrics = highlightMetrics(report);
            return (
              <SurfaceCard key={report.id}>
                <ReportPreview style={{ borderBottom: `3px solid ${accent}` }}>
                  {report.team ? (
                    <TeamPreview>
                      <TeamCrest team={report.team} size={48} labelled />
                      <PreviewTeam>{report.team}</PreviewTeam>
                    </TeamPreview>
                  ) : (
                    <PreviewTeam>Tournament lens</PreviewTeam>
                  )}
                  <PreviewMetrics>
                    {metrics.map((metric) => (
                      <MetricChip key={metric}>{metric}</MetricChip>
                    ))}
                  </PreviewMetrics>
                </ReportPreview>
                <CardBody>
                  <Strong>{report.name}</Strong>
                  <InsightPreview>{insightBlurb(report)}</InsightPreview>
                  <MetaRow>
                    <Badge color="secondary" tone="subtle" dot={false}>
                      {report.templateType}
                    </Badge>
                    <Badge
                      color={
                        report.status === 'Needs review'
                          ? 'amber'
                          : report.status === 'Draft'
                            ? 'disabled'
                            : 'green'
                      }
                      tone="subtle"
                      dot={false}
                    >
                      {report.status}
                    </Badge>
                  </MetaRow>
                  <MetaStack>
                    <Muted>Updated {report.lastUpdated}</Muted>
                    <Muted>
                      {report.owner} · {report.sharing}
                    </Muted>
                  </MetaStack>
                </CardBody>
                <CardFooter>
                  <Button size="sm" onClick={() => openWorkspace(report.id)}>
                    Open insights
                  </Button>
                </CardFooter>
              </SurfaceCard>
            );
          })}
        </CardGrid>
      </Section>

      <Section>
        <SectionTitle>Recent activity</SectionTitle>
        <ListStack>
          {snapshot.activities.map((item) => (
            <SurfaceCard key={item.id} as="div">
              <BodyText>{item.text}</BodyText>
              <Muted>{item.time}</Muted>
            </SurfaceCard>
          ))}
        </ListStack>
      </Section>
    </ScrollArea>
  );
}

const ReportPreview = styled.div`
  display: grid;
  gap: var(--space-300);
  padding: var(--space-400);
  min-height: 140px;
  border-radius: var(--radius-200) var(--radius-200) 0 0;
  background:
    linear-gradient(
      155deg,
      var(--color-surfaces-primary) 0%,
      var(--color-surfaces-on-container-high) 55%,
      var(--color-surfaces-container) 100%
    );
`;

const TeamPreview = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--space-200);
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
`;

const PreviewTeam = styled.span`
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-bold);
`;

const PreviewMetrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-100);
`;

const MetricChip = styled.span`
  display: inline-flex;
  padding: var(--space-050) var(--space-150);
  border-radius: var(--radius-1000);
  background: var(--color-surfaces-container);
  border: var(--stroke-100) solid var(--color-stroke-border);
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
`;

const InsightPreview = styled.p`
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.45;
`;
