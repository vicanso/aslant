import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';

import {
  CHART_TYPES,
} from '../../constants/common';

function renderChartType(type) {
  const cls = {
    'pt-icon-standard': true,
  };
  const found = _.find(CHART_TYPES, item => item.type === type);
  if (!found) {
    return null;
  }
  cls[found.icon] = true;
  return (
    <span
      title={found.title}
      className={classnames(cls)}
    />
  );
}

class Dashboards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: props.configs.slice(0),
    };
  }
  changeOrder() {
  }
  render() {
    const {
      selectedItems,
      configs,
    } = this.state;
    const arr = _.map(configs, (item) => {
      /* eslint no-underscore-dangle:0 */
      const id = item._id;
      const cls = {
        'pt-icon-standard': true,
      };
      const index = _.indexOf(selectedItems, id);
      if (index !== -1) {
        cls['pt-icon-selection'] = true;
      } else {
        cls['pt-icon-circle'] = true;
      }
      return (
        <tr
          key={id}
        >
          <td>
            <a
              href="javascript:;"
              onClick={() => {
                if (index !== -1) {
                  selectedItems.splice(index, 1);
                } else {
                  selectedItems.push(id);
                }
                this.setState({
                  selectedItems,
                });
              }}
            >
              <span className={classnames(cls)} />
            </a>
          </td>
          <td>{item.name}</td>
          <td>{ renderChartType(item.view.type) }</td>
          <td>{item.view.width}</td>
          <td>
            <a
              href="javascript:;"
              onClick={() => this.changeOrder(id, 'up')}
            >
              <span className="pt-icon-standard pt-icon-arrow-up" />
            </a>
            <a
              href="javascript:;"
              onClick={() => this.changeOrder(id, 'down')}
            >
              <span className="pt-icon-standard pt-icon-arrow-down" />
            </a>
          </td>
        </tr>
      );
    });
    return (
      <div className="influx-dashboard-wrapper">
        <table className="table">
          <thead><tr>
            <th>Add</th>
            <th>Name</th>
            <th>Type</th>
            <th>Width</th>
            <th>OP</th>
          </tr></thead>
          <tbody>{ arr }</tbody>
        </table>
      </div>
    );
  }
}

Dashboards.propTypes = {
  dispatch: PropTypes.func.isRequired,
  configs: PropTypes.array.isRequired,
  handleLink: PropTypes.func.isRequired,
  showError: PropTypes.func,
};

export default Dashboards;
