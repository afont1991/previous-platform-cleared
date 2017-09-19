import React, { Component } from 'react';
import { Well, Glyphicon } from 'react-bootstrap'

class DocumentCenter extends Component {
  render() {
    if(!this.props.MatchData) {
    return (
      <div className="container-fluid">
        <div className='row'>
          <div className="col-md-12">
            <Well className="notification-well">
              <p className="profile-text text-muted header-font text-center"><strong>Coming Soon</strong></p>
            </Well>
          </div>
        </div>
      </div>
    );
  } else {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="table-responsive">
                 <table className="table the-table">
                  <thead>
                    <tr>
                      <th className='text-center even-width'>Teaser</th>
                      <th className='text-center even-width'>NDA</th>
                      <th className='text-center even-width'>CIM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        {this.props.MatchData.teaser ? (
                          <Glyphicon className="saved" glyph="floppy-saved" />
                        ) : (
                          <Glyphicon className="download" glyph="floppy-remove" />
                        )}
                      </td>
                       <td className="text-center">
                         {this.props.MatchData.nda ? (
                           <Glyphicon className="saved" glyph="floppy-saved" />
                         ) : (
                           <Glyphicon className="download" glyph="floppy-remove" />
                         )}
                      </td>
                       <td className="text-center">
                         {this.props.MatchData.cim ? (
                           <Glyphicon className="saved" glyph="floppy-saved" />
                         ) : (
                           <Glyphicon className="download" glyph="floppy-remove" />
                         )}
                      </td>
                    </tr>
                    <tr>
                      <td className="date text-center">
                        7/19/17
                      </td>
                       <td className="date text-center">
                        7/19/17
                      </td>
                      <td className="date text-center">
                        7/19/17
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default DocumentCenter;
