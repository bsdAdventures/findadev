import axios from "axios";
import jwt_decode from "jwt-decode";
import * as types from "../../constants";
import { setAuthToken } from "../../../utils";

export const registerUser = (data, history) => async dispatch => {
  dispatch({ type: types.REGISTER_USER_REQUEST });

  try {
    //send user data to server
    const register = await axios.post("/api/users/register", data);

    dispatch({ type: types.REGISTER_USER_SUCCESS });

    //redirect to login after registration
    if (register) history.push("/login");
  } catch (error) {
    dispatch({
      type: types.GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const loginuser = data => async dispatch => {
  dispatch({ type: types.LOGIN_USER_REQUEST });

  try {
    const login = await axios.post("/api/users/login", data);
    if (login) {
      const { token } = login.data;

      //save to local storage
      localStorage.setItem("token", token);

      //set token to authorzation headers
      setAuthToken(token);

      //decode token from server
      const decoded = jwt_decode(token);

      //set current user
      dispatch(setCurrentUser(decoded));

      dispatch({ type: types.LOGIN_USER_SUCCESS });
    }
  } catch (error) {
    dispatch({
      type: types.GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const setCurrentUser = decoded => {
  return {
    type: types.SET_CURRENT_USER,
    payload: decoded
  };
};
