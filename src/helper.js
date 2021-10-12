import axios from "axios";

export function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function setupAuthHeaderForServiceCalls(token) {
  if (axios.defaults.headers) {
    if (token) {
      return (axios.defaults.headers.common["Authorization"] = token);
    }
    delete axios.defaults.headers.common["Authorization"];
  }
}
