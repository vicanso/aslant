'use strict';
/* eslint  import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as echarts from 'echarts';
import * as formater from '../helpers/echarts-formater';

class Chart extends Component {
  getOption() {
    const { type, series } = this.props;
    let fn;
    switch (type) {
      case 'pie-chart':
        fn = formater.getPieOption;
        break;
      default:
        fn = formater.getLineOption;
        break;
    }
    return fn(series, this.props.name);
  }
  componentWillReceiveProps(nextProps) {
    const chart = this.chart;
    if (nextProps.type !== this.props.type && chart) {
      chart.clear();
    }
  }
  componentDidMount() {
    const chart = echarts.init(this.refs.chart);
    this.chart = chart;
    chart.setOption(this.getOption());
  }
  componentDidUpdate() {
    const chart = this.chart;
    chart.setOption(this.getOption());
  }
  render() {
    return (
      <div className="chartContainer">
        <div ref="chart" style={{"height":"100%"}}>
        </div>
      </div>
    );
  }
}

export default Chart;
