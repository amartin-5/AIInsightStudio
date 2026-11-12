import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';

import { AXIS_STYLE, CHART_FONT, DATAVIS } from './datavis';
import { EChart } from './EChart';

export type StackedBarRow = {
  label: string;
  primary: number;
  secondary: number;
};

type Props = {
  rows: StackedBarRow[];
  primaryLabel: string;
  secondaryLabel: string;
  primaryColor?: string;
  secondaryColor?: string;
  height?: number;
  ariaLabel: string;
};

export function StackedBarChart({
  rows,
  primaryLabel,
  secondaryLabel,
  primaryColor = DATAVIS.blue,
  secondaryColor = DATAVIS.cyan,
  height = 280,
  ariaLabel,
}: Props) {
  const option = useMemo<EChartsOption>(
    () => ({
      textStyle: { fontFamily: CHART_FONT },
      legend: {
        top: 0,
        textStyle: AXIS_STYLE,
        data: [primaryLabel, secondaryLabel],
      },
      grid: { left: 8, right: 24, top: 36, bottom: 8, containLabel: true },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: '#121318',
        borderColor: '#eeeeee',
        borderWidth: 1,
        textStyle: { color: '#ffffff', fontFamily: CHART_FONT, fontSize: 12 },
      },
      xAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: AXIS_STYLE,
        splitLine: { lineStyle: { color: '#eeeeee' } },
      },
      yAxis: {
        type: 'category',
        data: rows.map((r) => r.label),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: AXIS_STYLE,
      },
      series: [
        {
          name: primaryLabel,
          type: 'bar',
          stack: 'total',
          barMaxWidth: 18,
          itemStyle: { color: primaryColor, borderRadius: [0, 0, 0, 0] },
          label: {
            show: true,
            position: 'inside',
            color: '#ffffff',
            fontFamily: CHART_FONT,
            fontSize: 11,
            formatter: (p: { value?: unknown }) =>
              Number(p.value) > 0 ? String(p.value) : '',
          },
          data: rows.map((r) => r.primary),
        },
        {
          name: secondaryLabel,
          type: 'bar',
          stack: 'total',
          barMaxWidth: 18,
          itemStyle: { color: secondaryColor, borderRadius: [0, 8, 8, 0] },
          label: {
            show: true,
            position: 'inside',
            color: '#ffffff',
            fontFamily: CHART_FONT,
            fontSize: 11,
            formatter: (p: { value?: unknown }) =>
              Number(p.value) > 0 ? String(p.value) : '',
          },
          data: rows.map((r) => r.secondary),
        },
      ],
    }),
    [rows, primaryLabel, secondaryLabel, primaryColor, secondaryColor],
  );

  return (
    <EChart
      option={option}
      height={Math.max(height, rows.length * 36 + 60)}
      ariaLabel={ariaLabel}
    />
  );
}
