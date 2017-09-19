import React, { Component } from 'react'
import FormInput from '../../../Components/FormInput'

class UserSection extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4 col-md-offset-2">
              <FormInput
                Input={this.props.formData.newUser.first_name}
                path={['formData', 'newUser', 'first_name']}
                onChange={this.props.onChange}
              />
            </div>
            <div className="col-md-4">
              <FormInput
                Input={this.props.formData.newUser.last_name}
                path={['formData', 'newUser', 'last_name']}
                onChange={this.props.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-md-offset-2">
              <FormInput
                Input={this.props.formData.newUser.email}
                path={['formData', 'newUser', 'email']}
                onChange={this.props.onChange}
              />
            </div>
            <div className="col-md-4">
              <FormInput
                Input={this.props.formData.newUser.password}
                path={['formData', 'newUser', 'password']}
                onChange={this.props.onChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSection;
