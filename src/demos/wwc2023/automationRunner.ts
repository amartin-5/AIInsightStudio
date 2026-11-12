import type { Automation, NotificationItem, ReportRecord } from '../../product/types';
import { demoConfig } from './config';
import { buildEnglandPages } from './dataset';
import { templates } from './templates';

/** Demo stand-in for the product 30-minute post-FT delay (ms). */
export const DEMO_AUTOMATION_DELAY_MS = 3000;

export type FullTimeEvent = {
  team: string;
  matchLabel: string;
};

export function matchingAutomations(
  automations: Automation[],
  event: FullTimeEvent,
): Automation[] {
  return automations.filter((automation) => {
    if (!automation.enabled) return false;
    if (automation.triggerEvent && automation.triggerEvent !== 'full-time') return false;
    if (automation.triggerKind === 'any-match') return true;
    if (automation.triggerKind === 'team') {
      return (automation.team ?? '').toLowerCase() === event.team.toLowerCase();
    }
    // Requirements: naive includes check against match label
    const req = (automation.requirements ?? '').toLowerCase();
    if (!req) return false;
    return event.matchLabel.toLowerCase().includes(req) || req.includes('knockout');
  });
}

export function buildAutomatedReport(
  automation: Automation,
  event: FullTimeEvent,
): ReportRecord {
  const template = templates.find((t) => t.id === automation.templateId);
  const id = `auto-${Date.now().toString(36)}`;
  return {
    id,
    name: `${event.matchLabel} · ${template?.name ?? automation.templateName}`,
    templateId: automation.templateId,
    templateType: template?.name ?? automation.templateName,
    lastUpdated: 'Just now',
    status: automation.requireReview ? 'Needs review' : 'Updated',
    owner: 'Automation',
    sharing: 'Private',
    team: automation.team ?? event.team,
    period: 'Selected match',
    audience: template?.audience ?? 'Analyst',
    sourceLabels: demoConfig.dataSources.slice(0, 4).map((s) => s.label),
    context: demoConfig.dataSources.slice(0, 4).map((s) => ({
      id: s.id,
      label: s.label,
      kind: 'data' as const,
    })),
    chat: [
      {
        id: `sys-${id}`,
        role: 'system',
        content: `Generated automatically after full time · ${event.matchLabel}`,
      },
    ],
    schedule: null,
    pages: buildEnglandPages().map((page, index) =>
      index === 0
        ? {
            ...page,
            objects: page.objects.map((object) =>
              object.kind === 'scoreboard'
                ? {
                    ...object,
                    title: event.matchLabel,
                    matchStatus: 'FT',
                    matchMeta: `Auto-generated · ${automation.name}`,
                  }
                : object,
            ),
          }
        : page,
    ),
  };
}

export function buildAutomationNotification(
  automation: Automation,
  report: ReportRecord,
  event: FullTimeEvent,
): NotificationItem {
  return {
    id: `n-auto-${report.id}`,
    title: automation.requireReview
      ? 'New report ready for review'
      : 'Automated report generated',
    detail: `${automation.name} · ${event.matchLabel}`,
    time: 'Just now',
    tone: automation.requireReview ? 'warning' : 'success',
    read: false,
    reportId: report.id,
  };
}
