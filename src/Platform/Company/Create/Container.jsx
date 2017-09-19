import { connect } from 'react-redux'
import React, { Component } from 'react'

// Presenational Components
import LoadingWidget from '../../Components/LoadingWidget'
import Layout from './Component'

import Form from '../../../Form/Container'
import * as actions from './Actions'

class CreateCompanyMain extends Component {

  componentWillMount() {
    this.props.init();
  }

  componentWillUnmount() {
    this.props.unMount()
  }

  render() {
    const State = this.props.state;
    if(State.status === 'pending') {
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
    state: state.CompanyCreate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(actions.init())
    },
    unMount: () => {
      dispatch(actions.unMount())
    }
  }
}

const CreateCompanyContainer = connect(
  mapStateToProps, mapDispatchToProps
)(CreateCompanyMain)

export default CreateCompanyContainer
