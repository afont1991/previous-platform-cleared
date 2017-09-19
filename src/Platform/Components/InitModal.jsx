import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

class InitModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>
        <Modal.Header closeButton>
          <p className="profile-text profile-section-header">
            <strong>First Time Login</strong>
          </p>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Please take a moment to complete your profile below to ensure the best experience</p>
        </Modal.Body>
      </Modal>
    );
  }
}

export default InitModal
