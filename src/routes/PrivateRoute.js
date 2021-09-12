import React, { Suspense } from "react";
import { Route } from "react-router-dom";
// import { NotFound } from "../pages";
import { isLoginAdmin } from "../utils/index";
import { Layout } from "antd";
import Header from "../components/header";
import { Loading } from "../components/loading";
import "antd/dist/antd.css";
import "./style.css";
import Login from "../pages/login/login";
// import Yolhatlar from "../pages/ugrukdyryjy/yolHaty";
import Orders from "../pages/Orders/lukman";
const Sidebar = React.lazy(() => import("../components/sidebar"));
const { Content } = Layout;

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoginAdmin()   ? (
          <Layout>
            <Suspense fallback={<Loading />}>
              <Sidebar />
            </Suspense>

            <Layout className="site-layout">
              <Header />
              <Content
                style={{
                  height: "100vh",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
                className="site-layout-background main_content"
              >
                <Component {...props} />
              </Content>
            </Layout>
          </Layout>
        ) : (
           <Route component={Login} />
 
        )
      }
    />
  );
};

export default PrivateRoute;
