import { connect } from 'react-redux';
import React, { Component } from 'react';

// Actions
// import * as actions from './Actions';

class MarketStats extends Component {
  render() {
    return (
        <div className="market-stats-container">
          <div className="market-stats container-fluid">
            <p className="profile-text text-muted profile-section-header"><strong>Market Stats</strong></p>
            <p className="profile-text profile-main-text text-muted"><span className="black-text">Middle market leverage cash flow</span></p>
            <div className="container-fluid text-left">
              <p className="profile-text profile-main-text text-muted no-margin-bottom line-divider">Deal Component<span className="float-right">June 17</span></p>
              <div className="row no-padding">
                <div className="col-md-12 no-padding text-left">
                  <p className="text-muted no-margin-top no-margin-bottom">Cash flow senior<span className="float-right no-margin-top no-margin-bottom sub-text-dark red-text">&lt;$7.5MM EBITDA 1.75x-3.00x</span></p>
                  {/* ---Next column beneath start here---- <p className="no-margin-top no-margin-bottom sub-text-dark">&lt;$7.5MM EBITDA 1.75x-2.75x</p> */}
                  <p className="text-muted no-margin-top no-margin-bottom">Debt Multiple<span className="float-right no-margin-top no-margin-bottom sub-text-dark">&gt;$10.0MM EBITDA 2.75x-4.00x</span></p>
                  <p className="text-muted no-margin-top no-margin-bottom line-divider">(xEBITDA)<span className="float-right no-margin-top no-margin-bottom sub-text-dark red-text">&gt;$20.0MM EBITDA 3.25x-4.75x</span></p><br />
                  <p className="text-muted no-margin-top no-margin-bottom">Total Debt Limit<span className="float-right no-margin-top no-margin-bottom sub-text-dark red-text">&lt;$7.5MM EBITDA 3.25x-4.50x</span></p>
                  <p className="text-muted no-margin-top no-margin-bottom">Multiple<span className="float-right no-margin-top no-margin-bottom sub-text-dark">&gt;$10.0MM EBITDA 3.50x-5.00x</span></p>
                  <p className="text-muted no-margin-top no-margin-bottom">(xEBITDA)<span className="float-right no-margin-top no-margin-bottom sub-text-dark">&gt;$20.0MM EBITDA 4.50x-6.00x</span></p><br />
                  <p className="text-muted no-margin-top no-margin-bottom">Senior Cash Flow<span className="float-right no-margin-top no-margin-bottom sub-text-dark">Bank: L+3.00%-5.00%</span></p>
                  <p className="text-muted no-margin-top no-margin-bottom">Pricing<span className="float-right no-margin-top no-margin-bottom sub-text-dark">Non-Bank: &gt;$10.0MM EBITDA L+6.50%-8.00%</span></p>
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">Non-Bank: &lt;$15.0MM EBITDA L+4.50%-6.50%</span><br />
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">(potential for 0.50%-1.00% floor)</span><br />

                  <br /><p className="text-muted no-margin-top no-margin-bottom">Second Lien Pricing (Avg)<span className="float-right no-margin-top no-margin-bottom sub-text-dark red-text">&gt;$7.5MM EBITDA L+7.50%-12.00% floating</span></p>
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">(0.50%-1.00% floor)</span><br />
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">&gt;$10.0MM EBITDA L+6.50-8.50% floating</span>
                  <br /><span className="float-right no-margin-top no-margin-bottom sub-text-dark">(0.50%-1.00% floor)</span>
                  <br /><span className="float-right no-margin-top no-margin-bottom sub-text-dark">&gt;$20.0MM EBITDA L+6.00%-7.50% floating</span><br />
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">(0.50%-1.00% floor)</span><br />
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">Fixed rate options range from a low of 7.0% to 11.0%</span><br />

                  <br /><p className="text-muted no-margin-top no-margin-bottom">Subordinated Debt Pricing<span className="float-right no-margin-top no-margin-bottom sub-text-dark">&lt;$7.5MM EBITDA 12.00%-14.00%</span></p>
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">&gt;$10.0MM EBITDA 10.00%-13.00%</span><br />
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">&gt;$20.0MM EBITDA 10.00%-12.00%</span>
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">Warrants limited to distressed and special situations</span>
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">Second lien may buy down rate to ~9.00%</span><br />
                  {/* Empty span in order to format table */}<br /><span className="float-right no-margin-top no-margin-bottom sub-text-dark"></span><br />

                  <br /><p className="text-muted no-margin-top no-margin-bottom">Unitranche Pricing<span className="float-right no-margin-top no-margin-bottom sub-text-dark red-text">&lt;$7.5MM EBITDA L+7.50%-12.00% floating</span></p>
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">(0.50%-1.00% floor)</span><br />
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">&gt;$10.0MM EBITDA L+6.50%-8.50%</span><br />
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">(0.50%-1.00% floor)</span><br />
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">&gt;$20.00MM EBITDA L+6.00%-7.50%</span><br />
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">(0.50%-1.00% floor)</span><br />
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">Fixed rate options range from a low of 7.0% to 11.0%</span><br />
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark">ABL revolver can be arranged outside the Unitranche to arbitrage all-in pricing</span><br />
                  <span className="float-right no-margin-top no-margin-bottom sub-text-dark"></span><br />
                </div>
              </div>
              <br /><p className='text-muted'>Source: SPP Capital Partners</p>
            </div>
          </div>
        </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.MarketStats
  }
}

const MarketStatsContainer = connect(
  mapStateToProps
)(MarketStats)

export default MarketStatsContainer
