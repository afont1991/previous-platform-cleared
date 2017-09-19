import { connect } from 'react-redux'
import React, { Component } from 'react';

// Presenational Components
import LoadingWidget from '../Components/LoadingWidget';
// import FormInput from '../Components/FormInput';
import LookupTables from './Components/LookupTables'
import Companies from './Components/Companies'
// import News from './Components/News'


// Actions
import * as actions from './Actions';

class Admin extends Component {
  componentWillMount(){
    this.props.init(this.props.state);
  }
  componentWillUpdate(nextProps){
    if(nextProps.state.reset === true){
      this.props.init(nextProps.state);
    }
  }
  componentWillUnmount(){
    this.props.unmount()
  }
  render() {
    if(this.props.state.status === 'pending'){
      return (<LoadingWidget />)
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 line-divider">
              <p className="profile-text text-muted header-font"><strong>Manage Companies</strong></p>
            </div>
          </div>
          <Companies
            state={this.props.state}
            onChange={this.props.onChange}
            nextPage={this.props.nextPage}
            previousPage={this.props.previousPage}
            onLimitSelect={this.props.onLimitSelect}
            SearchByName={this.props.SearchByName}
            ActivateCompany={this.props.ActivateCompany}
          />
          <div className="section-divider"></div>
          <div className="row">
            <div className="col-md-12 line-divider">
              <p className="profile-text text-muted header-font"><strong>Lookups</strong></p>
            </div>
          </div>
          <div className="row">
            <LookupTables
              type="Industries"
              state={this.props.state}
              SelectLookup={this.props.SelectLookup}
              DeleteLookups={this.props.DeleteLookups}
              SubmitLookup={this.props.SubmitLookup}
              onChange={this.props.onChange}
            />
            <LookupTables
              type="Scenarios"
              state={this.props.state}
              SelectLookup={this.props.SelectLookup}
              DeleteLookups={this.props.DeleteLookups}
              SubmitLookup={this.props.SubmitLookup}
              onChange={this.props.onChange}
            />
          </div>
          <div className="section-divider"></div>
          <div className="row">
            <LookupTables
              type="Characteristics"
              state={this.props.state}
              SelectLookup={this.props.SelectLookup}
              DeleteLookups={this.props.DeleteLookups}
              SubmitLookup={this.props.SubmitLookup}
              onChange={this.props.onChange}
            />
            <LookupTables
              type="TypesOfCapital"
              state={this.props.state}
              SelectLookup={this.props.SelectLookup}
              DeleteLookups={this.props.DeleteLookups}
              SubmitLookup={this.props.SubmitLookup}
              onChange={this.props.onChange}
            />
          </div>
          <div className="section-divider"></div>
          <div className="row">
            <LookupTables
              type="Financials"
              state={this.props.state}
              SelectLookup={this.props.SelectLookup}
              DeleteLookups={this.props.DeleteLookups}
              SubmitLookup={this.props.SubmitLookup}
              onChange={this.props.onChange}
            />
            <LookupTables
              type="Size"
              state={this.props.state}
              SelectLookup={this.props.SelectLookup}
              DeleteLookups={this.props.DeleteLookups}
              SubmitLookup={this.props.SubmitLookup}
              onChange={this.props.onChange}
            />
          </div>
          <div className="section-divider"></div>
          <div className="row">
            <div className="col-md-12 line-divider">
              <p className="profile-text text-muted header-font"><strong>Dashboard</strong></p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              {/* <News
                state={this.props.state}
                onChange={this.props.onChange}
                nextPage={this.props.nextPage}
                previousPage={this.props.previousPage}
                onLimitSelect={this.props.onLimitSelect}
                submitStory={this.props.submitStory}
                deleteNewsStory={this.props.deleteNewsStory}
                selectNewsStory={this.props.selectNewsStory}
              /> */}
            </div>
          </div>
        </div>
      );
    }
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.Admin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: (state) => {
      dispatch(actions.init(state))
    },
    unmount: () => {
      dispatch(actions.unmount())
    },
    SelectLookup: (lookupType, lookupId) => {
      dispatch(actions.SelectLookup(lookupType,lookupId))
    },
    onChange: (input, path) => {
      dispatch(actions.onChange(input, path))
    },
    SubmitLookup: (input) => {
      dispatch(actions.SubmitLookup(input))
    },
    DeleteLookups: (lookups, type) => {
      dispatch(actions.DeleteLookups(lookups, type))
    },
    ActivateCompany: (company) => {
      dispatch(actions.ActivateCompany(company))
    },
    nextPage: () => {
      dispatch(actions.nextPage())
    },
    previousPage: () => {
      dispatch(actions.previousPage())
    },
    onLimitSelect: (selected, selectedPath) => {
      dispatch(actions.onLimitSelect(selected, selectedPath))
    },
    SearchByName: () => {
      dispatch(actions.SearchByName())
    },
    // submitStory: (formData) => {
    //   dispatch(actions.submitStory(formData))
    // },
    // deleteNewsStories: (selectedStories) => {
    //   dispatch(actions.deleteNewsStories(selectedStories))
    // },
    // selectNewsStory: (id) => {
    //   dispatch(actions.selectNewsStory(id))
    // },
  }
}

const AdminContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Admin)

export default AdminContainer
