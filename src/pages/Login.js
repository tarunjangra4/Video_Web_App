import React, { useContext, useState } from "react";
import { Button, InputAdornment, TextField, makeStyles } from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import Input from "@mui/material/Input";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import { navigate } from "gatsby";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import loginPageImage from "../images/loginPageImage.svg";
import wave from "../images/wave1.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login({ email, password });
    navigate("/");
  };

  return (
    <div className="h-screen flex gap-28 items-center justify-center bg-[#F4F7FA]">
      <img className="max-w-md" src={loginPageImage} alt="" />
      {/* <img className="max-w-md" src={wave} /> */}
      <div className="flex flex-col gap-10 bg-white p-10">
        <div>
          {/* <p className="font-semibold text-lg">Welcome to </p> */}
          {/* <p className="text-2xl text-[#6358DD] font-bold">Marketing School</p> */}
          <p className="text-2xl text-[#6358DD] font-bold">LOGIN</p>
        </div>
        <TextField
          id="email"
          className="w-80"
          label="Email"
          variant="outlined"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <TextField
            type={showPassword ? "text" : "password"}
            id="password"
            className="w-80"
            label="Password"
            variant="outlined"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </div>
        </div>
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <p
          className="text-sm text-right mt-[-20px] text-[#6358DD] font-semibold cursor-pointer"
          onClick={() => navigate("/resetPassword")}
        >
          Forgot Password
        </p>
        <div className="flex items-center justify-end">
          <p className="text-gray-400 mr-2 mb-px">Don't have an account?</p>
          {/* <Link to="/signup" className="text-sm text-[#6358DD] font-semibold"> */}
          <p
            className="text-sm text-[#6358DD] font-semibold cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            SIGN UP
          </p>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
