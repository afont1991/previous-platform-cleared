import React, { Component } from 'react';
import {Nav, NavItem} from 'react-bootstrap';

class Navigation extends Component {
  render() {
    return (
      <Nav
        bsStyle="tabs"
        activeKey={this.props.currentSection}
        onSelect={(nextSectionName)=> { this.props.changeSection(nextSectionName) }}
      >
        <NavItem eventKey="summary">Summary</NavItem>
        <NavItem eventKey="documents">Documents</NavItem>
        <NavItem eventKey="messages">Messages</NavItem>
        <NavItem eventKey="faq">FAQ</NavItem>
      </Nav>
    );
  }
}

export default Navigation;
