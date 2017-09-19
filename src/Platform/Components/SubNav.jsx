import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import {Nav, NavItem} from 'react-bootstrap';

class SubNav extends Component {
  render() {
		let currentTab
		if(this.props.location.pathname.indexOf("/platform/deal/search") !== -1){
			currentTab = 'deal'
		} else if(this.props.location.pathname.indexOf("/platform/company/search") !== -1){
			currentTab = 'company'
		} else {
			currentTab = 'saved-searches'
		}
		return(
			  <Nav
	        bsStyle="tabs"
	        activeKey={currentTab}
					onSelect={(key)=>{
						let pathName;
						switch (key) {
							case 'deal':
								pathName = '/platform/deal/search'
								break
							case 'company':
								pathName = '/platform/company/search'
								break
							default:
								pathName = '/platform/save/search'
								break
						}
						browserHistory.push(pathName)
					}}
      	>
        <NavItem eventKey="company">Companies</NavItem>
        <NavItem eventKey="deal">Deal</NavItem>
        <NavItem eventKey="saved-searches">Saved Searches</NavItem>
      </Nav>
		);
  }
}

export default SubNav;
