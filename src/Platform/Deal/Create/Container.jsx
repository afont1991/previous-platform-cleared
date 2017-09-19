import { connect } from 'react-redux'
import React, { Component } from 'react';
import FormInput from '../../Components/FormInput'
import { Glyphicon } from 'react-bootstrap'

// import {browserHistory} from 'react-router'

// Presenational Components
import LoadingWidget from '../../Components/LoadingWidget';
import BasicDetails from './Components/BasicDetails'
import KeyContacts from './Components/KeyContacts'
import TransactionOverview from './Components/TransactionOverview'
import Financials from './Components/Financials'
import Faq from './Components/Faq'
import UploadDocs from './Components/UploadDocs'
import * as actions from './Actions';

class CreateDeal extends Component {

  componentWillMount(){
    this.props.initialize();

  }

  componentWillUnmount() {
    this.props.unMount()
  }

  render() {
    const state = this.props.state;
    if(state.status === 'pending' || state.status === 'error'){
      return <LoadingWidget />
    } else {
      return (
        <div className="container-fluid">
          <div className="platform-button sticky-save" onClick={()=>{this.props.submitDealCreate(state.formData)}}>
            <Glyphicon className="save-glyph" glyph="save-file" />
            <p className="save-text">Save</p>
          </div>
          <div className="row">
            <div className="col-md-5 platform-border-right">
              <p className="profile-text text-muted profile-section-header"><strong>Basic Details</strong></p>
              <BasicDetails
                formData={state.formData}
                onChange={this.props.onChange}
                onSelect={this.props.onSelect}
                handleDate={this.props.handleDate}
              />
            </div>
            <div className="col-md-7">
              <p className="profile-text text-muted profile-section-header"><strong>Key Contacts</strong></p>
              <KeyContacts
                formData={state.formData}
                onSelect={this.props.onSelect}
              />
              <p className="profile-text text-muted profile-section-header"><strong>Transaction Overview</strong></p>
              <TransactionOverview
                formData={state.formData}
                onSelect={this.props.onSelect}
                onChange={this.props.onChange}
                addTypeAmount={this.props.addTypeAmount}
                removeTypeAmount={this.props.removeTypeAmount}
              />
              <p className="profile-text text-muted profile-section-header"><strong>Financials</strong></p>
              <div className="row">
                <div className="col-md-6">
                  <FormInput
                    Input={state.formData.financial_review_level}
                    path={['formData', 'financial_review_level']}
                    onSelect={this.props.onSelect}
                  />
                </div>
              </div>
              <Financials
                formData={state.formData}
                onChange={this.props.onChange}
                onSelect={this.props.onSelect}
                addFinancials={this.props.addFinancials}
                removeFinancials={this.props.removeFinancials}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Faq
                formData={state.formData}
                onChange={this.props.onChange}
                addFaq={this.props.addFaq}
                removeFaq={this.props.removeFaq}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="profile-text text-muted profile-section-header margin-top"><strong>Upload Documents</strong></p>
              <UploadDocs
                formData={state.formData}
                onDrop={this.props.onDrop}
                removeFile={this.props.removeFile}
                />
            </div>
          </div>
        </div>
      )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.DealCreate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (input, path) => {
      dispatch(actions.onChange(input, path))
    },
    onSelect: (option, path) => {
      dispatch(actions.onSelect(option, path))
    },
    onDrop: (acceptedFiles, rejectedFiles, path) => {
      dispatch(actions.onDrop(acceptedFiles, rejectedFiles, path))
    },
    handleDate: (date, path) => {
      dispatch(actions.handleDate(date, path))
    },
    addTypeAmount: (formData) => {
      dispatch(actions.addTypeAmount(formData))
    },
    removeTypeAmount: (id) => {
      dispatch(actions.removeTypeAmount(id))
    },
    addFinancials: (formData) => {
      dispatch(actions.addFinancials(formData))
    },
    removeFinancials: (id) => {
      dispatch(actions.removeFinancials(id))
    },
    addFaq: (formData) => {
      dispatch(actions.addFaq(formData))
    },
    removeFaq: (id) => {
      dispatch(actions.removeFaq(id))
    },
    removeFile: (path) => {
      dispatch(actions.removeFile(path))
    },
    initialize: () => {
      dispatch(actions.initialize())
    },
    submitDealCreate: (formData) => {
      dispatch(actions.submitDealCreate(formData))
    },
    unMount: () => {
      dispatch(actions.unMount())
    },
  }
}

const CreateDealContainer = connect(
  mapStateToProps, mapDispatchToProps
)(CreateDeal)

export default CreateDealContainer
