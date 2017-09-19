import React, { Component } from 'react';
import moment from 'moment';
import { browserHistory } from 'react-router';
import {formatNumber} from '../../../../Helpers/valueFormatHelper';
import FormInput from '../../../Components/FormInput';

import SavedSearchModal from '../../../Search/SavedSearchModal/Container';

class Results extends Component {
  render() {
    const deals = this.props.state.dealResults;
    let dealRows;
    if(deals.length !== 0){
      dealRows = deals.map((deal, i) => {
        // const viewButton = (
        //   <button
        //     className="btn btn-default purple-background white-color no-text-transform"
        //     onClick={() => {browserHistory.push(`/platform/deal/${deal.id}`);}}
        //     type="submit">
        //     View
        //   </button>
        // );
        const industriesCell = deal.LookupIndustries.map((industry, i) => {
          if(i !== 0){
            return `, ${industry.name}`;
          } else {
            return `${industry.name}`;
          }
        });
        const scenariosCell = deal.LookupScenarios.map((scenario, i) => {
          if(i !== 0){
            return `, ${scenario.name}`;
          } else {
            return `${scenario.name}`;
          }
        });
        let mostRecentEbitda = 'Undisclosed'
        let mostRecentRevenue = 'Undisclosed'
        deal.Aggregates.forEach((agg) => {
          if(agg.name === 'most recent revenue'){
            mostRecentRevenue = agg.value
          }
          if(agg.name === 'most recent ebitda'){
            mostRecentEbitda = agg.value
          }
        })
        let rowClass = "click-able-table-row platform-table-row"
        if(deal.match){
          let status = deal.match.borrower_status
          if(status === 'accepted'){
            status = 'matched'
          }
          rowClass = `click-able-table-row platform-table-row ${status}`
        }
        return (
          <tr className={rowClass} key={i} onClick={() => {browserHistory.push(`/platform/deal/${deal.id}`);}}>
            <td className='the-table'>
              {deal.match ? deal.match.borrower_status : null }
              {deal.match ? (<br />) : null }
              {deal.title}
              <br />
              {deal.headline}
            </td>
            <td>{industriesCell}</td>
            <td>{scenariosCell}</td>
            <td className='search-cell-small'>{formatNumber(mostRecentRevenue)}</td>
            <td className='search-cell-small'>{formatNumber(mostRecentEbitda)}</td>
            <td className='search-cell-small'>{moment(deal.createdAt).format("MMM Do, h:mm a")}</td>
          </tr>
        );
      });
    }
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
            <SavedSearchModal type='deal' />
          </div>
          <div className="col-md-3">
            { this.props.state.filterData.page > 1 ? (<a className="platform-button filter-thin-button-page float-left" onClick={()=>this.props.previousPage()}>Previous</a>) : ''}
            <a className="platform-button filter-thin-button-page float-right" onClick={()=>this.props.nextPage()}>Next</a>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr className="the-table platform-table-head">
                <th>Description</th>
                <th>Industry</th>
                <th className='text-center'>Scenario</th>
                <th className='text-center'>Revenue</th>
                <th className='text-center'>EBITDA</th>
                <th className='text-center'>Created</th>
              </tr>
            </thead>
            <tbody>
              {dealRows}
            </tbody>
          </table>
        </div>
        <a className="next float-right" onClick={()=>this.props.nextPage()}>Next >></a>
      </div>
    )
  }
};

export default Results;
