import React, { Component } from 'react';

// Presenational Components
import FormInput from '../../Components/FormInput';

class News extends Component {
  render() {
    const formData = this.props.state.newLookupForm
    return (
      <div className="col-md-6 lookup-container">
        <div className="lookup-input-container">
          <FormInput
            Input={formData[this.props.type]}
            path={['newLookupForm', this.props.type]}
            onChange={this.props.onChange}
          />
          <button
            className="btn btn-default purple-background white-color no-text-transform submitLookupButton"
            onClick={()=>{this.props.SubmitLookup(formData[this.props.type])}}
            type="submit">
            {formData[this.props.type].buttonText}
          </button>
        </div>
        <div className="lookup-delete-container">
          {this.props.state.deleteButtonState[this.props.type] === true ? (
            <button
              className="btn btn-default purple-background white-color no-text-transform deleteLookupButton"
              onClick={()=>{this.props.DeleteLookups(this.props.state.lookups[this.props.type], this.props.type)}}
              type="submit">
              Delete Selected
            </button>
          ) : (
            <button
              className="btn btn-default purple-background white-color no-text-transform deleteLookupButton disabled"
              type="submit">
              Delete Selected
            </button>
          )}
        </div>
        <div className="lookup-table-container">
          <table className="table table-bordered">
            <thead>
              <tr className="the-table platform-table-head">
                <th>Headline</th>
                <th>Content</th>
                <th>Url</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default News;
