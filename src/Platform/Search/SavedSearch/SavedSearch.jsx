import React, { Component } from 'react';
import LoadingWidget from '../../Components/LoadingWidget'
import { browserHistory } from 'react-router';
import moment from 'moment'

import { connect } from 'react-redux'
import * as actions from './Actions';

class SavedSearchPage extends Component {

	componentWillMount(){
		this.props.init()
	}

	componentWillUpdate(nextProps){
		if(nextProps.state.reload === true) {
			this.props.init()
		}
	}

	render() {
		if(this.props.state.status === 'pending' || !this.props.state.results){
			return <LoadingWidget />
		} if(this.props.state.results.length < 1) {
			return (
				<div className="saved-container">
					<div className="col-md-12">
						<p className="text-muted text-center">You have not saved any searches yet. Do a search, then click the "Save Search" button to save your search.</p>
					</div>
				</div>
			)
		} else {
			const savedRows = this.props.state.results.map((savedSearchData, i) => {
				const date = moment(savedSearchData.createdAt).format("MMM Do YY");
				return (
					<tr className='click-able-table-row' key={i} >
						<td onClick={() => { browserHistory.push(`/platform/${savedSearchData.type}/search/saved/${savedSearchData.id}`)}}>{date}</td>
						<td onClick={() => { browserHistory.push(`/platform/${savedSearchData.type}/search/saved/${savedSearchData.id}`)}}>{savedSearchData.type}</td>
						<td onClick={() => { browserHistory.push(`/platform/${savedSearchData.type}/search/saved/${savedSearchData.id}`)}}>{savedSearchData.name}</td>
						<td className="delete-col">
							<span
								className="glyphicon glyphicon-trash can-col"
								onClick={() => {this.props.deleteSearch(savedSearchData.id)}}
								type="delete">
							</span>
						</td>
					</tr>
				)
			})
			return(
				<div>
					<table className="table table-hover save-table">
						<thead>
							<tr className="save-header">
								<th>DATE</th>
								<th>TYPE</th>
								<th>NAME</th>
								<th className="delete-col">DELETE</th>
							</tr>
						</thead>
						<tbody>
							{savedRows}
						</tbody>
					</table>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
  return {
    state: state.SavedSearch,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(actions.init())
    },
		deleteSearch: (id) => {
			dispatch(actions.deleteSearch(id))
		}
  }
}

const SavedSearchContainer = connect(
  mapStateToProps, mapDispatchToProps
)(SavedSearchPage)

export default SavedSearchContainer
