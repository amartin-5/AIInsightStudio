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
  TextInput,
  Toast,
} from '@cake-admin/cakeand';
import { Columns2, Database, X } from 'lucide-react';
import { Toast as RadixToast } from 'radix-ui';
import styled, { createGlobalStyle } from 'styled-components';

import {
  MATCH_SOURCE_COLUMNS,
  matchRowsForRefs,
} from '../../demos/wwc2023/dataset';
import { WidgetLibraryPicker, widgetToReportObject } from '../../product/builder';
import type { RefreshSchedule } from '../../product/types';
import { useAppState } from '../AppState';
import { CompareForm } from '../components/CompareStrip';
import {
  ActionRow,
  BodyText,
  DrawerBody,
  DrawerHeader,
  ListStack,
  Muted,
  NotificationsDrawer,
  SideDrawer,
  SimpleTable,
  Strong,
  SurfaceCard,
  TableWrap,
} from '../ui.styles';
import { AutomationComposer } from './AutomationComposer';
import { ICON_SIZE } from '../../iconSize';

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
    setPresentMode,
    lineageTarget,
    closeLineage,
    snapshot,
    markNotificationRead,
    dismissNotification,
    openWorkspace,
    addObjectToPage,
    insertAiCreatedObject,
    resetDemo,
    automationDraft,
    selectedSlot,
    setBuilderTourStep,
    setCompareContext,
  } = useAppState();

  const lineageObject = (() => {
    if (!lineageTarget || !activeReport) return null;
    for (const page of activeReport.pages) {
      const found = page.objects.find((object) => object.id === lineageTarget.objectId);
      if (found) return found;
    }
    return null;
  })();
  const lineageRows = matchRowsForRefs(
    lineageObject?.sourceRefs ??
      (lineageTarget?.metricKey ? [lineageTarget.metricKey] : undefined),
  );

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
        <NotificationsDrawer aria-label="Notifications">
          <NotificationPanel
            title="Notifications"
            onClose={() => setPanel(null)}
            style={{ height: '100%', borderRadius: 0, boxShadow: 'none', maxWidth: 'none' }}
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
        </NotificationsDrawer>
      )}

      {panel === 'share' && (
        <SideDrawer aria-label="Share report">
          <DrawerHeader>
            <Strong>Share report</Strong>
            <IconButton label="Close" icon={<X size={ICON_SIZE} />} size="xs" intent="secondary" variant="ghost" onClick={() => setPanel(null)} />
          </DrawerHeader>
          <DrawerBody>
            <BodyText>People with access</BodyText>
            <ListStack>
              <Muted>You · Owner</Muted>
              <Muted>A. Patel · Can edit</Muted>
              <Muted>J. Kim · Can comment</Muted>
              <Muted>Organization viewers · Can view</Muted>
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
                { label: 'Anyone in the organization with the link', value: 'org' },
                { label: 'Specific people', value: 'people' },
              ]}
            />
            <Checkbox label="Require sign-in" defaultChecked />
            <Checkbox label="Allow download" defaultChecked />
            <Checkbox label="Allow duplicate" />
            <Checkbox label="Require review before publishing" />
            <ActionRow>
              <Button onClick={shareReport}>Share report</Button>
              <Button intent="secondary" variant="outline" onClick={() => setToast({ message: 'Link copied' })}>
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
            <IconButton label="Close" icon={<X size={ICON_SIZE} />} size="xs" intent="secondary" variant="ghost" onClick={() => setPanel(null)} />
          </DrawerHeader>
          <DrawerBody>
            <ListStack>
              {['PDF', 'PowerPoint', 'Image', 'CSV for selected data', 'Copy to another Space'].map(
                (item) => (
                  <Button key={item} intent="secondary" variant="outline" onClick={exportReport}>
                    {item}
                  </Button>
                ),
              )}
              <Button
                intent="secondary"
                variant="outline"
                onClick={() => {
                  setPanel(null);
                  setPresentMode(true);
                }}
              >
                Presentation mode
              </Button>
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

      {panel === 'settings' && (
        <SideDrawer aria-label="Report settings">
          <DrawerHeader>
            <Strong>Report settings</Strong>
            <IconButton label="Close" icon={<X size={ICON_SIZE} />} size="xs" intent="secondary" variant="ghost" onClick={() => setPanel(null)} />
          </DrawerHeader>
          <DrawerBody>
            <BodyText>Data sources to use</BodyText>
            {(activeReport?.sourceLabels ?? []).map((source) => (
              <Checkbox key={source} label={source} defaultChecked />
            ))}
            <BodyText>Pages to refresh</BodyText>
            {(activeReport?.pages ?? []).map((page) => (
              <Checkbox key={page.id} label={page.name} defaultChecked />
            ))}
            <Checkbox
              label="Preserve analyst notes"
              checked={preserveNotes}
              onCheckedChange={(checked) => setPreserveNotes(checked === true)}
            />
            <Checkbox
              label="Generate change summary"
              checked={generateSummary}
              onCheckedChange={(checked) => setGenerateSummary(checked === true)}
            />
            <Checkbox
              label="Notify when complete"
              checked={notifyComplete}
              onCheckedChange={(checked) => setNotifyComplete(checked === true)}
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
              Refresh now
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
            <IconButton label="Close" icon={<X size={ICON_SIZE} />} size="xs" intent="secondary" variant="ghost" onClick={() => setPanel(null)} />
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
            <TextInput label="Recipients" placeholder="name@example.com" />
            <Checkbox
              label="Require review before sending"
              checked={requireReview}
              onCheckedChange={(checked) => setRequireReview(checked === true)}
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

      {panel === 'automation' && automationDraft && <AutomationComposer />}

      {panel === 'changes' && (
        <SideDrawer aria-label="What changed">
          <DrawerHeader>
            <Strong>Report updated</Strong>
            <IconButton label="Close" icon={<X size={ICON_SIZE} />} size="xs" intent="secondary" variant="ghost" onClick={() => setPanel(null)} />
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
            <IconButton label="Close" icon={<X size={ICON_SIZE} />} size="xs" intent="secondary" variant="ghost" onClick={() => setPanel(null)} />
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
            <IconButton label="Close" icon={<X size={ICON_SIZE} />} size="xs" intent="secondary" variant="ghost" onClick={() => setPanel(null)} />
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
                    body: kind === 'metric' ? undefined : `New ${label.toLowerCase()} object.`,
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

      {panel === 'lineage' && <SourcesDialogWiden />}
      <Modal
        open={panel === 'lineage'}
        onOpenChange={(open) => !open && closeLineage()}
        title="Sources"
        subtitle={
          lineageTarget?.metricKey
            ? `${lineageTarget.title ?? lineageObject?.title ?? 'Selected object'} · ${lineageTarget.metricKey}`
            : (lineageTarget?.title ?? lineageObject?.title ?? 'Selected object')
        }
        modalIconSlot={<Database size={ICON_SIZE} />}
        showClose
        footer={
          <ModalFooter
            checkbox={false}
            actions={
              <Button intent="secondary" variant="outline" onClick={closeLineage}>
                Close
              </Button>
            }
          />
        }
      >
        <ModalContent descriptionAsDialogDescription={false}>
          <LineageBody>
            <BodyText>
              Match rows that feed this object. Values come from Women’s World Cup 2023 match
              data.
            </BodyText>
            {(activeReport?.sourceLabels ?? []).length > 0 && (
              <ListStack>
                {(activeReport?.sourceLabels ?? []).slice(0, 3).map((label) => (
                  <Muted key={label}>{label}</Muted>
                ))}
              </ListStack>
            )}
            {lineageObject?.events?.length ? (
              <ListStack>
                <Strong>Events</Strong>
                {lineageObject.events.map((event) => (
                  <Muted key={event.id}>
                    {event.minute}′ · {event.text}
                  </Muted>
                ))}
              </ListStack>
            ) : null}
            {lineageObject?.rows?.length && lineageObject.columns ? (
              <TableWrap>
                <SimpleTable>
                  <thead>
                    <tr>
                      {lineageObject.columns.map((col) => (
                        <th key={col}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lineageObject.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </SimpleTable>
              </TableWrap>
            ) : (
              <TableWrap>
                <SimpleTable>
                  <thead>
                    <tr>
                      {MATCH_SOURCE_COLUMNS.map((col) => (
                        <th key={col}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lineageRows.map((row) => (
                      <tr key={row.id}>
                        <td>{row.opponent}</td>
                        <td>{row.stage}</td>
                        <td>{row.result}</td>
                        <td>{row.goals}</td>
                        <td>{row.possession}</td>
                        <td>{row.shots}</td>
                        <td>{row.xg}</td>
                        <td>{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </SimpleTable>
              </TableWrap>
            )}
          </LineageBody>
        </ModalContent>
      </Modal>

      <Modal
        open={panel === 'compare'}
        onOpenChange={(open) => !open && setPanel(null)}
        title="Compare"
        subtitle="Choose teams and periods to compare side by side."
        modalIconSlot={<Columns2 />}
        showClose
        footer={
          <ModalFooter
            checkbox={false}
            primaryActionLabel={
              activeReport?.compare?.enabled ? 'Update comparison' : 'Start comparison'
            }
            secondaryActionLabel={activeReport?.compare?.enabled ? 'Exit compare' : 'Cancel'}
            onPrimaryAction={() => {
              setCompareContext({ enabled: true });
              setPanel(null);
            }}
            onSecondaryAction={() => {
              if (activeReport?.compare?.enabled) {
                setCompareContext({ enabled: false });
              }
              setPanel(null);
            }}
          />
        }
      >
        <ModalContent descriptionAsDialogDescription={false}>
          <CompareForm />
        </ModalContent>
      </Modal>

      <Modal
        open={panel === 'widget-library'}
        onOpenChange={(open) => !open && setPanel(null)}
        title="Widget library"
        subtitle="Pick a widget for your report."
        showClose
      >
        <ModalContent descriptionAsDialogDescription={false}>
          <WidgetLibraryPicker
            onPick={(entry) => {
              addObjectToPage(
                widgetToReportObject(entry, {
                  slot: selectedSlot ?? undefined,
                }),
              );
              setBuilderTourStep(2);
            }}
          />
        </ModalContent>
      </Modal>

      <Modal
        open={panel === 'reset'}
        onOpenChange={(open) => !open && setPanel(null)}
        title="Reset application"
        subtitle="Restore the initial reports, templates, chat, notifications, automations, and layout."
        footer={
          <ModalFooter
            checkbox={false}
            primaryActionLabel="Reset"
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
        <Toast
          status="info"
          variant="pop-out"
          title={toast.message}
          open
          type="background"
          duration={toast.actionLabel ? Infinity : 5000}
          onOpenChange={(open) => {
            if (!open) setToast(null);
          }}
          onDismiss={() => setToast(null)}
          primaryActionLabel={toast.actionLabel}
          onPrimaryAction={
            toast.actionLabel
              ? () => {
                  toast.onAction?.();
                  setToast(null);
                }
              : undefined
          }
        />
      )}
      <ToastViewport />
    </>
  );
}

/** Cake Modal keeps a fixed 480px surface; widen only while Sources is open. */
const SourcesDialogWiden = createGlobalStyle`
  [role='dialog'] {
    width: min(56rem, calc(100vw - var(--space-800))) !important;
    max-width: min(56rem, calc(100vw - var(--space-800))) !important;
  }
`;

const LineageBody = styled.div`
  display: grid;
  gap: var(--space-300);
  max-height: min(70vh, 32rem);
  overflow: auto;
  padding-right: var(--space-050);
`;

/** Bottom-center host for HelloPC Toast (portals into this viewport). */
const ToastViewport = styled(RadixToast.Viewport)`
  position: absolute;
  left: 50%;
  bottom: var(--space-500);
  z-index: 8;
  display: flex;
  flex-direction: column;
  gap: var(--space-200);
  width: min(560px, calc(100% - var(--space-800)));
  max-width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;
  transform: translateX(-50%);
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;
