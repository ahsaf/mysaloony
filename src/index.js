
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store';
// core components
import Admin from "layouts/Admin.js";
import LoginPage from './pages/settings/loginpage';


import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
  <Router history={hist}>
    <Switch>
    <Route path="/login" component={LoginPage} />
      <Route path="/admin" component={Admin} />
  
   
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);
