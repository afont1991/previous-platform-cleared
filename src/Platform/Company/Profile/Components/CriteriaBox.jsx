import React, { Component } from 'react';
import {formatNumber} from '../../../../Helpers/valueFormatHelper';

class LendingCriteria extends Component {
  render() {
    const criteriaKey = this.props.criteriaKey
    const profileData = this.props.profileData
    if(profileData.criteria[criteriaKey].length === 0){
      return null;
    }
    let type = 'select';
    if(Object.keys(profileData.criteria[criteriaKey][0]).includes('min')){
      type = 'range';
    } else if(criteriaKey === 'Geographies'){
      type = 'geography'
    }
    const individualCriteria = profileData.criteria[criteriaKey].map((criteria, i) =>{
      let criteriaValue;
      if(type === 'select'){
        criteriaValue = criteria.name;
      } else if(type === 'geography'){
        criteriaValue = criteria;
      } else {
        criteriaValue = (
          <span>
            <strong>{criteria.name}</strong>:
            {(criteria.min || criteria.max) ? (
              <span> {criteria.min ? formatNumber(criteria.min) : 'none'} - {criteria.max ? formatNumber(criteria.max) : 'none'}</span>
            ) : (' undisclosed')}
          </span>
        );
      }
      return (
        <li className='criteria-list-item' key={i}>
          {criteriaValue}
        </li>
      )
    });
    let criteriaKeyName = criteriaKey
    if(criteriaKey === 'TypesOfCapital'){
      criteriaKeyName = 'Types of capital'
    } else if(criteriaKey === 'Geographies'){
      criteriaKeyName = 'Geography'
    } else if(criteriaKey === 'ExcludedIndustries'){
      criteriaKeyName = 'Excluded Industries'
    }
    return (
      <div className="profile-deal-box investment-criteria-box">
        <div className="deal-box-status-bar text-center investment-criteria-label">
          <p className="">{criteriaKeyName}</p>
        </div>
        <ul className="criteria-list">
          {individualCriteria}
        </ul>
      </div>
    );
  }
}

export default LendingCriteria;
