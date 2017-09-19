import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';

// Presentational Components
import TermsConditions from './presentational/TermsConditions';
import TheParties from './presentational/TheParties';
import Economics from './presentational/Economics';
import UseOfProceeds from './presentational/UseOfProceeds';
import IncrementalFacility from './presentational/IncrementalFacility';
import Prepayments from './presentational/Prepayments';
import Covenants from './presentational/Covenants';
import Misc from './presentational/Misc';

class TermSheetgenerator extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(e) {
    this.props.SelectSection(e);
  }
  render() {
    console.log(this.props.TermSheetFormData);
    let sectionArray = [
      (<TermsConditions NextClick={(newformData = null) => this.props.NextClick(newformData)}/>),
      (<TheParties formData={this.props.TermSheetFormData.the_parties}  NextClick={(newformData = null) => this.props.NextClick(newformData)} />),
      (<Economics formData={this.props.TermSheetFormData.economics} NextClick={(newformData = null) => this.props.NextClick(newformData)} />),
      (<UseOfProceeds formData={this.props.TermSheetFormData.use_of_proceeds} NextClick={(newformData = null) => this.props.NextClick(newformData)} />),
      (<IncrementalFacility formData={this.props.TermSheetFormData.incremental_facility} NextClick={(newformData = null) => this.props.NextClick(newformData)} />),
      (<Prepayments formData={this.props.TermSheetFormData.prepayments} NextClick={(newformData = null) => this.props.NextClick(newformData)} />),
      (<Covenants formData={this.props.TermSheetFormData.covenants} NextClick={(newformData = null) => this.props.NextClick(newformData)} />),
      (<Misc formData={this.props.TermSheetFormData.credit_support_miscellaneous} SubmitForm={(formData = null) => this.props.SubmitForm(formData)} />)
    ]
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <p className="profile-text text-muted profile-section-header">
              <strong>Term Sheet Generator</strong>
            </p>
            <div className="row">
              <div className="col-sm-3">
                <Nav bsStyle="pills" stacked activeKey={this.props.TermSheetFormData.current_section} onSelect={this.handleSelect}>
                  <NavItem eventKey={0} >Terms and Conditions</NavItem>
                  <NavItem eventKey={1} >The Parties</NavItem>
                  <NavItem eventKey={2} >Economics</NavItem>
                  <NavItem eventKey={3} >Use Of Proceeds</NavItem>
                  <NavItem eventKey={4} >Incremental Facility</NavItem>
                  <NavItem eventKey={5} >Prepayments</NavItem>
                  <NavItem eventKey={6} >Covenants</NavItem>
                  <NavItem eventKey={7} >Misc</NavItem>
                </Nav>
              </div>
              <div className="col-sm-9">
                { sectionArray[this.props.TermSheetFormData.current_section] }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TermSheetgenerator;


// <FormGroup>
//   <ControlLabel>Input with success</ControlLabel>
//   <FormControl type="text" />
