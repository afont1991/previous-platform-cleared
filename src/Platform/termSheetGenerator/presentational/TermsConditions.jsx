import React, { Component } from 'react';

class TermsConditions extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h2>Terms and Conditions</h2>
            <p>
            Think of us as your global logistics control tower in the cloud.
            When you book with Flexport you gain access to a global network of
            logistics service providers, beautiful supply chain visualizations,
            easy-to-use software, and industry experts on-call. Our web app allows
            you to request and book shipments, track all your global freight movements
            in real-time, manage product data, visualize your supply chain, view analytics, and more.
            </p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={()=> this.props.NextClick(this.state)}> Next</button>
      </div>
    );
  }
}

export default TermsConditions;
