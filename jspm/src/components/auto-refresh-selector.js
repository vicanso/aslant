'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes } from 'react';
import Select from 'react-select';
import * as _ from 'lodash';

const AutoRefreshSelector = (props) => {
  const { onChange, value } = props;
  const seconds = [10, 15, 30, 45, 60];
  const minutes = [2, 5, 10];
  const options = [];
  _.forEach(seconds, v => options.push({
    label: `Auto Refresh:${v} seconds`,
    value: `${v}s`,
  }));
  _.forEach(minutes, v => options.push({
    label: `Auto Refresh:${v} minutes`,
    value: `${v}m`,
  }));
  return (
    <Select
      value={value}
      options={options}
      className="autoRefreshSelector"
      onChange={item => {
        onChange((item && item.value) || '');
      }}
    />
  );
};

AutoRefreshSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default AutoRefreshSelector;
