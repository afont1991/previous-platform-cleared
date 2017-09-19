import React, { Component } from 'react';
import FormInput from '../../../Components/FormInput'

class KeyContacts extends Component {

  render() {
    const formData = this.props.formData
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.contacts}
              path={['formData', 'contacts']}
              onSelect={this.props.onSelect}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default KeyContacts;
