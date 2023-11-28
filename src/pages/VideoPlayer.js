import { ArrowBack } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoPlayer = () => {
  const [hoverVideo, setHoverVideo] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {/* Video */}
      <div
        className="relative w-full flex flex-col items-center bg-black"
        onMouseEnter={() => setHoverVideo(true)}
        onMouseLeave={() => setHoverVideo(false)}
      >
        {/* <div
          className="w-[75%] h-4 bg-black absolute top-0"
          style={{ boxShadow: "0px 25px 55px black" }}
        ></div> */}
        {/* <div
          className="w-full h-4 bg-black absolute top-0"
          style={{
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 1)",
          }}
        ></div> */}
        {/* <div className={`w-[75%] flex items-center gap-5 py-3`}>
          <ArrowBack
            className="text-white cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <p className="text-xl font-medium text-white">Video Name</p>
        </div> */}
        <div
          className={`absolute w-[75%] h-[70px] flex items-center pl-4 ${
            !hoverVideo && "hidden"
          } `}
          style={{
            zIndex: 1,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.9) 30%, rgba(255,255,255,0.9) 198%)",
            opacity: 0.8,
          }}
        >
          <div className={`w-[75%] flex items-center gap-5 py-3`}>
            <ArrowBack
              className="text-white cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <p className="text-xl text-white">Video Name</p>
          </div>
        </div>
        <video
          controls
          width="75%"
          //   style={{
          //     background:
          //       "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 26%, rgba(0,212,255,1) 100%)",
          //   }}
        >
          <source
            src="https://smart-asset-docs-dev.s3.ap-southeast-1.amazonaws.com/dcrm/testVid.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
