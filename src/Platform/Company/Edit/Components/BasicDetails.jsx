import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import FormInput from '../../../Components/FormInput'
import UserSection from './UserSection'

class BasicDetails extends Component {
  render() {
    const logoHolder = require('../../../../Assets/images/logo-holder.png');
    const formData = this.props.formData.overview;
    const onDrop = this.props.onDrop;
    return (
      <div className='container-fluid margin-top-20'>
        {this.props.formData.newUser ? (
          <UserSection
            formData={this.props.formData}
            onChange={this.props.onChange}
            onSelect={this.props.onSelect}
          />
        ) : '' }
        <div className="row">
          <div className="col-md-6">
            <FormInput
              Input={formData.platform_type}
              path={['formData', 'overview', 'platform_type']}
              onSelect={this.props.onSelect}
            />
          </div>
          <div className="col-md-6">
            <FormInput
              Input={formData.operating_type}
              path={['formData', 'overview', 'operating_type']}
              onSelect={this.props.onSelect}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormInput
              Input={formData.company_name}
              path={['formData', 'overview', 'company_name']}
              onChange={this.props.onChange}
            />
          </div>
          <div className="col-md-6">
            <FormInput
              Input={formData.company_url}
              path={['formData', 'overview', 'company_url']}
              onChange={this.props.onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormInput
              Input={formData.founding_year}
              path={['formData', 'overview', 'founding_year']}
              onChange={this.props.onChange}
            />
          </div>
          <div className="col-md-2">
            <FormInput
              Input={formData.country}
              path={['formData', 'overview', 'country']}
              onSelect={this.props.onSelect}
            />
          </div>
          <div className="col-md-2">
            <FormInput
              Input={formData.state}
              path={['formData', 'overview', 'state']}
              onSelect={this.props.onSelect}
            />
          </div>
          <div className="col-md-2">
            <FormInput
              Input={formData.city}
              path={['formData', 'overview', 'city']}
              onChange={this.props.onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormInput
              Input={formData.open_fund}
              path={['formData', 'overview', 'open_fund']}
              onChange={this.props.onChange}
            />
          </div>
          <div className="col-md-3">
            <FormInput
              Input={formData.aum}
              path={['formData', 'overview', 'aum']}
              onChange={this.props.onChange}
            />
          </div>
          <div className="col-md-3">
            <FormInput
              Input={formData.active_investments}
              path={['formData', 'overview', 'active_investments']}
              onSelect={this.props.onSelect}
            />
          </div>
        </div>

        {this.props.formData.overview.platform_type.selectedOption.value === 'lender' ? (
          <div className="row">
            {/* <div className="col-md-6">
              <FormInput
                Input={formData.lockbox}
                path={['formData', 'overview', 'lockbox']}
                onSelect={this.props.onSelect}
              />
            </div>
            <div className="col-md-3">
              <FormInput
                Input={formData.yield_minimum}
                path={['formData', 'overview', 'yield_minimum']}
                onChange={this.props.onChange}
              />
            </div>
            <div className="col-md-3">
              <FormInput
                Input={formData.cash_coupon}
                path={['formData', 'overview', 'cash_coupon']}
                onChange={this.props.onChange}
              />
            </div> */}
          </div>
        ) : ('') }

        <div className="row">
          <div className='col-md-3'>
            <div className="logo-upload-section">
              <label className="input-label text-muted">New Logo</label>
              <img src={formData.company_logo.url !== null ? formData.company_logo.url : logoHolder} alt="..." className="img-rounded profile-logo"  />
            </div>
          </div>
          <div className='col-md-3'>
            <div className="form-group">
              <label className="input-label text-muted">Upload New Logo</label>
              <Dropzone accept='image/*' onDrop={(acceptedFiles, rejectedFiles)=>{onDrop(acceptedFiles, rejectedFiles, ['formData', 'overview', 'company_logo']) } }>
                <div className="input-label text-muted header-font dropzone-box">Drag and Drop</div>
              </Dropzone>
            </div>
          </div>
          <div className="col-md-6">
            <FormInput
              Input={formData.company_description}
              path={['formData', 'overview', 'company_description']}
              onChange={this.props.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BasicDetails;
