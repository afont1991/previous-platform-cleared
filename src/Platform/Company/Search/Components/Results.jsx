import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {formatNumber} from '../../../../Helpers/valueFormatHelper';
import FormInput from '../../../Components/FormInput';
import isEmpty from 'is-empty'
// import CriteriaModal from './CriteriaModal'

import SavedSearchModal from '../../../Search/SavedSearchModal/Container';

class Results extends Component {
  render() {
    const Companies = this.props.state.companyResults;
    const companyRows = Companies.map((company, i) => {
      let revenueCell = 'undisclosed';
      let ebitdaCell = 'undisclosed';
      let investmentSizeCell = 'undisclosed';
      if(company.revenue && (company.revenue.min || company.revenue.max)){
        let revMin = (company.revenue.min ? formatNumber(company.revenue.min) : 'none')
        let revMax = (company.revenue.max ? formatNumber(company.revenue.max) : 'none')
        revenueCell = `${revMin} - ${revMax}`
      }
      if(company.ebitda && (company.ebitda.min || company.ebitda.max)){
        let ebMin = (company.ebitda.min ? formatNumber(company.ebitda.min) : 'none')
        let ebMax = (company.ebitda.max ? formatNumber(company.ebitda.max) : 'none')
        ebitdaCell = `${ebMin} - ${ebMax}`
      }
      if(company.investmentSize && (company.investmentSize.min || company.investmentSize.max)){
        let inMin = (company.investmentSize.min ? formatNumber(company.investmentSize.min) : 'none')
        let inMax = (company.investmentSize.max ? formatNumber(company.investmentSize.max) : 'none')
        investmentSizeCell = `${inMin} - ${inMax}`
      }
      let criteriaCell = (
        <div className="row">
          <div className='col-md-4 platform-border-right light-padding'>
            <p className="text-muted small-cell-text">Investment Size</p>
            {investmentSizeCell}
          </div>
          <div className='col-md-4 platform-border-right light-padding'>
            <p className="text-muted small-cell-text">EBITDA Range</p>
            {ebitdaCell}
          </div>
          <div className='col-md-4 light-padding'>
            <p className="text-muted small-cell-text">Revenue Range</p>
            {revenueCell}
          </div>
        </div>
      )
      return (
        <tr key={i} className="click-able-table-row platform-table-row" >
          <td onClick={() => {browserHistory.push(`/platform/company/${company.id}`);}} className='search-cell-small'>{company.name}</td>
          <td onClick={() => {browserHistory.push(`/platform/company/${company.id}`);}} className='search-cell-small'>{isEmpty(company.location) ? ('Undisclosed') : (company.location)}</td>
          <td onClick={() => {browserHistory.push(`/platform/company/${company.id}`);}} className='search-cell-small'>{!isEmpty(company.aum) ? formatNumber(company.aum) : 'Undisclosed'}</td>
          <td onClick={() => {browserHistory.push(`/platform/company/${company.id}`);}} className='search-cell-small'>{!isEmpty(company.active_investments) ? company.active_investments : 'Undisclosed'}</td>
          <td onClick={() => {browserHistory.push(`/platform/company/${company.id}`);}} className='search-cell-small criteria-cell'>{criteriaCell}</td>
        </tr>
      );
    });
    return (
      <div className="filter-nav">
        <div className="row">
          <div className="col-md-3 no-padding">
            <p className="profile-text text-muted profile-section-header"><strong>Search results</strong></p>
          </div>
          <div className="col-md-3">
            <p className="profile-text text-muted results-side-header">Limit to </p>
            <FormInput
              Input={this.props.state.filterData.LimitInput}
              path={['filterData', 'LimitInput']}
              clearable={false}
              onSelect={(selected, path) => {this.props.onSelect(selected, path, {limit: true})}}
            />

            { ' ' }<p className="profile-text text-muted results-side-header">Results</p>
          </div>
          <div className="col-md-3">
            <SavedSearchModal type='company' />
          </div>
          <div className="col-md-3">
            { this.props.state.filterData.page > 1 ? (<a className="platform-button filter-thin-button-page float-left" onClick={()=>this.props.previousPage()}>Previous</a>) : ''}
            <a className="platform-button filter-thin-button-page float-right" onClick={()=>this.props.nextPage()}>Next</a>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr className='the-table platform-table-head'>
                <th>Name</th>
                <th>Location</th>
                <th>AUM</th>
                <th>Investments</th>
                <th>Investment Criteria</th>
              </tr>
            </thead>
            <tbody>
              {companyRows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
};

export default Results;
