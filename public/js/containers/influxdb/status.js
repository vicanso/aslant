import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';

import * as influxdbService from '../../services/influxdb';

class Status extends Component {
  constructor(props) {
    super(props);
    const {
      id,
    } = props;
    this.state = {
      db: {
        status: 'fetching'
      },
    };
    influxdbService.showDatabases(id)
      .then(this.createSuccessHandler('db'))
      .catch(this.createErrorHandler('db'));
  }
  createErrorHandler(key) {
    return (err) => {
      const data = {};
      data[key] = {
        status: 'error',
        error: _.get(err, 'response.body.message', err.message),
      };
      this.setState(data);
    };
  }
  createSuccessHandler(key) {
    return (items) => {
      const data = {};
      data[key] = {
        status: '',
        items,
      };
      this.setState(data);
    };
  }
  getStatus(db) {
    const {
      id,
    } = this.props;
    this.setState({
      rps: {
        status: 'fetching',
      },
      measurements: {
        status: 'fetching',
      },
    });
    influxdbService.showRps(id, db)
      .then(this.createSuccessHandler('rps'))
      .catch(this.createErrorHandler('rps'));
    influxdbService.showMeasurements(id, db)
      .then(this.createSuccessHandler('measurements'))
      .catch(this.createErrorHandler('measurements'));
    influxdbService.showTagKeys(id, db)
      .then(this.createSuccessHandler('tagKeys'))
      .catch(this.createErrorHandler('tagKeys'));
    influxdbService.showFieldKeys(id, db)
      .then(this.createSuccessHandler('fieldKeys'))
      .catch(this.createErrorHandler('fieldKeys'));
    influxdbService.showSeries(id, db)
      .then(this.createSuccessHandler('series'))
      .catch(this.createErrorHandler('series'));
  }
  renderDatabase() {
    const dbConfig = this.state.db;
    const {
      status,
      error,
      items,
      current,
    } = dbConfig;
    const arr = _.map(items, (db) => {
      const cls = {
        active: false,
      };
      if (current === db) {
        cls.active = true;
      }
      return (
        <li
          key={db}
          className={classnames(cls)}
        >
          <a
            href="javascript:;"
            onClick={(e) => {
              e.preventDefault();
              dbConfig.current = db;
              this.setState({
                db: dbConfig,
              });
              this.getStatus(db);
            }}
          >{db}</a>
        </li>
      );
    });

    return (
      <div
        className="server-status"
      >
        <h3>Databases</h3>
        {
          this.renderStatus(status, error)
        }
        <ul
          className="dbs"
        >
          { arr }
        </ul>
      </div>
    );
  }
  renderFieldKeys() {
    return this.renderKeys('fieldKeys');
  }
  renderKeys(type) {
    if (!_.get(this.state, 'db.current')) {
      return null;
    }
    const config = this.state[type];
    if (!config) {
      return null;
    }
    const {
      status,
      error,
      items,
    } = config;
    const titleDict = {
      tagKeys: 'Tag Keys',
      fieldKeys: 'Field Keys',
    };
    const arr = _.map(items, (item) => {
      const name = item.name;
      const values = _.map(item.values, (value) => {
        let type = null;
        if (value.type) {
          type = <td>{value.type}</td>;
        }
        return (
          <tr
            key={value.key}
          >
            <td>{value.key}</td>
            { type }
          </tr>
        );
      });
      return (
        <div
          key={name}
          className="pure-u-1-5 keys-wrapper"
        >
          <div className="keys">
            <h4>{name}</h4>
            <table>
              <tbody>
                { values }
              </tbody>
            </table>
          </div>
        </div>
      );
    });
    return (
      <div
        className="server-status"
      >
        <h3>{titleDict[type]}</h3>
        {
          this.renderStatus(status, error)
        }
        <div className="pure-g">
          { arr }
        </div>
      </div>
    );
  }
  renderMeasurements() {
    if (!_.get(this.state, 'db.current')) {
      return null;
    }
    const measurementsConfig = this.state.measurements;
    if (!measurementsConfig) {
      return null;
    }
    const {
      status,
      error,
      items,
    } = measurementsConfig;
    const arr = _.map(items, item => (
      <li
        key={item}
      >
        {item}
      </li>
    ));
    return (
      <div
        className="server-status"
      >
        <h3>Measurements</h3>
        {
          this.renderStatus(status, error)
        }
        <ul
          className="measurements"
        >
          { arr }
        </ul>
      </div>
    );
  }
  renderRps() {
    if (!_.get(this.state, 'db.current')) {
      return null;
    }
    const rpsConfig = this.state.rps;
    if (!rpsConfig) {
      return null;
    }
    const {
      status,
      error,
      items,
    } = rpsConfig;
    const renderTable = (items) => {
      if (!items) {
        return null;
      }
      const arr = _.map(items, (item, index) => {
        return (
          <tr
            key={index}
          >
            <td>{item.name}</td>
            <td>{item.duration}</td>
            <td>{item.shardGroupDuration}</td>
            <td>{item.replicaN}</td>
            <td>{`${item.default}`}</td>
          </tr>
        );
      });
      return (
        <table className="pure-table">
          <thead><tr>
            <th>name</th>
            <th>duration</th>
            <th>shardGroupDuration</th>
            <th>replicaN</th>
            <th>default</th>
          </tr></thead>
          <tbody>
            { arr }
          </tbody>
        </table>
      );
    };
    return (
      <div
        className="server-status"
      >
        <h3>Retention Policy</h3>
        {
          this.renderStatus(status, error)
        }
        { renderTable(items) }
      </div>
    );
  }
  renderSeries() {
    if (!_.get(this.state, 'db.current')) {
      return null;
    }
    const seriesConfig = this.state.series;
    if (!seriesConfig) {
      return null;
    }
    const {
      status,
      error,
      items,
    } = seriesConfig;
    const renderTable = (items) => {
      if (!items) {
        return null;
      }
      const arr = _.map(items, (item, index) => {
        const tmpArr = item.split(',');
        const measurement = tmpArr.shift();
        return (
          <tr
            key={index}
          >
            <td>{measurement}</td>
            <td>{tmpArr.join()}</td>
          </tr>
        );
      });

      return (
        <table className="pure-table">
          <thead><tr>
            <th>measurement</th>
            <th>series</th>
          </tr></thead>
          <tbody>
            { arr }
          </tbody>
        </table>
      );
    };
    return (
      <div
        className="server-status"
      >
        <h3>Series</h3>
        {
          this.renderStatus(status, error)
        }
        {
          renderTable(items)
        }
      </div>
    );
  }
  renderStatus(status, error) {
    if (status === 'fetching') {
      return <p className="tac">Loading...</p>;
    }
    if (status === 'error') {
      return <p className="flash flash-error">{error}</p>;
    }
    return null;
  }
  renderTagKeys() {
    return this.renderKeys('tagKeys');
  }
  render() {
    const {
      status,
      error,
    } = this.state;
    return (
      <div
        className="server-status-wrapper"
      >
        {
          this.renderDatabase()
        }
        {
          this.renderRps()
        }
        {
          this.renderMeasurements()
        }
        {
          this.renderTagKeys()
        }
        {
          this.renderFieldKeys()
        }
        {
          this.renderSeries()
        }
      </div>
    );
  }
}

Status.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default Status;
