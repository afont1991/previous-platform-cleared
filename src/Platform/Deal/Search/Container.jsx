import { connect } from 'react-redux'
import React, { Component } from 'react';

// Presenational Components
import LoadingWidget from '../../Components/LoadingWidget';
import Filter from './Components/Filter';
import Results from './Components/Results';

// Actions
import * as actions from './Actions';

class DealSearch extends Component {
  componentWillMount(){
    if(this.props.state.init === false){
      this.props.requestLookups(this.props.params);
    }
  }
  componentWillUpdate(nextProps){
    if(nextProps.state.resubmit){
      this.props.submitFilters(nextProps.state)
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.state.status !== 'pending' && this.props.state.dealResults.length === 0 && this.props.state.checkPageResults === true){
      this.props.submitFilters(this.props.state, true)
    }
  }
  componentWillUnmount(nextProps){
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
                submitFilters={this.props.submitFilters}
              />
            </div>
            <div className="col-md-10">
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
    state: state.DealSearch
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
    nextPage: () => {
      dispatch(actions.nextPage())
    },
    previousPage: () => {
      dispatch(actions.previousPage())
    },
    unMount: () => {
      dispatch(actions.unMount())
    },
  }
}

const DealSearchContainer = connect(
  mapStateToProps, mapDispatchToProps
)(DealSearch)

export default DealSearchContainer
