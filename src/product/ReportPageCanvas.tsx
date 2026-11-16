import { ModularReportGrid } from './grid/ModularReportGrid';
import type { ReportPage } from './types';

type Props = {
  page: ReportPage;
};

/**
 * Report page canvas — unified modular grid for view + edit.
 * Edit mode unlocks drag/resize; view mode locks saved positions.
 */
export function ReportPageCanvas({ page }: Props) {
  return <ModularReportGrid page={page} />;
}
