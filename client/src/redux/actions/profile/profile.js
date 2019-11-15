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


//create user profile
export const createProfile = (data, history) => async dispatch => {
  dispatch({ type: types.CREATE_PROFILE_REQUEST });

  try {
    //send create profile data to server
    const createProfile = await axios.post("/api/profile", data);

    if (createProfile) {
      dispatch({
        type: types.CREATE_PROFILE_SUCCESS,
        payload: createProfile.data
      });

      history.push("/dashboard");
    }
  } catch (error) {
    dispatch({
      type: types.GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const clearCurrentProfile = () => {
  return {
    type: types.CLEAR_USER_PROFILE
  };
};
