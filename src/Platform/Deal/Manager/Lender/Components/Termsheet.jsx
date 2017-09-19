import React, { Component } from 'react';
// import TermsheetGeneratorContainer from '../../../../termSheetGenerator/TermSheetGeneratorContainer'
import {Well} from 'react-bootstrap'

class Termsheet extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className='row'>
          <div className="col-md-12">
            <Well className="notification-well">
              <p className="profile-text text-muted header-font text-center"><strong>Coming Soon</strong></p>
            </Well>
            {/* <TermsheetGeneratorContainer /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Termsheet;
