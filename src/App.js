import React, { Suspense, lazy, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import { Modal } from "@mui/material";
// import SignUp from "./pages/SignUp";
const SignUp = lazy(() => import("./pages/SignUp"));
// import Login from "./pages/Login";
const Login = lazy(() => import("./pages/Login"));
// import Home from "./pages/Home";
const Home = lazy(() => import("./pages/Home"));
// import ResetPassword from "./pages/ResetPassword";
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
// import Profile from "./pages/Profile";
const Profile = lazy(() => import("./pages/Profile"));
// import VideoPlayer from "./pages/VideoPlayer";
const VideoPlayer = lazy(() => import("./pages/VideoPlayer"));
const Sections = lazy(() => import("./pages/Sections"));

const App = () => {
  // const [openModal, setModalOpen] = useState(false);
  const location = useLocation();

  // const handleModalOpen = () => setModalOpen(true);
  // const handleModalClose = () => setModalOpen(false);
  const token = localStorage.getItem("token");

  // console.log("token ", token);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {!token ? (
          <div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
            </Routes>
          </div>
        ) : (
          <div className="flex">
            {/* <Navbar handleOpen={handleModalOpen} /> */}
            <div className="w-[100%] flex justify-center">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/video" element={<VideoPlayer />}></Route>
                <Route
                  path="/video/:contentType"
                  element={<Sections />}
                ></Route>
                {/* <Route path="/profile/:postId" element={<Profile />}></Route> */}
                {/* <Route path="/edit-profile" element={<EditProfile />}></Route> */}
              </Routes>
            </div>
          </div>
        )}
      </Suspense>
      {/* <Modal open={openModal} onClose={handleModalClose}>
        <Upload handleModalClose={handleModalClose} />
      </Modal> */}
    </div>
  );
};

export default App;
