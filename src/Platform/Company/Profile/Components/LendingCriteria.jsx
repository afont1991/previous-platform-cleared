import React, { Component } from 'react';
import CriteriaBox from './CriteriaBox'

class LendingCriteria extends Component {
  render() {
    const profileData = this.props.profileData;
    return (
      <div className="profile-section">
        <div className="row">
          <div className="col-md-12">
            <p className="profile-text text-muted header-font"><strong>Investment Criteria</strong></p>
            <CriteriaBox criteriaKey='Industries' profileData={profileData} />
            <CriteriaBox criteriaKey='ExcludedIndustries' profileData={profileData} />
            <CriteriaBox criteriaKey='TypesOfCapital' profileData={profileData} />
            <CriteriaBox criteriaKey='Characteristics' profileData={profileData} />
            <CriteriaBox criteriaKey='Scenarios' profileData={profileData} />
            <CriteriaBox criteriaKey='Geographies' profileData={profileData} />
            <CriteriaBox criteriaKey='Financials' profileData={profileData} />
            <CriteriaBox criteriaKey='Sizes' profileData={profileData} />
          </div>
        </div>
      </div>
    );
  }
}

export default LendingCriteria;
