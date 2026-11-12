import styled from 'styled-components';

/**
 * Chart host for report widgets. Never scrolls — charts must fit their card
 * so the page (ReportCanvas) is the only scroll surface.
 */
export const ChartScroll = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: visible;
`;
