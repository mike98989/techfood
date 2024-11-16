import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as Constants from "../Utils/Constants";
import { useNavigate } from "react-router-dom";

interface FetchApiParams {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE"; // Specify allowed methods
  formData?: any | null;
  contentType: string;
  authentication?: string | null;
}
export const httpRequest = () => {
  const fetchApi = async ({
    url,
    method,
    formData,
    contentType,
    authentication,
  }: FetchApiParams): Promise<AxiosResponse | Error> => {
    const baseUrl: string =
      Constants.BASE_URL + Constants.API + Constants.API_VERSION;

    const config: AxiosRequestConfig = {
      method,
      url: baseUrl + url,
      responseType: "stream",
      headers: {
        Accept: "application/json",
        "Content-Type": contentType,
        Authorization: `Bearer ${authentication}`, // Template literal for better readability
        //Accept: "application/json", // Setting the Accept header
      },
      withCredentials: false, // Moved inside the config
      //withXSRFToken: true,
    };

    if (formData) {
      config.data = formData;
    }

    try {
      const response = await axios(config);
      //console.log("Reqeuest res", response.data);
      const data = response.data;
      return data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 403) {
          // Token is invalid, redirect to login page
          window.location.href =
            Constants.PROTOCOL + Constants.FRONT_END_BASE_URL + "auth/signin";
        }

        // The server responded with a status other than 2xx
        // console.error("Error status:", error.response.status);
        // console.error("Error data:", error.response.data);
        return error.response.data;
      } else if (error.request) {
        // No response was received after the request was made
        console.error("No response received:", error.request);
      } else {
        // Something else caused an error (network issues, bad request, etc.)
        console.error("Error:", error);
      }

      return error;
      //return handleError(error);
    }
  };

  // function handleError(error: unknown) {
  //   if (axios.isAxiosError(error)) {
  //     // Check if there is a response from the server
  //     if (error.response) {
  //       // Check if the status code is 422 for validation errors
  //       if (error.response.status === 422) {
  //         const validationErrors = Object.values(error.response);
  //         return validationErrors;
  //         // Handle validation errors as needed
  //         // For example, you can set them in your component state
  //         //setFormErrors(validationErrors); // assuming you're using React
  //       } else {
  //         console.error(
  //           `Error: ${error.response.status} - ${error.response.data.message}`
  //         );
  //       }
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       console.error("No response received:", error.request);
  //     } else {
  //       // Something else happened while setting up the request
  //       console.error("Error:", error.message);
  //     }
  //   } else {
  //     console.error("Unexpected error:", error);
  //   }
  // }

  return {
    fetchApi,
  };
};
