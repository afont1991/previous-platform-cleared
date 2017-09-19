import React, { Component } from 'react';
import FormInput from '../../../Components/FormInput';
import moment from 'moment';

class LenderTransactions extends Component {
  render() {
    const formData = this.props.formData.lender_transactions;
    const newTransaction = formData
    let savedTransactions = [];

    function findNestedValue(nestObj, path){
      let value = path.split(".").reduce(function(value, nextKey) {
      	return (typeof value === "undefined" || value === null) ? value : value[nextKey];
      }, nestObj);
      return (typeof value === "undefined" || value === null) ? '' : value;
    }

    if(formData.transactionArray.length !== 0){
      savedTransactions = formData.transactionArray.map((transaction, index)=>{
        return (
          <tr className="animated fadeInUp" key={index}>
            <td>{(findNestedValue(transaction, "date.value") !== '' ? moment(transaction.date.value).format('MM-DD-YYYY') : '')}</td>
            <td>{findNestedValue(transaction, "company.value")}</td>
            <td>{findNestedValue(transaction, "Industries.selectedOption.label")}</td>
            <td>{findNestedValue(transaction, "transaction.TypesOfCapital.selectedOption.label")}</td>
            <td>{findNestedValue(transaction, "Scenarios.selectedOption.label")}</td>
            <td>{findNestedValue(transaction, "transaction_size.selectedOption.label")}</td>
            <td>
              <span className="background-red glyphicon glyphicon-remove-circle" aria-hidden="true"
                onClick={() => {
                  this.props.removeItem(formData, 'transactionArray', transaction.id, ['formData', 'lender_transactions'])
                }}>
              </span>
            </td>
          </tr>
        );
      });
    }
    return (
      <div className='container-fluid margin-top-20'>
        <div className="row">
          <div className="col-md-4">
            <FormInput
              Input={formData.date}
              path={['formData', 'lender_transactions', 'date']}
              handleDate={this.props.handleDate}
            />
          </div>
          <div className="col-md-4">
            <FormInput
              Input={formData.transaction_size}
              path={['formData', 'lender_transactions', 'transaction_size']}
              onSelect={this.props.onSelect}
            />
          </div>
          <div className="col-md-4">
            <FormInput
              Input={formData.company}
              path={['formData', 'lender_transactions', 'company']}
              onChange={this.props.onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormInput
              Input={formData.Industries}
              path={['formData', 'lender_transactions', 'Industries']}
              onSelect={this.props.onSelect}
            />
          </div>
          <div className="col-md-4">
            <FormInput
              Input={formData.TypesOfCapital}
              path={['formData', 'lender_transactions', 'TypesOfCapital']}
              onSelect={this.props.onSelect}
            />
          </div>
          <div className="col-md-4">
            <FormInput
              Input={formData.Scenarios}
              path={['formData', 'lender_transactions', 'Scenarios']}
              onSelect={this.props.onSelect}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-md-offset-11 margin-bottom-20">
            <a className="platform-button" onClick={() => this.props.addItem(formData, 'lender_transactions', newTransaction, 'transactionArray')}>Add</a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-bordered the-table">
                <thead className="platform-table-head">
                  <tr>
                    <th>Date</th>
                    <th>Company</th>
                    <th>Industry</th>
                    <th>Type</th>
                    <th>Scenario</th>
                    <th>Size</th>
                    <th>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {savedTransactions}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LenderTransactions;
