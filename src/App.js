import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import VideoPlayer from "./pages/VideoPlayer";

const App = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  // const token = "test";

  console.log("token ", token);

  return (
    <div>
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
          <div className="w-[100%] flex justify-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/:videoId" element={<VideoPlayer />}></Route>
              {/* <Route path="/profile/:postId" element={<Profile />}></Route> */}
              {/* <Route path="/edit-profile" element={<EditProfile />}></Route> */}
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
