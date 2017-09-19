import React, { Component } from 'react';
import moment from 'moment'

class CounterPartyCell extends Component {
  render() {
    // Default button text is sent unless its part of object
    let matchInfo = {
      DealId: this.props.DealId,
      CompanyId: this.props.match.Company.id,
      newStatuses: this.props.buttonInfo.status,
    }
    const match = this.props.match
    const previous = this.props.previous
    const current = this.props.current
    const waitIcon = (<i className="fa fa-2x fa-ban sr-icons match-list-icon"></i>);
    const sentIcon = (
      <svg
        className="checkmark-small"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52">
        <circle
          className="checkmark__circle"
          cx="26" cy="26" r="25" fill="none"
        />
        <path
          className="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
      //<i className="fa fa-2x fa-check sr-icons success-green match-list-icon"></i>
    );
    let CellButton = waitIcon
    let updateButton =
      (
        <a className="btn btn-primary btn-xl page-scroll purple-background match-list-btn" onClick={()=>{this.props.submitMatchUpdate(matchInfo)}} >
          {this.props.buttonInfo.text ? this.props.buttonInfo.text : 'Send'}
        </a>
      );
    if(previous === 'first' && this.props.rowStatus !== 'rejected'){
      let firstText, firstClass;
      if(match.lender_status === 'requested'){
        matchInfo.newStatuses = this.props.buttonInfo.acceptStatus
        firstText = this.props.buttonInfo.acceptText
        firstClass = "btn btn-primary btn-xl page-scroll green-background match-list-btn"
      } else {
        matchInfo.newStatuses = this.props.buttonInfo.inviteStatus
        firstText = this.props.buttonInfo.inviteText
        firstClass = "btn btn-primary btn-xl page-scroll purple-background match-list-btn"
      }
      updateButton = (
        <a className={firstClass} onClick={()=>{this.props.submitMatchUpdate(matchInfo)}} >
          {firstText}
        </a>
      )
    }
    if(previous === 'first' && this.props.rowStatus !== 'rejected'){
      if(match.borrower_status === 'rejected' || match.lender_status === 'rejected' || match.borrower_status === 'do_not_contact'){
        CellButton = waitIcon
      } else if(match.borrower_status === 'accepted' || match.lender_status === 'accepted' || match.borrower_status === 'invited'){
        CellButton = sentIcon
      } else {
        CellButton = updateButton
      }
    } else if(previous === 'second' && this.props.rowStatus !== 'rejected'){
      if(match.borrower_status === 'accepted' || match.lender_status === 'accepted'){
        if(current === false || current === null){
          CellButton = updateButton
        } else {
          CellButton = sentIcon
        }
      }
    } else if(previous === true && this.props.rowStatus !== 'rejected'){
      if(current === true){
        CellButton = sentIcon
      } else {
        CellButton = updateButton
      }
    }
    return (
      <td>
        {CellButton}
        <p className='text-muted no-margin-bottom'>{moment(match.updatedAt).format('MM/DD/YY')}</p>
      </td>
    )
  }
}

export default CounterPartyCell;
