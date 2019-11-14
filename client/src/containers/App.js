import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import {
  configureStore,
  setCurrentUser,
  logoutUser,
  clearCurrentProfile
} from "../redux";
import {
  Navbar,
  Landing,
  Footer,
  Register,
  Login,
  Dashboard
} from "../components";
import { setAuthToken } from "../utils";
import "./App.css";

const { store } = configureStore();

if (localStorage.token) {
  //set token to authorzation headers
  setAuthToken(localStorage.token);
  //decode token from server
  const decoded = jwt_decode(localStorage.token);
  //set current user
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    //log user out
    store.dispatch(logoutUser());

    //clear user profile

    store.dispatch(clearCurrentProfile());

    //redirect to login
    window.location.href = "/login";
  }
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
