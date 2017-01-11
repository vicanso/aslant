import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import classnames from 'classnames';
import {
  Menu,
  MenuItem,
  Popover,
  Position,
} from '@blueprintjs/core';


function getSelectString(data = {}) {
  const selected = data.selected;
  if (!selected) {
    return '';
  }
  if (_.isArray(selected)) {
    return _.map(selected, item => item.name || item).join(',');
  }
  return selected.name || selected;
}

class DropdownSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      keyword: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.userInput && nextProps) {
      this.userInput.value = getSelectString(nextProps);
    }
  }
  onSelect(e, item) {
    const {
      onSelect,
      selected,
    } = this.props;
    if (item === selected) {
      this.userInput.value = getSelectString(this.props);
      return;
    }
    const fn = onSelect || _.noop;
    fn(e, item);
  }
  clear() {
    const {
      onClear,
    } = this.props;
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
      type,
      readOnly,
      selected,
      onChange,
    } = this.props;

    const multi = type === 'multi';
    const filterItems = _.filter(items, (item) => {
      const name = item.name || item;
      return name.indexOf(keyword) !== -1;
    });
    const arr = _.map(filterItems, (item) => {
      const name = item.name || item;
      const cls = {};
      if (item.icon) {
        cls[item.icon] = true;
      }
      if (multi && _.indexOf(selected, item) !== -1) {
        cls['pt-icon-small-tick'] = true;
      }
      return (
        <MenuItem
          key={name}
          text={name}
          iconName={classnames(cls)}
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
    if (_.isNil(this.props.position)) {
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
          inline
        >
          <input
            type="text"
            placeholder={placeholder}
            className="pt-input"
            readOnly={readOnly}
            onKeyDown={(e) => {
              const found = _.find([0x0d, 0x09], code => code === e.keyCode);
              if (found && keyword && filterItems.length) {
                this.onSelect(e, filterItems[0]);
              }
            }}
            onChange={(e) => {
              const v = this.userInput.value;
              this.setState({
                keyword: v,
              });
              if (onChange) {
                onChange(e, v);
              }
            }}
            defaultValue={getSelectString(this.props)}
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
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  selected: PropTypes.any,
  type: PropTypes.string,
  position: PropTypes.number,
  onClear: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default DropdownSelector;
