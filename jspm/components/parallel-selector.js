'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import Select from 'react-select';
import * as _ from 'lodash';

class ParallelSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: _.get(props, 'defaultKey'),
      value: _.get(props, 'defaultValue'),
    };
  }
  onClickToggle(e, type) {
    e.preventDefault();
    this.props.onToggle(type);
  }
  renderSelector(opts) {
    const { onSelect, placeholders } = this.props;
    const { options, type } = opts;
    return (
      <Select
        className="selector"
        placeholder={_.get(placeholders, type)}
        options={options}
        value={this.state[type]}
        onChange={item => {
          const value = (item && item.value) || '';
          const data = _.pick(this.state, ['key', 'value']);
          data[type] = value;
          this.setState(data);
          onSelect(data);
        }}
      />
    );
  }
  render() {
    const { keys, values, toggleType } = this.props;
    const convert = (arr) => _.map(arr, v => {
      if (_.isObject(v)) {
        return Object.assign({}, v);
      }
      return {
        label: v,
        value: v,
      };
    });
    return (
      <div className="pure-g">
        <div className="pure-u-1-2 parallelSelector">
          <span className="pullRight funcDesc">BY</span>
          {
            this.renderSelector({
              options: convert(keys),
              type: 'key',
            })
          }
        </div>
        <div className="pure-u-1-2 parallelSelector">
          <a className="pullRight toggle" href="#" onClick={e => this.onClickToggle(e, toggleType)}>
            {toggleType === 'add' && <i className="fa fa-plus-square-o" aria-hidden="true"></i>}
            {toggleType !== 'add' && <i className="fa fa-minus-square-o" aria-hidden="true"></i>}
          </a>
          {
            this.renderSelector({
              options: convert(values),
              type: 'value',
            })
          }
        </div>
      </div>
    );
  }
}

ParallelSelector.propTypes = {
  keys: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  toggleType: PropTypes.string.isRequired,
  placeholders: PropTypes.object,
};

export default ParallelSelector;