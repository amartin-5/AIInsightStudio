import type { ObjectGrid, ObjectKind, ReportObject, ReportObjectSlot } from '../types';

const SLOT_DEFAULTS: Record<ReportObjectSlot, ObjectGrid> = {
  header: { x: 0, y: 0, w: 12, h: 3 },
  metrics: { x: 0, y: 3, w: 12, h: 4 },
  insight: { x: 0, y: 7, w: 12, h: 4 },
  media: { x: 0, y: 7, w: 8, h: 6 },
  side: { x: 8, y: 7, w: 4, h: 6 },
  events: { x: 8, y: 7, w: 4, h: 6 },
  'chart-a': { x: 0, y: 13, w: 4, h: 7 },
  'chart-b': { x: 4, y: 13, w: 4, h: 7 },
  'chart-c': { x: 8, y: 13, w: 4, h: 7 },
  main: { x: 0, y: 20, w: 8, h: 7 },
  notes: { x: 8, y: 20, w: 4, h: 5 },
  'slot-1': { x: 0, y: 0, w: 4, h: 7 },
  'slot-2': { x: 4, y: 0, w: 4, h: 7 },
  'slot-3': { x: 8, y: 0, w: 4, h: 7 },
  'slot-4': { x: 0, y: 7, w: 4, h: 7 },
  'slot-5': { x: 4, y: 7, w: 4, h: 7 },
  'slot-6': { x: 8, y: 7, w: 4, h: 7 },
};

const KIND_DEFAULTS: Partial<Record<ObjectKind, ObjectGrid>> = {
  scoreboard: { x: 0, y: 0, w: 12, h: 3 },
  'kpi-row': { x: 0, y: 0, w: 12, h: 4 },
  'ai-summary': { x: 0, y: 0, w: 6, h: 4 },
  chart: { x: 0, y: 0, w: 6, h: 7 },
  spatial: { x: 0, y: 0, w: 6, h: 7 },
  timeline: { x: 0, y: 0, w: 8, h: 5 },
  'player-list': { x: 0, y: 0, w: 12, h: 8 },
  video: { x: 0, y: 0, w: 6, h: 6 },
  metric: { x: 0, y: 0, w: 3, h: 3 },
  comparison: { x: 0, y: 0, w: 6, h: 6 },
  table: { x: 0, y: 0, w: 8, h: 7 },
  'event-list': { x: 0, y: 0, w: 4, h: 6 },
};

function collide(a: ObjectGrid, b: ObjectGrid) {
  return !(
    a.x + a.w <= b.x ||
    b.x + b.w <= a.x ||
    a.y + a.h <= b.y ||
    b.y + b.h <= a.y
  );
}

function placeAvoiding(seed: ObjectGrid, occupied: ObjectGrid[]): ObjectGrid {
  let candidate = { ...seed };
  let guard = 0;
  while (occupied.some((item) => collide(candidate, item)) && guard < 80) {
    candidate = { ...candidate, y: candidate.y + 1 };
    guard += 1;
  }
  return candidate;
}

/** Default size for a newly added widget on the modular grid. */
export function defaultGridForObject(object: Pick<ReportObject, 'kind' | 'slot'>): ObjectGrid {
  if (object.slot && SLOT_DEFAULTS[object.slot]) {
    return { ...SLOT_DEFAULTS[object.slot] };
  }
  return { ...(KIND_DEFAULTS[object.kind] ?? { x: 0, y: 0, w: 4, h: 4 }) };
}

/**
 * Ensure every object has a grid rect. Seeds from named slots / kinds and
 * packs vertically when positions collide.
 */
export function ensureObjectGrids(objects: ReportObject[]): ReportObject[] {
  const occupied: ObjectGrid[] = [];
  return objects.map((object, index) => {
    if (object.grid) {
      occupied.push(object.grid);
      return object;
    }
    const seed = defaultGridForObject(object);
    // Stack leftovers that share the same seed origin.
    const placed = placeAvoiding(
      { ...seed, y: seed.y + (object.slot ? 0 : index * 0) },
      occupied,
    );
    occupied.push(placed);
    return { ...object, grid: placed };
  });
}

/** Next free cell for a new object, preferring below the current stack. */
export function nextFreeGrid(objects: ReportObject[], kind: ObjectKind): ObjectGrid {
  const size = KIND_DEFAULTS[kind] ?? { x: 0, y: 0, w: 4, h: 4 };
  const maxY = objects.reduce((max, object) => {
    const g = object.grid;
    if (!g) return max;
    return Math.max(max, g.y + g.h);
  }, 0);
  return { x: 0, y: maxY, w: size.w, h: size.h };
}
