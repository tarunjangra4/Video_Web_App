import { Button } from "@mui/material";
import React from "react";

const Navbar = ({ handleOpen }) => {
  return (
    <div className="h-20 flex justify-between items-center px-16">
      <p className="text-3xl font-medium">Icon</p>
      <div>
        <Button variant="outlined" onClick={handleOpen}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
