// import { BASE_URL } from "@/configs/env";
import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  // baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// // in response
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.status === 401 || error.status === 403) {
//       //  Refresh token logic here
//     }

//     return Promise.reject(error);
//   }
// );

// ##############################################################################
// // Add a request interceptor
// axios.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     // Perform actions before request is sent
//     // Example: Add authorization token
//     // ------------------------------------------------------------------
//     // @ts-ignore
//     const token = useSelector((state) => state.auth.token);
//     if (token !== undefined && token !== null) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     // ------------------------------------------------------------------
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axios.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     // ------------------------------------------------------------------
//     // ------------------------------------------------------------------
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     // ------------------------------------------------------------------
//     // ------------------------------------------------------------------
//     return Promise.reject(error);
//   }
// );
// ==========================================================================
// ##############################################################################

export function useAPI() {
  const request = async (config) => {
    try {
      return await api(config);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Network error, try again after sometime.", {
          duration: 6000,
          position: "bottom-center",
        });
      }
      if (error?.response?.status === 500) {
        toast.error("Server Error, please contact admin!", {
          duration: 6000,
          position: "bottom-center",
        });
      } else if (
        error?.response?.status !== 400 &&
        error?.response?.status !== 401 &&
        error?.response?.status !== 422 &&
        error?.response?.statusText
      ) {
        toast.error(`${error.response.status} ${error.response.statusText}`, {
          duration: 6000,
          position: "bottom-center",
        });
      }

      // throw error.response.data
      const errorMessage = {
        code: error.code,
        message: error.message,
        data: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText,
      };

      throw errorMessage;
    }
  };

  return {
    get: async (url) => await request({ method: "get", url }),
    post: async (url, data) => await request({ method: "post", url, data }),
    put: async (url, data) => await request({ method: "put", url, data }),
    patch: async (url, data) => await request({ method: "patch", url, data }),
    delete: async (url) => await request({ method: "delete", url }),
  };
}
