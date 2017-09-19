import { connect } from 'react-redux'
import React, { Component } from 'react';

// Presenational Components
import LoadingWidget from '../Components/LoadingWidget';

// Actions
import * as actions from './Actions';

class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.Dashboard
  }
}

const DashboardContainer = connect(
  mapStateToProps
)(Dashboard)

export default DashboardContainer
