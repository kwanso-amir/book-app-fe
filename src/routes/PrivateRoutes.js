import React from "react";
import { Redirect, Route } from "react-router";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

// import {isLoggedIn} from "../helper/Helpers";

function PrivateRoutes({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token")) {
          if (Component.name === "Login" || Component.name === "Signup") {
            return <Redirect to="/books" />;
          }
          return <Component {...props} />;
        } else {
          if (Component.name === "Signup") {
            return <Signup {...props} />;
          } else {
            return <Login {...props} />;
          }
        }
      }}
    ></Route>
  );
}

export default PrivateRoutes;
