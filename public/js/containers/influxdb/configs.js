import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import * as _ from 'lodash';

import {
  VIEW_EDIT_INFLUX,
} from '../../constants/urls';

class Configs extends Component {
  render() {
    const {
      configs,
      handleLink,
    } = this.props;
    const arr = _.map(configs, (item) => {
      /* eslint no-underscore-dangle:0 */
      const id = item._id;
      const url = VIEW_EDIT_INFLUX.replace(':id', id);
      return (
        <tr
          key={id}
        >
          <td>{item.name}</td>
          <td>{moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</td>
          <td>
            <a
              href={url}
              onClick={handleLink(url)}
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </a>
          </td>
        </tr>
      );
    });
    return (
      <div className="influx-configs-wrapper">
        <table className="pure-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>UpdatedAt</th>
              <th>OP</th>
            </tr>
          </thead>
          <tbody>
            { arr }
          </tbody>
        </table>
      </div>
    );
  }
}

Configs.propTypes = {
  dispatch: PropTypes.func.isRequired,
  configs: PropTypes.array.isRequired,
  handleLink: PropTypes.func.isRequired,
};

export default Configs;
