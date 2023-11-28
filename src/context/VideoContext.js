import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Config";
// import { encode as btoa } from "base-64";

export const VideoContext = createContext();

export const VideoContextProvider = ({ children }) => {
  const [videoDetails, setVideoDetails] = useState("");
  const [introVideos, setIntroVideos] = useState([]);
  const [facebookAdsVideos, setFacebookAdsVideos] = useState([]);
  const [googleAdsVideos, setGoogleAdsVideos] = useState([]);
  const [seoVideos, setSeoVideos] = useState([]);
  const [crmVideos, setCrmVideos] = useState([]);
  const [chatBotsVideos, setChatBotsVideos] = useState([]);
  const [videoUpdated, setVideoUpdated] = useState(false);

  const getContent = async (contentType) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios
        // .get('http://52.60.53.135:8080/api/content', {
        .get("http://99.79.194.141:8080/api/content", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          params: {
            contentType,
          },
        })
        .then((response) => {
          if (contentType === "Introduction") {
            setIntroVideos(response?.data?.content || []);
          } else if (contentType === "FacebookAds") {
            setFacebookAdsVideos(response?.data?.content || []);
          } else if (contentType === "GoogleAds") {
            setGoogleAdsVideos(response?.data?.content || []);
          } else if (contentType === "SEO") {
            setSeoVideos(response?.data?.content || []);
          } else if (contentType === "CRM") {
            setCrmVideos(response?.data?.content || []);
          } else if (contentType === "ChatBots") {
            setChatBotsVideos(response?.data?.content || []);
          }
          setVideoDetails(response?.data?.content || []);
        })
        .catch((error) => {
          console.log("erro ", error);
        });
    } catch (error) {
      console.log("err ", error);
    }
  };
  return (
    <VideoContext.Provider
      value={{
        getContent,
        videoDetails,
        setVideoDetails,
        introVideos,
        facebookAdsVideos,
        googleAdsVideos,
        seoVideos,
        crmVideos,
        chatBotsVideos,
        videoUpdated,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
