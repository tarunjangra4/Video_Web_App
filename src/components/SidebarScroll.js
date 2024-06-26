import React, { useContext, useEffect, useState } from "react";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { UserContext } from "../context/UserContext";
// import videoIcon from "../images/videoIcon.svg";

function VideoBtn({
  index,
  item,
  active,
  setActive,
  currVidDetails,
  setCurrVidDetails,
  updateUserDetails,
}) {
  const [hover, setHover] = useState(false);
  const { getUserProfile, userProfile, profileUpdated } =
    useContext(UserContext);

  useEffect(() => {
    getUserProfile();
  }, [profileUpdated]);

  const convertToTwoDigits = (num) => {
    return num.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  return (
    <div
      className={`relative flex gap-3 py-2 my-1 items-center cursor-pointer ${
        (hover || active === item?.videoName) && "bg-[#ECEFF0] border-[#fff]"
      } px-2 rounded-lg before:content-[''] before:w-1 before:h-full before:absolute before:top-0 before:left-0 ${
        active === item?.videoName &&
        "before:bg-[#6358DD] before:rounded-r-full"
      }`}
      //   style={{
      //     clipPath: active ? "polygon(0 0, 73% 10%, 73% 90%, 0% 100%)" : "",
      //   }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        updateUserDetails(currVidDetails?.id);

        setActive(item?.videoName);
        setCurrVidDetails({
          id: item?.id,
          thumbnail: item?.thumbnailUrl,
          url: item?.videoUrl,
          pdf: item?.pdfUrl,
          name: item?.videoName,
          videoDescription: item?.videoDescription,
          completeDescription: item?.completeDescription,
        });
      }}
    >
      {/* <SmartDisplayOutlinedIcon
        className={`w-10 bg-[#ECEFF0] opacity-90 border-4 border-[#ECEFF0] rounded ${
          (hover || active === item?.videoName) && "bg-[#fff] border-[#fff]"
        }`}
      /> */}

      <img
        className="w-16 h-14 rounded-md bg-[#ECEFF0]"
        src={item.thumbnailUrl}
        alt=""
      />
      <div
        className={`text-[14px] font-medium text-base ${
          active === item?.videoName && "text-[#6358DD]"
        }`}
        style={{ fontFamily: "Open Sans, serif" }}
      >
        {convertToTwoDigits(index)} - {item?.videoName}
      </div>
      {userProfile?.videoDetails?.[item?.id] > 97 && (
        <CheckCircle
          titleAccess="Complete"
          fontSize="small"
          className="absolute right-1 top-1.5 text-green-600"
        />
      )}
    </div>
  );
}

const SidebarScroll = ({
  videosData,
  currVidDetails,
  setCurrVidDetails,
  updateUserDetails,
  active,
  setActive,
}) => {
  useEffect(() => {
    console.log("videodata ", videosData);
    // active >= 0 &&
    // setCurrVidDetails({
    //     id: videosData?.[active]?.id,
    //     thumbnail: videosData?.[active]?.thumbnailUrl,
    //     url: videosData?.[active]?.videoUrl,
    //     pdf: videosData?.[active]?.pdfUrl,
    //     name: videosData?.[active]?.videoName,
    //     videoDescription: videosData?.[active]?.videoDescription,
    //     completeDescription: videosData?.[active]?.completeDescription,
    //   });
    if (active) {
      let data = videosData?.filter((item, index) => {
        return item?.videoName === active;
      });
      setCurrVidDetails({
        id: data?.[0]?.id,
        thumbnail: data?.[0]?.thumbnailUrl,
        url: data?.[0]?.videoUrl,
        pdf: data?.[0]?.pdfUrl,
        name: data?.[0]?.videoName,
        videoDescription: data?.[0]?.videoDescription,
        completeDescription: data?.[0]?.completeDescription,
      });
    } else {
      setCurrVidDetails({
        id: videosData?.[0]?.id,
        thumbnail: videosData?.[0]?.thumbnailUrl,
        url: videosData?.[0]?.videoUrl,
        pdf: videosData?.[0]?.pdfUrl,
        name: videosData?.[0]?.videoName,
        videoDescription: videosData?.[0]?.videoDescription,
        completeDescription: videosData?.[0]?.completeDescription,
      });
    }
    //   }, [videosData, active]);
  }, [videosData]);

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
          updateUserDetails={updateUserDetails}
        />
      ))}
    </>
  );
};

export default SidebarScroll;
