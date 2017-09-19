import React, { Component } from 'react';
import { Accordion, Panel, Glyphicon } from 'react-bootstrap';

class FAQComponent  extends Component {
  render() {
    const profileData = this.props.profileData;
    const faqQuestions = profileData.faq.map((faq, i) => {
      const faqQuestion = (<div>{faq.question}<Glyphicon glyph="plus" className="plus-faq"></Glyphicon></div>);
      return(
        <Panel
          header={faqQuestion}
          key={i}
          eventKey={i}
          className="faq-panel">
          <p className="faq-content">{faq.answer}</p>
        </Panel>
      )
    })
    return (
      <Accordion>{faqQuestions}</Accordion>
    )
  }
}

export default FAQComponent;
