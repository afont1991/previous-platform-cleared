import React, { Component } from 'react';
import { form, FormGroup, ControlLabel, FormControl, Radio } from 'react-bootstrap';
import { fromJS } from 'immutable';

class Prepayments extends Component {
  constructor(props) {
    super(props);
    this.state = props.formData;
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState(fromJS(this.state).set(e.target.id, e.target.value).toJS());
  }
  render() {
    let ExcessCashFlowSweepSection = (
      <div>
        <FormGroup>
          <ControlLabel>What percent of ECF will initially be swept?</ControlLabel>
          <FormControl
            id="ecf_to_be_swept"
            type="number"
            value={this.state.ecf_to_be_swept}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Will there be ECF step-downs based on leverage?</ControlLabel>
          <br />
          <Radio
            inline
            onChange={this.handleChange}
            value='yes'
              id='ecf_step_downs_based_on_leverage'
              checked={this.state.ecf_step_downs_based_on_leverage === 'yes'}
            >
              Yes
            </Radio>
            {' '}
            <Radio
              inline
              onChange={this.handleChange}
              value='no'
              id='ecf_step_downs_based_on_leverage'
              checked={this.state.ecf_step_downs_based_on_leverage === 'no'}
            >
              No
            </Radio>
          </FormGroup>
        </div>
      )
      let EquitySweepSection = (
        <div>
          <FormGroup>
            <ControlLabel>What percentage of equity proceeds will initially be swept?</ControlLabel>
            <FormControl
              id="equity_proceeds_initially_swept"
              type="number"
              value={this.state.equity_proceeds_initially_swept}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Will the equity sweep have step-downs?</ControlLabel>
            <br />
            <Radio
              inline
              onChange={this.handleChange}
              value='yes'
              id='equity_sweep_step_downs'
              checked={this.state.equity_sweep_step_downs === 'yes'}
            >
              Yes
            </Radio>
            {' '}
            <Radio
              inline
              onChange={this.handleChange}
              value='no'
              id='equity_sweep_step_downs'
              checked={this.state.equity_sweep_step_downs === 'no'}
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
            <h2>Prepayments</h2>
            <form>
              <FormGroup>
                <ControlLabel>Will the facility have an excess cash flow sweep?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='excess_cash_flow_sweep'
                  checked={this.state.excess_cash_flow_sweep === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='excess_cash_flow_sweep'
                  checked={this.state.excess_cash_flow_sweep === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              { this.state.excess_cash_flow_sweep === 'yes' ? ExcessCashFlowSweepSection : null }
              <FormGroup>
                <ControlLabel>Will there be an equity sweep?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='yes'
                  id='equity_sweep'
                  checked={this.state.equity_sweep === 'yes'}
                >
                  Yes
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='no'
                  id='equity_sweep'
                  checked={this.state.equity_sweep === 'no'}
                >
                  No
                </Radio>
              </FormGroup>
              { this.state.equity_sweep === 'yes' ? EquitySweepSection : null }
              <FormGroup>
                <ControlLabel>Will mandatory prepayments be applied pro rata across remaining scheduled principal payments or in inverse order of maturity?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='Pro Rata'
                  id='mandatory_prepayments_pro_rata_or_inverse'
                  checked={this.state.mandatory_prepayments_pro_rata_or_inverse === 'Pro Rata'}
                >
                  Pro Rata
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='Inverse'
                  id='mandatory_prepayments_pro_rata_or_inverse'
                  checked={this.state.mandatory_prepayments_pro_rata_or_inverse === 'Inverse'}
                >
                  Inverse
                </Radio>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Should voluntary prepayments be applied pro rata across remaining scheduled principal payments or as directed by the borrower?</ControlLabel>
                <br />
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='Pro Rata'
                  id='voluntary_prepayments_pro_rata_or_as_directed'
                  checked={this.state.voluntary_prepayments_pro_rata_or_as_directed === 'Pro Rata'}
                >
                  Pro Rata
                </Radio>
                {' '}
                <Radio
                  inline
                  onChange={this.handleChange}
                  value='As Directed'
                  id='voluntary_prepayments_pro_rata_or_as_directed'
                  checked={this.state.voluntary_prepayments_pro_rata_or_as_directed === 'As Directed'}
                >
                  As Directed
                </Radio>
              </FormGroup>
            </form>
          </div>
        </div>
        <button className="btn btn-primary" onClick={()=> this.props.NextClick(this.state)}> Next</button>
      </div>
    );
  }
}

export default Prepayments;
