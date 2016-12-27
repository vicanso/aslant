import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';

import * as settingActions from '../actions/setting';
import * as navigationAction from '../actions/navigation';

const configs = [
  {
    title: 'The page size of table view',
    placeholder: 'input page size',
    type: 'number',
    name: 'tablePageSize',
    value: 'table.pageSize',
  },
  {
    title: 'The height of chart view',
    placeholder: 'input chart view height',
    type: 'number',
    name: 'chartHeight',
    value: 'chart.height',
  },
];

class Setting extends Component {
  constructor(props) {
    super(props);
    this.inputs = {};
  }
  update() {
    const {
      dispatch,
      setting,
      showError,
    } = this.props;
    const data = {};
    _.forEach(configs, (item) => {
      let value = this.inputs[item.name].value;
      if (!value) {
        return;
      }
      if (item.type === 'number') {
        value = parseInt(value, 10);
      }
      _.set(data, item.value, value);
    });
    let fn = null;
    /* eslint no-underscore-dangle:0 */
    const id = setting._id;
    if (id) {
      fn = settingActions.update(id, data, setting.token);
    } else {
      fn = settingActions.add(data);
    }
    dispatch(fn).then(() => {
      dispatch(navigationAction.home());
    }).catch(showError);
  }
  render() {
    const {
      setting,
    } = this.props;
    if (!setting) {
      return (
        <p className="pt-callout pt-icon-automatic-updates margin15">Loading...</p>
      );
    }
    const arr = _.map(configs, item => (
      <div
        className="setting pure-u-1-3"
        key={item.name}
      >
        <label
          className="pt-label"
          htmlFor={item.name}
        >
          { item.title }
          <input
            id={item.name}
            className="pt-input"
            type={item.type || 'text'}
            placeholder={item.placeholder || ''}
            defaultValue={_.get(setting, item.value)}
            ref={(c) => {
              this.inputs[item.name] = c;
            }}
          />
        </label>
      </div>
    ));
    return (
      <div
        className="setting-wrapper pure-g"
      >
        { arr }
        <button
          type="button"
          className="pt-button pt-fill pt-intent-primary mtop10"
          onClick={() => this.update()}
        >
          { setting._id ? 'Update' : 'Add' }
        </button>
      </div>
    );
  }
}

Setting.propTypes = {
  dispatch: PropTypes.func.isRequired,
  setting: PropTypes.object,
  showError: PropTypes.func.isRequired,
};

export default Setting;
