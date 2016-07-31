/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';

class NotifyCenter extends Component {
  min(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div className="notifyCenterContainer">
        <div className="title">
          Notify center
          <a
            href="#"
            className="pullRight"
            onClick={e => this.min(e)}
          >
            <i className="fa fa-minus-square-o" aria-hidden="true"></i>
          </a>
        </div>
        <ul className="content">
          <li>
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
            Load data fail.
          </li>
          <li>
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
            Load data fail.
          </li>
        </ul>
      </div>
    );
  }
}

NotifyCenter.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default NotifyCenter;
