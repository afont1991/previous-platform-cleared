import { connect } from 'react-redux'
import React, { Component } from 'react';

// Presenational Components
import LoadingWidget from '../../Components/LoadingWidget'
import Results from './Components/Results'

// Actions
import * as actions from './Actions';

class AutoDealList extends Component {
  componentWillMount(){
    this.props.init()
  }
  render() {
    const State = this.props.state
    if(State.status === 'pending'){
      return (<LoadingWidget />)
    } else if(State.status === 'error'){
      return (<LoadingWidget />)
    } else {
      return (
        <Results
          results={State.DealResults}
          CompanyId={this.props.CompanyId}
          submitMatchRequest={this.props.submitMatchRequest}
        />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.AutoDealList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(actions.init())
    },
    submitMatchRequest: (matchInfo) => {
      dispatch(actions.submitMatchRequest(matchInfo))
    }
  }
}

const AutoDealListContainer = connect(
  mapStateToProps, mapDispatchToProps
)(AutoDealList)

export default AutoDealListContainer
