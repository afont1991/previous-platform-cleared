import React, { Component } from 'react';
import FormInput from '../../../Components/FormInput'
// import { formatNumber } from '../../../../Helpers/valueFormatHelper';


class Financials extends Component {
  render() {
    const formData = this.props.formData
    function financialInputSection(context ,name, displayName){
      return (
        <div className="financial-input-container">
          <div className="financial-input-box financial-title">
            <strong>{displayName}</strong>
          </div>
          <div className="financial-input-box">
            <FormInput
              Input={formData.financial_information_form[`${name}_ltm`]}
              path={['formData', 'financial_information_form', `${name}_ltm`]}
              onChange={context.props.onChange}
            />
          </div>
          <div className="financial-input-box">
            <FormInput
              Input={formData.financial_information_form[`${name}_year_3`]}
              path={['formData', 'financial_information_form', `${name}_year_3`]}
              onChange={context.props.onChange}
            />
          </div>
          <div className="financial-input-box">
            <FormInput
              Input={formData.financial_information_form[`${name}_year_2`]}
              path={['formData', 'financial_information_form', `${name}_year_2`]}
              onChange={context.props.onChange}
            />
          </div>
          <div className="financial-input-box">
            <FormInput
              Input={formData.financial_information_form[`${name}_year_1`]}
              path={['formData', 'financial_information_form', `${name}_year_1`]}
              onChange={context.props.onChange}
            />
          </div>
        </div>
      );
    }
    return (
      <div className='contianer-fluid'>
        <div className="row">
          <div className="col-md-12">
            <div className="financial-input-container">
              <div className="financial-input-box financial-title">
              </div>
              <div className="financial-input-box financial-title">
                <strong>LTM</strong>
              </div>
              <div className="financial-input-box financial-title">
                <strong>DEC {formData.financial_information_form.year_3.value} <br /> Projected </strong>
              </div>
              <div className="financial-input-box financial-title">
                <strong>DEC {formData.financial_information_form.year_2.value}</strong>
              </div>
              <div className="financial-input-box financial-title">
                <strong>DEC {formData.financial_information_form.year_1.value}</strong>
              </div>
            </div>
            {financialInputSection(this, "revenue", "Revenue")}
            {financialInputSection(this, "ebitda", "EBITDA")}
            {financialInputSection(this, "ebitda_percentage", "EBITDA %")}
            {financialInputSection(this, "gross_profit", "Gross Profit")}
            {financialInputSection(this, "gross_profit_percentage", "Gross Profit %")}
            {financialInputSection(this, "yoy_growth", "YoY Growth")}
          </div>
        </div>
      </div>
    );
  }
}

export default Financials;
