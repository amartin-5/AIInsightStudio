import { BarChart } from './BarChart';
import { ComparisonBars } from './ComparisonBars';
import { DATAVIS } from './datavis';
import { DonutChart } from './DonutChart';
import { HeatmapPitch } from './HeatmapPitch';
import { LineAreaChart } from './LineAreaChart';
import { MomentumChart } from './MomentumChart';
import { PassMap } from './PassMap';
import { PitchDiagram, type PitchPlayer } from './PitchDiagram';
import { RadarChart } from './RadarChart';
import { ScatterChart } from './ScatterChart';
import { StackedBarChart } from './StackedBarChart';
import { ZoneTerritory } from './ZoneTerritory';
import { FactorBars } from '../widgets/FactorBars';
import { FormGuide } from '../widgets/FormGuide';
import { GoalTimeline } from '../widgets/GoalTimeline';
import { HeadToHead } from '../widgets/HeadToHead';
import { MirrorStatBars } from '../widgets/MirrorStatBars';
import { PlayerSpotlight } from '../widgets/PlayerSpotlight';
import { PossessionSplit } from '../widgets/PossessionSplit';

/** Parsed Women’s World Cup 2023 England match series from dataset rows. */
export const englandOpponents = [
  'Haiti',
  'Denmark',
  'China PR',
  'Nigeria',
  'Colombia',
  'Australia',
  'Spain',
];

export const englandGoals = [1, 1, 6, 0, 2, 3, 0];
export const englandPossession = [58, 55, 61, 57, 52, 49, 48];
export const englandShots = [12, 11, 22, 15, 13, 14, 9];
export const englandXg = [1.4, 1.1, 3.4, 1.6, 1.8, 2.1, 0.9];
export const englandConceded = [0, 0, 1, 0, 1, 1, 1];

export const englandPitchPlayers: PitchPlayer[] = [
  { id: 'gk', number: '1', name: 'GK', x: 50, y: 90 },
  { id: 'lb', number: '2', name: 'LB', x: 18, y: 72 },
  { id: 'lcb', number: '5', name: 'LCB', x: 38, y: 76 },
  { id: 'rcb', number: '6', name: 'RCB', x: 62, y: 76 },
  { id: 'rb', number: '3', name: 'RB', x: 82, y: 72 },
  { id: 'lcm', number: '8', name: 'Player B', x: 32, y: 52 },
  { id: 'cm', number: '4', name: 'CDM', x: 50, y: 56 },
  { id: 'rcm', number: '7', name: 'RCM', x: 68, y: 52 },
  { id: 'lw', number: '11', name: 'Player D', x: 22, y: 28 },
  { id: 'st', number: '9', name: 'Player A', x: 50, y: 18 },
  { id: 'rw', number: '10', name: 'RW', x: 78, y: 28 },
];

const spainOpponents = ['Costa Rica', 'Zambia', 'Japan', 'Switzerland', 'Netherlands', 'Sweden', 'England'];
const spainXg = [2.1, 3.0, 1.4, 2.2, 1.9, 1.6, 1.8];

const australiaGoals = [1, 3, 4, 2, 0, 1];
const australiaOpponents = ['Ireland', 'Nigeria', 'Canada', 'Denmark', 'France', 'England'];

export type ChartRenderOptions = {
  leftTeam?: string;
  rightTeam?: string;
};

export function renderChartById(chartId: string, options?: ChartRenderOptions) {
  switch (chartId) {
    case 'england-goals-bar':
      return (
        <BarChart
          categories={englandOpponents}
          values={englandGoals}
          ariaLabel="England goals by match"
          formatLabel={(v) => String(v)}
        />
      );
    case 'england-xg-bar':
      return (
        <BarChart
          categories={englandOpponents}
          values={englandXg}
          colors={[DATAVIS.cyan, DATAVIS.indigo, DATAVIS.jade, DATAVIS.amber, DATAVIS.pink, DATAVIS.gold, DATAVIS.blue]}
          ariaLabel="England expected goals by match"
          formatLabel={(v) => v.toFixed(1)}
        />
      );
    case 'england-possession-line':
      return (
        <LineAreaChart
          categories={englandOpponents}
          values={englandPossession}
          color={DATAVIS.indigo}
          unit="%"
          ariaLabel="England possession by match"
        />
      );
    case 'england-shots-line':
      return (
        <LineAreaChart
          categories={englandOpponents}
          values={englandShots}
          color={DATAVIS.pink}
          ariaLabel="England shots by match"
        />
      );
    case 'england-conceded-bar':
      return (
        <BarChart
          categories={englandOpponents}
          values={englandConceded}
          colors={[DATAVIS.red]}
          ariaLabel="England goals conceded by match"
        />
      );
    case 'england-group-knockout':
      return (
        <ComparisonBars
          leftLabel="Group stage"
          rightLabel="Knockout"
          leftColor={DATAVIS.indigo}
          rightColor={DATAVIS.cyan}
          ariaLabel="England group stage versus knockout comparison"
          rows={[
            { label: 'Goals / match', left: 2.7, right: 1.3, format: (v) => v.toFixed(1) },
            { label: 'xG / match', left: 2.0, right: 1.6, format: (v) => v.toFixed(1) },
            { label: 'Possession %', left: 58, right: 52, format: (v) => `${v}%` },
            { label: 'Shots / match', left: 15, right: 13, format: (v) => String(v) },
            { label: 'Pass accuracy %', left: 88, right: 84, format: (v) => `${v}%` },
          ]}
        />
      );
    case 'england-radar':
      return (
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
      );
    case 'england-pitch':
      return (
        <PitchDiagram
          players={englandPitchPlayers}
          formationLabel="4-3-3"
          ariaLabel="England sample lineup shape"
        />
      );
    case 'spain-xg-bar':
      return (
        <BarChart
          categories={spainOpponents}
          values={spainXg}
          colors={[DATAVIS.gold, DATAVIS.amber, DATAVIS.yellow, DATAVIS.indigo, DATAVIS.cyan, DATAVIS.jade, DATAVIS.pink]}
          ariaLabel="Spain expected goals by match"
          formatLabel={(v) => v.toFixed(1)}
        />
      );
    case 'australia-goals-bar':
      return (
        <BarChart
          categories={australiaOpponents}
          values={australiaGoals}
          ariaLabel="Australia goals by match"
        />
      );
    case 'player-compare-radar':
      return (
        <RadarChart
          ariaLabel="Player comparison profile"
          color={DATAVIS.cyan}
          indicators={[
            { name: 'Goals', max: 10 },
            { name: 'Assists', max: 10 },
            { name: 'Shots', max: 20 },
            { name: 'Passing', max: 100 },
            { name: 'Defense', max: 50 },
            { name: 'Minutes', max: 700 },
          ]}
          values={[5, 1, 18, 78, 12, 612]}
        />
      );
    case 'england-shot-donut':
      return (
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
      );
    case 'england-xg-scatter':
      return (
        <ScatterChart
          ariaLabel="England chance quality scatter"
          xName="Shots xG"
          yName="Goals xG"
          points={[
            { x: 1.2, y: 1.4, name: 'Haiti' },
            { x: 0.9, y: 1.1, name: 'Denmark' },
            { x: 3.1, y: 3.4, name: 'China PR' },
            { x: 1.4, y: 1.6, name: 'Nigeria' },
            { x: 1.6, y: 1.8, name: 'Colombia' },
            { x: 1.9, y: 2.1, name: 'Australia' },
            { x: 0.7, y: 0.9, name: 'Spain' },
          ]}
        />
      );
    case 'england-spain-momentum':
      return (
        <MomentumChart
          minutes={[0, 15, 30, 45, 60, 75, 90]}
          homeValues={[3, 5, 4, 7, 5, 6, 3]}
          awayValues={[2, 4, 6, 3, 6, 5, 4]}
          homeLabel="England"
          awayLabel="Spain"
          homeColor={DATAVIS.jade}
          awayColor={DATAVIS.blue}
          events={[
            { minute: 70, type: 'sub', team: 'home' },
            { minute: 86, type: 'goal', team: 'away' },
          ]}
          ariaLabel="England versus Spain match momentum"
        />
      );
    case 'wwc-attack-stacked':
      return (
        <StackedBarChart
          primaryLabel="Goals"
          secondaryLabel="Assists"
          ariaLabel="WWC attacking contribution"
          rows={[
            { label: 'England', primary: 13, secondary: 9 },
            { label: 'Spain', primary: 18, secondary: 12 },
            { label: 'Australia', primary: 10, secondary: 7 },
            { label: 'Sweden', primary: 9, secondary: 6 },
          ]}
        />
      );
    case 'england-final-passes':
      return (
        <PassMap
          ariaLabel="England final pass network sample"
          stats={{ complete: 412, incomplete: 86, assist: 3 }}
          passes={[
            { x1: 22, y1: 70, x2: 35, y2: 48, kind: 'complete' },
            { x1: 35, y1: 48, x2: 52, y2: 40, kind: 'complete' },
            { x1: 52, y1: 40, x2: 68, y2: 28, kind: 'incomplete' },
            { x1: 78, y1: 62, x2: 62, y2: 35, kind: 'complete' },
            { x1: 62, y1: 35, x2: 48, y2: 18, kind: 'assist' },
            { x1: 30, y1: 55, x2: 45, y2: 30, kind: 'complete' },
            { x1: 45, y1: 30, x2: 58, y2: 22, kind: 'incomplete' },
          ]}
        />
      );
    case 'england-final-heatmap':
      return (
        <HeatmapPitch
          ariaLabel="England final attacking heatmap"
          color={DATAVIS.indigo}
          blobs={[
            { x: 48, y: 22, intensity: 0.95 },
            { x: 62, y: 28, intensity: 0.8 },
            { x: 35, y: 30, intensity: 0.7 },
            { x: 55, y: 40, intensity: 0.55 },
            { x: 72, y: 45, intensity: 0.45 },
            { x: 28, y: 48, intensity: 0.4 },
          ]}
        />
      );
    case 'england-spain-team-stats':
      return (
        <MirrorStatBars
          leftLabel={options?.leftTeam ?? 'England'}
          rightLabel={options?.rightTeam ?? 'Spain'}
          leftColor={DATAVIS.indigo}
          rightColor={DATAVIS.gold}
          ariaLabel={`${options?.leftTeam ?? 'England'} versus ${options?.rightTeam ?? 'Spain'} team stats`}
          rows={[
            { label: 'Possession', left: 48, right: 52, format: (v) => `${v}%` },
            { label: 'Passes', left: 412, right: 486 },
            { label: 'Shots', left: 9, right: 16 },
            { label: 'On target', left: 3, right: 7 },
            { label: 'xG', left: 0.9, right: 1.8, format: (v) => v.toFixed(1) },
          ]}
        />
      );
    case 'england-spain-zones':
      return (
        <ZoneTerritory
          leftLabel="England"
          rightLabel="Spain"
          leftColor={DATAVIS.indigo}
          rightColor={DATAVIS.gold}
          ariaLabel="England versus Spain activity zones"
          leftZones={[
            { percent: 28, count: 64 },
            { percent: 41, count: 92 },
            { percent: 31, count: 71 },
          ]}
          rightZones={[
            { percent: 22, count: 58 },
            { percent: 39, count: 101 },
            { percent: 39, count: 99 },
          ]}
        />
      );
    case 'england-spain-shot-map':
      return (
        <ScatterChart
          ariaLabel="England versus Spain shot map"
          xName="Pitch width"
          yName="Pitch length"
          points={[
            { x: 42, y: 78, name: 'ENG' },
            { x: 55, y: 82, name: 'ENG' },
            { x: 61, y: 70, name: 'ENG' },
            { x: 48, y: 88, name: 'ESP' },
            { x: 58, y: 91, name: 'ESP' },
            { x: 66, y: 84, name: 'ESP' },
            { x: 52, y: 94, name: 'ESP' },
          ]}
        />
      );
    case 'england-spain-form':
      return (
        <FormGuide
          leftLabel={options?.leftTeam ?? 'England'}
          rightLabel={options?.rightTeam ?? 'Spain'}
          leftForm={['W', 'W', 'W', 'W', 'L']}
          rightForm={['W', 'W', 'W', 'D', 'W']}
          ariaLabel={`${options?.leftTeam ?? 'England'} and ${options?.rightTeam ?? 'Spain'} recent form`}
        />
      );
    case 'england-spain-h2h':
      return (
        <HeadToHead
          leftLabel={options?.leftTeam ?? 'England'}
          rightLabel={options?.rightTeam ?? 'Spain'}
          leftWins={4}
          draws={3}
          rightWins={5}
          leftColor={DATAVIS.indigo}
          rightColor={DATAVIS.gold}
          ariaLabel={`${options?.leftTeam ?? 'England'} versus ${options?.rightTeam ?? 'Spain'} head to head`}
        />
      );
    case 'england-spain-possession':
      return (
        <div style={{ display: 'grid', gap: 'var(--space-300)' }}>
          <PossessionSplit
            leftLabel={options?.leftTeam ?? 'England'}
            rightLabel={options?.rightTeam ?? 'Spain'}
            leftValue={48}
            rightValue={52}
            leftColor={DATAVIS.indigo}
            rightColor={DATAVIS.gold}
            ariaLabel={`${options?.leftTeam ?? 'England'} versus ${options?.rightTeam ?? 'Spain'} possession`}
          />
          <PossessionSplit
            leftLabel={`${options?.leftTeam ?? 'England'} shots`}
            rightLabel={`${options?.rightTeam ?? 'Spain'} shots`}
            leftValue={9}
            rightValue={16}
            leftColor={DATAVIS.indigo}
            rightColor={DATAVIS.gold}
            unit=""
            ariaLabel={`${options?.leftTeam ?? 'England'} versus ${options?.rightTeam ?? 'Spain'} shots`}
          />
        </div>
      );
    case 'england-spain-factors':
      return (
        <div style={{ display: 'grid', gap: 'var(--space-300)' }}>
          <PossessionSplit
            leftLabel={options?.leftTeam ?? 'England'}
            rightLabel={options?.rightTeam ?? 'Spain'}
            leftValue={48}
            rightValue={52}
            leftColor={DATAVIS.indigo}
            rightColor={DATAVIS.gold}
            ariaLabel={`${options?.leftTeam ?? 'England'} versus ${options?.rightTeam ?? 'Spain'} possession`}
          />
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
        </div>
      );
    case 'england-final-goals':
      return (
        <GoalTimeline
          ariaLabel="England versus Spain goal timeline"
          marks={[
            { id: 'g1', minute: 29, team: 'ENG' },
            { id: 'g2', minute: 70, team: 'ENG' },
            { id: 'g3', minute: 86, team: 'ESP', selected: true },
          ]}
        />
      );
    case 'england-key-players':
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-300)',
          }}
        >
          <PlayerSpotlight
            name="Player A"
            team="England"
            position="FW"
            initial="A"
            accentColor={DATAVIS.indigo}
            stats={[
              { label: 'xG', value: '0.4' },
              { label: 'Shots', value: '3' },
              { label: 'Touches box', value: '7' },
            ]}
          />
          <PlayerSpotlight
            name="Player B"
            team="England"
            position="MF"
            initial="B"
            accentColor={DATAVIS.cyan}
            stats={[
              { label: 'Pass %', value: '84%' },
              { label: 'Progressive', value: '11' },
              { label: 'Recoveries', value: '9' },
            ]}
          />
        </div>
      );
    default:
      return null;
  }
}
