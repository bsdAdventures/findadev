import * as types from "../../constants";

export const profileReducer = (
  state = {
    profile: null,
    profiles: null,
    loading: false
  },
  action
) => {
  switch (action.type) {
    case types.GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case types.CLEAR_USER_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
};
