import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers";

const middleWare =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? [thunk, logger]
    : [thunk];

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(...middleWare))
  );

  return { store };
};
