import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import FormInput from '../../Platform/Components/FormInput'
import LoadingWidget from '../../Platform/Components/LoadingWidget'
import {Well, Glyphicon} from 'react-bootstrap'

import CheckEmailModal from './Components/CheckEmailModal'

import * as actions from './Actions'


class Register extends Component {

  componentDidUpdate(){
    if(this.props.state.email_status && this.props.state.modal_status === false){
      this.props.toggleModal(true)
    }
  }

  render() {
    const formData = this.props.state.formData
    const onDrop = this.props.onDrop;
    const logoHolder = require('../../Assets/images/logo-holder.png');
    if(this.props.state.status === 'registered'){
      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <Well className="registration-well text-center">
                <p className="profile-text text-muted profile-section-header">
                  <strong>Thank you for registering we will reach out to you via email shortly</strong>
                  <svg
                    className="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52">
                    <circle
                      className="checkmark__circle"
                      cx="26" cy="26" r="25" fill="none"
                    />
                    <path
                      className="checkmark__check"
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                  </svg>
                </p>
              </Well>
            </div>
          </div>
        </div>
      )
    } else if(this.props.state.status === 'pending'){
      return (<LoadingWidget />)
    } else {
      return (
        <div className='container homepage_container'>
          <div className="platform-button sticky-save" onClick={() => {this.props.submitForm(formData)}}>
            <Glyphicon className="save-glyph" glyph="save-file" />
            <p className="save-text">Save</p>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <p className="profile-text text-muted profile-section-header">
                <strong>Request Access</strong>
              </p>
              <p className="profile-text text-muted">
                Please fill in the form below and we will get back to you about activating your account.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="profile-text text-muted sub-section-header">
                Personal Info
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <FormInput
                Input={formData.newUser.first_name}
                path={['formData', 'newUser', 'first_name']}
                onChange={this.props.onChange}
              />
            </div>
            <div className="col-md-4">
              <FormInput
                Input={formData.newUser.last_name}
                path={['formData', 'newUser', 'last_name']}
                onChange={this.props.onChange}
              />
            </div>
            <div className="col-md-4">
              <FormInput
                Input={formData.newUser.email}
                path={['formData', 'newUser', 'email']}
                onChange={(input, path) => {
                  this.props.onChange(input, path)
                  this.props.checkEmail(input)
                }}
              />
            </div>
          </div>
          <div className="row row-line-divider">
            {this.props.state.password_match === true ? '' : (<div className="alert alert-danger animated fadeInLeft" role="alert">Passwords Must Match</div>)}
            <div className="col-md-6">
              <FormInput
                Input={formData.newUser.password}
                path={['formData', 'newUser', 'password']}
                onChange={this.props.onChange}
              />
            </div>
            <div className="col-md-6">
              <FormInput
                Input={formData.newUser.password_test}
                path={['formData', 'newUser', 'password_test']}
                onChange={this.props.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="profile-text text-muted sub-section-header">
                Company Information
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-md-offset-2">
              <FormInput
                Input={formData.company_overview.platform_type}
                path={['formData', 'company_overview', 'platform_type']}
                onSelect={this.props.onSelect}
              />
            </div>
            <div className="col-md-4">
              <FormInput
                Input={formData.company_overview.operating_type}
                path={['formData', 'company_overview', 'operating_type']}
                onSelect={this.props.onSelect}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <FormInput
                Input={formData.company_overview.company_name}
                path={['formData', 'company_overview', 'company_name']}
                onChange={this.props.onChange}
              />
            </div>
            <div className="col-md-6">
              <FormInput
                Input={formData.company_overview.company_url}
                path={['formData', 'company_overview', 'company_url']}
                onChange={this.props.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <FormInput
                Input={formData.company_overview.founding_year}
                path={['formData', 'company_overview', 'founding_year']}
                onChange={this.props.onChange}
              />
            </div>
            <div className="col-md-2">
              <FormInput
                Input={formData.company_overview.country}
                path={['formData', 'company_overview', 'country']}
                onSelect={this.props.onSelect}
              />
            </div>
            <div className="col-md-2">
              <FormInput
                Input={formData.company_overview.state}
                path={['formData', 'company_overview', 'state']}
                onSelect={this.props.onSelect}
              />
            </div>
            <div className="col-md-2">
              <FormInput
                Input={formData.company_overview.city}
                path={['formData', 'company_overview', 'city']}
                onChange={this.props.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <FormInput
                Input={formData.key_metrics.active_investments}
                path={['formData', 'key_metrics', 'active_investments']}
                onSelect={this.props.onSelect}
              />
            </div>
            <div className="col-md-3">
              <FormInput
                Input={formData.key_metrics.open_fund}
                path={['formData', 'key_metrics', 'open_fund']}
                onChange={this.props.onChange}
              />
            </div>
            <div className="col-md-3">
              <FormInput
                Input={formData.key_metrics.aum}
                path={['formData', 'key_metrics', 'aum']}
                onChange={this.props.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className='col-md-3'>
              <div className="logo-upload-section">
                <label className="input-label text-muted">New Logo</label>
                <img src={formData.company_overview.company_logo.url !== null ? formData.company_overview.company_logo.url : logoHolder} alt="..." className="img-rounded profile-logo"  />
              </div>
            </div>
            <div className='col-md-3'>
              <div className="form-group">
                <label className="input-label text-muted">Upload New Logo</label>
                <Dropzone accept='image/*' onDrop={onDrop}>
                  <div className="input-label text-muted header-font dropzone-box">Drag and Drop</div>
                </Dropzone>
              </div>
            </div>
            <div className="col-md-6">
              <FormInput
                Input={formData.company_overview.company_description}
                path={['formData', 'company_overview', 'company_description']}
                onChange={this.props.onChange}
              />
            </div>
          </div>
          <CheckEmailModal email={formData.newUser.email.value} modalStatus={this.props.state.modal_status} toggleModal={this.props.toggleModal} />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.Register,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (formData) => {
      dispatch(actions.submitForm(formData))
    },
    onChange: (input, path) => {
      dispatch(actions.onChange(input, path))
    },
    onSelect: (option, path) => {
      dispatch(actions.onSelect(option, path))
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      dispatch(actions.onDrop(acceptedFiles, rejectedFiles))
    },
    checkEmail: (input) => {
      dispatch(actions.checkEmail(input))
    },
    toggleModal: (toggle) => {
      dispatch(actions.toggleModal(toggle))
    },
  }
}

const RegisterContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Register)

export default RegisterContainer
