import React, { Component } from 'react';
import { form, FormGroup, ControlLabel, FormControl, Radio } from 'react-bootstrap';
import { fromJS } from 'immutable';

class UseOfProceeds extends Component {
  constructor(props) {
    super(props);
    this.state = props.formData;
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState(fromJS(this.state).set(e.target.id, e.target.value).toJS());
  }
  render() {
    let minimumEquityRequiredSection = (
      <div>
        <FormGroup>
          <ControlLabel>Is the minimum equity contribution a fixed dollar amount or a percentage of the aggregate acquisition consideration?</ControlLabel>
          <br />
          <Radio
            inline
            onChange={this.handleChange}
            value='Fixed'
            id='minimum_equity_contribution_fixed_or_percentage'
            checked={this.state.minimum_equity_contribution_fixed_or_percentage === 'Fixed'}
          >
            Fixed
          </Radio>
          {' '}
          <Radio
            inline
            onChange={this.handleChange}
            value='Percentage'
            id='minimum_equity_contribution_fixed_or_percentage'
            checked={this.state.minimum_equity_contribution_fixed_or_percentage === 'Percentage'}
          >
            Percentage
          </Radio>
        </FormGroup>
      </div>
    )
    let minimumEquityRequiredAmountSection = (
      <FormGroup>
        <ControlLabel>What is the minimum required amount?</ControlLabel>
        <FormControl
          id="minimum_required_amount"
          type="number"
          value={this.state.minimum_required_amount}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
    let minimumEquityRequiredPercentageSection = (
      <FormGroup>
        <ControlLabel>What percent of the aggregate acquisition consideration?</ControlLabel>
        <FormControl
          id="minimum_required_percentage"
          type="number"
          value={this.state.minimum_required_percentage}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
    let proceedsForAquiFinanceSection = (
      <div>
      <FormGroup>
        <ControlLabel>How is the acquisition structured?</ControlLabel>
        <br />
        <Radio
          inline
          onChange={this.handleChange}
          value='Merger'
          id='structure_of_acquisition'
          checked={this.state.structure_of_acquisition === 'Merger'}
        >
          Merger
        </Radio>
        {' '}
        <Radio
          inline
          onChange={this.handleChange}
          value='Asset Purchase'
          id='structure_of_acquisition'
          checked={this.state.structure_of_acquisition === 'Asset Purchase'}
        >
          Asset Purchase
        </Radio>
        {' '}
        <Radio
          inline
          onChange={this.handleChange}
          value='Stock Purchase'
          id='structure_of_acquisition'
          checked={this.state.structure_of_acquisition === 'Stock Purchase'}
        >
          Stock Purchase
        </Radio>
      </FormGroup>
      <FormGroup>
        <ControlLabel>What is the name of the seller(s) (e.g. "Bob Smith and John Doe")?</ControlLabel>
        <FormControl
          id="seller_name"
          type="text"
          value={this.state.seller_name}
          onChange={this.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>How much is the aggregate purchase consideration?</ControlLabel>
        <FormControl
          id="aggregate_purchase_consideration"
          type="number"
          value={this.state.aggregate_purchase_consideration}
          onChange={this.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Will a minimum equity contribution be required?</ControlLabel>
        <br />
        <Radio
          inline
          onChange={this.handleChange}
          value='yes'
          id='minimum_equity_contribution_required'
          checked={this.state.minimum_equity_contribution_required === 'yes'}
        >
          Yes
        </Radio>
        {' '}
        <Radio
          inline
          onChange={this.handleChange}
          value='no'
          id='minimum_equity_contribution_required'
          checked={this.state.minimum_equity_contribution_required === 'no'}
        >
          No
        </Radio>
      </FormGroup>
      { this.state.minimum_equity_contribution_required === 'yes' ? minimumEquityRequiredSection : null }
      { this.state.minimum_equity_contribution_fixed_or_percentage === 'Fixed' || this.state.minimum_equity_contribution_required === 'no' ? minimumEquityRequiredAmountSection : minimumEquityRequiredPercentageSection }
      </div>
    )
    let proceedsNotforAquiSection = (
      <FormGroup>
        <ControlLabel>Please complete the following sentence: The primary purpose of the loan proceeds is to:____________.</ControlLabel>
        <FormControl
          id="proceeds_purpose"
          type="text"
          value={this.state.proceeds_purpose}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h2>Use of Proceeds</h2>
            <form>
              <FormGroup>
                <ControlLabel>Are the proceeds of the loan being used for acquisition finance?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='purpose_of_loan_acquisition'
                  checked={this.state.purpose_of_loan_acquisition === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='purpose_of_loan_acquisition'
                  checked={this.state.purpose_of_loan_acquisition === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              { this.state.purpose_of_loan_acquisition === 'yes' ? proceedsForAquiFinanceSection : proceedsNotforAquiSection }
              <FormGroup>
                <ControlLabel>Will existing debt be repaid as a secondary use of proceeds? (Answer "no" if a refinancing was the primary purpose.)</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='existing_debt_repaid_as_secondary_use_of_proceeds'
                  checked={this.state.existing_debt_repaid_as_secondary_use_of_proceeds === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='existing_debt_repaid_as_secondary_use_of_proceeds'
                  checked={this.state.existing_debt_repaid_as_secondary_use_of_proceeds === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Will there be a cap on aggregate transaction expenses?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='aggregate_transaction_expense_cap'
                  checked={this.state.aggregate_transaction_expense_cap === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='aggregate_transaction_expense_cap'
                  checked={this.state.aggregate_transaction_expense_cap === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>What is the cap?</ControlLabel>
                <FormControl
                  id="aggregate_transaction_expense_cap_amount"
                  type="number"
                  value={this.state.aggregate_transaction_expense_cap_amount}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </form>
          </div>
        </div>
        <button className="btn btn-primary" onClick={()=> this.props.NextClick(this.state)}> Next</button>
      </div>
    );
  }
}

export default UseOfProceeds;
