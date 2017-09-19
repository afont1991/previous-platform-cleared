import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingWidget from '../Components/LoadingWidget'
import FormInput from '../Components/FormInput'

import * as actions from './Actions';

class Signup extends Component {

  render() {
    if(this.props.state.status === 'pending'){
      return (<LoadingWidget />);
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-md-3">
              <FormInput
                Input={this.props.state.formData.first_name}
                path={['formData', 'first_name']}
                onChange={this.props.onChange}
              />
            </div>
            <div className="col-md-3">
              <FormInput
                Input={this.props.state.formData.last_name}
                path={['formData', 'last_name']}
                onChange={this.props.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <FormInput
                Input={this.props.state.formData.email}
                path={['formData', 'email']}
                onChange={this.props.onChange}
              />
            </div>
            <div className="col-md-3">
              <FormInput
                Input={this.props.state.formData.password}
                path={['formData', 'password']}
                onChange={this.props.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <FormInput
                Input={this.props.state.formData.user_type}
                path={['formData', 'user_type']}
                onSelect={this.props.onSelect}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <a className="platform-button" onClick={()=>{this.props.submitSignup(this.props.state.formData)}}>Sign up</a>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.Signup,
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
    submitSignup: (formData) => {
      dispatch(actions.submitSignup(formData))
    },
  }
}

const SignupContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Signup)

export default SignupContainer
