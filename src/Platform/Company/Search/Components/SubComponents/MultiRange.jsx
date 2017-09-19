import React, { Component } from 'react';
import RangeInput from './RangeInput';

class MultiRange extends Component {
  render() {
    const utils = this.props.utils;
    const input = this.props.input;
    const sectionKey = this.props.sectionKey;
    const filterPath = ['filterData', sectionKey, 'selected'];
    const RangeInputs = Object.keys(input.rangeSections).map((rangeInputKey, i) => {
      return (<RangeInput
        key={i}
        utils={utils}
        input={input.rangeSections[rangeInputKey]}
        sectionKey={sectionKey}
        subGroup={rangeInputKey}
      />
      )
    });
    const activeFilter = input.selected;
    return (
      <div>
        <div className='row line-divider-filter'>
          <div className="col-md-12 no-padding">
            <p className="text-muted no-margin-bottom display-inline-block">{input.name}</p>
            {activeFilter ?
              (<i className="fa fa-times add-icon-filter-remove animated fadeIn" onClick={()=> this.props.utils.showFilter(filterPath, input.selected)} />)
              : (<i className="fa fa-plus add-icon-filter animated fadeIn" onClick={()=> this.props.utils.showFilter(filterPath, input.selected)} />)
            }
          </div>
        </div>
        {activeFilter ? RangeInputs : ''}
      </div>
    )
  }
};

export default MultiRange;
