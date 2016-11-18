import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';
import {
  Menu,
  MenuItem,
  Popover,
  Position,
} from '@blueprintjs/core';

class DropdownSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    const multi = type === 'multi';
    const selected = this.state.selected || this.props.selected;
    const selectedToString = () => {
      if (!selected) {
        return '';
      }
      if (_.isArray(selected)) {
        return _.map(selected, item => item.name || item).join(',');
      }
      return selected.name || selected;
    };

    const arr = _.map(items, (item) => {
      const name = item.name || item;
      return (
        <MenuItem
          key={name}
          text={name}
          onClick={(e) => this.onSelect(e, item)}
        />
      );
    });
    const menu = (
      <Menu>
        { arr }
      </Menu>
    );
    return (
      <div 
        className="dropdown-selector"
      >
        <Popover
          content={menu}
        >
          <input
            type="text"
            placeholder={placeholder}
            className="pt-input"
            value={selectedToString()}
          />
        </Popover>
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
