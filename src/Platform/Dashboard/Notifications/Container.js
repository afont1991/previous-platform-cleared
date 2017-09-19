import { connect } from 'react-redux'
import React, { Component } from 'react';
import moment from 'moment';

// Presenational Components
import LoadingWidget from '../../Components/LoadingWidget';
import {Well} from 'react-bootstrap';
import {Link} from 'react-router';

// Actions
import * as actions from './Actions';

class Notifications extends Component {
  componentWillMount(){
    if(this.props.state.notifications.length === 0){
      this.props.getNotifications();
    }
  }
  componentWillUnmount(){
    this.props.unmount()
  }
  render() {
    if(this.props.state.status === 'pending'){
      return (<LoadingWidget />);
    } else {
      const notifications = this.props.state.notifications.filter((notification)=> { return !notification.dismissed }).map((notification, i) => {
        const formatDate = moment(notification.createdAt).format("ddd, hA");
        let typeText;
        switch (notification.type) {
          case 'message':
            typeText = 'Message From';
            break;
          case 'deal':
            typeText = 'Deal Updated';
            break;
          case 'new match':
            typeText = 'Deal Match';
            break;
          case 'match accepted':
            typeText = 'Match Accepted';
            break;
          case 'match rejected':
            typeText = 'Match Rejected';
            break;
          case 'match updated':
            typeText = 'Match Updated';
            break;
          case 'match invited':
            typeText = 'Invited to Deal';
            break;
          default:
            typeText = "Notification";
        }
        return (
          <p className="profile-text profile-main-text text-muted no-margin-bottom" key={i}>
            <span className="black-text"><strong>{typeText}</strong></span>: <Link to={notification.url} onClick={()=>{ this.props.dismiss(notification.id, true) }} >{notification.message} </Link><span className="notification-date" >{formatDate} </span>
            <svg
              onClick={()=>{ this.props.dismiss(notification.id) }}
              className="checkmark-dismiss"
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
            <span className="text-muted dismiss-text"> Dismiss</span>
          </p>
        );
      });
      return (
        <div>
          {notifications.length !== 0 ? (
            <Well className="notification-well">
              <p className="profile-text text-muted profile-section-header"><strong>Notifications</strong></p>
              {notifications.length !== 0 ? notifications : (<p className="profile-text text-muted header-font text-center"><strong>Empty</strong></p>)}
            </Well>
          ) : (null)}
        </div>
      );
    }
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.DashboardNotifications
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: () => {
      dispatch(actions.getNotifications())
    },
    dismiss: (NotiId, skipUpdate) => {
      dispatch(actions.dismiss(NotiId, skipUpdate))
    },
    unmount: () => {
      dispatch(actions.unmount())
    }
  }
}

const NotificationContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Notifications)

export default NotificationContainer
