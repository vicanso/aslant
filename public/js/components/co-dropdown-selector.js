import React, { Component, PropTypes } from 'react';

import DropdownSelector from './dropdown-selector';

class CoDropdownSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      relation,
      itemsList,
      placeholders,
      onSelect,
      selected,
    } = this.props;
    return (
      <div className="co-dropdown-selector">
        <div className="relation">{ relation || '=' }</div>
        <div className="pure-u-1-2"><div className="mright10">
          <DropdownSelector
            items={itemsList[0]}
            placeholder={placeholders && placeholders[0]}
            selected={selected && selected[0]}
            onSelect={(e, item) => {
              if (onSelect) {
                onSelect(e, item, 0);
              }
            }}
          />
        </div></div>
        <div className="pure-u-1-2"><div className="mleft10">
          <DropdownSelector
            items={itemsList[1]}
            placeholder={placeholders && placeholders[1]}
            selected={selected && selected[1]}
            onSelect={(e, item) => {
              if (onSelect) {
                onSelect(e, item, 1);
              }
            }}
          />
        </div></div>
      </div>
    );
  }
}

CoDropdownSelector.propTypes = {
  relation: PropTypes.string,
  itemsList: PropTypes.array.isRequired,
  placeholders: PropTypes.array,
  onSelect: PropTypes.func,
  selected: PropTypes.array,
};

export default CoDropdownSelector;
