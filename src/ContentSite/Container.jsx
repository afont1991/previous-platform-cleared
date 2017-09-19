import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './Navigation/NavContainer';
import Footer from './Footer/Footer';
import LoadingWidget from '../Platform/Components/LoadingWidget'

import * as actions from './Actions'


class Main extends Component {
  componentWillMount(){
    this.props.init()
  }
  componentWillUnmount(){
    this.props.init(true)
  }
  render() {
    if(this.props.state.status === 'pending'){
      return (<LoadingWidget />)
    } else {
      return (
        <div>
          <Nav loggedIn={this.props.state.loggedIn} logout={this.props.logout}/>
          {this.props.children}
          <Footer />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.Homepage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: (reset) => {
      dispatch(actions.init(reset))
    },
    logout: () => {
      dispatch(actions.logout())
    },
  }
}

const MainContentSite = connect(
  mapStateToProps, mapDispatchToProps
)(Main)

export default MainContentSite
