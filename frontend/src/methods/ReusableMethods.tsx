import React, { useState } from "react";
import { httpRequest } from "./Requests";
import { useNavigate } from "react-router-dom";
import * as Constants from "../Utils/Constants";
export const ReusableMethods = () => {
  const { fetchApi } = httpRequest();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState("");
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
      .then((response: any) => {
        if (response.token) {
          navigate("/"); // or any other route
        } else {
          console.log(response);
          setFormErrors(response);
        }
      })
      .catch((error) => {
        const message = JSON.parse(error[0]);
        setFormErrors(message.message);
      });
  };

  return { UserLogin, formErrors };
};
