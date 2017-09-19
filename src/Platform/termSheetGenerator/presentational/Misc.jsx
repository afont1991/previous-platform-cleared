import React, { Component } from 'react';
import { form, FormGroup, ControlLabel, Radio, Checkbox } from 'react-bootstrap';
import { fromJS } from 'immutable';

class Misc extends Component {
  constructor(props) {
    super(props);
    this.state = props.formData;
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    if(e.target.id === 'parties_with_consent_rights_over_assignments'){
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
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h2>Credit Support and Miscellaneous</h2>
            <form>
              <FormGroup>
                <ControlLabel>Will guarantees be required even from immaterial subsidiaries?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='guarantees_required_from_immaterial_subsidiaries'
                  checked={this.state.guarantees_required_from_immaterial_subsidiaries === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='guarantees_required_from_immaterial_subsidiaries'
                  checked={this.state.guarantees_required_from_immaterial_subsidiaries === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Will deposit account control agreements and securities account control agreements be required?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='account_control_agreements_for_deposit_and_securities'
                  checked={this.state.account_control_agreements_for_deposit_and_securities === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='account_control_agreements_for_deposit_and_securities'
                  checked={this.state.account_control_agreements_for_deposit_and_securities === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Will mortgages be required for real estate now owned or subsequently acquired?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='mortgages_for_owned_or_acquired'
                  checked={this.state.mortgages_for_owned_or_acquired === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='mortgages_for_owned_or_acquired'
                  checked={this.state.mortgages_for_owned_or_acquired === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Will mortgages be required on real estate that the credit parties merely lease?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='mortgages_leased_by_credit_parties'
                  checked={this.state.mortgages_leased_by_credit_parties === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='mortgages_leased_by_credit_parties'
                  checked={this.state.mortgages_leased_by_credit_parties === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Will the borrower have consent rights over assignments to unaffiliated new lenders (absent an Event of Default)?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='borrower_consent_rights_over_assignments_to_unaffiliated_new_lenders'
                  checked={this.state.borrower_consent_rights_over_assignments_to_unaffiliated_new_lenders === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='borrower_consent_rights_over_assignments_to_unaffiliated_new_lenders'
                  checked={this.state.borrower_consent_rights_over_assignments_to_unaffiliated_new_lenders === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Which of the following will have consent rights over assignments?</ControlLabel>
                <br />
                <Checkbox
                  inline
                  onChange={this.handleChange}
                  value='Administrative Agent'
                  id='parties_with_consent_rights_over_assignments'
                  checked={this.state.parties_with_consent_rights_over_assignments.includes('Administrative Agent')}
                >
                  Administrative Agent
                </Checkbox>
                {' '}
                <Checkbox
                  inline
                  onChange={this.handleChange}
                  value='Arranger'
                  id='parties_with_consent_rights_over_assignments'
                  checked={this.state.parties_with_consent_rights_over_assignments.includes('Arranger')}
                >
                  Arranger
                </Checkbox>
                {' '}
                <Checkbox
                  inline
                  onChange={this.handleChange}
                  value='Both'
                  id='parties_with_consent_rights_over_assignments'
                  checked={this.state.parties_with_consent_rights_over_assignments.includes('Both')}
                >
                  Both
                </Checkbox>
              </FormGroup>
            </form>
          </div>
        </div>
        <button className="btn btn-primary" onClick={()=> this.props.SubmitForm(this.state)}> Submit</button>
      </div>
    );
  }
}

export default Misc;
