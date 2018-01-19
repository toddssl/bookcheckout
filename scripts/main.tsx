import * as React from "react";
import { render } from "react-dom";

import { createHistory } from "history";
import { Router, Route } from "react-router";

import { NotFound } from "./components/NotFound";
import { App } from "./components/App";

// Stylus
import "../css/style.styl";

/**
 * Routes
 */
var routes = (
  <Router history={createHistory()}>
    <Route path="/wt/book" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

render(routes, document.getElementById("main"));