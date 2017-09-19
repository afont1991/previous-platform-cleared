import React, { Component } from 'react';
import RangeInput from './SubComponents/RangeInput';
import MultiRange from './SubComponents/MultiRange';
import SelectInput from './SubComponents/SelectInput';

class Filter extends Component {
  componentWillMount(){
    if(this.props.state.resubmit){
      this.props.submitFilters(this.props.state)
    }
  }
  componentWillUpdate(nextProps){
    if(nextProps.state.resubmit){
      this.props.submitFilters(nextProps.state)
    }
  }
  render() {
    const utils = {
      lookups: this.props.state.lookups,
      onSelect: this.props.onSelect,
      removeSelect: this.props.removeSelect,
      onChange: this.props.onChange,
      showFilter: this.props.showFilter,
    }
    const filterData = this.props.state.filterData;
    return (
      <div className="filter-nav">
        <RangeInput utils={utils} input={filterData['CompanyName']} sectionKey={'CompanyName'} />
        <SelectInput utils={utils} input={filterData['CompanyTypes']} sectionKey={'CompanyTypes'} />
        <SelectInput utils={utils} input={filterData['Industries']} sectionKey={'Industries'} />
        <SelectInput utils={utils} input={filterData['Geographies']} sectionKey={'Geographies'} />
        <SelectInput utils={utils} input={filterData['Scenarios']} sectionKey={'Scenarios'} />
        <SelectInput utils={utils} input={filterData['TypesOfCapital']} sectionKey={'TypesOfCapital'} />
        <SelectInput utils={utils} input={filterData['Characteristics']} sectionKey={'Characteristics'} />
        <MultiRange utils={utils} input={filterData['Financials']} sectionKey={'Financials'} />
        <MultiRange utils={utils} input={filterData['Sizes']} sectionKey={'Sizes'} />
        <SelectInput utils={utils} input={filterData['Location']} sectionKey={'Location'} />
        <div className="row">
          <div className='col-md-12'>
            <a className="platform-button filter-thin-button" onClick={()=>this.props.submitFilters(this.props.state)}>Submit Filter</a>
          </div>
        </div>
      </div>
    )
  }
};

export default Filter;
