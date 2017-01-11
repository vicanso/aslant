// the influxdb chart view type
export const CHART_TYPES = [
  {
    type: 'line',
    icon: 'pt-icon-chart',
    name: 'line chart',
  },
  {
    type: 'bar',
    icon: 'pt-icon-timeline-bar-chart',
    name: 'bar chart',
  },
  {
    type: 'pie',
    icon: 'pt-icon-pie-chart',
    name: 'pie chart',
  },
  {
    type: 'circle',
    icon: 'pt-icon-doughnut-chart',
    name: 'circle chart',
  },
  {
    type: 'table',
    icon: 'pt-icon-th',
    name: 'table view',
  },
];

// the influxdb chart view width
export const CHART_WIDTHS = [
  {
    width: '1',
    name: '1/12 view',
    className: 'column-1-12',
  },
  {
    width: '2',
    name: '1/6 view',
    className: 'column-1-6',
  },
  {
    width: '3',
    name: '1/4 view',
    className: 'column-1-4',
  },
  {
    width: '4',
    name: '1/3 view',
    className: 'column-1-3',
  },
  {
    width: '5',
    name: '5/12 view',
    className: 'column-5-12',
  },
  {
    width: '6',
    name: '1/2 view',
    className: 'column-1-2',
  },
  {
    width: '7',
    name: '7/12 view',
    className: 'column-7-12',
  },
  {
    width: '8',
    name: '2/3 view',
    className: 'column-2-3',
  },
  {
    width: '9',
    name: '3/4 view',
    className: 'column-3-4',
  },
  {
    width: '10',
    name: '5/6 view',
    className: 'column-5-6',
  },
  {
    width: '11',
    name: '11/12 view',
    className: 'column-11-12',
  },
  {
    width: '12',
    name: 'full view',
    className: 'column-1',
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
    name: 'Past 2 hours',
    value: '-2h',
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
    name: 'Yesterday',
    value: 'yesterday',
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
  {
    name: 'Custom',
    value: 'custom',
  },
];

// the influxdb query group time interval
export const GROUP_INTERVALS = '10s 30s 1m 5m 10m 15m 30m 1h 2h 6h 12h 1d 2d 7d 30d'.split(' ');

export const AUTO_REFRESH_INTERVALS = [
  {
    name: 'None',
    value: 0,
  },
  {
    name: 'Every 5 seconds',
    value: 5,
  },
  {
    name: 'Every 10 seconds',
    value: 10,
  },
  {
    name: 'Every 15 seconds',
    value: 15,
  },
  {
    name: 'Every 30 seconds',
    value: 30,
  },
  {
    name: 'Every 40 seconds',
    value: 45,
  },
  {
    name: 'Every minute',
    value: 60,
  },
  {
    name: 'Every 5 minutes',
    value: 5 * 60,
  },
  {
    name: 'Every 10 minutes',
    value: 10 * 60,
  },
];
