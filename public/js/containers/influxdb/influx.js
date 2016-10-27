import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash'

import DropdownSelector from '../../components/dropdown-selector';
import * as influxdbService from '../../services/influxdb';

class Influx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measurements: [],
      dbs: [],
    };
  }
  onSelectDatabases(db) {
    const server = this.state.server;
    this.setState({
      measurements: [],
      db: db,
    });
    influxdbService.showMeasurements(server._id, db).then(measurements => this.setState({
      measurements,
    })).catch(console.error);
  }
  onSelectMeasurement() {
  }
  onSelectServer(server) {
    this.setState({
      measurements: [],
      dbs: [],
      server: server,
    });
    influxdbService.showDatabases(server._id).then(dbs => this.setState({
      dbs,
    })).catch(console.error);
  }
  render() {
    const {
      servers,
    } = this.props;
    const {
      measurements,
      dbs,
    } = this.state;
    return (
      <div className="add-influx-wrapper">
        <div>
          <h4>Influx Config</h4>
          <DropdownSelector
            placeholder={'Choose Server'}
            items={servers}
            onSelect={(e, item) => this.onSelectServer(item)}
          />
          <DropdownSelector
            placeholder={'Choose Database'}
            items={dbs}
            onSelect={(e, item) => this.onSelectDatabases(item)}
          />
          <DropdownSelector
            placeholder={'Choose Measurement'}
            items={measurements}
            onSelect={(e, item) => this.onSelectMeasurement(item)}
          />
        </div>
      </div>
    )
  }
}

Influx.propTypes = {
  dispatch: PropTypes.func.isRequired,
  servers: PropTypes.array.isRequired,
};

export default Influx;
