'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import classnames from 'classnames';
import Select from 'react-select';
import RadioSelector from 'aslant/components/radio-selector';
import AutoRefreshSelector from 'aslant/components/auto-refresh-selector';
import * as navigationAction from 'aslant/actions/navigation';
import * as dashboardAction from 'aslant/actions/dashboard';
import * as util from 'aslant/helpers/util';
import { WIDTH_LIST, OFFSET_TIME_LIST } from 'aslant/constants/common';

class InfluxdbDashboardEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offsetTime: _.get(props, 'dashboard.offsetTime'),
      autoRefresh: _.get(props, 'dashboard.autoRefresh'),
    };
  }
  componentDidMount() {
    const { type, dashboard } = this.props;
    if (type !== 'update') {
      return;
    }
    const refs = this.refs;
    refs.name.value = dashboard.name;
    refs.desc.value = dashboard.desc;
  }
  initConfigures() {
    if (this.state.configures || !this.props.configures) {
      return;
    }
    const selectedConfigures = _.get(this.props, 'dashboard.configures', []);
    const configures = _.sortBy(_.map(this.props.configures, item => {
      const tmp = {
        width: WIDTH_LIST[0],
        key: `${selectedConfigures.length}${item.createdAt}`,
      };
      const index = _.findIndex(selectedConfigures, selectedItem => selectedItem.id === item._id);
      if (~index) {
        tmp.width = selectedConfigures[index].width;
        tmp.selected = true;
        tmp.key = `${index}${item.createdAt}`;
      }
      return Object.assign(tmp, item);
    }), item => item.key);

    this.setState({
      configures,
    });
  }
  resetError() {
    if (this.state.error) {
      this.setState({
        error: '',
      });
    }
  }
  toggle(e, id) {
    e.preventDefault();
    const cloneConfigres = _.cloneDeep(this.state.configures);
    const found = _.find(cloneConfigres, item => item._id === id);
    found.selected = !found.selected;
    this.setState({
      configures: cloneConfigres,
      error: '',
    });
  }
  submit(e) {
    e.preventDefault();
    const { configures } = this.state;
    const { dispatch, type, dashboard } = this.props;
    const refs = this.refs;
    const name = refs.name.value;
    const desc = refs.desc.value;
    if (!name || !desc) {
      return this.setState({
        error: 'Name and description can\'t be empty',
      });
    }
    const selectedConfigures = [];
    _.forEach(configures, item => {
      if (item.selected) {
        selectedConfigures.push({
          id: item._id,
          width: item.width,
        });
      }
    });
    if (!selectedConfigures.length) {
      return this.setState({
        error: 'At least one configure must be selected',
      });
    }
    this.setState({
      status: 'processing',
    });
    const data = _.extend({
      name,
      desc,
      configures: selectedConfigures,
    }, _.pick(this.state, ['width', 'offsetTime', 'autoRefresh']));
    let fn;
    if (type === 'update') {
      fn = dashboardAction.update(dashboard._id, dashboard.token, data);
    } else {
      fn = dashboardAction.add(data);
    }
    dispatch(fn).then(() => {
      dispatch(navigationAction.back());
    }).catch(err => {
      this.setState({
        status: '',
        error: util.getError(err),
      });
    });
    return null;
  }
  move(e, index, offset) {
    e.preventDefault();
    const { configures } = this.state;
    const newIndex = index + offset;
    if (newIndex < 0 || newIndex >= configures.length) {
      return;
    }
    const cloneConfigres = _.map(configures, item => Object.assign({}, item));
    const tmp = cloneConfigres[index];
    cloneConfigres[index] = cloneConfigres[newIndex];
    cloneConfigres[newIndex] = tmp;
    this.setState({
      configures: cloneConfigres,
    });
  }

  renderConfigures() {
    const { configures } = this.state;
    return _.map(configures, (item, index) => {
      /* eslint no-underscore-dangle: 0 */
      const id = item._id;
      const cls = {
        fa: true,
      };
      if (item.selected) {
        cls['fa-check-square-o'] = true;
      } else {
        cls['fa-square-o'] = true;
      }
      const trClass = {};
      if (index % 2 === 0) {
        trClass['pure-table-odd'] = true;
      }
      return (
        <tr
          key={id}
          className={classnames(trClass)}
        >
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.desc}</td>
          <td>{item.owner}</td>
          <td>
            <RadioSelector
              options={WIDTH_LIST}
              selected={item.width}
              onSelect={option => {
                const cloneConfigres = _.cloneDeep(this.state.configures);
                if (cloneConfigres[index].width !== option) {
                  cloneConfigres[index].width = option;
                  this.setState({
                    configures: cloneConfigres,
                  });
                }
              }}
            />
          </td>
          <td>
            <a
              href="#"
              onClick={e => this.toggle(e, id)}
            >
              <i className={classnames(cls)} aria-hidden="true"></i>
              Add
            </a>
            <a
              href="#"
              onClick={e => this.move(e, index, -1)}
            >
              <i className="fa fa-arrow-up" aria-hidden="true"></i>
              Up
            </a>
            <a
              href="#"
              onClick={e => this.move(e, index, 1)}
            >
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
              Down
            </a>
          </td>
        </tr>
      );
    });
  }
  renderOffsetTimeSelector() {
    return (
      <Select
        value={this.state.offsetTime}
        options={OFFSET_TIME_LIST}
        className="offsetTimeSelector"
        onChange={item => {
          const value = (item && item.value) || '';
          if (value !== this.state.offsetTime) {
            this.setState({
              offsetTime: value,
            });
          }
        }}
      />
    );
  }
  render() {
    this.initConfigures();
    const { type } = this.props;
    const { status, error } = this.state;
    return (
      <div
        className="influxdbDashboardEditor"
      >
        <div className="pure-g">
          <div className="pure-u-1-4"><div className="mright10">
            <input
              type="text"
              placeholder="the name of dashboard"
              ref="name"
              onChange={() => this.resetError()}
            />
          </div></div>
          <div className="pure-u-1-4"><div className="mright10">
            <input
              type="text"
              placeholder="the description of dashboard"
              ref="desc"
              onChange={() => this.resetError()}
            />
          </div></div>
          <div className="pure-u-1-6"><div className="mright10">
            <AutoRefreshSelector
              value={this.state.autoRefresh}
              onChange={value => {
                this.setState({
                  autoRefresh: value,
                });
              }}
            />
          </div></div>
          <div className="pure-u-1-6"><div className="mright10">
            {this.renderOffsetTimeSelector()}
          </div></div>
          <div className="pure-u-1-6">
            <a
              href="#"
              className="pure-button pure-button-primary"
              onClick={e => this.submit(e)}
            >
              {type === 'update' ? 'Update' : 'Submit'}
              {status === 'processing' && <span>...</span>}
            </a>
          </div>
        </div>
        <table className="pure-table mtop10">
          <thead><tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Owner</th>
            <th
              style={{
                width: '295px',
              }}
            >Width</th>
            <th
              style={{
                width: '180px',
              }}
            >Operation</th>
          </tr></thead>
          <tbody>
            {this.renderConfigures()}
          </tbody>
        </table>
        {
          error && <div className="warning mtop10">
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
            <span>{error}</span>
          </div>
        }
      </div>
    );
  }
}

InfluxdbDashboardEditor.propTypes = {
  dispatch: PropTypes.func.isRequired,
  configures: PropTypes.array,
  dashboard: PropTypes.object,
  type: PropTypes.string,
};

export default InfluxdbDashboardEditor;
