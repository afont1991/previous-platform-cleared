import React, { Component } from 'react';
import {Nav, NavItem} from 'react-bootstrap';

class Navigation extends Component {
  render() {
    let currentSectionName = this.props.formData.currentSection
    return (
      <Nav
        bsStyle="tabs"
        activeKey={currentSectionName}
        onSelect={(nextSectionName)=> {
          this.props.changeSection(
            this.props.formData,
            currentSectionName,
            nextSectionName
          )
        }}
      >
        <NavItem eventKey="overview">Company Overview</NavItem>
        <NavItem eventKey="team">Team</NavItem>
        <NavItem eventKey="criteria">Criteria</NavItem>
      </Nav>
    );
  }
}

export default Navigation;
