import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./css/style.css";
import "./css/satoshi.css";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./methods/reducers/user";
// import { Security, LoginCallback } from "@okta/okta-react";
// import { oktaConfig } from "./okta-config/oktaConfig";
// import { OktaAuth } from "@okta/okta-auth-js";
import { Auth0Provider } from "@auth0/auth0-react";

const store = configureStore({
  reducer: { user: userReducer },
});
//const oktaAuth = new OktaAuth(oktaConfig);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>

  // <Auth0Provider
  //   domain="dev-b0aenrxoyo4blql5.us.auth0.com"
  //   clientId="oogurvmi6xgwu1VDzhmQvzbS6xqdKypp"
  //   authorizationParams={{
  //     redirect_uri: window.location.origin + "/auth/signin",
  //   }}
  // >
  //   <App />
  //   {/* Other routes go here */}
  // </Auth0Provider>
);
