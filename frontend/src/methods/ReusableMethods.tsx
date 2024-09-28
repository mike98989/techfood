import React from "react";
import { fetchApi } from "./Requests";
import * as Constants from "../Utils/Constants";
export const ReusableMethods = () => {
  // User Login Method
  const UserLogin = ({
    action_url,
    method,
    formId,
    contentType,
  }: {
    action_url: string;
    method: "GET" | "POST" | "PUT" | "DELETE"; // Specify allowed methods
    formId: string;
    contentType: string;
  }) => {
    const formElement = document.getElementById(
      formId
    ) as HTMLFormElement | null;
    const formData = formElement && new FormData(formElement);
    const url =
      Constants.BASE_URL + Constants.API + Constants.API_VERSION + action_url;
    fetchApi({
      url, // URL end point
      method, // Method
      formData, //Form Data
      contentType, // Content Type
      // Authentication
    })
      .then((response) => {
        console.log("Post created successfully:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return { UserLogin };
};
