import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router';
import { fromJS } from 'immutable';

class EmailModalButton extends Component {
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
        <ul className="nav navbar-nav">
          <li>
            <Link className="page-scroll big-nav-font no-text-transform" onClick={this.open}>Request Access</Link>
          </li>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Sign up to be a part of our beta</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
            </Modal.Body>
          </Modal>
        </ul>
    );
  }
}

export default EmailModalButton;
