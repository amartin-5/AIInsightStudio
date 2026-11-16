import { Badge, Button, Card, SimpleCard } from '@cake-admin/cakeand';
import {
  ArrowUpRight,
  CalendarDays,
  CircleAlert,
  Sparkles,
  Swords,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
} from 'lucide-react';
import styled, { keyframes } from 'styled-components';

import announceMedia from '../../assets/explore/announce-pitch.jpg';
import cardMedia1 from '../../assets/explore/card-match-1.jpg';
import cardMedia2 from '../../assets/explore/card-match-2.jpg';
import cardMedia3 from '../../assets/explore/card-match-3.jpg';
import heroWaves from '../../assets/explore/hero-stadium.jpg';
import { type ExploreMatch } from '../../demos/wwc2023/exploreProfiles';
import { ICON_SIZE, ICON_SIZE_LG } from '../../iconSize';
import { TeamCrest } from '../../product/teams/TeamCrest';
import { useAppState } from '../AppState';
import {
  PageHeader,
  PageSubtitle,
  PageTitle,
  ScrollArea,
  TitleBlock,
} from '../ui.styles';

const highlightMedia = [cardMedia1, cardMedia3, cardMedia2];

function outcomeTone(outcome: ExploreMatch['outcome']) {
  if (outcome === 'win') return 'green' as const;
  if (outcome === 'loss') return 'destructive' as const;
  return 'amber' as const;
}

export function ExploreView() {
  const { affiliatedTeam, openWorkspace, setNav, snapshot } = useAppState();
  const team = affiliatedTeam;

  const openReport = (reportId?: string) => {
    if (!reportId) {
      setNav('reports');
      return;
    }
    const exists = snapshot.reports.some((r) => r.id === reportId);
    openWorkspace(exists ? reportId : snapshot.activeReportId);
  };

  const recentMatches = team.pastMatches.slice(0, 4);
  const highlightMatches = team.pastMatches.slice(0, 3);
  const nextUp = team.upcoming[0];

  return (
    <ScrollArea>
      <PageHeader>
        <TeamHeader>
          <CrestWell>
            <TeamCrest team={team.crestTeam} size={48} labelled />
          </CrestWell>
          <TitleBlock>
            <TitleRow>
              <PageTitle>{team.name}</PageTitle>
              <Badge
                color={team.kind === 'national' ? 'secondary' : 'blue'}
                tone="subtle"
                dot={false}
              >
                {team.kind === 'national' ? 'National' : 'Club'}
              </Badge>
            </TitleRow>
            <PageSubtitle>
              Explore · Recap recent matches, diagnose form, and prep for what’s next.
            </PageSubtitle>
          </TitleBlock>
        </TeamHeader>
      </PageHeader>

      <PageStack>
        <HeroCard role="region" aria-label={`${team.name} explore`}>
          <HeroMedia
            src={heroWaves}
            alt="Accor Stadium during the FIFA Women’s World Cup 2023 final ceremony"
          />
          <HeroScrim />
          <HeroCopy>
            <HeroEyebrow>Women’s World Cup · Insight Studio</HeroEyebrow>
            <HeroTitle>Recap. Diagnose. Prep.</HeroTitle>
            <HeroBody>{team.tagline}</HeroBody>
            <HeroActions>
              <Button
                size="md"
                endIcon={<ArrowUpRight size={ICON_SIZE} />}
                onClick={() => openReport(team.reportId)}
              >
                Open {team.name} report
              </Button>
            </HeroActions>
          </HeroCopy>
        </HeroCard>

        <MetricsStrip>
          <MetricTile>
            <IconWell $tone="primary">
              <Trophy size={ICON_SIZE_LG} aria-hidden />
            </IconWell>
            <MetricCopy>
              <MetricLabel>Record</MetricLabel>
              <MetricValue>{team.record}</MetricValue>
            </MetricCopy>
          </MetricTile>
          <MetricTile>
            <IconWell $tone="success">
              <Target size={ICON_SIZE_LG} aria-hidden />
            </IconWell>
            <MetricCopy>
              <MetricLabel>Win rate</MetricLabel>
              <MetricValue>{team.winRate}%</MetricValue>
            </MetricCopy>
          </MetricTile>
          <MetricTile>
            <IconWell $tone="info">
              <Swords size={ICON_SIZE_LG} aria-hidden />
            </IconWell>
            <MetricCopy>
              <MetricLabel>Goals F–A</MetricLabel>
              <MetricValue>
                {team.goalsFor}–{team.goalsAgainst}
              </MetricValue>
            </MetricCopy>
          </MetricTile>
          <MetricTile>
            <IconWell $tone="warn">
              <Sparkles size={ICON_SIZE_LG} aria-hidden />
            </IconWell>
            <MetricCopy>
              <MetricLabel>Expected goals</MetricLabel>
              <MetricValue>{team.xg}</MetricValue>
            </MetricCopy>
          </MetricTile>
        </MetricsStrip>

        <OutlookCard aria-label="Team outlook">
          <OutlookIntro>
            <SectionKicker>Form diagnosis</SectionKicker>
            <PanelTitle>Team outlook</PanelTitle>
            <PanelBody>
              What {team.name} is doing well, where form is leaking, and how to prep the next
              fixture.
            </PanelBody>
          </OutlookIntro>

          <OutlookGrid>
            <OutlookColumn $tone="success">
              <ColumnHeader>
                <IconWell $tone="success">
                  <TrendingUp size={ICON_SIZE_LG} aria-hidden />
                </IconWell>
                <ColumnTitle>Strengths</ColumnTitle>
              </ColumnHeader>
              <InsightList>
                {team.strengths.map((item, index) => (
                  <InsightItem key={item.id} $tone="success">
                    <InsightIndex aria-hidden>{index + 1}</InsightIndex>
                    <InsightCopy>
                      <InsightTitle>{item.title}</InsightTitle>
                      <InsightDetail>{item.detail}</InsightDetail>
                    </InsightCopy>
                  </InsightItem>
                ))}
              </InsightList>
            </OutlookColumn>

            <OutlookColumn $tone="error">
              <ColumnHeader>
                <IconWell $tone="error">
                  <TrendingDown size={ICON_SIZE_LG} aria-hidden />
                </IconWell>
                <ColumnTitle>Failures to fix</ColumnTitle>
              </ColumnHeader>
              <InsightList>
                {team.failures.map((item, index) => (
                  <InsightItem key={item.id} $tone="error">
                    <InsightIndex aria-hidden>{index + 1}</InsightIndex>
                    <InsightCopy>
                      <InsightTitle>{item.title}</InsightTitle>
                      <InsightDetail>{item.detail}</InsightDetail>
                    </InsightCopy>
                  </InsightItem>
                ))}
              </InsightList>
            </OutlookColumn>

            <OutlookColumn $tone="primary">
              <ColumnHeader>
                <IconWell $tone="primary">
                  <CalendarDays size={ICON_SIZE_LG} aria-hidden />
                </IconWell>
                <ColumnTitle>Upcoming prep</ColumnTitle>
              </ColumnHeader>
              {nextUp ? (
                <PrepStack>
                  <UpcomingMatchLine>
                    vs {nextUp.opponent}
                    <Badge color="blue" tone="subtle" dot={false}>
                      {nextUp.competition}
                    </Badge>
                  </UpcomingMatchLine>
                  <PanelBody>
                    {nextUp.when} · {nextUp.venue}
                  </PanelBody>
                  <PrepBlock>
                    <PrepLabel>Focus</PrepLabel>
                    <PanelBody>{nextUp.prepFocus}</PanelBody>
                  </PrepBlock>
                  <PrepBlock>
                    <PrepLabel>
                      <CircleAlert size={ICON_SIZE} aria-hidden /> Watch out
                    </PrepLabel>
                    <PanelBody>{nextUp.watchOut}</PanelBody>
                  </PrepBlock>
                  <PrepMediaFrame>
                    <PrepMedia
                      src={announceMedia}
                      alt="2023 Women’s World Cup final celebration"
                    />
                  </PrepMediaFrame>
                  <Button
                    size="sm"
                    endIcon={<ArrowUpRight size={ICON_SIZE} />}
                    onClick={() => openReport(team.reportId)}
                  >
                    Open prep brief
                  </Button>
                </PrepStack>
              ) : (
                <PanelBody>No upcoming fixtures in this window yet.</PanelBody>
              )}
            </OutlookColumn>
          </OutlookGrid>
        </OutlookCard>

        <RecapCard>
          <RecapHeader>
            <div>
              <SectionKicker>Recent results</SectionKicker>
              <PanelTitle>Past match recap</PanelTitle>
              <PanelBody>
                Scorelines, chance quality, and the takeaway from each night for {team.name}.
              </PanelBody>
            </div>
            <Button
              size="sm"
              endIcon={<ArrowUpRight size={ICON_SIZE} />}
              onClick={() => openReport(team.reportId)}
            >
              Full match review
            </Button>
          </RecapHeader>

          <PathList>
            {recentMatches.map((match) => (
              <PathItem key={match.id} $outcome={match.outcome}>
                <PathTeams>
                  <TeamCrest team={team.crestTeam} size={40} />
                  <VsMark aria-hidden>vs</VsMark>
                  <TeamCrest team={match.opponent} size={40} />
                </PathTeams>
                <PathMeta>
                  <PathRound>
                    {match.round} · {match.competition}
                  </PathRound>
                  <PathResult>
                    vs {match.opponent} · {match.result}
                  </PathResult>
                  <PathNote>{match.takeaway}</PathNote>
                </PathMeta>
                <PathAside>
                  <Badge color={outcomeTone(match.outcome)} tone="subtle" dot={false}>
                    {match.outcome}
                  </Badge>
                  <PathStats>
                    <StatChip>{match.xg} xG</StatChip>
                    <StatChip>{match.possession} poss.</StatChip>
                  </PathStats>
                </PathAside>
              </PathItem>
            ))}
          </PathList>
        </RecapCard>

        {highlightMatches.length > 0 && (
          <HighlightsSection>
            <OutlookIntro>
              <SectionKicker>Match stories</SectionKicker>
              <PanelTitle>Highlight reels</PanelTitle>
              <PanelBody>Jump back into the nights that shaped the knockout path.</PanelBody>
            </OutlookIntro>
            <HighlightGrid>
              {highlightMatches.map((match, index) => (
                <HighlightCard key={match.id}>
                  <Card>
                    <SimpleCard
                      media={
                        <CardMedia
                          src={highlightMedia[index] ?? cardMedia1}
                          alt={`Women’s World Cup 2023 atmosphere — ${match.round} vs ${match.opponent}`}
                        />
                      }
                      title={`${match.round} — ${match.result}`}
                      body={match.takeaway}
                      actions={
                        <Button
                          size="sm"
                          endIcon={<ArrowUpRight size={ICON_SIZE} />}
                          onClick={() => openReport(team.reportId)}
                        >
                          Review match
                        </Button>
                      }
                    />
                  </Card>
                </HighlightCard>
              ))}
            </HighlightGrid>
          </HighlightsSection>
        )}
      </PageStack>
    </ScrollArea>
  );
}

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TeamHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-400);
  min-width: 0;
  flex: 1 1 auto;
`;

const CrestWell = styled.div`
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  border-radius: var(--radius-1000);
  background: var(--color-primary-primary-overlay);
  box-shadow: var(--elevation-1);
`;

const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-150);
`;

const PageStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-700);
`;

const HeroCard = styled.article`
  position: relative;
  min-height: 340px;
  overflow: hidden;
  border-radius: var(--radius-400);
  box-shadow: var(--elevation-3);
  animation: ${riseIn} 420ms ease-out both;
  /* TokenHub Explore hero stops — not available as named tokens */
  background-image: linear-gradient(
    150deg,
    rgb(4, 27, 149) 9%,
    rgb(21, 49, 198) 43%,
    rgb(83, 103, 246) 42%,
    rgb(89, 177, 255) 75%
  );

  @media (max-width: 720px) {
    min-height: 260px;
  }
`;

const HeroMedia = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
  pointer-events: none;
  transform: scale(1.02);
`;

const HeroScrim = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
    115deg,
    color-mix(in srgb, var(--color-primary-primary-press) 88%, transparent) 8%,
    color-mix(in srgb, var(--color-primary-primary-press) 42%, transparent) 48%,
    transparent 78%
  );
`;

const HeroCopy = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-250);
  max-width: 42rem;
  padding: var(--space-700) var(--space-600);
`;

const HeroEyebrow = styled.span`
  color: var(--color-text-icon-on-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h2`
  margin: 0;
  color: var(--color-text-icon-inverse);
  font-family: var(--font-family);
  font-size: var(--type-size-hero);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.6px;
  line-height: 1.15;
`;

const HeroBody = styled.p`
  margin: 0;
  max-width: 40ch;
  color: var(--color-text-icon-on-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-title);
  font-weight: var(--font-weight-regular);
  line-height: 1.4;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-200);
  margin-top: var(--space-100);
`;

const MetricsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-300);
  animation: ${riseIn} 480ms ease-out both;
  animation-delay: 60ms;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const MetricTile = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-300);
  min-width: 0;
  padding: var(--space-400);
  border-radius: var(--radius-400);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-1);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--elevation-3);
  }
`;

const IconWell = styled.div<{ $tone: 'primary' | 'success' | 'error' | 'info' | 'warn' }>`
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-200);
  color: ${(p) =>
    p.$tone === 'success'
      ? 'var(--color-success-success)'
      : p.$tone === 'error'
        ? 'var(--color-error-error)'
        : p.$tone === 'info'
          ? 'var(--color-info-info)'
          : p.$tone === 'warn'
            ? 'var(--color-warning-warn)'
            : 'var(--color-primary-primary)'};
  background: ${(p) =>
    p.$tone === 'success'
      ? 'var(--color-success-success-overlay)'
      : p.$tone === 'error'
        ? 'var(--color-error-error-overlay)'
        : p.$tone === 'info'
          ? 'var(--color-info-info-overlay)'
          : p.$tone === 'warn'
            ? 'var(--color-warning-warn-overlay)'
            : 'var(--color-primary-primary-overlay)'};
`;

const MetricCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-050);
  min-width: 0;
`;

const MetricLabel = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.35;
`;

const MetricValue = styled.span`
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-greeting);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.5px;
  line-height: 1.1;
`;

const OutlookCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-500);
  padding: var(--space-600);
  border-radius: var(--radius-400);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-2);
  animation: ${riseIn} 520ms ease-out both;
  animation-delay: 100ms;
`;

const OutlookIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-100);
  max-width: 52ch;
`;

const SectionKicker = styled.span`
  color: var(--color-primary-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const OutlookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-400);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const OutlookColumn = styled.div<{ $tone: 'success' | 'error' | 'primary' }>`
  display: flex;
  flex-direction: column;
  gap: var(--space-400);
  min-width: 0;
  padding: var(--space-500);
  border-radius: var(--radius-400);
  border: var(--stroke-100) solid transparent;
  background: ${(p) =>
    p.$tone === 'success'
      ? 'var(--color-success-success-overlay)'
      : p.$tone === 'error'
        ? 'var(--color-error-error-overlay)'
        : 'var(--color-primary-primary-overlay)'};
`;

const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-200);
  color: var(--color-text-icon-primary);
`;

const ColumnTitle = styled.h3`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subtitle);
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
`;

const PanelTitle = styled.h2`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-page);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.3px;
  line-height: 1.25;
`;

const PanelBody = styled.p`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.45;
`;

const InsightList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-250);
`;

const InsightItem = styled.div<{ $tone: 'success' | 'error' }>`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-200);
  align-items: start;
  padding: var(--space-300);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-low);
  border-left: var(--stroke-300) solid
    ${(p) =>
      p.$tone === 'success' ? 'var(--color-success-success)' : 'var(--color-error-error)'};
`;

const InsightIndex = styled.span`
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-1000);
  background: var(--color-surfaces-on-container-high);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
`;

const InsightCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-050);
  min-width: 0;
`;

const InsightTitle = styled.span`
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
`;

const InsightDetail = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.45;
`;

const PrepStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-250);
`;

const UpcomingMatchLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-150);
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-title);
  font-weight: var(--font-weight-bold);
  line-height: 1.3;
`;

const PrepBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-075);
  width: 100%;
  padding: var(--space-250);
  border-radius: var(--radius-200);
  background: var(--color-surfaces-container);
`;

const PrepLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--space-050);
  color: var(--color-primary-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const PrepMediaFrame = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-300);
  box-shadow: var(--elevation-1);
`;

const PrepMedia = styled.img`
  display: block;
  width: 100%;
  height: 140px;
  object-fit: cover;
`;

const RecapCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-500);
  padding: var(--space-600);
  border-radius: var(--radius-400);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-2);
  animation: ${riseIn} 560ms ease-out both;
  animation-delay: 140ms;
`;

const RecapHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-300);
`;

const PathList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-250);
`;

const PathItem = styled.div<{ $outcome: ExploreMatch['outcome'] }>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-400);
  align-items: center;
  padding: var(--space-400);
  border-radius: var(--radius-400);
  background: var(--color-surfaces-on-container-high);
  border-left: var(--stroke-300) solid
    ${(p) =>
      p.$outcome === 'win'
        ? 'var(--color-success-success)'
        : p.$outcome === 'loss'
          ? 'var(--color-error-error)'
          : 'var(--color-warning-warn)'};
  box-shadow: var(--elevation-low);
  transition:
    transform 160ms ease,
    box-shadow 160ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--elevation-2);
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const PathTeams = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-150);
`;

const VsMark = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
`;

const PathMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-075);
  min-width: 0;
`;

const PathRound = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const PathResult = styled.span`
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subtitle);
  font-weight: var(--font-weight-bold);
  line-height: 1.3;
`;

const PathNote = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.45;
`;

const PathAside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-150);

  @media (max-width: 720px) {
    align-items: flex-start;
  }
`;

const PathStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-100);
  justify-content: flex-end;

  @media (max-width: 720px) {
    justify-content: flex-start;
  }
`;

const StatChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: var(--space-050) var(--space-150);
  border-radius: var(--radius-1000);
  background: var(--color-surfaces-container);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
  line-height: 1.35;
`;

const HighlightsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-400);
  animation: ${riseIn} 600ms ease-out both;
  animation-delay: 180ms;
`;

const HighlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-500);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightCard = styled.div`
  min-width: 0;
  transition:
    transform 180ms ease,
    filter 180ms ease;

  &:hover {
    transform: translateY(-4px);
  }

  & > div {
    height: 100%;
    box-shadow: var(--elevation-2);
  }
`;

const CardMedia = styled.img`
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center 40%;
`;
