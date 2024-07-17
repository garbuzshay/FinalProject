import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { IntroProvider } from "./contexts/IntroContext";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { RegisterProvider } from "./contexts/RegisterContext";
import { UserProvider } from "./contexts/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <IntroProvider>
          <RegisterProvider>
            <App />
          </RegisterProvider>
        </IntroProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
