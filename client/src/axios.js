var axioss = require("axios");

var axios = axioss.create({
  baseURL: process.env.REACT_APP_BASE_URL,

  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  withCredentials: true,
});

module.exports = axios;
