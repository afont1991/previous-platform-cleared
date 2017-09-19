import React, { Component } from 'react';
import FormInput from '../../../Components/FormInput'
import { formatNumber } from '../../../../Helpers/valueFormatHelper';

class TransactionOverview extends Component {

  render() {
    const formData = this.props.formData
    const DebtTypeAmounts = formData.debt_type_amount_form.debtTypeAmountArray.map((typeAmount, i) => {
      if(!typeAmount.deleted){
        return (
          <div className="row" key={i}>
            <div className='col-md-8 section-margin-top'>
              <p className="platform-text-large text-muted animated fadeInUp"><strong>{typeAmount.debt_type.label}:</strong> {formatNumber(typeAmount.amount)}</p>
            </div>
            <div className="col-md-4">
              <a className="platform-button red-background" onClick={() => this.props.removeTypeAmount(typeAmount.id)}>Remove</a>
            </div>
          </div>
        )
      } else {
        return ''
      }
    })
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.transaction_scenario}
              path={['formData', 'transaction_scenario']}
              onSelect={this.props.onSelect}
            />
          </div>
        </div>
        <div className="row">
          <div className='col-md-6'>
            <FormInput
              Input={formData.debt_type_amount_form.debt_type}
              path={['formData', 'debt_type_amount_form', 'debt_type']}
              onSelect={this.props.onSelect}
            />
          </div>
          <div className='col-md-4'>
            <FormInput
              Input={formData.debt_type_amount_form.amount}
              path={['formData', 'debt_type_amount_form', 'amount']}
              onChange={this.props.onChange}
            />
          </div>
          <div className='col-md-2'>
            <a className="platform-button green-background" onClick={() => this.props.addTypeAmount(formData.debt_type_amount_form)}>Add</a>
          </div>
        </div>
        {DebtTypeAmounts}
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.additional_information}
              path={['formData', 'additional_information']}
              onChange={this.props.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionOverview;
