import React, { useState } from "react";
import loginPageImage from "../images/loginPageImage.svg";
import { Button, InputAdornment, TextField, makeStyles } from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import Input from "@mui/material/Input";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must include at least one capital letter")
    .matches(/[0-9]/, "Password must include at least one number")
    .matches(
      /[!@#$%^&*]/,
      "Password must include at least one special character (!@#$%^&*)"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="h-screen flex gap-28 items-center justify-center bg-[#F4F7FA]">
      <img className="max-w-md" src={loginPageImage} alt="" />
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // same shape as initial values
          // login({ email: values.email, password });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="flex flex-col bg-white p-10">
            {console.log(touched, errors)}
            <div>
              {/* <p className="font-semibold text-lg">Welcome to </p> */}
              <p className="text-2xl text-[#6358DD] font-bold mb-10">
                Reset Your Password
              </p>
            </div>
            <TextField
              className="w-80"
              label="Email"
              variant="outlined"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange("email")}
            />
            {touched.email && errors.email && (
              <p className="text-red-500">{errors.email}</p>
            )}
            <div className="relative mt-10">
              <TextField
                className="w-80"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange("password")}
              />
              <div
                className="absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </div>
            </div>
            {touched.password && errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <div className="relative mt-10">
              <TextField
                className="w-80"
                label="Confirm Password"
                variant="outlined"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
              />
              <div
                className="absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </div>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
            <div className="w-full mt-10">
              <Button
                className="w-full"
                variant="contained"
                onClick={handleSubmit}
              >
                Reset Password
              </Button>
            </div>
            <div className="flex items-center justify-end mt-10">
              <Link to="/" className="text-sm text-[#6358DD] font-semibold">
                SIGN IN
              </Link>
              <p className="text-gray-400 mr-2 ml-1 mb-px">
                with password instead.
              </p>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
