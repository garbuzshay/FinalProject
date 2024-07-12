import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { IntroProvider } from "./contexts/IntroContext";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { RegisterProvider } from "./contexts/RegisterContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <IntroProvider>
        <RegisterProvider>
          <App />
        </RegisterProvider>
      </IntroProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
