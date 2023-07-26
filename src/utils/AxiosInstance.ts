import axios from "axios";
import { toast } from "react-toastify";
import { getLocalToken, hasLocalToken } from "./localToken";

// const headers = {
//   Authorization: hasLocalToken() ? `Bearer ${getLocalToken()}` : null,
// };

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axios.interceptors.request.use(function (config) {
  if (hasLocalToken()) {
    const token = getLocalToken();
    config.headers.Authorization = token;
  }

  return config;
});
axiosInstance.interceptors.response.use(
  function (response) {
    //
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const responseErrorCode = error.code;
    if (responseErrorCode === "ERR_NETWORK") {
      toast.error(`There was a connection error with a service.`);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
