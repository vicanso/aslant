import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';

import Dropdown from './dropdown';

class DropdownSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      selected: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({
        selected: null,
      });
    }
  }
  componentWillUnmount() {
    this.isUnmounted = true;
  }
  onSelect(e, item) {
    const {
      onSelect,
      type,
    } = this.props;
    const multi = type === 'multi';
    const selected = this.state.selected || [];
    const state = {
      selected: item,
      active: false,
    };
    if (multi) {
      const index = _.indexOf(selected, item);
      if (index === -1) {
        selected.push(item);
      } else {
        selected.splice(index, 1);
      }
      state.selected = selected;
    }
    this.setState(state);
    if (onSelect) {
      onSelect(e, item);
    }
  }
  render() {
    const {
      items,
      cls,
      placeholder,
      type,
    } = this.props;
    const {
      active,
    } = this.state;
    const multi = type === 'multi';
    const selected = this.state.selected || this.props.selected;
    const selectorCls = _.extend({}, cls, {
      'dropdown-selector': true,
      active,
    });
    const selectedToString = () => {
      if (!selected) {
        return '';
      }
      if (_.isArray(selected)) {
        return _.map(selected, item => item.name || item).join(',');
      }
      return selected.name || selected;
    };
    const isShowPlaceHolder = () => {
      if (active) {
        return false;
      }
      if (!multi && selected) {
        return false;
      }
      if (multi && selected && selected.length) {
        return false;
      }
      return true;
    };
    return (
      <div className={classnames(selectorCls)}>
        <a
          href="javascript:;"
          className="select-value"
          /* eslint jsx-a11y/no-static-element-interactions:0 */
          onFocus={() => this.setState({
            active: true,
          })}
          onBlur={() => _.delay(() => {
            if (this.isUnmounted) {
              return;
            }
            this.setState({
              active: false,
            });
          }, 150)}
        >
          <i className="fa fa-sort-desc" aria-hidden="true" />
          { isShowPlaceHolder() && placeholder }
          { selectedToString() }
        </a>
        {
          active &&
          <Dropdown
            onSelect={(e, item) => this.onSelect(e, item)}
            items={items}
          />
        }
      </div>
    );
  }
}

DropdownSelector.propTypes = {
  items: PropTypes.array.isRequired,
  cls: PropTypes.object,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  selected: PropTypes.any,
  type: PropTypes.string,
};

export default DropdownSelector;
