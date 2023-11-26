import React, { useRef, useState } from "react";
import TopCrousel from "../components/TopCrousel";
import IntroSection from "../components/IntroSection";
import testImage from "../images/testImage1.jpg";
import FacebookAdsSection from "../components/FacebookAdsSection";
import GoogleAdsSection from "../components/GoogleAdsSection";
import SEOSection from "../components/SEOSection";
import Navbar from "../components/Navbar";
import { Box, Button, Menu, MenuItem, Modal, Typography } from "@mui/material";
import Upload from "../components/Upload";
import AWS from "aws-sdk";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
};

AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "ca-central-1",
});

const Home1 = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("one");
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const videoInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const [contentType, setContentType] = useState(null);
  const [vidName, setVidName] = useState("");
  const [vidDescription, setVidDescription] = useState("");

  const arr = [1, 1, 1, 1, 1];

  const s3 = new AWS.S3();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const chooseVideo = () => {
    videoInputRef.current.click();
  };

  const handleVideoSelect = (e) => {
    // Handle the selected file(s)
    const selectedFile = e.target.files[0];
    console.log("Selected video:", selectedFile);
    uploadVideoToS3(selectedFile);
  };

  const uploadVideoToS3 = (file) => {
    const params = {
      Bucket: "vid.app",
      Key: file.name,
      Body: file,
      ContentType: file.type,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading:", err);
        return;
      }
      console.log("Video Upload successful:", data.Location);
      setIsVideoUploaded(true);
    });
  };

  // image upload
  const chooseThumbnail = () => {
    imageInputRef.current.click();
  };

  const handleImageSelect = (e) => {
    // Handle the selected file(s)
    const selectedFile = e.target.files[0];
    console.log("Selected image:", selectedFile);
    uploadImageToS3(selectedFile);
  };

  const uploadImageToS3 = (file) => {
    const params = {
      Bucket: "thumbnails.video.app",
      Key: file.name,
      Body: file,
      ContentType: file.type,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading:", err);
        return;
      }
      console.log("Image Upload successful:", data.Location);
      setIsImageUploaded(true);
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

  // console.log("openMenu ", openMenu);

  return (
    <div className="w-full">
      <Navbar handleOpen={handleOpen} />
      <TopCrousel />
      <div className="w-[90%] ml-[10%] flex flex-col gap-y-10 mt-10">
        <IntroSection />
        <FacebookAdsSection />
        <GoogleAdsSection />
        <SEOSection />

        {/* <CRMSection /> */}
        {/* <CHATBotsSection /> */}
      </div>
      <Modal open={open} onClose={handleClose}>
        <Upload
          step={step}
          setStep={setStep}
          chooseVideo={chooseVideo}
          videoInputRef={videoInputRef}
          handleVideoSelect={handleVideoSelect}
          isVideoUploaded={isVideoUploaded}
          setIsVideoUploaded={setIsVideoUploaded}
          chooseThumbnail={chooseThumbnail}
          imageInputRef={imageInputRef}
          handleImageSelect={handleImageSelect}
          isImageUploaded={isImageUploaded}
          setIsImageUploaded={setIsImageUploaded}
          handleMenuOpen={handleMenuOpen}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          handleMenuClose={handleMenuClose}
          contentType={contentType}
          setContentType={setContentType}
          vidName={vidName}
          setVidName={setVidName}
          vidDescription={vidDescription}
          setVidDescription={setVidDescription}
        />
      </Modal>
    </div>
  );
};

export default Home1;
