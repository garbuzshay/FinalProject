import React from "react";

import "./index.css";
import App from "./App";
import { IntroProvider } from "./contexts/IntroContext";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { RegisterProvider } from "./contexts/RegisterContext";
import { UserProvider } from "./contexts/UserContext";
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Router>
  <UserProvider>
    <IntroProvider>
      <RegisterProvider>
        <App />
      </RegisterProvider>
    </IntroProvider>
  </UserProvider>
</Router>,);


reportWebVitals();
