import React, { Component } from 'react';

// Presenational Components
import FormInput from '../../Components/FormInput';

class Companies extends Component {
  render() {
    const companyRows = this.props.state.companyResults.map((company, i) => {
      return (
        <tr key={i}>
          <td>{company.name}</td>
          <td>{`${company.User.first_name} ${company.User.last_name}`}</td>
          <td>{company.User.email}</td>
          <td className='text-center'>
            <button
              className="btn btn-default purple-background white-color no-text-transform green-background"
              onClick={()=>{this.props.ActivateCompany(company)}}
              type="submit">
              Activate Account
            </button>
          </td>
        </tr>
      )
    });
    return (
      <div className="row">
        <div className='col-md-12'>
          <div className="row padding-5">
            <div className="col-md-4">
              <FormInput
                Input={this.props.state.CompanyForm.CompanyName}
                path={['CompanyForm', 'CompanyName']}
                onChange={this.props.onChange}
              />
              <button
                className="btn btn-default purple-background white-color no-text-transform submitCompanyNameButton"
                onClick={()=>{this.props.SearchByName()}}
                type="submit">
                Search Company
              </button>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-4">
              <p className="profile-text text-muted results-side-header">Limit to </p>
              <FormInput
                Input={this.props.state.CompanyForm.LimitInput}
                path={['CompanyForm', 'LimitInput']}
                clearable={false}
                onSelect={(selected, path) => {this.props.onLimitSelect(selected, path)}}
              />
              <p className="profile-text text-muted results-side-header">Results</p>
            </div>
            <div className="col-md-3">
              { this.props.state.CompanyForm.page > 1 ? (<a className="platform-button filter-thin-button-page float-left" onClick={()=>this.props.previousPage()}>Previous Page</a>) : ''}
              <a className="platform-button filter-thin-button-page float-right" onClick={()=>this.props.nextPage()}>Next Page</a>
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr className='the-table platform-table-head'>
                <th>Company Name</th>
                <th>Owner Name</th>
                <th>Owner Email</th>
                <th>Activate Company</th>
              </tr>
            </thead>
            <tbody>
              {companyRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Companies;
