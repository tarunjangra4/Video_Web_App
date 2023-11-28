import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Config";
// import { encode as btoa } from "base-64";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);

  const login = async (data) => {
    console.log("data ", data);
    try {
      // const res = await axios
      //   .get(`${BASE_URL}/signin`, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: "Basic " + btoa(data.email + ":" + data.password),
      //       // Authorization:
      //       //   'Basic ' + btoa('joseph1@gamil.com' + ':' + '12345678'),
      //     },
      //     withCredentials: true,
      //   })
      //   .then((response) => {
      //     return response;
      //   })
      const res = await axios
        .post(`${BASE_URL}/api/login`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + btoa(data.email + ":" + data.password),
          },
          // ...data, // it contains email and password
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => console.error("eror1 ", err));

      const newToken = res.token;

      setToken(newToken);
      newToken && localStorage.setItem("token", newToken);
      setIsLoading(false);
    } catch (err) {
      console.error("eror2 ", err);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(false);
      let userToken = localStorage.getItem("token");
      setToken(userToken);
    } catch (err) {
      console.error("is loggedIn error ", err);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, token, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
