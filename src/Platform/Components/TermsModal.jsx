import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

class TermsModal extends Component {
  render() {
    return (
      <Modal show={this.props.open}>
        <Modal.Header >
          <p className="profile-text profile-section-header text-center">
            <strong>Terms of service</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
          <div className="row text-center">
            <div className="col-md-6">
              <button
                className="small-standard-btn btn-default purple-background white-color no-text-transform"
                onClick={() => {this.props.agree()}}
                type="submit">
                Agree
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="small-standard-btn btn-default purple-background white-color no-text-transform"
                onClick={() => {this.props.logout()}}
                type="submit">
                Decline
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default TermsModal
