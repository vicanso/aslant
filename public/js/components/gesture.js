import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';

class Gesture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleSize: 60,
      settingGesture: false,
      gesture: null,
      offset: null,
    };
  }
  render() {
    const {
      onFininsh,
    } = this.props;
    const {
      gesture,
      settingGesture,
      offset,
      circleSize,
    } = this.state;
    const addToSelected = (index) => {
      if (settingGesture) {
        const clone = gesture.slice(0);
        if (_.indexOf(clone, index) === -1) {
          clone.push(index);
          this.setState({
            gesture: clone,
          });
        }
      }
    };
    const getIndex = (position) => {
      const x = position.left - offset.left;
      const y = position.top - offset.top;
      if (x % circleSize < 10
        || x % circleSize > 50
        || y % circleSize < 10
        || y % circleSize > 50
      ) {
        return -1;
      }
      return (Math.floor(y / circleSize) * 3) + Math.floor(x / circleSize);
    };
    const endEvent = () => {
      this.setState({
        settingGesture: false,
      });
      onFininsh(gesture);
    };
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
            addToSelected(index);
          }}
        />
      );
    });
    return (
      <div
        className="gesture noselect"
        onTouchStart={(e) => {
          const target = e.currentTarget;
          console.dir(target);
          this.setState({
            settingGesture: true,
            offset: {
              left: target.offsetLeft,
              top: target.offsetTop,
            },
            gesture: [],
          });
          e.preventDefault();
        }}
        onTouchMove={(e) => {
          if (!settingGesture) {
            return;
          }
          const touche = e.touches[0];
          const index = getIndex({
            left: touche.pageX,
            top: touche.pageY,
          });
          if (index !== -1) {
            addToSelected(index);
          }
        }}
        onTouchEnd={endEvent}
        onMouseUp={endEvent}
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
