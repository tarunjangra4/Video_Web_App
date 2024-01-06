import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Config";
// import { encode as btoa } from "base-64";

export const VideoContext = createContext();

export const VideoContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);
  const [videoDetails, setVideoDetails] = useState("");
  const [introVideos, setIntroVideos] = useState([]);
  const [facebookAdsVideos, setFacebookAdsVideos] = useState([]);
  const [googleAdsVideos, setGoogleAdsVideos] = useState([]);
  const [seoVideos, setSeoVideos] = useState([]);
  const [crmVideos, setCrmVideos] = useState([]);
  const [chatBotsVideos, setChatBotsVideos] = useState([]);
  const [latestVideos, setLatestVideos] = useState([]);
  const [videoUpdated, setVideoUpdated] = useState(false);

  const getContent = async (contentType) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setLoading1(true);
    setLoading2(true);
    setLoading3(true);
    setLoading4(true);
    setLoading5(true);
    setLoading6(true);
    try {
      const res = await axios
        // .get('http://52.60.53.135:8080/api/content', {
        // .get("http://matrix24app.ca:8080/api/content", {
        .get("https://matrix24app.ca/api/content", {
          // .get("http://99.79.194.141:8080/api/content", {
          // .get("https://15.156.114.51/api/content", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          params: {
            contentType: contentType || null,
          },
        })
        .then((response) => {
          if (contentType === "Introduction") {
            setLoading(false);
            setIntroVideos(response?.data?.content || []);
          } else if (contentType === "FacebookAds") {
            setLoading1(false);
            setFacebookAdsVideos(response?.data?.content || []);
          } else if (contentType === "GoogleAds") {
            setLoading2(false);
            setGoogleAdsVideos(response?.data?.content || []);
          } else if (contentType === "SEO") {
            setLoading3(false);
            setSeoVideos(response?.data?.content || []);
          } else if (contentType === "CRM") {
            setLoading4(false);
            setCrmVideos(response?.data?.content || []);
          } else if (contentType === "ChatBots") {
            setLoading5(false);
            setChatBotsVideos(response?.data?.content || []);
          } else {
            setLoading6(false);
            setLatestVideos(response?.data?.content || []);
          }
          // setVideoDetails(response?.data?.content || []);
        })
        .catch((error) => {
          console.log("erro ", error);
          setLoading(false);
          setLoading1(false);
          setLoading2(false);
          setLoading3(false);
          setLoading4(false);
          setLoading5(false);
          setLoading6(false);
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
        latestVideos,
        videoUpdated,
        loading,
        loading1,
        loading2,
        loading3,
        loading4,
        loading5,
        loading6,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
