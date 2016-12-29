import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';

class Gesture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingGesture: false,
      gesture: null,
    };
  }
  render() {
    const {
      onFininsh,
    } = this.props;
    const {
      gesture,
      settingGesture,
    } = this.state;
    const arr = _.map(_.range(0, 9), (index) => {
      const cls = {
        circle: true,
      };
      if (_.indexOf(gesture, index) !== -1) {
        cls.active = true;
      }
      return (
        <div
          key={index}
          className={classnames(cls)}
          onMouseDown={() => {
            this.setState({
              settingGesture: true,
              gesture: [index],
            });
          }}
          onMouseEnter={() => {
            if (settingGesture) {
              const clone = gesture.slice(0);
              if (_.indexOf(clone, index) === -1) {
                clone.push(index);
                this.setState({
                  gesture: clone,
                });
              }
            }
          }}
        />
      );
    });

    return (
      <div
        className="gesture"
        onMouseUp={() => {
          this.setState({
            settingGesture: false,
          });
          onFininsh(gesture);
        }}
      >
        { arr }
      </div>
    );
  }
}

Gesture.propTypes = {
  onFininsh: PropTypes.func.isRequired,
};

export default Gesture;
