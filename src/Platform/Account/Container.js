import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingWidget from '../Components/LoadingWidget'
import FormInput from '../Components/FormInput'
import {browserHistory} from 'react-router'

import * as actions from './Actions';

class Account extends Component {

  componentWillMount() {
    this.props.init()
  }

  componentWillUnmount() {
    this.props.unMount()
  }

  render() {
    if(this.props.state.status === 'pending') {
      return (<LoadingWidget />);
    } else {
      const formData = this.props.state.formData
      const UserInfo = this.props.state.UserInfo
      return (
        <div className='container'>
          <div className="row">
            <div className="col-md-12">
              <p className="profile-text text-muted profile-section-header">
                <strong>Update Email</strong>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <FormInput
                Input={formData.email}
                path={['formData', 'email']}
                onChange={this.props.onChange}
              />
            </div>
            <div className='col-md-2'>
              <a className="platform-button green-background" onClick={() => this.props.submitEmail(formData)}>Save</a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {this.props.state.passwords_match === true ? '' : (<div className="alert alert-danger animated fadeInLeft" role="alert">Passwords Must Match</div>)}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="profile-text text-muted profile-section-header">
                <strong>Update Password</strong>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <FormInput
                Input={formData.password}
                path={['formData', 'password']}
                onChange={this.props.onChange}
              />
            </div>
            <div className="col-md-5">
              <FormInput
                Input={formData.password_test}
                path={['formData', 'password_test']}
                onChange={this.props.onChange}
              />
            </div>
            <div className='col-md-2'>
              <a className="platform-button green-background" onClick={() => this.props.submitPassword(formData)}>Save</a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="profile-text text-muted profile-section-header">
                <strong>Company Profile</strong>
              </p>
              <div className="row">
                <div className="col-md-2">
                  <p className="profile-text text-muted"><strong>{UserInfo.company.name}</strong></p>
                </div>
                <div className="col-md-3">
                  <a className="platform-button purple-background float-left" onClick={() => {browserHistory.push(`/platform/company/${UserInfo.company.id}`);}}>View</a>
                  <a className="platform-button purple-background float-right" onClick={() => {browserHistory.push(`/platform/company/edit/${UserInfo.company.id}`);}}>Edit</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.Account,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(actions.init())
    },
    onChange: (input, path) => {
      dispatch(actions.onChange(input, path))
    },
    submitEmail: (formData) => {
      dispatch(actions.submitEmail(formData))
    },
    submitPassword: (formData) => {
      dispatch(actions.submitPassword(formData))
    },
    unMount: () => {
      dispatch(actions.unMount())
    }
  }
}

const AccountContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Account)

export default AccountContainer
