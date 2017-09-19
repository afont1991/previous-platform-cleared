import React, { Component } from 'react';
import { form, FormGroup, ControlLabel, FormControl, Radio } from 'react-bootstrap';
import { fromJS } from 'immutable';

class Economics extends Component {
  constructor(props) {
    super(props);
    this.state = props.formData;
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState(fromJS(this.state).set(e.target.id, e.target.value).toJS());
  }
  render() {
    let liborFloorSection = (
      <FormGroup>
        <ControlLabel>What is the LIBOR floor?</ControlLabel>
        <FormControl
          id="libor_floor"
          type="number"
          value={this.state.libor_floor}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
    let oidOrUpfrontSection = (
      <FormGroup>
        <ControlLabel>Netting the OID or Up-Front Fee, what percentage of face will be funded at closing (e.g. 98%)?</ControlLabel>
        <FormControl
          id="oid_or_upfront_fee_percentage_of_face_funded_at_closing"
          type="number"
          value={this.state.oid_or_upfront_fee_percentage_of_face_funded_at_closing}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
    let earlyPrepaymentSection = (
      <div>
        <FormGroup>
          <ControlLabel>For how many years total will there be limitations on prepayments (including non-call periods)?</ControlLabel>
          <FormControl
            id="yrs_prepayment_limited"
            type="number"
            value={this.state.yrs_prepayment_limited}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Will there be a period during which the loan is "non-callable"?</ControlLabel>
          <br />
          <Radio
            inline
            onChange={this.handleChange}
            value='yes'
            id='non_callable_loan_period'
            checked={this.state.non_callable_loan_period === 'yes'}
          >
            Yes
          </Radio>
          {' '}
          <Radio
            inline
            onChange={this.handleChange}
            value='no'
            id='non_callable_loan_period'
            checked={this.state.non_callable_loan_period === 'no'}
          >
            No
          </Radio>
        </FormGroup>
        <FormGroup>
          <ControlLabel>For how many years?</ControlLabel>
          <FormControl
            id="yrs_non_callable"
            type="number"
            value={this.state.yrs_non_callable}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>What is the prepayment premium in the first year the loans are pre-payable, either because there is no "non-call" period or the "non-call" period has expired? (For any year in which there's no penalty, leave 100%.)</ControlLabel>
          <FormControl
            id="prepayment_first_year_premium"
            type="number"
            value={this.state.prepayment_first_year_premium}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Will there be a penalty for all voluntary prepayments or only voluntary prepayments made with the proceeds of lower cost debt?</ControlLabel>
          <br />
          <Radio
            inline
            onChange={this.handleChange}
            value='all voluntary prepayments'
            id='prepayment_penalty_type'
            checked={this.state.prepayment_penalty_type === 'all voluntary prepayments'}
          >
            all voluntary prepayments
          </Radio>
          {' '}
          <Radio
            inline
            onChange={this.handleChange}
            value='only voluntary prepayments with lower cost debt'
            id='prepayment_penalty_type'
            checked={this.state.prepayment_penalty_type === 'only voluntary prepayments with lower cost debt'}
          >
            only voluntary prepayments with lower cost debt
          </Radio>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Will there be a penalty for mandatory prepayments as well (other than ECF, insurance and condemnation sweeps, which are typically excluded from prepayment penalties)?</ControlLabel>
          <br />
          <Radio
            inline
            onChange={this.handleChange}
            value='yes'
            id='penalty_for_mandatory_prepayment'
            checked={this.state.penalty_for_mandatory_prepayment === 'yes'}
          >
            Yes
          </Radio>
          {' '}
          <Radio
            inline
            onChange={this.handleChange}
            value='no'
            id='penalty_for_mandatory_prepayment'
            checked={this.state.penalty_for_mandatory_prepayment === 'no'}
          >
            No
          </Radio>
        </FormGroup>
      </div>
    )
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h2>Economics</h2>
            <form>
              <FormGroup>
                <ControlLabel>What is the principal amount of the loan?</ControlLabel>
                <FormControl
                  id="prinipal_loan_amount"
                  type="number"
                  value={this.state.prinipal_loan_amount}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>How many years until the maturity date?</ControlLabel>
                <FormControl
                  id="yrs_to_maturity"
                  type="number"
                  value={this.state.yrs_to_maturity}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>What is the opening interest rate spread over LIBOR?</ControlLabel>
                <FormControl
                  id="opening_libor_based_interest_rate"
                  type="number"
                  value={this.state.opening_libor_based_interest_rate}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Will there be a LIBOR floor higher than zero?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='libor_floor_higher_than_zero'
                  checked={this.state.libor_floor_higher_than_zero === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='libor_floor_higher_than_zero'
                  checked={this.state.libor_floor_higher_than_zero === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              { this.state.libor_floor_higher_than_zero === 'yes' ? liborFloorSection : null }
              <FormGroup>
                <ControlLabel>Will there be interest rate step-downs?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='interest_rate_step_down'
                  checked={this.state.interest_rate_step_down === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='interest_rate_step_down'
                  checked={this.state.interest_rate_step_down === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>What is the default rate of interest (above the normal rate)?</ControlLabel>
                <FormControl
                  id="default_interest_rate"
                  type="number"
                  value={this.state.default_interest_rate}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Will the loan have OID and/or an up-front fee?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='oid_or_upfront_fee'
                  checked={this.state.oid_or_upfront_fee === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='oid_or_upfront_fee'
                  checked={this.state.oid_or_upfront_fee === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              { this.state.oid_or_upfront_fee === 'yes' ? oidOrUpfrontSection : null }
              <FormGroup>
                <ControlLabel>At what rate will the loan amortize annually?</ControlLabel>
                <FormControl
                  id="annual_amortize_rate"
                  type="number"
                  value={this.state.annual_amortize_rate}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Will there be any penalty for early prepayments?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='prepayment_penalty'
                  checked={this.state.prepayment_penalty === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='prepayment_penalty'
                  checked={this.state.prepayment_penalty === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              { this.state.prepayment_penalty === 'yes' ? earlyPrepaymentSection : null }
            </form>
          </div>
        </div>
        <button className="btn btn-primary" onClick={()=> this.props.NextClick(this.state)}> Next</button>
      </div>
    );
  }
}

export default Economics;
