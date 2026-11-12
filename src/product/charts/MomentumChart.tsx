import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';

import { AXIS_STYLE, CHART_FONT, DATAVIS } from './datavis';
import { EChart } from './EChart';

export type MomentumEvent = {
  minute: number;
  type: 'goal' | 'yellow' | 'red' | 'sub';
  team: 'home' | 'away';
};

type Props = {
  minutes: number[];
  homeValues: number[];
  awayValues: number[];
  homeLabel: string;
  awayLabel: string;
  homeColor?: string;
  awayColor?: string;
  events?: MomentumEvent[];
  height?: number;
  ariaLabel: string;
};

export function MomentumChart({
  minutes,
  homeValues,
  awayValues,
  homeLabel,
  awayLabel,
  homeColor = DATAVIS.jade,
  awayColor = DATAVIS.blue,
  events = [],
  height = 280,
  ariaLabel,
}: Props) {
  const option = useMemo<EChartsOption>(() => {
    const eventMarkLines = events.map((event) => ({
      xAxis: String(event.minute),
      lineStyle: { type: 'dashed' as const, color: '#ababad', width: 1 },
      label: {
        show: true,
        formatter: event.type === 'goal' ? '⚽' : event.type === 'yellow' ? 'YC' : event.type === 'red' ? 'RC' : '⇄',
        color: '#44464e',
        fontSize: 10,
        position: event.team === 'home' ? ('insideEndTop' as const) : ('insideEndBottom' as const),
      },
    }));

    return {
      textStyle: { fontFamily: CHART_FONT },
      legend: {
        bottom: 0,
        textStyle: { ...AXIS_STYLE },
        data: [homeLabel, awayLabel],
      },
      grid: { left: 8, right: 12, top: 28, bottom: 36, containLabel: true },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#121318',
        borderColor: '#eeeeee',
        borderWidth: 1,
        textStyle: { color: '#ffffff', fontFamily: CHART_FONT, fontSize: 12 },
      },
      xAxis: {
        type: 'category',
        data: minutes.map(String),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          ...AXIS_STYLE,
          interval: Math.max(0, Math.floor(minutes.length / 10) - 1),
        },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: AXIS_STYLE,
        splitLine: { lineStyle: { color: '#eeeeee' } },
      },
      series: [
        {
          name: homeLabel,
          type: 'bar',
          stack: 'momentum',
          barMaxWidth: 8,
          itemStyle: { color: homeColor, borderRadius: [4, 4, 0, 0] },
          data: homeValues,
          markLine:
            eventMarkLines.length > 0
              ? { silent: true, symbol: 'none', data: eventMarkLines }
              : undefined,
        },
        {
          name: awayLabel,
          type: 'bar',
          stack: 'momentum',
          barMaxWidth: 8,
          itemStyle: { color: awayColor, borderRadius: [0, 0, 4, 4] },
          data: awayValues.map((v) => -Math.abs(v)),
        },
      ],
    };
  }, [
    minutes,
    homeValues,
    awayValues,
    homeLabel,
    awayLabel,
    homeColor,
    awayColor,
    events,
  ]);

  return (
    <EChart
      option={option}
      height={height}
      minWidth={`calc(${minutes.length} * 10px + var(--space-1000))`}
      ariaLabel={ariaLabel}
    />
  );
}
