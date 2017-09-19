import { connect } from 'react-redux'
import React, { Component } from 'react';

// Presenational Components
import LoadingWidget from '../../Components/LoadingWidget'
import Results from './Components/Results'

// Actions
import * as actions from './Actions';

class AutoLenderList extends Component {
  componentWillMount(){
    this.props.init(this.props.DealId)
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
          results={State.LenderResults}
          DealId={this.props.DealId}
          submitMatchRequest={this.props.submitMatchRequest}
        />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.AutoLenderList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: (DealId) => {
      dispatch(actions.init(DealId))
    },
    submitMatchRequest: (matchInfo) => {
      dispatch(actions.submitMatchRequest(matchInfo))
    }
  }
}

const AutoLenderListContainer = connect(
  mapStateToProps, mapDispatchToProps
)(AutoLenderList)

export default AutoLenderListContainer
