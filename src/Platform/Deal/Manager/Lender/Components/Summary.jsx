import React, { Component } from 'react';
import { browserHistory } from 'react-router'

class Summary extends Component {
  render() {
    const Deal = this.props.MatchData.Deal
    return (
      <div className="container-fluid">
        <div className="row section-margin-top">
          <div className="col-md-6">
            <p className="profile-text text-muted profile-section-header">
              <strong className="border-bottom">Deal details</strong>
              <a className="btn btn-primary btn-sm purple-background no-float float-right margin-btn" onClick={() => {browserHistory.push(`/platform/deal/${Deal.id}`);}} >
                View Deal Profile
              </a>
            </p>
            <p className="profile-text text-muted no-margin-bottom"><strong>{Deal.title}</strong></p>
            <p className="profile-text text-muted line-divider">{Deal.headline}</p>
            <p className="profile-text text-muted">{Deal.description}</p>
          </div>
          <div className="col-md-6">
            <p className="profile-text text-muted profile-section-header">
              <strong className="border-bottom">Sponsor details</strong>
              <a className="btn btn-primary btn-sm no-float purple-background float-right margin-btn" onClick={() => {browserHistory.push(`/platform/company/${Deal.ParentCompanyId}`);}} >
                View Sponsor Profile
              </a>
            </p>
            <p className="profile-text text-muted no-margin-bottom take-up-space">hidden</p>
            <p className="profile-text text-muted line-divider"><strong>{Deal.ParentCompany.name}</strong></p>
            <p className="profile-text text-muted">{Deal.ParentCompany.description}</p>
          </div>
        </div>
        <div className="row section-margin-top">
          <div className="col-md-4">
            <p className="profile-header center-text border no-margin-bottom margin-top"><strong>Financials</strong></p>
            <table className="table table-bordered the-table">
              <tbody>
                <tr>
                  <th>FY</th>

                </tr>
                <tr>
                  <th>Revenue</th>

                </tr>
                <tr>
                  <th>YoY Growth</th>

                </tr>
                <tr>
                  <th>Gross Profit</th>

                </tr>
                <tr>
                  <th>Gross Profit %</th>

                </tr>
                <tr>
                  <th>EBITDA</th>

                </tr>
                <tr>
                  <th>EBITDA %</th>

                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <div className="col-md-4">
              <p className="profile-header center-text border no-margin-bottom margin-top"><strong>Transaction Overview</strong></p>
              <div className="row bordered">
                <div className="col-md-12">
                  <p className="profile-text sub-header"><strong>Seeking:</strong></p>
                  <ul className="criteria-list">
                    <li>Lots of stuff</li>
                  </ul>
                  <p className="profile-text sub-header"><strong>Process:</strong></p>
                  <ul className="criteria-list">
                    <li><strong>Status</strong> </li>
                    <li><strong>Date created</strong> </li>
                    <li><strong>Last updated</strong> </li>
                    <li><strong>Term sheets</strong> </li>
                  </ul>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="profile-text sub-header"><strong>Addtional Information:</strong></p>
                    <p className="profile-text sub-header"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <p className="profile-header center-text border no-margin-bottom margin-top"><strong>Company Overview</strong></p>
            <div className="row bordered">
              <ul className="criteria-list no-padding">
                <li className='no-bullet center-text'><strong>Founded:</strong> 2017</li>
                <li className='no-bullet center-text'><strong>Location:</strong> New York, NY</li>
                <li className='no-bullet center-text'><strong>Industry:</strong> Cats</li>
                <li className='no-bullet center-text'><strong>Scenario:</strong> Buyout</li>
                <li className='no-bullet center-text'><strong>Description:</strong> Need money for more cats</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Summary;
