import React, { Component } from 'react';
import urlParser from 'url-parse'

class PrimaryContactsSidebar extends Component {
  render() {
    const keyContacts = this.props.profileData.keyContacts;
    const TeamBoxes = keyContacts.map((teamMember, i) => {
      let urlParsed = urlParser(teamMember.Team.linkedin_url)
      if(urlParsed.hostname === 'localhost' || urlParsed.hostname === 'platform.debtmaven.com'){
        urlParsed.set('protocol', 'http')
        urlParsed.set('hostname', teamMember.Team.linkedin_url)
        urlParsed.set('host', teamMember.Team.linkedin_url)
        urlParsed.set('pathname', '')
      }
      return (
        <div className="row team-memember-box" key={i}>
          <div className="row">
            <div className="col-md-9">
              <p className="profile-text profile-main-text text-muted">{`${teamMember.Team.first_name} ${teamMember.Team.last_name}`}</p>
              <p className="profile-text text-muted no-margin-bottom">{teamMember.Team.title}</p>
              <p className="profile-text text-muted no-margin-bottom">{teamMember.Team.email}</p>
            </div>
            <div className="col-md-3">
              <br />
              <a href={urlParsed.href} target="_blank" ><i className="fa fa-2x fa-linkedin-square linkedin-blue sr-icons hover-icon"></i></a>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="profile-side-bar-section">
        <p className="profile-text text-muted profile-section-header"><strong>Primary Contacts</strong></p>
        {TeamBoxes}
      </div>
    );
  }
}

export default PrimaryContactsSidebar;
