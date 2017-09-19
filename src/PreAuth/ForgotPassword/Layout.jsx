import React, { Component } from 'react';
import FormInput from '../../Platform/Components/FormInput'

class Layout extends Component {
	render() {
		const formData = this.props.formData.formData
			return (
				<div className="container-fluid">
					<div className="col-lg-6 col-lg-offset-3">
						<div className="content">
							<h2 className="forgot-password">Forgot Password</h2>
							<p className="nm-text">Forgot your password? It happens to the best of us...</p>
							{this.props.state.matching === false ? (<div className="alert alert-danger animated fadeInLeft" role="alert">Passwords do not match</div>) : ('')}
							{this.props.state.status === 'error' ? (<div className="alert alert-danger animated fadeInLeft" role="alert">Invalid Password reset Token</div>) : ('')}
							<div className="row flexbox padding-top">
								<div className="col-xs-12 flex-items">
									<FormInput
										Input={formData.rePassword_1}
										path={['formData', 'rePassword_1']}
										onChange={this.props.onChange}
									/>
								</div>
								<div className="col-xs-12 flex-items">
									<FormInput
										Input={formData.rePassword_2}
										path={['formData', 'rePassword_2']}
										onChange={this.props.onChange}
									/>
								</div>
								<div className="row submit flex-items">
									<div className="col-md-6">
										<a className="platform-button sign-in-btn" onClick={()=>{this.props.submitNewPassword(formData)}}
											>SUBMIT
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}


export default Layout;
