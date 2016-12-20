import React, { Component, PropTypes } from 'react';
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
      keyword: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({
        selected: null,
      });
    }
    if (nextProps.selected !== this.props.selected && this.userInput) {
      const value = this.getSelectString();
      if (this.userInput.value === value) {
        return;
      }
      this.forceUpdate(() => {
        this.userInput.value = this.getSelectString();
      });
    }
  }
  onSelect(e, item) {
    const {
      onSelect,
      type,
    } = this.props;
    const fn = onSelect || _.noop;
    if (fn(e, item) === false) {
      this.setState({
        selected: null,
      });
      return;
    }
    const multi = type === 'multi';
    let selected = (this.state.selected || this.props.selected || []);
    if (_.isArray(selected)) {
      selected = selected.slice(0);
    }
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
    this.userInput.value = this.getSelectString(state);
    this.setState(state);
  }
  getSelectString(state = {}) {
    const selected = state.selected || this.state.selected || this.props.selected;
    if (!selected) {
      return '';
    }
    if (_.isArray(selected)) {
      return _.map(selected, item => item.name || item).join(',');
    }
    return selected.name || selected;
  }
  clear() {
    const {
      onClear,
    } = this.props;
    this.setState({
      selected: null,
    });
    if (this.userInput) {
      this.userInput.value = '';
    }
    if (onClear) {
      onClear();
    }
  }
  render() {
    const {
      keyword,
    } = this.state;
    const {
      items,
      placeholder,
      onClear,
    } = this.props;

    // const multi = type === 'multi';
    const filterItems = _.filter(items, (item) => {
      const name = item.name || item;
      return name.indexOf(keyword) !== -1;
    });
    const arr = _.map(filterItems, (item) => {
      const name = item.name || item;
      return (
        <MenuItem
          key={name}
          text={name}
          iconName={item.icon || ''}
          onClick={e => this.onSelect(e, item)}
        />
      );
    });
    const menu = (
      <Menu>
        { arr }
      </Menu>
    );
    let fixPosition = this.props.position;
    if (_.isUndefined(this.props.position)) {
      fixPosition = Position.RIGHT;
      if (filterItems.length > 20) {
        fixPosition = Position.BOTTOM;
      }
    }
    const clearItem = _.isFunction(onClear) && (
      <a
        className="clear tac"
        href="javascript:;"
        onClick={() => this.clear()}
      >
        <span className="pt-icon-standard pt-icon-small-cross" />
      </a>
    );

    return (
      <div
        className="dropdown-selector"
      >
        { clearItem }
        <Popover
          content={menu}
          position={fixPosition}
          autoFocus={false}
        >
          <input
            type="text"
            placeholder={placeholder}
            className="pt-input"
            onKeyUp={(e) => {
              if (e.keyCode === 0x0d && filterItems.length) {
                this.onSelect(e, filterItems[0]);
              }
            }}
            onChange={() => {
              this.setState({
                keyword: this.userInput.value,
              });
            }}
            defaultValue={this.getSelectString()}
            ref={(c) => {
              if (!c) {
                return;
              }
              this.userInput = c;
            }}
          />
        </Popover>
      </div>
    );
  }
}

DropdownSelector.propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  selected: PropTypes.any,
  type: PropTypes.string,
  position: PropTypes.number,
  onClear: PropTypes.func,
};

export default DropdownSelector;
