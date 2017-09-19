import React, { Component } from 'react';
import FormInput from '../../../Components/FormInput'

class BasicDetails extends Component {
  render() {
    const formData = this.props.formData.key_metrics;
    return (
      <div className='container-fluid margin-top-20'>
        <div className="row">
          <div className="col-md-6">
            <FormInput
              Input={formData.open_fund}
              path={['formData', 'key_metrics', 'open_fund']}
              onChange={this.props.onChange}
            />
          </div>
          <div className="col-md-6">
            <FormInput
              Input={formData.aum}
              path={['formData', 'key_metrics', 'aum']}
              onChange={this.props.onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormInput
              Input={formData.active_investments}
              path={['formData', 'key_metrics', 'active_investments']}
              onChange={this.props.onChange}
            />
          </div>
          <div className="col-md-6">
            <FormInput
              Input={formData.dry_powder}
              path={['formData', 'key_metrics', 'dry_powder']}
              onChange={this.props.onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-right">
            <a className="platform-button" onClick={() => this.props.changeSection(formData, 'key_metrics', 'team')}>Next</a>
          </div>
        </div>
      </div>
    );
  }
}

export default BasicDetails;
