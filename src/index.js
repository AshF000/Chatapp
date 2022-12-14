import React from "react";
import ReactDOM from "react-dom/client";
import firebaseConfig from "./FirebaseConfig";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
