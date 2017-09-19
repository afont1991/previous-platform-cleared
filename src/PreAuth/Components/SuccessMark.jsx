import React, { Component } from 'react';
import { Well } from 'react-bootstrap';

class Success extends Component {
  render(){
    return (
      <div>
        <div className="row">
          <Well className="registration-well text-center">
            <p className="profile-text text-muted">
              <strong>Password Updated Successully</strong>
              <svg
                className="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52">
                <circle
                  className="checkmark__circle"
                  cx="26" cy="26" r="25" fill="none"
                />
                <path
                  className="checkmark__check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </p>
          </Well>
        </div>
      </div>
    );
  }
}

export default Success;
