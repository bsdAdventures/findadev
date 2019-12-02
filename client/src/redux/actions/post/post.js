import axios from "axios";
import * as types from "../../constants";

// Add Post
export const addPost = postData => async dispatch => {
  dispatch(clearErrors());

  try {
    const addNewPost = await axios.post("/api/posts", postData);
    if (addNewPost) {
      dispatch({
        type: types.ADD_POST_SUCCESS,
        payload: addNewPost.data
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Get Posts
export const getPosts = () => async dispatch => {
  dispatch(setPostLoading());

  try {
    const getAllPosts = await axios.get("/api/posts");
    if (getAllPosts) {
      dispatch({
        type: types.GET_POSTS_SUCCESS,
        payload: getAllPosts.data
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_ERRORS,
      payload: null
    });
  }
};

// Get Post
export const getPost = id => async dispatch => {
  dispatch(setPostLoading());

  try {
    const getAPost = await axios.get(`/api/posts/${id}`);
    if (getAPost) {
      dispatch({
        type: types.GET_POST_SUCCESS,
        payload: getAPost.data
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_ERRORS,
      payload: null
    });
  }
};

// Delete Post
export const deletePost = id => async dispatch => {
  try {
    const deleteAPost = await axios.delete(`/api/posts/${id}`);
    if (deleteAPost) {
      dispatch({
        type: types.DELETE_POST_SUCCESS,
        payload: id
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Add Like
export const addLike = id => async dispatch => {
  try {
    const addALike = await axios.post(`/api/posts/like/${id}`);
    if (addALike) {
      dispatch(getPosts());
    }
  } catch (error) {
    dispatch({
      type: types.GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Remove Like
export const removeLike = id => async dispatch => {
  try {
    const removeALike = await axios.post(`/api/posts/unlike/${id}`);
    if (removeALike) {
      dispatch(getPosts());
    }
  } catch (error) {
    dispatch({
      type: types.GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Add Comment
export const addComment = (postId, commentData) => async dispatch => {
  dispatch(clearErrors());

  try {
    const addAComment = await axios.post(
      `/api/posts/comment/${postId}`,
      commentData
    );
    if (addAComment) {
      dispatch({
        type: types.GET_POST_SUCCESS,
        payload: addAComment.data
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const deleteAComment = await axios.delete(
      `/api/posts/comment/${postId}/${commentId}`
    );
    if (deleteAComment) {
      dispatch({
        type: types.GET_POST_SUCCESS,
        payload: deleteAComment.data
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: types.POST_LOADING_REQUEST
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: types.CLEAR_POST_ERRORS
  };
};
