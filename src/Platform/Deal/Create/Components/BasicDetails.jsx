import React, { Component } from 'react';
import FormInput from '../../../Components/FormInput'

class BasicDetails extends Component {
  render() {
    const formData = this.props.formData
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.title}
              path={['formData', 'title']}
              onChange={this.props.onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.headline}
              path={['formData', 'headline']}
              onChange={this.props.onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.private_mode}
              path={['formData', 'private_mode']}
              onSelect={this.props.onSelect}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.sponsored}
              path={['formData', 'sponsored']}
              onSelect={this.props.onSelect}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.blind_sponsor}
              path={['formData', 'blind_sponsor']}
              onSelect={this.props.onSelect}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.industries}
              path={['formData', 'industries']}
              onSelect={this.props.onSelect}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.founded}
              path={['formData', 'founded']}
              onChange={this.props.onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.region}
              path={['formData', 'region']}
              onSelect={this.props.onSelect}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.status}
              path={['formData', 'status']}
              onSelect={this.props.onSelect}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.termsheet_date}
              path={['formData', 'termsheet_date']}
              handleDate={this.props.handleDate}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.description}
              path={['formData', 'description']}
              onChange={this.props.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BasicDetails;
