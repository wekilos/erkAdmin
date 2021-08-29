import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils";
import { Layout } from "antd";
import Headers from "../components/header";
import Footers from "../components/footer";

import "antd/dist/antd.css";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        (isLogin() && restricted)  ? (
          <Redirect to="/orders" />
        ) : (
          <Layout className="main-layout">
            {/* <Headers /> */}
            {/* <Sidebar /> */}
            <Component {...props} />

            {/* <Footers /> */}
          </Layout>
        )
      }
    />
  );
};

export default PublicRoute;
