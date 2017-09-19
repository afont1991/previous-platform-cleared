import React, { Component } from 'react';
import { Panel, Accordion, Glyphicon} from 'react-bootstrap'

class Faq extends Component {
  render() {
    const faqSection = this.props.MatchData.Deal.Faqs
    .filter((faq) => {
      return faq.status === 'show'
    }).map((faq, i) => {
    const faqQuestion = (<div>{faq.question}<Glyphicon glyph="plus" className="plus-faq"></Glyphicon></div>);
      return (
        <Panel
          className='faq-well'
          key={i}
          header={faqQuestion}
          eventKey={i}
        >
          <p className="faq-content">{faq.answer}</p>
        </Panel>
      )
    })
    return (
      <div>
      <div className="col-md-offset-3 col-md-6 text-center">
        <p className="profile-text text-muted header-font"><strong>Deal FAQs</strong></p>
        <Accordion>
          {faqSection}
        </Accordion>
      </div>
      </div>
    );
  }
}

export default Faq;
