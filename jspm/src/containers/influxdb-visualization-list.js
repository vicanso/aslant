'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes } from 'react';
import PuzzleList from 'aslant/components/puzzle-list';
import * as navigationAction from 'aslant/actions/navigation';
import * as configureAction from 'aslant/actions/configure';

const InfluxdbVisualizationList = (props) => {
  const { dispatch, configures, account } = props;
  return (
    <PuzzleList
      className="influxdbVisualizationList"
      account={account}
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
  account: PropTypes.string,
};

export default InfluxdbVisualizationList;
