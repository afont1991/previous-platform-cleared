import React, { Component } from 'react';
import LoadingWidget from '../../Components/LoadingWidget';
import { Link, browserHistory } from 'react-router'
import { Well } from 'react-bootstrap'
import mixpanel from 'mixpanel-browser'

import Header from './Components/Header'
import GeneralOverview from './Components/GeneralOverview'
import TransactionOverview from './Components/TransactionOverview'
import FinancialSummary from './Components/FinancialSummary'
import BorrowerOverviewSidebar from './Components/BorrowerOverviewSidebar'
import PrimaryContactsSidebar from './Components/PrimaryContactsSidebar'
import FAQComponent from './Components/FAQ'


class DealProfileComponent extends Component {
  componentWillMount(){
    this.props.fetchDealProfile(this.props.params.DealId);
  }
  componentDidUpdate() {
    if(this.props.state.status !== 'pending'){
      mixpanel.track(
        "profile_view", {
          type: 'deal',
          deal_name: this.props.state.profileData.basicDetails.title,
      });
    }
  }
  render() {
    if(this.props.state.status === 'pending' || !this.props.state.profileData){
      return (<LoadingWidget />);
    } else {
      let matchInfo;
      let ActionSection = '';
      if(this.props.state.profileData.IsMatched){
        matchInfo = {
          DealId: Number(this.props.params.DealId),
          CompanyId: Number(this.props.state.profileData.userInfo.CompanyId),
          newStatuses: [
            {name: 'borrower_status', value: 'accepted'},
            {name: 'lender_status', value: 'accepted'},
          ]
        }
      }
      if(this.props.state.profileData.userInfo.type === 'lender' && !this.props.state.profileData.IsMatched){
        ActionSection = (
          <div className="row">
            <div className="col-md-12 text-right">
              <a className="platform-button filter-thin-button-page" onClick={()=>{this.props.submitMatchRequest({ CompanyId: this.props.state.profileData.userInfo.CompanyId, DealId: this.props.params.DealId })}}>Pursue</a>
            </div>
          </div>
        )
      } else if(this.props.state.profileData.userInfo.type === 'lender' && this.props.state.profileData.IsMatched && this.props.state.profileData.MatchStatus.borrower === 'listed') {
        ActionSection = (
          <div className="row">
            <div className="col-md-12 text-right">
              <a className="platform-button filter-thin-button-page" onClick={()=>{this.props.submitUpdateMatchRequest({ CompanyId: this.props.state.profileData.userInfo.CompanyId, DealId: this.props.params.DealId })}}>Pursue</a>
            </div>
          </div>
        )
      } else if(this.props.state.profileData.userInfo.type === 'lender' && this.props.state.profileData.IsMatched && this.props.state.profileData.MatchStatus.borrower === 'accepted' && this.props.state.profileData.MatchStatus.lender === 'accepted'){
        ActionSection = (
          <div className="row">
            <div className="col-md-12 text-right">
              <a className="platform-button filter-thin-button-page" onClick={() => {browserHistory.push(`/platform/deal/manager/${this.props.params.DealId}`)}}>View Match</a>
            </div>
          </div>
        )
      } else if(this.props.state.profileData.userInfo.type === 'lender' && this.props.state.profileData.IsMatched && this.props.state.profileData.MatchStatus.lender === 'requested'){
        ActionSection = (
          <div className="row">
            <div className="col-md-12 text-right">
              <p className="platform-text-large text-muted pending-text">Match Pending</p>
            </div>
          </div>
        )
      } else if(this.props.state.profileData.userInfo.type === 'lender' && this.props.state.profileData.IsMatched && this.props.state.profileData.MatchStatus.lender === 'pending' && this.props.state.profileData.MatchStatus.borrower === 'invited'){
        ActionSection = (
          <div className="row">
            <div className="col-md-12 text-right">
              <button
                className="btn btn-default btn-lg green-background white-color no-text-transform margin-top-10"
                onClick={() => {this.props.submitUpdateMatchRequest(matchInfo)}}>
                Accept Match Request
              </button>
            </div>
          </div>
        )
      } else if(this.props.state.profileData.IsOwner){
        ActionSection = (
          <div className="row">
            <div className="col-md-6 text-right">
              <Link className="platform-button filter-thin-button-page deal-manager" to={`/platform/deal/manager/${this.props.params.DealId}`} >Deal Manager</Link>
            </div>
            <div className="col-md-6 text-left">
              <Link className="platform-button filter-thin-button-page right-align" to={`/platform/deal/edit/${this.props.params.DealId}`} >Edit</Link>
            </div>
          </div>
        )
      }
      return (
        <div className='contianer-fluid'>
          <div className="row">
            <Header profileData={this.props.state.profileData} />
              <div className="row">
                <div className="col-md-2 col-md-offset-8">
                  {ActionSection}
                </div>
                <div className="col-md-2">
                  {this.props.state.profileData.userInfo.admin === true ? (
                    <div className="row">
                      <div className="col-md-6 text-right">
                        <Link className="platform-button filter-thin-button-page" to={`/platform/deal/edit/${this.props.params.DealId}`} >Edit</Link>
                      </div>
                    </div>
                  ) : ('')}
                </div>
              </div>
              <div className="col-md-8">
              <div className="row">
                <GeneralOverview profileData={this.props.state.profileData} />
                <TransactionOverview profileData={this.props.state.profileData} />
              </div>
              <FinancialSummary profileData={this.props.state.profileData} />
            </div>
            <div className="col-md-4 relative left-border">
              {!this.props.state.profileData.basicDetails.blind_sponsor ? (
                <BorrowerOverviewSidebar profileData={this.props.state.profileData}/>
              ) : (
                <div className="profile-side-bar-section">
                  <p className="profile-text text-muted profile-section-header"><strong>Sponsor Profile</strong></p>
                  <Well><p className="profile-text text-muted header-font text-center"><strong>Undisclosed</strong></p></Well>
                </div>
              )}
              <PrimaryContactsSidebar profileData={this.props.state.profileData}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <p className="profile-header text-muted profile-section-header"><strong>FAQ</strong></p>
              <FAQComponent profileData={this.props.state.profileData} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default DealProfileComponent;
