import React, { Component } from 'react';
import Select from 'react-select';

class SelectInput extends Component {
  render() {
    const utils = this.props.utils;
    const input = this.props.input;
    const sectionKey = this.props.sectionKey;
    const activeFilter = input.selected;
    const subGroup = this.props.subGroup;
    let selectedPath = ['filterData', sectionKey];
    let filterPath = ['filterData', sectionKey, 'selected'];
    if(subGroup){
      filterPath = ['filterData', sectionKey, 'selectSections', subGroup, 'selected'];
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
            {activeFilter ?
              (<div className='extra-bottom-margin'>
                <Select
                  name="form-field-name"
                  multi={true}
                  value={input.selectedOption}
                  options={input.options}
                  onChange={(selected) => utils.onSelect(selected, selectedPath)}
                />
              </div>)
              : ''
            }
          </div>
        </div>
      </div>
    )
  }
};

export default SelectInput;
