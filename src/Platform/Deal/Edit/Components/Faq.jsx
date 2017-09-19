import React, { Component } from 'react';
import FormInput from '../../../Components/FormInput'
import { Well } from 'react-bootstrap'

class Faq extends Component {
  render() {
    const formData = this.props.formData.faq_form
    const savedFaqs = formData.faqArray.map((faq, i) => {
      if(!faq.deleted){
        return (
          <Well key={i} >
            <div className="row">
              <div className='col-md-8 section-margin-top'>
                <p className="platform-text-large text-muted animated fadeInUp no-margin-bottom"><strong>{faq.question}:</strong></p>
                <p className="platform-text text-muted">{faq.answer}</p>
              </div>
              <div className="col-md-4">
                <a className="platform-button red-background" onClick={() => this.props.removeFaq(faq.id)}>Remove</a>
              </div>
            </div>
          </Well>
        )
      } else {
        return ''
      }
    })
    return (
      <div className="container-fluid margin-top-20">
        <div className="row">
          <div className="col-md-5">
            <p className="profile-text text-muted profile-section-header"><strong>Add FAQs</strong></p>
            <FormInput
              Input={formData.question}
              path={['formData', 'faq_form', 'question']}
              onChange={this.props.onChange}
            />
            <FormInput
              Input={formData.answer}
              path={['formData', 'faq_form', 'answer']}
              onChange={this.props.onChange}
            />
            <a className="platform-button green-background" onClick={() => this.props.addFaq(formData)}>Add</a>
          </div>
          <div className="col-md-7">
            <p className="profile-text text-muted profile-section-header"><strong>Saved FAQs</strong></p>
            {savedFaqs}
          </div>
        </div>
      </div>
    );
  }
}

export default Faq;
