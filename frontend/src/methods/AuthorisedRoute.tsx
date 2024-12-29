import React, { useEffect } from "react";
import { Navigate } from "react-router-dom"; // Assuming you're using react-router
import { useSelector } from "react-redux";
import { productIDs } from "../Utils/Constants";
import NotPurchased from "../components/404/NotPurchased";
import { ReusableMethods } from "./ReusableMethods";
import { t } from "i18next";
interface ProtectedRouteProps {
  children: JSX.Element; // The wrapped component(s)
}

const AuthorisedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // const user = useSelector((state: any) => state.user.value);
  const { doesUserHaveProduct } = ReusableMethods();

  // const user_products = user.data.products
  //   ? JSON.parse(user.data.products)
  //   : [];
  const currentPath = window.location.pathname.split("/");
  //const pageID = productIDs[currentPath[1]]?.id;

  //////Exclude settings from the products
  const productExist = doesUserHaveProduct(currentPath[1]);
  if (productExist) {
    return children;
  } else {
    return (
      <NotPurchased
        title={
          productIDs[currentPath[1]]?.title_key
            ? t(productIDs[currentPath[1]]?.title_key)
            : ""
        }
        link={
          productIDs[currentPath[1]]?.link
            ? t(productIDs[currentPath[1]]?.link)
            : "https://techfood.se/produkt-kategori/affarssystem/"
        }
      />
    );
  }
};

export default AuthorisedRoute;
