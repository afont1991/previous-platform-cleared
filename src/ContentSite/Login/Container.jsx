import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import * as actions from './Actions';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.submit = this.submit.bind(this);
  }
  componentWillUpdate(nextProps){
    if(nextProps.state.loginSuccess === true){
      browserHistory.push(`/platform`);
    }
  }
  componentWillMount(){
    this.setState({
      showModal: false,
    });
    window.addEventListener("keypress", this.submit);
  }
  componentWillUnmount(){
    window.removeEventListener("keypress", this.submit);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  submit(e) {
    if(e.key === 'Enter'){
      this.props.submitLogin(this.props.state.login)
    }
  }
  render() {
    return (
      <ul className="nav navbar-nav">
        <li>
          <Link className="page-scroll big-nav-font no-text-transform" onClick={this.open}>Login</Link>
        </li>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Login Below</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            {this.props.state.error ? (<div className="alert alert-danger animated fadeInDown" role="alert"><strong>Invalid Login:</strong> Credentials used not valid</div>) : ''}
            <div className="maven-input-container">
              <p className="maven-input-label">Email</p>
              <input
                type="text"
                className="maven-input"
                name='email'
                onChange={(e)=> {this.props.onChange(e, ['login', 'email'])}}
                value={this.props.state.login.email}
              />
            </div>
            <div className="maven-input-container">
              <p className="maven-input-label">Password</p>
              <input
                type="password"
                className="maven-input"
                name='password'
                onChange={(e)=> {this.props.onChange(e, ['login', 'password'])}}
                value={this.props.state.login.password}
              />
            </div>
            <a className="btn btn-primary btn-xl page-scroll green-background"
              onClick={()=>{this.props.submitLogin(this.props.state.login)}}>
              Login</a>
          </Modal.Body>
        </Modal>
      </ul>
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
    onChange: (input, section) => {
      dispatch(actions.onChange(input, section))
    },
    submitLogin: (login) => {
      dispatch(actions.submitLogin(login))
    },
  }
}

const LoginModalContainer = connect(
  mapStateToProps, mapDispatchToProps
)(LoginModal)

export default LoginModalContainer
