import { Button, Menu, MenuItem, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import uploadImageIcon from "../images/image-upload.svg";
import uploadVideoIcon from "../images/video-upload.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Upload = (props) => {
  const {
    step,
    setStep,
    chooseVideo,
    videoInputRef,
    handleVideoSelect,
    isVideoUploaded,
    setIsVideoUploaded,
    chooseThumbnail,
    imageInputRef,
    handleImageSelect,
    isImageUploaded,
    setIsImageUploaded,
    handleMenuOpen,
    anchorEl,
    setAnchorEl,
    openMenu,
    setOpenMenu,
    handleMenuClose,
    contentType,
    setContentType,
    vidName,
    setVidName,
    vidDescription,
    setVidDescription,
  } = props;
  console.log("content type ", contentType);
  return (
    <div>
      <div className="absolute w-[500px] h-[400px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded bg-white p-5">
        <p className="text-xl font-medium">Upload</p>
        <hr className="my-3" />
        {step === "one" && (
          <div className="flex flex-col items-center p-3">
            <div className="flex items-center" onClick={chooseVideo}>
              <img
                className="w-52 h-52 rounded cursor-pointer"
                src={uploadVideoIcon}
                alt=""
              />
              <p className="cursor-pointer hover:text-blue-500">Upload Video</p>
            </div>
            <input
              type="file"
              ref={videoInputRef}
              style={{ display: "none" }}
              onChange={handleVideoSelect}
            />
            <Button
              className="w-44"
              disabled={!isVideoUploaded}
              variant="contained"
              onClick={() => setStep("two")}
            >
              Next
            </Button>
          </div>
        )}
        {step === "two" && (
          <div className="flex flex-col items-center p-3">
            <div className="flex items-center" onClick={chooseThumbnail}>
              <img
                className="w-52 h-52 rounded cursor-pointer"
                src={uploadImageIcon}
                alt=""
              />
              <p className="cursor-pointer hover:text-blue-500">Upload Image</p>
            </div>
            <input
              type="file"
              ref={imageInputRef}
              style={{ display: "none" }}
              onChange={handleImageSelect}
            />
            <Button
              className="w-44"
              disabled={!isImageUploaded}
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
              Upload
            </Button>
          </div>
        )}
        {step === "four" && (
          <div>
            <TextField
              id="name"
              className="w-80"
              label="Name"
              variant="outlined"
              name="name"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
