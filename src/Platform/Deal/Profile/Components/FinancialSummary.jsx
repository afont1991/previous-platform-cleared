import React, { Component } from 'react';
import {formatNumber} from '../../../../Helpers/valueFormatHelper';
import moment from 'moment'

class DealFinancialSummary extends Component {
  render() {
    const dealFinancials = this.props.profileData.financials;
    const basicDetails = this.props.profileData.basicDetails
    function getLabels(){
      return [
        (<th className="financial-table-header financial-bottom-border" key="1">LTM</th>),
        (<th className="financial-table-header financial-bottom-border" key="4">{`Dec ${(dealFinancials ? dealFinancials.year_3 : moment().format('YYYY'))}`}</th>),
        (<th className="financial-table-header financial-bottom-border" key="3">{`Dec ${(dealFinancials ? dealFinancials.year_2 : moment().subtract(1, 'years').format('YYYY'))}`}</th>),
        (<th className="financial-table-header financial-bottom-border" key="2">{`Dec ${(dealFinancials ? dealFinancials.year_1 : moment().subtract(2, 'years').format('YYYY'))}`}</th>),
      ]
    }
    function getCellFinData(key){
      return [
        (<td className="text-center profile-text" key="1">{((dealFinancials && dealFinancials[`${key}_ltm`]) ? formatNumber(dealFinancials[`${key}_ltm`], key) : '')}</td>),
        (<td className="text-center profile-text" key="4">{((dealFinancials && dealFinancials[`${key}_year_3`]) ? formatNumber(dealFinancials[`${key}_year_3`], key) : '')}</td>),
        (<td className="text-center profile-text" key="3">{((dealFinancials && dealFinancials[`${key}_year_2`]) ? formatNumber(dealFinancials[`${key}_year_2`], key) : '')}</td>),
        (<td className="text-center profile-text" key="2">{((dealFinancials && dealFinancials[`${key}_year_1`]) ? formatNumber(dealFinancials[`${key}_year_1`], key) : '')}</td>),
      ]
    }
    let tableCells = {
      labels: getLabels(),
      revenue_Cells: getCellFinData('revenue'),
      yoy_growth_Cells: getCellFinData('yoy_growth'),
      gross_profit_Cells: getCellFinData('gross_profit'),
      gross_profit_percentage_Cells: getCellFinData('gross_profit_percentage'),
      ebitda_Cells: getCellFinData('ebitda'),
      ebitda_percentage_Cells: getCellFinData('ebitda_percentage'),
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <p className="profile-header center-text border no-margin-bottom margin-top"><strong>Financials</strong></p>
            <p className="center-text no-margin-bottom no-top">Review Level: {basicDetails.financial_review_level}</p>
            <table className="table table-bordered the-table">
              <tbody>
                <tr>
                  <th></th>
                  {tableCells.labels}
                </tr>
                <tr>
                  <th className="financial-table-header financial-right-border">Revenue</th>
                  {tableCells.revenue_Cells}
                </tr>
                <tr>
                  <th className="financial-table-header financial-right-border">EBITDA</th>
                  {tableCells.ebitda_Cells}
                </tr>
                <tr>
                  <th className="financial-table-header financial-right-border">EBITDA %</th>
                  {tableCells.ebitda_percentage_Cells}
                </tr>
                <tr>
                  <th className="financial-table-header financial-right-border">Gross Profit</th>
                  {tableCells.gross_profit_Cells}
                </tr>
                <tr>
                  <th className="financial-table-header financial-right-border">Gross Profit %</th>
                  {tableCells.gross_profit_percentage_Cells}
                </tr>
                <tr>
                  <th className="financial-table-header financial-right-border">YoY Growth</th>
                  {tableCells.yoy_growth_Cells}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default DealFinancialSummary;
