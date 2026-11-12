import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import styled from 'styled-components';

import { ChartScroll } from './ChartScroll';

const Frame = styled.div<{ $height: number }>`
  width: 100%;
  min-width: 0;
  height: ${({ $height }) => $height}px;
`;

type Props = {
  option: echarts.EChartsOption;
  height?: number;
  /** @deprecated Ignored — charts always fit the card; page scrolls instead. */
  minWidth?: string;
  ariaLabel: string;
};

export function EChart({ option, height = 260, ariaLabel }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    const chart = echarts.init(frame);
    chartRef.current = chart;
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(frame);

    return () => {
      observer.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    chartRef.current?.setOption(option, true);
  }, [option]);

  return (
    <ChartScroll>
      <Frame ref={frameRef} $height={height} role="img" aria-label={ariaLabel} />
    </ChartScroll>
  );
}
