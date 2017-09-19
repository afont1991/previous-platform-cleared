import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { fromJS } from 'immutable';

class EmailModalExtraButton extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  handleChange(e) {
    this.setState(fromJS(this.state).set(e.target.id, e.target.value).toJS());
  }
  componentWillMount(){
    this.setState({
      showModal: false,
      first_name: "",
      last_name: "",
      email: "",
      company: ""
    })
  }
  render() {
    return (
        <div>
          <a className="btn btn-primary btn-xl page-scroll" onClick={this.open}>Request Access</a>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Sign up to be a part of our beta</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
            </Modal.Body>
          </Modal>
        </div>
    );
  }
}

export default EmailModalExtraButton;
