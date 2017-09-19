import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class LoginNav extends Component {
  render(){
    return (
      <div>
        <nav id="mainNav" className="navbar navbar-default navbar-platform">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                  <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
                </button>
                <Link className="navbar-brand page-scroll no-text-transform" to="/">DebtMaven <span className="beta-text">Beta</span></Link>
              </div>
              <div className="company-search">
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right main-nav">
                    <ul className="nav navbar-nav">
                      <li>
                        <Link className="page-scroll big-nav-font" activeClassName="big-nav-active" to="/register">Request Access</Link>
                      </li>
                    </ul>
                    <ul className="nav navbar-nav">
                      <li>
                        <Link className="page-scroll big-nav-font" activeClassName="big-nav-active" to="/">Login</Link>
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default LoginNav;
