import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash'

import DropdownSelector from '../../components/dropdown-selector';
import * as influxdbService from '../../services/influxdb';

class Influx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measurements: [],
      measurement: '',
      dbs: [],
      db: '',
      tags: [],
      tag: '',
      tagValueDict: {},
      conditions: [],
    };
  }
  onSelectDatabases(db) {
    const server = this.state.server;
    this.setState({
      measurements: [],
      db: db,
    });
    influxdbService.showMeasurements(server._id, db).then(measurements => this.setState({
      measurements: measurements.sort(),
    })).catch(console.error);
  }
  onSelectMeasurement(measurement) {
    const {
      server,
      db,
    } = this.state;
    this.setState({
      measurement,
    });
    influxdbService.showSeries(server._id, db, measurement).then((series) => {
      const tags = [];
      const tagValueDict = {};
      _.forEach(series, (str) => {
        _.forEach(str.split(',').slice(1), (item) => {
          const [tag, value] = item.split('=');
          if (_.indexOf(tags, tag) === -1) {
            tags.push(tag);
            tagValueDict[tag] = [];
          }
          if (_.indexOf(tagValueDict[tag], value) === -1) {
            tagValueDict[tag].push(value);
          }
        });
      });
      _.forEach(tagValueDict, (values, tag) => {
        tagValueDict[tag] = values.sort();
      });
      this.setState({
        tags: tags,
        tagValueDict: tagValueDict,
      });
    }).catch(console.error);
  }
  onSelectServer(server) {
    this.setState({
      measurements: [],
      measurement: '',
      dbs: [],
      db: '',
      server: server,
    });
    influxdbService.showDatabases(server._id).then(dbs => this.setState({
      dbs: dbs.sort(),
    })).catch(console.error);
  }
  onSelectTagKey(tag) {
    this.setState({
      tag,
    });
  }
  onSelectTagValue() {

  }
  renderTagSelectorList() {
    const {
      tags,
      tag,
      tagValueDict,
      conditions,
    } = this.state;
    const getSelectHandler = (type, index) => {
      return (item) => {
        const arr = conditions.slice(0);
        if (type === 'tag') {
          arr[index] = {
            tag: item
          };
        } else {
          arr[index].value = item;
        }
        this.setState({
          conditions: arr,
        });
      };
    };


    const createCoDropdownSelector = (index) => {
      const condition = conditions[index];
      const currentTag = condition && condition.tag;
      const values = currentTag ? tagValueDict[currentTag] : [];
      const fn1 = getSelectHandler('tag', index);
      const fn2 = getSelectHandler('value', index);
      return (
        <div
          className="co-dropdown-selector pure-g"
          key={index}
        >
          <span className="equal">=</span>
          <div className="pure-u-1-2"><div className="mright10">
            <DropdownSelector
              placeholder={'Tag key'}
              items={tags || []}
              onSelect={(e, item) => fn1(item)}
            />
          </div></div>
          <div className="pure-u-1-2"><div className="mleft10">
            <DropdownSelector
              placeholder={'Tag Value'}
              items={values || []}
              onSelect={(e, item) => fn2(item)}
            />
          </div></div>
        </div>
      );
    };
    const arr = _.map(conditions, (condition, index) => createCoDropdownSelector(index));
    if (!conditions.length || (_.last(conditions).tag && _.last(conditions).value)) {
      arr.push(createCoDropdownSelector(conditions.length));
    }
    return arr;
  }
  render() {
    const {
      servers,
    } = this.props;
    const {
      measurements,
      dbs,
      tags,
      server,
      db,
      measurement,
      tag,
      tagValueDict,
    } = this.state;
    return (
      <div className="add-influx-wrapper">
        <div className="config-wrapper">
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
          { this.renderTagSelectorList() }
          <div className="co-dropdown-selector pure-g">
            <span className="equal">=</span>
            <div className="pure-u-1-2"><div className="mright10">
              <DropdownSelector
                placeholder={'Tag key'}
                items={tags || []}
                onSelect={(e, item) => this.onSelectTagKey(item)}
              />
            </div></div>
            <div className="pure-u-1-2"><div className="mleft10">
              <DropdownSelector
                placeholder={'Tag Value'}
                items={tagValueDict[tag] || []}
                onSelect={(e, item) => this.onSelectTagValue(item)}
              />
            </div></div>
          </div>
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
