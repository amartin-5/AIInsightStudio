import type { ReactNode } from 'react';

import {
  ActionGrid,
  BarChart,
  BuildUpPitch,
  ComparisonBars,
  DATAVIS,
  DistanceMarker,
  DonutChart,
  HeatmapPitch,
  LineAreaChart,
  MomentumChart,
  PassMap,
  PitchDiagram,
  RadarChart,
  ScatterChart,
  StackedBarChart,
  ZoneTerritory,
} from '../charts';
import {
  englandGoals,
  englandOpponents,
  englandPitchPlayers,
  englandPossession,
  englandShots,
  englandXg,
} from '../charts/chartCatalog';
import { AiInsightCard } from './AiInsightCard';
import { EventTimeline } from './EventTimeline';
import { FactorBars } from './FactorBars';
import { FormGuide } from './FormGuide';
import { GoalTimeline } from './GoalTimeline';
import { HeadToHead } from './HeadToHead';
import { KpiStatRow } from './KpiStatRow';
import { MatchScoreboard } from './MatchScoreboard';
import { MirrorStatBars } from './MirrorStatBars';
import { PlayerSpotlight } from './PlayerSpotlight';
import { PossessionSplit } from './PossessionSplit';
import { VideoWidget } from './VideoWidget';
import { englandPlayers } from '../../demos/wwc2023/dataset';

export type WidgetCategory =
  | 'Charts'
  | 'Spatial'
  | 'Match'
  | 'Media'
  | 'AI insights'
  | 'Players';

export type WidgetLibraryEntry = {
  id: string;
  title: string;
  description: string;
  category: WidgetCategory;
  /** Optional chart catalog key when pinning into a report. */
  chartId?: string;
  render: () => ReactNode;
};

const momentumMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];
const englandMomentum = [2, 3, 4, 3, 5, 6, 4, 3, 5, 7, 6, 8, 5, 4, 6, 7, 5, 4, 3];
const spainMomentum = [3, 2, 4, 5, 3, 4, 6, 5, 4, 3, 5, 4, 6, 7, 5, 4, 6, 5, 4];

const scatterPoints = [
  { x: 1.2, y: 1.4, name: 'Haiti' },
  { x: 0.9, y: 1.1, name: 'Denmark' },
  { x: 3.1, y: 3.4, name: 'China PR' },
  { x: 1.4, y: 1.6, name: 'Nigeria' },
  { x: 1.6, y: 1.8, name: 'Colombia' },
  { x: 1.9, y: 2.1, name: 'Australia' },
  { x: 0.7, y: 0.9, name: 'Spain' },
  { x: 2.2, y: 1.8, name: 'Chance A' },
  { x: 1.1, y: 2.4, name: 'Chance B' },
  { x: 2.8, y: 2.2, name: 'Chance C' },
  { x: 0.5, y: 0.6, name: 'Chance D' },
  { x: 1.8, y: 1.2, name: 'Chance E' },
];

const heatBlobs = [
  { x: 28, y: 42, intensity: 0.9 },
  { x: 46, y: 38, intensity: 0.7 },
  { x: 62, y: 48, intensity: 0.85 },
  { x: 74, y: 36, intensity: 0.55 },
  { x: 38, y: 58, intensity: 0.45 },
  { x: 55, y: 62, intensity: 0.35 },
];

const passArrows = [
  { x1: 18, y1: 55, x2: 34, y2: 42, kind: 'complete' as const },
  { x1: 34, y1: 42, x2: 52, y2: 36, kind: 'complete' as const },
  { x1: 52, y1: 36, x2: 68, y2: 28, kind: 'assist' as const },
  { x1: 24, y1: 68, x2: 40, y2: 60, kind: 'complete' as const },
  { x1: 40, y1: 60, x2: 58, y2: 70, kind: 'incomplete' as const },
  { x1: 30, y1: 30, x2: 48, y2: 22, kind: 'complete' as const },
  { x1: 48, y1: 50, x2: 70, y2: 44, kind: 'complete' as const },
  { x1: 60, y1: 62, x2: 78, y2: 50, kind: 'incomplete' as const },
];

const actionCells = [
  [0.2, 0.35, 0.55, 0.7, 0.8, 0.65, 0.4, 0.25],
  [0.3, 0.5, 0.75, 0.9, 0.95, 0.85, 0.55, 0.35],
  [0.25, 0.45, 0.7, 0.85, 0.9, 0.75, 0.5, 0.3],
  [0.15, 0.3, 0.5, 0.65, 0.7, 0.55, 0.35, 0.2],
  [0.1, 0.2, 0.35, 0.45, 0.5, 0.4, 0.25, 0.15],
  [0.05, 0.12, 0.2, 0.28, 0.3, 0.22, 0.14, 0.08],
];

/** Reusable Women’s World Cup 2023 samples for every widget type. */
export const WIDGET_LIBRARY: WidgetLibraryEntry[] = [
  {
    id: 'ai-replay-video',
    title: 'AI replay video',
    description: 'Match clip / AI replay preview with play control.',
    category: 'Media',
    render: () => (
      <VideoWidget
        title="Vinícius Jr. late equalizer — AI replay"
        subtitle="England path sample · Final third transition · 84'"
        duration="0:48"
        ariaLabel="Play AI replay of late equalizer"
      />
    ),
  },
  {
    id: 'matchday-live-video',
    title: 'Matchday live stream',
    description: 'Live stream frame with viewer-ready controls.',
    category: 'Media',
    render: () => (
      <VideoWidget
        title="England vs Spain — live feed"
        subtitle="Women’s World Cup final · Sydney"
        duration="LIVE"
        live
        ariaLabel="Play England versus Spain live stream preview"
      />
    ),
  },
  {
    id: 'match-scoreboard',
    title: 'Match scoreboard',
    description: 'Compact match status strip with live state.',
    category: 'Match',
    render: () => (
      <MatchScoreboard
        homeTeam="England"
        awayTeam="Spain"
        homeScore={0}
        awayScore={1}
        status="FT"
        meta="Final · Sydney"
        ariaLabel="England versus Spain final score"
      />
    ),
  },
  {
    id: 'possession-split',
    title: 'Possession split',
    description: 'Dual horizontal share bars for two teams.',
    category: 'Match',
    render: () => (
      <div style={{ display: 'grid', gap: 'var(--space-300)' }}>
        <PossessionSplit
          leftLabel="England"
          rightLabel="Spain"
          leftValue={48}
          rightValue={52}
          leftColor={DATAVIS.indigo}
          rightColor={DATAVIS.gold}
          ariaLabel="England versus Spain possession"
        />
        <PossessionSplit
          leftLabel="England shots"
          rightLabel="Spain shots"
          leftValue={9}
          rightValue={16}
          leftColor={DATAVIS.indigo}
          rightColor={DATAVIS.gold}
          unit=""
          ariaLabel="England versus Spain shots"
        />
      </div>
    ),
  },
  {
    id: 'event-timeline',
    title: 'Event timeline',
    description: 'Key match events with minute badges.',
    category: 'Match',
    render: () => (
      <EventTimeline
        ariaLabel="England final key events"
        events={[
          { id: 'e1', minute: "29'", text: 'Yellow card — England midfielder', tone: 'card' },
          { id: 'e2', minute: "70'", text: 'Substitution — England introduce width', tone: 'sub' },
          { id: 'e3', minute: "86'", text: 'Goal — Spain convert late chance', tone: 'goal' },
        ]}
      />
    ),
  },
  {
    id: 'head-to-head',
    title: 'Head-to-head',
    description: 'Wins / draws / wins with segmented comparison bar.',
    category: 'Match',
    render: () => (
      <HeadToHead
        leftLabel="England"
        rightLabel="Spain"
        leftWins={4}
        draws={3}
        rightWins={5}
        leftColor={DATAVIS.indigo}
        rightColor={DATAVIS.gold}
        ariaLabel="England versus Spain head to head"
      />
    ),
  },
  {
    id: 'form-guide',
    title: 'Form guide',
    description: 'Last-five W/D/L indicators for both sides.',
    category: 'Match',
    render: () => (
      <FormGuide
        leftLabel="England"
        rightLabel="Spain"
        leftForm={['W', 'W', 'W', 'W', 'L']}
        rightForm={['W', 'W', 'W', 'D', 'W']}
        ariaLabel="England and Spain recent form"
      />
    ),
  },
  {
    id: 'mirror-stats',
    title: 'Mirror stat bars',
    description: 'Centered dual-team season or match comparison.',
    category: 'Match',
    render: () => (
      <MirrorStatBars
        leftLabel="England"
        rightLabel="Spain"
        leftColor={DATAVIS.indigo}
        rightColor={DATAVIS.gold}
        ariaLabel="England versus Spain average match stats"
        rows={[
          { label: 'Goals', left: 1.9, right: 2.3, format: (v) => v.toFixed(1) },
          { label: 'Conceded', left: 0.6, right: 0.7, format: (v) => v.toFixed(1) },
          { label: 'Possession', left: 54, right: 61, format: (v) => `${v}%` },
          { label: 'Shots', left: 14, right: 16, format: (v) => String(v) },
          { label: 'On target', left: 5, right: 7, format: (v) => String(v) },
          { label: 'Pass %', left: 86, right: 89, format: (v) => `${v}%` },
        ]}
      />
    ),
  },
  {
    id: 'goal-timeline',
    title: 'Goal timeline',
    description: 'Selectable goal markers across the match clock.',
    category: 'Match',
    render: () => (
      <GoalTimeline
        ariaLabel="England tournament sample goals"
        marks={[
          { id: 'g1', minute: 8, team: 'ENG' },
          { id: 'g2', minute: 23, team: 'ENG' },
          { id: 'g3', minute: 41, team: 'AUS' },
          { id: 'g4', minute: 71, team: 'ENG', selected: true },
          { id: 'g5', minute: 84, team: 'ENG' },
        ]}
      />
    ),
  },
  {
    id: 'bar-chart',
    title: 'Bar chart',
    description: 'Category values with labeled series colors.',
    category: 'Charts',
    chartId: 'england-goals-bar',
    render: () => (
      <BarChart
        categories={englandOpponents}
        values={englandGoals}
        ariaLabel="England goals by match"
        formatLabel={(v) => String(v)}
      />
    ),
  },
  {
    id: 'line-area',
    title: 'Line / area chart',
    description: 'Trend series with filled area.',
    category: 'Charts',
    chartId: 'england-possession-line',
    render: () => (
      <LineAreaChart
        categories={englandOpponents}
        values={englandPossession}
        color={DATAVIS.indigo}
        unit="%"
        ariaLabel="England possession by match"
      />
    ),
  },
  {
    id: 'donut-chart',
    title: 'Donut chart',
    description: 'Segmented ring with in-slice values.',
    category: 'Charts',
    chartId: 'england-shot-donut',
    render: () => (
      <DonutChart
        ariaLabel="England shot outcome mix"
        slices={[
          { label: 'On target', value: 26, color: DATAVIS.blue },
          { label: 'Off target', value: 27, color: DATAVIS.jade },
          { label: 'Blocked', value: 24, color: DATAVIS.cyan },
          { label: 'Woodwork', value: 2, color: DATAVIS.purple },
          { label: 'Saved', value: 21, color: DATAVIS.amber },
        ]}
      />
    ),
  },
  {
    id: 'radar-chart',
    title: 'Radar chart',
    description: 'Multi-axis performance profile.',
    category: 'Charts',
    chartId: 'england-radar',
    render: () => (
      <RadarChart
        ariaLabel="England performance profile"
        indicators={[
          { name: 'Attacking', max: 100 },
          { name: 'Chance quality', max: 100 },
          { name: 'Possession', max: 100 },
          { name: 'Pressing', max: 100 },
          { name: 'Defending', max: 100 },
          { name: 'Set pieces', max: 100 },
        ]}
        values={[78, 64, 72, 61, 82, 70]}
      />
    ),
  },
  {
    id: 'scatter-chart',
    title: 'Scatter chart',
    description: 'Quadrant scatter for chance quality vs volume.',
    category: 'Charts',
    chartId: 'england-xg-scatter',
    render: () => (
      <ScatterChart
        points={scatterPoints}
        xName="Shots xG"
        yName="Goals xG"
        ariaLabel="England chance quality scatter"
      />
    ),
  },
  {
    id: 'momentum-chart',
    title: 'Momentum chart',
    description: 'Mirrored minute-by-minute pressure with event marks.',
    category: 'Charts',
    chartId: 'england-spain-momentum',
    render: () => (
      <MomentumChart
        minutes={momentumMinutes}
        homeValues={englandMomentum}
        awayValues={spainMomentum}
        homeLabel="England"
        awayLabel="Spain"
        homeColor={DATAVIS.jade}
        awayColor={DATAVIS.blue}
        events={[
          { minute: 29, type: 'yellow', team: 'home' },
          { minute: 70, type: 'sub', team: 'home' },
          { minute: 86, type: 'goal', team: 'away' },
        ]}
        ariaLabel="England versus Spain match momentum"
      />
    ),
  },
  {
    id: 'stacked-bars',
    title: 'Stacked bar leaderboard',
    description: 'Horizontal stacked goals and assists by side.',
    category: 'Charts',
    chartId: 'wwc-attack-stacked',
    render: () => (
      <StackedBarChart
        primaryLabel="Goals"
        secondaryLabel="Assists"
        ariaLabel="WWC sample attacking contribution"
        rows={[
          { label: 'England', primary: 13, secondary: 9 },
          { label: 'Spain', primary: 18, secondary: 12 },
          { label: 'Australia', primary: 10, secondary: 7 },
          { label: 'Sweden', primary: 9, secondary: 6 },
          { label: 'Japan', primary: 11, secondary: 8 },
        ]}
      />
    ),
  },
  {
    id: 'comparison-bars',
    title: 'Comparison bars',
    description: 'Group vs knockout efficiency comparison.',
    category: 'Charts',
    chartId: 'england-group-knockout',
    render: () => (
      <ComparisonBars
        leftLabel="Group stage"
        rightLabel="Knockout"
        leftColor={DATAVIS.indigo}
        rightColor={DATAVIS.cyan}
        ariaLabel="England group versus knockout"
        rows={[
          { label: 'Goals / match', left: 2.7, right: 1.3, format: (v) => v.toFixed(1) },
          { label: 'xG / match', left: 2.0, right: 1.6, format: (v) => v.toFixed(1) },
          { label: 'Possession %', left: 58, right: 52, format: (v) => `${v}%` },
          { label: 'Shots / match', left: 15, right: 13, format: (v) => String(v) },
        ]}
      />
    ),
  },
  {
    id: 'xg-bars',
    title: 'Expected goals bars',
    description: 'Per-match xG with series coloring.',
    category: 'Charts',
    chartId: 'england-xg-bar',
    render: () => (
      <BarChart
        categories={englandOpponents}
        values={englandXg}
        colors={[
          DATAVIS.cyan,
          DATAVIS.indigo,
          DATAVIS.jade,
          DATAVIS.amber,
          DATAVIS.pink,
          DATAVIS.gold,
          DATAVIS.blue,
        ]}
        ariaLabel="England expected goals by match"
        formatLabel={(v) => v.toFixed(1)}
      />
    ),
  },
  {
    id: 'shots-line',
    title: 'Shots trend',
    description: 'Shot volume across the tournament path.',
    category: 'Charts',
    chartId: 'england-shots-line',
    render: () => (
      <LineAreaChart
        categories={englandOpponents}
        values={englandShots}
        color={DATAVIS.pink}
        ariaLabel="England shots by match"
      />
    ),
  },
  {
    id: 'factor-bars',
    title: 'Key factor bars',
    description: 'Percent contribution bars for AI analysis factors.',
    category: 'AI insights',
    render: () => (
      <FactorBars
        ariaLabel="England final key factors"
        items={[
          {
            id: 'f1',
            label: 'Chance quality drop — final third entries',
            value: 72,
            color: DATAVIS.red,
          },
          {
            id: 'f2',
            label: 'Spain mid-block denied central lanes',
            value: 58,
            color: DATAVIS.blue,
          },
          {
            id: 'f3',
            label: 'Set-piece threat underdelivered',
            value: 44,
            color: DATAVIS.gold,
          },
        ]}
      />
    ),
  },
  {
    id: 'kpi-stat-row',
    title: 'KPI stat row',
    description: 'Compact metric tiles with tonal hints.',
    category: 'AI insights',
    render: () => (
      <KpiStatRow
        ariaLabel="England pressing KPIs"
        items={[
          { id: 'k1', label: 'Press success', value: '44%', hint: '↓ from 62%', tone: 'negative' },
          { id: 'k2', label: 'Intensity', value: '6.1', hint: 'PPDA', tone: 'accent' },
          { id: 'k3', label: 'Recovery', value: '3.2s', hint: 'avg sprint', tone: 'positive' },
        ]}
      />
    ),
  },
  {
    id: 'ai-insight',
    title: 'AI insight card',
    description: 'Narrative forecast / summary surface.',
    category: 'AI insights',
    render: () => (
      <AiInsightCard
        title="England’s structure held — finishing did not"
        body="England kept a compact rest defence and forced Spain wide for long stretches, but chance quality fell after the hour as central combinations dried up. The decisive moment came from a second-ball situation Spain converted."
      />
    ),
  },
  {
    id: 'pitch-diagram',
    title: 'Pitch lineup',
    description: 'Vertical formation with numbered player nodes.',
    category: 'Spatial',
    chartId: 'england-pitch',
    render: () => (
      <PitchDiagram
        players={englandPitchPlayers}
        formationLabel="4-3-3"
        ariaLabel="England sample lineup shape"
      />
    ),
  },
  {
    id: 'heatmap',
    title: 'Heatmap pitch',
    description: 'Activity density blobs over a horizontal pitch.',
    category: 'Spatial',
    render: () => (
      <HeatmapPitch blobs={heatBlobs} ariaLabel="England final-third activity heatmap" />
    ),
  },
  {
    id: 'pass-map',
    title: 'Pass map',
    description: 'Directional passes with complete / incomplete / assist stats.',
    category: 'Spatial',
    render: () => (
      <PassMap
        passes={passArrows}
        stats={{ complete: 189, incomplete: 64, assist: 11 }}
        ariaLabel="England sample pass map"
      />
    ),
  },
  {
    id: 'zone-territory',
    title: 'Zone territory',
    description: 'Five-lane pitch share comparison.',
    category: 'Spatial',
    render: () => (
      <ZoneTerritory
        leftLabel="ENG"
        rightLabel="ESP"
        leftColor={DATAVIS.blue}
        rightColor={DATAVIS.jade}
        ariaLabel="England versus Spain territory zones"
        leftZones={[
          { percent: 18, count: 41 },
          { percent: 22, count: 49 },
          { percent: 28, count: 63 },
          { percent: 20, count: 44 },
          { percent: 12, count: 27 },
        ]}
        rightZones={[
          { percent: 14, count: 36 },
          { percent: 19, count: 48 },
          { percent: 31, count: 72 },
          { percent: 21, count: 51 },
          { percent: 15, count: 39 },
        ]}
      />
    ),
  },
  {
    id: 'build-up',
    title: 'Build-up box',
    description: 'Measured build-up line dimensions on a vertical pitch.',
    category: 'Spatial',
    render: () => (
      <BuildUpPitch
        widthMeters={42}
        heightMeters={56}
        depthMeters={21}
        ariaLabel="England average build-up shape"
      />
    ),
  },
  {
    id: 'distance-marker',
    title: 'Average distance',
    description: 'Two-point spacing marker on the pitch.',
    category: 'Spatial',
    render: () => (
      <DistanceMarker distanceMeters={14.7} ariaLabel="England average defensive spacing" />
    ),
  },
  {
    id: 'action-grid',
    title: 'Action grid',
    description: 'Pixel intensity grid for attacking-third actions.',
    category: 'Spatial',
    render: () => (
      <ActionGrid cells={actionCells} ariaLabel="England attacking-third action grid" />
    ),
  },
  {
    id: 'player-spotlight',
    title: 'Player spotlight',
    description: 'Player card with key stats for watchlists.',
    category: 'Players',
    render: () => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'var(--space-300)',
        }}
      >
        <PlayerSpotlight
          name="Ava Mercer"
          team="England"
          position="FW"
          initial="A"
          accentColor={DATAVIS.indigo}
          photo={englandPlayers[0]?.photo}
          stats={[
            { label: 'Goals', value: '5' },
            { label: 'Assists', value: '1' },
            { label: 'Minutes', value: '612' },
          ]}
        />
        <PlayerSpotlight
          name="Jordan Blake"
          team="England"
          position="MF"
          initial="J"
          accentColor={DATAVIS.cyan}
          photo={englandPlayers[1]?.photo}
          stats={[
            { label: 'Pass %', value: '87%' },
            { label: 'Recoveries', value: '24' },
            { label: 'Minutes', value: '630' },
          ]}
        />
      </div>
    ),
  },
];

export const WIDGET_CATEGORIES: Array<WidgetCategory | 'All'> = [
  'All',
  'Charts',
  'Spatial',
  'Match',
  'Media',
  'AI insights',
  'Players',
];
