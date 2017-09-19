import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Glyphicon } from 'react-bootstrap'

class UploadDocs extends Component {
  render() {
    const formData = this.props.formData.documentSection;
    const onDrop = this.props.onDrop;
    const dropZoneStyle = {
      border: 'none',
      marginTop: '10px'
    }
    const uploaded = (<Glyphicon className="saved-center" glyph="floppy-saved" />)
    const notUploaded = (<Glyphicon className="saved-center not-uploaded" glyph="floppy-remove" />)
    return (
      <div className="row doc-row">
        <div className='col-md-2 col-md-offset-1 upload-div'>
          {formData.teaser.file ? (
            <div className="form-group">
              {uploaded}
              <button className="platform-button mini-button doc-btn-remove" onClick={()=>{this.props.removeFile(['formData', 'documentSection', 'teaser'])}}>Remove Teaser</button>
            </div>
          ) : (
            <div className="form-group">
              {notUploaded}
              <Dropzone accept='.docx, .doc, .pdf, .odt' style={dropZoneStyle} onDrop={(acceptedFiles, rejectedFiles)=>{onDrop(acceptedFiles, rejectedFiles, ['formData', 'documentSection', 'teaser']) } }>
                <button className="platform-button mini-button no-margin-top doc-btn">Upload Teaser</button>
              </Dropzone>
            </div>
          )}
        </div>
        <div className='col-md-3 col-md-offset-2 upload-div'>
          {formData.nda.file ? (
            <div className="form-group">
              {uploaded}
              <button className="platform-button mini-button doc-btn-remove" onClick={()=>{this.props.removeFile(['formData', 'documentSection', 'nda'])}} >Remove NDA</button>
            </div>
          ) : (
            <div className="form-group">
              {notUploaded}
              <Dropzone accept='.docx, .doc, .pdf, .odt' style={dropZoneStyle} onDrop={(acceptedFiles, rejectedFiles)=>{onDrop(acceptedFiles, rejectedFiles, ['formData', 'documentSection', 'nda']) } }>
                <button className="platform-button mini-button no-margin-top doc-btn">Upload NDA</button>
              </Dropzone>
            </div>
          )}
        </div>
        <div className='col-md-2 col-md-offset-1 upload-div'>
          <div className="form-group">
            {formData.cim.file ? (
              <div className="form-group">
                {uploaded}
                <button className="platform-button mini-button doc-btn-remove" onClick={()=>{this.props.removeFile(['formData', 'documentSection', 'cim'])}}>Remove CIM</button>
              </div>
            ) : (
              <div className="form-group">
                {notUploaded}
                <Dropzone accept='.docx, .doc, .pdf, .odt' style={dropZoneStyle} onDrop={(acceptedFiles, rejectedFiles)=>{onDrop(acceptedFiles, rejectedFiles, ['formData', 'documentSection', 'cim']) } }>
                  <button className="doc-btn platform-button mini-button no-margin-top">Upload CIM</button>
                </Dropzone>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UploadDocs;
