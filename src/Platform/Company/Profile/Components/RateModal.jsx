import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class CompanyRateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      first_name: "",
      last_name: "",
      email: "",
      company: ""
    }
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSubscriber = this.submitSubscriber.bind(this);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  handleChange(e) {
    console.log(e);
  }
  render() {
    return (
        <div>
          <a className="btn btn-primary btn-xl page-scroll" onClick={this.open}>Rate Company</a>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Enter Rating Below</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <p className="profile-text text-muted"><strong>A Rating input form foes below</strong></p>
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">@</span>
                <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1" />
              </div>

              <div className="input-group">
                <input type="text" className="form-control" placeholder="Recipient's username" aria-describedby="basic-addon2" />
                <span className="input-group-addon" id="basic-addon2">@example.com</span>
              </div>

              <div className="input-group">
                <span className="input-group-addon">$</span>
                <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                <span className="input-group-addon">.00</span>
              </div>

              <label for="basic-url">Your vanity URL</label>
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon3">https://example.com/users/</span>
                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
              </div>
            </Modal.Body>
          </Modal>
        </div>
    );
  }
}

export default CompanyRateModal;
