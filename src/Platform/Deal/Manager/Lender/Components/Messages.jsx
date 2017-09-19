import React, { Component } from 'react';
import FormInput from '../../../../Components/FormInput'
import moment from 'moment'

class Messages extends Component {
  constructor(props){
    super(props)
    this.submit = this.submit.bind(this)
  }
  componentWillUpdate(nextProps){
    if(nextProps.message_toggle === true){
      nextProps.getMessages(this.props.DealId, this.props.MatchData.CompanyId)
    }
  }
  componentDidMount(){
    var objDiv = document.getElementById("message_container");
    objDiv.scrollTop = objDiv.scrollHeight;
    if(this.props.message_toggle === true){
      this.props.getMessages(this.props.DealId, this.props.MatchData.CompanyId)
    }
  }
  componentWillMount(){
    window.addEventListener("keypress", this.submit);
  }
  componentWillUnmount(){
    window.removeEventListener("keypress", this.submit);
  }
  submit(e) {
    if(e.key === 'Enter'){
      this.props.sendMessage({
        sender: 'lender',
        text: this.props.newMessage.value,
        DealId: this.props.DealId,
        CompanyId: this.props.MatchData.CompanyId,
      })
    }
  }
  render() {
    const messages = this.props.messages.map((message, i) => {
      let outerClass = "sent-message-container animated fadeInRight"
      let innerClass = "sent-inner-message-container"
      if(message.sender === 'lender'){
        outerClass = "recieved-message-container"
        innerClass = "recieved-inner-message-container animated fadeInLeft"
      }
      return (
        <div className={outerClass} key={i}>
          <div className={innerClass}>
            <p className="message-date text-muted" >{moment(message.createdAt).format('MM/DD/YYYY - h:MM a')}</p>
            <p className="text-muted">{message.text}</p>
          </div>
        </div>
      )
    })
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <p className="profile-text text-muted profile-section-header"><strong>Messages</strong></p>
            <div className="row">
              <div className="col-md-12 no-left-right-padding">
                <div className="main-message-container" id="message_container">
                  {messages.length === 0 ? (
                    (<p className="profile-text text-muted header-font text-center"><strong>No Messages</strong></p>)
                  ) : (messages)}
                </div>
              </div>
            </div>
            <div className="row messages-row">
              <div className="col-md-8">
                <FormInput
                  Input={this.props.newMessage}
                  path={['newMessage']}
                  onChange={this.props.onChange}
                />
              </div>
              <div className="offset-col-md-4 reply">
                <a
                  className="platform-button green-background no-margin-top"
                  onClick={() => {
                    this.props.sendMessage({
                      sender: 'lender',
                      text: this.props.newMessage.value,
                      DealId: this.props.DealId,
                      CompanyId: this.props.MatchData.CompanyId,
                    })
                  }}
                >Reply</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};


export default Messages;
