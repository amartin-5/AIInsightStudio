import { Badge, Button, IconButton } from '@cake-admin/cakeand';
import {
  ArrowDown,
  ArrowUp,
  Copy,
  MoreHorizontal,
  RefreshCw,
  Sparkles,
  Trash2,
} from 'lucide-react';

import { englandKpis, englandPlayers } from '../demos/wwc2023/dataset';
import { useAppState } from '../app/AppState';
import {
  BodyText,
  InlineMenu,
  KpiGrid,
  KpiTile,
  MetaRow,
  Muted,
  ObjectCard,
  ObjectHeader,
  ObjectTitleBlock,
  PlaceholderViz,
  SimpleTable,
  Strong,
  SurfaceCard,
  TableWrap,
} from '../app/ui.styles';
import type { ReportObject } from './types';

type Props = {
  pageId: string;
  object: ReportObject;
};

export function ReportObjectView({ pageId, object }: Props) {
  const {
    editMode,
    askAiAboutObject,
    updateObject,
    removeObject,
    duplicateObject,
    moveObject,
    setToast,
  } = useAppState();

  return (
    <ObjectCard>
      <ObjectHeader>
        <ObjectTitleBlock>
          <Strong>{object.title}</Strong>
          <MetaRow>
            {object.kind === 'ai-summary' && (
              <Badge color="blue" tone="subtle" dot={false}>
                AI-generated summary
              </Badge>
            )}
            {object.preserveOnRefresh && (
              <Badge color="amber" tone="subtle" dot={false}>
                Preserve on refresh
              </Badge>
            )}
            {object.pinnedFromAi && (
              <Badge color="green" tone="subtle" dot={false}>
                Pinned from AI
              </Badge>
            )}
          </MetaRow>
        </ObjectTitleBlock>
        {editMode && (
          <InlineMenu>
            <IconButton
              label={`Ask AI about ${object.title}`}
              icon={<Sparkles />}
              size="xs"
              intent="secondary"
              variant="ghost"
              onClick={() => askAiAboutObject(object.title)}
            />
            <IconButton
              label={`Refresh ${object.title}`}
              icon={<RefreshCw />}
              size="xs"
              intent="secondary"
              variant="ghost"
              onClick={() => {
                updateObject(pageId, object.id, {
                  body: object.body
                    ? `${object.body}\n\nObject refreshed (simulated).`
                    : 'Object refreshed (simulated).',
                });
                setToast({ message: `${object.title} refreshed` });
              }}
            />
            <IconButton
              label={`Duplicate ${object.title}`}
              icon={<Copy />}
              size="xs"
              intent="secondary"
              variant="ghost"
              onClick={() => duplicateObject(pageId, object.id)}
            />
            <IconButton
              label={`Move ${object.title} up`}
              icon={<ArrowUp />}
              size="xs"
              intent="secondary"
              variant="ghost"
              onClick={() => moveObject(pageId, object.id, 'up')}
            />
            <IconButton
              label={`Move ${object.title} down`}
              icon={<ArrowDown />}
              size="xs"
              intent="secondary"
              variant="ghost"
              onClick={() => moveObject(pageId, object.id, 'down')}
            />
            <IconButton
              label={`Remove ${object.title}`}
              icon={<Trash2 />}
              size="xs"
              intent="secondary"
              variant="ghost"
              onClick={() => removeObject(pageId, object.id)}
            />
            <IconButton
              label={`More actions for ${object.title}`}
              icon={<MoreHorizontal />}
              size="xs"
              intent="secondary"
              variant="ghost"
              onClick={() =>
                setToast({
                  message: 'Replace / change data / resize available in later pass',
                })
              }
            />
          </InlineMenu>
        )}
      </ObjectHeader>

      {object.kind === 'metric' && (
        <div>
          <Strong style={{ fontSize: 'var(--type-size-greeting)' }}>{object.metricValue}</Strong>
          {object.metricHint && <Muted style={{ display: 'block' }}>{object.metricHint}</Muted>}
        </div>
      )}

      {(object.kind === 'ai-summary' ||
        object.kind === 'text' ||
        object.kind === 'analyst-note' ||
        object.kind === 'comparison' ||
        object.kind === 'source-list') &&
        object.body && <BodyText>{object.body}</BodyText>}

      {object.kind === 'analyst-note' && editMode && (
        <textarea
          aria-label={object.title}
          value={object.body ?? ''}
          onChange={(e) => updateObject(pageId, object.id, { body: e.target.value })}
          style={{
            width: '100%',
            minHeight: 96,
            boxSizing: 'border-box',
            border: 'var(--stroke-100) solid var(--color-stroke-border)',
            borderRadius: 'var(--radius-200)',
            padding: 'var(--space-200)',
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--type-size-body)',
            color: 'var(--color-text-icon-primary)',
            background: 'var(--color-surfaces-on-container-high)',
          }}
        />
      )}

      {(object.kind === 'chart' || object.kind === 'spatial' || object.kind === 'timeline') && (
        <PlaceholderViz role="img" aria-label={object.placeholderLabel ?? object.title}>
          {object.placeholderLabel ?? 'Visualization placeholder'}
        </PlaceholderViz>
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
        <KpiGrid>
          {englandKpis.map((kpi) => (
            <KpiTile key={kpi.id}>
              <Muted>{kpi.title}</Muted>
              <Strong style={{ fontSize: 'var(--type-size-subtitle)' }}>{kpi.value}</Strong>
              <Muted>{kpi.hint}</Muted>
            </KpiTile>
          ))}
        </KpiGrid>
      )}

      {object.kind === 'player-list' && <ListPlayers />}
    </ObjectCard>
  );
}

function ListPlayers() {
  return (
    <div style={{ display: 'grid', gap: 'var(--space-300)' }}>
      {englandPlayers.map((player) => (
        <SurfaceCard key={player.id} as="div">
          <MetaRow>
            <Strong style={{ flex: '1 1 auto' }}>{player.label}</Strong>
            <Badge color="secondary" tone="subtle" dot={false}>
              {player.position}
            </Badge>
          </MetaRow>
          <Muted>
            {player.matches} matches · {player.minutes} min · {player.metric}
          </Muted>
          <BodyText>{player.observation}</BodyText>
          <Button size="sm" intent="secondary" variant="ghost">
            Compare
          </Button>
        </SurfaceCard>
      ))}
    </div>
  );
}
