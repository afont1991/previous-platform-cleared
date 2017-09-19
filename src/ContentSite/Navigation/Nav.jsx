import React, { Component } from 'react';
import { Link } from 'react-router';
import LoginModal from '../Login/Container';
// import { DropdownButton, MenuItem } from 'react-bootstrap';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
  }
  componentWillMount(){
    this.setState({
      ShowNav: false
    })
  }
  toggleNav(){
    let navMenu = document.getElementById("bs-example-navbar-collapse-1");
    let classArray = navMenu.className.split(' ');
    let showIndex = classArray.indexOf('show');
    let hideIndex = classArray.indexOf('hidden');
    if(showIndex !== -1){
      classArray.splice(showIndex, 1)
    }
    if(hideIndex !== -1){
      classArray.splice(hideIndex, 1)
    }
    if(this.state.ShowNav === false){
      classArray.push('show');
    } else {
      classArray.push('hidden');
    }
    navMenu.className = classArray.join(" ");
    this.setState({ ShowNav: !this.state.ShowNav})
  }
  render() {
      // let LoginButton = (<Link className="page-scroll big-nav-font" onClick={() => this.props.onClickLogin()}>Login</Link>);
      // let LogoutButton = (<Link className="page-scroll big-nav-font" onClick={() => this.props.onClickLogOut()}>Logout</Link>);
    return (
      <div>
        <nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed nav-menu-button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" onClick={()=> this.toggleNav()}>
                    <a className="nav-menu-button"> Menu <i className="fa fa-bars" /></a>
                  </button>
                  <Link className="navbar-brand page-scroll no-text-transform" to="/">DebtMaven</Link>
                </div>
              </div>
              <div className="col-sm-10">
                <div className="collapse navbar-collapse navbar-right" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li>
                      <Link className="page-scroll big-nav-font hidden" activeClassName="big-nav-active" to="/borrower">Borrowers</Link>
                    </li>
                    <li>
                      <Link className="page-scroll big-nav-font hidden" activeClassName="big-nav-active" to="/lender">Lenders</Link>
                    </li>
                    <li>
                      <Link className="page-scroll big-nav-font hidden" activeClassName="big-nav-active" to="/about">About</Link>
                    </li>
                    <li>
                      <Link className="page-scroll big-nav-font hidden" activeClassName="big-nav-active" to="/about">Resources</Link>
                    </li>
                  </ul>
                  {this.props.loggedIn === true ? (
                    <ul className="nav navbar-nav">
                      <li>
                        <Link className="page-scroll big-nav-font" activeClassName="big-nav-active" to="/platform">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="page-scroll big-nav-font" activeClassName="big-nav-active" onClick={()=>{this.props.logout()}}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    <LoginModal />
                  )}
                  {this.props.loggedIn === true ? '' : (
                    <ul className="nav navbar-nav">
                      <li>
                        <Link className="page-scroll big-nav-font" activeClassName="big-nav-active" to="/register">Request Access</Link>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
