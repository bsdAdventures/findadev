import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { errorReducer } from "./common";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
