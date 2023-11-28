import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "../Router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { AuthContextProvider } from "../context/AuthContext";
import { UserContextProvider } from "../context/UserContext";

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

const index = () => {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </UserContextProvider>
    </AuthContextProvider>
  );
};

export default index;
