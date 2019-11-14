import axios from "axios";
import * as types from "../../constants";

export const getCurrentProfile = () => async dispatch => {
  dispatch({ type: types.GET_USER_PROFILE_REQUEST });

  try {
    //Get user profile data from server
    const profile = await axios.get("/api/profile");

    if (profile) {
      dispatch({ type: types.GET_USER_PROFILE_SUCCESS, payload: profile.data });
    }
  } catch (error) {
    dispatch({
      type: types.GET_USER_PROFILE_SUCCESS,
      payload: {}
    });
  }
};

export const clearCurrentProfile = () => {
  return {
    type: types.CLEAR_USER_PROFILE
  };
};
