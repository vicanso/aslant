'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import * as _ from 'lodash';

class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      time: '00:00:00',
    };
  }
  setDate(date) {
    const { onSelect } = this.props;
    this.setState({
      date,
    });
    if (!date) {
      return onSelect('');
    }
    return onSelect(`${date.format('YYYY-MM-DD')} ${this.state.time}`);
  }
  setTime(result) {
    const { onSelect } = this.props;
    const { date } = this.state;
    if (!result) {
      this.setState({
        time: null,
      });
      return onSelect('');
    }
    const time = _.map(result.fields.slice(4, 7), v => {
      if (v < 10) {
        return `0${v}`;
      }
      return `${v}`;
    }).join(':');
    this.setState({
      time,
    });
    if (!date) {
      return onSelect('');
    }
    return onSelect(`${date.format('YYYY-MM-DD')} ${time}`);
  }
  render() {
    const { placeholder } = this.props;
    return (
      <div className="dateTimePicker pure-g">
        <div className="pure-u-2-3">
          <DatePicker
            selected={this.state.date}
            placeholderText={placeholder}
            onChange={date => this.setDate(date)}
          />
        </div>
        <div className="pure-u-1-3">
          <div className="divide">-</div>
          <TimePicker
            className="timePicker"
            placeholder="HH:mm:ss"
            onChange={time => this.setTime(time)}
          />
        </div>
      </div>
    );
  }
}

DateTimePicker.propTypes = {
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default DateTimePicker;
