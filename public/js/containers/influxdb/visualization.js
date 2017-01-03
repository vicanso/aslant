import React, { PropTypes, Component } from 'react';
import {
  Line,
  Bar,
  Pie,
  Circle,
  d3,
} from 'dcharts';
import * as _ from 'lodash';
import classnames from 'classnames';

import Table from '../../components/table';
import * as influxdbService from '../../services/influxdb';

class Visualization extends Component {
  constructor(props) {
    super(props);
    this.state = props.data || {};
    if (props.config) {
      this.getData(props);
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      forceUpdatedAt,
      time,
    } = this.props;
    const different = nextProps.time !== time;
    const updated = nextProps.forceUpdatedAt && nextProps.forceUpdatedAt !== forceUpdatedAt;
    if (different || updated) {
      this.getData(nextProps);
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  getData(props) {
    const {
      time,
    } = props;
    const {
      config,
      showError,
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
      result.aggregations = data.aggregations;
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
      aggregations,
      view,
    } = this.state;
    const chartView = (Fn) => {
      const chartData = influxdbService.toChartData(data, tags, aggregations);
      if (!chartData.data || !chartData.data.length) {
        chart.innerHTML = '<p class="tac mtop10">无数据</p>';
        return;
      }
      chart.innerHTML = '<svg></svg>';
      const item = new Fn(chart.children[0]);
      item.set({
        'title.height': 0,
        'disabled.legend': true,
        duration: 0,
      });
      if (view.type === 'circle') {
        const circleData = chartData.data[0];
        item.render(circleData.data[0] / 100);
      } else if (view.type === 'pie') {
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
          curve: d3.curveCatmullRom.alpha(0.5),
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
      case 'circle': {
        chartView(Circle);
        break;
      }
      default: {
        chartView(Line);
        break;
      }
    }
  }
  renderTable() {
    const {
      data,
      aggregations,
    } = this.state;
    const {
      setting,
    } = this.props;
    const tableData = influxdbService.toTableData(data, aggregations);
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
        pageSize={_.get(setting, 'table.pageSize')}
      />
    ));
    return (
      <div>
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
    if (view.type === 'table') {
      if (this.chart) {
        this.chart.innerHTML = '';
      }
      return this.renderTable();
    }
    const cls = {
      chart: true,
    };
    cls[view.type] = true;
    const style = {
      margin: '10px',
    };
    const chartHeight = _.get(this.props, 'setting.chart.height');
    // the height of circle chart is fixed
    if (chartHeight && view.type !== 'circle') {
      style.height = `${chartHeight}px`;
    }
    return (
      <div
        className={classnames(cls)}
        style={style}
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
      <div className="influx-visualization">
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
  setting: PropTypes.object,
  forceUpdatedAt: PropTypes.number,
};

export default Visualization;
