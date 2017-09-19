import React, { Component } from 'react';
import { Popover, OverlayTrigger, Well } from 'react-bootstrap'
import { browserHistory } from 'react-router'

import CounterPartyCell from './CounterPartyCell'
import SummarySection from './SummarySection'

class SummaryListSection extends Component {
  render() {
    const matchRows = this.props.matches.map((match, i) => {
      const DescriptionPopover = (
        <Popover id="popover-trigger-hover-focus" title={match.Company.name}>
          {match.Company.description}
        </Popover>
      )
      let declineBlock = {
        DealId: this.props.DealId,
        CompanyId: match.Company.id,
        newStatuses: [
          {name: 'borrower_status', value: 'rejected'}
        ]
      }
      let rowStatus = 'pending';
      if(match.borrower_status === 'rejected' || match.do_not_contact === true || match.lender_status === 'rejected'){
        rowStatus = 'rejected'
      } else if(match.borrower_status === 'accepted' || match.lender_status === 'accepted'){
        rowStatus = 'matched'
      }
      let rowClass = `text-center match-list-row ${rowStatus}`
      return (
        <tr className={rowClass} key={i}>
          <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={DescriptionPopover}>
            <td className='hover-cell' onClick={()=>{browserHistory.push(`/platform/company/${match.Company.id}`)}}>
              <p className='text-muted no-margin-bottom line-divider'>{match.Company.name}</p>
              <p className='text-muted no-margin-bottom'>{match.Company.operating_type}</p>
            </td>
          </OverlayTrigger>
          <CounterPartyCell
            submitMatchUpdate={this.props.submitMatchUpdate}
            DealId={this.props.DealId}
            match={match}
            current={match.borrower_status}
            previous='first'
            rowStatus={rowStatus}
            buttonInfo={{
              acceptText: 'Accept',
              inviteText: 'Invite',
              inviteStatus: [{name: 'borrower_status', value: 'invited'}, {name: 'lender_status', value: 'pending'}],
              acceptStatus: [{name: 'borrower_status', value: 'accepted'}, {name: 'lender_status', value: 'accepted'}],
            }}
          />
          <CounterPartyCell
            submitMatchUpdate={this.props.submitMatchUpdate}
            DealId={this.props.DealId}
            match={match}
            current={match.teaser}
            previous='second'
            rowStatus={rowStatus}
            buttonInfo={{status: [ {name: 'teaser', value: true}]}}
          />
          <CounterPartyCell
            submitMatchUpdate={this.props.submitMatchUpdate}
            DealId={this.props.DealId}
            match={match}
            current={match.nda}
            previous={match.teaser}
            rowStatus={rowStatus}
            buttonInfo={{status: [ {name: 'nda', value: true}]}}
          />
          <CounterPartyCell
            submitMatchUpdate={this.props.submitMatchUpdate}
            DealId={this.props.DealId}
            match={match}
            current={match.cim}
            previous={match.nda}
            rowStatus={rowStatus}
            buttonInfo={{status: [ {name: 'cim', value: true}]}}
          />
          {/* <CounterPartyCell
            submitMatchUpdate={this.props.submitMatchUpdate}
            DealId={this.props.DealId}
            match={match}
            current={match.termsheet}
            previous={match.cim}
            rowStatus={rowStatus}
            buttonInfo={{status: [ {name: 'termsheet', value: true}]}}
          />
          <CounterPartyCell
            submitMatchUpdate={this.props.submitMatchUpdate}
            DealId={this.props.DealId}
            match={match}
            current={match.credit_committee}
            previous={match.termsheet}
            rowStatus={rowStatus}
            buttonInfo={{status: [ {name: 'credit_committee', value: true}]}}
          />
          <CounterPartyCell
            submitMatchUpdate={this.props.submitMatchUpdate}
            DealId={this.props.DealId}
            match={match}
            current={match.commitment_letter}
            previous={match.credit_committee}
            rowStatus={rowStatus}
            buttonInfo={{status: [ {name: 'commitment_letter', value: true}]}}
          /> */}
          {rowStatus === 'rejected' ? (
            <td>
              <p className='text-muted no-margin-bottom line-divider'>Match</p>
              <p className='text-muted no-margin-bottom'>Declined</p>
            </td>
          ) : (
            <td>
              <a
                className="btn btn-primary btn-xl page-scroll red-background match-list-btn"
                onClick={()=>{this.props.submitMatchUpdate(declineBlock)}}
              >Decline</a>
            </td>
          ) }
        </tr>
      )
    })
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-3">
              <Well className="summary-well margin-top-20">
                <p className="profile-text text-muted profile-section-header"><strong>Summary</strong></p>
                <SummarySection matches={this.props.matches} />
              </Well>
            </div>
            <div className="col-md-9 party-list">
              <p className="profile-text text-muted profile-section-header"><strong>Counterparty List</strong></p>
              <div className="table-responsive">
                <table className="table table-bordered the-table">
                  <thead>
                    <tr>
                      <th className='text-center'>Lender</th>
                      <th className='text-center'>Contacted</th>
                      <th className='text-center'>Teaser</th>
                      <th className='text-center'>NDA</th>
                      <th className='text-center'>CIM</th>
                      {/* <th className='text-center'>Term <br /> Sheet</th>
                      <th className='text-center'>Credit <br /> Committee</th>
                      <th className='text-center'>Commitment <br /> Letter</th> */}
                      <th className='text-center'>Decline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchRows}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SummaryListSection;
