import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginuser } from "../../redux/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;

    if (nextProps.auth.isAuthenticated) {
      history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleOnInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { loginuser } = this.props;

    const user = { email, password };

    loginuser(user);
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Welcome, sign in to your FindaDev account
              </p>
              <form onSubmit={this.handleOnLogin}>
                <div className="form-group">
                  <input
                    type="email"
                    className={`form-control form-control-lg ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={this.handleOnInputChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback"> {errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.handleOnInputChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback"> {errors.password}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(mapStateToProps, { loginuser })(Login);
