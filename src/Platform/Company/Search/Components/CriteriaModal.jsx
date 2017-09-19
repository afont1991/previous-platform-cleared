import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import {formatNumber} from '../../../../Helpers/valueFormatHelper';
import { browserHistory } from 'react-router';
import isEmpty from 'is-empty'

class CriteriaModal extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  componentWillMount(){
    this.setState({
      showModal: false,
    });
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  render() {
    const Industries = this.props.Company.industries.map((industry, i) => {
      return (
        <li key={i}>{industry}</li>
      )
    })
    const Types = this.props.Company.typesOfCapital.map((type, i) => {
      return (
        <li key={i}>{type}</li>
      )
    })
    let revenueCell = 'undisclosed';
    let ebitdaCell = 'undisclosed';
    let investmentSizeCell = 'undisclosed';

    if(this.props.Company.revenue !== null){
      revenueCell = `${formatNumber(this.props.Company.revenue.min)} - ${formatNumber(this.props.Company.revenue.max)}`
    }
    if(this.props.Company.ebitda !== null){
      ebitdaCell = `${formatNumber(this.props.Company.ebitda.min)} - ${formatNumber(this.props.Company.ebitda.max)}`
    }
    if(this.props.Company.investmentSize !== null){
      investmentSizeCell = `${formatNumber(this.props.Company.investmentSize.min)} - ${formatNumber(this.props.Company.investmentSize.max)}`
    }
    let criteriaCell = (
      <div className="row double-lined light-margin-top-bottom">
        <div className='col-md-4 platform-border-right'>
          <p className="text-muted small-cell-text">Investment Size</p>
          {investmentSizeCell}
        </div>
        <div className='col-md-4 platform-border-right'>
          <p className="text-muted small-cell-text">EBITDA Range</p>
          {ebitdaCell}
        </div>
        <div className='col-md-4'>
          <p className="text-muted small-cell-text">Revenue Range</p>
          {revenueCell}
        </div>
      </div>
    )
    const veiwButton = (
      <button
        className="btn btn-default purple-background white-color no-text-transform"
        onClick={() => {browserHistory.push(`/platform/company/${this.props.Company.id}`);}}
        type="submit"
      >
        View Full Company Profile
      </button>
    )
    return (
      <td className="search-cell-small" onClick={this.open}>
        <p className="preview-button">Click for details</p>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Company Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <p className="profile-text text-muted"><strong>{this.props.Company.name}</strong></p>
                      <p className="profile-text text-muted">{isEmpty(this.props.Company.location) ? ('') : (this.props.Company.location)}</p>
                    </div>
                    <div className="col-md-6 text-right">
                      {veiwButton}
                    </div>
                  </div>
                  <div className="row">
                    <div className='col-md-12'>
                      <p className="profile-text text-muted">{this.props.Company.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              {criteriaCell}
              <div className="row">
                <div className="col-md-6">
                  <p className="profile-text text-muted profile-section-header">Industries</p>
                  <ul>
                    {Industries}
                  </ul>
                </div>
                <div className="col-md-6">
                  <p className="profile-text text-muted profile-section-header">Types of Capital</p>
                  {Types}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </td>
    );
  }
}

export default CriteriaModal
