import { connect } from 'react-redux'
import React, { Component } from 'react';

// Presenational Components
import LoadingWidget from '../../Components/LoadingWidget';
import Filter from './Components/Filter';
import Results from './Components/Results';

// Actions
import * as actions from './Actions';

class CompanySearch extends Component {
  componentWillMount(){
    if(this.props.state.init === false){
      this.props.requestLookups(this.props.params);
    }
  }
  componentWillUpdate(nextProps){
    if(nextProps.params !== this.props.params){
      this.props.requestLookups(nextProps.params);
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.state.status !== 'pending' && this.props.state.companyResults.length === 0 && this.props.state.checkPageResults === true){
      this.props.submitFilters(this.props.state, true)
    }
  }
  componentWillUnmount(){
    this.props.unMount()
  }
  render() {
    if(this.props.state.status === 'pending' || Object.keys(this.props.state.lookups).length === 0 || this.props.state.init === false){
      return (<LoadingWidget />);
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <Filter
                state={this.props.state}
                onSelect={this.props.onSelect}
                removeSelect={this.props.removeSelect}
                onChange={this.props.onChange}
                showFilter={this.props.showFilter}
                saveFilters={this.props.saveFilters}
                submitFilters={this.props.submitFilters}
              />
            </div>
            <div className="col-md-10 col-xs-12">
              <Results
                state={this.props.state}
                nextPage={this.props.nextPage}
                previousPage={this.props.previousPage}
                onSelect={this.props.onSelect}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.CompanySearch
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestLookups: (params) => {
      dispatch(actions.requestLookups(params))
    },
    onSelect: (selected, selectPath, extra) => {
      dispatch(actions.onSelect(selected, selectPath, extra))
    },
    removeSelect: (selected, selectPath) => {
      dispatch(actions.removeSelect(selected, selectPath))
    },
    onChange: (input, section) => {
      dispatch(actions.onChange(input, section))
    },
    showFilter: (filterPath, selected) => {
      dispatch(actions.showFilter(filterPath, selected))
    },
    submitFilters: (state, reversePage) => {
      dispatch(actions.submitFilters(state, reversePage))
    },
    saveFilters: (state) => {
      dispatch(actions.saveFilters(state))
    },
    nextPage: () => {
      dispatch(actions.nextPage())
    },
    previousPage: () => {
      dispatch(actions.previousPage())
    },
    unMount: () => {
      dispatch(actions.unMount())
    }
  }
}

const CompanySearchContainer = connect(
  mapStateToProps, mapDispatchToProps
)(CompanySearch)

export default CompanySearchContainer
