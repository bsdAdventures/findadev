import axios from "axios";

export const setAuthToken = token => {
  if (token) {
    // Apply default header to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header if token is not there
    delete axios.defaults.headers.common["Authorization"];
  }
};
