import React, { useEffect, useState } from "react";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
// import videoIcon from "../images/videoIcon.svg";

function VideoBtn({
  index,
  item,
  active,
  setActive,
  currVidDetails,
  setCurrVidDetails,
}) {
  const [hover, setHover] = useState(false);

  const convertToTwoDigits = (num) => {
    return num.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  return (
    <div
      className={`flex gap-2 py-2 my-1 items-center cursor-pointer ${
        (hover || active === index) && "bg-[#ECEFF0] border-[#fff]"
      } px-2 rounded-lg`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        setActive(index);
        setCurrVidDetails({
          thumbnail: item.thumbnailUrl,
          url: item.videoUrl,
          name: item.videoName,
        });
      }}
    >
      <SmartDisplayOutlinedIcon
        className={`w-10 bg-[#ECEFF0] opacity-90 border-4 border-[#ECEFF0] rounded ${
          (hover || active === index) && "bg-[#fff] border-[#fff]"
        }`}
      />
      {/* <img className="bg-[#ECEFF0]" src={videoIcon} alt="" /> */}
      <div className="text-[#53595C] text-[14px]">
        {convertToTwoDigits(index)} - {item?.videoName}
      </div>
    </div>
  );
}

const SidebarScroll = ({ videosData, currVidDetails, setCurrVidDetails }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setCurrVidDetails({
      thumbnail: videosData?.[0]?.thumbnailUrl,
      url: videosData?.[0]?.videoUrl,
      name: videosData?.[0]?.videoName,
    });
  }, []);

  console.log("videosData === ", videosData);

  return (
    <>
      {videosData?.map((item, index) => (
        <VideoBtn
          key={index}
          item={item}
          index={index}
          active={active}
          setActive={setActive}
          currVidDetails={currVidDetails}
          setCurrVidDetails={setCurrVidDetails}
        />
      ))}
    </>
  );
};

export default SidebarScroll;
