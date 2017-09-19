import React, { Component } from 'react';

import FormInput from '../../Platform/Components/FormInput'

class Layout extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  componentWillMount(){
    this.setState({
      showModal: false,
    })
  }
  render() {
    return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-xs-12">
            {this.props.status === 'error' ? (<div className="alert alert-danger animated fadeInLeft" role="alert">Error with request</div>) : ('')}
            <FormInput
              Input={this.props.form.email}
              path={['formData', 'email']}
              onChange={this.props.onChange}
            />
					</div>
					<div className="row">
						<div className="col-xs-12 text-center">
							<a className="platform-button sign-in-btn" onClick={()=>{this.props.submitForgotRequest(this.props.form.email.value)}}
								>SUBMIT
							</a>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default Layout;
