'use strict';
/* eslint  import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as echarts from 'echarts';
import * as formater from '../helpers/echarts-formater';

class Chart extends Component {
  componentDidMount() {
    const chart = echarts.init(this.refs.chart);
    this.chart = chart;
    chart.setOption(this.getOption());
  }
  componentWillReceiveProps(nextProps) {
    const chart = this.chart;
    if (nextProps.type !== this.props.type && chart) {
      chart.clear();
    }
  }
  componentDidUpdate() {
    const chart = this.chart;
    chart.setOption(this.getOption());
  }
  getOption() {
    const { type, series } = this.props;
    let fn;
    switch (type) {
      case 'pie-chart':
        fn = formater.getPieOption;
        break;
      case 'bar-chart':
        fn = formater.getBarOption;
        break;
      default:
        fn = formater.getLineOption;
        break;
    }
    return fn(series, this.props.name);
  }
  render() {
    return (
      <div className="chartContainer">
        <div
          ref="chart"
          style={{
            height: '100%',
          }}
        >
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  series: PropTypes.object.isRequired,
};

export default Chart;
