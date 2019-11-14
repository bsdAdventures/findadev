import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { errorReducer } from "./common";
import { profileReducer } from "./profile";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});
