import React, { Component } from 'react';
import { form, FormGroup, ControlLabel, FormControl, Radio } from 'react-bootstrap';
import { fromJS } from 'immutable';

class TheParties extends Component {
  constructor(props) {
    super(props);
    this.state = props.formData;
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState(fromJS(this.state).set(e.target.id, e.target.value).toJS());
  }
  render() {
    let parentCompanySection = (
    <div>
      <FormGroup>
        <ControlLabel>What is the parent company's legal name?</ControlLabel>
        <FormControl
          id="parent_company_legal_name"
          type="text"
          value={this.state.parent_company_legal_name}
          onChange={this.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>In what jurisdiction was the parent company organized (e.g. New York)?</ControlLabel>
        <FormControl
          id="parent_jurisdiction"
          type="text"
          value={this.state.parent_jurisdiction}
          onChange={this.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>What type of organization is the parent company?</ControlLabel>
        <br />
        <Radio
          inline
          onChange={this.handleChange}
          value='Corporation'
          id='parent_orgniztion_type'
          checked={this.state.parent_orgniztion_type === 'Corporation'}
        >
          Corporation
        </Radio>
        {' '}
        <Radio
          inline
          onChange={this.handleChange}
          value='Limited Liability Company'
          id='parent_orgniztion_type'
          checked={this.state.parent_orgniztion_type === 'Limited Liability Company'}
        >
          Limited Liability Company
        </Radio>
        {' '}
        <Radio
          inline
          onChange={this.handleChange}
          value='Other'
          id='parent_orgniztion_type'
          checked={this.state.parent_orgniztion_type === 'Other'}
        >
          Other
        </Radio>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Will the parent company guarantee the borrower's debt?</ControlLabel>
        <br />
        <Radio
          inline
          onChange={this.handleChange}
          value='yes'
          id='parent_guarantee'
          checked={this.state.parent_guarantee === 'yes'}
        >
          yes
        </Radio>
        {' '}
        <Radio
          inline
          onChange={this.handleChange}
          value='no'
          id='parent_guarantee'
          checked={this.state.parent_guarantee === 'no'}
        >
          No
        </Radio>
      </FormGroup>
    </div>
    )
    let AdminAgentlegalNameSection = (
      <FormGroup>
        <ControlLabel>What is the legal name of the administrative agent (e.g. Wilmington Trust, N.A.)?</ControlLabel>
        <FormControl
          id="administrative_agent_legal_name"
          type="text"
          value={this.state.administrative_agent_legal_name}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
    let coArrangersSection = (
      <FormGroup>
        <ControlLabel>Please list the co-arrangers, in order of priority:</ControlLabel>
        <FormControl
          id="co_arrangers"
          type="text"
          value={this.state.co_arrangers}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
    let sponsorNameSection = (
      <FormGroup>
        <ControlLabel>What is the sponsor's name?</ControlLabel>
        <FormControl
          id="private_equity_sponsor_legal_name"
          type="text"
          value={this.state.private_equity_sponsor_legal_name}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h2>The Parties</h2>
            <form>
              <FormGroup>
                <ControlLabel>What is the borrower's legal name?</ControlLabel>
                <FormControl
                  id="borrower_legal_name"
                  type="text"
                  value={this.state.borrower_legal_name}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>In what jurisdiction was the borrower organized (e.g. Delaware)?</ControlLabel>
                <FormControl
                  id="borrower_jurisdiction"
                  type="text"
                  value={this.state.borrower_jurisdiction}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>What type of organization is the borrower?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='Corporation'
                  id='borrower_orgniztion_type'
                  checked={this.state.borrower_orgniztion_type === 'Corporation'}
                >
                  Corporation
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='Limited Liability Company'
                  id='borrower_orgniztion_type'
                  checked={this.state.borrower_orgniztion_type === 'Limited Liability Company'}
                >
                  Limited Liability Company
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='Other'
                  id='borrower_orgniztion_type'
                  checked={this.state.borrower_orgniztion_type === 'Other'}
                >
                  Other
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Will there be a parent company above the borrower?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='parent_company'
                  checked={this.state.parent_company === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='parent_company'
                  checked={this.state.parent_company === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              { this.state.parent_company === 'yes' ? parentCompanySection : null }
              <FormGroup>
                <ControlLabel>Who is the left lead arranger on the transaction?</ControlLabel>
                <FormControl
                  id="left_lead_arranger"
                  type="text"
                  value={this.state.left_lead_arranger}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Will the lead arranger also serve as administrative agent?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='lead_arranger_as_admin_agent'
                  checked={this.state.lead_arranger_as_admin_agent === 'yes'}
                >
                  yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='lead_arranger_as_admin_agent'
                  checked={this.state.lead_arranger_as_admin_agent === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              { this.state.lead_arranger_as_admin_agent === 'no' ? AdminAgentlegalNameSection : null }
              <FormGroup>
                <ControlLabel>Will there be other arrangers on the transaction?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='co_arrangers_on_transaction'
                  checked={this.state.co_arrangers_on_transaction === 'yes'}
                >
                  yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='co_arrangers_on_transaction'
                  checked={this.state.co_arrangers_on_transaction === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              { this.state.co_arrangers_on_transaction === 'yes' ? coArrangersSection : null }
              <FormGroup>
                <ControlLabel>Will there initially be more than one lender?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='more_than_one_lender'
                  checked={this.state.more_than_one_lender === 'yes'}
                >
                  yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='more_than_one_lender'
                  checked={this.state.more_than_one_lender === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Will the borrower be owned by a private equity sponsor following the transaction?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='borrower_owned_by_pe_firm'
                  checked={this.state.borrower_owned_by_pe_firm === 'yes'}
                >
                  yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='borrower_owned_by_pe_firm'
                  checked={this.state.borrower_owned_by_pe_firm === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              { this.state.borrower_owned_by_pe_firm === 'yes' ? sponsorNameSection : null }
            </form>
          </div>
        </div>
        <button className="btn btn-primary" onClick={()=> this.props.NextClick(this.state)}> Next</button>
      </div>
    );
  }
}

export default TheParties;
