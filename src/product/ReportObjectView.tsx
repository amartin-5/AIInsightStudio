import { Badge, Button, IconButton, MenuContainer, MenuItem } from '@cake-admin/cakeand';
import {
  ArrowDown,
  ArrowUp,
  Database,
  GripVertical,
  MoreHorizontal,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { DropdownMenu } from 'radix-ui';

import {
  australiaKpis,
  australiaPlayers,
  englandKpis,
  englandPlayers,
  finalMatchKpis,
  knockoutKpis,
  spainKpis,
  type DemoPlayer,
} from '../demos/wwc2023/dataset';
import { useAppState } from '../app/AppState';
import {
  BodyText,
  InlineMenu,
  MetaRow,
  Muted,
  ObjectCard,
  ObjectHeader,
  ObjectTitleBlock,
  PlaceholderViz,
  SimpleTable,
  Strong,
  TableWrap,
  WidgetDragHandle,
} from '../app/ui.styles';
import { renderChartById } from './charts';
import { ComparisonBars } from './charts/ComparisonBars';
import { teamAccent, teamPair } from './teams/teamColors';
import { AiInsightCard } from './widgets/AiInsightCard';
import { EventTimeline } from './widgets/EventTimeline';
import { HeadToHead } from './widgets/HeadToHead';
import { KpiStatRow } from './widgets/KpiStatRow';
import { MatchScoreboard } from './widgets/MatchScoreboard';
import { PlayerSpotlight } from './widgets/PlayerSpotlight';
import { VideoWidget } from './widgets/VideoWidget';
import type { ReportObject } from './types';
import { ICON_SIZE } from '../iconSize';

function kpisForHint(hint?: string) {
  if (hint === 'final-match') return finalMatchKpis;
  if (hint === 'australia') return australiaKpis;
  if (hint === 'spain') return spainKpis;
  if (hint === 'knockout') return knockoutKpis;
  return englandKpis;
}

function playersForHint(hint?: string, team?: string): { team: string; players: DemoPlayer[] } {
  if (hint === 'australia' || team === 'Australia') {
    return { team: 'Australia', players: australiaPlayers };
  }
  return { team: team || 'England', players: englandPlayers };
}

type Props = {
  pageId: string;
  object: ReportObject;
  /** Rendered inside ModularReportGrid — fill cell. */
  modular?: boolean;
  /** Show grip handle for free-form rearrange. */
  showDragHandle?: boolean;
};

export function ReportObjectView({
  pageId,
  object,
  modular = false,
  showDragHandle = false,
}: Props) {
  const {
    editMode,
    presentMode,
    activeReport,
    askAiAboutObject,
    updateObject,
    removeObject,
    moveObject,
    openLineage,
    setCompareContext,
    setPanel,
  } = useAppState();

  const chromeLess =
    !editMode &&
    (object.kind === 'scoreboard' ||
      object.kind === 'video' ||
      object.kind === 'kpi-row' ||
      object.kind === 'ai-summary');
  const compare = activeReport?.compare;
  const pair = teamPair(
    compare?.leftTeam ?? activeReport?.team ?? 'England',
    compare?.rightTeam ?? 'Spain',
  );
  const canShowSources =
    Boolean(object.sourceRefs?.length) ||
    object.kind === 'metric' ||
    object.kind === 'kpi-row' ||
    object.kind === 'chart' ||
    object.kind === 'table' ||
    object.kind === 'event-list';

  const openObjectLineage = (metricKey?: string) => {
    openLineage({
      objectId: object.id,
      metricKey,
      title: object.title,
    });
  };

  const bareInsight = object.kind === 'ai-summary' && !editMode;

  return (
    <ObjectCard $editing={editMode} $modular={modular} $bare={bareInsight}>
      {chromeLess && showDragHandle && (
        <WidgetDragHandle
          className="widget-drag-handle"
          aria-label="Drag to rearrange"
          style={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }}
        >
          <GripVertical size={ICON_SIZE} />
        </WidgetDragHandle>
      )}
      {!chromeLess && (
        <ObjectHeader>
          <ObjectTitleBlock>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-100)' }}>
              {showDragHandle && (
                <WidgetDragHandle className="widget-drag-handle" aria-label="Drag to rearrange">
                  <GripVertical size={ICON_SIZE} />
                </WidgetDragHandle>
              )}
              <Strong style={{ fontSize: 'var(--type-size-subject)' }}>{object.title}</Strong>
            </div>
            {editMode && (
              <MetaRow>
                {object.kind === 'ai-summary' && (
                  <Badge color="blue" tone="subtle" dot={false}>
                    AI
                  </Badge>
                )}
                {object.preserveOnRefresh && (
                  <Badge color="amber" tone="subtle" dot={false}>
                    Preserved
                  </Badge>
                )}
                {object.pinnedFromAi && (
                  <Badge color="green" tone="subtle" dot={false}>
                    Pinned
                  </Badge>
                )}
              </MetaRow>
            )}
          </ObjectTitleBlock>
          <InlineMenu>
            {canShowSources && !presentMode && (
              <IconButton
                label={`View sources for ${object.title}`}
                icon={<Database size={ICON_SIZE} />}
                size="xs"
                intent="secondary"
                variant="ghost"
                onClick={() => openObjectLineage()}
              />
            )}
            {editMode && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <IconButton
                    label={`Object actions for ${object.title}`}
                    icon={<MoreHorizontal size={ICON_SIZE} />}
                    size="xs"
                    intent="secondary"
                    variant="ghost"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content asChild sideOffset={8} align="end">
                    <MenuContainer width={220} style={{ zIndex: 30 }}>
                      <DropdownMenu.Item asChild>
                        <MenuItem
                          showLeftSlot
                          showRightSlot={false}
                          leftSlot={<Sparkles size={ICON_SIZE} />}
                          onClick={() => askAiAboutObject(object.title)}
                        >
                          Ask AI
                        </MenuItem>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item asChild>
                        <MenuItem
                          showLeftSlot
                          showRightSlot={false}
                          leftSlot={<ArrowUp size={ICON_SIZE} />}
                          onClick={() => moveObject(pageId, object.id, 'up')}
                        >
                          Move up
                        </MenuItem>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item asChild>
                        <MenuItem
                          showLeftSlot
                          showRightSlot={false}
                          leftSlot={<ArrowDown size={ICON_SIZE} />}
                          onClick={() => moveObject(pageId, object.id, 'down')}
                        >
                          Move down
                        </MenuItem>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item asChild>
                        <MenuItem
                          showLeftSlot
                          showRightSlot={false}
                          leftSlot={<Trash2 size={ICON_SIZE} />}
                          onClick={() => removeObject(pageId, object.id)}
                        >
                          Remove
                        </MenuItem>
                      </DropdownMenu.Item>
                    </MenuContainer>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            )}
          </InlineMenu>
        </ObjectHeader>
      )}

      {object.kind === 'metric' && (
        <button
          type="button"
          onClick={() => openObjectLineage(object.metricKey)}
          style={{
            display: 'grid',
            gap: 'var(--space-100)',
            border: 'none',
            background: 'transparent',
            padding: 0,
            textAlign: 'start',
            cursor: 'pointer',
            color: 'inherit',
            font: 'inherit',
          }}
        >
          <Strong style={{ fontSize: 'var(--type-size-greeting)' }}>{object.metricValue}</Strong>
          {object.metricHint && <Muted style={{ display: 'block' }}>{object.metricHint}</Muted>}
        </button>
      )}

      {object.kind === 'ai-summary' && object.body && !editMode && (
        <AiInsightCard
          eyebrow="AI insight"
          title={object.title}
          body={object.body}
          footer={object.pinnedFromAi ? 'Pinned from chat' : undefined}
        />
      )}

      {object.kind === 'ai-summary' && object.body && editMode && <BodyText>{object.body}</BodyText>}

      {(object.kind === 'text' ||
        object.kind === 'analyst-note' ||
        object.kind === 'source-list') &&
        object.body &&
        !(object.kind === 'analyst-note' && editMode) && <BodyText>{object.body}</BodyText>}

      {object.kind === 'comparison' && (
        <div style={{ display: 'grid', gap: 'var(--space-400)' }}>
          {object.body && <BodyText>{object.body}</BodyText>}
          {object.chartId ? (
            <ChartSlot object={object} />
          ) : compare?.enabled || object.title.toLowerCase().includes('vs') ? (
            <HeadToHead
              leftLabel={compare?.leftTeam ?? 'England'}
              rightLabel={compare?.rightTeam ?? 'Spain'}
              leftWins={3}
              draws={1}
              rightWins={2}
              leftColor={pair.leftColor}
              rightColor={pair.rightColor}
              ariaLabel={`${compare?.leftTeam ?? 'England'} vs ${compare?.rightTeam ?? 'Spain'}`}
            />
          ) : (
            <ComparisonBars
              leftLabel="Group"
              rightLabel="Knockout"
              leftColor={teamAccent('England').primary}
              rightColor={teamAccent('Spain').primary}
              rows={[
                { label: 'Goals / match', left: 2.7, right: 1.3 },
                { label: 'xG / match', left: 2.0, right: 1.4 },
                { label: 'Shots / match', left: 15, right: 12 },
              ]}
              ariaLabel={object.title}
            />
          )}
        </div>
      )}

      {object.kind === 'analyst-note' && editMode && (
        <textarea
          aria-label={object.title}
          value={object.body ?? ''}
          onChange={(e) => updateObject(pageId, object.id, { body: e.target.value })}
          style={{
            width: '100%',
            minHeight: 120,
            boxSizing: 'border-box',
            border: 'var(--stroke-100) solid var(--color-stroke-border)',
            borderRadius: 'var(--radius-200)',
            padding: 'var(--space-300)',
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--type-size-body)',
            lineHeight: 1.5,
            color: 'var(--color-text-icon-primary)',
            background: 'var(--color-surfaces-on-container-high)',
            resize: 'vertical',
          }}
        />
      )}

      {(object.kind === 'chart' || object.kind === 'spatial' || object.kind === 'timeline') && (
        <ChartSlot object={object} />
      )}

      {object.kind === 'table' && object.columns && object.rows && (
        <TableWrap>
          <SimpleTable>
            <thead>
              <tr>
                {object.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {object.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </SimpleTable>
        </TableWrap>
      )}

      {object.kind === 'kpi-row' && (
        <KpiStatRow
          ariaLabel={object.title}
          items={kpisForHint(object.metricHint).map((kpi) => ({
            id: kpi.id,
            label: kpi.title,
            value: kpi.value,
            hint: kpi.hint,
          }))}
          onSelectItem={(item) => openObjectLineage(item.id)}
        />
      )}

      {object.kind === 'player-list' && (
        <ListPlayers
          teamHint={object.metricHint}
          reportTeam={activeReport?.team}
          onCompare={() => {
            setCompareContext({ enabled: activeReport?.compare?.enabled ?? false });
            setPanel('compare');
          }}
        />
      )}

      {object.kind === 'video' && (
        <VideoWidget
          title={object.title}
          subtitle={object.body}
          duration={object.live ? 'LIVE' : object.metricHint}
          live={object.live}
          ariaLabel={`Play ${object.title}`}
        />
      )}

      {object.kind === 'scoreboard' && (
        <MatchScoreboard
          homeTeam={
            compare?.enabled ? compare.leftTeam : (object.homeTeam ?? 'Home')
          }
          awayTeam={
            compare?.enabled ? compare.rightTeam : (object.awayTeam ?? 'Away')
          }
          homeScore={object.homeScore}
          awayScore={object.awayScore}
          status={object.matchStatus ?? 'FT'}
          meta={
            compare?.enabled
              ? `Compare · ${compare.leftPeriod ?? 'Period A'} vs ${compare.rightPeriod ?? 'Period B'}`
              : object.matchMeta
          }
          live={object.live}
          ariaLabel={object.title}
        />
      )}

      {object.kind === 'event-list' && object.events && (
        <EventTimeline events={object.events} ariaLabel={object.title} />
      )}

      {object.kind === 'image' && (
        <PlaceholderViz role="img" aria-label={object.placeholderLabel ?? object.title}>
          {object.placeholderLabel ?? object.title}
        </PlaceholderViz>
      )}
    </ObjectCard>
  );
}

function ChartSlot({ object }: { object: ReportObject }) {
  const { activeReport } = useAppState();
  const compare = activeReport?.compare;
  const chart = object.chartId
    ? renderChartById(
        object.chartId,
        compare?.enabled
          ? { leftTeam: compare.leftTeam, rightTeam: compare.rightTeam }
          : undefined,
      )
    : null;
  if (chart) return chart;
  return (
    <PlaceholderViz role="img" aria-label={object.placeholderLabel ?? object.title}>
      {object.placeholderLabel ?? 'Visualization unavailable'}
    </PlaceholderViz>
  );
}

function ListPlayers({
  onCompare,
  teamHint,
  reportTeam,
}: {
  onCompare: () => void;
  teamHint?: string;
  reportTeam?: string;
}) {
  const { team, players } = playersForHint(teamHint, reportTeam);
  const accent = teamAccent(team).primary;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--space-400)',
      }}
    >
      {players.map((player) => (
        <div key={player.id} style={{ display: 'grid', gap: 'var(--space-200)' }}>
          <PlayerSpotlight
            name={player.label}
            team={team}
            position={player.position}
            initial={player.initial}
            accentColor={accent}
            photo={player.photo}
            stats={[
              { label: 'Matches', value: player.matches },
              { label: 'Minutes', value: player.minutes },
              { label: 'Impact', value: player.metric },
            ]}
          />
          <BodyText>{player.observation}</BodyText>
          <Button size="sm" intent="secondary" variant="tonal" onClick={onCompare}>
            Compare
          </Button>
        </div>
      ))}
    </div>
  );
}
