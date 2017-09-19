import { connect } from 'react-redux';
import React, { Component } from 'react';

const chartOfTheWeekImage = require('../../../Assets/images/chartoftheweek_final.png');

// Actions
// import * as actions from './Actions';

class ChartOfTheWeek extends Component {
  render() {
    return (
        <div className='chart-container container-fluid'>
          <p className="profile-text text-muted profile-section-header"><strong>Chart of the week</strong></p>
            <div className='chart-div'>
              <img src={chartOfTheWeekImage} alt="..." className="img-rounded chart-of-the-week"  />
            </div>
        </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.ChartOfTheWeek
  }
}

const ChartOfTheWeekContainer = connect(
  mapStateToProps
)(ChartOfTheWeek)

export default ChartOfTheWeekContainer
