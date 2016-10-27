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
  render() {
    const {
      items,
      cls,
      placeholder,
      onSelect,
    } = this.props;
    const {
      active,
      selected,
    } = this.state;
    const selectorCls = _.extend({}, cls, {
      'dropdown-selector': true,
      active,
    });
    return (
      <div className={classnames(selectorCls)}>
        <div
          className="select-value"
          /* eslint jsx-a11y/no-static-element-interactions:0 */
          onClick={() => this.setState({
            active: !active,
          })}
        >
          <i className="fa fa-sort-desc" aria-hidden="true" />
          { !active && !selected && placeholder }
          {
            selected && (selected.name || selected)
          }
        </div>
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
};

export default DropdownSelector;
