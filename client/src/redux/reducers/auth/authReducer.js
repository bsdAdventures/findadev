export const authReducer = (
  state = {
    isAuthenticated: false,
    user: {}
  },
  action
) => {
  switch (action.type) {
    // case types.NAVIGATE_TO_NEW_PAGE_FROM_WELCOME_STACK:
    //   return {
    //     ...state,
    //     loading: false,

    //   };
    // case types.CREATE_NEW_ACCOUNT_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //   };

    default:
      return state;
  }
};
