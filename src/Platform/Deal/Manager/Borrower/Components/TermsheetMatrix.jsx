import React, { Component } from 'react';
import {fakeData} from '../FakeData'
import {Well} from 'react-bootstrap'

class TermsheetMatrix extends Component {
  render() {
    let LenderRow = [];
    let ClosingLeverageRow = [];
    let TermLoanRow = [];
    let RevolverRow = [];
    let DDTLRow = [];
    let AcquistionFacilityRow = [];
    let LenderHoldSizeRow = [];
    let TermRow = [];
    let AmortizationRow = [];
    let MinimumSponsorEquityContributionRow = [];
    let InterestRateRow = [];
    let LiborFloorRow = [];
    let RevolverUndrawnFeeRow = [];
    let DDTLUndrawnFeeRow = [];
    let CallProtectionRow = [];
    let DefaultRateRow = [];
    let UpfrontFeeRow = [];
    let ExcessCashFlowSweepRow = [];
    let SponsorManagementFeesRow = [];
    fakeData.term_sheet_matrix.map((matrixRow, i) => {
      LenderRow.push((<td className="custom-table-cell">{matrixRow.company_name}</td>));
      ClosingLeverageRow.push((<td className="custom-table-cell">{matrixRow.closing_leverage}</td>));
      TermLoanRow.push((<td className="custom-table-cell">{matrixRow.term_loan}</td>));
      RevolverRow.push((<td className="custom-table-cell">{matrixRow.revolver}</td>));
      DDTLRow.push((<td className="custom-table-cell">{matrixRow.ddtl}</td>));
      AcquistionFacilityRow.push((<td className="custom-table-cell">{matrixRow.acquistion_facility}</td>));
      LenderHoldSizeRow.push((<td className="custom-table-cell">{matrixRow.lender_hold_size}</td>));
      TermRow.push((<td className="custom-table-cell">{matrixRow.term}</td>));
      AmortizationRow.push((<td className="custom-table-cell">{matrixRow.amortization_per_year}</td>));
      MinimumSponsorEquityContributionRow.push((<td className="custom-table-cell">{matrixRow.minimum_sponsor_equity_contribution}</td>));
      InterestRateRow.push((<td className="custom-table-cell">{matrixRow.interest_rate}</td>));
      LiborFloorRow.push((<td className="custom-table-cell">{matrixRow.libor_floor}</td>));
      RevolverUndrawnFeeRow.push((<td className="custom-table-cell">{matrixRow.revolver_undrawn_fee}</td>));
      DDTLUndrawnFeeRow.push((<td className="custom-table-cell">{matrixRow.ddtl_undrawn_fee}</td>));
      CallProtectionRow.push((<td className="custom-table-cell">{matrixRow.call_protection}</td>));
      DefaultRateRow.push((<td className="custom-table-cell">{matrixRow.default_rate}</td>));
      UpfrontFeeRow.push((<td className="custom-table-cell">{matrixRow.upfront_fee}</td>));
      ExcessCashFlowSweepRow.push((<td className="custom-table-cell">{matrixRow.excess_cash_flow_sweep}</td>));
      SponsorManagementFeesRow.push((<td className="custom-table-cell">{matrixRow.sponsor_management_fees_per_year}</td>));
      return '';
    })
    return (
      <Well className="notification-well">
        <p className="profile-text text-muted header-font text-center"><strong>Coming Soon</strong></p>
      </Well>
    )
    // return (
    //   <div className="container-fluid">
    //     <div className="profile-section">
    //       <div className="row">
    //         <div className='col-md-12'>
    //           <p className="profile-text text-muted profile-section-header"><strong>Terms Comparison:</strong> This is an example of a future feature</p>
    //           <div className="row">
    //             <div className="col-md-12">
    //               <table className="table table-bordered the-table">
    //                 <tbody>
    //                   <tr><th>Lender</th>{LenderRow}</tr>
    //                   <tr><th>Closing Leverage</th>{ClosingLeverageRow}</tr>
    //                   <tr><th>Term Loan</th>{TermLoanRow}</tr>
    //                   <tr><th>Revolver</th>{RevolverRow}</tr>
    //                   <tr><th>Delay Draw Term Loan (DDTL)</th>{DDTLRow}</tr>
    //                   <tr><th>Acquistion Facility</th>{AcquistionFacilityRow}</tr>
    //                   <tr><th>Lender Hold Size</th>{LenderHoldSizeRow}</tr>
    //                   <tr><th>Term</th>{TermRow}</tr>
    //                   <tr><th>Amortization (Per Year)</th>{AmortizationRow}</tr>
    //                   <tr><th>Minimum Sponsor Equity Contribution</th>{MinimumSponsorEquityContributionRow}</tr>
    //                   <tr><th>Interest Rate</th>{InterestRateRow}</tr>
    //                   <tr><th>Libor Floor</th>{LiborFloorRow}</tr>
    //                   <tr><th>Revolver Undrawn Fee</th>{RevolverUndrawnFeeRow}</tr>
    //                   <tr><th>DDTL Undrawn Fee</th>{DDTLUndrawnFeeRow}</tr>
    //                   <tr><th>Call Protection </th>{CallProtectionRow}</tr>
    //                   <tr><th>Default Rate </th>{DefaultRateRow}</tr>
    //                   <tr><th>Upfront Fee</th>{UpfrontFeeRow}</tr>
    //                   <tr><th>Excess Cash Flow Sweep</th>{ExcessCashFlowSweepRow}</tr>
    //                   <tr><th>Sponsor Management Fees (Per Year)</th>{SponsorManagementFeesRow}</tr>
    //                 </tbody>
    //               </table>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

export default TermsheetMatrix;
