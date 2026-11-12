import styled, { keyframes } from 'styled-components';

const fadeRise = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const panelIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const OnboardingStage = styled.div`
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(1112px, 92vw);
  height: min(719px, 88vh);
  min-height: 520px;
  padding: var(--space-400);
`;

export const AuthCard = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-400);
  background: var(--color-surfaces-container);
  box-shadow: var(--elevation-5);
  animation: ${panelIn} 420ms cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 840px) {
    grid-template-columns: 1fr;
  }
`;

export const BrandPane = styled.div<{ $variant?: 'photo' | 'mark' }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: ${({ $variant }) => ($variant === 'mark' ? 'center' : 'flex-end')};
  align-items: ${({ $variant }) => ($variant === 'mark' ? 'center' : 'flex-start')};
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 32% 28%,
      var(--color-primary-primary-overlay) 0%,
      transparent 52%
    ),
    linear-gradient(
      165deg,
      var(--color-surfaces-primary) 0%,
      var(--color-surfaces-on-container) 48%,
      var(--color-surfaces-canvas) 100%
    );

  @media (max-width: 840px) {
    display: none;
  }
`;

export const BrandPhoto = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BrandScrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 42%,
    var(--color-surfaces-inverse-container) 100%
  );
  opacity: 0.45;
  pointer-events: none;
`;

export const BrandMark = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-400);
  padding: var(--space-600);
  text-align: center;
  animation: ${fadeRise} 560ms cubic-bezier(0.22, 1, 0.36, 1);
`;

export const BrandGlyph = styled.div`
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  border-radius: var(--radius-1000);
  background: var(--color-tonal-tonal-overlay);
  color: var(--color-text-icon-on-tonal);
  transition: background 160ms ease;

  &:hover {
    background: var(--color-tonal-tonal-overlay-hover);
  }
`;

export const BrandTitle = styled.p`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-size: var(--type-size-greeting);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
`;

export const BrandFoot = styled.p`
  position: relative;
  z-index: 1;
  margin: 0;
  padding: var(--space-600);
  color: var(--color-text-icon-inverse);
  font-size: var(--type-size-helper);
`;

export const FormPane = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: safe center;
  gap: var(--space-400);
  min-width: 0;
  min-height: 0;
  padding: var(--space-600) var(--space-500);
  background: var(--color-surfaces-container);
  overflow: auto;
`;

export const FormClose = styled.div`
  position: absolute;
  top: var(--space-300);
  right: var(--space-300);
`;

export const FormStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  width: 100%;
  max-width: 436px;
  margin-block: auto;
  padding-block: var(--space-400);
  animation: ${fadeRise} 480ms cubic-bezier(0.22, 1, 0.36, 1);
`;

export const FormHeadline = styled.h1`
  margin: 0;
  color: var(--color-text-icon-primary);
  font-size: var(--type-size-title);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

export const FormSubhead = styled.p`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-size: var(--type-size-subject);
  line-height: 1.45;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  width: 100%;
`;

export const AuthField = styled.label`
  display: flex;
  flex-direction: column;
  gap: var(--space-100);
  width: 100%;
  color: var(--color-text-icon-primary);
  font-size: var(--type-size-helper);
  font-weight: 600;
`;

export const AuthInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  padding: 0 var(--space-400);
  border: var(--stroke-100) solid var(--color-stroke-border);
  border-radius: var(--radius-1000);
  background: var(--color-surfaces-on-container-high);
  color: var(--color-text-icon-primary);
  font: inherit;
  font-size: var(--type-size-body);
  outline: none;
  transition:
    border-color 160ms ease,
    background 160ms ease,
    box-shadow 160ms ease;

  &::placeholder {
    color: var(--color-text-icon-placeholder);
  }

  &:hover:not(:disabled):not(:focus-visible) {
    border-color: var(--color-stroke-border-high);
    background: var(--color-surfaces-on-container);
  }

  &:focus-visible {
    border-color: var(--color-primary-primary);
    box-shadow: 0 0 0 var(--stroke-150) var(--color-primary-primary-overlay);
  }
`;

export const CheckboxStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-200);
  color: var(--color-text-icon-primary);
`;

export const ActionCluster = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-300);
  width: 100%;
`;

export const GhostLink = styled.button`
  appearance: none;
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--color-text-icon-secondary);
  font: inherit;
  font-size: var(--type-size-caption);
  line-height: 1.4;
  cursor: pointer;
  text-align: left;
  transition: color 160ms ease;

  strong {
    color: var(--color-primary-primary);
    font-weight: 600;
    transition: color 160ms ease;
  }

  &:hover {
    color: var(--color-text-icon-primary);
  }

  &:hover strong {
    color: var(--color-primary-primary-hover);
    text-decoration: underline;
  }

  &:focus-visible {
    outline: var(--stroke-150) solid var(--color-primary-primary);
    outline-offset: 4px;
    border-radius: var(--radius-50);
  }
`;

export const StepDots = styled.div`
  display: flex;
  gap: var(--space-100);
  margin-top: var(--space-200);
`;

export const StepDot = styled.span<{ $active?: boolean; $done?: boolean }>`
  width: ${({ $active }) => ($active ? '18px' : '8px')};
  height: 8px;
  border-radius: var(--radius-1000);
  background: ${({ $active, $done }) =>
    $active || $done
      ? 'var(--color-primary-primary)'
      : 'var(--color-tonal-tonal-secondary-overlay)'};
  opacity: ${({ $active, $done }) => ($active ? 1 : $done ? 0.75 : 1)};
  transition:
    width 220ms ease,
    background 220ms ease,
    opacity 220ms ease;
`;

export const LightFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  width: 100%;
`;

export const FooterNote = styled.p`
  margin: 0;
  color: var(--color-text-icon-secondary);
  font-size: var(--type-size-caption);
`;
