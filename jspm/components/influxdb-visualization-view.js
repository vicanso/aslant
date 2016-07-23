'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as util from '../helpers/util';
import * as influxdbAction from '../actions/influxdb';
import SeriesTable from './series-table';
import Chart from './chart';
import { STATS_VIEW_TYPES } from '../constants/common';
import RadioSelector from './radio-selector';

class InfluxdbVisualizationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doingQuery: false,
      originalQL: '',
      timer: null,
      type: props.type || STATS_VIEW_TYPES[0]
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
    const { configure, autoRefresh, offsetTime } = this.props;
    let tmp = configure;
    if (offsetTime && offsetTime !== 'Custom') {
      tmp = Object.assign({}, configure, {
        offsetTime,
      });
    }
    const ql = util.getInfluxQL(tmp);
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
  renderStatsViewSelector() {
    const { configure } = this.props;
    return (
      <RadioSelector
        className="statsViewSelector"
        desc={'stats view:'}
        options={STATS_VIEW_TYPES}
        selected={this.state.type}
        onSelect={option => {
          if (this.state.type !== option) {
            this.setState({
              type: option,
            });
          }
        }}
      />
    );
  }

  render() {
    this.updateSeries();
    const { series, doingQuery, type } = this.state;
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
        {this.renderStatsViewSelector()}
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
