import { ArrowBack } from "@mui/icons-material";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const VideoPlayer = () => {
  const [hoverVideo, setHoverVideo] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const path = searchParams.get("path");
  const videoUrl = decodeURIComponent(path);

  let messageSchema = {
    msgId: "",
    vidId: 0,
    userId: 0,
    message: "",
    replyId: "",
    replyCount: 0,
    createdAt: "",
    isRead: false,
  };

  const chatData = [
    {
      userId: [
        {
          s_userId: "",
          s_name: "",
          chat: "message 1",
        },
        {
          s_userId: "",
          s_name: "",
          chat: "message 2",
        },
        {
          s_userId: "",
          s_name: "",
          chat: "message 3",
        },
      ],
      id: "userId",
      name: "",
      chat: "message",
    },

    {
      userId: [
        {
          s_userId: "",
          s_name: "",
          chat: "message 4",
        },
        {
          s_userId: "",
          s_name: "",
          chat: "message 5",
        },
      ],
      id: "userId",
      name: "",
      chat: "message",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Video */}
      <div
        className="relative w-full flex flex-col items-center bg-black"
        onMouseEnter={() => setHoverVideo(true)}
        onMouseLeave={() => setHoverVideo(false)}
      >
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
            <p className="text-xl text-white">{name || ""}</p>
          </div>
        </div>
        <video controls width="75%" style={{ maxHeight: "90vh" }}>
          <source
            // src="https://smart-asset-docs-dev.s3.ap-southeast-1.amazonaws.com/dcrm/testVid.mp4"
            src={videoUrl}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* [
        {
          userId1:[
            { 
              s_userId1: "",
              s_name1: "",
              chat: "message 1" 
            },
            { 
              s_userId2: "",
              s_name2: "",
              chat: "message 2" 
            },
            { 
              s_userId4: "",
              s_name4: "",
              chat: "message 3"  
            }
          ],
          name: "",
          chat: "message"
        },

        {
          userId2:[
            { 
              s_userId3: "",
              s_name3: "",
              chat: "message 4" 
            },
            { 
              s_userId2: "",
              s_name2: "",
              chat: "message 5" 
            }
          ],
          name: "",
          chat: "message"
        }
      ] */}
      <div>
        {chatData?.map((chats) => (
          <div>
            <div className="flex gap-3">
              <p onClick={() => console.log(chats?.userId)}>{chats?.name}</p>
              <p>{chats?.chat}</p>
            </div>
            <div className="ml-4">
              {chats.userId.map((subChats) => (
                <div>
                  <p onClick={() => console.log(chats?.userId)}>
                    {subChats?.name}
                  </p>
                  <p>{subChats?.chat}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
