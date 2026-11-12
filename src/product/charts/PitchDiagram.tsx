import styled from 'styled-components';

import { DATAVIS } from './datavis';

export type PitchPlayer = {
  id: string;
  number: string;
  name: string;
  /** 0–100 from left goal line to right; attack toward top in vertical pitch. */
  x: number;
  /** 0–100 from top (opponent goal) to bottom (own goal) when vertical. */
  y: number;
};

type Props = {
  players: PitchPlayer[];
  formationLabel?: string;
  ariaLabel: string;
};

const Root = styled.div`
  display: grid;
  gap: var(--space-200);
  min-width: 0;
`;

const Caption = styled.p`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
`;

const Field = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 68 / 105;
  max-height: 420px;
  margin-inline: auto;
  border: var(--stroke-150) solid var(--color-stroke-border-high);
  border-radius: var(--radius-300);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, ${DATAVIS.jade} 18%, var(--color-surfaces-on-container-high)) 0%,
    color-mix(in srgb, ${DATAVIS.jade} 10%, var(--color-surfaces-on-container-high)) 100%
  );
  overflow: hidden;
`;

const Svg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const PlayerNode = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  left: ${(p) => p.$x}%;
  top: ${(p) => p.$y}%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-050);
  min-width: 0;
  pointer-events: none;
`;

const Badge = styled.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-1000);
  background: var(--color-surfaces-container);
  border: var(--stroke-150) solid ${DATAVIS.indigo};
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  box-shadow: var(--elevation-2);
`;

const Name = styled.span`
  max-width: 88px;
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: 10px;
  font-weight: var(--font-weight-medium);
  line-height: 1.2;
  text-align: center;
  white-space: normal;
  overflow-wrap: break-word;
`;

/** Vertical pitch with structural markings + player nodes (no photography). */
export function PitchDiagram({ players, formationLabel = '4-3-3', ariaLabel }: Props) {
  return (
    <Root>
      <Caption>{formationLabel} shape</Caption>
      <Field role="img" aria-label={ariaLabel}>
        <Svg viewBox="0 0 68 105" preserveAspectRatio="none" aria-hidden>
          <rect x="2" y="2" width="64" height="101" fill="none" stroke="#909090" strokeWidth="0.6" />
          <line x1="2" y1="52.5" x2="66" y2="52.5" stroke="#909090" strokeWidth="0.5" />
          <circle cx="34" cy="52.5" r="9" fill="none" stroke="#909090" strokeWidth="0.5" />
          <circle cx="34" cy="52.5" r="0.6" fill="#909090" />
          <rect x="14" y="2" width="40" height="16" fill="none" stroke="#909090" strokeWidth="0.5" />
          <rect x="22" y="2" width="24" height="6" fill="none" stroke="#909090" strokeWidth="0.5" />
          <rect x="14" y="87" width="40" height="16" fill="none" stroke="#909090" strokeWidth="0.5" />
          <rect x="22" y="97" width="24" height="6" fill="none" stroke="#909090" strokeWidth="0.5" />
        </Svg>
        {players.map((player) => (
          <PlayerNode key={player.id} $x={player.x} $y={player.y}>
            <Badge>{player.number}</Badge>
            <Name>{player.name}</Name>
          </PlayerNode>
        ))}
      </Field>
    </Root>
  );
}
