import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingWidget from '../Components/LoadingWidget'
import Dropzone from 'react-dropzone'

import * as actions from './Actions';

class Lab extends Component {

  componentWillMount(){
    this.props.init()
  }

  componentDidUpdate(){
    if(this.props.fileUrl){
      console.log('???');
    }
  }

  render() {
    const dropZoneStyle = {
      border: 'none',
      marginTop: '10px'
    }
    if(this.props.status === 'pending'){
      return (<LoadingWidget />);
    } else {
      return (
        <div className="container">
          <div className="row line-divider">
            <div className="col-md-4">
              <div className="form-group">
                <Dropzone accept='.docx, .doc, .pdf, .odt' style={dropZoneStyle} onDrop={(acceptedFiles, rejectedFiles)=>{this.props.onDrop(acceptedFiles, rejectedFiles, ['formData', 'testFile']) } }>
                  <button className="doc-btn platform-button mini-button no-margin-top">Select File</button>
                </Dropzone>
                <button className="platform-button" onClick={()=> this.props.submitForm(this.props.formData) }>Submit File</button>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className="col-md-12">
              <button className="platform-button" onClick={()=> this.props.download() }>Download file</button>
              <a href="https://debt-maven-deal-documents.s3.amazonaws.com/cim-Deal4-3?AWSAccessKeyId=AKIAJLSW4TLQVEPJRRTA&Expires=1502313919&Signature=6ZZpZ7juXw0VgmEcfyKVkboXMX0%3D" target="_blank" download >Download</a>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return state.Lab
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(actions.init())
    },
    unmount: () => {
      dispatch(actions.unmount())
    },
    onDrop: (acceptedFiles, rejectedFiles, path) => {
      dispatch(actions.onDrop(acceptedFiles, rejectedFiles, path))
    },
    submitForm: (formData) => {
      dispatch(actions.submitForm(formData))
    },
    download: () => {
      dispatch(actions.download())
    },
  }
}

const LabContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Lab)

export default LabContainer
