import axios from "axios";
import * as types from "../../constants";

export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading());

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

// Get profile by handle
export const getProfileByHandle = handle => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const getProfile = await axios.get(`/api/profile/handle/${handle}`);
    if (getProfile) {
      dispatch({
        type: types.GET_USER_PROFILE_SUCCESS,
        payload: getProfile.data
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_USER_PROFILE_SUCCESS,
      payload: null
    });
  }
};

//create user profile
export const createProfile = (data, history) => async dispatch => {
  dispatch(setProfileLoading());

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

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const getAllProfiles = await axios.get("/api/profile/all");
    if (getAllProfiles) {
      dispatch({
        type: types.GET_USER_PROFILES_SUCCESS,
        payload: getAllProfiles.data
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_USER_PROFILES_SUCCESS,
      payload: null
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      const deleteAccount = await axios.delete("/api/profile");
      if (deleteAccount) {
        dispatch({
          type: types.SET_CURRENT_USER,
          payload: {}
        });
      }
    } catch (error) {
      dispatch({
        type: types.GET_ERRORS,
        payload: error.response.data
      });
    }
  }
};

// Add experience
export const addExperience = (expData, history) => async dispatch => {
  try {
    const addExp = await axios.post("/api/profile/experience", expData);
    if (addExp) {
      history.push("/dashboard");
    }
    dispatch({ type: types.ADD_EXPERIENCE_SUCCESS });
  } catch (error) {
    dispatch({
      type: types.GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Delete Experience
export const deleteExperience = id => async dispatch => {
  try {
    const deleteExp = await axios.delete(`/api/profile/experience/${id}`);
    if (deleteExp) {
      dispatch({
        type: types.GET_USER_PROFILE_SUCCESS,
        payload: deleteExp.data
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Add education
export const addEducation = (eduData, history) => async dispatch => {
  try {
    const addEdu = await axios.post("/api/profile/education", eduData);
    if (addEdu) {
      history.push("/dashboard");
      dispatch({
        type: types.ADD_EDUCATION_SUCCESS
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Delete Education
export const deleteEducation = id => async dispatch => {
  try {
    const deleteEdu = await axios.delete(`/api/profile/education/${id}`);
    if (deleteEdu) {
      dispatch({
        type: types.GET_USER_PROFILE_SUCCESS,
        payload: deleteEdu.data
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_ERRORS,
      payload: error.response.data
    });
  }
};

//clear profile
export const clearCurrentProfile = () => {
  return {
    type: types.CLEAR_USER_PROFILE
  };
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: types.PROFILE_LOADING
  };
};
