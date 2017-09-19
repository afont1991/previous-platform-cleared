import React, { Component } from 'react';

class MatchList extends Component {
  render() {
    console.log(this.props.matches);
    return (
      <h1>Match List Section</h1>
    );
  }
}

export default MatchList;
