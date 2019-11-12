import * as types from "../../constants";

export const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};
