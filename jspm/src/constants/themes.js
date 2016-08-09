'use strict';
const macaronsColorPalette = [
  '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
  '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
  '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
  '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089',
];
const infoGraphicColorPalette = [
  '#C1232B', '#27727B', '#FCCE10', '#E87C25', '#B5C334',
  '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
  '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0',
];
const vintageColorPalette = [
  '#d87c7c', '#919e8b', '#d7ab82', '#6e7074', '#61a0a8',
  '#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b',
];
const darkColorPalette = [
  '#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53',
  '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c',
  '#f49f42',
];
const darkContrastColor = '#eee';
const shineColorPalette = [
  '#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa',
  '#339ca8', '#cda819', '#32a487',
];

function axisCommon() {
  const contrastColor = '#eee';
  return {
    axisLine: {
      lineStyle: {
        color: contrastColor,
      },
    },
    axisTick: {
      lineStyle: {
        color: contrastColor,
      },
    },
    axisLabel: {
      textStyle: {
        color: contrastColor,
      },
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#aaa',
      },
    },
    splitArea: {
      areaStyle: {
        color: contrastColor,
      },
    },
  };
}

export const MACARONS = {
  color: macaronsColorPalette,
  title: {
    textStyle: {
      fontWeight: 'normal',
      color: '#008acd',
    },
  },
  visualMap: {
    itemWidth: 15,
    color: ['#5ab1ef', '#e0ffff'],
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: macaronsColorPalette[0],
      },
    },
  },
  tooltip: {
    backgroundColor: 'rgba(50,50,50,0.5)',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#008acd',
      },
      crossStyle: {
        color: '#008acd',
      },
      shadowStyle: {
        color: 'rgba(200,200,200,0.2)',
      },
    },
  },
  dataZoom: {
    dataBackgroundColor: '#efefff',
    fillerColor: 'rgba(182,162,222,0.2)',
    handleColor: '#008acd',
  },
  grid: {
    borderColor: '#eee',
  },
  categoryAxis: {
    axisLine: {
      lineStyle: {
        color: '#008acd',
      },
    },
    splitLine: {
      lineStyle: {
        color: ['#eee'],
      },
    },
  },
  valueAxis: {
    axisLine: {
      lineStyle: {
        color: '#008acd',
      },
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)'],
      },
    },
    splitLine: {
      lineStyle: {
        color: ['#eee'],
      },
    },
  },
  timeline: {
    lineStyle: {
      color: '#008acd',
    },
    controlStyle: {
      normal: {
        color: '#008acd',
      },
      emphasis: {
        color: '#008acd',
      },
    },
    symbol: 'emptyCircle',
    symbolSize: 3,
  },
  line: {
    smooth: true,
    symbol: 'emptyCircle',
    symbolSize: 3,
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: '#d87a80',
        color0: '#2ec7c9',
        lineStyle: {
          color: '#d87a80',
          color0: '#2ec7c9',
        },
      },
    },
  },
  scatter: {
    symbol: 'circle',
    symbolSize: 4,
  },
  map: {
    label: {
      normal: {
        textStyle: {
          color: '#d87a80',
        },
      },
    },
    itemStyle: {
      normal: {
        borderColor: '#eee',
        areaColor: '#ddd',
      },
      emphasis: {
        areaColor: '#fe994e',
      },
    },
  },
  graph: {
    color: macaronsColorPalette,
  },
  gauge: {
    axisLine: {
      lineStyle: {
        color: [
          [0.2, '#2ec7c9'],
          [0.8, '#5ab1ef'],
          [1, '#d87a80'],
        ],
        width: 10,
      },
    },
    axisTick: {
      splitNumber: 10,
      length: 15,
      lineStyle: {
        color: 'auto',
      },
    },
    splitLine: {
      length: 22,
      lineStyle: {
        color: 'auto',
      },
    },
    pointer: {
      width: 5,
    },
  },
};

export const INFO_GRAPHIC = {
  color: infoGraphicColorPalette,
  title: {
    textStyle: {
      fontWeight: 'normal',
      color: '#27727B',
    },
  },
  visualMap: {
    color: ['#C1232B', '#FCCE10'],
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: infoGraphicColorPalette[0],
      },
    },
  },
  tooltip: {
    backgroundColor: 'rgba(50,50,50,0.5)',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#27727B',
        type: 'dashed',
      },
      crossStyle: {
        color: '#27727B',
      },
      shadowStyle: {
        color: 'rgba(200,200,200,0.3)',
      },
    },
  },
  dataZoom: {
    dataBackgroundColor: 'rgba(181,195,52,0.3)',
    fillerColor: 'rgba(181,195,52,0.2)',
    handleColor: '#27727B',
  },
  categoryAxis: {
    axisLine: {
      lineStyle: {
        color: '#27727B',
      },
    },
    splitLine: {
      show: false,
    },
  },
  valueAxis: {
    axisLine: {
      show: false,
    },
    splitArea: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        color: ['#ccc'],
        type: 'dashed',
      },
    },
  },
  timeline: {
    lineStyle: {
      color: '#27727B',
    },
    controlStyle: {
      normal: {
        color: '#27727B',
        borderColor: '#27727B',
      },
    },
    symbol: 'emptyCircle',
    symbolSize: 3,
  },
  line: {
    itemStyle: {
      normal: {
        borderWidth: 2,
        borderColor: '#fff',
        lineStyle: {
          width: 3,
        },
      },
      emphasis: {
        borderWidth: 0,
      },
    },
    symbol: 'circle',
    symbolSize: 3.5,
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: '#C1232B',
        color0: '#B5C334',
        lineStyle: {
          width: 1,
          color: '#C1232B',
          color0: '#B5C334',
        },
      },
    },
  },
  graph: {
    color: infoGraphicColorPalette,
  },
  map: {
    label: {
      normal: {
        textStyle: {
          color: '#C1232B',
        },
      },
      emphasis: {
        textStyle: {
          color: 'rgb(100,0,0)',
        },
      },
    },
    itemStyle: {
      normal: {
        areaColor: '#ddd',
        borderColor: '#eee',
      },
      emphasis: {
        areaColor: '#fe994e',
      },
    },
  },
  gauge: {
    axisLine: {
      lineStyle: {
        color: [
          [0.2, '#B5C334'],
          [0.8, '#27727B'],
          [1, '#C1232B'],
        ],
      },
    },
    axisTick: {
      splitNumber: 2,
      length: 5,
      lineStyle: {
        color: '#fff',
      },
    },
    axisLabel: {
      textStyle: {
        color: '#fff',
      },
    },
    splitLine: {
      length: '5%',
      lineStyle: {
        color: '#fff',
      },
    },
    title: {
      offsetCenter: [0, -20],
    },
  },
};

export const VINTAGE = {
  color: vintageColorPalette,
  backgroundColor: '#fef8ef',
  graph: {
    color: vintageColorPalette,
  },
};

export const DARK = {
  color: darkColorPalette,
  backgroundColor: '#333',
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: darkContrastColor,
      },
      crossStyle: {
        color: darkContrastColor,
      },
    },
  },
  legend: {
    textStyle: {
      color: darkContrastColor,
    },
  },
  textStyle: {
    color: darkContrastColor,
  },
  title: {
    textStyle: {
      color: darkContrastColor,
    },
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: darkContrastColor,
      },
    },
  },
  dataZoom: {
    textStyle: {
      color: darkContrastColor,
    },
  },
  timeline: {
    lineStyle: {
      color: darkContrastColor,
    },
    itemStyle: {
      normal: {
        color: darkColorPalette[1],
      },
    },
    label: {
      normal: {
        textStyle: {
          color: darkContrastColor,
        },
      },
    },
    controlStyle: {
      normal: {
        color: darkContrastColor,
        borderColor: darkContrastColor,
      },
    },
  },
  timeAxis: axisCommon(),
  logAxis: axisCommon(),
  valueAxis: axisCommon(),
  categoryAxis: axisCommon(),
  line: {
    symbol: 'circle',
  },
  graph: {
    color: darkColorPalette,
  },
  gauge: {
    title: {
      textStyle: {
        color: darkContrastColor,
      },
    },
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: '#FD1050',
        color0: '#0CF49B',
        borderColor: '#FD1050',
        borderColor0: '#0CF49B',
      },
    },
  },
};

export const SHINE = {
  color: shineColorPalette,
  title: {
    textStyle: {
      fontWeight: 'normal',
    },
  },
  visualMap: {
    color: ['#1790cf', '#a2d4e6'],
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: '#06467c',
      },
    },
  },
  tooltip: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  dataZoom: {
    dataBackgroundColor: '#dedede',
    fillerColor: 'rgba(154,217,247,0.2)',
    handleColor: '#005eaa',
  },
  timeline: {
    lineStyle: {
      color: '#005eaa',
    },
    controlStyle: {
      normal: {
        color: '#005eaa',
        borderColor: '#005eaa',
      },
    },
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: '#c12e34',
        color0: '#2b821d',
        lineStyle: {
          width: 1,
          color: '#c12e34',
          color0: '#2b821d',
        },
      },
    },
  },
  graph: {
    color: shineColorPalette,
  },
  map: {
    label: {
      normal: {
        textStyle: {
          color: '#c12e34',
        },
      },
      emphasis: {
        textStyle: {
          color: '#c12e34',
        },
      },
    },
    itemStyle: {
      normal: {
        borderColor: '#eee',
        areaColor: '#ddd',
      },
      emphasis: {
        areaColor: '#e6b600',
      },
    },
  },
  gauge: {
    axisLine: {
      show: true,
      lineStyle: {
        color: [
          [0.2, '#2b821d'],
          [0.8, '#005eaa'],
          [1, '#c12e34'],
        ],
        width: 5,
      },
    },
    axisTick: {
      splitNumber: 10,
      length: 8,
      lineStyle: {
        color: 'auto',
      },
    },
    axisLabel: {
      textStyle: {
        color: 'auto',
      },
    },
    splitLine: {
      length: 12,
      lineStyle: {
        color: 'auto',
      },
    },
    pointer: {
      length: '90%',
      width: 3,
      color: 'auto',
    },
    title: {
      textStyle: {
        color: '#333',
      },
    },
    detail: {
      textStyle: {
        color: 'auto',
      },
    },
  },
};
