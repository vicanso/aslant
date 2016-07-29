'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes } from 'react';
import PuzzleList from '../components/puzzle-list';
import * as navigationAction from '../actions/navigation';
import * as configureAction from '../actions/configure';

const InfluxdbVisualizationList = (props) => {
  const { dispatch, configures } = props;
  return (
    <PuzzleList
      className="influxdbVisualizationList"
      add={() => dispatch(navigationAction.addVisualization())}
      remove={id => dispatch(configureAction.remove(id))}
      edit={id => dispatch(navigationAction.editVisualization(id))}
      show={id => dispatch(navigationAction.showVisualization(id))}
      items={configures}
    />
  );
};

InfluxdbVisualizationList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  configures: PropTypes.array.isRequired,
};

export default InfluxdbVisualizationList;
