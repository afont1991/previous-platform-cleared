import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import Form from '../../../Form/Container'

import Layout from './Layout'

import * as actions from './Actions';

class SavedSearchModal extends Component {
  render() {
    return (
      <li className="advance-search-li no-margin-top no-padding-top">
        <button className="platform-button filter-thin-button-page custom-class-delete-me" onClick={()=>this.props.open()}>Save Current Search</button>
        <Modal show={this.props.state.showModal} onHide={this.props.close}>
          <Modal.Header closeButton>
            <p className="profile-text profile-section-header">
              <strong>Save selected filters</strong>
            </p>
          </Modal.Header>
          <Modal.Body className="text-center">
            <Form form={this.props.state.formData}>
              <Layout saveFilters={this.props.saveFilters} type={this.props.type} filters={this.props[this.props.type].filterData} />
            </Form>
          </Modal.Body>
        </Modal>
      </li>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.SavedSearchModal,
    company: state.CompanySearch,
    deal: state.DealSearch,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
      dispatch(actions.close())
    },
    open: () => {
      dispatch(actions.open())
    },
    saveFilters: (name, type, filter) => {
      dispatch(actions.saveFilters(name, type, filter))
    }
  }
}

const SavedSearchModalContainer = connect(
  mapStateToProps, mapDispatchToProps
)(SavedSearchModal)

export default SavedSearchModalContainer
