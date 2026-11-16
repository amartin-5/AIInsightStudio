import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import styled from 'styled-components';

import { ChartScroll } from './ChartScroll';
import { AXIS_STYLE, CHART_FONT } from './datavis';

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

function withSportsTheme(option: echarts.EChartsOption): echarts.EChartsOption {
  const baseGrid =
    typeof option.grid === 'object' && !Array.isArray(option.grid) ? option.grid : {};
  return {
    ...option,
    backgroundColor: 'transparent',
    textStyle: {
      fontFamily: CHART_FONT,
      color: AXIS_STYLE.color,
      ...(typeof option.textStyle === 'object' ? option.textStyle : {}),
    },
    grid: {
      left: 48,
      right: 24,
      top: 36,
      bottom: 40,
      containLabel: true,
      ...baseGrid,
    },
  };
}

export function EChart({ option, height = 320, ariaLabel }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    const chart = echarts.init(frame, undefined, { renderer: 'canvas' });
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
    chartRef.current?.setOption(withSportsTheme(option), true);
  }, [option]);

  return (
    <ChartScroll>
      <Frame ref={frameRef} $height={height} role="img" aria-label={ariaLabel} />
    </ChartScroll>
  );
}
