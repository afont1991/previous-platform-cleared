import { connect } from 'react-redux'
import React, { Component } from 'react'

// Presenational Components
import LoadingWidget from '../../Components/LoadingWidget'
import Layout from './Component'

import Form from '../../../Form/Container'
import * as actions from './Actions'

class EditCompanyMain extends Component {

  componentWillMount() {
    this.props.init(this.props.params.CompanyId);
  }

  componentWillUnmount() {
    this.props.unMount()
  }

  render() {
    const State = this.props.state;
    if(State.status === 'pending'){
      return <LoadingWidget />
    } else {
      return(
        <Form form={State.formData}>
          <Layout />
        </Form>
      )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    state: state.CompanyEdit
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: (CompanyId) => {
      dispatch(actions.init(CompanyId))
    },
    unMount: () => {
      dispatch(actions.unMount())
    }
  }
}

const EditCompanyContainer = connect(
  mapStateToProps, mapDispatchToProps
)(EditCompanyMain)

export default EditCompanyContainer
