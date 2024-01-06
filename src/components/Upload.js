import {
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import uploadImageIcon from "../images/image-upload.svg";
import uploadVideoIcon from "../images/video-upload.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AWS from "aws-sdk";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../Config";

AWS.config.update({
  accessKeyId: "AKIA2RGB5PNDDMTHJYFL",
  secretAccessKey: "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",
  region: "ca-central-1",
});

const Upload = (props) => {
  const {
    handleModalClose,
    // step,
    // setStep,
    // chooseVideo,
    // videoInputRef,
    // handleVideoSelect,
    // isVideoUploaded,
    // setIsVideoUploaded,
    // chooseThumbnail,
    // imageInputRef,
    // handleImageSelect,
    // isImageUploaded,
    // setIsImageUploaded,
    // handleMenuOpen,
    // anchorEl,
    // setAnchorEl,
    // openMenu,
    // setOpenMenu,
    // handleMenuClose,
    // contentType,
    // setContentType,
    // vidName,
    // setVidName,
    // vidDescription,
    // setVidDescription,
  } = props;

  const [step, setStep] = useState("one");
  const [progress, setProgress] = React.useState(10);
  const videoInputRef = useRef(null);
  // const [isVideoUploaded, setIsVideoUploaded] = useState(false); //
  const [videoPercentage, setVideoPercentage] = useState(0);
  const [videoKey, setVideoKey] = useState("");
  const imageInputRef = useRef(null);
  // const [isImageUploaded, setIsImageUploaded] = useState(false); //
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageKey, setImageKey] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [contentType, setContentType] = useState(null);
  const [vidName, setVidName] = useState("");
  const [vidDescription, setVidDescription] = useState("");
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [showMsg, setShowMsg] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const s3 = new AWS.S3();

  const chooseVideo = () => {
    videoInputRef.current.click();
  };

  const handleVideoSelect = (e) => {
    // Handle the selected file(s)
    const selectedFile = e.target.files[0];
    console.log("Selected video:", selectedFile);
    selectedFile && uploadVideoToS3(selectedFile);
  };

  const uploadVideoToS3 = (file) => {
    const params = {
      Bucket: "vid.app",
      Key: file.name,
      Body: file,
      ContentType: file.type,
    };

    // s3.upload(params, (err, data) => {
    //   if (err) {
    //     console.error("Error uploading:", err);
    //     return;
    //   }
    //   console.log("Video Upload successful:", data.Location);
    //   setIsVideoUploaded(true);
    // });
    const upload = s3.upload(params);

    upload.on("httpUploadProgress", (progress) => {
      let percentage = (progress.loaded / progress.total) * 100;
      setVideoPercentage(percentage);
    });

    upload.send((err, data) => {
      if (err) {
        console.error("Error uploading:", err);
        return;
      }
      console.log("Video Upload successful:", data.Location);
      // setIsVideoUploaded(true);
      setVideoKey(data.Key);
    });
  };

  const chooseThumbnail = () => {
    imageInputRef.current.click();
  };

  const handleImageSelect = (e) => {
    // Handle the selected file(s)
    const selectedFile = e.target.files[0];
    console.log("Selected image:", selectedFile);
    selectedFile && uploadImageToS3(selectedFile);
  };

  const uploadImageToS3 = (file) => {
    const params = {
      Bucket: "thumbnails.video.app",
      Key: file.name,
      Body: file,
      ContentType: file.type,
    };

    // s3.upload(params, (err, data) => {
    //   if (err) {
    //     console.error("Error uploading:", err);
    //     return;
    //   }
    //   console.log("Image Upload successful:", data.Location);
    //   setIsImageUploaded(true);
    // });
    const upload = s3.upload(params);

    upload.on("httpUploadProgress", (progress) => {
      let percentage = (progress.loaded / progress.total) * 100;
      setImagePercentage(percentage);
    });

    upload.send((err, data) => {
      if (err) {
        console.error("Error uploading:", err);
        return;
      }
      console.log("Image Upload successful:", data.Location);
      // setIsImageUploaded(true);
      setImageKey(data.Key);
    });
  };

  const handleMenuOpen = (e) => {
    console.log("event ", e);
    setOpenMenu(true);
    setAnchorEl(e.target);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const saveData = async () => {
    setShowMsg(true);
    setIsUploadComplete(false);
    const token = localStorage.getItem("token");
    try {
      const body = {
        imageKey,
        videoKey,
        contentType: contentType,
        name: vidName,
        videoDescription: vidDescription,
      };

      const res = await axios
        // .post("http://99.79.194.141:8080/api/content", {
        .post(`${BASE_URL}/api/content`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          ...body,
        })
        .then((response) => {
          console.log("new test response ", response);
          setIsUploadComplete(true);
          setVideoKey("");
          setImageKey("");
          setContentType("");
          setVidName("");
          setVidDescription("");
          setTimeout(() => {
            setShowMsg(false);
          }, 5000);
          // toast.success();
          toast.success("Video has been uloaded successfully.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("err ", error);
    }
  };

  const handleSubmit = () => {
    handleModalClose();
    saveData();
  };

  console.log("content type ", contentType);
  console.log("step ", step);

  return (
    <div>
      <div className="absolute w-[500px] h-[400px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded bg-white p-5">
        <p className="text-xl font-medium">Upload</p>
        <hr className="my-3" />
        {step === "one" && (
          <div className="relative flex flex-col items-center p-3">
            <div className="flex items-center" onClick={chooseVideo}>
              <img
                className="w-52 h-52 rounded cursor-pointer"
                src={uploadVideoIcon}
                alt=""
              />
              <p className="cursor-pointer hover:text-blue-500">Upload Video</p>
            </div>
            {videoPercentage > 0 && (
              <div className="absolute top-5 right-40">
                <CircularProgressWithLabel value={videoPercentage} />
              </div>
            )}
            <input
              type="file"
              ref={videoInputRef}
              style={{ display: "none" }}
              onChange={handleVideoSelect}
            />
            <Button
              className="w-44"
              disabled={!videoKey}
              variant="contained"
              onClick={() => setStep("two")}
            >
              Next
            </Button>
          </div>
        )}
        {step === "two" && (
          <div className="relative flex flex-col items-center p-3">
            <div className="flex items-center" onClick={chooseThumbnail}>
              <img
                className="w-52 h-52 rounded cursor-pointer"
                src={uploadImageIcon}
                alt=""
              />
              <p className="cursor-pointer hover:text-blue-500">Upload Image</p>
            </div>
            {imagePercentage > 0 && (
              <div className="absolute top-5 right-40">
                <CircularProgressWithLabel value={imagePercentage} />
              </div>
            )}
            <input
              type="file"
              ref={imageInputRef}
              style={{ display: "none" }}
              onChange={handleImageSelect}
            />
            <Button
              className="w-44"
              disabled={!imageKey}
              variant="contained"
              onClick={() => setStep("three")}
            >
              Next
            </Button>
          </div>
        )}
        {step === "three" && (
          <div className="h-[75%] relative flex flex-col justify-between items-center">
            <Button
              className="w-[300px] h-[40px]"
              id="demo-positioned-menu"
              aria-controls={openMenu ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              variant="outlined"
              onClick={handleMenuOpen}
            >
              {contentType ? (
                <p>{contentType}</p>
              ) : (
                <div className="w-full flex justify-between">
                  <p>Choose Section</p>
                  <ArrowDropDownIcon />
                </div>
              )}
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              slotProps={{
                paper: {
                  style: {
                    width: 300,
                    paddingBottom: 15,
                    borderWidth: 2,
                    borderColor: "blue",
                  },
                },
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem
                onClick={() => {
                  setContentType("Introduction");
                  handleMenuClose();
                }}
              >
                Introduction
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setContentType("FacebookAds");
                  handleMenuClose();
                }}
              >
                Facebook Ads
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setContentType("GoogleAds");
                  handleMenuClose();
                }}
              >
                Google Ads
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setContentType("SEO");
                  handleMenuClose();
                }}
              >
                SEO
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setContentType("CRM");
                  handleMenuClose();
                }}
              >
                CRM
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setContentType("ChatBots");
                  handleMenuClose();
                }}
              >
                Chat Bots
              </MenuItem>
            </Menu>
            <Button
              disabled={!contentType}
              className="w-[300px]"
              variant="contained"
              onClick={() => setStep("four")}
            >
              Next
            </Button>
          </div>
        )}
        {step === "four" && (
          <div className="w-full h-[80%] flex flex-col items-center justify-between">
            <div className="w-full flex flex-col items-center gap-8">
              <TextField
                id="name"
                className="w-[300px]"
                label="Name"
                variant="outlined"
                name="name"
                value={vidName}
                onChange={(e) => setVidName(e.target.value)}
              />
              <TextField
                multiline
                minRows={2}
                maxRows={4}
                id="description"
                className="w-[300px]"
                label="Description"
                variant="outlined"
                name="description"
                value={vidDescription}
                onChange={(e) => setVidDescription(e.target.value)}
              />
            </div>
            <Button
              disabled={!vidName || !vidDescription}
              className="w-[300px]"
              variant="contained"
              onClick={handleSubmit}
            >
              Upload
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
