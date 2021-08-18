import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8083/api",
  headers: {
    // "Access-Control-Allow-Headers":"Content-Type",
    // "Access-Control-Allow-Origin": "http://localhost:8081",
    // "Access-Control-Allow-Methods":"*"
    // "Access-Control-Allow-Origin":"request-originating server addresses"
    // "Access-Control-Alow-Origin":"*"
    "Content-type": "application/json"
  }
});