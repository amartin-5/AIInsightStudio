import styled from 'styled-components';

type Props = {
  orientation?: 'vertical' | 'horizontal';
  className?: string;
};

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  display: block;
`;

/** Shared pitch outline used by spatial viz widgets. */
export function PitchSvg({ orientation = 'vertical', className }: Props) {
  const vertical = orientation === 'vertical';
  const w = vertical ? 68 : 105;
  const h = vertical ? 105 : 68;

  return (
    <Svg
      className={className}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <rect
        x="1"
        y="1"
        width={w - 2}
        height={h - 2}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.55"
      />
      {vertical ? (
        <>
          <line x1="1" y1="52.5" x2="67" y2="52.5" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
          <circle cx="34" cy="52.5" r="9" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
          <rect x="13.85" y="1" width="40.3" height="16.5" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
          <rect x="13.85" y="87.5" width="40.3" height="16.5" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
          <rect x="24.85" y="1" width="18.3" height="5.5" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
          <rect x="24.85" y="98.5" width="18.3" height="5.5" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
        </>
      ) : (
        <>
          <line x1="52.5" y1="1" x2="52.5" y2="67" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
          <circle cx="52.5" cy="34" r="9" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
          <rect x="1" y="13.85" width="16.5" height="40.3" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
          <rect x="87.5" y="13.85" width="16.5" height="40.3" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
          <rect x="1" y="24.85" width="5.5" height="18.3" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
          <rect x="98.5" y="24.85" width="5.5" height="18.3" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
        </>
      )}
    </Svg>
  );
}
