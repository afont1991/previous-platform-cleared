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
    let inputPath = ['filterData', sectionKey, 'value'];
    if(subGroup){
      inputPath = ['filterData', sectionKey, 'rangeSections', subGroup, 'value'];
    }
    return (
      <div>
        <div className={subGroup ? 'row animated fadeInDown' : 'row line-divider-filter'}>
          <div className="col-md-12 no-padding">
            <p className="text-muted no-margin-bottom display-inline-block">{input.name}</p>
            {input.name !== 'Company Name' ? (
              activeFilter ?
                (<i className="fa fa-times add-icon-filter-remove animated fadeIn" onClick={()=> utils.showFilter(filterPath, input.selected)} />)
                : (<i className="fa fa-plus add-icon-filter animated fadeIn" onClick={()=> utils.showFilter(filterPath, input.selected)} />)
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {activeFilter ?
          (<div className="row animated fadeInLeft">
            <div className="col-md-12 no-padding">
              {}{input.sub_type !== 'text' ? (
                <p className="text-muted no-margin-bottom">{formatNumber(input.value)}</p>
              ) : ( '' ) }
              <input
                type={input.sub_type}
                className="form-control min-max-filter"
                name='value'
                onChange={(e)=> utils.onChange(e, inputPath)}
                value={input.value}
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
