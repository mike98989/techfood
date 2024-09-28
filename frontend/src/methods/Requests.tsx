import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
interface FetchApiParams {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE"; // Specify allowed methods
  formData?: FormData | null;
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
    const config: AxiosRequestConfig = {
      method,
      url,
      data: formData,
      responseType: "stream",
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${authentication}`, // Template literal for better readability
      },
      withCredentials: true, // Moved inside the config
    };

    try {
      const response = await axios(config);
      const data = JSON.parse(response.data);
      console.log(data);
      return data;
    } catch (error: any) {
      if (error.response) {
        // The server responded with a status other than 2xx
        // console.error("Error status:", error.response.status);
        // console.error("Error data:", error.response.data);
        return error.response.data;
      } else if (error.request) {
        // No response was received after the request was made
        console.error("No response received:", error.request);
      } else {
        // Something else caused an error (network issues, bad request, etc.)
        console.error("Error:", error.message);
      }
      return error;
      //return handleError(error);
    }
  };

  function handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      // Check if there is a response from the server
      if (error.response) {
        // Check if the status code is 422 for validation errors
        if (error.response.status === 422) {
          const validationErrors = Object.values(error.response);
          return validationErrors;
          // Handle validation errors as needed
          // For example, you can set them in your component state
          //setFormErrors(validationErrors); // assuming you're using React
        } else {
          console.error(
            `Error: ${error.response.status} - ${error.response.data.message}`
          );
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something else happened while setting up the request
        console.error("Error:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
  }

  return {
    fetchApi,
  };
};
