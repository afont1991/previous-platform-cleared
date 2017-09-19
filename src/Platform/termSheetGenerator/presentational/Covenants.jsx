import React, { Component } from 'react';
import { form, FormGroup, ControlLabel, FormControl, Radio, Checkbox } from 'react-bootstrap';
import { fromJS } from 'immutable';

class Covenants extends Component {
  constructor(props) {
    super(props);
    this.state = props.formData;
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    if(e.target.id === 'leverage_ratio_types'){
      const valueIndex = this.state[e.target.id].indexOf(e.target.value);
      if(valueIndex !== -1){
        this.setState(fromJS(this.state).set(e.target.id, fromJS(this.state).get(e.target.id).splice(valueIndex, 1)).toJS());
      } else {
        this.setState(fromJS(this.state).set(e.target.id, fromJS(this.state).get(e.target.id).push(e.target.value)).toJS());
      }
    } else {
      this.setState(fromJS(this.state).set(e.target.id, e.target.value).toJS());
    }
  }
  render() {
    let minimum_fixed_charge_ratio_section = (
      <FormGroup>
        <ControlLabel>What is the minimum fixed charge coverage ratio? (Fill in the blank: ___:1.00)</ControlLabel>
        <FormControl
          id="minimum_fixed_charge_ratio_amount"
          type="number"
          value={this.state.minimum_fixed_charge_ratio_amount}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
    let minimum_interest_coverage_ratio_section = (
      <FormGroup>
        <ControlLabel>What is the minimum interest coverage ratio? (Fill in the blank: ___:1.00)</ControlLabel>
        <FormControl
          id="minimum_interest_coverage_ratio_amount"
          type="number"
          value={this.state.minimum_interest_coverage_ratio_amount}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
    let maximum_leverage_ratio_section = (
    <div>
      <FormGroup>
        <ControlLabel>Choose all that apply</ControlLabel>
        <br />
        <Checkbox
          inline
          onChange={this.handleChange}
          value='senior'
          id='leverage_ratio_types'
          checked={this.state.leverage_ratio_types.includes('senior')}
        >
          senior
        </Checkbox>
        {' '}
        <Checkbox
          inline
          onChange={this.handleChange}
          value='secured'
          id='leverage_ratio_types'
          checked={this.state.leverage_ratio_types.includes('secured')}
        >
          secured
        </Checkbox>
        {' '}
        <Checkbox
          inline
          onChange={this.handleChange}
          value='first lien'
          id='leverage_ratio_types'
          checked={this.state.leverage_ratio_types.includes('first lien')}
        >
          first lien
        </Checkbox>
        {' '}
        <Checkbox
          inline
          onChange={this.handleChange}
          value='total'
          id='leverage_ratio_types'
          checked={this.state.leverage_ratio_types.includes('total')}
        >
          total
        </Checkbox>
        {' '}
        <Checkbox
          inline
          onChange={this.handleChange}
          value='net'
          id='leverage_ratio_types'
          checked={this.state.leverage_ratio_types.includes('net')}
        >
          net
        </Checkbox>
      </FormGroup>
      <FormGroup>
        <ControlLabel>What is the initial maximum permitted leverage? (Fill in the blank: ___:1.00)</ControlLabel>
        <FormControl
          id="maximum_initial_leverage_ratio"
          type="number"
          value={this.state.maximum_initial_leverage_ratio}
          onChange={this.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Will future stepdowns in leverage be required?</ControlLabel>
        <br />
        <Radio
          inline
          onChange={this.handleChange}
          value='yes'
          id='future_leverage_step_down'
          checked={this.state.future_leverage_step_down === 'yes'}
        >
          Yes
        </Radio>
        {' '}
        <Radio
          inline
          onChange={this.handleChange}
          value='no'
          id='future_leverage_step_down'
          checked={this.state.future_leverage_step_down === 'no'}
        >
          No
        </Radio>
      </FormGroup>
    </div>
    )
    let FinancialCovenants = (
      <div>
        <FormGroup>
          <ControlLabel>Will there be a maximum leverage ratio?</ControlLabel>
          <br />
          <Radio
            inline
            onChange={this.handleChange}
            value='yes'
            id='maximum_leverage_ratio'
            checked={this.state.maximum_leverage_ratio === 'yes'}
          >
            Yes
          </Radio>
          {' '}
          <Radio
            inline
            onChange={this.handleChange}
            value='no'
            id='maximum_leverage_ratio'
            checked={this.state.maximum_leverage_ratio === 'no'}
          >
            No
          </Radio>
        </FormGroup>
        { this.state.maximum_leverage_ratio === 'yes' ? maximum_leverage_ratio_section : null }
        <FormGroup>
          <ControlLabel>Will there be a minimum interest coverage ratio?</ControlLabel>
          <br />
          <Radio
            inline
            onChange={this.handleChange}
            value='yes'
            id='minimum_interest_coverage_ratio'
            checked={this.state.minimum_interest_coverage_ratio === 'yes'}
          >
            Yes
          </Radio>
          {' '}
          <Radio
            inline
            onChange={this.handleChange}
            value='no'
            id='minimum_interest_coverage_ratio'
            checked={this.state.minimum_interest_coverage_ratio === 'no'}
          >
            No
          </Radio>
        </FormGroup>
        { this.state.minimum_interest_coverage_ratio === 'yes' ? minimum_interest_coverage_ratio_section : null }
        <FormGroup>
          <ControlLabel>Will there be a minimum fixed charge coverage ratio?</ControlLabel>
          <br />
          <Radio
            inline
            onChange={this.handleChange}
            value='yes'
            id='minimum_fixed_charge_ratio'
            checked={this.state.minimum_fixed_charge_ratio === 'yes'}
          >
            Yes
          </Radio>
          {' '}
          <Radio
            inline
            onChange={this.handleChange}
            value='no'
            id='minimum_fixed_charge_ratio'
            checked={this.state.minimum_fixed_charge_ratio === 'no'}
          >
            No
          </Radio>
        </FormGroup>
        { this.state.minimum_fixed_charge_ratio === 'yes' ? minimum_fixed_charge_ratio_section : null }
      </div>
    )
    // { this.state.excess_cash_flow_sweep === 'yes' ? ExcessCashFlowSweepSection : null }
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h2>Covenants</h2>
            <form>
              <FormGroup>
                <ControlLabel>Must the borrower deliver consolidating financials (in addition to consolidated financials)?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='borrower_deliver_consolidating_financials'
                  checked={this.state.borrower_deliver_consolidating_financials === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='borrower_deliver_consolidating_financials'
                  checked={this.state.borrower_deliver_consolidating_financials === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Must the borrower deliver monthly financial statements (in addition to quarterly and annual statements)?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='borrower_monthly_financials'
                  checked={this.state.borrower_monthly_financials === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='borrower_monthly_financials'
                  checked={this.state.borrower_monthly_financials === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Will there be a restriction on the credit parties' ability to amend material agreements?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='credit_parties_limited_amendments'
                  checked={this.state.credit_parties_limited_amendments === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='credit_parties_limited_amendments'
                  checked={this.state.credit_parties_limited_amendments === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Will the borrower be required to hedge interest rate risk?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='borrower_hedge_interest_rate_risk'
                  checked={this.state.borrower_hedge_interest_rate_risk === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='borrower_hedge_interest_rate_risk'
                  checked={this.state.borrower_hedge_interest_rate_risk === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Will there be a limit on capital expenditures?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='capital_expenditures_limit'
                  checked={this.state.capital_expenditures_limit === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='capital_expenditures_limit'
                  checked={this.state.capital_expenditures_limit === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Will there be any financial covenants?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='financial_covenants'
                  checked={this.state.financial_covenants === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='financial_covenants'
                  checked={this.state.financial_covenants === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              { this.state.financial_covenants === 'yes' ? FinancialCovenants : null }
            </form>
          </div>
        </div>
        <button className="btn btn-primary" onClick={()=> this.props.NextClick(this.state)}> Next</button>
      </div>
    );
  }
}

export default Covenants;
