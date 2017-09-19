import { connect } from 'react-redux';
import React, { Component } from 'react';
import {Well} from 'react-bootstrap';
import {Link} from 'react-router';

// Presenational Components
import LoadingWidget from '../../Components/LoadingWidget';

// Actions
import * as actions from './Actions';

class DashboardSavedSearch extends Component {
  componentWillMount(){
    this.props.init()
  }
  render() {
    if(this.props.state.status === 'pending'){
      return (<LoadingWidget />)
    } else {
      const savedSearches = this.props.state.results.map((savedSearchData, i)=>{
        return (
          <p key={i} className="profile-text profile-main-text text-muted no-margin-bottom"><Link to={`/platform/${savedSearchData.type}/search/saved/${savedSearchData.id}`} >{savedSearchData.name}</Link></p>
        )
      })
      return (
        <div>
          {savedSearches.length !== 0 ? (
            <Well className="saved-searches-well">
              <p className="profile-text text-muted profile-section-header"><strong>Saved Searches</strong></p>
              {savedSearches.length !== 0 ? (
                savedSearches
              ) : (
                <p className="profile-text text-muted header-font text-center"><strong>Empty</strong></p>
              )}
            </Well>
          ) : (null)}
        </div>
      );
    }
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.DashboardSavedSearch
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(actions.init())
    },
  }
}

const DashboardSavedSearchContainer = connect(
  mapStateToProps, mapDispatchToProps
)(DashboardSavedSearch)

export default DashboardSavedSearchContainer
