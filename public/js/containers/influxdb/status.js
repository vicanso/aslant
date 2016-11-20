import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';
import {
  Switch,
} from '@blueprintjs/core';

import * as influxdbService from '../../services/influxdb';

function renderStatus(status, error) {
  if (status === 'fetching') {
    return <p className="tac">Loading...</p>;
  }
  if (status === 'error') {
    return <p className="flash flash-error">{error}</p>;
  }
  return null;
}

class Status extends Component {
  constructor(props) {
    super(props);
    const {
      id,
    } = props;
    this.state = {
      db: {
        status: 'fetching',
      },
      rpConfigs: null,
    };
    influxdbService.showDatabases(id)
      .then(this.createSuccessHandler('db'))
      .catch(this.createErrorHandler('db'));
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
  addRP() {
    const {
      showError,
      id,
    } = this.props;
    const {
      db,
      rpConfigs,
    } = this.state;
    const name = rpConfigs.name.value;
    const duration = rpConfigs.duration.value;
    const replicaN = rpConfigs.replicaN.value;
    if (!name || !duration || !replicaN) {
      showError('name duration and replicaN can not be empty');
      return;
    }
    const data = {
      name,
      duration,
      replicaN,
      default: rpConfigs.isDefault || false,
    };
    influxdbService.addRP(id, db.current, data).then(() => {
      this.setState({
        rpConfigs: null,
      });
      influxdbService.showRps(id, db.current)
        .then(this.createSuccessHandler('rps'))
        .catch(this.createErrorHandler('rps'));
    }).catch(showError);
  }
  updateRP() {
    const {
      showError,
      id,
    } = this.props;
    const {
      updateItem,
    } = this.state;
    const name = updateItem.name;
    const duration = updateItem.duration.value;
    const shardDuration = updateItem.shardDuration.value;
    const replicaN = updateItem.replicaN.value;
    if (!name || !duration || !replicaN) {
      showError('name duration and replicaN can not be empty');
      return;
    }
    const data = {
      name,
      duration,
      replicaN,
      shardDuration,
      default: updateItem.isDefault || false,
    };
    console.dir(data);
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
  removeRP(item) {
    const {
      showError,
      id,
      alert,
    } = this.props;
    const {
      db,
    } = this.state;
    const content = `Confirm to remove the retention policy?(${item.name})`;
    alert(content, (type) => {
      if (type !== 'confirm') {
        return;
      }
      influxdbService.removeRP(id, db.current, item.name).then(() => {
        influxdbService.showRps(id, db.current)
          .then(this.createSuccessHandler('rps'))
          .catch(this.createErrorHandler('rps'));
      }).catch(showError);
    });
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
        'pt-tag': true,
      };
      if (current === db) {
        cls['pt-intent-success'] = true;
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
                rpConfigs: null,
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
          renderStatus(status, error)
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
        let typeDom = null;
        const key = `${value.type}-${value.key}`;
        if (value.type) {
          typeDom = <td>{value.type}</td>;
        }
        return (
          <tr
            key={key}
          >
            <td>{value.key}</td>
            { typeDom }
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
            <table className="table">
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
          renderStatus(status, error)
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
          renderStatus(status, error)
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
    const {
      showError,
      alert,
    } = this.props;
    const {
      rps,
      rpConfigs,
      updateItem,
    } = this.state;
    if (!rps) {
      return null;
    }
    const {
      status,
      error,
      items,
    } = rps;

    const renderInputs = () => (
      <tr
        key="rpConfigs"
      >
        <td>
          <input
            ref={(c) => {
              rpConfigs.name = c;
            }}
            type="text"
            placeholder="RP Name"
            className="pt-input"
          />
        </td>
        <td>
          <input
            ref={(c) => {
              rpConfigs.duration = c;
            }}
            type="text"
            placeholder="eg:2h,3d,4w"
            className="pt-input"
          />
        </td>
        <td>--</td>
        <td>
          <input
            ref={(c) => {
              rpConfigs.replicaN = c;
            }}
            defaultValue="1"
            type="number"
            className="pt-input"
          />
        </td>
        <td
          className="switch-wrapper"
        >
          <Switch
            onChange={() => {
              rpConfigs.isDefault = !rpConfigs.isDefault;
            }}
          />
        </td>
        <td>
          <a
            href="javascript:;"
            onClick={() => {
              this.addRP();
            }}
          >
            <span className="pt-icon-standard pt-icon-confirm mright5" />
          </a>
        </td>
      </tr>
    );
    const renderTable = (tableItems) => {
      if (!tableItems) {
        return null;
      }
      const noramlItem = item => (
        <tr
          key={item.name}
        >
          <td>{item.name}</td>
          <td>{item.duration}</td>
          <td>{item.shardGroupDuration}</td>
          <td>{item.replicaN}</td>
          <td
            className="switch-wrapper"
          >
            <Switch
              readOnly
              checked={item.default}
            />
          </td>
          <td>
            <a
              href="javascript:;"
              onClick={() => this.setState({
                updateItem: {
                  name: item.name,
                },
              })}
            >
              <span className="pt-icon-standard pt-icon-edit" />
            </a>
            <a
              href="javascript:;"
              onClick={() => this.removeRP(item)}
            >
              <span className="pt-icon-standard pt-icon-cross" />
            </a>
          </td>
        </tr>
      );
      const modifyItem = item => (
        <tr
          key={item.name}
        >
          <td>{item.name}</td>
          <td>
            <input
              defaultValue={item.duration}
              ref={(c) => {
                updateItem.duration = c;
              }}
              type="text"
              placeholder="eg:2h,3d,4w"
              className="pt-input"
            />
          </td>
          <td>
            <input
              defaultValue={item.shardGroupDuration}
              ref={(c) => {
                updateItem.shardDuration = c;
              }}
              type="text"
              placeholder="eg:2h,3d,4w"
              className="pt-input"
            />
          </td>
          <td>
            <input
              defaultValue={item.replicaN}
              ref={(c) => {
                updateItem.replicaN = c;
              }}
              defaultValue="1"
              type="number"
              className="pt-input"
            />
          </td>
          <td
            className="switch-wrapper"
          >
            <Switch
              defaultValue={item.default}
              onChange={() => {
                updateItem.isDefault = !updateItem.isDefault;
              }}
            />
          </td>
          <td>
            <a
              href="javascript:;"
              onClick={() => this.updateRP()}
            >
              <span className="pt-icon-standard pt-icon-confirm" />
            </a>
            <a
              href="javascript:;"
              onClick={() => this.setState({
                updateItem: null,
              })}
            >
              <span className="pt-icon-standard pt-icon-disable" />
            </a>
          </td>
        </tr>
      );
      const arr = _.map(tableItems, (item) => {
        if (updateItem && item.name === updateItem.name) {
          updateItem.isDefault = item.default;
          return modifyItem(item);
        }
        return noramlItem(item);
      });
      if (rpConfigs) {
        arr.push(renderInputs());
      }
      return (
        <table className="table">
          <thead><tr>
            <th>name</th>
            <th>duration</th>
            <th>shardGroupDuration</th>
            <th>replicaN</th>
            <th>default</th>
            <th>OP</th>
          </tr></thead>
          <tbody>
            { arr }
          </tbody>
        </table>
      );
    };
    let addBtn = null;
    if (!rpConfigs) {
      addBtn = (
        <a
          href="javascript:;"
          onClick={() => {
            this.setState({
              rpConfigs: {},
            });
          }}
          style={{
            marginTop: '20px',
          }}
          className="pt-button pt-intent-primary pt-fill"
        >Add Retention Policy</a>
      );
    }
    return (
      <div
        className="server-status"
      >
        <h3>Retention Policy</h3>
        {
          renderStatus(status, error)
        }
        { renderTable(items) }
        { addBtn }
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
    const renderTable = (tableItems) => {
      if (!tableItems) {
        return null;
      }
      const arr = _.map(tableItems, (item) => {
        const tmpArr = item.split(',');
        const measurement = tmpArr.shift();
        return (
          <tr
            key={item}
          >
            <td>{measurement}</td>
            <td>{tmpArr.join()}</td>
          </tr>
        );
      });

      return (
        <table className="table">
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
          renderStatus(status, error)
        }
        {
          renderTable(items)
        }
      </div>
    );
  }
  renderTagKeys() {
    return this.renderKeys('tagKeys');
  }
  render() {
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
  id: PropTypes.string.isRequired,
  showError: PropTypes.func.isRequired,
  alert: PropTypes.func.isRequired,
};

export default Status;
