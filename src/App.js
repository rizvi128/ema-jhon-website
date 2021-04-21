
import './App.css';
import Header from './component/Header/Header';
import Review from './component/Review/Review';
import './component/Header/Header.css';
import Shop from './component/Shop/Shop';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inventory from './component/Inventory/Inventory';
import Error from './component/Error/Error';
import ProductDetail from './component/Productdetail/ProductDetail';
import Login from './component/Login/Login';
import Shipment from './component/Shipment/Shipment';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
export const userContext =createContext()

function App() {
const [loggedInUser,setLoggedInUser]= useState({});



  return (
    <userContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <h3>login email  : {loggedInUser.email}</h3>
    
      <Router>
      <Header></Header>
        <Switch>
        <Route exact path="/">
           <Shop></Shop>
          </Route>
           
          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route path="/review">
            <Review></Review>
          </Route>

          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>

          <Route path="/Product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>


          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>


          <Route path="/login">
            <Login></Login>
          </Route>


          <Route path="/*">
           <Error></Error>
          </Route>
        </Switch>
      </Router>




      </userContext.Provider>
  );
}

export default App;
