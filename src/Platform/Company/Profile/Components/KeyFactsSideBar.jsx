import React, { Component } from 'react';
import {formatNumber} from '../../../../Helpers/valueFormatHelper';

class KeyFactsSideBar extends Component {
  render() {
    const profileData = this.props.profileData.basicDetails;
    let Location = `${profileData.state}`
    if(profileData.city){
      Location = `${profileData.city}, ${profileData.state}`
    }

    let lockBox = null
    if(profileData.platform_type !== 'borrower') {
      lockBox = profileData.lockbox ? (<p className="profile-text profile-main-text text-muted no-margin-bottom"><span className="black-text">Lockbox</span>: {profileData.lockbox ? 'Yes' : 'No'}</p>) : (null)
    }

    return (
      <div className="profile-side-bar-section">
        <p className="profile-text text-muted profile-section-header alignment-please-delete"><strong>Key Facts</strong></p>
        {profileData.founding_year ? (<p className="profile-text profile-main-text text-muted no-margin-bottom"><span className="black-text">Founded</span>: {profileData.founding_year}</p>) : ('') }
        {profileData.state ? (<p className="profile-text profile-main-text text-muted no-margin-bottom"><span className="black-text">Location</span>: {Location}</p>) : ('') }
        {profileData.open_fund ? (<p className="profile-text profile-main-text text-muted no-margin-bottom"><span className="black-text">Current Fund</span>: {profileData.open_fund}</p>) : ('') }
        {profileData.aum ? (<p className="profile-text profile-main-text text-muted no-margin-bottom"><span className="black-text">AUM</span>: {formatNumber(profileData.aum)}</p>) : ('') }
        {profileData.dry_powder ? (<p className="profile-text profile-main-text text-muted no-margin-bottom"><span className="black-text">Dry Powder</span>: {formatNumber(profileData.dry_powder)}</p>) : ('') }
        {profileData.active_investments ? (<p className="profile-text profile-main-text text-muted no-margin-bottom"><span className="black-text">Active Investments</span>: {profileData.active_investments}</p>) : ('') }
        {lockBox}
        {profileData.yield_minimum ? (<p className="profile-text profile-main-text text-muted no-margin-bottom"><span className="black-text">Yield Minimum</span>: {formatNumber(profileData.yield_minimum, 'word_percentage')}</p>) : ('') }
        {profileData.cash_coupon ? (<p className="profile-text profile-main-text text-muted no-margin-bottom"><span className="black-text">Cash Coupon</span>: {formatNumber(profileData.cash_coupon, 'word_percentage')}</p>) : ('') }
      </div>
    );
  }
}

export default KeyFactsSideBar;
