import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import UserListing from "./components/UserListing";
import ProductDetails from "./components/ProductDetails";
import NewProduct from "./components/ProductDetails/NewProduct";
import UpdateProduct from "./components/ProductDetails/UpdateProduct";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/products/current/new">
            <NewProduct />
          </Route>
          <Route path="/cart">
            <ShoppingCart />
          </Route>
          <Route path="/products/:id/edit">
            <UpdateProduct />
          </Route>
          <Route path="/products/current">
            <UserListing />
          </Route>
          <Route path="/products/:id">
            <ProductDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
