import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import * as _ from 'lodash';

function renderItems(items) {
  const arr = _.map(items, (item) => {
    /* eslint no-underscore-dangle:0 */
    const id = item._id;
    return (
      <div
        className="pure-u-1-4"
        key={id}
      ><div className="item">
        <h4>{item.name}</h4>
        <p>{item.desc}</p>
        <div className="updatedAt">{moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</div>
      </div></div>
    );
  });
  return (
    <div className="items">
      { arr }
    </div>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      configs,
      dashboards,
    } = this.props;
    return (
      <div
        className="home-wrapper"
      >
        <h3>Dashboards</h3>
        { renderItems(dashboards) }
        <h3>Configs</h3>
        { renderItems(configs) }
      </div>
    );
  }
}

Home.propTypes = {
  dashboards: PropTypes.array,
  configs: PropTypes.array,
};

export default Home;
