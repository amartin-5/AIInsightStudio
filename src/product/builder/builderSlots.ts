import type { ReportObjectSlot } from '../types';

/** Equal 3×2 canvas used by custom / blank reports. */
export const CUSTOM_GRID_SLOTS: ReportObjectSlot[] = [
  'slot-1',
  'slot-2',
  'slot-3',
  'slot-4',
  'slot-5',
  'slot-6',
];

export const BUILDER_TOUR_STEPS = [
  {
    id: 'context',
    title: 'Kickoff by setting up the pitch.',
    body: 'Evaluating a match? Choose confederation, tournament, and teams from the filters above the canvas.',
  },
  {
    id: 'add',
    title: 'Draft your widget dream team.',
    body: 'Use chat to generate a chart, or open the widget library to add one from the catalog.',
  },
  {
    id: 'insert',
    title: 'Place content on the canvas.',
    body: 'Select an empty slot, then Add to report from chat — or pick a widget from the library.',
  },
  {
    id: 'arrange',
    title: 'Reorganize the report.',
    body: 'Drag widgets between slots, or use the object controls to move, duplicate, and remove.',
  },
  {
    id: 'rename',
    title: 'Name your report.',
    body: 'Click the title to rename. Export or present when you are ready to share.',
  },
] as const;

export type BuilderTourStepId = (typeof BUILDER_TOUR_STEPS)[number]['id'];
