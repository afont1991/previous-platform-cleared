import React, { Component } from 'react';

class DealHeader extends Component {
  render() {
    // TODO: Make dynamic
    // const industryLogo = require('../../../../Assets/images/manufacturing-industry-logo.png');
    return (
      <div className="profile-section">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <h1 className="profile-main-text text-muted deal-header border-top center-text" >{this.props.profileData.basicDetails.title}</h1>
            <h3 className="text-muted deal-sub center-text">{this.props.profileData.basicDetails.headline}</h3>
          </div>
          <div className="col-md-2">
            {/* <img src={industryLogo} alt="..." className="img-rounded profile-logo"  /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default DealHeader;
