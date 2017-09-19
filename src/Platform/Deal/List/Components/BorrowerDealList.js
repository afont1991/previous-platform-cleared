import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import moment from 'moment';
import { Jumbotron, Button } from 'react-bootstrap';

class BorrowerDealList extends Component {
  render() {
    if(this.props.deals.length === 0) {
    return (
      <Jumbotron>
        <h1 className="text-skinny">Create A Deal!</h1>
        <p className="text-muted">This is a simple process that we will help walk you through to help get you started in no time. Just click the button below to get started.</p>
        <p><Button className="green-btn no-text-decoration"><Link to='platform/deal/create'>Create a deal</Link></Button></p>
      </Jumbotron>
      )
    } else {
      const myDeals = this.props.deals.map((deal, i) => {
        const manageButton = (
          <button
            className="small-standard-btn btn-default purple-background white-color no-text-transform"
            onClick={() => {browserHistory.push(`/platform/deal/manager/${deal.DealId}`);}}
            type="submit">
            Manage
          </button>);
        const viewButton = (
          <button
            className="small-standard-btn btn-default purple-background white-color no-text-transform"
            onClick={() => {browserHistory.push(`/platform/deal/${deal.DealId}`);}}
            type="submit">
            View
          </button>
          );
        return (
          <tr className="click-able-table-row" key={i}>
            <td className="text-center"><p className="text-muted">{deal.title}</p></td>
            <td className="text-center"><p className="text-muted">{deal.status}</p></td>
            <td className="text-center"><p className="text-muted">{deal.matches}</p></td>
            <td className="text-center"><p className="text-muted">{moment(deal.created).format("MMM Do")}</p></td>
            <td className="text-center"><p className="text-muted">{moment(deal.updated).format("MMM Do")}</p></td>
            <td className="text-center">{manageButton}</td>
            <td className="text-center">{viewButton}</td>
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
                    <th className="text-center">Matches</th>
                    <th className="text-center">Created</th>
                    <th className="text-center">Updated</th>
                    <th className="text-center">Manage Deal</th>
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
  }
};

export default BorrowerDealList;
