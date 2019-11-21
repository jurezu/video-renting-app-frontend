import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.interceptors.response.use(null, error => {
  console.log("interceptor called");
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("Unexpected error occured.");
  } else {
    console.log(error);
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};