import { Badge, Button } from '@cake-admin/cakeand';
import { Plus, Upload } from 'lucide-react';

import { useAppState } from '../AppState';
import {
  ActionRow,
  BodyText,
  CardBody,
  CardFooter,
  CardGrid,
  DemoBadge,
  ListStack,
  MetaRow,
  MetaStack,
  Muted,
  PageHeader,
  PageSubtitle,
  PageTitle,
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
  const { snapshot, config, openTemplates, openWorkspace, templates } = useAppState();
  const recommended = templates.filter((t) => t.recommended).slice(0, 4);

  return (
    <ScrollArea>
      <PageHeader>
        <TitleBlock>
          <PageTitle>{config.productName}</PageTitle>
          <PageSubtitle>{config.tagline}</PageSubtitle>
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
          <DemoBadge>{config.dataBadge}</DemoBadge>
        </ActionRow>
      </PageHeader>

      <Section>
        <SectionHeader>
          <SectionTitle>Recent reports</SectionTitle>
        </SectionHeader>
        <CardGrid>
          {snapshot.reports.map((report) => (
            <SurfaceCard key={report.id}>
              <PreviewThumb>Report preview placeholder</PreviewThumb>
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
        <SectionTitle>Scheduled activity</SectionTitle>
        <ListStack>
          {snapshot.scheduled.map((item) => (
            <SurfaceCard key={item.id} as="div">
              <BodyText>{item.text}</BodyText>
              <Muted>{item.when}</Muted>
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
