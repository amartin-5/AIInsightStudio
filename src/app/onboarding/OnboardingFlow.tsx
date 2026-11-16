import { useMemo, useState } from 'react';
import { Button, Checkbox, Dropdown, IconButton, TextInput } from '@cake-admin/cakeand';
import { ArrowLeft, Sparkles, X } from 'lucide-react';

import {
  affiliationDropdownOptions,
  getAffiliationOption,
  type AffiliationKind,
} from '../../demos/wwc2023/exploreProfiles';
import heroDataWave from '../../assets/onboarding/hero-data-wave.jpg';
import { useAppState } from '../AppState';
import {
  GOAL_OPTIONS,
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
  OptionalNote,
  SignInBody,
  SignInFooter,
  SignInStack,
  StepDot,
  StepDots,
  TitleGroup,
} from './onboarding.styles';
import { ICON_SIZE, ICON_SIZE_LG } from '../../iconSize';

const FLOW_STEPS: OnboardingStep[] = [
  'welcome',
  'sign-in',
  'affiliation',
  'about',
  'optional',
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
  const teamOptions = useMemo(() => affiliationDropdownOptions(), []);

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
    go('affiliation');
  };

  const affiliationReady = Boolean(draft.affiliatedTeamId);
  const aboutReady = draft.displayName.trim().length > 1;

  const showPhoto = onboardingStep !== 'welcome';
  const progressSteps = FLOW_STEPS.filter((s) => s !== 'welcome' && s !== 'sign-in');

  const selectTeam = (id: string) => {
    const option = getAffiliationOption(id);
    patch({
      affiliatedTeamId: option.id,
      affiliationKind: option.kind as AffiliationKind,
    });
  };

  return (
    <OnboardingStage>
      <AuthCard role="dialog" aria-labelledby="onboarding-title">
        <BrandPane $variant={showPhoto ? 'photo' : 'mark'}>
          {showPhoto ? (
            <>
              <BrandPhoto src={heroDataWave} alt="" />
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
              <TitleGroup>
                <FormHeadline id="onboarding-title">
                  Welcome to the future of performance intelligence.
                </FormHeadline>
                <FormSubhead>Your analysis journey starts here.</FormSubhead>
              </TitleGroup>
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
                <TitleGroup>
                  <FormHeadline id="onboarding-title">Sign in</FormHeadline>
                </TitleGroup>
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

          {onboardingStep === 'affiliation' && (
            <FormStack key="affiliation">
              <TitleGroup>
                <FormHeadline id="onboarding-title">Choose your home team</FormHeadline>
                <FormSubhead>
                  Pick the national team or club that should center Explore. You can still browse
                  other teams later.
                </FormSubhead>
              </TitleGroup>
              <LightFields>
                <Dropdown
                  label="Team or club"
                  required
                  placeholder="Select a team"
                  value={draft.affiliatedTeamId}
                  onValueChange={selectTeam}
                  options={teamOptions}
                  helperText={`Home affiliation · ${getAffiliationOption(draft.affiliatedTeamId).name}`}
                />
              </LightFields>
              <ActionCluster>
                <Button size="lg" disabled={!affiliationReady} onClick={() => go('about')}>
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

          {onboardingStep === 'about' && (
            <FormStack key="about">
              <TitleGroup>
                <FormHeadline id="onboarding-title">About you</FormHeadline>
                <FormSubhead>
                  A display name for sharing, plus your title and what you need from Insight Studio.
                </FormSubhead>
              </TitleGroup>
              <LightFields>
                <TextInput
                  label="Display name"
                  required
                  value={draft.displayName}
                  onChange={(e) => patch({ displayName: e.target.value })}
                  placeholder="Name"
                />
                <TextInput
                  label="Job title"
                  value={draft.jobTitle}
                  onChange={(e) => patch({ jobTitle: e.target.value })}
                  placeholder="Performance Analyst"
                />
                <Dropdown
                  label="What do you need most?"
                  placeholder="Select"
                  value={draft.primaryGoal || undefined}
                  onValueChange={(value) => patch({ primaryGoal: value })}
                  options={GOAL_OPTIONS}
                />
              </LightFields>
              <ActionCluster>
                <Button size="lg" disabled={!aboutReady} onClick={() => go('optional')}>
                  Next
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

          {onboardingStep === 'optional' && (
            <FormStack key="optional">
              <TitleGroup>
                <FormHeadline id="onboarding-title">Stay in the loop</FormHeadline>
                <FormSubhead>Optional — adjust anytime in Settings.</FormSubhead>
                <OptionalNote>All of these can be skipped.</OptionalNote>
              </TitleGroup>
              <CheckboxStack>
                <Checkbox
                  label="Get updates when new match data is available"
                  checked={draft.notifyMatchData}
                  onCheckedChange={(checked) => patch({ notifyMatchData: checked === true })}
                />
                <Checkbox
                  label="Only get updates for my team"
                  checked={draft.notifyTeamOnly}
                  onCheckedChange={(checked) => patch({ notifyTeamOnly: checked === true })}
                />
                <Checkbox
                  label="Email me important alerts"
                  checked={draft.emailNotifications}
                  onCheckedChange={(checked) =>
                    patch({ emailNotifications: checked === true })
                  }
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
                  onClick={() => go('about')}
                >
                  Back
                </Button>
              </ActionCluster>
              <GhostLink type="button" onClick={() => completeOnboarding()}>
                <strong>Skip for now</strong>
              </GhostLink>
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
