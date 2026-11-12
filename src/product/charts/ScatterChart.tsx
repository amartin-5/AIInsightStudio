import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';

import { AXIS_STYLE, CHART_FONT, DATAVIS } from './datavis';
import { EChart } from './EChart';

export type ScatterPoint = { x: number; y: number; name?: string };

type Props = {
  points: ScatterPoint[];
  height?: number;
  ariaLabel: string;
  color?: string;
  showQuadrants?: boolean;
  xName?: string;
  yName?: string;
};

export function ScatterChart({
  points,
  height = 260,
  ariaLabel,
  color = DATAVIS.blue,
  showQuadrants = true,
  xName = 'X',
  yName = 'Y',
}: Props) {
  const option = useMemo<EChartsOption>(() => {
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const midX = (Math.min(...xs, 0) + Math.max(...xs, 1)) / 2;
    const midY = (Math.min(...ys, 0) + Math.max(...ys, 1)) / 2;

    return {
      textStyle: { fontFamily: CHART_FONT },
      grid: { left: 12, right: 16, top: 24, bottom: 12, containLabel: true },
      tooltip: {
        trigger: 'item',
        backgroundColor: '#121318',
        borderColor: '#eeeeee',
        borderWidth: 1,
        textStyle: { color: '#ffffff', fontFamily: CHART_FONT, fontSize: 12 },
        formatter: (params: unknown) => {
          const p = params as { data?: [number, number]; name?: string };
          const [x, y] = p.data ?? [0, 0];
          return `${p.name ? `${p.name}<br/>` : ''}${xName}: ${x}<br/>${yName}: ${y}`;
        },
      },
      xAxis: {
        type: 'value',
        name: xName,
        nameTextStyle: AXIS_STYLE,
        axisLine: { show: true, lineStyle: { color: '#e3e3e3' } },
        axisTick: { show: true },
        axisLabel: AXIS_STYLE,
        splitLine: { show: false },
      },
      yAxis: {
        type: 'value',
        name: yName,
        nameTextStyle: AXIS_STYLE,
        axisLine: { show: true, lineStyle: { color: '#e3e3e3' } },
        axisTick: { show: true },
        axisLabel: AXIS_STYLE,
        splitLine: { show: false },
      },
      series: [
        {
          type: 'scatter',
          symbolSize: 10,
          itemStyle: { color },
          data: points.map((p) => ({
            value: [p.x, p.y],
            name: p.name,
          })),
          markLine: showQuadrants
            ? {
                silent: true,
                symbol: 'none',
                lineStyle: { type: 'dashed', color: '#ababad', width: 1 },
                data: [{ xAxis: midX }, { yAxis: midY }],
                label: { show: false },
              }
            : undefined,
        },
      ],
    };
  }, [points, color, showQuadrants, xName, yName]);

  return <EChart option={option} height={height} ariaLabel={ariaLabel} />;
}
