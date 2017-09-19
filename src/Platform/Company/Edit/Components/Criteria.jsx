import React, { Component } from 'react';
import FormInput from '../../../Components/FormInput'

class Criteria extends Component {
  render() {
    const formData = this.props.formData.criteria;
    return (
      <div className='container-fluid margin-top-20'>
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.Industries}
              path={['formData', 'criteria', 'Industries']}
              onSelect={this.props.onSelect}
            />
            <FormInput
              Input={formData.ExcludedIndustries}
              path={['formData', 'criteria', 'ExcludedIndustries']}
              onSelect={this.props.onSelect}
            />
            <FormInput
              Input={formData.TypesOfCapital}
              path={['formData', 'criteria', 'TypesOfCapital']}
              onSelect={this.props.onSelect}
            />
            <FormInput
              Input={formData.Characteristics}
              path={['formData', 'criteria', 'Characteristics']}
              onSelect={this.props.onSelect}
            />
            <FormInput
              Input={formData.Scenarios}
              path={['formData', 'criteria', 'Scenarios']}
              onSelect={this.props.onSelect}
            />
            <FormInput
              Input={formData.Geography}
              path={['formData', 'criteria', 'Geography']}
              onSelect={this.props.onSelect}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FormInput
              Input={formData.Financials}
              path={['formData', 'criteria', 'Financials']}
              onCheck={this.props.onCheck}
              onRangeChange={this.props.onRangeChange}
            />
            <FormInput
              Input={formData.Size}
              path={['formData', 'criteria', 'Size']}
              onCheck={this.props.onCheck}
              onRangeChange={this.props.onRangeChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Criteria;
