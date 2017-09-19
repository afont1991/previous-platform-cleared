import { connect } from 'react-redux'
import React, { Component } from 'react';
import {Link} from 'react-router';
// Presenational Components
import LoadingWidget from '../Components/LoadingWidget';
import NotificationContainer from './Notifications/Container';
import DashboardSavedSearchContainer from './SavedSearches/Container';
import NewsContainer from './News/Container';
import ChartOfTheWeekContainer from './ChartOfTheWeek/Container';
import MarketStatsContainer from './MarketStats/Container';
import DealListContainer from '../Deal/List/Container';
import AutoDealList from '../Search/AutoDealList/Container'


// Actions
import * as actions from './Actions';

class Dashboard extends Component {
  componentWillMount() {
    this.props.init();
  }

  componentWillUnmount() {
    this.props.unMount()
  }

  render() {

    if(this.props.state.status === 'pending' || !this.props.state.userInfo) {
      return (<LoadingWidget />)
    } else {
      let CallToActionButton = (<Link to='platform/deal/create' className="platform-button call-to-action">Create a new deal</Link>);
      if(this.props.state.userInfo && this.props.state.userInfo.type === 'lender') {
        CallToActionButton = (<Link to='platform/deal/search' className="platform-button call-to-action">Find Deals</Link>);
      }
      const adminButton = (<Link to='platform/admin' className="platform-button call-to-action">Admin Zone</Link>);
      const createCompanyButton = (<Link to='platform/company/create' className="platform-button call-to-action">Admin Create Company</Link>);

      return (
        <div>
          <div className="container-fluid dashboard-body">
            <div className="row">
              <div className="col-md-4 col-md-offset-4 text-center">
                <p className="no-margin-bottom line-divider">DebtMaven Network</p>
                <div className="platform-stats-container">
                  <p>Lenders <span className="badge">{this.props.state.userInfo.lenderCount}</span></p>
                  <p>Borrowers <span className="badge">{this.props.state.userInfo.borrowerCount}</span></p>
                  <p>Deals <span className="badge">{this.props.state.userInfo.dealCount}</span></p>
                </div>
              </div>
            </div>
            <div className="row-fluid">
              <div className="col-md-12 text-right nav-buttons">
                {CallToActionButton}
                {this.props.state.userInfo.admin ? (adminButton) : ('')}
                {this.props.state.userInfo.admin ? (createCompanyButton) : ('')}
              </div>
            </div>
            <div className="row">
              <div className="col-md-9">
                <div className='row'>
                  <div className='col-md-12'>
                    <NotificationContainer />
                  </div>
                </div>
                <div className="row active-deals-container">
                  <div className="col-md-12">
                    <DealListContainer />
                  </div>
                </div>
                {false && this.props.state.userInfo.type === 'lender' ? (
                  <div className="row-fluid rec-deals-container">
                    <div className="col-md-12">
                      <AutoDealList CompanyId={this.props.state.userInfo.CompanyId} />
                    </div>
                  </div>
                ) : ''}
                <div className="row">
                  <div className="col-md-6">
                    <ChartOfTheWeekContainer />
                  </div>
                  <div className="col-md-6">
                    <MarketStatsContainer />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <DashboardSavedSearchContainer />
                <NewsContainer />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.Dashboard,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(actions.init())
    },
    unMount: () => {
      dispatch(actions.unMount())
    }
  }
}

const DashboardContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Dashboard)

export default DashboardContainer
