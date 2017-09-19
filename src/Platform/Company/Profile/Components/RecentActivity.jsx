import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';

class RecentActivity extends Component {
  render() {
    const type = this.props.profileData.basicDetails.platform_type;
    const transactions = this.props.profileData.transactions;
    let tableHeader, transactionRows;
    function findNestedValue(nestObj, path){
      let value = path.split(".").reduce(function(value, nextKey) {
      	return (typeof value === "undefined" || value === null) ? value : value[nextKey];
      }, nestObj);
      return (typeof value === "undefined" || value === null) ? '' : value;
    }
    if(type === 'lender'){
      tableHeader = (
        <tr>
          <th>Date</th>
          <th>Company</th>
          <th>Industry</th>
          <th>Type</th>
          <th>Scenario</th>
          <th>Size</th>
        </tr>
      )
      transactionRows = transactions.map((transaction, i) => {
        return (
          <tr key={i}>
            <td>{transaction.date ? moment(transaction.date).format("MM/YY") : ''}</td>
            <td>{transaction.company}</td>
            <td>{findNestedValue(transaction, 'LookupIndustry.name')}</td>
            <td>{findNestedValue(transaction, 'LookupTypesOfCapital.name')}</td>
            <td>{findNestedValue(transaction, 'LookupScenario.name')}</td>
            <td>{findNestedValue(transaction, 'size')}</td>
          </tr>
        );
      });
    } else if(type === 'borrower'){
      tableHeader = (
        <tr>
          <th>Date</th>
          <th>Company</th>
          <th>Size</th>
          <th>Industry</th>
          <th>Description</th>
          <th>Scenario</th>
        </tr>
      )
      transactionRows = transactions.map((transaction, i) => {
        return (
          <tr key={i}>
            <td>{transaction.date ? moment(transaction.date).format("MM/YY") : ''}</td>
            <td>{transaction.company}</td>
            <td>{findNestedValue(transaction, 'size')}</td>
            <td>{findNestedValue(transaction, 'LookupIndustry.name')}</td>
            <td>{findNestedValue(transaction, 'description')}</td>
            <td>{findNestedValue(transaction, 'LookupScenario.name')}</td>
          </tr>
        );
      });
    }
    return (
      <div className="profile-section">
        <div className="row">
          <div className="col-md-12">
            <p className="profile-text text-muted header-font"><strong>Selected Transactions</strong></p>
             <div className="table-responsive">
              <Table striped condensed hover>
                <thead>
                  {tableHeader}
                </thead>
                <tbody>
                  {transactionRows}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecentActivity;
