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
      nextProps.getMessages(this.props.DealId, this.props.CurrentMessageId)
    }
  }
  componentDidMount(){
    var objDiv = document.getElementById("message_container");
    objDiv.scrollTop = objDiv.scrollHeight;
    if(this.props.message_toggle === true){
      this.props.getMessages(this.props.DealId, this.props.CurrentMessageId)
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
        sender: 'borrower',
        text: this.props.newMessage.value,
        DealId: this.props.DealId,
        CompanyId: this.props.CurrentMessageId,
      })
    }
  }
  render() {
    const matches = this.props.matches.map((match, i) =>{
      let messageClass = 'message-item';
      if(match.Company.id === this.props.CurrentMessageId){
        messageClass = 'message-item active';
      }
      return (
        <div className={messageClass} key={i} onClick={()=>{this.props.getMessages(this.props.DealId, match.Company.id)}}>
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="profile-text text-muted no-margin-bottom"><strong>{match.Company.name}</strong></p>
            </div>
          </div>
        </div>
      )
    });
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
          <div className="col-md-3 animated fadeIn available-messages-container">
            <p className="profile-text text-muted profile-section-header"><strong>Lenders</strong></p>
            {matches}
          </div>
          <div className="col-md-9">
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
              <div className="col-md-8 col-xs-12">
                <FormInput
                  Input={this.props.newMessage}
                  path={['newMessage']}
                  onChange={this.props.onChange}
                />
              </div>
              <div className="offset-col-md-4 reply">
                <a
                  className="platform-button no-margin-top mini-button mobile-top"
                  onClick={() => {
                    this.props.sendMessage({
                      sender: 'borrower',
                      text: this.props.newMessage.value,
                      DealId: this.props.DealId,
                      CompanyId: this.props.CurrentMessageId,
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
