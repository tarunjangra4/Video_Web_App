import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VideoContext } from "../context/VideoContext";
import SidebarScroll from "../components/SidebarScroll";

const Sections = () => {
  const [currVidDetails, setCurrVidDetails] = useState(null);

  const { contentId } = useParams();
  const {
    getContent,
    latestVideos,
    introVideos,
    chatBotsVideos,
    facebookAdsVideos,
    googleAdsVideos,
    seoVideos,
    crmVideos,
    videoUpdated,
  } = useContext(VideoContext);

  //   console.log("latestVideos ", latestVideos);
  //   console.log("introVideos ", introVideos);
  //   console.log("chatBotsVideos ", chatBotsVideos);
  //   console.log("facebookAdsVideos ", facebookAdsVideos);
  //   console.log("googleAdsVideos ", googleAdsVideos);
  //   console.log("seoVideos ", seoVideos);
  //   console.log("crmVideos ", crmVideos);

  console.log(
    "tes-- ",
    contentId === "latest"
      ? latestVideos
      : contentId === "Introduction"
      ? introVideos
      : contentId === "FacebookAds"
      ? facebookAdsVideos
      : contentId === "GoogleAds"
      ? googleAdsVideos
      : contentId === "SEO"
      ? seoVideos
      : contentId === "CRM"
      ? crmVideos
      : contentId === "ChatBots"
      ? chatBotsVideos
      : []
  );

  useEffect(() => {
    getContent(contentId);
  }, [contentId, videoUpdated]);

  return (
    <div className="flex w-[100%] justify-between px-14 mt-20">
      <div
        className="w-[27%] h-fit px-4 rounded py-4"
        style={{ boxShadow: "0px 0px 15px rgba(0,0,0,0.4)" }}
      >
        <p className="text-xl font-medium">
          {contentId.charAt(0).toUpperCase() + contentId.slice(1)}
        </p>
        <p className="text-sm text-gray-600">No. of Videos</p>
        <div className="mt-6 h-[450px] overflow-auto">
          <SidebarScroll
            videosData={
              contentId === "latest"
                ? latestVideos
                : contentId === "Introduction"
                ? introVideos
                : contentId === "FacebookAds"
                ? facebookAdsVideos
                : contentId === "GoogleAds"
                ? googleAdsVideos
                : contentId === "SEO"
                ? seoVideos
                : contentId === "CRM"
                ? crmVideos
                : contentId === "ChatBots"
                ? chatBotsVideos
                : []
            }
            currVidDetails={currVidDetails}
            setCurrVidDetails={setCurrVidDetails}
          />
        </div>
      </div>
      <div className="w-[65%] mt-[-6px]">
        <p className="text-2xl font-medium mb-2">{currVidDetails?.name}</p>
        {currVidDetails?.url && (
          <video
            key={currVidDetails.url}
            controls
            width="100%"
            style={{ maxHeight: "90vh" }}
          >
            <source
              // src="https://smart-asset-docs-dev.s3.ap-southeast-1.amazonaws.com/dcrm/testVid.mp4"
              src={currVidDetails.url}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default Sections;
