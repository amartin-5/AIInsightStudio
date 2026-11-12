import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';

import { AXIS_STYLE, CHART_FONT, DATAVIS_SERIES } from './datavis';
import { EChart } from './EChart';

type Props = {
  categories: string[];
  values: number[];
  colors?: string[];
  height?: number;
  ariaLabel: string;
  formatLabel?: (value: number) => string;
};

export function BarChart({
  categories,
  values,
  colors = [...DATAVIS_SERIES],
  height = 260,
  ariaLabel,
  formatLabel = (v) => String(v),
}: Props) {
  const option = useMemo<EChartsOption>(
    () => ({
      textStyle: { fontFamily: CHART_FONT },
      animation: true,
      animationDuration: 600,
      grid: { left: 8, right: 8, top: 28, bottom: 8, containLabel: true },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#121318',
        borderColor: '#eeeeee',
        borderWidth: 1,
        textStyle: { color: '#ffffff', fontFamily: CHART_FONT, fontSize: 12 },
        axisPointer: { type: 'line', lineStyle: { color: '#e3e3e3', width: 1 } },
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: AXIS_STYLE,
      },
      yAxis: {
        type: 'value',
        axisLine: { show: true, lineStyle: { color: '#e3e3e3', width: 1 } },
        axisTick: { show: false },
        axisLabel: AXIS_STYLE,
        splitLine: {
          show: true,
          lineStyle: { color: ['#e3e3e3', '#eeeeee', '#eeeeee', '#eeeeee', '#eeeeee'] },
        },
      },
      series: [
        {
          type: 'bar',
          barMaxWidth: 48,
          barCategoryGap: '40%',
          label: {
            show: true,
            position: 'top',
            color: '#44464e',
            fontFamily: CHART_FONT,
            fontSize: 12,
            formatter: (params: { value?: unknown }) =>
              formatLabel(Number(params.value ?? 0)),
          },
          data: values.map((value, index) => ({
            value,
            itemStyle: {
              color: colors[index % colors.length],
              borderRadius: [8, 8, 0, 0],
            },
          })),
        },
      ],
    }),
    [categories, values, colors, formatLabel],
  );

  return (
    <EChart
      option={option}
      height={height}
      minWidth={`calc(${categories.length} * var(--space-900) + var(--space-1000))`}
      ariaLabel={ariaLabel}
    />
  );
}
