import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'

export default class Register extends Component {

	constructor (props) {
		super(props);
		this.state = {
			email: '',
			name: '',
			password: '',
			password2: '',
			errors: {}
		}
	}

	handleOnInputChange = (e) => {

		this.setState({
			[e.target.name]: e.target.value
		})

	}


	handleOnSubmit = async (e) => {
		e.preventDefault()
		const { email, name, password, password2 } = this.state;

		const newUser = { email, name, password, password2 }

		try {
			await axios.post('/api/users/register', newUser)

		} catch (error) {
			console.log("error", error);

			this.setState({ errors: error.response.data })

		}


	}




	render () {
		const { email, name, password, password2 } = this.state;


		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your FindaDev account</p>
							<form onSubmit={ this.handleOnSubmit }>
								<div className="form-group">
									<input type="text" className="form-control form-control-lg" placeholder="Name" name="name" value={ name } onChange={ this.handleOnInputChange } />
								</div>
								<div className="form-group">
									<input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={ email } onChange={ this.handleOnInputChange } />
									<small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
								</div>
								<div className="form-group">
									<input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={ password } onChange={ this.handleOnInputChange } />
								</div>
								<div className="form-group">
									<input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2" value={ password2 } onChange={ this.handleOnInputChange } />
								</div>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>åå
		)
	}
}
