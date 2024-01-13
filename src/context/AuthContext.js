import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Config";
import { toast } from "react-toastify";
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
        .catch((err) => {
          toast.error(err.response.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.error("eror1 ", err.response.data.error);
        });

      const newToken = res.token;

      setToken(newToken);
      newToken && localStorage.setItem("token", newToken);
      setIsLoading(false);
    } catch (err) {
      err &&
        toast.error(err, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      console.error("eror2 ", err);
    }
  };

  const signup = async (data) => {
    console.log("reset data ", data);
    try {
      const res = await axios
        // .post("http://99.79.194.141:8080/api/register", {
        .post(`${BASE_URL}/api/register`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + btoa(data.email + ":" + data.password),
          },
          // ...data,
        })
        .then((response) => {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return response.data;
        })
        .catch((error) => {
          toast.error(error.response.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const resetPassword = async (data) => {
    console.log("reset data ", data);
    try {
      const res = await axios
        // .put("http://99.79.194.141:8080/api/reset-password", {
        .put(`${BASE_URL}/api/reset-password`, {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              btoa(data.email + ":" + data.currPassword + ":" + data.password),
          },
          ...data,
        })
        .then((response) => {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return response.data;
        })
        .catch((error) => {
          toast.error(error.response.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } catch (error) {
      console.error(error);
      // setShowMsg(true);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
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
    <AuthContext.Provider
      value={{ login, signup, logout, token, resetPassword, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
