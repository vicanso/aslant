import React, { Component, PropTypes } from 'react';
import {
  Alert,
  Toaster,
} from '@blueprintjs/core';

class InfluxTable extends Component {
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
      this.showError(err.response.body.message);
      this.setState({
        removeItem: null,
      });
    });
  }
  showError(message) {
    this.toaster.show({
      message,
      className: 'pt-intent-warning',
    });
  }
  renderAlert() {
    const {
      removeItem,
    } = this.state;
    if (!removeItem) {
      return null;
    }
    const content = `Confirm to remove the server's config?(${removeItem.name})`;
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
  renderToaster() {
    return (
      <Toaster
        ref={(c) => {
          this.toaster = c;
        }}
      />
    );
  }
}

InfluxTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default InfluxTable;
