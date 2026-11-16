import type { ReactNode } from 'react';
import styled from 'styled-components';

import cardMatch1 from '../../assets/explore/card-match-1.jpg';
import cardMatch2 from '../../assets/explore/card-match-2.jpg';
import cardMatch3 from '../../assets/explore/card-match-3.jpg';
import heroStadium from '../../assets/explore/hero-stadium.jpg';
import announcePitch from '../../assets/explore/announce-pitch.jpg';
import spotlight from '../../assets/explore/spotlight-celebration.jpg';
import heroDataWave from '../../assets/onboarding/hero-data-wave.jpg';

type PreviewKind =
  | 'opponent-analysis'
  | 'match-analysis'
  | 'team-performance'
  | 'player-performance'
  | 'player-comparison'
  | 'tournament-overview'
  | 'executive-summary'
  | 'data-quality'
  | string;

const PHOTO: Record<string, string> = {
  'opponent-analysis': cardMatch2,
  'match-analysis': cardMatch1,
  'team-performance': cardMatch3,
  'player-performance': spotlight,
  'player-comparison': announcePitch,
  'tournament-overview': heroStadium,
  'executive-summary': heroDataWave,
  'data-quality': heroDataWave,
};

const Frame = styled.div<{ $compact?: boolean }>`
  position: relative;
  display: grid;
  place-items: stretch;
  width: 100%;
  min-height: ${(p) => (p.$compact ? '72px' : '148px')};
  overflow: hidden;
  background: var(--color-surfaces-on-container);
`;

const Photo = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Wash = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      180deg,
      rgba(18, 19, 24, 0.18) 0%,
      rgba(18, 19, 24, 0.08) 42%,
      rgba(18, 19, 24, 0.62) 100%
    ),
    linear-gradient(
      115deg,
      var(--color-primary-primary-overlay) 0%,
      transparent 55%
    );
`;

const ChartLayer = styled.div<{ $compact?: boolean }>`
  position: relative;
  z-index: 1;
  display: grid;
  align-content: ${(p) => (p.$compact ? 'center' : 'start')};
  width: 100%;
  min-height: inherit;
  padding: ${(p) =>
    p.$compact
      ? 'var(--space-150)'
      : 'var(--space-300) var(--space-300) var(--space-700)'};
  pointer-events: none;
`;

const ChartCard = styled.div<{ $compact?: boolean }>`
  display: grid;
  gap: ${(p) => (p.$compact ? 'var(--space-050)' : 'var(--space-100)')};
  width: ${(p) => (p.$compact ? '72%' : '78%')};
  max-width: 280px;
  padding: ${(p) => (p.$compact ? 'var(--space-100)' : 'var(--space-200)')};
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-200);
  background: var(--color-surfaces-container-blur-high);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: var(--elevation-2);
`;

const KpiRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-100);
`;

const Kpi = styled.div`
  display: grid;
  gap: 2px;
  min-width: 0;
`;

const KpiLabel = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: 9px;
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.04em;
  line-height: 1.2;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const KpiValue = styled.span`
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
`;

const Svg = styled.svg`
  display: block;
  width: 100%;
  height: auto;
`;

const Footer = styled.div`
  position: absolute;
  left: var(--space-300);
  right: var(--space-300);
  bottom: var(--space-300);
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-200);
  pointer-events: none;
`;

const Category = styled.span`
  max-width: 70%;
  color: var(--color-text-icon-on-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.06em;
  line-height: 1.35;
  text-transform: uppercase;
  text-shadow: 0 1px 8px rgba(18, 19, 24, 0.45);
  overflow-wrap: break-word;
`;

function BarsChart({ tall }: { tall?: boolean }) {
  return (
    <Svg viewBox="0 0 160 48" aria-hidden>
      {[18, 28, 22, 36, 30, 40, 26].map((h, i) => (
        <rect
          key={i}
          x={8 + i * 21}
          y={48 - h}
          width="12"
          height={h}
          rx="3"
          fill={i % 2 === 0 ? 'var(--color-primary-primary)' : 'var(--color-primary-primary-overlay)'}
          opacity={tall || i < 6 ? 1 : 0.85}
        />
      ))}
    </Svg>
  );
}

function LineChart() {
  return (
    <Svg viewBox="0 0 160 48" aria-hidden>
      <path
        d="M4 36 L28 30 L52 34 L76 18 L100 24 L124 12 L156 16"
        fill="none"
        stroke="var(--color-primary-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 36 L28 30 L52 34 L76 18 L100 24 L124 12 L156 16 L156 48 L4 48 Z"
        fill="var(--color-primary-primary-overlay)"
      />
      {[
        [4, 36],
        [76, 18],
        [124, 12],
        [156, 16],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="var(--color-primary-primary)" />
      ))}
    </Svg>
  );
}

function DualBars() {
  return (
    <Svg viewBox="0 0 160 48" aria-hidden>
      {[
        [10, 30, 18],
        [34, 22, 28],
        [58, 34, 20],
        [82, 18, 32],
        [106, 26, 24],
        [130, 14, 36],
      ].map(([x, h1, h2], i) => (
        <g key={i}>
          <rect
            x={x}
            y={48 - h1}
            width="8"
            height={h1}
            rx="2"
            fill="var(--color-primary-primary)"
          />
          <rect
            x={x + 10}
            y={48 - h2}
            width="8"
            height={h2}
            rx="2"
            fill="var(--color-secondary-secondary-overlay)"
          />
        </g>
      ))}
    </Svg>
  );
}

function RadarLite() {
  return (
    <Svg viewBox="0 0 160 56" aria-hidden>
      <polygon
        points="80,8 118,28 104,52 56,52 42,28"
        fill="var(--color-primary-primary-overlay)"
        stroke="var(--color-primary-primary)"
        strokeWidth="1.5"
      />
      <polygon
        points="80,16 104,30 96,46 64,46 56,30"
        fill="none"
        stroke="var(--color-text-icon-secondary)"
        strokeWidth="1"
        opacity="0.55"
      />
      <circle cx="80" cy="30" r="2" fill="var(--color-primary-primary)" />
    </Svg>
  );
}

function PitchLite() {
  return (
    <Svg viewBox="0 0 160 56" aria-hidden>
      <rect
        x="8"
        y="6"
        width="144"
        height="44"
        rx="4"
        fill="var(--color-success-success-overlay)"
        stroke="var(--color-stroke-border)"
      />
      <line x1="80" y1="6" x2="80" y2="50" stroke="var(--color-stroke-border-high)" />
      <circle cx="80" cy="28" r="8" fill="none" stroke="var(--color-stroke-border-high)" />
      {[
        [36, 18],
        [48, 32],
        [62, 22],
        [98, 20],
        [112, 34],
        [126, 24],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          fill={i < 3 ? 'var(--color-primary-primary)' : 'var(--color-secondary-secondary)'}
        />
      ))}
    </Svg>
  );
}

function TimelineLite() {
  return (
    <Svg viewBox="0 0 160 36" aria-hidden>
      <line
        x1="8"
        y1="18"
        x2="152"
        y2="18"
        stroke="var(--color-stroke-border-high)"
        strokeWidth="2"
      />
      {[16, 44, 78, 112, 142].map((x, i) => (
        <g key={i}>
          <circle
            cx={x}
            cy="18"
            r={i === 2 || i === 4 ? 5 : 3.5}
            fill={i === 2 || i === 4 ? 'var(--color-primary-primary)' : 'var(--color-surfaces-container)'}
            stroke="var(--color-primary-primary)"
            strokeWidth="1.5"
          />
        </g>
      ))}
    </Svg>
  );
}

function IssuesLite() {
  return (
    <Svg viewBox="0 0 160 48" aria-hidden>
      {[0, 1, 2, 3].map((row) => (
        <g key={row}>
          <rect
            x="8"
            y={6 + row * 10}
            width="144"
            height="7"
            rx="2"
            fill="var(--color-surfaces-on-container)"
          />
          <rect
            x="12"
            y={8 + row * 10}
            width={row === 0 ? 70 : row === 1 ? 96 : row === 2 ? 54 : 82}
            height="3"
            rx="1.5"
            fill={
              row === 1
                ? 'var(--color-warning-warn-overlay)'
                : row === 2
                  ? 'var(--color-error-error-overlay)'
                  : 'var(--color-primary-primary-overlay)'
            }
          />
        </g>
      ))}
    </Svg>
  );
}

function ChartFor(kind: PreviewKind, compact?: boolean) {
  switch (kind) {
    case 'opponent-analysis':
      return (
        <ChartCard $compact={compact}>
          {!compact && (
            <KpiRow>
              <Kpi>
                <KpiLabel>PPDA</KpiLabel>
                <KpiValue>8.4</KpiValue>
              </Kpi>
              <Kpi>
                <KpiLabel>Shape</KpiLabel>
                <KpiValue>4-3-3</KpiValue>
              </Kpi>
              <Kpi>
                <KpiLabel>xGA</KpiLabel>
                <KpiValue>1.1</KpiValue>
              </Kpi>
            </KpiRow>
          )}
          <PitchLite />
        </ChartCard>
      );
    case 'match-analysis':
      return (
        <ChartCard $compact={compact}>
          {!compact && (
            <KpiRow>
              <Kpi>
                <KpiLabel>xG</KpiLabel>
                <KpiValue>1.8</KpiValue>
              </Kpi>
              <Kpi>
                <KpiLabel>Shots</KpiLabel>
                <KpiValue>14</KpiValue>
              </Kpi>
              <Kpi>
                <KpiLabel>Poss.</KpiLabel>
                <KpiValue>57%</KpiValue>
              </Kpi>
            </KpiRow>
          )}
          <TimelineLite />
        </ChartCard>
      );
    case 'team-performance':
      return (
        <ChartCard $compact={compact}>
          {!compact && (
            <KpiRow>
              <Kpi>
                <KpiLabel>Form</KpiLabel>
                <KpiValue>WWDWL</KpiValue>
              </Kpi>
              <Kpi>
                <KpiLabel>Pts</KpiLabel>
                <KpiValue>12</KpiValue>
              </Kpi>
              <Kpi>
                <KpiLabel>Trend</KpiLabel>
                <KpiValue>+18%</KpiValue>
              </Kpi>
            </KpiRow>
          )}
          <LineChart />
        </ChartCard>
      );
    case 'player-performance':
      return (
        <ChartCard $compact={compact}>
          {!compact && (
            <KpiRow>
              <Kpi>
                <KpiLabel>Goals</KpiLabel>
                <KpiValue>3</KpiValue>
              </Kpi>
              <Kpi>
                <KpiLabel>xG</KpiLabel>
                <KpiValue>2.4</KpiValue>
              </Kpi>
              <Kpi>
                <KpiLabel>Press</KpiLabel>
                <KpiValue>91</KpiValue>
              </Kpi>
            </KpiRow>
          )}
          <BarsChart />
        </ChartCard>
      );
    case 'player-comparison':
      return (
        <ChartCard $compact={compact}>
          <RadarLite />
          {!compact && <DualBars />}
        </ChartCard>
      );
    case 'tournament-overview':
      return (
        <ChartCard $compact={compact}>
          {!compact && (
            <KpiRow>
              <Kpi>
                <KpiLabel>Teams</KpiLabel>
                <KpiValue>32</KpiValue>
              </Kpi>
              <Kpi>
                <KpiLabel>Goals</KpiLabel>
                <KpiValue>142</KpiValue>
              </Kpi>
              <Kpi>
                <KpiLabel>xG</KpiLabel>
                <KpiValue>138</KpiValue>
              </Kpi>
            </KpiRow>
          )}
          <BarsChart tall />
        </ChartCard>
      );
    case 'executive-summary':
      return (
        <ChartCard $compact={compact}>
          {!compact && (
            <KpiRow>
              <Kpi>
                <KpiLabel>Score</KpiLabel>
                <KpiValue>A−</KpiValue>
              </Kpi>
              <Kpi>
                <KpiLabel>Risk</KpiLabel>
                <KpiValue>Low</KpiValue>
              </Kpi>
              <Kpi>
                <KpiLabel>Delta</KpiLabel>
                <KpiValue>+6%</KpiValue>
              </Kpi>
            </KpiRow>
          )}
          <LineChart />
        </ChartCard>
      );
    case 'data-quality':
      return (
        <ChartCard $compact={compact}>
          {!compact && (
            <KpiRow>
              <Kpi>
                <KpiLabel>Coverage</KpiLabel>
                <KpiValue>94%</KpiValue>
              </Kpi>
              <Kpi>
                <KpiLabel>Issues</KpiLabel>
                <KpiValue>7</KpiValue>
              </Kpi>
              <Kpi>
                <KpiLabel>Lag</KpiLabel>
                <KpiValue>2h</KpiValue>
              </Kpi>
            </KpiRow>
          )}
          <IssuesLite />
        </ChartCard>
      );
    default:
      return (
        <ChartCard $compact={compact}>
          <BarsChart />
        </ChartCard>
      );
  }
}

type Props = {
  templateId: string;
  category: string;
  compact?: boolean;
  tall?: boolean;
  showCategory?: boolean;
  badge?: ReactNode;
};

export function TemplatePreviewArt({
  templateId,
  category,
  compact = false,
  tall = false,
  showCategory = true,
  badge,
}: Props) {
  const photo = PHOTO[templateId] ?? cardMatch1;

  return (
    <Frame $compact={compact} style={tall ? { minHeight: 168 } : undefined}>
      <Photo src={photo} alt="" />
      <Wash />
      <ChartLayer $compact={compact}>
        {ChartFor(templateId, compact)}
      </ChartLayer>
      {badge}
      {showCategory && !compact && (
        <Footer>
          <Category>{category}</Category>
        </Footer>
      )}
    </Frame>
  );
}
