import React, { Component } from 'react';
import Navigation from './Navigation/NavigationComponent'
import { success } from 'react-notification-system-redux';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import LoadingWidget from './Components/LoadingWidget'

import TermsModal from './Components/TermsModal'
import InitModal from './Components/InitModal'

import * as actions from './Actions';

class Platform extends Component {
  componentWillMount() {
    this.props.authCheck()
  }
  // componentDidMount(){
  //   this.props.authCheck()
  // }
  componentWillUpdate(nextProps) {
    if(!nextProps.state.authStatus) {
      browserHistory.push(`/`);
    }

    if(nextProps.state.authStatus.user) {
      if(false && nextProps.state.termsModal === false && nextProps.state.authStatus.user.signed_terms === false) {
        nextProps.toggleTerms(true)
      }
    }
  }

  render() {
    let contentContainerClass = "dashboard-body"
    if(
      this.props.location.pathname === "/platform/deal/search" ||
      this.props.location.pathname === "/platform/company/search" ||
      this.props.location.pathname === "/platform/save/search" ||
      (this.props.location.pathname.indexOf("/platform/company/search/saved") !== -1) ||
      (this.props.location.pathname.indexOf("/platform/deal/search/saved") !== -1)
    ){
			contentContainerClass = "dashboard-body no-margin-top"
		}
    if(this.props.state.authStatus.user){
      return (
          <div>
            {this.props.state.alert ? (
              <div className="alert alert-danger animated fadeInLeft" role="alert">{this.props.state.alert.message}</div>
            ) : ''}
            <Navigation isAdmin={this.props.state.authStatus.user.admin} location={this.props.location} platformType={this.props.state.authStatus.user.type} onChange={this.props.onChange} SearchInput={this.props.state.SearchInput} logout={this.props.logout} />
            <div className={contentContainerClass}>
              {React.cloneElement(this.props.children, {
                successNotification: this.props.successNotification,
              })}
            </div>
            <TermsModal agree={this.props.agree} logout={this.props.logout} open={this.props.state.termsModal} />
            <InitModal close={() => {this.props.state.toggleInit(false) }} open={this.props.state.InitModal} />
          </div>
      );
    } else {
      return <LoadingWidget />
    }
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.Platform,
    notifications: state.notifications,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearNotifications: () => {
      dispatch(actions.clearNotifications())
    },
    refreshAuth: () => {
      dispatch(actions.refreshAuth())
    },
    unsetRefresh: () => {
      dispatch(actions.unsetRefresh())
    },
    logout: () => {
      dispatch(actions.logout())
    },
    setAlert: (alertMessage) => {
      dispatch(actions.setAlert(alertMessage))
    },
    unsetAlert: () => {
      dispatch(actions.unsetAlert())
    },
    authCheck: () => {
      dispatch(actions.authCheck())
    },
    onChange: (input, path) => {
      dispatch(actions.onChange(input, path))
    },
    toggleTerms: (toggle) => {
      dispatch(actions.toggleTerms(toggle))
    },
    agree: () => {
      dispatch(actions.agree())
    },
    toggleInit: (toggle) => {
      dispatch(actions.toggleInit(toggle))
    },
    successNotification: (opts) =>{
      dispatch(success(opts))
    },
  }
}

const PlatformContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Platform)

export default PlatformContainer
