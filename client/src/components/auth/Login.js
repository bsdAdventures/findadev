import React, { Component } from 'react'

export default class Login extends Component {

	constructor (props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			error: {}
		}
	}



	handleOnInputChange = (e) => {

		this.setState({
			[e.target.name]: e.target.value
		})

	}


	handleOnLogin = (e) => {
		e.preventDefault()
		const { email, password } = this.state;



		const user = { email, password }

		console.log(user, 'nu')
	}


	render () {

		const { email, password } = this.state;

		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">Welcome, sign in to your FindaDev account</p>
							<form onSubmit={ this.handleOnLogin }>
								<div className="form-group">
									<input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={ email } onChange={ this.handleOnInputChange } />
								</div>
								<div className="form-group">
									<input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={ password } onChange={ this.handleOnInputChange } />
								</div>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
