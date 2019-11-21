import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function registerUser(user) {
  return http.post(apiEndpoint, user);
}
