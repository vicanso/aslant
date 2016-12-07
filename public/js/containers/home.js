import React, { PropTypes, Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className="home-wrapper"
      />
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default Home;
