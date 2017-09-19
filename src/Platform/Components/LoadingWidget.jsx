import React, { Component } from 'react';
import Loading from 'react-loading';

class LoadingWidget extends Component {
  render() {
    return (
      <div className="ab-centered">
        <Loading type='bars' color='#7a5dcb' height='120px' width='120px' />
      </div>
    );
  }
}

export default LoadingWidget;
