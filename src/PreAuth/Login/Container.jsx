import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Form from '../../Form/Container'

import Layout from './Layout'

import * as actions from './Actions';

class Login extends Component {
  componentWillMount(){
    this.props.authCheck()
  }
  componentWillUnmount(){
    this.props.unMount()
  }
  componentWillUpdate(nextProps){
    if(nextProps.state.login_status === 'success' || nextProps.state.authStatus === true){
      browserHistory.push(`/platform`);
    }
  }
  render() {
    return (
      <Form form={this.props.state.loginForm}>
        <Layout loginStatus={this.props.state.login_status} customSubmit={this.props.submitForm}/>
      </Form>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.Login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authCheck: () =>{
      dispatch(actions.authCheck())
    },
    unMount: () =>{
      dispatch(actions.unMount())
    },
    submitForm: (formData) =>{
      dispatch(actions.submitForm(formData))
    },
  }
}

const LoginContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Login)

export default LoginContainer
