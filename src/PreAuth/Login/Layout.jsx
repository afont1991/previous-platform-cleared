import React, { Component } from 'react';
import { Link } from 'react-router';
import FormInput from '../../Platform/Components/FormInput'

import ForgotModal from '../ForgotPasswordModal/Container'

class Layout extends Component {
  componentWillMount() {
    window.addEventListener(
      "keypress",
      (e)=>{
        if(e.key === 'Enter') {
          this.props.customSubmit(this.props.formData.formData, true)
        }
      }
    );
  }
  componentWillUnmount() {
    window.removeEventListener(
    "keypress",
    (e)=>{
      if(e.key === 'Enter') {
        this.props.customSubmit(this.props.formData.formData, true)
      }
    }
  );
  }
  render() {
    const formData = this.props.formData.formData
    return (
      <div className="col-lg-6 col-lg-offset-3">
        <div className="content">
          <h2 className="sign-in">Sign In</h2>
          {this.props.loginStatus === 'error' ? (
            <div className="alert alert-danger animated fadeInDown" role="alert">
              <strong>Invalid Login:</strong> Credentials used not valid
            </div>
          ) : ''}
          <div className="subtitle">
            <div className="not-member">
              <div className="float-left">
                <p className="nm-text-no-border">Not A Member Yet?<Link to="/register"> Request Access</Link></p>
              </div>
              <div className="float-right">
                <ForgotModal />
              </div>
            </div>
          </div>
          <div className="row flexbox padding-top">
            <div className="col-xs-12 flex-items">
              <FormInput
                Input={formData.email}
                path={['formData', 'email']}
                onChange={this.props.onChange}
              />
            </div>
            <div className="col-xs-12 flex-items">
              <FormInput
                Input={formData.password}
                path={['formData', 'password']}
                onChange={this.props.onChange}
              />
            </div>
            <div className="row submit flex-items">
              <div className="col-md-6">
                <a className="platform-button sign-in-btn" onClick={() => this.props.customSubmit(formData, true)}> SIGN IN</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout
