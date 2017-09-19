import { connect } from 'react-redux'
import React, { Component } from 'react';
import { Modal, NavItem, Button } from 'react-bootstrap';
import FormInput from '../Components/FormInput'
import LoadingWidget from '../Components/LoadingWidget'

// Presenational Components
import * as actions from './Actions';

class HelpModal extends Component {
  componentWillUpdate(nextProps){
    let ready = true
    Object.keys(nextProps.formData).forEach((key) => {
      let input = nextProps.formData[key]
      if(!input.validation.class || input.validation.class === 'has-error'){
        ready = false
      }
    });
    if(nextProps.submitStatus === false && ready === true){
      nextProps.readyToSubmit(ready)
    }
  }
  render() {

    let layout

    if(this.props.status === 'ready'){
      layout = (
        <Modal.Body className="text-center">
          <FormInput
            Input={this.props.formData.email}
            path={['formData', 'email']}
            onChange={this.props.onChange}
          />
          <FormInput
            Input={this.props.formData.message}
            path={['formData', 'message']}
            onChange={this.props.onChange}
          />
          {this.props.submitStatus ? (
            <Button className="green-btn no-text-decoration" onClick={()=>{this.props.submitForm(this.props.formData)}}>Submit</Button>
          ) : (
            <Button className="grey-btn no-text-decoration" >Submit</Button>
          )}
        </Modal.Body>
      )
    } else if(this.props.status === 'success'){
      layout = (
        <Modal.Body className="text-center">
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="profile-text text-muted profile-section-header">
                <strong>Success! We will be reaching out to you shortly!</strong>
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
            </div>
          </div>
        </Modal.Body>
      )
    } else {
      layout = (
        <Modal.Body className="text-center">
          <LoadingWidget />
        </Modal.Body>
      )
    }
    return (
      <NavItem onClick={this.props.open} >
        <span className="page-scroll big-nav-font">Help <i className="fa fa-1x fa-question sr-icons"></i></span>
        <Modal show={this.props.showModal} onHide={this.props.close}>
          <Modal.Header closeButton>
            <p className="profile-text profile-section-header text-center">
              <strong>Having an issue or question? <br /> Let us know below and we will contact you as soon as possible.</strong>
            </p>
          </Modal.Header>
          {layout}
        </Modal>
      </NavItem>
    );
  }
}


const mapStateToProps = (state) => {
  return state.Help
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
      dispatch(actions.close())
    },
    open: () => {
      dispatch(actions.open())
    },
    onChange: (input, path) => {
      dispatch(actions.onChange(input, path))
    },
    readyToSubmit: (status) =>{
      dispatch(actions.readyToSubmit(status))
    },
    submitForm: (formData) => {
      dispatch(actions.submitForm(formData))
    },
  }
}

const HelpContainer = connect(
  mapStateToProps, mapDispatchToProps
)(HelpModal)

export default HelpContainer
