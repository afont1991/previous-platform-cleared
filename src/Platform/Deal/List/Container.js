import { connect } from 'react-redux'
import React, { Component } from 'react'

// Presenational Components
import LoadingWidget from '../../Components/LoadingWidget';
import LenderDealList from './Components/LenderDealList';
import BorrowerDealList from './Components/BorrowerDealList';

// Actions
import * as actions from './Actions';

class DealList extends Component {
  componentWillMount(){
    this.props.getActiveDeals();
  }
  render() {
    if(this.props.state.status === 'pending'){
      return (<LoadingWidget />);
    } else {
      const userInfo = this.props.state.userInfo
      let currentList = (<LenderDealList deals={this.props.state.dealList} submitMatchUpdate={this.props.submitMatchUpdate} />);
      if(userInfo.type === 'borrower'){
        currentList = (<BorrowerDealList deals={this.props.state.dealList}/>);
      }
      return (
        <div className="row">
          <div className="col-md-12">
            {currentList}
          </div>
        </div>
      );
    }
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.DealList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getActiveDeals: (type) => {
      dispatch(actions.getActiveDeals(type))
    },
    submitMatchUpdate: (matchInfo) => {
      dispatch(actions.submitMatchUpdate(matchInfo))
    },
  }
}

const DealListContainer = connect(
  mapStateToProps, mapDispatchToProps
)(DealList)

export default DealListContainer
