import React, { useContext, useEffect, useRef, useState } from "react";
import testImage from "../images/testImage1.jpg";
import ArrowRight from "@mui/icons-material/ArrowRight";
import {
  ArrowLeft,
  PlayCircleFilledOutlined,
  SkipNext,
  SkipPrevious,
} from "@mui/icons-material";
import { VideoContext } from "../context/VideoContext";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const ChatbotSection = () => {
  const [hoverItem, setHoverItem] = useState(null);
  const containerRef = useRef(null);
  const { getContent, chatBotsVideos, videoUpdated, loading5 } =
    useContext(VideoContext);

  const navigate = useNavigate();

  useEffect(() => {
    getContent("ChatBots");
  }, [videoUpdated]);

  console.log("chat bot Videos", chatBotsVideos);

  const handleScrollRight = () => {
    console.log("hello");
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 910,
        behavior: "smooth",
      });
    }
  };

  const handleScrollLeft = () => {
    console.log("hello");
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 910,
        behavior: "smooth",
      });
    }
  };

  const arr = [1, 1, 1, 1, 1];

  return (
    <div className="w-full relative">
      <div className="flex justify-between pr-6">
        <h2 className="mr-4 text-[#4338b0] font-semibold text-xl">Chat-Bots</h2>
        {chatBotsVideos?.length > 0 && (
          <Link
            className="mr-28 text-[#4338b0] font-semibold text-lg cursor-pointer"
            to={`/video/ChatBots`}
          >
            View all
          </Link>
        )}
      </div>
      <div
        ref={containerRef}
        className="flex overflow-x-auto no-scrollbar gap-10 pb-5 pr-6 pl-px mt-2"
      >
        {chatBotsVideos?.length > 0 &&
          chatBotsVideos?.map((item, index) => (
            <div
              key={index}
              className="relative w-[400px] h-60 flex-shrink-0 shadow-lg shadow-[#8d86db] rounded cursor-pointer"
              onMouseEnter={() => setHoverItem(index)}
              onMouseLeave={() => setHoverItem(null)}
            >
              <img
                className="w-[400px] h-60 object-fill flex-shrink-0 rounded"
                // src={testImage}
                src={item?.thumbnailUrl}
                alt=""
                loading="lazy"
              />
              {hoverItem !== undefined &&
                hoverItem !== null &&
                hoverItem === index && (
                  <div
                    className="w-[400px] h-60 flex absolute top-0 left-0 bg-black bg-opacity-25"
                    onClick={() => {
                      // navigate(
                      //   `/video?name=${
                      //     item.videoName
                      //   }&path=${encodeURIComponent(item.videoUrl)}`
                      // );
                      navigate(`/video/ChatBots/${item?.videoName}`);
                    }}
                  >
                    <PlayCircleFilledOutlined
                      style={{ fontSize: 50 }}
                      className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-[#4338b0]"
                    />
                  </div>
                )}
            </div>
          ))}
        {loading5 && (
          <div className="w-full h-40 flex justify-center items-center">
            <CircularProgress />
          </div>
        )}
        {!loading5 && chatBotsVideos?.length === 0 && (
          <p className="w-full text-center my-20">No data available.</p>
        )}
      </div>
      <div className="absolute top-0 right-12 flex gap-5">
        <SkipPrevious
          onClick={() => handleScrollLeft()}
          className="text-[#8d86db] hover:text-[#4338b0] hover:font-medium cursor-pointer"
        />
        <SkipNext
          className="text-[#8d86db] hover:text-[#4338b0] hover:font-medium cursor-pointer"
          onClick={() => handleScrollRight()}
        />
      </div>
      {/* <div
        className="w-8 h-60 flex items-center absolute bottom-5 right-0 backdrop-brightness-75"
        onClick={() => handleScrollRight()}
      >
        <ArrowRight fontSize="large" />
      </div>
      <div
        className="w-8 h-60 flex items-center absolute bottom-5 left-0 backdrop-brightness-75"
        onClick={() => handleScrollLeft()}
      >
        <ArrowLeft fontSize="large" />
      </div> */}
    </div>
  );
};

export default ChatbotSection;
