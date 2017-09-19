import React, { Component } from 'react';
import {browserHistory} from 'react-router'
import {formatNumber} from '../../../../Helpers/valueFormatHelper';

class Results extends Component {
  render() {
    const results = this.props.results.map((result, i) => {
      const viewButton = (
        <button
          className="btn btn-default purple-background white-color no-text-transform"
          onClick={() => {browserHistory.push(`/platform/deal/${result.id}`);}}
          type="submit">
          View
        </button>
      );
      const industriesCell = result.LookupIndustries.map((industry, i) => {
        if(i !== 0){
          return `, ${industry.name}`;
        } else {
          return `${industry.name}`;
        }
      });
      const scenariosCell = result.LookupScenarios.map((scenario, i) => {
        if(i !== 0){
          return `, ${scenario.name}`;
        } else {
          return `${scenario.name}`;
        }
      });
      let mostRecentFinancial = result.Financials.reduce((mostRecent, financial) => {
        if(financial.fiscal_year > mostRecent.fiscal_year ){
          return financial
        } else {
          return mostRecent
        }
      }, result.Financials[0])
      return (
        <tr className="platform-table-row" key={i} >
          <td className='the-table'>
            {result.title}
            <br />
            {result.headline}
          </td>
          <td>{industriesCell}</td>
          <td>{scenariosCell}</td>
          {mostRecentFinancial ? (<td className='search-cell-small'>{formatNumber(mostRecentFinancial.revenue)}</td>) : (<td></td>) }
          {mostRecentFinancial ? (<td className='search-cell-small'>{formatNumber(mostRecentFinancial.ebitda)}</td>) : (<td></td>) }
          <td className='search-view-button'>
            <a
              className="btn btn-default purple-background white-color no-text-transform"
              onClick={()=>{this.props.submitMatchRequest({DealId: result.id})}}
            >Pursue</a>
          </td>
          <td className='search-view-button'>{viewButton}</td>
        </tr>
      );
    })
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
              <p className="profile-text text-muted profile-section-header"><strong>Recommended Deals</strong></p>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr className="the-table">
                      <th className='table-header-underlined'>Description</th>
                      <th className="table-header-underlined">Industry</th>
                      <th className='table-header-underlined text-center'>Scenario</th>
                      <th className='table-header-underlined text-center'>Revenue</th>
                      <th className='table-header-underlined text-center'>EBITDA</th>
                      <th className='table-header-underlined text-center'>Request</th>
                      <th className='table-header-underlined text-center'>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    )
  }
};

export default Results;
