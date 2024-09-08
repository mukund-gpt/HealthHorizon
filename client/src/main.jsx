import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/authContext.jsx";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
      <ToastContainer />
    </AuthContextProvider>
  </StrictMode>
);
