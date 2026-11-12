/** HelloPC datavis palette — identical in light & dark (cake.lenovo.com/datavis). */
export const DATAVIS = {
  indigo: '#7586FF',
  cyan: '#00BBDF',
  yellow: '#E2C600',
  pink: '#F65396',
  jade: '#2CC27E',
  amber: '#FB911C',
  lime: '#9DB600',
  purple: '#DD8AFF',
  gold: '#FCBB42',
  blue: '#75ADFD',
  red: '#FF8886',
  neutral: '#ABABAB',
} as const;

export const DATAVIS_SERIES = [
  DATAVIS.indigo,
  DATAVIS.cyan,
  DATAVIS.yellow,
  DATAVIS.pink,
  DATAVIS.jade,
  DATAVIS.amber,
  DATAVIS.lime,
  DATAVIS.purple,
  DATAVIS.gold,
  DATAVIS.blue,
] as const;

export const CHART_FONT =
  "'Rookery New','Rookery','Noto Sans',var(--font-family),system-ui,sans-serif";

export const AXIS_STYLE = {
  color: '#44464e',
  fontFamily: CHART_FONT,
  fontSize: 12,
} as const;
