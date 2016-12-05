import React, { PropTypes, Component } from 'react';
import {
  Line,
  Bar,
  Pie,
} from 'dcharts';
import classnames from 'classnames';
import * as _ from 'lodash';

import Table from '../../components/table';
import * as influxdbService from '../../services/influxdb';

class Visualization extends Component {
  constructor(props) {
    super(props);
    this.state = props.data || {};
    if (props.config) {
      this.getData();
    }
  }
  getData() {
    const {
      config,
      showError,
    } = this.props;
    const result = {};
    /* eslint no-underscore-dangle:0 */
    influxdbService.getConfig(config._id, {
      fill: ['series'].join(','),
    }).then((data) => {
      result.view = data.view;
      result.cals = data.cals;
      result.tags = influxdbService.formatSeries(data.series).tags;
      const {
        server,
        database,
      } = data;
      const ql = influxdbService.getInfluxQL(data);
      return influxdbService.query(server, database, ql);
    }).then((data) => {
      result.data = data;
      this.setState(result);
    }).catch(showError);
  }
  renderChart() {
    const {
      chart,
    } = this;
    const {
      data,
      tags,
      cals,
      view,
    } = this.state;
    const chartView = (Fn) => {
      const chartData = influxdbService.toChartData(data, tags, cals);
      chart.innerHTML = '<svg></svg>';
      const item = new Fn(chart.children[0]);
      if (view.type === 'pie') {
        const arr = _.map(chartData.data, (tmp) => {
          const value = tmp.data[0];
          return {
            name: tmp.name,
            value,
          };
        });
        item.render(arr);
      } else {
        item.set({
          'xAxis.distance': 100,
          'xAxis.categories': chartData.categories,
        })
        .render(chartData.data);
      }
    };
    switch (view.type) {
      case 'bar': {
        chartView(Bar);
        break;
      }
      case 'pie': {
        chartView(Pie);
        break;
      }
      default: {
        chartView(Line);
        break;
      }
    }
  }
  renderTable(cls) {
    const {
      data,
      cals,
    } = this.state;
    const tableData = influxdbService.toTableData(data, cals);
    const arr = _.map(tableData, item => (
      <Table
        key={item.name}
        keys={item.keys}
        items={item.items}
      />
    ));
    return (
      <div
        className={classnames(cls)}
      >
        { arr }
      </div>
    );
  }
  renderVisualization() {
    const {
      view,
      data,
    } = this.state;
    if (!data) {
      return (
        <p className="tac mtop10">数据加载中，请稍候...</p>
      );
    }
    const cls = {};
    if (view.type === 'table') {
      cls['table-wrapper'] = true;
      return this.renderTable(cls);
    }
    cls['chart-wrapper'] = true;
    return (
      <div
        className={classnames(cls)}
        ref={(c) => {
          this.chart = c;
          if (this.chart) {
            this.renderChart();
          }
        }}
      />
    );
  }
  render() {
    return (
      <div className="influx-visualization-wrapper">
        { this.renderVisualization() }
      </div>
    );
  }
}

Visualization.propTypes = {
  data: PropTypes.object,
  config: PropTypes.object,
  showError: PropTypes.func.isRequired,
};

export default Visualization;
