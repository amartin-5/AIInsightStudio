/**
 * Demo dataset swap-point.
 * Keep domain-specific sample data here — not in the shell or product components.
 */
export const demoDataset = {
  id: 'template-empty',
  records: [] as const,
} as const;

export type DemoDataset = typeof demoDataset;
