import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import { connect } from 'react-redux'

import SuccessSmall from '../Components/SuccessSmall'
import Layout from './Layout'

import * as actions from './Actions'

class ForgotModal extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  componentWillMount(){
    this.setState({
      showModal: false,
    })
  }
  render() {
    if(this.props.setEmail){
      return (
        <a className="platform-button sign-in-btn no-margin-top" onClick={this.open}>
          Forgot Password?
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Body className="text-center">
              {this.props.state.status === 'success' ? (
                <SuccessSmall />
              ) : (
                <Layout
                  form={this.props.state.formData}
                  status={this.props.state.status}
                  onChange={this.props.onChange}
                  submitForgotRequest={this.props.submitForgotRequest}
                />
              )}
            </Modal.Body>
          </Modal>
        </a>
      )
    } else {
      return (
        <p className="nm-text-no-border" >
          Forgot Password?
          <a onClick={this.open}> Click here</a>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Body className="text-center">
              {this.props.state.status === 'success' ? (
                <SuccessSmall />
              ) : (
                <Layout
                  form={this.props.state.formData}
                  status={this.props.state.status}
                  onChange={this.props.onChange}
                  submitForgotRequest={this.props.submitForgotRequest}
                />
              )}
            </Modal.Body>
          </Modal>
        </p>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.ForgotModal,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    unmount: () =>{
      dispatch(actions.authCheck())
    },
    onChange: (input, path) => {
      dispatch(actions.onChange(input, path))
    },
    submitForgotRequest: (email) =>{
      dispatch(actions.submitForgotRequest(email))
    },
  }
}

const ForgotModalContainer = connect(
  mapStateToProps, mapDispatchToProps
)(ForgotModal)

export default ForgotModalContainer
