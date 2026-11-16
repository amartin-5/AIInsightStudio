import type { AffiliationKind } from '../demos/wwc2023/exploreProfiles';
import { DEFAULT_AFFILIATION_ID } from '../demos/wwc2023/exploreProfiles';

export type OnboardingStep =
  | 'welcome'
  | 'sign-in'
  | 'affiliation'
  | 'about'
  | 'optional';

export type UserProfile = {
  displayName: string;
  email: string;
  jobTitle: string;
  affiliationKind: AffiliationKind;
  affiliatedTeamId: string;
  role: string;
  experienceLevel: string;
  primaryGoal: string;
  notifyMatchData: boolean;
  notifyTeamOnly: boolean;
  inAppNotifications: boolean;
  emailNotifications: boolean;
  defaultHome: string;
  language: string;
  dateFormat: string;
  density: string;
  aiPanelOpen: boolean;
  suggestPrompts: boolean;
  sharePresence: boolean;
  allowAnonymousUsage: boolean;
  defaultSharing: string;
};

export const DEFAULT_USER_PROFILE: UserProfile = {
  displayName: '',
  email: '',
  jobTitle: '',
  affiliationKind: 'national',
  affiliatedTeamId: DEFAULT_AFFILIATION_ID,
  role: '',
  experienceLevel: '',
  primaryGoal: '',
  notifyMatchData: true,
  notifyTeamOnly: false,
  inAppNotifications: true,
  emailNotifications: true,
  defaultHome: 'home',
  language: 'en',
  dateFormat: 'mdy',
  density: 'comfortable',
  aiPanelOpen: true,
  suggestPrompts: true,
  sharePresence: true,
  allowAnonymousUsage: true,
  defaultSharing: 'private',
};

export const GOAL_OPTIONS = [
  { label: 'Prepare for upcoming matches', value: 'prep' },
  { label: 'Review past performance', value: 'review' },
  { label: 'Compare players and styles', value: 'compare' },
  { label: 'Build shareable reports', value: 'reports' },
  { label: 'Automate match-day insights', value: 'automate' },
];

export function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'IS';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}
