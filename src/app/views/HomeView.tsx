import { Badge, Button } from '@cake-admin/cakeand';
import { Plus, Upload } from 'lucide-react';
import styled from 'styled-components';

import { TeamCrest } from '../../product/teams/TeamCrest';
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
  PreviewThumb,
  ScrollArea,
  Section,
  SectionHeader,
  SectionTitle,
  Strong,
  SurfaceCard,
  TitleBlock,
} from '../ui.styles';

export function HomeView() {
  const { snapshot, config, openTemplates, openWorkspace, templates, setNav } = useAppState();
  const recommended = templates.filter((t) => t.recommended).slice(0, 4);

  return (
    <ScrollArea>
      <HeroBanner>
        <TitleBlock>
          <HeroTitle>{config.productName}</HeroTitle>
          <HeroSubtitle>{config.tagline}</HeroSubtitle>
        </TitleBlock>
        <ActionRow>
          <Button size="md" startIcon={<Plus size={16} />} onClick={openTemplates}>
            New report
          </Button>
          <Button
            size="md"
            intent="secondary"
            variant="outline"
            startIcon={<Upload size={16} />}
            onClick={() => undefined}
          >
            Import data
          </Button>
        </ActionRow>
      </HeroBanner>

      <Section>
        <SectionHeader>
          <SectionTitle>Recent reports</SectionTitle>
        </SectionHeader>
        <CardGrid>
          {snapshot.reports.map((report) => (
            <SurfaceCard key={report.id}>
              <PreviewThumb>
                {report.team ? (
                  <TeamPreview>
                    <TeamCrest team={report.team} size={56} labelled />
                    <span>{report.team}</span>
                  </TeamPreview>
                ) : (
                  'Report preview placeholder'
                )}
              </PreviewThumb>
              <CardBody>
                <Strong>{report.name}</Strong>
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
                  Open
                </Button>
                <Button size="sm" intent="secondary" variant="ghost">
                  More
                </Button>
              </CardFooter>
            </SurfaceCard>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Templates</SectionTitle>
          <Button size="sm" intent="secondary" variant="ghost" onClick={openTemplates}>
            View all templates
          </Button>
        </SectionHeader>
        <CardGrid>
          {recommended.map((template) => (
            <SurfaceCard key={template.id}>
              <PreviewThumb>{template.name} preview</PreviewThumb>
              <CardBody>
                <Strong>{template.name}</Strong>
                <BodyText>{template.purpose}</BodyText>
                <Muted>
                  {template.audience} · {template.pages} pages
                </Muted>
              </CardBody>
              <CardFooter>
                <Button size="sm" onClick={openTemplates}>
                  Browse
                </Button>
              </CardFooter>
            </SurfaceCard>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Automations</SectionTitle>
          <Button
            size="sm"
            intent="secondary"
            variant="ghost"
            onClick={() => setNav('automations')}
          >
            View all
          </Button>
        </SectionHeader>
        <ListStack>
          {snapshot.automations.slice(0, 3).map((item) => (
            <SurfaceCard key={item.id} as="div">
              <AutomationTitle>
                {item.triggerKind === 'team' && item.team ? (
                  <TeamCrest team={item.team} size="sm" />
                ) : null}
                <Strong>{item.name}</Strong>
              </AutomationTitle>
              <BodyText>
                {item.triggerKind === 'any-match'
                  ? 'Every match'
                  : item.triggerKind === 'team'
                    ? `When ${item.team} plays`
                    : (item.requirements ?? 'Custom match filter')}
                {' · '}
                {item.templateName}
              </BodyText>
              <Muted>
                {item.enabled ? 'Active' : 'Paused'}
                {item.lastRun ? ` · Last run ${item.lastRun}` : ''}
              </Muted>
            </SurfaceCard>
          ))}
        </ListStack>
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

const TeamPreview = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-150);
  color: var(--color-text-icon-inverse);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
`;

const AutomationTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-150);
  min-width: 0;
`;
