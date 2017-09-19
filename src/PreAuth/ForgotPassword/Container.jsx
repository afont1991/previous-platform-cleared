import React, { Component } from 'react';
import Form from '../../Form/Container'

import Layout from './Layout'
import LoadingWidget from '../../Platform/Components/LoadingWidget'
import SuccessSmall from '../Components/SuccessSmall'
// import connect so that our reducer is available to our component via props
import { connect } from 'react-redux'
import { Link } from 'react-router'

// import Actions
import * as actions from './Actions';


class ForgotPassword extends Component {
  componentWillMount(){
    this.props.init(this.props.params.token)
  }
  componentWillUnmount(){
    this.props.unmount()
  }
	render() {
    if(this.props.state.status === 'ready' || this.props.state.status === 'error'){
      return (
        <Form form={this.props.state.formData} >
          <Layout submitNewPassword={this.props.submitNewPassword} state={this.props.state} />
        </Form>
      )
    } else if(this.props.state.status === 'success'){
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <SuccessSmall />
              <Link to="/">Login with your new Password</Link>
            </div>
          </div>
        </div>
      )
    } else {
      return (<LoadingWidget />)
    }
	}
}

const mapStateToProps = (state) => {
  return {
    state: state.ForgotPassword,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: (token) => {
      dispatch(actions.init(token))
    },
    unmount: () => {
      dispatch(actions.unmount())
    },
    submitNewPassword: (formData) => {
      dispatch(actions.submitNewPassword(formData))
    },
  }
}

const ForgotPasswordContainer = connect(
  mapStateToProps, mapDispatchToProps
)(ForgotPassword)

export default ForgotPasswordContainer;
