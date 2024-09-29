import React, { useState } from "react";
import { httpRequest } from "./Requests";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./reducers/user";
export const ReusableMethods = () => {
  const dispatch = useDispatch();
  const { fetchApi } = httpRequest();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState("");

  // User Login Method
  const userLogin = ({
    action_url,
    method,
    formId,
    contentType,
    setIsLoading,
  }: {
    action_url: string;
    method: "GET" | "POST" | "PUT" | "DELETE"; // Specify allowed methods
    formId: string;
    contentType: string;
    setIsLoading: Function;
  }) => {
    setIsLoading(true);
    const formElement = document.getElementById(
      formId
    ) as HTMLFormElement | null;
    const formData = formElement && new FormData(formElement);
    const url = action_url;
    fetchApi({
      url, // URL end point
      method, // Method
      formData, //Form Data
      contentType, // Content Type
      // Authentication
    })
      .then((response: any) => {
        setIsLoading(false);
        if (response.status == "1") {
          localStorage.setItem("user_data", JSON.stringify(response.user));
          dispatch(setUser({ data: response.user, token: "" }));
          navigate("/"); // or any other route
        } else {
          const message = JSON.parse(response);
          setFormErrors(message.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        const message = JSON.parse(error[0]);
        setFormErrors(JSON.parse(message.message));
      });
  };

  const userLogout = () => {
    dispatch(clearUser({ data: null, token: "" }));
    localStorage.clear();
    navigate("/auth/signin");
  };

  return { userLogin, userLogout, formErrors };
};
