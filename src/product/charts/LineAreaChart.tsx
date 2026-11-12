import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';

import { AXIS_STYLE, CHART_FONT, DATAVIS } from './datavis';
import { EChart } from './EChart';

type Props = {
  categories: string[];
  values: number[];
  color?: string;
  height?: number;
  ariaLabel: string;
  unit?: string;
};

export function LineAreaChart({
  categories,
  values,
  color = DATAVIS.indigo,
  height = 260,
  ariaLabel,
  unit = '',
}: Props) {
  const option = useMemo<EChartsOption>(
    () => ({
      textStyle: { fontFamily: CHART_FONT },
      animationDuration: 600,
      grid: { left: 8, right: 16, top: 28, bottom: 8, containLabel: true },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#121318',
        borderColor: '#eeeeee',
        borderWidth: 1,
        textStyle: { color: '#ffffff', fontFamily: CHART_FONT, fontSize: 12 },
        valueFormatter: (value) => `${value}${unit}`,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: categories,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: AXIS_STYLE,
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          ...AXIS_STYLE,
          formatter: (v: number) => `${v}${unit}`,
        },
        splitLine: { lineStyle: { color: '#eeeeee' } },
      },
      series: [
        {
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { width: 3, color },
          itemStyle: { color },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: `${color}55` },
                { offset: 1, color: `${color}00` },
              ],
            },
          },
          data: values,
        },
      ],
    }),
    [categories, values, color, unit],
  );

  return (
    <EChart
      option={option}
      height={height}
      minWidth={`calc(${categories.length} * var(--space-800) + var(--space-1000))`}
      ariaLabel={ariaLabel}
    />
  );
}
