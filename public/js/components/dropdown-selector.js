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
  render() {
    const {
      items,
      cls,
      placeholder,
      onSelect,
    } = this.props;
    const {
      active,
    } = this.state;
    const selected = this.state.selected || this.props.selected;
    const selectorCls = _.extend({}, cls, {
      'dropdown-selector': true,
      active,
    });
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
          { !active && !selected && placeholder }
          {
            selected && (selected.name || selected)
          }
        </a>
        {
          active &&
          <Dropdown
            onSelect={(e, item) => {
              this.setState({
                selected: item,
                active: false,
              });
              if (onSelect) {
                onSelect(e, item);
              }
            }}
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
};

export default DropdownSelector;
