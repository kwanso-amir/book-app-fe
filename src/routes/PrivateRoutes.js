import React from "react";
import { Redirect, Route } from "react-router";
// import {isLoggedIn} from "../helper/Helpers";
function PrivateRoutes({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {

        if (true) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: "/" }} />;
        }
      }}
    ></Route>
  );
}

export default PrivateRoutes;
