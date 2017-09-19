import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div>
        <div className="container footer-section footer-padding">
          <section id="contact">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <a href="https://www.linkedin.com/company/11003746?trk=prof-exp-company-name"><i className="fa fa-linkedin fa-2x sr-contact social-media-icon-footer"></i></a>
                  <a href="https://twitter.com/DebtMaven"><i className="fa fa-twitter fa-2x sr-contact social-media-icon-footer"></i></a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 text-right top-margin-minor">
                  <p>Terms of Use</p>
                </div>
                <div className="col-md-6 text-left top-margin-minor">
                  <p>Privacy Policy</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-center">
                  <p>Copyright 2017 / DebtMaven, Inc / All Rights Reserved</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Footer;
