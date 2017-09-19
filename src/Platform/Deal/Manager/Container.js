import { connect } from 'react-redux'
import React, { Component } from 'react';

// Presenational Components
import LoadingWidget from '../../Components/LoadingWidget'
import Borrower from './Borrower/Container'
import Lender from './Lender/Container'

// Actions
import * as actions from './Actions';

class DealManager extends Component {
  componentWillMount(){
    this.props.init();
  }
  render() {
    if(this.props.state.status === 'pending'){
      return (<LoadingWidget />)
    } else {
      return (
        <div className="container-fluid">
          {this.props.state.userInfo.type === 'lender' ? (<Lender DealId={this.props.params.DealId} />) : (<Borrower DealId={this.props.params.DealId} />)}
        </div>
      );      
    }
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.DealManager
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(actions.init())
    },
  }
}

const DealManagerContainer = connect(
  mapStateToProps, mapDispatchToProps
)(DealManager)

export default DealManagerContainer
