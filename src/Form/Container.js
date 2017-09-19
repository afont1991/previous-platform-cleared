import { connect } from 'react-redux'
import React, { Component } from 'react';

// Presenational Components
import * as actions from './Actions';

class Form extends Component {
  componentWillMount(){
    this.props.init(this.props.form);
  }
  componentWillUnmount(){
    this.props.unmount()
  }
  render() {
    return(
      <div className='container-fluid'>
        {this.props.state.status !== 'ready' ? ('') : (
          React.cloneElement(this.props.children, {
            formData: this.props.state,
            changeSection: this.props.changeSection,
            onChange: this.props.onChange,
            onSelect: this.props.onSelect,
            onCheck: this.props.onCheck,
            onRangeChange: this.props.onRangeChange,
            onDrop: this.props.onDrop,
            handleDate: this.props.handleDate,
            addItem: this.props.addItem,
            removeItem: this.props.removeItem,
            submitForm: this.props.submitForm,
          })
        )}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.FormReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeSection: (formData, currentSectionName, nextSectionName) => {
      dispatch(actions.changeSection(formData, currentSectionName, nextSectionName))
    },
    onChange: (input, path) => {
      dispatch(actions.onChange(input, path))
    },
    onSelect: (option, path) => {
      dispatch(actions.onSelect(option, path))
    },
    onDrop: (acceptedFiles, rejectedFiles, path) => {
      dispatch(actions.onDrop(acceptedFiles, rejectedFiles, path))
    },
    onRangeChange: (value, path, range) => {
      dispatch(actions.onRangeChange(value, path, range))
    },
    onCheck: (checked, path) => {
      dispatch(actions.onCheck(checked, path))
    },
    handleDate: (date, path) => {
      dispatch(actions.handleDate(date, path))
    },
    addItem: (form, sectionName, newItem, itemName) => {
      dispatch(actions.addItem(form, sectionName, newItem, itemName))
    },
    removeItem: (form, itemName, itemId, path) => {
      dispatch(actions.removeItem(form, itemName, itemId, path))
    },
    submitForm: (formData, notCompany) => {
      dispatch(actions.submitForm(formData, notCompany));
    },
    init: (formData) => {
      dispatch(actions.init(formData));
    },
    unmount: () => {
      dispatch(actions.unmount());
    },
  }
}

const FormContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Form)

export default FormContainer
