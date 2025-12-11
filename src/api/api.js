import axios from "axios";

// Create API instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base URL
  withCredentials: true, //  this goes here, inside the config object
});

// Optional: set default headers if needed
// API.defaults.headers.common["Content-Type"] = "application/json";

export default API;
