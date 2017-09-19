import React, { Component } from 'react';
import isEmpty from 'is-empty'

class DealGeneralOverview extends Component {
  render() {
    const basicDetails = this.props.profileData.basicDetails;
    const IndustryList = this.props.profileData.industries.map((industry, i) => {
      let currentID = i + 1
      if(this.props.profileData.industries.length === currentID){
        return `${industry.LookupIndustry.name}`
      } else {
        return `${industry.LookupIndustry.name}, `
      }
    })
    let Region = 'Undisclosed'
    if(!isEmpty(basicDetails.region)){
      Region = basicDetails.region
    }
    let IndustryArea = 'Undisclosed'
    if(!isEmpty(IndustryList)){
      IndustryArea = IndustryList
    }
    let ScenarioName = 'Undisclosed'
    if(!isEmpty(this.props.profileData.scenarios)){
      ScenarioName = this.props.profileData.scenarios[0].LookupScenario.name
    }
    return (
      <div className="col-md-6 overview border-right">
        <p className="profile-header text-muted"><strong>Company Overview</strong></p>
        <ul className="criteria-list company-overview-list">
          <li className='criteria-list-item'><strong>Founded:</strong> {basicDetails.founded}</li>
          <li className='criteria-list-item'><strong>Location:</strong> {Region}</li>
          <li className='criteria-list-item'><strong>Industry:</strong> {IndustryArea}</li>
          <li className='criteria-list-item'><strong>Scenario:</strong> {ScenarioName}</li>
        </ul>
        <p className="profile-header text-muted underline margin-top text-left"><strong>Description</strong></p><p className="profile-text text-muted sub-header text-left">{basicDetails.description}</p>
      </div>
    );
  }
}

export default DealGeneralOverview;
