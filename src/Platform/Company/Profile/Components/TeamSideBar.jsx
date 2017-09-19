import React, { Component } from 'react';
import urlParser from 'url-parse'

class TeamSideBar extends Component {
  render() {
    const companyTeam = this.props.profileData.team;
    const TeamBoxes = companyTeam.map((teamMember, i) => {
      let urlParsed
      if(teamMember.linkedin_url){
        urlParsed = urlParser(teamMember.linkedin_url)
        if(urlParsed.hostname === 'localhost' || urlParsed.hostname === 'platform.debtmaven.com'){
          urlParsed.set('protocol', 'http')
          urlParsed.set('hostname', teamMember.linkedin_url)
          urlParsed.set('host', teamMember.linkedin_url)
          urlParsed.set('pathname', '')
        }
      }
      return (
        <div className="row team-memember-box" key={i}>
          <div className="row">
            <div className="col-md-9">
              <p className="profile-text profile-main-text text-muted">{teamMember.first_name + ' ' + teamMember.last_name}</p>
              <p className="profile-text text-muted no-margin-bottom">{teamMember.title}</p>
              <p className="profile-text text-muted no-margin-bottom">{teamMember.email}</p>
            </div>
            <div className="col-md-3">
              <br />
              <a href={teamMember.linkedin_url ? urlParsed : ''} target="_blank" ><i className="fa fa-2x fa-linkedin-square linkedin-blue sr-icons hover-icon"></i></a>
            </div>
          </div>
        </div>
      );
    });
    if(TeamBoxes.length > 0){
      return (
        <div className="profile-side-bar-section">
          <p className="profile-text text-muted profile-section-header"><strong>Key Contacts</strong></p>
          {TeamBoxes}
        </div>
      );
    } else {
      return (<div className="line-divider"></div>)
    }
  }
}

export default TeamSideBar;
