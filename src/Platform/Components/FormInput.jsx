import React, { Component } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { formatNumber } from '../../Helpers/valueFormatHelper';
import ToolTips from './ToolTips';

require('react-datepicker/dist/react-datepicker-cssmodules.css');

import RangeInput from './RangeInput'

class FormInput extends Component {
  render() {
    let formattedValue = '';
    if(this.props.Input.value && this.props.Input.value !== '' && this.props.Input.value !== null){
      switch (this.props.Input.display_mode) {
        case 'currency':
          formattedValue = formatNumber(this.props.Input.value);
          break;
        case 'financial_year':
          if(this.props.Input.validation.class === 'has-success'){
            formattedValue = formatNumber(this.props.Input.value, 'financial_year');
          }
          break;
        case 'percentage':
          formattedValue = formatNumber(this.props.Input.value, 'percentage');
          break;
        default:
          formattedValue = '';
      }
    }
    switch (this.props.Input.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'password':
        return (
          <div className={
            `form-group ${this.props.Input.customClass} ${this.props.Input.validation.class}`
          } >
            {this.props.Input.validation.message ? (
              <div className="alert alert-danger animated fadeInLeft" role="alert">{this.props.Input.validation.message}</div>
            ) : ''}
            {this.props.Input.display_name !== false ? (
              <span className="flex-container">
                <label data-for='input-field' className="control-label text-muted">
                    {`${this.props.Input.display_name} ${formattedValue}`}
                    {this.props.Input.rules.includes('required') ? (<span className="required-text">*</span>) : ('')}
                </label>
                {this.props.Input.tooltip ? (
                  <ToolTips content={this.props.Input.tooltip} />
                  ) : ('') }
              </span>
            ) : ''}
            <input
              type={this.props.Input.type}
              placeholder={this.props.Input.placeholder ? this.props.Input.placeholder : ''}
              className="form-control"
              name={this.props.Input.name}
              onChange={(e) => this.props.onChange(e, this.props.path)}
              value={this.props.Input.value}
            />
          </div>
        )
      case 'textarea':
        return (
          <div className={"form-group " + this.props.Input.validation.class}>
            {this.props.Input.validation.message ? (
              <div className="alert alert-danger animated fadeInLeft" role="alert">{this.props.Input.validation.message}</div>
            ) : ''}
            <span className="flex-container">
              <label data-for='input-field' className="control-label text-muted">
                {this.props.Input.display_name}
                {this.props.Input.rules.includes('required') ? (<span className="required-text">*</span>) : ('')}
              </label>
              {this.props.Input.tooltip ? (
              <ToolTips content={this.props.Input.tooltip} />
              ) : ('') }
            </span>
            <textarea
              className="form-control"
              placeholder={this.props.Input.placeholder ? this.props.Input.placeholder : ''}
              rows={this.props.Input.rows}
              name={this.props.Input.name}
              onChange={(e) => this.props.onChange(e, this.props.path)}
              value={this.props.Input.value}
            />
          </div>
        )
      case 'date':
        return (
          <div className={"form-group " + this.props.Input.validation.class}>
            {this.props.Input.validation.message ? (
              <div className="alert alert-danger animated fadeInLeft" role="alert">{this.props.Input.validation.message}</div>
            ) : ''}
            <label data-for='input-field' className="control-label text-muted">
              {this.props.Input.display_name}
              {this.props.Input.rules.includes('required') ? (<span className="required-text">*</span>) : ('')}
            </label>
            <DatePicker
              selected={this.props.Input.value}
              onChange={(date) => {this.props.handleDate(date, this.props.path)}}
              className='form-control'
            />
          </div>
        )
      case 'select':
        let ClearSetting = true
        if(this.props.clearable !== undefined){
          ClearSetting = this.props.clearable
        }
        return (
          <div className={`form-group ${this.props.Input.customClass} ${this.props.Input.validation.class}`} >
            {this.props.Input.validation.message ? (
              <div className="alert alert-danger animated fadeInLeft" role="alert">{this.props.Input.validation.message}</div>
            ) : ''}
            {this.props.Input.display_name !== false ? (
              <span className="flex-container">
                <label data-for='input-field' className="control-label text-muted">
                  {`${this.props.Input.display_name} ${formattedValue}`}
                  {this.props.Input.rules.includes('required') ? (<span className="required-text">*</span>) : ('')}
                </label>
                {this.props.Input.tooltip ? (
                <ToolTips content={this.props.Input.tooltip} />
                ) : ('') }
            </span>
            ) : ''}
            <Select
              name="form-field-name"
              value={this.props.Input.selectedOption}
              clearable={ClearSetting}
              disabled={this.props.Input.disabled}
              options={this.props.Input.options}
              onChange={(selected) => this.props.onSelect(selected, this.props.path)}
            />
          </div>
        )
      case 'multi_select':
        return (
          <div className={"form-group " + this.props.Input.validation.class}>
            {this.props.Input.validation.message ? (
              <div className="alert alert-danger animated fadeInLeft" role="alert">{this.props.Input.validation.message}</div>
            ) : ''}
            <span className="flex-container">
              <label data-for='input-field' className="control-label text-muted">
                {this.props.Input.display_name}
                {this.props.Input.rules.includes('required') ? (<span className="required-text">*</span>) : ('')}
              </label>
              {this.props.Input.tooltip ? (
              <ToolTips content={this.props.Input.tooltip} />
              ) : ('') }
            </span>
            <Select
              name="form-field-name"
              multi={true}
              value={this.props.Input.selectedOption}
              options={this.props.Input.options}
              onChange={(selected) => this.props.onSelect(selected, this.props.path)}
            />
          </div>
        )
      case 'multi_range':
        let rangeSelectInput = this.props.Input;
        const rangesInputs = Object.keys(rangeSelectInput.ranges).map((rangeKey) => {
          let currentRange = rangeSelectInput.ranges[rangeKey]
          let finalPath = this.props.path.concat('ranges', currentRange.name.toString())
          return (
            <RangeInput
              key={rangeKey}
              path={finalPath}
              range={currentRange}
              onRangeChange={this.props.onRangeChange}
            />)
        });
        return (
          <div className={"form-group " + this.props.Input.validation.class}>
            {this.props.Input.validation.message ? (
              <div className="alert alert-danger animated fadeInLeft" role="alert">{this.props.Input.validation.message}</div>
            ) : ''}
            {rangesInputs}
          </div>
        )
      case 'stylized-money':
        return (
          <div className={`form-group financials-group ${this.props.Input.customClass}`}>
            <div className="input-group">
              <div className="input-group-addon dashed-addon-left">$</div>
                <input
                  type='number'
                  className="dashed-input"
                  name={this.props.Input.name}
                  onChange={(e) => this.props.onChange(e, this.props.path)}
                  value={this.props.Input.value}
                />
              <div className="input-group-addon dashed-addon-right">M</div>
            </div>
          </div>
        )
      case 'stylized-percentage':
        return (
          <div className={`form-group financials-group ${this.props.Input.customClass}`}>
            <div className="input-group">
              <div className="input-group-addon dashed-addon-left"><span className="invisible">$</span></div>
                <input
                  type='number'
                  className="dashed-input"
                  name={this.props.Input.name}
                  onChange={(e) => this.props.onChange(e, this.props.path)}
                  value={this.props.Input.value}
                />
              <div className="input-group-addon dashed-addon-right">%</div>
            </div>
          </div>
        )
      default:
        return (<h1>Input</h1>)

    }
  }
}

export default FormInput;
