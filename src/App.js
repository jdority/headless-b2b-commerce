import React from 'react';
import {Switch,Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import Modal from './components/Modal';
import Home from './components/Home';
import RestExplorer from "./components/RestExplorer";

import { Callback } from "./components/auth/callback";
import { Logout } from "./components/auth/logout";
import { LogoutCallback } from "./components/auth/logoutCallback";
import { PrivateRoute } from "./components/auth/privateRoute";
import { Register } from "./components/auth/register";
import { SilentRenew } from "./components/auth/silentRenew";

function App() {
  return (
    <React.Fragment>
     
      <Navbar></Navbar>
      <Switch>
        <Route exact={true} path="/signin-oidc" component={Callback} />
        <Route exact={true} path="/logout" component={Logout} />
        <Route exact={true} path="/logout/callback" component={LogoutCallback} />
        <Route exact={true} path="/register" component={Register} />
        <Route exact={true} path="/silentrenew" component={SilentRenew} />
        <PrivateRoute path="/products" component={ProductList} />
        <PrivateRoute path="/rest" component={RestExplorer}/>
        <Route exact path="/" component={Home}></Route>
        <Route path="/details" component={Details}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route component={Default}></Route>
      </Switch>
      <Modal></Modal>
    
    </React.Fragment>
  );
}

export default App;
