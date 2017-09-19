import React, { Component } from 'react';
import Select from 'react-select';
import LoadingWidget from '../../../Components/LoadingWidget';

class MatchDropDown extends Component {
  componentDidMount(){
    if(this.props.state.dealMatchDropdownList === false){
      this.props.fetchActiveDeals(this.props.CompanyId);
    }
  }
  componentWillUnmount(nextProps){
    this.props.unMount()
  }
  render() {
    if(this.props.state.dealMatchDropdownList === false){
      return (<LoadingWidget />);
    } else {
      return (
        <div className="match match-dropdown">
          <div className="match-dropdown-container">
            <p className="text-muted no-margin-bottom display-inline-block">Select a deal to add this company to your counterparty list</p>
            <Select
              name="form-field-name"
              value={this.props.state.dealMatchDropdownListSelected}
              clearable={false}
              options={this.props.state.dealMatchDropdownList}
              onChange={(selected)=>{this.props.onActiveDealSelect(selected)}}
            />
          </div>
          <a className="platform-button filter-thin-button-page confirm-match" onClick={()=>this.props.submitMatchRequest({CompanyId: this.props.CompanyId, DealId: this.props.state.dealMatchDropdownListSelected.value})} >Confirm match</a>
        </div>
      );
    }
  }
}

export default MatchDropDown;
