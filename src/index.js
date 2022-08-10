import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { BrowserRouter } from "react-router-dom"; //don't need to specify localhost url in axios http address
import { unregister } from "./registerServiceWorker";


//style
import "./bootstrap.min.css";

unregister();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
