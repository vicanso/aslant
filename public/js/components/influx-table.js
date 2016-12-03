import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import {
  Alert,
} from '@blueprintjs/core';

class InfluxTable extends Component {
  constructor(props) {
    super(props);
    this.showError = props.showError || _.noop;
  }
  confirmToRemove(e, item) {
    this.setState({
      removeItem: item,
    });
  }
  remove(fn) {
    const {
      dispatch,
    } = this.props;
    dispatch(fn).then(() => {
      this.setState({
        removeItem: null,
      });
    }).catch((err) => {
      this.showError(err);
      this.setState({
        removeItem: null,
      });
    });
  }
  renderAlert() {
    const {
      removeItem,
    } = this.state;
    if (!removeItem) {
      return null;
    }
    const content = `Confirm to remove the item?(${removeItem.name})`;
    return (
      <Alert
        isOpen
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
        onConfirm={() => this.remove(removeItem)}
        onCancel={() => this.setState({ removeItem: null })}
      >
        <p>{ content }</p>
      </Alert>
    );
  }
}

InfluxTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showError: PropTypes.func,
};

export default InfluxTable;
