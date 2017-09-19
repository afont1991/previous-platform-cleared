import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';

class LenderDealList extends Component {
  render() {
    const myDeals = this.props.deals.map((deal, i) => {
      let matchInfo = {
        DealId: Number(deal.dealId),
        CompanyId: Number(deal.companyId),
        newStatuses: [
          {name: 'borrower_status', value: 'accepted'},
          {name: 'lender_status', value: 'accepted'},
        ]
      }
      let rowStatus = 'pending';
      let statusCell = (<td className="text-center"><p className="text-muted no-margin-bottom">{deal.lender_status}</p></td>)
      const waitIcon = (<i className="fa fa-2x fa-ban sr-icons match-list-icon"></i>);
      const sentIcon = (
        <svg
          className="checkmark-small"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52">
          <circle
            className="checkmark__circle"
            cx="26" cy="26" r="25" fill="none"
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      );
      if(deal.borrower_status === 'rejected' || deal.lender_status === 'rejected'){
        rowStatus = 'rejected'
        statusCell = (
          <td className="text-center"><p className="text-muted no-margin-bottom">{waitIcon}</p></td>
        )
      } else if(deal.borrower_status === 'accepted' || deal.lender_status === 'accepted'){
        rowStatus = 'matched'
        statusCell = (
          <td className="text-center"><p className="text-muted no-margin-bottom">{sentIcon}</p></td>
        )
      }
      const acceptButton = (
        <button
          className="btn btn-default green-background white-color no-text-transform"
          onClick={() => {this.props.submitMatchUpdate(matchInfo)}}>
          Accept
        </button>);
      const declineMatchInfo = {
        DealId: Number(deal.dealId),
        CompanyId: Number(deal.companyId),
        newStatuses: [
          {name: 'borrower_status', value: 'rejected'},
          {name: 'lender_status', value: 'rejected'},
        ]
      }
      const declineButton = (
        <button
          className="btn btn-default red-background white-color no-text-transform"
          onClick={() => {this.props.submitMatchUpdate(declineMatchInfo)}}>
          Decline
        </button>);
      let manageButton = (<p className="text-muted">Pending</p>)
      let viewButton = (
        <button
          className="small-standard-btn btn-default purple-background white-color no-text-transform"
          onClick={() => {browserHistory.push(`/platform/deal/${deal.dealId}`);}}
          type="submit">
          View
        </button>
      );
      let rowClass = `click-able-table-row ${rowStatus}`
      if(deal.borrower_status === 'invited' && deal.lender_status === 'pending'){
        statusCell = (
          <td className="text-center"><p className="text-muted no-margin-bottom">{acceptButton} : {declineButton}</p></td>
        )
      }
      if(deal.borrower_status !== 'rejected' && deal.lender_status !== 'rejected'){
        if(deal.borrower_status === 'accepted' || deal.lender_status === 'accepted'){
          manageButton = (
            <button
              className="small-standard-btn btn-default purple-background white-color no-text-transform"
              onClick={() => {browserHistory.push(`/platform/deal/manager/${deal.dealId}`);}}
              type="submit">
              Manage
            </button>);
        }
      }
      return (
        <tr className={rowClass} key={i}>
          <td className="text-center"><p className="text-muted">{deal.title}</p></td>
          {statusCell}
          <td className="text-center"><p className="text-muted">{moment(deal.matchedOn).format("MMM Do")}</p></td>
          <td className="text-center no-margin-bottom">{manageButton}</td>
          <td className="text-center no-margin-bottom">{viewButton}</td>
        </tr>
      );
    });
    return (
      <div className="row margin-top-10">
        <div className="col-md-12">
          <p className="profile-text text-muted profile-section-header"><strong>Active Deals</strong></p>
          <div className="table-responsive">
            <table className="table the-table">
              <thead>
                <tr>
                  <th className="text-center">Title</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Matched On</th>
                  <th className="text-center">Manage Match</th>
                  <th className="text-center">View Deal</th>
                </tr>
              </thead>
              <tbody>
                {myDeals}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
};

export default LenderDealList;
