import React, { Component } from 'react';
import { form, FormGroup, ControlLabel, FormControl, Radio, Checkbox } from 'react-bootstrap';
import { fromJS } from 'immutable';

class IncrementalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = props.formData;
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    if(e.target.id === 'types_of_leverage_chosen' || e.target.id === 'consent_rights_list_over_new_lenders' || e.target.id === 'consent_rights_list_over_terms_of_incremental_facility'){
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

    let redoThisItsHorrible = (
      <FormGroup>
        <ControlLabel>How many turns of EBITDA tighter than the covenant? (Fill in: ___:1.00)</ControlLabel>
        <FormControl
          id="how_many_turns_of_EBITDA_tighter"
          type="number"
          value={this.state.how_many_turns_of_EBITDA_tighter}
          onChange={this.handleChange}
        />
      </FormGroup>
    )

    let HowManyEbitas = (
      <FormGroup>
        <ControlLabel>At how many turns of EBITDA (e.g. ___:1.00)?</ControlLabel>
        <FormControl
          id="turns_of_EBITDA"
          type="number"
          value={this.state.turns_of_EBITDA}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
    let CovanentLeverageSection = (
      <div>
        <FormGroup>
          <ControlLabel>Will you require such leverage to be tighter than the covenant?</ControlLabel>
          <br />
          <Radio
            inline
            onChange={this.handleChange}
            value='yes'
            id='leverage_tighter_than_covenant'
            checked={this.state.leverage_tighter_than_covenant === 'yes'}
          >
            Yes
          </Radio>
          {' '}
          <Radio
            inline
            onChange={this.handleChange}
            value='no'
            id='leverage_tighter_than_covenant'
            checked={this.state.leverage_tighter_than_covenant === 'no'}
          >
            No
          </Radio>
        </FormGroup>
        { this.state.leverage_tighter_than_covenant === 'yes' ? redoThisItsHorrible : null }
      </div>
    )
    let HowBigisFreeBieSection = (
      <FormGroup>
        <ControlLabel>How big is the "freebie" basket?</ControlLabel>
        <FormControl
          id="freebie_basket_size"
          type="number"
          value={this.state.freebie_basket_size}
          onChange={this.handleChange}
        />
      </FormGroup>
    )
    let DollarCovenantFixedSection = (
      <div>
        <FormGroup>
          <ControlLabel>What type of leverage (choose all that apply)?</ControlLabel>
          <br />
          <Checkbox
            inline
            onChange={this.handleChange}
            value='senior'
            id='types_of_leverage_chosen'
            checked={this.state.types_of_leverage_chosen.includes('senior')}
          >
            senior
          </Checkbox>
          {' '}
          <Checkbox
            inline
            onChange={this.handleChange}
            value='secured'
            id='types_of_leverage_chosen'
            checked={this.state.types_of_leverage_chosen.includes('secured')}
          >
            secured
          </Checkbox>
          {' '}
          <Checkbox
            inline
            onChange={this.handleChange}
            value='first lien'
            id='types_of_leverage_chosen'
            checked={this.state.types_of_leverage_chosen.includes('first lien')}
          >
            first lien
          </Checkbox>
          {' '}
          <Checkbox
            inline
            onChange={this.handleChange}
            value='total'
            id='types_of_leverage_chosen'
            checked={this.state.types_of_leverage_chosen.includes('total')}
          >
            total
          </Checkbox>
          {' '}
          <Checkbox
            inline
            onChange={this.handleChange}
            value='net'
            id='types_of_leverage_chosen'
            checked={this.state.types_of_leverage_chosen.includes('net')}
          >
            net
          </Checkbox>
        </FormGroup>
        { this.state.incremental_facility_fixed_dollar_or_leverage === 'Dollar' ? HowManyEbitas : null }
      </div>
    )
    let LeverageSection = (
      <div>
        <FormGroup>
          <ControlLabel>Will there be a "freebie" basket that isn't subject to the leverage test?</ControlLabel>
          <br />
          <Radio
            inline
            onChange={this.handleChange}
            value='yes'
            id='freebie_basket_not_subject_to_leverage_test'
            checked={this.state.freebie_basket_not_subject_to_leverage_test === 'yes'}
          >
            Yes
          </Radio>
          {' '}
          <Radio
            inline
            onChange={this.handleChange}
            value='no'
            id='freebie_basket_not_subject_to_leverage_test'
            checked={this.state.freebie_basket_not_subject_to_leverage_test === 'no'}
          >
            No
          </Radio>
        </FormGroup>
        { this.state.freebie_basket_not_subject_to_leverage_test === 'yes' ? HowBigisFreeBieSection : null }
        <FormGroup>
          <ControlLabel>Will that ratio be fixed, or tied to the covenant?</ControlLabel>
          <br />
          <Radio
            inline
            onChange={this.handleChange}
            value='Fixed'
            id='ratio_type_fixed_covenant'
            checked={this.state.ratio_type_fixed_covenant === 'Fixed'}
          >
            Fixed
          </Radio>
          {' '}
          <Radio
            inline
            onChange={this.handleChange}
            value='Covenant'
            id='ratio_type_fixed_covenant'
            checked={this.state.ratio_type_fixed_covenant === 'Covenant'}
          >
            Covenant
          </Radio>
        </FormGroup>
        { this.state.ratio_type_fixed_covenant === 'Fixed' ? DollarCovenantFixedSection : CovanentLeverageSection }
      </div>
    )
    let HowManyTurnsTighterSection = (
      <div>
        <FormGroup>
          <ControlLabel>How many turns of EBITDA tighter than the covenant? (Fill in: ___:1.00)</ControlLabel>
          <FormControl
            id="how_many_turns_of_EBITDA_tighter"
            type="number"
            value={this.state.how_many_turns_of_EBITDA_tighter}
            onChange={this.handleChange}
          />
        </FormGroup>
      </div>
    )
    let DollarCovenantSection = (
      <div>
        <FormGroup>
          <ControlLabel>Will that ratio be fixed, or tied to the covenant?</ControlLabel>
          <br />
          <Radio
            inline
            onChange={this.handleChange}
            value='Fixed'
            id='ratio_type_fixed_covenant'
            checked={this.state.ratio_type_fixed_covenant === 'Fixed'}
          >
            Fixed
          </Radio>
          {' '}
          <Radio
            inline
            onChange={this.handleChange}
            value='Covenant'
            id='ratio_type_fixed_covenant'
            checked={this.state.ratio_type_fixed_covenant === 'Covenant'}
          >
            Covenant
          </Radio>
        </FormGroup>
        { this.state.ratio_type_fixed_covenant === 'Fixed' ? DollarCovenantFixedSection : HowManyTurnsTighterSection }
      </div>
    )
    let DollarSection = (
      <div>
        <FormGroup>
          <ControlLabel>What is the maximum size of the incremental facility?</ControlLabel>
          <FormControl
            id="maximum_size_fixed"
            type="number"
            value={this.state.maximum_size_fixed}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Will there be an additional leverage test in order to draw the incremental (besides pro forma compliance)?</ControlLabel>
          <br />
          <Radio
            inline
            onChange={this.handleChange}
            value='yes'
            id='addtional_leverage_test'
            checked={this.state.addtional_leverage_test === 'yes'}
          >
            Yes
          </Radio>
          {' '}
          <Radio
            inline
            onChange={this.handleChange}
            value='no'
            id='addtional_leverage_test'
            checked={this.state.addtional_leverage_test === 'no'}
          >
            No
          </Radio>
        </FormGroup>
        { this.state.addtional_leverage_test === 'yes' ? DollarCovenantSection : null }
      </div>
    )
    let MainIncrementalFacilitysection = (
      <div>
        <FormGroup>
          <ControlLabel>Will the maximum size of the incremental facility be a fixed dollar amount or will it be flexible based on a leverage test?</ControlLabel>
          <br />
          <Radio
            inline
            onChange={this.handleChange}
            value='Dollar'
            id='incremental_facility_fixed_dollar_or_leverage'
            checked={this.state.incremental_facility_fixed_dollar_or_leverage === 'Dollar'}
          >
            Dollar
          </Radio>
          {' '}
          <Radio
            inline
            onChange={this.handleChange}
            value='Leverage'
            id='incremental_facility_fixed_dollar_or_leverage'
            checked={this.state.incremental_facility_fixed_dollar_or_leverage === 'Leverage'}
          >
            Leverage
          </Radio>
        </FormGroup>
        { this.state.incremental_facility_fixed_dollar_or_leverage === 'Dollar' ? DollarSection : LeverageSection }
        <FormGroup>
          <ControlLabel>Which of the following, if any, will have consent rights over new lenders providing incremental loans?</ControlLabel>
          <br />
          <Checkbox
            inline
            onChange={this.handleChange}
            value='Administrative Agent'
            id='consent_rights_list_over_new_lenders'
            checked={this.state.consent_rights_list_over_new_lenders.includes('Administrative Agent')}
          >
            Administrative Agent
          </Checkbox>
          {' '}
          <Checkbox
            inline
            onChange={this.handleChange}
            value='Arranger'
            id='consent_rights_list_over_new_lenders'
            checked={this.state.consent_rights_list_over_new_lenders.includes('Arranger')}
          >
            Arranger
          </Checkbox>
          {' '}
          <Checkbox
            inline
            onChange={this.handleChange}
            value='None of the Above'
            id='consent_rights_list_over_new_lenders'
            checked={this.state.consent_rights_list_over_new_lenders.includes('None of the Above')}
          >
            None of the Above
          </Checkbox>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Which of the following parties, if any, will have a consent right over terms of the incremental facility that differ from the existing facility?</ControlLabel>
          <br />
          <Checkbox
            inline
            onChange={this.handleChange}
            value='Administrative Agent'
            id='consent_rights_list_over_terms_of_incremental_facility'
            checked={this.state.consent_rights_list_over_terms_of_incremental_facility.includes('Administrative Agent')}
          >
            Administrative Agent
          </Checkbox>
          {' '}
          <Checkbox
            inline
            onChange={this.handleChange}
            value='Arranger'
            id='consent_rights_list_over_terms_of_incremental_facility'
            checked={this.state.consent_rights_list_over_terms_of_incremental_facility.includes('Arranger')}
          >
            Arranger
          </Checkbox>
          {' '}
          <Checkbox
            inline
            onChange={this.handleChange}
            value='None of the Above'
            id='consent_rights_list_over_terms_of_incremental_facility'
            checked={this.state.consent_rights_list_over_terms_of_incremental_facility.includes('None of the Above')}
          >
            None of the Above
          </Checkbox>
        </FormGroup>
      </div>
    )
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h2>Incremental Facility</h2>
            <form>
              <FormGroup>
                <ControlLabel>Will an incremental facility (i.e. "accordion feature") be permitted under the credit agreement?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='incremental_facility'
                  checked={this.state.incremental_facility === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='incremental_facility'
                  checked={this.state.incremental_facility === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              { this.state.incremental_facility === 'yes' ? MainIncrementalFacilitysection : null }
            </form>
          </div>
        </div>
        <button className="btn btn-primary" onClick={()=> this.props.NextClick(this.state)}> Next</button>
      </div>
    );
  }
}

export default IncrementalFacility;
