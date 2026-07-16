// Centralized API service using axios
// All HTTP calls to the backend go through this file.
// This makes it easy to change the base URL in one place

//Axois is like a better version of fetch() -it automatically
// parses JSON, handles error better and lets us set headers globally.

import axios from "axios";

// The base URL is read from the vite environment variable
// In development: http://localhost:5000/api
// In production: your Render/Audiophile.render
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// create an axios instance with default settings
// all requests made with this instance will use these defaults

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json", // Tell server we are sending JSON Requests
  },
});

// -----REQUEST INTERCEPTION ------
// Run before every request - we use it to add the JWT token to headers
//This way, we don't have to add the token manually to every API call
api.interceptors.request.use(
  (config) => {
    // Get the data from localStorage
    const userStr = localStorage.getItem("audiophile-user");
    if (userStr) {
      const user = JSON.parse(userStr);
      // if the user has a token, add it to Authorization header
      //format: "Bearer eyekfjekndjkfhje........"
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }

    console.log("✅ API success:", config.url, config.data)
    return config; // Return the modified config
  },
  (error) => {

    console.error("❌ API Error:", error.config || error);
    // if something went wrong setting up the request, reject it
    return Promise.reject(error);
  },
);

//------RESPONSE INTERCEPTION ------
//Runs after every response - handles global errors like expired tokens
api.interceptors.response.use(
  (response) => {
    return response; //if successful, just pass through
  },
  (error) => {
    // if the server says 401 (Unauthorized), the token probably expired
    if (error.response?.status === 401) {
      // Remove the user data and reload the page to show login
      localStorage.removeItem("audiophile-user");
    }
    return Promise.reject(error);
  },
);

export default api;
