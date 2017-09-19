import React, { Component } from 'react';
import {formatNumber} from '../../../../Helpers/valueFormatHelper';
import moment from 'moment';
import isEmpty from 'is-empty'

class DealTransactionOverview extends Component {
  render() {
    const profileData = this.props.profileData;
    let scenarioName = 'Undisclosed';
    if(!isEmpty(profileData.scenarios)){
      scenarioName = profileData.scenarios[0].LookupScenario.name;
    }
    let seekingItems = profileData.typesOfCapital.map((capital, i) =>{
      return (
        <li className='criteria-list-item' key={i}><strong>{capital.LookupTypesOfCapital.name}</strong> {formatNumber(capital.amount)}</li>
      )
    });
    console.log(profileData);
    seekingItems.push((<li  key='y' className='criteria-list-item'><strong>Scenario:</strong> {scenarioName}</li>));
    return (
      <div>
        <div className="col-md-6">
          <p className="profile-header text-muted text-center"><strong>Transaction Overview</strong></p>
          <div className="row">
            <div className="col-md-12">
              <p className="profile-header text-muted underline"><strong>Seeking</strong></p>
              <ul className="criteria-list company-overview-list">
                {seekingItems}
              </ul>
              <p className="profile-header text-muted underline margin-top"><strong>Process</strong></p>
              <ul className="criteria-list company-overview-list">
                <li className='criteria-list-item'><strong>Status:</strong> {profileData.basicDetails.status}</li>
                <li className='criteria-list-item'><strong>Date created:</strong> {moment(profileData.basicDetails.createdAt).format("MMM Do")}</li>
                <li className='criteria-list-item'><strong>Last updated:</strong> {moment(profileData.basicDetails.updatedAt).format("MMM Do")}</li>
                <li className='criteria-list-item'><strong>Term sheets:</strong> {moment(profileData.basicDetails.termsheet_date).format("MMM Do")}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row profile-section">
          <div className="col-md-12">
            <p className="profile-header text-muted underline margin-top"><strong>Additional Information</strong></p>
            <p className="profile-text text-muted sub-header">{profileData.basicDetails.additional_information}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default DealTransactionOverview;
