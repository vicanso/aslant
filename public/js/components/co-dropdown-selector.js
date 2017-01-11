import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import {
  Menu,
  MenuItem,
  Popover,
  Position,
} from '@blueprintjs/core';

import DropdownSelector from './dropdown-selector';

class CoDropdownSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRelation: props.selectedRelation || _.get(props, 'relation[0]', '='),
    };
    this.inputs = [];
  }
  renderRelation() {
    const {
      relation,
      onSelect,
    } = this.props;
    const {
      selectedRelation,
    } = this.state;
    const selectedHandler = onSelect || _.noop;
    const arr = relation || ['='];
    if (arr.length === 1) {
      return (
        <div className="relation">
          { selectedRelation }
        </div>
      );
    }
    const getMenu = () => {
      const items = _.map(arr, (item) => {
        const key = item;
        return (
          <MenuItem
            key={key}
            text={item}
            onClick={() => {
              this.setState({
                selectedRelation: item,
              });
              selectedHandler('', -1, item);
            }}
          />
        );
      });
      return (
        <Menu>
          { items }
        </Menu>
      );
    };
    return (
      <div
        className="relation"
        style={{
          cursor: 'pointer',
        }}
      >
        <Popover
          content={getMenu()}
          position={Position.BOTTOM}
          inline
        >
          <span>{selectedRelation}</span>
        </Popover>
      </div>
    );
  }
  renderColumn(index) {
    const {
      itemsList,
      placeholders,
      onSelect,
      selected,
      positions,
    } = this.props;
    const {
      selectedRelation,
    } = this.state;
    const selectedHandler = onSelect || _.noop;
    const items = _.get(itemsList, `[${index}]`);
    if (!items) {
      return (
        <input
          type="text"
          className="pt-input pt-fill"
          defaultValue={selected && selected[index]}
          placeholder={placeholders && placeholders[index]}
          ref={(c) => {
            this.inputs[index] = c;
          }}
          onBlur={() => {
            const input = this.inputs[index].value;
            selectedHandler(input, index, selectedRelation);
          }}
        />
      );
    }
    return (
      <DropdownSelector
        items={items}
        placeholder={placeholders && placeholders[index]}
        selected={selected && selected[index]}
        position={positions && positions[index]}
        onSelect={(e, item) => selectedHandler(item, index, selectedRelation)}
      />
    );
  }
  render() {
    return (
      <div className="co-dropdown-selector">
        { this.renderRelation() }
        <div className="column-1-2">
          <div
            style={{
              marginRight: '15px',
            }}
          >
            { this.renderColumn(0) }
          </div>
        </div>
        <div className="column-1-2">
          <div
            style={{
              marginLeft: '15px',
            }}
          >
            { this.renderColumn(1) }
          </div>
        </div>
      </div>
    );
  }
}

CoDropdownSelector.propTypes = {
  relation: PropTypes.array,
  itemsList: PropTypes.array.isRequired,
  placeholders: PropTypes.array,
  onSelect: PropTypes.func,
  selected: PropTypes.array,
  positions: PropTypes.array,
  selectedRelation: PropTypes.string,
};

export default CoDropdownSelector;
