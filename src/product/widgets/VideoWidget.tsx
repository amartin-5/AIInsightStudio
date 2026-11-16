import styled from 'styled-components';
import { Play } from 'lucide-react';
import { ICON_SIZE_LG } from '../../iconSize';

type Props = {
  title: string;
  subtitle?: string;
  duration?: string;
  live?: boolean;
  ariaLabel: string;
  onPlay?: () => void;
};

const Root = styled.div`
  display: grid;
  gap: var(--space-200);
  min-width: 0;
`;

const Frame = styled.button`
  appearance: none;
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 0;
  padding: 0;
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-300);
  overflow: hidden;
  cursor: pointer;
  background:
    linear-gradient(
      160deg,
      color-mix(in srgb, var(--color-primary-primary) 55%, var(--color-surfaces-on-container)) 0%,
      color-mix(in srgb, var(--color-success-success) 35%, var(--color-surfaces-on-container-high)) 55%,
      var(--color-surfaces-on-container) 100%
    );
  color: var(--color-text-icon-on-primary);
`;

const PitchHint = styled.div`
  position: absolute;
  inset: 18% 12%;
  border: var(--stroke-100) solid color-mix(in srgb, var(--color-text-icon-on-primary) 45%, transparent);
  border-radius: var(--radius-100);
  opacity: 0.55;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background: color-mix(in srgb, var(--color-text-icon-on-primary) 45%, transparent);
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 18%;
    aspect-ratio: 1;
    transform: translate(-50%, -50%);
    border: var(--stroke-100) solid color-mix(in srgb, var(--color-text-icon-on-primary) 45%, transparent);
    border-radius: var(--radius-1000);
  }
`;

const PlayBadge = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-1000);
  background: color-mix(in srgb, var(--color-surfaces-container) 72%, transparent);
  color: var(--color-text-icon-primary);
  box-shadow: var(--elevation-2);
`;

const Live = styled.span`
  position: absolute;
  top: var(--space-200);
  left: var(--space-200);
  display: inline-flex;
  align-items: center;
  padding: var(--space-050) var(--space-150);
  border-radius: var(--radius-1000);
  background: var(--color-error-error);
  color: var(--color-text-icon-inverse);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.04em;
`;

const Duration = styled.span`
  position: absolute;
  right: var(--space-200);
  bottom: var(--space-200);
  padding: var(--space-050) var(--space-150);
  border-radius: var(--radius-1000);
  background: color-mix(in srgb, var(--color-surfaces-container) 78%, transparent);
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  font-weight: var(--font-weight-medium);
`;

const Meta = styled.div`
  display: grid;
  gap: var(--space-050);
  min-width: 0;
`;

const Title = styled.span`
  color: var(--color-text-icon-primary);
  font-family: var(--font-family);
  font-size: var(--type-size-body);
  font-weight: var(--font-weight-bold);
  line-height: 1.35;
`;

const Subtitle = styled.span`
  color: var(--color-text-icon-secondary);
  font-family: var(--font-family);
  font-size: var(--type-size-caption);
  line-height: 1.4;
`;

/** Reusable match / AI-replay video preview surface. */
export function VideoWidget({
  title,
  subtitle,
  duration = '0:42',
  live = false,
  ariaLabel,
  onPlay,
}: Props) {
  return (
    <Root>
      <Frame type="button" aria-label={ariaLabel} onClick={onPlay}>
        <PitchHint aria-hidden />
        {live && <Live>LIVE</Live>}
        <PlayBadge aria-hidden>
          <Play size={ICON_SIZE_LG} fill="currentColor" />
        </PlayBadge>
        {duration && <Duration>{duration}</Duration>}
      </Frame>
      <Meta>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Meta>
    </Root>
  );
}
