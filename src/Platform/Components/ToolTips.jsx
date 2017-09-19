import React, { Component } from 'react';
import { ButtonToolbar, OverlayTrigger, Tooltip } from 'react-bootstrap';

class ToolTips extends Component {
  render() {
    const tooltip = (
      <Tooltip id="tooltip">{this.props.content}</Tooltip>
    );
    return(
      <ButtonToolbar className={this.props.type === 'range' ? 'range-tooltips' : ''}>
        <OverlayTrigger placement="top" overlay={tooltip}>
          <span className="glyphicon glyphicon-question-sign can-col"></span>
        </OverlayTrigger>
      </ButtonToolbar>
    );
  }
}

export default ToolTips
