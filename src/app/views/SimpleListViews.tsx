import { Badge, Button } from '@cake-admin/cakeand';

import { useAppState } from '../AppState';
import {
  BodyText,
  CardBody,
  CardFooter,
  ListStack,
  MetaRow,
  MetaStack,
  Muted,
  PageHeader,
  PageTitle,
  ScrollArea,
  Strong,
  SurfaceCard,
  TitleBlock,
} from '../ui.styles';

export function ReportsLibraryView() {
  const { snapshot, openWorkspace, openTemplates } = useAppState();
  return (
    <ScrollArea>
      <PageHeader>
        <TitleBlock>
          <PageTitle>Reports</PageTitle>
        </TitleBlock>
        <Button onClick={openTemplates}>New report</Button>
      </PageHeader>
      <ListStack>
        {snapshot.reports.map((report) => (
          <SurfaceCard key={report.id} as="div">
            <CardBody>
              <Strong>{report.name}</Strong>
              <MetaRow>
                <Badge color="secondary" tone="subtle" dot={false}>
                  {report.templateType}
                </Badge>
                <Badge color="green" tone="subtle" dot={false}>
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
      </ListStack>
    </ScrollArea>
  );
}

export function SharedView() {
  const { snapshot, openWorkspace } = useAppState();
  const shared = snapshot.reports.filter((r) => r.sharing.toLowerCase().includes('shared'));
  return (
    <ScrollArea>
      <PageHeader>
        <TitleBlock>
          <PageTitle>Shared with me</PageTitle>
        </TitleBlock>
      </PageHeader>
      {shared.length === 0 ? (
        <SurfaceCard>
          <Strong>No shared reports</Strong>
          <BodyText>Shared demo reports will appear here.</BodyText>
        </SurfaceCard>
      ) : (
        <ListStack>
          {shared.map((report) => (
            <SurfaceCard key={report.id} as="div">
              <CardBody>
                <Strong>{report.name}</Strong>
                <Muted>
                  {report.owner} · {report.sharing}
                </Muted>
              </CardBody>
              <CardFooter>
                <Button size="sm" onClick={() => openWorkspace(report.id)}>
                  Open
                </Button>
              </CardFooter>
            </SurfaceCard>
          ))}
        </ListStack>
      )}
    </ScrollArea>
  );
}

export function ScheduledView() {
  const { snapshot, setPanel } = useAppState();
  return (
    <ScrollArea>
      <PageHeader>
        <TitleBlock>
          <PageTitle>Scheduled</PageTitle>
        </TitleBlock>
        <Button intent="secondary" variant="outline" onClick={() => setPanel('schedule')}>
          Schedule refresh
        </Button>
      </PageHeader>
      <ListStack>
        {snapshot.scheduled.map((item) => (
          <SurfaceCard key={item.id} as="div">
            <BodyText>{item.text}</BodyText>
            <Muted>{item.when}</Muted>
          </SurfaceCard>
        ))}
        {snapshot.reports
          .filter((r) => r.schedule)
          .map((report) => (
            <SurfaceCard key={report.id} as="div">
              <Strong>{report.name}</Strong>
              <Muted>
                {report.schedule?.cadence} · {report.schedule?.when}
              </Muted>
            </SurfaceCard>
          ))}
      </ListStack>
    </ScrollArea>
  );
}

export function NotificationsView() {
  const {
    snapshot,
    markNotificationRead,
    dismissNotification,
    openWorkspace,
  } = useAppState();
  return (
    <ScrollArea>
      <PageHeader>
        <TitleBlock>
          <PageTitle>Notifications</PageTitle>
        </TitleBlock>
      </PageHeader>
      <ListStack>
        {snapshot.notifications.map((item) => (
          <SurfaceCard key={item.id} as="div">
            <CardBody>
              <Strong>{item.title}</Strong>
              <BodyText>{item.detail}</BodyText>
              <Muted>{item.time}</Muted>
            </CardBody>
            <CardFooter>
              <Button
                size="sm"
                onClick={() => {
                  markNotificationRead(item.id);
                  if (item.reportId) openWorkspace(item.reportId);
                }}
              >
                Open report
              </Button>
              <Button
                size="sm"
                intent="secondary"
                variant="ghost"
                onClick={() => markNotificationRead(item.id)}
              >
                Mark as read
              </Button>
              <Button
                size="sm"
                intent="secondary"
                variant="ghost"
                onClick={() => dismissNotification(item.id)}
              >
                Dismiss
              </Button>
            </CardFooter>
          </SurfaceCard>
        ))}
      </ListStack>
    </ScrollArea>
  );
}
