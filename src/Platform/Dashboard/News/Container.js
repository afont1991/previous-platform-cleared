import { connect } from 'react-redux'
import React, { Component } from 'react';
import {Well} from 'react-bootstrap';
// import {Link} from 'react-router';

// Presenational Components
import LoadingWidget from '../../Components/LoadingWidget';

// Actions
import * as actions from './Actions';

class News extends Component {
  componentWillMount(){
    if(this.props.state.newsItems.length === 0){
      this.props.getNewsItems();
    }
  }
  render() {
    if(this.props.state.newsItems.length === 0){
      return (<LoadingWidget />);
    } else {
      const newsItems = this.props.state.newsItems.map((value, i) => {
        return (
          <div className="dashboard-news-item" key={i}>
            <div className="title-section">
              <p className="profile-text no-margin-bottom"><strong>{value.title}</strong><span className="text-muted"> - {value.date}</span></p>
            </div>
            <div className="content-section">
              <p className="text-muted">{value.content}</p>
            </div>
            <p className="profile-text text-muted"><a href={value.url}>Read More</a></p>
          </div>
        )
      });
      return (
        <Well className="industry-news-well">
          <p className="profile-text text-muted profile-section-header"><strong>Industry News</strong></p>
          {newsItems}
        </Well>
      );
    }
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.News
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNewsItems: () => {
      dispatch(actions.getNewsItems())
    },
  }
}

const NewsContainer = connect(
  mapStateToProps, mapDispatchToProps
)(News)

export default NewsContainer
