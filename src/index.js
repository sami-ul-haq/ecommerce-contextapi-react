import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import CartContextProvider from "./context/Context"

ReactDOM.render(
    <CartContextProvider>
        <App />
    </CartContextProvider>
, document.getElementById("root"));
