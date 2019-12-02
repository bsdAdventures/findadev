import * as types from "../../constants";

export const postReducer = (
  state = {
    posts: [],
    post: {},
    loading: false
  },
  action
) => {
  switch (action.type) {
    case types.POST_LOADING_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case types.GET_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case types.ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case types.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    default:
      return state;
  }
};
