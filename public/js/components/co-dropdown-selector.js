import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';

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
      positions,
    } = this.props;
    const selectedHandler = onSelect || _.noop;
    return (
      <div className="co-dropdown-selector">
        <div className="relation">{ relation || '=' }</div>
        <div className="pure-u-1-2">
          <div
            style={{
              marginRight: '15px',
            }}
          >
            <DropdownSelector
              items={itemsList[0]}
              placeholder={placeholders && placeholders[0]}
              selected={selected && selected[0]}
              position={positions && positions[0]}
              onSelect={(e, item) => selectedHandler(e, item, 0)}
            />
          </div>
        </div>
        <div className="pure-u-1-2">
          <div
            style={{
              marginLeft: '15px',
            }}
          >
            <DropdownSelector
              items={itemsList[1]}
              placeholder={placeholders && placeholders[1]}
              position={positions && positions[1]}
              selected={selected && selected[1]}
              onSelect={(e, item) => selectedHandler(e, item, 1)}
            />
          </div>
        </div>
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
  positions: PropTypes.array,
};

export default CoDropdownSelector;
