import type { ObjectKind, ReportObject, ReportObjectSlot } from '../types';
import type { WidgetLibraryEntry } from '../widgets';

export function kindForWidget(entry: WidgetLibraryEntry): ObjectKind {
  if (entry.category === 'Media') return 'video';
  if (entry.category === 'Charts') return 'chart';
  if (entry.category === 'Spatial') return 'spatial';
  if (entry.category === 'AI insights') return 'ai-summary';
  if (entry.category === 'Players') return 'player-list';
  if (entry.id.includes('timeline') || entry.id.includes('event')) return 'timeline';
  if (entry.id.includes('mirror') || entry.id.includes('head-to-head')) return 'comparison';
  return 'text';
}

/** Convert a library catalog entry into a report object, optionally slotted. */
export function widgetToReportObject(
  entry: WidgetLibraryEntry,
  options?: { slot?: ReportObjectSlot; id?: string },
): ReportObject {
  return {
    id: options?.id ?? `lib-${entry.id}-${Date.now()}`,
    kind: kindForWidget(entry),
    title: entry.title,
    body: entry.description,
    chartId: entry.chartId,
    placeholderLabel: entry.title,
    slot: options?.slot,
  };
}
