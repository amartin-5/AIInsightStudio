/**
 * Demo configuration swap-point.
 * Later demos should primarily change this file + dataset.ts rather than the shell.
 */
export const demoConfig = {
  id: 'template',
  name: 'Demo template',
  spaceName: '',
  reportName: '',
} as const;

export type DemoConfig = typeof demoConfig;
