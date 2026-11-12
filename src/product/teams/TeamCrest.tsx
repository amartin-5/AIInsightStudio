import styled from 'styled-components';

import { getCrestSrc, getTeamShortCode, resolveCrestKey } from './crests';

type Size = number | 'sm' | 'md' | 'lg';

type Props = {
  team?: string | null;
  size?: Size;
  className?: string;
  /** Decorative by default; set when the crest is the sole name cue. */
  labelled?: boolean;
};

const SIZE_MAP = {
  sm: 20,
  md: 28,
  lg: 40,
} as const;

function resolveSize(size: Size): number {
  return typeof size === 'number' ? size : SIZE_MAP[size];
}

/** National team crest with letter fallback when no asset exists. */
export function TeamCrest({ team, size = 'md', className, labelled = false }: Props) {
  const px = resolveSize(size);
  const src = getCrestSrc(team);
  const key = resolveCrestKey(team);
  const label = team?.trim() || 'Team';
  const short = getTeamShortCode(team);

  if (src) {
    return (
      <Crest
        className={className}
        src={src}
        alt={labelled ? label : ''}
        width={px}
        height={px}
        style={{ width: px, height: px }}
        aria-hidden={labelled ? undefined : true}
        data-team={key ?? undefined}
      />
    );
  }

  return (
    <Fallback
      className={className}
      style={{ width: px, height: px, fontSize: Math.max(9, Math.round(px * 0.34)) }}
      aria-hidden={labelled ? undefined : true}
      aria-label={labelled ? label : undefined}
      title={label}
    >
      {short.slice(0, 3)}
    </Fallback>
  );
}

type MarkProps = {
  team?: string | null;
  size?: Size;
  showName?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
};

/** Crest + optional team name for scoreboards and legends. */
export function TeamMark({
  team,
  size = 'md',
  showName = true,
  orientation = 'horizontal',
  className,
}: MarkProps) {
  const label = team?.trim() || 'Team';
  const known = Boolean(getCrestSrc(team));

  return (
    <Mark className={className} $orientation={orientation}>
      {known ? <TeamCrest team={team} size={size} /> : null}
      {showName ? <Name>{label}</Name> : null}
      {!known && !showName ? <TeamCrest team={team} size={size} labelled /> : null}
    </Mark>
  );
}

const Crest = styled.img`
  display: block;
  flex: none;
  object-fit: contain;
`;

const Fallback = styled.span`
  box-sizing: border-box;
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-200);
  background: var(--color-primary-primary-overlay);
  color: var(--color-primary-primary);
  font-family: var(--font-family);
  font-weight: var(--font-weight-bold);
  line-height: 1;
  letter-spacing: 0.02em;
`;

const Mark = styled.span<{ $orientation: 'horizontal' | 'vertical' }>`
  display: inline-flex;
  flex-direction: ${(p) => (p.$orientation === 'vertical' ? 'column' : 'row')};
  align-items: center;
  gap: var(--space-150);
  min-width: 0;
`;

const Name = styled.span`
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-bold);
  line-height: 1.3;
  overflow-wrap: break-word;
`;
