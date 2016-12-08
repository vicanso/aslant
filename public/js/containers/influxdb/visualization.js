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
  componentWillMount() {
    clearInterval(this.timer);
  }
  componentWillReceiveProps(nextProps) {
    const {
      forceUpdatedAt,
    } = this.props;
    if (nextProps.forceUpdatedAt && nextProps.forceUpdatedAt !== forceUpdatedAt) {
      this.getData();
    }
  }
  getData() {
    const {
      config,
      showError,
      time,
    } = this.props;
    const result = {};
    /* eslint no-underscore-dangle:0 */
    influxdbService.getConfig(config._id, {
      fill: ['series'].join(','),
    }).then((data) => {
      if (time) {
        /* eslint no-param-reassign:0 */
        data.time = time;
      }
      result.config = data;
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
    }).catch((err) => {
      showError(err);
      result.error = `加载数据失败:${err.response.body.message}`;
      this.setState(result);
    });
  }
  startAutoRefresh(interval) {
    if (this.timer) {
      clearInterval(this.timer);
    }
    const {
      config,
    } = this.state;
    if (!config) {
      return;
    }
    const {
      time,
    } = this.props;
    const {
      server,
      database,
    } = config;
    if (time) {
      config.time = time;
    }
    const ql = influxdbService.getInfluxQL(config);
    if (interval) {
      this.timer = setInterval(() => {
        influxdbService.query(server, database, ql).then((data) => {
          this.setState({
            data,
          });
        });
      }, interval * 1000);
    }
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
      if (!chartData.data || !chartData.data.length) {
        chart.innerHTML = '<p class="tac mtop10">无数据</p>';
        return;
      }
      chart.innerHTML = '<svg></svg>';
      const item = new Fn(chart.children[0]);
      item.set('disabled.legend', true);
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
          duration: 0,
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
    if (!tableData || !tableData.length) {
      return (
        <p className="tac mtop10">无数据</p>
      );
    }
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
      error,
    } = this.state;
    if (error) {
      return (
        <div className="tac mtop10">{error}</div>
      );
    }
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
    const {
      interval,
    } = this.props;
    this.startAutoRefresh(interval);
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
  interval: PropTypes.number,
  time: PropTypes.object,
  forceUpdatedAt: PropTypes.number,
};

export default Visualization;
