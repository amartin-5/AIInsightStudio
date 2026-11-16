import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  Dropdown,
  IconButton,
  MenuContainer,
  MenuItem,
  Modal,
  ModalContent,
  ModalFooter,
  Notification,
  NotificationPanel,
  TextInput,
  Toast,
} from '@cake-admin/cakeand';
import { Check, Columns2, Database, Pencil, Trash2, X } from 'lucide-react';
import { DropdownMenu, Toast as RadixToast } from 'radix-ui';
import styled, { createGlobalStyle } from 'styled-components';

import {
  MATCH_SOURCE_COLUMNS,
  matchRowsForRefs,
} from '../../demos/wwc2023/dataset';
import { WidgetLibraryPicker, widgetToReportObject } from '../../product/builder';
import type { RefreshSchedule, TemplateEditableField } from '../../product/types';
import { useAppState } from '../AppState';
import { CompareForm } from '../components/CompareStrip';
import {
  ActionRow,
  BodyText,
  DrawerBody,
  DrawerHeader,
  DrawerSubtitle,
  FormatTile,
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
import { CreateReportOverlay } from './CreateReportOverlay';
import { CustomAiBuildStage } from './CustomAiBuildStage';
import { ICON_SIZE } from '../../iconSize';

type ShareRole = 'owner' | 'edit' | 'comment' | 'view';

type SharePerson = {
  id: string;
  name: string;
  role: ShareRole;
  removable: boolean;
};

const SHARE_ROLE_OPTIONS: { value: Exclude<ShareRole, 'owner'>; label: string }[] = [
  { value: 'edit', label: 'Can edit' },
  { value: 'comment', label: 'Can comment' },
  { value: 'view', label: 'Can view' },
];

const DEFAULT_SHARE_PEOPLE: SharePerson[] = [
  { id: 'you', name: 'You', role: 'owner', removable: false },
  { id: 'patel', name: 'A. Patel', role: 'edit', removable: true },
  { id: 'kim', name: 'J. Kim', role: 'comment', removable: true },
  { id: 'org', name: 'Organization viewers', role: 'view', removable: true },
];

function shareRoleLabel(role: ShareRole): string {
  if (role === 'owner') return 'Owner';
  return SHARE_ROLE_OPTIONS.find((option) => option.value === role)?.label ?? role;
}

const SharePersonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-200);
  min-width: 0;
  padding: var(--space-200) 0;
  border-bottom: var(--stroke-100) solid var(--color-stroke-border);

  &:last-child {
    border-bottom: 0;
  }
`;

const SharePersonCopy = styled.div`
  display: grid;
  gap: var(--space-050);
  min-width: 0;
  flex: 1 1 10rem;
`;

const SharePersonActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-050);
  flex: none;
`;

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
    saveReportAsTemplate,
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
  const [sharePeople, setSharePeople] = useState<SharePerson[]>(DEFAULT_SHARE_PEOPLE);

  const [exportFormat, setExportFormat] = useState('PDF');
  const [templateName, setTemplateName] = useState('');
  const [templatePurpose, setTemplatePurpose] = useState('');
  const [templateCategory, setTemplateCategory] = useState('Custom');
  const [templateEditableFields, setTemplateEditableFields] = useState<TemplateEditableField[]>([
    'match-context',
    'report-name',
    'data-sources',
    'audience',
    'team-period',
  ]);
  const notificationsRef = useRef<HTMLElement>(null);

  const TEMPLATE_EDITABLE_OPTIONS: { id: TemplateEditableField; label: string }[] = [
    { id: 'match-context', label: 'Match context (tournament, year, home / away)' },
    { id: 'report-name', label: 'Report name' },
    { id: 'data-sources', label: 'Data sources' },
    { id: 'audience', label: 'Audience' },
    { id: 'team-period', label: 'Team & period' },
    { id: 'widget-layout', label: 'Widget layout' },
    { id: 'analyst-notes', label: 'Analyst notes' },
  ];

  useEffect(() => {
    if (panel !== 'export') return;
    setTemplateName(activeReport?.name ? `${activeReport.name} template` : '');
    setTemplatePurpose('');
    setTemplateCategory('Custom');
    setTemplateEditableFields([
      'match-context',
      'report-name',
      'data-sources',
      'audience',
      'team-period',
    ]);
  }, [panel, activeReport?.id, activeReport?.name]);

  useEffect(() => {
    if (panel !== 'share') return;
    setSharePeople(DEFAULT_SHARE_PEOPLE.map((person) => ({ ...person })));
    setShareMessage('');
  }, [panel, activeReport?.id]);

  useEffect(() => {
    if (panel !== 'notifications') return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (notificationsRef.current?.contains(target)) return;
      // Sidebar bell toggles the panel; don't dismiss on that same press.
      if (target.closest('[data-notifications-trigger]')) return;
      setPanel(null);
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [panel, setPanel]);

  return (
    <>
      <CreateReportOverlay />
      <CustomAiBuildStage />
      {panel === 'notifications' && (
        <NotificationsDrawer ref={notificationsRef} aria-label="Notifications">
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
            <div>
              <Strong>Share report</Strong>
              <DrawerSubtitle>Invite teammates or publish a secure link</DrawerSubtitle>
            </div>
            <IconButton label="Close" icon={<X size={ICON_SIZE} />} size="xs" intent="secondary" variant="tonal" onClick={() => setPanel(null)} />
          </DrawerHeader>
          <DrawerBody>
            <BodyText>People with access</BodyText>
            <ListStack>
              {sharePeople.map((person) => (
                <SharePersonRow key={person.id}>
                  <SharePersonCopy>
                    <Strong style={{ fontSize: 'var(--type-size-body)' }}>{person.name}</Strong>
                    <Muted>{shareRoleLabel(person.role)}</Muted>
                  </SharePersonCopy>
                  {person.role !== 'owner' && (
                    <SharePersonActions>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <IconButton
                            label={`Change role for ${person.name}`}
                            icon={<Pencil size={ICON_SIZE} />}
                            size="xs"
                            intent="secondary"
                            variant="ghost"
                          />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.Content asChild sideOffset={8} align="end">
                            <MenuContainer width={200} style={{ zIndex: 50 }}>
                              {SHARE_ROLE_OPTIONS.map((option) => (
                                <DropdownMenu.Item
                                  key={option.value}
                                  asChild
                                  onSelect={() => {
                                    setSharePeople((prev) =>
                                      prev.map((entry) =>
                                        entry.id === person.id
                                          ? { ...entry, role: option.value }
                                          : entry,
                                      ),
                                    );
                                    setToast({
                                      message: `${person.name} set to ${option.label.toLowerCase()}`,
                                    });
                                  }}
                                >
                                  <MenuItem
                                    showLeftSlot
                                    showRightSlot={false}
                                    leftSlot={
                                      person.role === option.value ? (
                                        <Check size={ICON_SIZE} />
                                      ) : undefined
                                    }
                                    selected={person.role === option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                </DropdownMenu.Item>
                              ))}
                            </MenuContainer>
                          </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root>
                      {person.removable && (
                        <IconButton
                          label={`Remove ${person.name}`}
                          icon={<Trash2 size={ICON_SIZE} />}
                          size="xs"
                          intent="secondary"
                          variant="ghost"
                          onClick={() => {
                            setSharePeople((prev) =>
                              prev.filter((entry) => entry.id !== person.id),
                            );
                            setToast({ message: `Removed ${person.name}` });
                          }}
                        />
                      )}
                    </SharePersonActions>
                  )}
                </SharePersonRow>
              ))}
              {sharePeople.length === 1 && (
                <Muted>Only you have access. Invite people below.</Muted>
              )}
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
            <div>
              <Strong>Export</Strong>
              <DrawerSubtitle>
                {exportFormat === 'Save as a template'
                  ? 'Publish this board as a reusable template'
                  : 'Download a polished snapshot of this board'}
              </DrawerSubtitle>
            </div>
            <IconButton label="Close" icon={<X size={ICON_SIZE} />} size="xs" intent="secondary" variant="tonal" onClick={() => setPanel(null)} />
          </DrawerHeader>
          <DrawerBody>
            <ListStack>
              {['PDF', 'PowerPoint', 'Image', 'CSV for selected data', 'Copy to another Space'].map(
                (item) => (
                  <FormatTile
                    key={item}
                    type="button"
                    $active={exportFormat === item}
                    onClick={() => setExportFormat(item)}
                  >
                    {item}
                  </FormatTile>
                ),
              )}
              <FormatTile
                type="button"
                $active={exportFormat === 'Save as a template'}
                onClick={() => setExportFormat('Save as a template')}
              >
                Save as a template
              </FormatTile>
              <FormatTile
                type="button"
                onClick={() => {
                  setPanel(null);
                  setPresentMode(true);
                }}
              >
                Presentation mode
              </FormatTile>
            </ListStack>

            {exportFormat === 'Save as a template' ? (
              <>
                <TextInput
                  label="Template name"
                  required
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g. England match briefing"
                />
                <TextInput
                  label="Description"
                  value={templatePurpose}
                  onChange={(e) => setTemplatePurpose(e.target.value)}
                  placeholder="What this template is for"
                  helperText="Shown in the template library"
                />
                <Dropdown
                  label="Category"
                  value={templateCategory}
                  onValueChange={setTemplateCategory}
                  options={[
                    { label: 'Custom', value: 'Custom' },
                    { label: 'Performance', value: 'Performance' },
                    { label: 'Comparison', value: 'Comparison' },
                    { label: 'Trends', value: 'Trends' },
                    { label: 'Briefings', value: 'Briefings' },
                    { label: 'Summaries', value: 'Summaries' },
                  ]}
                />
                <div>
                  <Strong>Editable fields</Strong>
                  <Muted style={{ display: 'block', marginTop: 'var(--space-100)' }}>
                    Choose what stays editable when someone uses this template.
                  </Muted>
                  <ListStack style={{ marginTop: 'var(--space-200)' }}>
                    {TEMPLATE_EDITABLE_OPTIONS.map((option) => {
                      const checked = templateEditableFields.includes(option.id);
                      return (
                        <Checkbox
                          key={option.id}
                          label={option.label}
                          checked={checked}
                          onCheckedChange={(next) => {
                            const on = next === true;
                            setTemplateEditableFields((prev) =>
                              on
                                ? [...prev, option.id]
                                : prev.filter((id) => id !== option.id),
                            );
                          }}
                        />
                      );
                    })}
                  </ListStack>
                </div>
                <Button
                  onClick={() =>
                    saveReportAsTemplate({
                      name: templateName,
                      purpose: templatePurpose,
                      category: templateCategory,
                      editableFields: templateEditableFields,
                    })
                  }
                  disabled={!templateName.trim()}
                >
                  Save template
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
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
