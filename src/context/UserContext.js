import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Config";
// import { encode as btoa } from "base-64";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState("");
  const [profileUpdated, setProfileUpdated] = useState(false);

  const getUserRole = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios
        // .get("http://99.79.194.141:8080/api/user-role", {
        .get(`${BASE_URL}/api/user-role`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error(error);
        });
      localStorage.setItem("role", res.userRole);
    } catch (error) {
      console.error("err ", error);
    }
  };

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios
        // .get("http://99.79.194.141:8080/api/user-profile", {
        .get(`${BASE_URL}/api/user-profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log("profile response ", response.data.user);
          return response.data;
        })
        .catch((error) => {
          console.error(error);
        });
      setUserProfile(res.user);
    } catch (error) {
      console.error("err ", error);
    }
  };

  const updateUserProfile = async (data) => {
    console.log("updated data ", userProfile);
    const token = localStorage.getItem("token");
    try {
      const res = await axios
        // .get('http://52.60.53.135:8080/api/117.235.194.61', {
        // .put("http://99.79.194.141:8080/api/user-profile", {
        .put(`${BASE_URL}/api/user-profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          ...userProfile,
        })
        .then((response) => {
          console.log("put api response");
          return response.data;
        })
        .catch((err) => {
          console.error("put error ", err);
        });
      console.log("update profile  ", res);
      setProfileUpdated(true);
    } catch (error) {
      console.error("err ", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        updateUserProfile,
        getUserProfile,
        getUserRole,
        userProfile,
        setUserProfile,
        profileUpdated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
