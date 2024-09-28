import React from "react";

export const ReusableMethods = () => {
  const UserLogin = (event: any) => {
    event.preventDefault();
    alert("got here");
  };

  return { UserLogin };
};
