import { connect } from 'react-redux'
import React, { Component } from 'react';
import Cookies from 'js-cookie'

// Presenational Components
import LoadingWidget from '../Components/LoadingWidget'

// Actions
import * as actions from './Actions';

class Messenger extends Component {
  componentDidMount(){
    if(this.props.state.initialized === false){
      console.log('....');
      this.props.getDealMessages(this.props.DealId, Cookies.getJSON('user'));
    }
  }
  render() {
    if(this.props.state.status === 'pending' && false){
      return (<LoadingWidget />);
    } else {
      return (
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12 no-left-right-padding">
                <div className="main-message-container">
                  <div className="recieved-message-container">
                    <div className="recieved-inner-message-container animated fadeInLeft">
                      <p className="message-date text-muted" >12/12/17 - 2:23PM </p>
                      <p className="text-muted">Hey, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                  </div>
                  <div className="sent-message-container animated fadeInRight">
                    <div className="sent-inner-message-container">
                      <p className="message-date text-muted" >12/12/17 - 2:23PM </p>
                      <p className="text-muted">Hey, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <input type="email" className="form-control find-message-input" /><button className="btn btn-default purple-background white-color" type="submit">Reply</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.Messenger
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDealMessages: (DealId, UserInfo) => {
      dispatch(actions.getDealMessages(DealId, UserInfo))
    },
  }
}

const MessengerContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Messenger)

export default MessengerContainer
