import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { ThemeInit } from "../.flowbite-react/init";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeInit />
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>,
);
