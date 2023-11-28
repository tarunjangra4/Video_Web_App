import React from "react";
import { Button } from "@mui/material";
import appIcon from "../images/icon.png";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ handleOpen }) => {
  const navigate = useNavigate();

  return (
    <div className="h-20 fixed z-10 w-full bg-white flex justify-between items-center px-28 shadow-md">
      <img
        src={appIcon}
        alt=""
        className="w-20"
        loading="lazy"
        title="Matrix 24"
      />
      <div className="flex items-center gap-5">
        <AccountCircle
          fontSize="large"
          className="text-[#8d86db] hover:text-[#4338b0] hover:font-medium cursor-pointer"
          onClick={() => navigate("/profile")}
          titleAccess="Profile"
        />
        <Button variant="outlined" onClick={handleOpen}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
