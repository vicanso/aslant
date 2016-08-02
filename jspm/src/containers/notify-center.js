/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';

class NotifyCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'normal',
    };
  }
  setStatus(e, status) {
    e.preventDefault();
    this.setState({
      status,
    });
  }
  renderMessages() {
    const { messages } = this.props;
    return _.map(messages, item => {
      const cls = {};
      const icon = {
        fa: true,
      };
      if (item.type === 'warn') {
        icon['fa-exclamation-triangle'] = true;
        cls.messageWarn = true;
      } else {
        icon['fa-info-circle'] = true;
        cls.messageInfo = true;
      }
      return (
        <li
          className={classnames(cls)}
          key={item.id}
        >
          <i className={classnames(icon)} aria-hidden="true"></i>
          {item.title}
        </li>
      );
    });
  }
  render() {
    const { messages } = this.props;
    const { status } = this.state;
    if (!messages || !messages.length) {
      return null;
    }
    const cls = {
      notifyCenterContainer: true,
    };
    if (status === 'min') {
      cls.minimize = true;
    }
    return (
      <div className={classnames(cls)}>
        <div className="title">
          Notify center
          <span
            style={{
              color: '#265778',
              marginLeft: '3px',
            }}
          >({messages.length})</span>
          <a
            href="#"
            className="pullRight min"
            onClick={e => this.setStatus(e, 'min')}
          >
            <i className="fa fa-minus-square-o" aria-hidden="true"></i>
          </a>
          <a
            href="#"
            className="pullRight normal"
            onClick={e => this.setStatus(e, 'normal')}
          >
            <i className="fa fa-clone" aria-hidden="true"></i>
          </a>
        </div>
        <ul className="content">
          {this.renderMessages()}
        </ul>
      </div>
    );
  }
}

NotifyCenter.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default NotifyCenter;
