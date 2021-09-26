var axioss = require("axios");

var axios = axioss.create({
  baseURL: "https://taskez.herokuapp.com",

  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  withCredentials: true,
});

module.exports = axios;
