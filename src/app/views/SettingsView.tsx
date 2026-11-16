import { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Radio,
  RadioGroup,
  Switch,
  TextInput,
  VerticalTabItem,
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
} from '@cake-admin/cakeand';
import styled from 'styled-components';

import {
  affiliationDropdownOptions,
  getAffiliationOption,
  type AffiliationKind,
} from '../../demos/wwc2023/exploreProfiles';
import { TeamCrest } from '../../product/teams/TeamCrest';
import { useAppState } from '../AppState';
import { initialsFromName } from '../userProfile';
import {
  ActionRow,
  BodyText,
  Muted,
  PageHeader,
  PageSubtitle,
  PageTitle,
  Section,
  SectionTitle,
  SetupGrid,
  Strong,
  SurfaceCard,
  TitleBlock,
} from '../ui.styles';

type SettingsTab = 'profile' | 'notifications' | 'preferences' | 'privacy';

type NotificationSettings = {
  inApp: boolean;
  email: boolean;
  reportRefresh: boolean;
  automations: boolean;
  weeklyDigest: boolean;
  mentionAlerts: boolean;
};

/** Fills the workspace: sticky header + sticky nav, scrolling panel only. */
const SettingsPage = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
  width: 100%;
  overflow: hidden;
  padding: var(--space-500) var(--space-800) 0;
`;

const StickyPageHeader = styled(PageHeader)`
  flex: none;
  margin-bottom: var(--space-500);
`;

const SettingsTabs = styled(VerticalTabs)`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  /* VerticalTabs defaults to flex-start; stretch so the card column fills the page. */
  align-items: stretch !important;
  min-height: 0;
  min-width: 0;
  width: 100%;
`;

const SettingsLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 220px) minmax(0, 1fr);
  gap: var(--space-600);
  align-items: stretch;
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  min-width: 0;

  @media (max-width: 840px) {
    grid-template-columns: 1fr;
    overflow: auto;
  }
`;

const StickyNav = styled.div`
  align-self: start;
  width: 100%;
  min-width: 0;
`;

const ContentScroll = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 0;
  overflow: auto;
  padding-bottom: var(--space-800);

  /* Every tab panel shares the same full-width card column. */
  & > * {
    width: 100% !important;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }
`;

const PanelStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-500);
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

const SettingsCard = styled(SurfaceCard)`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const SettingRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-300);
  min-width: 0;
`;

const SettingCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-050);
  min-width: 0;
  flex: 1 1 220px;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-400);
  min-width: 0;
`;

const FieldStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-400);
  min-width: 0;
`;

const AffiliationPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-300);
  min-width: 0;
  padding: var(--space-400);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-on-container);
`;

export function SettingsView() {
  const {
    affiliatedTeamId,
    setAffiliatedTeamId,
    affiliatedTeam,
    setToast,
    setNav,
    userProfile,
    updateUserProfile,
  } = useAppState();
  const [tab, setTab] = useState<SettingsTab>('profile');
  const [draftAffiliationId, setDraftAffiliationId] = useState(affiliatedTeamId);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    inApp: userProfile.inAppNotifications,
    email: userProfile.emailNotifications,
    reportRefresh: true,
    automations: true,
    weeklyDigest: false,
    mentionAlerts: userProfile.notifyMatchData,
  });

  const draftAffiliation = getAffiliationOption(draftAffiliationId);
  const affiliationOptions = affiliationDropdownOptions(userProfile.affiliationKind);
  const avatarInitials = initialsFromName(userProfile.displayName);

  useEffect(() => {
    setDraftAffiliationId(affiliatedTeamId);
  }, [affiliatedTeamId]);

  const save = (label: string) => {
    setToast({ message: `${label} saved` });
  };

  const saveProfile = () => {
    updateUserProfile({ affiliatedTeamId: draftAffiliationId });
    setAffiliatedTeamId(draftAffiliationId);
    setToast({
      message: `Profile saved · Explore centers on ${getAffiliationOption(draftAffiliationId).name}`,
    });
  };

  return (
    <SettingsPage>
      <StickyPageHeader>
        <TitleBlock>
          <PageTitle>Settings</PageTitle>
          <PageSubtitle>
            Manage your profile, notification delivery, and Insight Studio preferences.
          </PageSubtitle>
        </TitleBlock>
      </StickyPageHeader>

      <SettingsTabs value={tab} onValueChange={(value) => setTab(value as SettingsTab)}>
        <SettingsLayout>
          <StickyNav>
            <VerticalTabsList aria-label="Settings sections">
              <VerticalTabItem value="profile">Profile</VerticalTabItem>
              <VerticalTabItem value="notifications">Notifications</VerticalTabItem>
              <VerticalTabItem value="preferences">Preferences</VerticalTabItem>
              <VerticalTabItem value="privacy">Privacy</VerticalTabItem>
            </VerticalTabsList>
          </StickyNav>

          <ContentScroll>
          <VerticalTabsContent value="profile">
            <PanelStack>
              <SettingsCard as="div">
                <Section>
                  <SectionTitle>Profile</SectionTitle>
                  <BodyText>
                    How you appear to teammates when you share reports and leave notes.
                  </BodyText>
                </Section>

                <ProfileHeader>
                  <Avatar
                    initials={avatarInitials}
                    alt={userProfile.displayName}
                    size="lg"
                    badge={userProfile.sharePresence}
                    badgeLabel="Online"
                  />
                  <div>
                    <Strong>{userProfile.displayName}</Strong>
                    <Muted>{userProfile.jobTitle}</Muted>
                  </div>
                </ProfileHeader>

                <Divider weight="weak" />

                <FieldStack>
                  <SetupGrid>
                    <TextInput
                      label="Display name"
                      value={userProfile.displayName}
                      onChange={(e) => updateUserProfile({ displayName: e.target.value })}
                    />
                    <TextInput
                      label="Work email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => updateUserProfile({ email: e.target.value })}
                      helperText="Used for digests and shared-report alerts"
                    />
                    <TextInput
                      label="Job title"
                      value={userProfile.jobTitle}
                      onChange={(e) => updateUserProfile({ jobTitle: e.target.value })}
                    />
                  </SetupGrid>
                </FieldStack>

                <Divider weight="weak" />

                <Section>
                  <SectionTitle>Team affiliation</SectionTitle>
                  <BodyText>
                    Your home team centers Explore — past match recaps, strengths and failures,
                    and upcoming prep. You can still browse other teams from Explore without
                    changing this setting.
                  </BodyText>
                </Section>

                <AffiliationPreview>
                  <TeamCrest team={affiliatedTeam.crestTeam} size={48} labelled />
                  <div>
                    <Strong>{affiliatedTeam.name}</Strong>
                    <Muted>
                      Current home ·{' '}
                      {affiliatedTeam.kind === 'national' ? 'National team' : 'Club'}
                    </Muted>
                  </div>
                  <Button size="sm" intent="secondary" variant="outline" onClick={() => setNav('explore')}>
                    Open Explore
                  </Button>
                </AffiliationPreview>

                <FieldStack>
                  <SetupGrid>
                    <Dropdown
                      label="Affiliation type"
                      value={userProfile.affiliationKind}
                      onValueChange={(value) => {
                        const kind = value as AffiliationKind;
                        updateUserProfile({ affiliationKind: kind });
                        const firstOfKind = affiliationDropdownOptions(kind)[0];
                        if (firstOfKind) setDraftAffiliationId(firstOfKind.value);
                      }}
                      options={[
                        { label: 'National team', value: 'national' },
                        { label: 'Club team', value: 'club' },
                      ]}
                    />
                    <Dropdown
                      label={
                        userProfile.affiliationKind === 'national'
                          ? 'National team'
                          : 'Club team'
                      }
                      value={draftAffiliationId}
                      onValueChange={setDraftAffiliationId}
                      options={affiliationOptions}
                      helperText="Saved as your home affiliation for Explore"
                    />
                  </SetupGrid>
                  <Muted>
                    Draft selection: {draftAffiliation.name} (
                    {draftAffiliation.kind === 'national' ? 'National' : 'Club'})
                  </Muted>
                </FieldStack>

                <ActionRow>
                  <Button onClick={saveProfile}>Save profile</Button>
                  <Button
                    intent="secondary"
                    variant="ghost"
                    onClick={() => setDraftAffiliationId(affiliatedTeamId)}
                  >
                    Reset
                  </Button>
                </ActionRow>
              </SettingsCard>
            </PanelStack>
          </VerticalTabsContent>

          <VerticalTabsContent value="notifications">
            <PanelStack>
              <SettingsCard as="div">
                <Section>
                  <SectionTitle>Delivery</SectionTitle>
                  <BodyText>Choose where Insight Studio sends alerts.</BodyText>
                </Section>

                <FieldStack>
                  <SettingRow>
                    <SettingCopy>
                      <Strong>In-app notifications</Strong>
                      <Muted>Show alerts in the notification panel and bell badge.</Muted>
                    </SettingCopy>
                    <Switch
                      aria-label="In-app notifications"
                      checked={notifications.inApp}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, inApp: checked }))
                      }
                    />
                  </SettingRow>
                  <Divider weight="weak" />
                  <SettingRow>
                    <SettingCopy>
                      <Strong>Email notifications</Strong>
                      <Muted>Send copies of important alerts to your work email.</Muted>
                    </SettingCopy>
                    <Switch
                      aria-label="Email notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, email: checked }))
                      }
                    />
                  </SettingRow>
                </FieldStack>
              </SettingsCard>

              <SettingsCard as="div">
                <Section>
                  <SectionTitle>What to notify me about</SectionTitle>
                </Section>

                <FieldStack>
                  <SettingRow>
                    <SettingCopy>
                      <Strong>Report refresh complete</Strong>
                      <Muted>When a scheduled or manual refresh finishes.</Muted>
                    </SettingCopy>
                    <Switch
                      aria-label="Report refresh complete"
                      checked={notifications.reportRefresh}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, reportRefresh: checked }))
                      }
                    />
                  </SettingRow>
                  <Divider weight="weak" />
                  <SettingRow>
                    <SettingCopy>
                      <Strong>Automation runs</Strong>
                      <Muted>When an automation creates or updates a report.</Muted>
                    </SettingCopy>
                    <Switch
                      aria-label="Automation runs"
                      checked={notifications.automations}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, automations: checked }))
                      }
                    />
                  </SettingRow>
                  <Divider weight="weak" />
                  <SettingRow>
                    <SettingCopy>
                      <Strong>Mentions and comments</Strong>
                      <Muted>When someone mentions you on a shared report.</Muted>
                    </SettingCopy>
                    <Switch
                      aria-label="Mentions and comments"
                      checked={notifications.mentionAlerts}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, mentionAlerts: checked }))
                      }
                    />
                  </SettingRow>
                  <Divider weight="weak" />
                  <SettingRow>
                    <SettingCopy>
                      <Strong>Weekly digest</Strong>
                      <Muted>A Monday summary of report activity across your workspace.</Muted>
                    </SettingCopy>
                    <Switch
                      aria-label="Weekly digest"
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, weeklyDigest: checked }))
                      }
                    />
                  </SettingRow>
                </FieldStack>

                <ActionRow>
                  <Button
                    onClick={() => {
                      updateUserProfile({
                        inAppNotifications: notifications.inApp,
                        emailNotifications: notifications.email,
                        notifyMatchData: notifications.mentionAlerts,
                      });
                      save('Notification settings');
                    }}
                  >
                    Save notifications
                  </Button>
                </ActionRow>
              </SettingsCard>
            </PanelStack>
          </VerticalTabsContent>

          <VerticalTabsContent value="preferences">
            <PanelStack>
              <SettingsCard as="div">
                <Section>
                  <SectionTitle>App preferences</SectionTitle>
                  <BodyText>Defaults for how Insight Studio opens and presents content.</BodyText>
                </Section>

                <FieldStack>
                  <SetupGrid>
                    <Dropdown
                      label="Default landing page"
                      value={userProfile.defaultHome}
                      onValueChange={(value) => updateUserProfile({ defaultHome: value })}
                      options={[
                        { label: 'Home', value: 'home' },
                        { label: 'Explore', value: 'explore' },
                        { label: 'Reports', value: 'reports' },
                        { label: 'Templates', value: 'templates' },
                        { label: 'Automations', value: 'automations' },
                      ]}
                    />
                    <Dropdown
                      label="Language"
                      value={userProfile.language}
                      onValueChange={(value) => updateUserProfile({ language: value })}
                      options={[
                        { label: 'English', value: 'en' },
                        { label: 'Español', value: 'es' },
                        { label: 'Français', value: 'fr' },
                        { label: 'Deutsch', value: 'de' },
                      ]}
                    />
                    <Dropdown
                      label="Date format"
                      value={userProfile.dateFormat}
                      onValueChange={(value) => updateUserProfile({ dateFormat: value })}
                      options={[
                        { label: 'MM/DD/YYYY', value: 'mdy' },
                        { label: 'DD/MM/YYYY', value: 'dmy' },
                        { label: 'YYYY-MM-DD', value: 'ymd' },
                      ]}
                    />
                  </SetupGrid>

                  <FieldStack>
                    <Strong>Content density</Strong>
                    <RadioGroup
                      value={userProfile.density}
                      onValueChange={(value) => updateUserProfile({ density: value })}
                      orientation="horizontal"
                      aria-label="Content density"
                    >
                      <Radio value="comfortable" label="Comfortable" />
                      <Radio value="compact" label="Compact" />
                    </RadioGroup>
                  </FieldStack>

                  <Divider weight="weak" />

                  <SettingRow>
                    <SettingCopy>
                      <Strong>Open AI panel by default</Strong>
                      <Muted>Keep the assistant visible when opening a report workspace.</Muted>
                    </SettingCopy>
                    <Switch
                      aria-label="Open AI panel by default"
                      checked={userProfile.aiPanelOpen}
                      onCheckedChange={(checked) => updateUserProfile({ aiPanelOpen: checked })}
                    />
                  </SettingRow>
                  <SettingRow>
                    <SettingCopy>
                      <Strong>Show suggested prompts</Strong>
                      <Muted>Surface starter questions in the AI panel.</Muted>
                    </SettingCopy>
                    <Switch
                      aria-label="Show suggested prompts"
                      checked={userProfile.suggestPrompts}
                      onCheckedChange={(checked) =>
                        updateUserProfile({ suggestPrompts: checked })
                      }
                    />
                  </SettingRow>
                </FieldStack>

                <ActionRow>
                  <Button onClick={() => save('Preferences')}>Save preferences</Button>
                </ActionRow>
              </SettingsCard>
            </PanelStack>
          </VerticalTabsContent>

          <VerticalTabsContent value="privacy">
            <PanelStack>
              <SettingsCard as="div">
                <Section>
                  <SectionTitle>Privacy & sharing</SectionTitle>
                  <BodyText>Control how your activity and new reports are shared by default.</BodyText>
                </Section>

                <FieldStack>
                  <Dropdown
                    label="Default report sharing"
                    value={userProfile.defaultSharing}
                    onValueChange={(value) => updateUserProfile({ defaultSharing: value })}
                    options={[
                      { label: 'Private to me', value: 'private' },
                      { label: 'Shared with my team', value: 'team' },
                      { label: 'Anyone with the link', value: 'link' },
                    ]}
                    helperText="Applied when you create a new report"
                  />

                  <Divider weight="weak" />

                  <SettingRow>
                    <SettingCopy>
                      <Strong>Show online presence</Strong>
                      <Muted>Let teammates see when you are active in Insight Studio.</Muted>
                    </SettingCopy>
                    <Switch
                      aria-label="Show online presence"
                      checked={userProfile.sharePresence}
                      onCheckedChange={(checked) => updateUserProfile({ sharePresence: checked })}
                    />
                  </SettingRow>
                  <SettingRow>
                    <SettingCopy>
                      <Strong>Anonymous product usage</Strong>
                      <Muted>Help improve Insight Studio with anonymized interaction data.</Muted>
                    </SettingCopy>
                    <Switch
                      aria-label="Anonymous product usage"
                      checked={userProfile.allowAnonymousUsage}
                      onCheckedChange={(checked) =>
                        updateUserProfile({ allowAnonymousUsage: checked })
                      }
                    />
                  </SettingRow>
                </FieldStack>

                <ActionRow>
                  <Button onClick={() => save('Privacy settings')}>Save privacy</Button>
                </ActionRow>
              </SettingsCard>
            </PanelStack>
          </VerticalTabsContent>
          </ContentScroll>
        </SettingsLayout>
      </SettingsTabs>
    </SettingsPage>
  );
}
