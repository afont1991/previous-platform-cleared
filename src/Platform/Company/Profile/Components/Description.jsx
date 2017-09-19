import React, { Component } from 'react';

class CompanyDescription extends Component {
  render() {
    const description = this.props.profileData.basicDetails.description;
    return (
      <div className="profile-section">
        <p className="profile-text">{description}</p>
      </div>
    );
  }
}

export default CompanyDescription;
