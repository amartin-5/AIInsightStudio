import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';

import { CHART_FONT, DATAVIS } from './datavis';
import { EChart } from './EChart';

type Props = {
  indicators: { name: string; max: number }[];
  values: number[];
  height?: number;
  ariaLabel: string;
  color?: string;
};

export function RadarChart({
  indicators,
  values,
  height = 280,
  ariaLabel,
  color = DATAVIS.indigo,
}: Props) {
  const option = useMemo<EChartsOption>(
    () => ({
      textStyle: { fontFamily: CHART_FONT },
      tooltip: { trigger: 'item' },
      radar: {
        indicator: indicators,
        axisName: {
          color: '#44464e',
          fontFamily: CHART_FONT,
          fontSize: 12,
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(117, 134, 255, 0.04)', 'rgba(117, 134, 255, 0.08)'],
          },
        },
        axisLine: { lineStyle: { color: '#e3e3e3' } },
        splitLine: { lineStyle: { color: '#eeeeee' } },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: values,
              name: 'Profile',
              areaStyle: { color: `${color}33` },
              lineStyle: { color, width: 2 },
              itemStyle: { color },
            },
          ],
        },
      ],
    }),
    [indicators, values, color],
  );

  return <EChart option={option} height={height} ariaLabel={ariaLabel} />;
}
