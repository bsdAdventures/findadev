import * as types from "../../constants";
import { isEmpty } from "../../../utils";

export const authReducer = (
  state = {
    isAuthenticated: false,
    user: {}
  },
  action
) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    default:
      return state;
  }
};
