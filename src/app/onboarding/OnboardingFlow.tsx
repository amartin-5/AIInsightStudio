import { useMemo, useState } from 'react';
import { Button, Checkbox, Dropdown, IconButton, Radio, RadioGroup, TextInput } from '@cake-admin/cakeand';
import { ArrowLeft, Sparkles, X } from 'lucide-react';

import {
  affiliationDropdownOptions,
  getAffiliationOption,
  type AffiliationKind,
} from '../../demos/wwc2023/exploreProfiles';
import heroPitch from '../../assets/onboarding/hero-pitch.jpeg';
import { useAppState } from '../AppState';
import {
  EXPERIENCE_OPTIONS,
  GOAL_OPTIONS,
  ROLE_OPTIONS,
  type OnboardingStep,
  type UserProfile,
} from '../userProfile';
import {
  ActionCluster,
  AuthCard,
  BrandFoot,
  BrandGlyph,
  BrandMark,
  BrandPane,
  BrandPhoto,
  BrandScrim,
  BrandTitle,
  AuthField,
  AuthInput,
  CheckboxStack,
  FieldGroup,
  FooterNote,
  FormClose,
  FormHeadline,
  FormPane,
  FormStack,
  FormSubhead,
  GhostLink,
  LightFields,
  OnboardingStage,
  SignInBody,
  SignInFooter,
  SignInStack,
  StepDot,
  StepDots,
} from './onboarding.styles';
import { ICON_SIZE, ICON_SIZE_LG } from '../../iconSize';

const FLOW_STEPS: OnboardingStep[] = [
  'welcome',
  'sign-in',
  'profile',
  'affiliation',
  'preferences',
];

function stepIndex(step: OnboardingStep) {
  return FLOW_STEPS.indexOf(step);
}

export function OnboardingFlow() {
  const {
    onboardingStep,
    setOnboardingStep,
    userProfile,
    updateUserProfile,
    completeOnboarding,
    signOut,
  } = useAppState();

  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  const draft = userProfile;
  const affiliationOptions = useMemo(
    () => affiliationDropdownOptions(draft.affiliationKind),
    [draft.affiliationKind],
  );

  const patch = (next: Partial<UserProfile>) => updateUserProfile(next);

  const go = (step: OnboardingStep) => setOnboardingStep(step);

  const dismissToSignIn = () => {
    if (onboardingStep === 'welcome') go('sign-in');
    else if (onboardingStep === 'sign-in') signOut();
    else go('sign-in');
  };

  const handleSignIn = () => {
    if (!draft.email.trim() || !password.trim()) {
      setSignInError('Enter your work email and password to continue.');
      return;
    }
    if (!acceptedTerms) {
      setSignInError('Agree to the terms to continue.');
      return;
    }
    setSignInError(null);
    go('profile');
  };

  const profileReady =
    draft.displayName.trim().length > 1 && draft.email.trim().includes('@');

  const affiliationReady =
    Boolean(draft.affiliatedTeamId) &&
    Boolean(draft.role) &&
    Boolean(draft.experienceLevel) &&
    Boolean(draft.primaryGoal);

  const showPhoto = onboardingStep !== 'welcome';
  const progressSteps = FLOW_STEPS.filter((s) => s !== 'welcome');

  return (
    <OnboardingStage>
      <AuthCard role="dialog" aria-labelledby="onboarding-title">
        <BrandPane $variant={showPhoto ? 'photo' : 'mark'}>
          {showPhoto ? (
            <>
              <BrandPhoto src={heroPitch} alt="" />
              <BrandScrim />
              <BrandFoot>Insight Studio · Performance intelligence</BrandFoot>
            </>
          ) : (
            <BrandMark>
              <BrandGlyph aria-hidden>
                <Sparkles size={32} />
              </BrandGlyph>
              <BrandTitle>Insight Studio</BrandTitle>
            </BrandMark>
          )}
        </BrandPane>

        <FormPane>
          {onboardingStep !== 'welcome' && (
            <FormClose>
              <IconButton
                label={onboardingStep === 'sign-in' ? 'Close sign in' : 'Back to sign in'}
                icon={<X size={ICON_SIZE_LG} />}
                size="lg"
                intent="secondary"
                variant="ghost"
                onClick={dismissToSignIn}
              />
            </FormClose>
          )}

          {onboardingStep === 'welcome' && (
            <FormStack key="welcome">
              <FormHeadline id="onboarding-title">
                Welcome to the future of performance intelligence.
              </FormHeadline>
              <FormSubhead>Your analysis journey starts here.</FormSubhead>
              <ActionCluster>
                <Button size="lg" onClick={() => go('sign-in')}>
                  Let’s go
                </Button>
              </ActionCluster>
            </FormStack>
          )}

          {onboardingStep === 'sign-in' && (
            <SignInStack key="sign-in">
              <SignInBody>
                <FormHeadline id="onboarding-title">Sign in</FormHeadline>
                <FieldGroup>
                  <AuthField>
                    Email
                    <AuthInput
                      type="email"
                      autoComplete="username"
                      placeholder="Email"
                      value={draft.email}
                      onChange={(e) => patch({ email: e.target.value })}
                    />
                  </AuthField>
                  <AuthField>
                    Password
                    <AuthInput
                      type="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </AuthField>
                </FieldGroup>
                <CheckboxStack>
                  <Checkbox
                    label="Agree to terms and conditions"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                  />
                </CheckboxStack>
                {signInError && <FooterNote role="alert">{signInError}</FooterNote>}
                <ActionCluster>
                  <Button size="lg" onClick={handleSignIn}>
                    Sign in
                  </Button>
                </ActionCluster>
              </SignInBody>
              <SignInFooter>
                <GhostLink type="button" onClick={() => completeOnboarding()}>
                  Don’t have an account? <strong>Continue as guest</strong>
                </GhostLink>
              </SignInFooter>
            </SignInStack>
          )}

          {onboardingStep === 'profile' && (
            <FormStack key="profile">
              <FormHeadline id="onboarding-title">Tell us who you are</FormHeadline>
              <FormSubhead>
                How you appear to teammates when you share reports and leave notes.
              </FormSubhead>
              <LightFields>
                <TextInput
                  label="Display name"
                  required
                  value={draft.displayName}
                  onChange={(e) => patch({ displayName: e.target.value })}
                  placeholder="Name"
                />
                <TextInput
                  label="Work email"
                  type="email"
                  required
                  value={draft.email}
                  onChange={(e) => patch({ email: e.target.value })}
                  helperText="Used for digests and shared-report alerts"
                />
                <TextInput
                  label="Job title"
                  value={draft.jobTitle}
                  onChange={(e) => patch({ jobTitle: e.target.value })}
                  placeholder="Performance Analyst"
                />
              </LightFields>
              <ActionCluster>
                <Button size="lg" disabled={!profileReady} onClick={() => go('affiliation')}>
                  Next
                </Button>
                <Button
                  intent="secondary"
                  variant="ghost"
                  startIcon={<ArrowLeft size={ICON_SIZE} />}
                  onClick={() => go('sign-in')}
                >
                  Back
                </Button>
              </ActionCluster>
              <StepProgress current={onboardingStep} steps={progressSteps} />
            </FormStack>
          )}

          {onboardingStep === 'affiliation' && (
            <FormStack key="affiliation">
              <FormHeadline id="onboarding-title">Let’s set up your dashboard</FormHeadline>
              <FormSubhead>
                Your home team centers Explore — past match recaps, strengths and failures, and
                upcoming prep.
              </FormSubhead>
              <LightFields>
                <Dropdown
                  label="Affiliation type"
                  value={draft.affiliationKind}
                  onValueChange={(value) => {
                    const kind = value as AffiliationKind;
                    const first = affiliationDropdownOptions(kind)[0];
                    patch({
                      affiliationKind: kind,
                      affiliatedTeamId: first?.value ?? draft.affiliatedTeamId,
                    });
                  }}
                  options={[
                    { label: 'National team', value: 'national' },
                    { label: 'Club team', value: 'club' },
                  ]}
                />
                <Dropdown
                  label={
                    draft.affiliationKind === 'national' ? 'National team' : 'Club team'
                  }
                  value={draft.affiliatedTeamId}
                  onValueChange={(value) => patch({ affiliatedTeamId: value })}
                  options={affiliationOptions}
                  helperText={`Saved as your home · ${getAffiliationOption(draft.affiliatedTeamId).name}`}
                />
                <Dropdown
                  label="What’s your role with the team?"
                  placeholder="Select"
                  value={draft.role || undefined}
                  onValueChange={(value) => patch({ role: value })}
                  options={ROLE_OPTIONS}
                />
                <Dropdown
                  label="What’s your experience level with data analysis?"
                  placeholder="Select"
                  value={draft.experienceLevel || undefined}
                  onValueChange={(value) => patch({ experienceLevel: value })}
                  options={EXPERIENCE_OPTIONS}
                />
                <Dropdown
                  label="What’s your primary goal?"
                  placeholder="Select"
                  value={draft.primaryGoal || undefined}
                  onValueChange={(value) => patch({ primaryGoal: value })}
                  options={GOAL_OPTIONS}
                />
              </LightFields>
              <CheckboxStack>
                <Checkbox
                  label="Get updates when new match data is available."
                  checked={draft.notifyMatchData}
                  onCheckedChange={(checked) => patch({ notifyMatchData: checked === true })}
                />
                <Checkbox
                  label="Only get updates for my team."
                  checked={draft.notifyTeamOnly}
                  onCheckedChange={(checked) => patch({ notifyTeamOnly: checked === true })}
                />
              </CheckboxStack>
              <ActionCluster>
                <Button size="lg" disabled={!affiliationReady} onClick={() => go('preferences')}>
                  Next
                </Button>
                <Button
                  intent="secondary"
                  variant="ghost"
                  startIcon={<ArrowLeft size={ICON_SIZE} />}
                  onClick={() => go('profile')}
                >
                  Back
                </Button>
              </ActionCluster>
              <StepProgress current={onboardingStep} steps={progressSteps} />
            </FormStack>
          )}

          {onboardingStep === 'preferences' && (
            <FormStack key="preferences">
              <FormHeadline id="onboarding-title">Finish your workspace</FormHeadline>
              <FormSubhead>
                Set delivery defaults and how Insight Studio should open for you.
              </FormSubhead>
              <LightFields>
                <Dropdown
                  label="Default landing page"
                  value={draft.defaultHome}
                  onValueChange={(value) => patch({ defaultHome: value })}
                  options={[
                    { label: 'Home', value: 'home' },
                    { label: 'Explore', value: 'explore' },
                    { label: 'Reports', value: 'reports' },
                    { label: 'Templates', value: 'templates' },
                    { label: 'Automations', value: 'automations' },
                  ]}
                />
                <Dropdown
                  label="Default report sharing"
                  value={draft.defaultSharing}
                  onValueChange={(value) => patch({ defaultSharing: value })}
                  options={[
                    { label: 'Private to me', value: 'private' },
                    { label: 'Shared with my team', value: 'team' },
                    { label: 'Anyone with the link', value: 'link' },
                  ]}
                />
                <div>
                  <RadioGroup
                    value={draft.density}
                    onValueChange={(value) => patch({ density: value })}
                    orientation="horizontal"
                    aria-label="Content density"
                  >
                    <Radio value="comfortable" label="Comfortable" />
                    <Radio value="compact" label="Compact" />
                  </RadioGroup>
                </div>
              </LightFields>
              <CheckboxStack>
                <Checkbox
                  label="In-app notifications"
                  checked={draft.inAppNotifications}
                  onCheckedChange={(checked) =>
                    patch({ inAppNotifications: checked === true })
                  }
                />
                <Checkbox
                  label="Email notifications"
                  checked={draft.emailNotifications}
                  onCheckedChange={(checked) =>
                    patch({ emailNotifications: checked === true })
                  }
                />
                <Checkbox
                  label="Open AI panel by default"
                  checked={draft.aiPanelOpen}
                  onCheckedChange={(checked) => patch({ aiPanelOpen: checked === true })}
                />
                <Checkbox
                  label="Show online presence to teammates"
                  checked={draft.sharePresence}
                  onCheckedChange={(checked) => patch({ sharePresence: checked === true })}
                />
              </CheckboxStack>
              <ActionCluster>
                <Button size="lg" onClick={() => completeOnboarding()}>
                  Enter Insight Studio
                </Button>
                <Button
                  intent="secondary"
                  variant="ghost"
                  startIcon={<ArrowLeft size={ICON_SIZE} />}
                  onClick={() => go('affiliation')}
                >
                  Back
                </Button>
              </ActionCluster>
              <StepProgress current={onboardingStep} steps={progressSteps} />
            </FormStack>
          )}
        </FormPane>
      </AuthCard>
    </OnboardingStage>
  );
}

function StepProgress({
  current,
  steps,
}: {
  current: OnboardingStep;
  steps: OnboardingStep[];
}) {
  const currentIdx = stepIndex(current);
  return (
    <StepDots aria-hidden>
      {steps.map((step) => {
        const idx = stepIndex(step);
        return <StepDot key={step} $active={idx === currentIdx} $done={idx < currentIdx} />;
      })}
    </StepDots>
  );
}
