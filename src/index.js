import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./context/UserContext";
import { VideoContextProvider } from "./context/VideoContext";

export const shades = {
  primary: {
    100: "#6358DD",
    200: "#6358DD",
    300: "#6358DD",
    400: "#6358DD",
    500: "#6358DD",
    600: "#6358DD",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: shades.primary[500],
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <UserContextProvider>
      <VideoContextProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
            <ToastContainer />
          </ThemeProvider>
        </BrowserRouter>
      </VideoContextProvider>
    </UserContextProvider>
  </AuthContextProvider>
);
