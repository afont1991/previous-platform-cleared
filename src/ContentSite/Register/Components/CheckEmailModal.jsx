import React, { Component } from 'react';
import { Link } from 'react-router'
import { Modal } from 'react-bootstrap';

import ForgotPasswordModal from '../../../PreAuth/ForgotPasswordModal/Container'

export default class CheckEmailModal extends Component {
  render() {
    return (
      <Modal show={this.props.modalStatus} onHide={ ()=> this.props.toggleModal(false) }>
        <Modal.Body className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className='row'>
                <div className='col-md-12'>
                  <p className="profile-text text-muted profile-section-header text-center">
                    <strong>Looks like you already have an account</strong>
                  </p>
                  <div className="duplicate-user-options-contianer text-center">
                    <Link className="platform-button sign-in-btn" to="/">Login</Link>
                    <p className="platform-text no-margin large-text">OR</p>
                    <ForgotPasswordModal setEmail={this.props.email} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
