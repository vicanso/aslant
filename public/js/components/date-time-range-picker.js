import React, { PropTypes, Component } from 'react';
import {
  DateRangePicker,
  TimePickerPrecision,
  TimePicker,
} from '@blueprintjs/datetime';
import moment from 'moment';

const formatDate = 'YYYY-MM-DD';
const formatTime = 'HH:mm:ss';

function formatDateRange(dateRange) {
  const start = moment(dateRange[0]);
  const end = moment(dateRange[1]);
  return {
    start: {
      date: start.format(formatDate),
      time: start.format(formatTime),
    },
    end: {
      date: end.format(formatDate),
      time: end.format(formatTime),
    },
  };
}

class DateTimeRangePicker extends Component {
  constructor(props) {
    super(props);
    this.dateRange = formatDateRange(props.dateRange);
  }
  getData(type) {
    const {
      dateRange,
    } = this.props;
    switch (type) {
      case 'start': {
        return dateRange[0];
      }
      case 'end': {
        return dateRange[1];
      }
      default: {
        const start = moment(dateRange[0]).format(formatDate);
        const end = moment(dateRange[1]).format(formatDate);
        if (start === end) {
          return [
            moment(start, formatDate).toDate(),
          ];
        }
        return [
          moment(start, formatDate).toDate(),
          moment(end, formatDate).toDate(),
        ];
      }
    }
  }
  change(data, type) {
    const {
      start,
      end,
    } = this.dateRange;
    switch (type) {
      case 'start': {
        start.time = moment(data).format(formatTime);
        break;
      }
      case 'end': {
        end.time = moment(data).format(formatTime);
        break;
      }
      default: {
        start.date = moment(data[0]).format(formatDate);
        end.date = moment(data[1]).format(formatDate);
      }
    }
  }
  select() {
    const {
      onSelect,
    } = this.props;
    const {
      start,
      end,
    } = this.dateRange;
    const getDate = (value) => {
      const date = `${value.date} ${value.time}`;
      const format = `${formatDate} ${formatTime}`;
      return moment(date, format).toDate();
    };
    onSelect([
      getDate(start),
      getDate(end),
    ]);
  }
  render() {
    const {
      onClose,
    } = this.props;
    return (
      <div className="date-time-range-picker">
        <DateRangePicker
          allowSingleDayRange
          defaultValue={this.getData('dateRange')}
          onChange={(dateRange) => {
            this.change(dateRange, 'dateRange');
          }}
        />
        <TimePicker
          className="start"
          precision={TimePickerPrecision.SECOND}
          defaultValue={this.getData('start')}
          onChange={(date) => {
            this.change(date, 'start');
          }}
        />
        <TimePicker
          className="end"
          precision={TimePickerPrecision.SECOND}
          defaultValue={this.getData('end')}
          onChange={(date) => {
            this.change(date, 'end');
          }}
        />
        <div className="controls">
          <a
            href="javascript:;"
            onClick={onClose}
          >
            <span className="pt-icon-disable pt-icon-standard" />
            Close
          </a>
          <a
            href="javascript:;"
            onClick={() => this.select()}
          >
            <span className="pt-icon-confirm pt-icon-standard" />
            Confrim
          </a>
        </div>
      </div>
    );
  }
}

DateTimeRangePicker.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  dateRange: PropTypes.array.isRequired,
};

export default DateTimeRangePicker;
