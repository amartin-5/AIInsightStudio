import { Badge, Button } from '@cake-admin/cakeand';
import { Plus, Sparkles } from 'lucide-react';
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
import { ICON_SIZE } from '../../iconSize';

export function HomeView() {
  const { snapshot, config, openTemplates, openWorkspace, startCustomBuild } = useAppState();

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
            onClick={startCustomBuild}
          >
            Custom AI build
          </Button>
          <Button size="md" startIcon={<Plus size={ICON_SIZE} />} onClick={openTemplates}>
            New report
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
              </CardFooter>
            </SurfaceCard>
          ))}
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
