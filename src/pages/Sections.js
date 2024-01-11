import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideoContext } from "../context/VideoContext";
import SidebarScroll from "../components/SidebarScroll";
import appIcon from "../images/icon.png";
import { AccountCircle } from "@mui/icons-material";
import { UserContext } from "../context/UserContext";
import { Button, CircularProgress, Typography } from "@mui/material";
import TextEditor from "../components/TextEditor";
import PreviewComponent from "../components/PreviewComponent";
import downloadPdfIcon from "../images/download-pdf.png";

const Sections = () => {
  const [videos, setVideos] = useState([]);
  const [currVidDetails, setCurrVidDetails] = useState(null); // selected video
  const [active, setActive] = useState(0);
  const [description, setDescription] = useState("");
  const [initialScript, setInitialScript] = useState("");
  const { contentType } = useParams();
  const videoRef = useRef(null);
  const userRole = localStorage.getItem("role");

  const {
    getContent,
    latestVideos,
    introVideos,
    chatBotsVideos,
    facebookAdsVideos,
    googleAdsVideos,
    seoVideos,
    crmVideos,
    updateVideoContent,
    videoUpdated,
  } = useContext(VideoContext);

  const {
    updateUserProfile,
    getUserProfile,
    userProfile,
    setUserProfile,
    profileUpdated,
  } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    getContent(contentType);
  }, [contentType, videoUpdated]);

  useEffect(() => {
    setVideos(
      contentType === "latest"
        ? latestVideos
        : contentType === "Introduction"
        ? introVideos
        : contentType === "FacebookAds"
        ? facebookAdsVideos
        : contentType === "GoogleAds"
        ? googleAdsVideos
        : contentType === "SEO"
        ? seoVideos
        : contentType === "CRM"
        ? crmVideos
        : contentType === "ChatBots"
        ? chatBotsVideos
        : []
    );
  }, [
    latestVideos,
    introVideos,
    chatBotsVideos,
    facebookAdsVideos,
    googleAdsVideos,
    seoVideos,
    crmVideos,
  ]);

  useEffect(() => {
    setDescription(currVidDetails?.completeDescription);
    setInitialScript(currVidDetails?.completeDescription);
  }, [currVidDetails]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      const percentageWatched = (currentTime / duration) * 100;
    }
  };

  const updateUserDetails = (videoId) => {
    console.log("updating");
    if (videoRef?.current) {
      const { currentTime, duration } = videoRef.current;
      const percentageWatched = (currentTime / duration) * 100;
      const obj = {
        videoId,
        percentageWatched,
      };
      userProfile?.videoDetails?.[videoId] < percentageWatched &&
        updateUserProfile(obj);
    }
  };

  const getCompletedVideos = () => {
    return videos?.filter((video) => {
      const videoId = video?.id;
      const progress = userProfile?.videoDetails?.[videoId];
      return progress !== undefined && progress > 97;
    })?.length;
  };

  const getProgress = () => {
    return (getCompletedVideos() / videos?.length) * 100;
  };

  console.log("currVidDetails ", currVidDetails);

  return (
    <div className="relative flex w-[100%] justify-between px-14 pt-20 bg-[#EBEAEF] min-h-screen pb-10">
      <AccountCircle
        fontSize="large"
        className="absolute right-8 top-6 text-[#8d86db] hover:text-[#4338b0] hover:font-medium cursor-pointer"
        onClick={() => navigate("/profile")}
        titleAccess="Profile"
      />
      <div
        className="fixed top-[10px] left-[10px] w-[22%] px-4 py-4 rounded-2xl bg-slate-50"
        style={{
          boxShadow: "0px 0px 15px rgba(0,0,0,0.4)",
          height: "calc(100vh - 20px)",
        }}
      >
        <div
          className="flex items-center text-2xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={appIcon}
            alt=""
            className="w-12"
            loading="lazy"
            title="Matrix 24"
          />
          <h2
            className="text-[#5A0090]"
            style={{ fontFamily: "Noto Serif, serif" }}
          >
            Matrix 24
          </h2>
        </div>
        <p
          className="text-xl font-medium mt-8"
          style={{ fontFamily: "Noto Serif, serif" }}
        >
          {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
        </p>
        <div className="flex gap-2" style={{ fontFamily: "Open Sans, serif" }}>
          <div className="relative">
            <CircularProgress
              variant="determinate"
              size={16}
              value={Math.floor(getProgress())}
              title={`${Math.floor(getProgress())}%`}
            />
          </div>
          <p className="text-sm text-gray-500">
            {getCompletedVideos()}/{videos?.length} completed
          </p>
        </div>
        <div className="mt-4 overflow-auto">
          <SidebarScroll
            videosData={videos}
            currVidDetails={currVidDetails}
            setCurrVidDetails={setCurrVidDetails}
            updateUserDetails={updateUserDetails}
            active={active}
            setActive={setActive}
          />
        </div>
      </div>
      <div className="w-[68%] mt-[-6px] ml-[35%]">
        <p className="text-2xl font-medium mb-2">{currVidDetails?.name}</p>
        {currVidDetails?.url && (
          <video
            ref={videoRef}
            key={currVidDetails.id}
            controls
            width="100%"
            style={{ maxHeight: "90vh", borderRadius: "10px" }}
            // onTimeUpdate={handleTimeUpdate}
          >
            <source
              // src="https://smart-asset-docs-dev.s3.ap-southeast-1.amazonaws.com/dcrm/testVid.mp4"
              src={currVidDetails.url}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )}
        {userRole === "admin" && (
          <div className="flex flex-col items-end">
            <div className="w-full mt-6">
              <TextEditor
                initialScript={initialScript}
                setDescription={setDescription}
              />
            </div>
            <Button
              className="w-[150px]"
              variant="contained"
              onClick={() =>
                updateVideoContent({
                  contentId: currVidDetails?.id,
                  contentType: contentType,
                  completeDescription: description,
                })
              }
            >
              Save
            </Button>
          </div>
        )}
        {description && (
          <div className="mt-4 announcement bg-[#f4f6f7] rounded pb-4">
            <PreviewComponent description={description} />
            {currVidDetails?.pdf && (
              <div className="relative h-20 w-20">
                <img
                  className="w-20 ml-10 cursor-pointer hover:shadow-xl"
                  src={downloadPdfIcon}
                  alt=""
                  onClick={() => window.open(currVidDetails?.pdf, "_blank")}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sections;
