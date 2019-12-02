import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TextArea } from "../common";
import { addComment } from "../../redux";

class CommentForm extends Component {
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

    const { text } = this.state;
    const { postId, auth, addComment } = this.props;

    const newComment = {
      text: text,
      name: auth.user.name,
      avatar: auth.user.avatar
    };

    addComment(postId, newComment);
    this.setState({ text: "" });
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors, text } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.handleOnSubmit}>
              <div className="form-group">
                <TextArea
                  placeholder="Reply to post"
                  name="text"
                  value={text}
                  onChange={this.handleOnChange}
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment })(CommentForm);
