import { connect } from 'react-redux'
import React, { Component } from 'react';

// Presenational Components
import LoadingWidget from '../../../Components/LoadingWidget'
import Nav from './Components/Navigation'

// Sections
import SummaryListSection from './Components/SummaryListSection'
import MatchList from './Components/MatchList'
import Messages from './Components/Messages'
import TermsheetMatrix from './Components/TermsheetMatrix'
import AutoLenderList from '../../../Search/AutoLenderList/Container'

// Actions
import * as actions from './Actions';


class BorrowerManager extends Component {
  componentWillMount() {
    this.props.init(this.props.DealId)
  }
  render() {
    let CurrentSection;
    switch (this.props.state.status) {
      case 'pending':
      case 'error':
        return (<LoadingWidget />)
      default:
        const State = this.props.state
        switch (this.props.state.currentSection) {
          case 'list':
            CurrentSection = (<MatchList
              matches={State.matches}
              CurrentMessageId={State.CurrentMessageId}
            />)
            break;
          case 'termsheet_matrix':
            CurrentSection = (<TermsheetMatrix />)
            break;
          case 'messages':
            CurrentSection = (
              <Messages
                DealId={this.props.DealId}
                matches={State.matches}
                messages={State.messages}
                message_toggle={State.message_toggle}
                newMessage={State.newMessage}
                onChange={this.props.onChange}
                CurrentMessageId={State.CurrentMessageId}
                getMessages={this.props.getMessages}
                sendMessage={this.props.sendMessage}
              />)
            break;
          case 'search':
            CurrentSection = (<AutoLenderList DealId={this.props.DealId} />)
            break;
          default:
            CurrentSection = (<SummaryListSection
              submitMatchUpdate={this.props.submitMatchUpdate}
              DealId={this.props.DealId}
              matches={State.matches}
            />)
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
    state: state.BorrowerManager
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeSection: (nextSectionName) => {
      dispatch(actions.changeSection(nextSectionName))
    },
    submitMatchUpdate: (matchInfo) => {
      dispatch(actions.submitMatchUpdate(matchInfo))
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

const BorrowerManagerContainer = connect(
  mapStateToProps, mapDispatchToProps
)(BorrowerManager)

export default BorrowerManagerContainer
