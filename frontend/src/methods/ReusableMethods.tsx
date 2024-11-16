import React, { useState } from "react";
import { httpRequest } from "./Requests";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./reducers/user";

export const ReusableMethods = () => {
  const dispatch = useDispatch();
  const { fetchApi } = httpRequest();
  const navigate = useNavigate();
  //const [formErrors, setFormErrors] = useState("");
  const [requestedData, setReqestedData] = useState([]);

  interface formDataType {
    event: any;
    action_url: string;
    method: "GET" | "POST" | "PUT" | "DELETE"; // Specify allowed methods
    formId: string | "";
    formData: Object | null;
    contentType: string;
    authentication: string;
    setIsLoading: Function;
    setReturnData: Function;
  }

  // User Login Method
  const userLogin = ({
    event,
    action_url,
    method,
    formId,
    formData,
    contentType,
    authentication,
    setIsLoading,
    setReturnData,
  }: formDataType) => {
    event.preventDefault();
    setIsLoading(true);
    const formElement = document.getElementById(
      formId
    ) as HTMLFormElement | null;
    const form = formElement && new FormData(formElement);
    const url = action_url;
    fetchApi({
      url, // URL end point
      method, // Method
      formData: form, //Form Data
      contentType, // Content Type
      authentication, // Authentication
    })
      .then((response_value: any) => {
        const response = JSON.parse(response_value);
        //console.log("response is", response);
        setIsLoading(false);
        if (response.status == "1") {
          localStorage.setItem("user_data", JSON.stringify(response.user));
          localStorage.setItem("token", response.token);
          dispatch(setUser({ data: response.user, token: response.token }));
          navigate("/"); // or any other route
        } else {
          const error_value = action_url.includes("wordpress_signin")
            ? response.error
            : response.message;
          setReturnData({
            message: error_value,
            status: "error",
          });
        }
      })
      .catch((error) => {
        if (error) {
          console.log("error is", error);
          setIsLoading(false);
          const message = JSON.parse(error[0]);
          //setFormErrors(JSON.parse(message.message));
          setReturnData({
            message: JSON.parse(message.message),
            status: "error",
          });
        }
      });
  };

  const userLogout = () => {
    dispatch(clearUser({ data: null, token: "" }));
    localStorage.clear();
    navigate("/auth/signin");
  };

  const formSubmit = ({
    event,
    action_url,
    method,
    formId,
    formData,
    contentType,
    authentication,
    setIsLoading,
    setReturnData,
  }: formDataType) => {
    event.preventDefault();
    setIsLoading(true);

    /// If the formdata is null, use the form id instead
    if (!formData) {
      const formElement = document.getElementById(
        formId
      ) as HTMLFormElement | null;
      const form = formElement && new FormData(formElement);
      formData = form;
    }
    fetchApi({
      url: action_url, // URL end point
      method, // Method
      formData, //Form Data
      contentType, // Content Type
      authentication, // Authentication
    })
      .then((response_value: any) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const response = JSON.parse(response_value);
        setIsLoading(false);
        //console.log("response", response);
        setReturnData({
          message: response.message,
          status: "success",
        });
        if (response.status == "1") {
          document.getElementById(formId)?.reset();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setReturnData({
          message: JSON.parse(error),
          status: "error",
        });
      });
  };

  const allRequest = ({
    event,
    action_url,
    method,
    formId,
    formData,
    contentType,
    authentication,
    setIsLoading,
    setReturnData,
  }: formDataType) => {
    setIsLoading(true);
    /// If the formdata is null, use the form id instead
    if (!formData) {
      const formElement = document.getElementById(
        formId
      ) as HTMLFormElement | null;
      const form = formElement && new FormData(formElement);
      formData = form;
    }

    fetchApi({
      url: action_url, // URL end point
      method, // Method
      formData, //Form Data
      contentType, // Content Type
      authentication, // Authentication
    })
      .then((response_data: any) => {
        setIsLoading(false);
        const response = JSON.parse(response_data);
        //console.log("response is here o", response.data);
        setReturnData(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("error", error);
        setReturnData({
          message: JSON.parse(error),
          status: "error",
        });
      });
  };

  //////Check and return boolean if date is in range;
  const isDateInRange = ({
    dateToCheck,
    startDate,
    endDate,
  }: {
    dateToCheck: string;
    startDate: string;
    endDate: string;
  }) => {
    const date = new Date(dateToCheck).getTime();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    console.log("Begins", start, "ends", end, "dateToCheck", date);
    return date >= start && date <= end;
  };

  const getUrlArray = () => {
    const urlArray = window.location.pathname.split("/");
    return urlArray;
  };

  return {
    userLogin,
    userLogout,
    //formErrors,
    formSubmit,
    requestedData,
    allRequest,
    isDateInRange,
    getUrlArray,
  };
};
