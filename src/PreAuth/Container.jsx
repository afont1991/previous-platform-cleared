import React, { Component } from 'react';
import Nav from './Components/Nav'

class PreAuth extends Component {
  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    );
  }
}


export default PreAuth
