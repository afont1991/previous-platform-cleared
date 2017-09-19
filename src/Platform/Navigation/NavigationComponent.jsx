import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import isEmpty from 'is-empty'
import SubNav from '../Components/SubNav'
import HelpModal from '../Help/Container'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, Glyphicon, InputGroup } from 'react-bootstrap';

class PlatformNav extends Component {
  constructor(props){
    super(props)
    this.SubmitSearch = this.SubmitSearch.bind(this)
  }

  SubmitSearch(e){
    if(e.key === 'Enter') {
      let SearchUrl = `/platform/company/search`
      if(!isEmpty(this.props.SearchInput.value)){
        SearchUrl = `/platform/company/search/${this.props.SearchInput.value}`
      }
      browserHistory.push(SearchUrl);
    }
  }
  render() {
    let SearchUrl = `/platform/company/search`
    if(!isEmpty(this.props.SearchInput.value)){
      SearchUrl = `/platform/company/search/${this.props.SearchInput.value}`
    }
    let subNav = ('')
		if(
      this.props.location.pathname === "/platform/deal/search" ||
      this.props.location.pathname === "/platform/company/search" ||
      this.props.location.pathname === "/platform/save/search" ||
      (this.props.location.pathname.indexOf("/platform/company/search/saved") !== -1) ||
      (this.props.location.pathname.indexOf("/platform/deal/search/saved") !== -1)
    ){
			subNav = (<SubNav location={this.props.location} />)
		}
    let searchButton = null;
    if(this.props.platformType === 'borrower') {
      searchButton =
        <input
          type='Text'
          placeholder='Lender Name'
          className="form-control"
          onChange={(e) => this.props.onChange(e, ['SearchInput'])}
          value={this.props.SearchInput.value}
          onFocus={() => {
            window.addEventListener("keypress", this.SubmitSearch)}
          }
          onBlur={() => {
            window.removeEventListener("keypress", this.SubmitSearch)}
          }
        />
    } else {
      searchButton =
        <input
          type='Text'
          placeholder='Company Name'
          className="form-control"
          onChange={(e) => this.props.onChange(e, ['SearchInput'])}
          value={this.props.SearchInput.value}
          onFocus={() => {
            window.addEventListener("keypress", this.SubmitSearch)}
          }
          onBlur={() => {
            window.removeEventListener("keypress", this.SubmitSearch)}
          }
        />
    }
    let borrowerMenuItem = null;
    if(this.props.platformType === 'borrower') {
      borrowerMenuItem =
        <MenuItem onClick={()=>{browserHistory.push("/platform/company/search")}}>
          <span className="page-scroll big-nav-font">Lenders</span>
        </MenuItem>
    } else {
      borrowerMenuItem =
        <MenuItem onClick={()=>{browserHistory.push("/platform/company/search")}}>
          <span className="page-scroll big-nav-font">Companies</span>
        </MenuItem>
    }
    return (
      <div>
        <Navbar id="mainNav" inverse fixedTop collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link className="navbar-brand page-scroll no-text-transform" to="/">DebtMaven <span className="beta-text">Beta</span></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <InputGroup>
                  {searchButton}
                  <InputGroup.Addon>
                    <Glyphicon className="search-glyph" glyph="search" onClick={() => {browserHistory.push(SearchUrl);}} />
                  </InputGroup.Addon>
                </InputGroup>
              </FormGroup>
              {' '}
            </Navbar.Form>
            <Nav pullRight>
              <NavItem onClick={()=>{browserHistory.push("/platform")}}><span className="page-scroll big-nav-font">Dashboard</span></NavItem>
              <NavDropdown eventKey={3} title="Search" className="big-nav-font" id="basic-nav-dropdown">
                {(this.props.platformType === 'lender' || this.props.isAdmin) ?
                  <MenuItem onClick={()=>{browserHistory.push("/platform/deal/search")}}>
                    <span className="page-scroll big-nav-font">Deals</span>
                  </MenuItem>
                 : ('') }
                {borrowerMenuItem}
              </NavDropdown>
              <NavItem onClick={()=>{browserHistory.push("/platform/account")}}><span className="page-scroll big-nav-font">Account <i className="fa fa-1x fa-cog sr-icons"></i></span></NavItem>
              <HelpModal />
              <NavItem onClick={()=>{this.props.logout()}}><span className="page-scroll big-nav-font">Logout</span></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="subNav-container">
          {subNav}
        </div>
      </div>
    );
  }
}

export default PlatformNav;
