import React, { Component } from 'react';

import { browserHistory } from 'react-router'
import { Glyphicon } from 'react-bootstrap'
import BasicDetails from './Components/BasicDetails'
import Team from './Components/Team'
import Criteria from './Components/Criteria'
import BorrowerTransactions from './Components/BorrowerTransactions'
import LenderTransactions from './Components/LenderTransactions'

class Layout extends Component {
  componentWillUpdate(nextProps){
    const formData = nextProps.formData.formData;
    if(formData.success){
      browserHistory.push(`/platform/company/${formData.success.body.payload}`)
    }
  }
  render() {
    const formData = this.props.formData.formData;
    // Company Type Array
    let companyTypeArray = this.props.formData.formData.overview.operating_type.selectedOption;
    let privateCompany = false;
    companyTypeArray.forEach((type) => {
      if(type.value === 'Private Company') {
        privateCompany = true;
      }
    })
    return (
      <div className="container">
        <div className="platform-button sticky-save" onClick={() => this.props.submitForm(formData)}>
          <Glyphicon className="save-glyph" glyph="save-file" />
          <p className="save-text">Save</p>
        </div>
        <div className="line-divider-filter">
          <h3>Basic Details</h3>
        </div>
        <BasicDetails
          formData={formData}
          onDrop={this.props.onDrop}
          onChange={this.props.onChange}
          onSelect={this.props.onSelect}
        />
        {privateCompany === false ? (
          <div>
            <div className="line-divider-filter">
              <h3>Investment Criteria</h3>
            </div>
            <Criteria
              formData={formData}
              onChange={this.props.onChange}
              onSelect={this.props.onSelect}
              onCheck={this.props.onCheck}
              onRangeChange={this.props.onRangeChange}
            />
          </div>
        ) : (
          ('')
        )}
        <div className="line-divider-filter">
          <h3>Recent Transactions</h3>
        </div>
        {formData.overview.platform_type.selectedOption.value === 'borrower' ? (
          <BorrowerTransactions
            formData={formData}
            onChange={this.props.onChange}
            onSelect={this.props.onSelect}
            handleDate={this.props.handleDate}
            addItem={this.props.addItem}
            removeItem={this.props.removeItem}
          />
        )  : (
          <LenderTransactions
            formData={formData}
            onChange={this.props.onChange}
            onSelect={this.props.onSelect}
            handleDate={this.props.handleDate}
            addItem={this.props.addItem}
            removeItem={this.props.removeItem}
          />
        )}
        <div className="line-divider-filter">
          <h3>Team</h3>
        </div>
        <Team
          formData={formData}
          onChange={this.props.onChange}
          onSelect={this.props.onSelect}
          addItem={this.props.addItem}
          removeItem={this.props.removeItem}
        />
      </div>
    )
  }
}

export default Layout;
