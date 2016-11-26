// the influxdb chart view type
export const CHART_TYPES = [
  {
    type: 'line',
    icon: 'pt-icon-chart',
    title: 'line chart',
  },
  {
    type: 'bar',
    icon: 'pt-icon-timeline-bar-chart',
    title: 'bar chart',
  },
  {
    type: 'table',
    icon: 'pt-icon-th',
    title: 'table view',
  },
];

// the influxdb chart view width
export const CHART_WIDTHS = [
  {
    width: '20%',
    title: '20% view',
  },
  {
    width: '33%',
  },
  {
    width: '40%',
    title: '40% view',
  },
  {
    width: '50%',
    title: '50% view',
  },
  {
    width: '60%',
    title: '60% view',
  },
  {
    width: '80%',
    title: '80% view',
  },
  {
    width: '100%',
    title: '100% view',
  },
];

// the influxdb query time(start or end)
export const TIME_INTERVALS = [
  {
    name: 'Past 5 minutes',
    value: '-5m',
  },
  {
    name: 'Past 15 minutes',
    value: '-15m',
  },
  {
    name: 'Past 30 minutes',
    value: '-30m',
  },
  {
    name: 'Past hour',
    value: '-1h',
  },
  {
    name: 'Past 6 hours',
    value: '-6h',
  },
  {
    name: 'Past 12 hours',
    value: '-12h',
  },
  {
    name: 'Past 24 hours',
    value: '-24h',
  },
  {
    name: 'Today',
    value: 'today',
  },
  {
    name: 'Past 2 days',
    value: '-2d',
  },
  {
    name: 'Past 7 days',
    value: '-7d',
  },
  {
    name: 'Past 30 days',
    value: '-30d',
  },
];

// the influxdb query group time interval
export const GROUP_INTERVALS = '10s 30s 1m 5m 10m 15m 30m 1h 2h 6h 12h 1d 2d 7d 30d'.split(' ');
