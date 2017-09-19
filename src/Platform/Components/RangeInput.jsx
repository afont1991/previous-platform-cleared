import React, { Component } from 'react';
// import InputRange from 'react-input-range';
import { formatNumber } from '../../Helpers/valueFormatHelper';


class RangeInput extends Component {
  render() {
    return (
      <div className="form-group">
        <label data-for='input-field' className="control-label text-muted">{this.props.range.display_name}</label>
        <div className="row">
          <div className="col-md-6 text-left">
            <div className={
              `form-group ${this.props.range.customClass} ${this.props.range.validation.class}`
            } >
              {this.props.range.validation.message ? (
                <div className="alert alert-danger animated fadeInLeft" role="alert">{this.props.range.validation.message}</div>
              ) : ''}
              <span className="flex-container">
                <label data-for='input-field' className="control-label text-muted">
                    {`MIN ${formatNumber(this.props.range.min_value)}`}
                </label>
              </span>
              <input
                type='number'
                className="form-control"
                name='min'
                onChange={(value)=>{this.props.onRangeChange(value.target.value, this.props.path.concat('min_value'))}}
                value={this.props.range.min_value}
              />
            </div>
          </div>
          <div className="col-md-6 text-right">
            <div className={
              `form-group ${this.props.range.customClass} ${this.props.range.validation.class}`
            } >
              {this.props.range.validation.message ? (
                <div className="alert alert-danger animated fadeInLeft" role="alert">{this.props.range.validation.message}</div>
              ) : ''}
              <span className="flex-container">
                <label data-for='input-field' className="control-label text-muted">
                    {`MAX ${formatNumber(this.props.range.max_value)}`}
                </label>
              </span>
              <input
                type='number'
                className="form-control"
                name='max'
                onChange={(value)=>{this.props.onRangeChange(value.target.value, this.props.path.concat('max_value'))}}
                value={this.props.range.max_value}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RangeInput;

