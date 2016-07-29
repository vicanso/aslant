'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes } from 'react';
import * as _ from 'lodash';
import Dialog from '../components/dialog';
import * as util from '../helpers/util';
import * as configureAction from '../actions/configure';
import * as navigationAction from '../actions/navigation';

class VisualizationSaveDialog extends Dialog {
  constructor(props) {
    super(props);
    const conf = _.get(props, 'orginalData.configure');
    this.state = {
      title: conf ? 'Update Visualization' : 'Save Visualization',
      classes: {
        visualizationSaveDialog: true,
      },
      status: '',
    };
  }
  onKeyUp(e) {
    this.setState({
      error: '',
    });
    switch (e.keyCode) {
      case 27:
        return this.onClose(e);
      default:
        return null;
    }
  }
  componentDidMount() {
    const props = this.props;
    _.forEach(this.refs, (ref, k) => {
      const v = _.get(props, `orginalData.${k}`);
      if (v) {
        /* eslint no-param-reassign:0 */
        ref.value = v;
      }
    });
  }
  getData() {
    const refs = this.refs;
    return {
      name: (refs.name.value || '').trim(),
      desc: (refs.desc.value || '').trim(),
    };
  }
  onClose(e) {
    const { onClose } = this.props;
    e.preventDefault();
    onClose();
  }
  submit(e) {
    e.preventDefault();
    const props = this.props;
    const { status } = this.state;
    const { dispatch, data } = props;
    if (status === 'processing') {
      return null;
    }
    const inputs = this.getData();
    if (!inputs.name || !inputs.desc) {
      return this.setState({
        error: 'name and description catn\'t be empty',
      });
    }
    const postData = _.extend({}, data, inputs);
    this.setState({
      status: 'processing',
    });
    const id = _.get(props, 'orginalData._id');
    let fn;
    if (id) {
      const token = props.orginalData.token;
      fn = dispatch(configureAction.update(id, token, postData));
    } else {
      fn = dispatch(configureAction.add(postData));
    }
    fn.then(() => {
      dispatch(navigationAction.showVisualizations());
    }).catch(err => {
      this.setState({
        status: '',
        error: util.getError(err),
      });
    });
    return null;
  }
  getContent() {
    const { status, error } = this.state;
    return (
      <form className="pure-form pure-form-aligned"><fieldset>
        <div className="pure-control-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            autoFocus="true"
            onKeyUp={e => this.onKeyUp(e)}
            placeholder="Visualization Name"
            ref="name"
          />
        </div>
        <div className="pure-control-group">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            onKeyUp={e => this.onKeyUp(e)}
            placeholder="Visualization Description"
            ref="desc"
          >
          </textarea>
        </div>
        {
          error && <div className="warning">
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
            <span>{error}</span>
          </div>
        }
        <div className="pure-controls">
          <a
            className="pure-button pure-button-primary submit"
            href="#"
            onClick={e => this.submit(e)}
          >Submit
            {status === 'processing' && <span>...</span>}
          </a>
        </div>
      </fieldset></form>
    );
  }
}

VisualizationSaveDialog.propTypes = {
  orginalData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default VisualizationSaveDialog;
