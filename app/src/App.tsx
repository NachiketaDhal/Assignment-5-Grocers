import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
// import { useGlobalContext } from "./context/context";
import Fav from "./pages/Fav";
import User from "./pages/User";
import Admin from "./pages/Admin";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import AdminAdd from "./pages/AdminAdd";
import AdminDelete from "./pages/AdminDelete";
import AdminUpdate from "./pages/AdminUpdate";
import "./_app.scss";
import AdminUpdateForm from "./pages/AdminUpdateForm";

function App() {
  // const { newState } = useGlobalContext();

  // const { loginStatus } = newState;
  // const { status, loggedInUser } = loginStatus;

  return (
    <main>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/products" component={AllProducts} exact />
          <Route path="/cart" component={Cart} exact />
          <Route path="/fav" component={Fav} exact />
          <Route path="/me" component={User} exact />
          <PrivateRoute path="/login" exact>
            <Login />
          </PrivateRoute>
          <PrivateRoute path="/signup" exact>
            <Signup />
          </PrivateRoute>
          <AdminRoute path="/admin" exact>
            <Admin />
          </AdminRoute>
          <AdminRoute path="/admin/add" exact>
            <AdminAdd />
          </AdminRoute>
          <AdminRoute path="/admin/delete" exact>
            <AdminDelete />
          </AdminRoute>
          <AdminRoute path="/admin/update" exact>
            <AdminUpdate />
          </AdminRoute>
          <AdminRoute path="/admin/update/:id" exact>
            <AdminUpdateForm />
          </AdminRoute>
          {/* {!status ? (
            <Route path="/login" component={Login} exact />
          ) : (
            <Redirect to="/" exact />
          )} */}
          {/* {!status ? (
            <Route path="/signup" component={Signup} exact />
          ) : (
            <Redirect to="/" exact />
          )} */}
          {/* {status && loggedInUser?.role === "admin" && (
            <Route path="/admin" component={Admin} exact />
          )} */}
          {/* <Route path="*" component={Error} exact /> */}
        </Switch>
        <Footer />
      </Router>
    </main>
  );
}

export default App;
