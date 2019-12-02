import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TextArea } from "../common";
import { addPost } from "../../redux";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  handleOnSubmit = e => {
    e.preventDefault();

    const { auth, addPost } = this.props;
    const { text } = this.state;

    const newPost = {
      text: text,
      name: auth.user.name,
      avatar: auth.user.avatar
    };

    addPost(newPost);
    this.setState({ text: "" });
  };

  handleOnInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors, text } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.handleOnSubmit}>
              <div className="form-group">
                <TextArea
                  placeholder="Create a post"
                  name="text"
                  value={text}
                  onChange={this.handleOnInputChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
