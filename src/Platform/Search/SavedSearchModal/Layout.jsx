import React, { Component } from 'react';
import FormInput from '../../Components/FormInput'

// import * as actions from './Actions';

class Layout extends Component {
  render() {
    console.log(this.props)
    const formData = this.props.formData.formData
    return (
      <div className="row">
        <div className="col-xs-2">
        </div>
        <div className="col-xs-6">
          <FormInput
            Input={formData.name}
            path={['formData', 'name']}
            onChange={this.props.onChange}
          />
        </div>
        <div className="col-xs-3">
          <a className="platform-button filter-thin-button-page float-right no-margin-top" onClick={()=>this.props.saveFilters(formData.name, this.props.type, this.props.filters)}>Submit</a>
        </div>
      </div>
    );
  }
}

export default Layout
