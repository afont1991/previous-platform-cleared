import { connect } from 'react-redux'
import React, { Component } from 'react';

// Presenational Components
import LoadingWidget from '../../../Components/LoadingWidget'
import Nav from './Components/Navigation'
import Faq from './Components/Faq'
import Summary from './Components/Summary'
import DocumentCenter from './Components/DocumentCenter'
import Termsheet from './Components/Termsheet'
import Messages from './Components/Messages'

// Actions
import * as actions from './Actions';

class LenderManager extends Component {

  componentWillMount(){
    this.props.init(this.props.DealId)
  }

  render() {
    switch (this.props.state.status) {
      case 'pending':
      case 'error':
        return (<LoadingWidget />)
      default:
        let CurrentSection;
        const State = this.props.state
        const MatchData = State.MatchData
        switch (this.props.state.currentSection) {
          case 'documents':
            CurrentSection = (<DocumentCenter MatchData={MatchData} />)
            break;
          case 'faq':
            CurrentSection = (<Faq MatchData={MatchData} />)
            break;
          case 'messages':
            CurrentSection = (
              <Messages
                MatchData={MatchData}
                DealId={this.props.DealId}
                messages={State.messages}
                message_toggle={State.message_toggle}
                newMessage={State.newMessage}
                onChange={this.props.onChange}
                getMessages={this.props.getMessages}
                sendMessage={this.props.sendMessage}
              />
            )
            break;
          case 'termsheet':
            CurrentSection = (<Termsheet />)
            break;
          default:
            CurrentSection = (
              <Summary MatchData={MatchData} />
            )
        }
        return (
          <div className="container-fluid">
            <Nav currentSection={this.props.state.currentSection} changeSection={this.props.changeSection} />
            {CurrentSection}
          </div>
        )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.LenderManager
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeSection: (nextSectionName) => {
      dispatch(actions.changeSection(nextSectionName))
    },
    init: (DealId) => {
      dispatch(actions.init(DealId))
    },
    getMessages: (DealId, CompanyId) => {
      dispatch(actions.getMessages(DealId, CompanyId))
    },
    onChange: (input, path) => {
      dispatch(actions.onChange(input, path))
    },
    sendMessage: (message) => {
      dispatch(actions.sendMessage(message))
    }
  }
}

const LenderManagerContainer = connect(
  mapStateToProps, mapDispatchToProps
)(LenderManager)

export default LenderManagerContainer
