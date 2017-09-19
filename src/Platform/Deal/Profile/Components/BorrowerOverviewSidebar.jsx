import React, { Component } from 'react';
import {formatNumber} from '../../../../Helpers/valueFormatHelper';
import { browserHistory } from 'react-router'

class BorrowerOverviewSidebar extends Component {
  render() {
    const borrowerProfile = this.props.profileData.basicDetails.ParentCompany;
    const viewButton = (
      <button
        className="btn btn-default purple-background white-color no-text-transform view-sponsor-button"
        onClick={() => {browserHistory.push(`/platform/company/${borrowerProfile.id}`);}}
        type="submit">
        View
      </button>
    );
    let Location = `${borrowerProfile.state}`
    if(borrowerProfile.city){
      Location = `${borrowerProfile.city}, ${borrowerProfile.state}`
    }
    return (
      <div className="profile-side-bar-section">
        <p className="profile-text text-muted profile-section-header"><strong>Sponsor Profile</strong></p>
        <div className="contianer text-center">
          {viewButton}
        </div>
        <p className="profile-text profile-main-text text-muted no-margin-bottom"><span className="black-text">Name</span>: {borrowerProfile.name}</p>
        {borrowerProfile.founding_year ? (<p className="profile-text profile-main-text text-muted no-margin-bottom"><span className="black-text">Founded</span>: {borrowerProfile.founding_year}</p>) : ('') }
        {borrowerProfile.state ? (<p className="profile-text profile-main-text text-muted no-margin-bottom"><span className="black-text">Location</span>: {Location}</p>) : ('') }
        {borrowerProfile.aum ? (<p className="profile-text profile-main-text text-muted no-margin-bottom"><span className="black-text">AUM</span>: {formatNumber(borrowerProfile.aum)}</p>) : ('') }
        {borrowerProfile.dry_powder ? (<p className="profile-text profile-main-text text-muted no-margin-bottom"><span className="black-text">Dry Powder</span>: {formatNumber(borrowerProfile.dry_powder)}</p>) : ('') }
        {borrowerProfile.active_investments ? (<p className="profile-text profile-main-text text-muted no-margin-bottom"><span className="black-text">Active Investments</span>: {borrowerProfile.active_investments}</p>) : ('') }
      </div>
    );
  }
}

export default BorrowerOverviewSidebar;
