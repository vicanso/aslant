'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import Select from 'react-select';
import * as _ from 'lodash';

class TagSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: _.get(props, 'defaultCondition.tag', ''),
      value: _.get(props, 'defaultCondition.value', ''),
    };
  }
  renderSelector(opts) {
    const { onSelect, index } = this.props;
    const { options, key, placeholder } = opts;
    return <Select
      className="influxdbSelector"
      options={options}
      value={this.state[key]}
      placeholder={placeholder}
      onChange={item => {
        const value = (item && item.value) || '';
        const data = {};
        data[key] = value;
        this.setState(data);
        if (key === 'value') {
          const item = {
            tag: this.state.tag,
            value: value,
          };
          onSelect(item, index);
        }
      }}
    />
  }
  onClickToggle(e, type) {
    e.preventDefault();
    const { index } = this.props;
    const { toggleConditionSelector } = this.props;
    toggleConditionSelector(type, index);
  }
  render() {
    const state = this.state;
    const { tagInfos, placeholder, index } = this.props;
    const type = index === 0 ? 'add' : 'remove';
    const tagOptions = [];
    const valueOptions = [];
    const convert = item => {
      return {
        label: item,
        value: item,
      };
    };
    _.forEach(tagInfos, item => {
      tagOptions.push(convert(item.tag));
      if (item.tag === state.tag) {
        _.forEach(item.value, v => {
          valueOptions.push(convert(v));
        });
      }
    });
    return (
      <div className="pure-g">
        <div className="pure-u-1-2 tagSelector">
          <span className="pullRight equal">=</span>
          {
            this.renderSelector({
              options: tagOptions,
              key: 'tag',
              placeholder: 'Select a tag key',
            })
          }
        </div>
        <div className="pure-u-1-2 tagSelector">
          <a className="pullRight toggle" href="#" onClick={e => this.onClickToggle(e, type)}>
            {index === 0 && <i className="fa fa-plus-square-o" aria-hidden="true"></i>}
            {index !== 0 && <i className="fa fa-minus-square-o" aria-hidden="true"></i>}
          </a>
          {
            this.renderSelector({
              options: valueOptions,
              key: 'value',
              placeholder: 'Select a tag value',
            })
          }
        </div>
      </div>
    );
  }
}

export default TagSelector;
