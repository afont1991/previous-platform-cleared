import React, { Component } from 'react';
import {browserHistory} from 'react-router'
import {formatNumber} from '../../../../Helpers/valueFormatHelper';

class Results extends Component {
  render() {
    const results = this.props.results.map((result, i) => {
      let revenueCell = 'undisclosed';
      let ebitdaCell = 'undisclosed';
      let typesCell = '- ';
      let industriesCell = '- ';
      let investmentSizeCell = 'undisclosed';
      result.LookupFinancials.forEach((financial) => {
        if(financial.name === 'Revenue'){
          revenueCell = `${formatNumber(financial.CriteriaFinancials.min)} - ${formatNumber(financial.CriteriaFinancials.max)}`
        }
        if(financial.name === 'EBITDA'){
          ebitdaCell = `${formatNumber(financial.CriteriaFinancials.min)} - ${formatNumber(financial.CriteriaFinancials.max)}`
        }
      })
      result.LookupSizes.forEach((size) => {
        if(size.name === 'Investment Size'){
          investmentSizeCell = `${formatNumber(size.CriteriaSize.min)} - ${formatNumber(size.CriteriaSize.max)}`
        }
      })
      result.LookupIndustries.forEach((industry, i) => {
        if(i === 0){
          industriesCell += `${industry.name}`;
        } else {
          industriesCell += `, ${industry.name}`;
        }
      });
      result.LookupTypesOfCapitals.forEach((type, i) => {
        if(i === 0){
          typesCell += `${type.name}`;
        } else {
          typesCell += `, ${type.name}`;
        }
      });
      const viewButton = (
        <button
          className="btn btn-default purple-background white-color no-text-transform"
          onClick={() => {browserHistory.push(`/platform/company/${result.id}`);}}
          type="submit">
          View
        </button>
      );
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
        <tr key={i} className="platform-table-row" >
          <td className='search-cell-small'>{result.name}</td>
          <td className='search-cell-small'>{result.location}</td>
          <td>{typesCell}</td>
          <td>{industriesCell}</td>
          <td className='search-cell-small'>{formatNumber(result.aum)}</td>
          <td className='search-cell-small'>{result.active_investments}</td>
          <td className='search-cell-small criteria-cell'>{criteriaCell}</td>
          <td className='search-view-button'>
            <a
              className="btn btn-default purple-background white-color no-text-transform"
              onClick={()=>{this.props.submitMatchRequest({CompanyId: result.id, DealId: this.props.DealId})}}
            >Add to list</a>
          </td>
          <td className='search-view-button'>{viewButton}</td>
        </tr>
      );
    })
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
              <p className="profile-text text-muted profile-section-header"><strong>Recommended Lenders</strong></p>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr className="the-table">
                      <th className='table-header-underlined'>Name</th>
                      <th className='table-header-underlined'>HQ</th>
                      <th className='table-header-underlined'>Type of capital</th>
                      <th className='table-header-underlined'>Industries</th>
                      <th className='table-header-underlined text-center'>AUM</th>
                      <th className='table-header-underlined text-center'>Investments</th>
                      <th className='table-header-underlined text-center'>Investment Criteria</th>
                      <th className='table-header-underlined text-center'>Invite</th>
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
