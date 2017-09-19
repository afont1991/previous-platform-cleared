import React, { Component } from 'react';
import {Link} from 'react-router';
// import {Well} from 'react-bootstrap';
import LoadingWidget from '../../Components/LoadingWidget';
import mixpanel from 'mixpanel-browser'

import Header from './Components/Header';
import Description from './Components/Description';
import LendingCriteria from './Components/LendingCriteria';
import RecentActivity from './Components/RecentActivity';
import TeamSideBar from './Components/TeamSideBar';
import KeyFactsSideBar from './Components/KeyFactsSideBar';
import MatchDropDown from './Components/MatchDropDown';


class CompanyProfileComponent extends Component {

  componentWillMount() {
    this.props.fetchCompanyProfile(this.props.params.CompanyId);
  }

  componentDidUpdate() {
    if(this.props.state.status !== 'pending'){
      mixpanel.track(
        "profile_view", {
          type: 'company',
          company_name: this.props.state.profileData.basicDetails.name,
          company_type: this.props.state.profileData.basicDetails.platform_type,
      });
    }
  }

  componentWillUnmount() {
    this.props.unMount();
  }

  render() {

    const editButton = (
      <Link className="platform-button filter-thin-button-page edit-btn" to={"/platform/company/edit/" + this.props.params.CompanyId} >Edit</Link>
    );
    if(this.props.state.status === 'pending'){
      return (<LoadingWidget />);
    } else {

      let privateCriteria = false;
      if (this.props.state.profileData.basicDetails && this.props.state.profileData.basicDetails.operating_type.includes('Private Company')) {
        privateCriteria = true;
      }
      console.log(privateCriteria);
      return (
        <div className="container-fluid">
          <div className="row line-divider">
            <div className="col-md-12 text-right">
              {this.props.state.profileData.user.type === 'borrower' && this.props.state.profileData.basicDetails.platform_type === 'lender' && !this.props.state.profileData.isOwner
                ?
                (<MatchDropDown
                  state={this.props.state}
                  fetchActiveDeals={this.props.fetchActiveDeals}
                  onActiveDealSelect={this.props.onActiveDealSelect}
                  submitMatchRequest={this.props.submitMatchRequest}
                  unMount={this.props.unMount}
                  CompanyId={this.props.params.CompanyId}
                /> ) :
                (<div className=''></div>)}
                {this.props.state.profileData.isOwner || this.props.state.profileData.user.admin ? editButton: null}
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <Header profileData={this.props.state.profileData} />
              <Description profileData={this.props.state.profileData} />
              {privateCriteria === false ? (
                <LendingCriteria profileData={this.props.state.profileData} />
              ) : (
                ('')
              )}
            </div>
            <div className="col-md-4 left-border">
              <KeyFactsSideBar profileData={this.props.state.profileData} />
              <TeamSideBar profileData={this.props.state.profileData} />
              {/* <div className="profile-side-bar-section">
                <p className="profile-text text-muted profile-section-header no-margin-bottom"><strong>Recent Press</strong></p>
                <Well><p className="profile-text text-muted header-font text-center"><strong>Coming Soon</strong></p></Well>
              </div> */}
            </div>
          </div>
          {privateCriteria === false ? (
            <RecentActivity profileData={this.props.state.profileData} />
          ) : (
            ('')
          )}
        </div>
      );
    }
  }
}

export default CompanyProfileComponent;
