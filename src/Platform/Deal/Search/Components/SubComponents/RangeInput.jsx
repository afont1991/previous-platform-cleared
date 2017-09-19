import React, { Component } from 'react';
import {formatNumber} from '../../../../../Helpers/valueFormatHelper';

class RangeInput extends Component {
  render() {
    const utils = this.props.utils;
    const input = this.props.input;
    const sectionKey = this.props.sectionKey;
    const activeFilter = input.selected;
    const subGroup = this.props.subGroup;
    let filterPath = ['filterData', sectionKey, 'selected']
    if(subGroup){
      filterPath = ['filterData', sectionKey, 'rangeSections', subGroup, 'selected']
    }
    let inputMinPath = ['filterData', sectionKey, 'min'];
    let inputMaxPath = ['filterData', sectionKey, 'max'];
    if(subGroup){
      inputMinPath = ['filterData', sectionKey, 'rangeSections', subGroup, 'min'];
      inputMaxPath = ['filterData', sectionKey, 'rangeSections', subGroup, 'max'];
    }
    return (
      <div>
        <div className={subGroup ? 'row animated fadeInDown' : 'row line-divider-filter'}>
          <div className="col-md-12 no-padding">
            <p className="text-muted no-margin-bottom display-inline-block">{input.name}</p>
            {activeFilter ?
              (<i className="fa fa-times add-icon-filter-remove animated fadeIn" onClick={()=> utils.showFilter(filterPath, input.selected)} />)
              : (<i className="fa fa-plus add-icon-filter animated fadeIn" onClick={()=> utils.showFilter(filterPath, input.selected)} />)
            }
          </div>
        </div>
        {activeFilter ?
          (<div className="row animated fadeInLeft">
            <div className="col-md-6 no-padding">
              <p className="text-muted no-margin-bottom">min {formatNumber(input.min)}</p>
              <input
                type="number"
                className="form-control min-max-filter"
                name='min'
                onChange={(e)=> utils.onChange(e, inputMinPath)}
                value={input.min}
              />
            </div>
            <div className="col-md-6 no-padding">
              <p className="text-muted no-margin-bottom">max {formatNumber(input.max)}</p>
              <input
                type="number"
                className="form-control min-max-filter"
                name='max'
                onChange={(e)=> utils.onChange(e, inputMaxPath)}
                value={input.max}
              />
            </div>
          </div>)
          : ''
        }
      </div>
    )
  }
};

export default RangeInput;
