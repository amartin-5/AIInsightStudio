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
import styled from 'styled-components';

import announceMedia from '../../assets/explore/announce-pitch.jpg';
import cardMedia1 from '../../assets/explore/card-match-1.jpg';
import cardMedia2 from '../../assets/explore/card-match-2.jpg';
import cardMedia3 from '../../assets/explore/card-match-3.jpg';
import heroWaves from '../../assets/explore/hero-stadium.jpg';
import { type ExploreMatch } from '../../demos/wwc2023/exploreProfiles';
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
          <TeamCrest team={team.crestTeam} size={48} labelled />
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
            <HeroTitle>Recap. Diagnose. Prep.</HeroTitle>
            <HeroBody>{team.tagline}</HeroBody>
          </HeroCopy>
        </HeroCard>

        <MetricsStrip>
          <MetricTile>
            <Trophy size={20} strokeWidth={1.75} aria-hidden />
            <MetricLabel>Record</MetricLabel>
            <MetricValue>{team.record}</MetricValue>
          </MetricTile>
          <MetricTile>
            <Target size={20} strokeWidth={1.75} aria-hidden />
            <MetricLabel>Win rate</MetricLabel>
            <MetricValue>{team.winRate}%</MetricValue>
          </MetricTile>
          <MetricTile>
            <Swords size={20} strokeWidth={1.75} aria-hidden />
            <MetricLabel>Goals F–A</MetricLabel>
            <MetricValue>
              {team.goalsFor}–{team.goalsAgainst}
            </MetricValue>
          </MetricTile>
          <MetricTile>
            <Sparkles size={20} strokeWidth={1.75} aria-hidden />
            <MetricLabel>xG</MetricLabel>
            <MetricValue>{team.xg}</MetricValue>
          </MetricTile>
          <MetricsActions>
            <Button
              size="sm"
              endIcon={<ArrowUpRight size={16} />}
              onClick={() => openReport(team.reportId)}
            >
              Open report
            </Button>
          </MetricsActions>
        </MetricsStrip>

        <OutlookCard aria-label="Team outlook">
          <OutlookIntro>
            <PanelTitle>Team outlook</PanelTitle>
            <PanelBody>
              What {team.name} is doing well, where form is leaking, and how to prep the next
              fixture.
            </PanelBody>
          </OutlookIntro>

          <OutlookGrid>
            <OutlookColumn>
              <ColumnHeader>
                <TrendingUp size={20} strokeWidth={1.75} aria-hidden />
                <ColumnTitle>Strengths</ColumnTitle>
              </ColumnHeader>
              <InsightList>
                {team.strengths.map((item) => (
                  <InsightItem key={item.id}>
                    <InsightTitle>{item.title}</InsightTitle>
                    <InsightDetail>{item.detail}</InsightDetail>
                  </InsightItem>
                ))}
              </InsightList>
            </OutlookColumn>

            <OutlookColumn>
              <ColumnHeader>
                <TrendingDown size={20} strokeWidth={1.75} aria-hidden />
                <ColumnTitle>Failures to fix</ColumnTitle>
              </ColumnHeader>
              <InsightList>
                {team.failures.map((item) => (
                  <InsightItem key={item.id}>
                    <InsightTitle>{item.title}</InsightTitle>
                    <InsightDetail>{item.detail}</InsightDetail>
                  </InsightItem>
                ))}
              </InsightList>
            </OutlookColumn>

            <OutlookColumn $accent>
              <ColumnHeader>
                <CalendarDays size={20} strokeWidth={1.75} aria-hidden />
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
                      <CircleAlert size={14} strokeWidth={2} aria-hidden /> Watch out
                    </PrepLabel>
                    <PanelBody>{nextUp.watchOut}</PanelBody>
                  </PrepBlock>
                  <PrepMedia
                    src={announceMedia}
                    alt="2023 Women’s World Cup final celebration"
                  />
                  <Button
                    size="sm"
                    endIcon={<ArrowUpRight size={16} />}
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
              <PanelTitle>Past match recap</PanelTitle>
              <PanelBody>
                Recent results for {team.name} — scorelines, chance quality, and the takeaway
                from each night.
              </PanelBody>
            </div>
            <Button
              size="sm"
              endIcon={<ArrowUpRight size={16} />}
              onClick={() => openReport(team.reportId)}
            >
              Full match review
            </Button>
          </RecapHeader>

          <PathList>
            {recentMatches.map((match) => (
              <PathItem key={match.id}>
                <PathTeams>
                  <TeamCrest team={team.crestTeam} size={36} />
                  <TeamCrest team={match.opponent} size={36} />
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
                    <span>{match.xg} xG</span>
                    <span>{match.possession} poss.</span>
                  </PathStats>
                </PathAside>
              </PathItem>
            ))}
          </PathList>
        </RecapCard>

        {highlightMatches.length > 0 && (
          <HighlightGrid>
            {highlightMatches.map((match, index) => (
              <Card key={match.id}>
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
                      endIcon={<ArrowUpRight size={16} />}
                      onClick={() => openReport(team.reportId)}
                    >
                      Review match
                    </Button>
                  }
                />
              </Card>
            ))}
          </HighlightGrid>
        )}
      </PageStack>
    </ScrollArea>
  );
}

const TeamHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-300);
  min-width: 0;
  flex: 1 1 auto;
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
  gap: var(--space-500);
`;

const HeroCard = styled.article`
  position: relative;
  min-height: 280px;
  overflow: hidden;
  border-radius: var(--radius-400);
  box-shadow: var(--elevation-0);
  /* TokenHub Explore hero stops — not available as named tokens */
  background-image: linear-gradient(
    150deg,
    rgb(4, 27, 149) 9%,
    rgb(21, 49, 198) 43%,
    rgb(83, 103, 246) 42%,
    rgb(89, 177, 255) 75%
  );

  @media (max-width: 720px) {
    min-height: 220px;
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
`;

const HeroScrim = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
    180deg,
    transparent 0%,
    color-mix(in srgb, var(--color-primary-primary-press) 60%, transparent) 70%,
    color-mix(in srgb, var(--color-primary-primary-press) 80%, transparent) 100%
  );
`;

const HeroCopy = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-200);
  padding: var(--space-600);
`;

const HeroTitle = styled.h2`
  margin: 0;
  color: var(--color-text-icon-inverse);
  font-family: var(--font-family);
  font-size: var(--type-size-hero);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.6px;
  line-height: 1.35;
`;

const HeroBody = styled.p`
  margin: 0;
  max-width: 48ch;
  color: var(--color-text-icon-inverse);
  font-family: var(--font-family);
  font-size: var(--type-size-title);
  font-weight: var(--font-weight-regular);
  line-height: 1.35;
`;

const MetricsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr)) auto;
  gap: var(--space-200);
  align-items: stretch;
  padding: var(--space-300);
  border-radius: var(--radius-400);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-0);

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const MetricTile = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-050);
  min-width: 0;
  padding: var(--space-300);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-on-container);
  color: var(--color-text-icon-primary);
`;

const MetricLabel = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  line-height: 1.35;
`;

const MetricValue = styled.span`
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-title);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.4px;
  line-height: 1.35;
`;

const MetricsActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: var(--space-200);

  @media (max-width: 960px) {
    grid-column: 1 / -1;
    justify-content: flex-start;
  }
`;

const OutlookCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-400);
  padding: var(--space-500);
  border-radius: var(--radius-400);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-0);
`;

const OutlookIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-100);
`;

const OutlookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-300);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const OutlookColumn = styled.div<{ $accent?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  min-width: 0;
  padding: var(--space-400);
  border-radius: var(--radius-300);
  border: var(--stroke-100) solid var(--color-stroke-border);
  background: ${(p) =>
    p.$accent
      ? 'var(--color-primary-primary-overlay)'
      : 'var(--color-surfaces-on-container)'};
`;

const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-100);
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
  font-size: var(--type-size-subtitle);
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
`;

const PanelBody = styled.p`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.35;
`;

const InsightList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-200);
`;

const InsightItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-050);
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
  line-height: 1.35;
`;

const PrepStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-200);
`;

const UpcomingMatchLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-150);
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-bold);
`;

const PrepBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-050);
`;

const PrepLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--space-050);
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.2px;
  text-transform: uppercase;
`;

const PrepMedia = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: var(--radius-300);
`;

const RecapCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-400);
  padding: var(--space-500);
  border-radius: var(--radius-400);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-0);
`;

const RecapHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-300);
`;

const PathList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
`;

const PathItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-300);
  align-items: center;
  padding: var(--space-300);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-300);
  background: var(--color-surfaces-on-container);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const PathTeams = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-100);
`;

const PathMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-050);
  min-width: 0;
`;

const PathRound = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.2px;
  text-transform: uppercase;
`;

const PathResult = styled.span`
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-subject);
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
`;

const PathNote = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  line-height: 1.35;
`;

const PathAside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-100);

  @media (max-width: 720px) {
    align-items: flex-start;
  }
`;

const PathStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-050);
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  text-align: right;

  @media (max-width: 720px) {
    text-align: left;
  }
`;

const HighlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-500);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const CardMedia = styled.img`
  display: block;
  width: 100%;
  height: 180px;
  object-fit: cover;
  object-position: center 40%;
`;
