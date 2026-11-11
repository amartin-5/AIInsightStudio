import { useState } from 'react';
import {
  Button,
  Checkbox,
  Dropdown,
  IconButton,
  Modal,
  ModalContent,
  ModalFooter,
  Notification,
  NotificationPanel,
  Switch,
  TextInput,
} from '@cake-admin/cakeand';
import { X } from 'lucide-react';

import type { RefreshSchedule } from '../../product/types';
import { useAppState } from '../AppState';
import {
  ActionRow,
  BodyText,
  DrawerBody,
  DrawerHeader,
  ListStack,
  Muted,
  SideDrawer,
  Strong,
  SurfaceCard,
  ToastBar,
} from '../ui.styles';

export function OverlayHost() {
  const {
    panel,
    setPanel,
    toast,
    setToast,
    activeReport,
    pinPayload,
    pinToPage,
    runRefresh,
    saveSchedule,
    shareReport,
    exportReport,
    snapshot,
    markNotificationRead,
    dismissNotification,
    openWorkspace,
    addObjectToPage,
    insertAiCreatedObject,
    resetDemo,
  } = useAppState();

  const [preserveNotes, setPreserveNotes] = useState(true);
  const [generateSummary, setGenerateSummary] = useState(true);
  const [notifyComplete, setNotifyComplete] = useState(true);
  const [scheduleCadence, setScheduleCadence] = useState('Weekly');
  const [scheduleWhen, setScheduleWhen] = useState('Every Monday at 8:00 AM');
  const [scheduleNotify, setScheduleNotify] = useState<'in-app' | 'email' | 'both'>('both');
  const [requireReview, setRequireReview] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  return (
    <>
      {panel === 'notifications' && (
        <SideDrawer aria-label="Notifications">
          <NotificationPanel
            title="Notifications"
            onClose={() => setPanel(null)}
            style={{ height: '100%', borderRadius: 0, boxShadow: 'none' }}
          >
            {snapshot.notifications.map((item) => (
              <Notification
                key={item.id}
                flush
                status={item.tone === 'info' ? 'info' : item.tone}
                title={item.title}
                description={item.detail}
                timestamp={item.time}
                unread={!item.read}
                primaryActionLabel="Open report"
                onPrimaryAction={() => {
                  markNotificationRead(item.id);
                  if (item.reportId) openWorkspace(item.reportId);
                  setPanel(null);
                }}
                secondaryActionLabel="Mark as read"
                onSecondaryAction={() => markNotificationRead(item.id)}
                onDismiss={() => dismissNotification(item.id)}
              />
            ))}
          </NotificationPanel>
        </SideDrawer>
      )}

      {panel === 'share' && (
        <SideDrawer aria-label="Share report">
          <DrawerHeader>
            <Strong>Share report</Strong>
            <IconButton label="Close" icon={<X />} size="xs" intent="secondary" variant="ghost" onClick={() => setPanel(null)} />
          </DrawerHeader>
          <DrawerBody>
            <BodyText>People with access</BodyText>
            <ListStack>
              <Muted>You · Owner</Muted>
              <Muted>A. Patel · Can edit</Muted>
              <Muted>J. Kim · Can comment</Muted>
              <Muted>Demo org viewers · Can view</Muted>
            </ListStack>
            <TextInput label="Invite people" placeholder="name@example.com" />
            <Dropdown
              label="Permission"
              defaultValue="view"
              options={[
                { label: 'View', value: 'view' },
                { label: 'Comment', value: 'comment' },
                { label: 'Edit', value: 'edit' },
              ]}
            />
            <TextInput
              label="Optional message"
              value={shareMessage}
              onChange={(e) => setShareMessage(e.target.value)}
            />
            <Checkbox label="Notify recipients" defaultChecked />
            <Strong>Link sharing</Strong>
            <Dropdown
              label="Who can open the link"
              defaultValue="org"
              options={[
                { label: 'Restricted', value: 'restricted' },
                { label: 'Anyone in the demo organization with the link', value: 'org' },
                { label: 'Specific people', value: 'people' },
              ]}
            />
            <Checkbox label="Require sign-in" defaultChecked />
            <Checkbox label="Allow download" defaultChecked />
            <Checkbox label="Allow duplicate" />
            <Checkbox label="Require review before publishing" />
            <ActionRow>
              <Button onClick={shareReport}>Share report</Button>
              <Button intent="secondary" variant="outline" onClick={() => setToast({ message: 'Link copied (simulated)' })}>
                Copy link
              </Button>
            </ActionRow>
          </DrawerBody>
        </SideDrawer>
      )}

      {panel === 'export' && (
        <SideDrawer aria-label="Export report">
          <DrawerHeader>
            <Strong>Export</Strong>
            <IconButton label="Close" icon={<X />} size="xs" intent="secondary" variant="ghost" onClick={() => setPanel(null)} />
          </DrawerHeader>
          <DrawerBody>
            <ListStack>
              {['PDF', 'PowerPoint', 'Image', 'CSV for selected data', 'Copy to another Space', 'Presentation mode'].map(
                (item) => (
                  <Button key={item} intent="secondary" variant="outline" onClick={exportReport}>
                    {item}
                  </Button>
                ),
              )}
            </ListStack>
            <Dropdown
              label="Scope"
              defaultValue="entire"
              options={[
                { label: 'Entire report', value: 'entire' },
                { label: 'Selected pages', value: 'pages' },
              ]}
            />
            <Checkbox label="Include sources" defaultChecked />
            <Checkbox label="Include analyst notes" defaultChecked />
            <Checkbox label="Include AI-generated labels" defaultChecked />
            <Checkbox label="Use most recent refreshed version" defaultChecked />
            <Button onClick={exportReport}>Start export</Button>
          </DrawerBody>
        </SideDrawer>
      )}

      {panel === 'refresh' && (
        <SideDrawer aria-label="Refresh report">
          <DrawerHeader>
            <Strong>Refresh report</Strong>
            <IconButton label="Close" icon={<X />} size="xs" intent="secondary" variant="ghost" onClick={() => setPanel(null)} />
          </DrawerHeader>
          <DrawerBody>
            <BodyText>Data sources to use</BodyText>
            {(activeReport?.demoSources ?? []).map((source) => (
              <Checkbox key={source} label={source} defaultChecked />
            ))}
            <BodyText>Pages to refresh</BodyText>
            {(activeReport?.pages ?? []).map((page) => (
              <Checkbox key={page.id} label={page.name} defaultChecked />
            ))}
            <Switch
              label="Preserve analyst notes"
              checked={preserveNotes}
              onCheckedChange={setPreserveNotes}
            />
            <Switch
              label="Generate change summary"
              checked={generateSummary}
              onCheckedChange={setGenerateSummary}
            />
            <Switch
              label="Notify when complete"
              checked={notifyComplete}
              onCheckedChange={setNotifyComplete}
            />
            <Button
              onClick={() =>
                runRefresh({
                  preserveNotes,
                  generateSummary,
                  notify: notifyComplete,
                })
              }
            >
              Refresh
            </Button>
            <Button intent="secondary" variant="ghost" onClick={() => setPanel('schedule')}>
              Schedule refresh
            </Button>
          </DrawerBody>
        </SideDrawer>
      )}

      {panel === 'schedule' && (
        <SideDrawer aria-label="Schedule refresh">
          <DrawerHeader>
            <Strong>Schedule refresh</Strong>
            <IconButton label="Close" icon={<X />} size="xs" intent="secondary" variant="ghost" onClick={() => setPanel(null)} />
          </DrawerHeader>
          <DrawerBody>
            <Dropdown
              label="When to refresh"
              value={scheduleCadence}
              onValueChange={setScheduleCadence}
              options={[
                { label: 'Manually', value: 'Manually' },
                { label: 'On a schedule', value: 'Weekly' },
                { label: 'When new data is available', value: 'When new data is available' },
                { label: 'After a selected event', value: 'After event' },
              ]}
            />
            <TextInput
              label="Schedule detail"
              value={scheduleWhen}
              onChange={(e) => setScheduleWhen(e.target.value)}
            />
            <TextInput
              label="AI action after refresh"
              defaultValue="Summarize significant changes and update the executive summary."
            />
            <Dropdown
              label="Notification"
              value={scheduleNotify}
              onValueChange={(v) => setScheduleNotify(v as 'in-app' | 'email' | 'both')}
              options={[
                { label: 'In-app notification', value: 'in-app' },
                { label: 'Email', value: 'email' },
                { label: 'Both', value: 'both' },
              ]}
            />
            <TextInput label="Recipients" placeholder="demo.user@example.com" />
            <Switch
              label="Require review before sending"
              checked={requireReview}
              onCheckedChange={setRequireReview}
            />
            <Button
              onClick={() => {
                const schedule: RefreshSchedule = {
                  id: `sch-${Date.now()}`,
                  cadence: scheduleCadence,
                  when: scheduleWhen,
                  aiPrompt: 'Summarize significant changes and update the executive summary.',
                  notify: scheduleNotify,
                  requireReview,
                };
                saveSchedule(schedule);
              }}
            >
              Create schedule
            </Button>
          </DrawerBody>
        </SideDrawer>
      )}

      {panel === 'changes' && (
        <SideDrawer aria-label="What changed">
          <DrawerHeader>
            <Strong>Report updated</Strong>
            <IconButton label="Close" icon={<X />} size="xs" intent="secondary" variant="ghost" onClick={() => setPanel(null)} />
          </DrawerHeader>
          <DrawerBody>
            <BodyText>12 objects refreshed · 3 significant changes found · 2 analyst notes preserved · 1 object requires review</BodyText>
            <SurfaceCard>
              <Strong>Attacking efficiency</Strong>
              <Muted>Before: England generated consistent shot volume across the selected matches.</Muted>
              <Muted>After: Shot volume remained stable, but chance quality declined during the knockout stage.</Muted>
              <ActionRow>
                <Button size="sm">Accept</Button>
                <Button size="sm" intent="secondary" variant="ghost">
                  Keep previous
                </Button>
                <Button size="sm" intent="secondary" variant="ghost">
                  Ask AI
                </Button>
                <Button size="sm" intent="secondary" variant="ghost">
                  View source
                </Button>
              </ActionRow>
            </SurfaceCard>
            <ActionRow>
              <Button onClick={() => setPanel(null)}>Review changes</Button>
              <Button intent="secondary" variant="ghost" onClick={() => setPanel(null)}>
                Dismiss
              </Button>
            </ActionRow>
          </DrawerBody>
        </SideDrawer>
      )}

      {panel === 'pin' && pinPayload && (
        <SideDrawer aria-label="Pin to report">
          <DrawerHeader>
            <Strong>Pin to</Strong>
            <IconButton label="Close" icon={<X />} size="xs" intent="secondary" variant="ghost" onClick={() => setPanel(null)} />
          </DrawerHeader>
          <DrawerBody>
            {(activeReport?.pages ?? []).map((page) => (
              <Button key={page.id} intent="secondary" variant="outline" onClick={() => pinToPage(page.id)}>
                {page.name}
              </Button>
            ))}
            <Button intent="secondary" variant="ghost" onClick={() => pinToPage('exec')}>
              New page
            </Button>
          </DrawerBody>
        </SideDrawer>
      )}

      {panel === 'add-object' && (
        <SideDrawer aria-label="Add object">
          <DrawerHeader>
            <Strong>Add object</Strong>
            <IconButton label="Close" icon={<X />} size="xs" intent="secondary" variant="ghost" onClick={() => setPanel(null)} />
          </DrawerHeader>
          <DrawerBody>
            <Button
              onClick={() => {
                setPanel(null);
                insertAiCreatedObject(
                  'Create a comparison of England’s group-stage and knockout-stage attacking performance.',
                );
              }}
            >
              Ask AI to create
            </Button>
            {[
              ['Text', 'text'],
              ['AI summary', 'ai-summary'],
              ['Metric', 'metric'],
              ['Chart', 'chart'],
              ['Table', 'table'],
              ['Comparison', 'comparison'],
              ['Timeline', 'timeline'],
              ['Analyst note', 'analyst-note'],
              ['Source', 'source-list'],
              ['Upload', 'image'],
            ].map(([label, kind]) => (
              <Button
                key={label}
                intent="secondary"
                variant="outline"
                onClick={() =>
                  addObjectToPage({
                    id: `obj-${Date.now()}`,
                    kind: kind as never,
                    title: label,
                    body: kind === 'metric' ? undefined : `New ${label.toLowerCase()} object (demo).`,
                    metricValue: kind === 'metric' ? '0' : undefined,
                    placeholderLabel:
                      kind === 'chart' || kind === 'timeline' || kind === 'image'
                        ? `${label} placeholder — approved visualization asset not installed.`
                        : undefined,
                    preserveOnRefresh: kind === 'analyst-note',
                  })
                }
              >
                {label}
              </Button>
            ))}
          </DrawerBody>
        </SideDrawer>
      )}

      <Modal
        open={panel === 'reset'}
        onOpenChange={(open) => !open && setPanel(null)}
        title="Reset demo"
        subtitle="Restore the initial reports, templates, chat, notifications, schedules, and layout."
        footer={
          <ModalFooter
            primaryActionLabel="Reset demo"
            secondaryActionLabel="Cancel"
            onPrimaryAction={() => {
              resetDemo();
              setPanel(null);
            }}
            onSecondaryAction={() => setPanel(null)}
          />
        }
      >
        <ModalContent descriptionAsDialogDescription={false}>
          <BodyText>This cannot be undone for the current session.</BodyText>
        </ModalContent>
      </Modal>

      {toast && (
        <ToastBar role="status">
          <span>{toast.message}</span>
          {toast.actionLabel && (
            <Button
              size="sm"
              intent="secondary"
              variant="ghost"
              onClick={() => {
                toast.onAction?.();
                setToast(null);
              }}
            >
              {toast.actionLabel}
            </Button>
          )}
          <Button size="sm" intent="secondary" variant="ghost" onClick={() => setToast(null)}>
            Dismiss
          </Button>
        </ToastBar>
      )}
    </>
  );
}
