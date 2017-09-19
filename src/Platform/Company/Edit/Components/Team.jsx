import React, { Component } from 'react';
import FormInput from '../../../Components/FormInput'
import urlParser from 'url-parse'

class Team extends Component {
  render() {
    const formData = this.props.formData.team;
    const newTeam = {
      first_name: formData.first_name.value,
      last_name: formData.last_name.value,
      email: formData.email.value,
      linkedin_url: formData.linkedin_url.value,
      title: formData.title.value,
    }
    let CurrentTeam;
    if(formData.teamArray.length !== 0){
      CurrentTeam = formData.teamArray.map((teamMember, i) => {
        let urlParsed = false
        if(teamMember.linkedin_url){
          urlParsed = urlParser(teamMember.linkedin_url)
          if(urlParsed.hostname === 'localhost' || urlParsed.hostname === 'www.debtmaven.com'){
            urlParsed.set('protocol', 'http')
            urlParsed.set('hostname', teamMember.linkedin_url)
            urlParsed.set('host', teamMember.linkedin_url)
            urlParsed.set('pathname', '')
          }
        }
        if(teamMember.deleted){
          return '';
        }
        return (
          <div className="row team-memember-box animated fadeInUp" key={i}>
            <div className="row">
              <div className="col-md-3">
                <p className="profile-text profile-main-text text-muted">{teamMember.first_name + ' ' + teamMember.last_name}</p>
                <p className="profile-text text-muted no-margin-bottom">{teamMember.title}</p>
                <p className="profile-text text-muted no-margin-bottom">{teamMember.email}</p>
              </div>
              <div className="col-md-2">
                <br />
                {urlParsed ? (<a href={urlParsed.href} target="_blank" ><i className="fa fa-2x fa-linkedin-square linkedin-blue sr-icons hover-icon"></i></a>) : ('')}
              </div>
              <div className='col-md-4'>
                <a className="platform-button red-background" onClick={() => this.props.removeItem(formData, 'teamArray', teamMember.id, ['formData', 'team'])}>Remove</a>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div className='container-fluid margin-top-20'>
        <div className="row">
          <div className="col-md-6">
            <FormInput
              Input={formData.first_name}
              path={['formData', 'team', 'first_name']}
              onChange={this.props.onChange}
            />
            <FormInput
              Input={formData.last_name}
              path={['formData', 'team', 'last_name']}
              onChange={this.props.onChange}
            />
            <FormInput
              Input={formData.email}
              path={['formData', 'team', 'email']}
              onChange={this.props.onChange}
            />
            <FormInput
              Input={formData.title}
              path={['formData', 'team', 'title']}
              onChange={this.props.onChange}
            />
            <FormInput
              Input={formData.linkedin_url}
              path={['formData', 'team', 'linkedin_url']}
              onChange={this.props.onChange}
            />
            <a className="platform-button green-background" onClick={() => this.props.addItem(formData, 'team', newTeam, 'teamArray')}>Add</a>
          </div>
          <div className="col-md-6">
            {CurrentTeam}
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
