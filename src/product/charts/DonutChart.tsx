import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';

import { CHART_FONT, DATAVIS_SERIES } from './datavis';
import { EChart } from './EChart';

export type DonutSlice = {
  label: string;
  value: number;
  color?: string;
};

type Props = {
  slices: DonutSlice[];
  height?: number;
  ariaLabel: string;
  showLabels?: boolean;
};

export function DonutChart({
  slices,
  height = 260,
  ariaLabel,
  showLabels = true,
}: Props) {
  const option = useMemo<EChartsOption>(() => {
    const total = slices.reduce((sum, s) => sum + s.value, 0) || 1;
    return {
      textStyle: { fontFamily: CHART_FONT },
      tooltip: {
        trigger: 'item',
        backgroundColor: '#121318',
        borderColor: '#eeeeee',
        borderWidth: 1,
        textStyle: { color: '#ffffff', fontFamily: CHART_FONT, fontSize: 12 },
        formatter: (params: unknown) => {
          const p = params as { name?: string; value?: number; percent?: number };
          return `${p.name ?? ''}: ${p.value ?? 0} (${(p.percent ?? 0).toFixed(0)}%)`;
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['52%', '78%'],
          padAngle: 3,
          itemStyle: { borderRadius: 8 },
          label: showLabels
            ? {
                show: true,
                position: 'inside',
                formatter: (params: { value?: unknown }) => String(params.value ?? ''),
                color: '#ffffff',
                fontFamily: CHART_FONT,
                fontSize: 14,
                fontWeight: 600,
                textShadowColor: 'rgba(0,0,0,0.35)',
                textShadowBlur: 4,
              }
            : { show: false },
          labelLine: { show: false },
          data: slices.map((slice, index) => ({
            name: slice.label,
            value: slice.value,
            itemStyle: {
              color: slice.color ?? DATAVIS_SERIES[index % DATAVIS_SERIES.length],
            },
          })),
          emphasis: {
            scale: true,
            scaleSize: 4,
          },
        },
      ],
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: String(total),
            fill: '#44464e',
            fontFamily: CHART_FONT,
            fontSize: 18,
            fontWeight: 700,
          },
          invisible: showLabels,
        },
      ],
    };
  }, [slices, showLabels]);

  return <EChart option={option} height={height} ariaLabel={ariaLabel} />;
}
