import React, { Component } from 'react';

class SummarySection extends Component {
  render() {
    let LenderCount = 0
    let ApprovedForContact = 0
    let TeaserSent = 0
    let NdasExecuted = 0
    let CimsSent = 0
    let DoNotContact = 0
    let Declined = 0
    this.props.matches.forEach((match) => {
      LenderCount += 1;
      if(match.borrower_status === 'accepted' || match.lender_status === 'accepted'){
        ApprovedForContact += 1
      }
      if(match.teaser === true){
        TeaserSent += 1
      }
      if(match.nda === true){
        NdasExecuted += 1
      }
      if(match.cim === true){
        CimsSent += 1
      }
      if(match.do_not_contact === true){
        DoNotContact += 1
      }
      if(match.declined === true){
        Declined += 1
      }
      if(match.borrower_status === 'rejected' || match.lender_status === 'rejected'){
        Declined += 1
      }
    });
    return (
      <div className='row'>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12 text-left">
              <p className="text-muted no-margin-top no-margin-bottom">
                Lenders
                <span className="float-right">{LenderCount}</span>
              </p>
              <p className="text-muted no-margin-top no-margin-bottom">
                Approved for contact
                <span className="float-right">{ApprovedForContact}</span>
              </p>
              <p className="text-muted no-margin-top no-margin-bottom">
                Teaser sent
                <span className="float-right">{TeaserSent}</span>
              </p>
              <p className="text-muted no-margin-top no-margin-bottom">
                NDAs executed
                <span className="float-right">{NdasExecuted}</span>
              </p>
              <p className="text-muted no-margin-top no-margin-bottom">
                CIMs sent
                <span className="float-right">{CimsSent}</span>
              </p>
              <p className="text-muted no-margin-top no-margin-bottom">
                Do not contact
                <span className="float-right">{DoNotContact}</span>
              </p>
              <p className="text-muted no-margin-top no-margin-bottom">
                Declined
                <span className="float-right">{Declined}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SummarySection;
