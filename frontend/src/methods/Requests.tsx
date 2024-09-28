import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface FetchApiParams {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE"; // Specify allowed methods
  formData?: FormData | null;
  contentType: string;
  authentication?: string | null;
}

export const fetchApi = async ({
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
    return response;
  } catch (error) {
    // Handle error appropriately
    console.error("API call failed:", error);
    return error as Error; // Ensure we return an Error type
  }
};
