import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// HashRouter as BrowserRouter
// import SignIn from "../components/SignIn";

import history from "./history";
import { Users, NotFound,Doctor,Doctor_Sanaw,Markets,YolHatyBermek,UlanyjyGornush,Login, Orders, OrderStatus, Config, ArchiveOrders, YatyrlanOrders, HideProducts, Posts, Status, Sargyt, Gozlegdakiler, Tapylanlar, Tapylmadyklar } from "../pages/index";

import ScrollIntoView from "./ScrollIntoView";
import { Loading } from "../components/loading";
 

const PrivateRoute = lazy(() => import("./PrivateRoute"));
const PublicRoute = lazy(() => import("./PublicRoute"));
// const AdminRoute = lazy(() => import("./AdminRoute"));
const App = () => {
  // history.listen((location, action) => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // });
  return (
    <BrowserRouter history={history}>
      <ScrollIntoView>
        <Suspense fallback={<Loading />}>
          <Switch>
            <PublicRoute
              restricted={true}
              component={Login}
              path="/"
              exact
            />

            <PublicRoute 
            restricted={false} 
            component={Login} 
            path="/" 
            exact 
            />
            
            <PrivateRoute
              restricted={false}
              component={Users}
              path="/users"
              exact
            />

 
             <PrivateRoute
              restricted={false}
              component={Doctor}
              path="/unit"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Doctor_Sanaw}
              path="/products"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={HideProducts}
              path="/hideProducts"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={YolHatyBermek}
              path="/shertler"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Markets}
              path="/soraglar"
              exact
            />
             <PrivateRoute
              restricted={false}
              component={UlanyjyGornush}
              path="/users_type"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Orders}
              path="/orders"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={YatyrlanOrders}
              path="/canceledOrders"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={ArchiveOrders}
              path="/archiveOrders"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={OrderStatus}
              path="/orderStatus"
              exact
            />
           <PrivateRoute
              restricted={false}
              component={Status}
              path="/sargytEt"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Sargyt}
              path="/sargyt"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Config}
              path="/config"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Posts}
              path="/posts"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Gozlegdakiler}
              path="/gozleg"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Tapylanlar}
              path="/tapylan"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Tapylmadyklar}
              path="/tapylmadyk"
              exact
            />


           

            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </ScrollIntoView>
    </BrowserRouter>
  );
};

export default App;
