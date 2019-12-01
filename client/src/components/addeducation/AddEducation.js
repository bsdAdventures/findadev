import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TextField, TextArea } from "../common";
import { addEducation } from "../../redux";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleOnInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnCheck = () => {
    const { disabled, current } = this.state;
    this.setState({
      disabled: !disabled,
      current: !current
    });
  };

  handleOnSubmit = async e => {
    e.preventDefault();

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = this.state;
    const { addEducation, history } = this.props;

    const eduData = {
      school: school,
      degree: degree,
      fieldofstudy: fieldofstudy,
      from: from,
      to: to,
      current: current,
      description: description
    };

    addEducation(eduData, history);
  };

  render() {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
      errors,
      disabled
    } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleOnSubmit}>
                <TextField
                  placeholder="* School"
                  name="school"
                  value={school}
                  onChange={this.handleOnInputChange}
                  error={errors.school}
                />
                <TextField
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={degree}
                  onChange={this.handleOnInputChange}
                  error={errors.degree}
                />
                <TextField
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={fieldofstudy}
                  onChange={this.handleOnInputChange}
                  error={errors.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextField
                  name="from"
                  type="date"
                  value={from}
                  onChange={this.handleOnInputChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextField
                  name="to"
                  type="date"
                  value={to}
                  onChange={this.handleOnInputChange}
                  error={errors.to}
                  disabled={disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={current}
                    checked={current}
                    onChange={this.handleOnCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Currently Enrolled
                  </label>
                </div>
                <TextArea
                  placeholder="Program Description"
                  name="description"
                  value={description}
                  onChange={this.handleOnInputChange}
                  error={errors.description}
                  info="Tell us about the program that you were in"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
