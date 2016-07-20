'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as util from '../helpers/util';
import * as influxdbAction from '../actions/influxdb';
import SeriesTable from './series-table';
import Chart from './chart';

class InfluxdbVisualizationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doingQuery: false,
      originalQL: '',
      timer: null,
    };
  }
  autoRefresh(ql) {
    const { autoRefresh } = this.props;
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
    this.state.timer = setInterval(() => {
      this.getPoints(ql).then(series => {
        this.setState({
          series,
        });
      });
    }, util.toSeconds(autoRefresh) * 1000);
  }
  getPoints(ql) {
    const { configure } = this.props;
    return influxdbAction.getPoints(configure.server, configure.db, ql).then(series => {
      const extracts = configure.extracts;
      if (extracts.length) {
        const extractDescList = _.compact(_.map(extracts, extract => {
          if (!extract.value || !extract.key) {
            return '';
          }
          return `${extract.value}(${extract.key})`;
        })).sort();
        _.forEach(series, item => {
          const columns = item.columns;
          _.forEach(extractDescList, (desc, i) => {
            columns[i + 1] = desc;
          });
        });
      }
      return series;
    });
  }
  updateSeries() {
    const state = this.state;
    const { configure, autoRefresh } = this.props;
    const ql = util.getInfluxQL(configure);
    if (!ql || state.doingQuery || ql === state.originalQL) {
      return;
    }
    this.setState({
      doingQuery: true,
      originalQL: ql,
      error: '',
    });
    this.getPoints(ql).then(series => {
      this.setState({
        series,
        error: '',
        doingQuery: false,
      });
      if (autoRefresh) {
        this.autoRefresh(ql);
      }
    }).catch(err => {
      this.setState({
        series: null,
        doingQuery: false,
        error: util.getError(err),
      });
    });
  }
  renderSeriesTable() {
    const { series } = this.state;
    const { hideEmptyPoint } = this.props.configure;
    return _.map(series, item => {
      return (
        <SeriesTable
          seriesItem={item}
          hideEmptyPoint={hideEmptyPoint}
        />
      );
    });
  }
  renderCharts(type) {
    const { series } = this.state;
    return (
      <Chart
        series={series}
        type={type}
      />
    );
  }

  render() {
    this.updateSeries();
    const { type } = this.props;
    const { series, doingQuery } = this.state;
    if (!series || doingQuery) {
      return null;
    }
    if (!series.length) {
      return (
        <p className="tac">There is not stats data, please change influx ql.</p>
      );
    }
    let view;
    switch (type) {
      case 'table':
        view = this.renderSeriesTable();
        break;
      default:
        view = this.renderCharts(type);
        break;
    }
    return (
      <div
        className="visualizationView"
      >
        {
          doingQuery && 
          <p className="tac">
            <i className="fa fa-spinner" aria-hidden="true"></i>
            Loading...
          </p>
        }
        {view}
      </div>
    );
  }
}

export default InfluxdbVisualizationView;
