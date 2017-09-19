import React, { Component } from 'react';
import RangeInput from './SubComponents/RangeInput';
// import MultiRange from './SubComponents/MultiRange';
import SelectInput from './SubComponents/SelectInput';

class Filter extends Component {
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
        <p className="profile-text text-muted profile-section-header"><strong>Filters</strong></p>
        <RangeInput utils={utils} input={filterData['Ebitda']} sectionKey={'Ebitda'} />
        <RangeInput utils={utils} input={filterData['Revenue']} sectionKey={'Revenue'} />
        <RangeInput utils={utils} input={filterData['TransactionSize']} sectionKey={'TransactionSize'} />
        <SelectInput utils={utils} input={filterData['Industries']} sectionKey={'Industries'} />
        <SelectInput utils={utils} input={filterData['Scenarios']} sectionKey={'Scenarios'} />
        <SelectInput utils={utils} input={filterData['TypesOfCapital']} sectionKey={'TypesOfCapital'} />
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
