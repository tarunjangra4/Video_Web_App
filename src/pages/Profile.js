import React, { useContext, useEffect } from "react";
import bgImg from "../images/profile-background.png";
import { AccountCircleOutlined, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const {
    updateUserProfile,
    getUserProfile,
    getUserRole,
    userProfile,
    setUserProfile,
    profileUpdated,
  } = useContext(UserContext);

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    getUserProfile();
  }, [profileUpdated]);

  const navigate = useNavigate();
  return (
    <div
      className="w-full h-screen flex justify-center pt-16"
      //   style={{
      //     backgroundImage: `url(${bgImg})`,
      //     backgroundRepeat: "no-repeat",
      //     backgroundSize: "100% 100%",
      //   }}
    >
      <div className="">
        {/* <div className="flex gap-6">
          <ArrowBack
            fontSize="large"
            className="border-2 border-gray-400 rounded-full text-gray-500 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="text-2xl font-semibold text-gray-600">Profile</div>
        </div> */}
        <hr className="mb-16 mt-5" />
        <div className="flex gap-20 px-10">
          <div className="w-[120px] h-[120px] border rounded-full mb-5">
            {userProfile.profileUrl ? (
              <img
                src={userProfile.profileUrl}
                className="w-full h-full object-cover rounded-full"
                alt=""
              />
            ) : (
              <AccountCircleOutlined
                style={{ fontSize: 120 }}
                className="text-[#8d86db]"
              />
            )}
          </div>
          <div>
            <div className="mb-6">
              <TextField
                id="name"
                className="w-[300px]"
                label="Name"
                variant="outlined"
                name="name"
                InputLabelProps={{
                  shrink: userProfile.name && true,
                }}
                value={userProfile.name}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, name: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <TextField
                id="email"
                className="w-[300px]"
                label="Email"
                variant="outlined"
                name="email"
                InputLabelProps={{
                  shrink: userProfile.email && true,
                }}
                value={userProfile.email}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, email: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <TextField
                id="phone"
                className="w-[300px]"
                label="Phone"
                variant="outlined"
                name="phone"
                InputLabelProps={{
                  shrink: userProfile.phoneNumber && true,
                }}
                value={userProfile.phoneNumber}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-6">
              <TextField
                multiline
                minRows={2}
                maxRows={4}
                id="bio"
                className="w-[300px]"
                label="Bio"
                variant="outlined"
                name="bio"
                InputLabelProps={{
                  shrink: userProfile.bio && true,
                }}
                value={userProfile.bio}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, bio: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <Button
                className="w-[300px]"
                variant="contained"
                onClick={updateUserProfile}
              >
                Update
              </Button>
            </div>
            <div className="w-full flex justify-end mt-4">
              <p
                className="w-20 py-1 text-center text-red-500 font-semibold cursor-pointer hover:bg-red-100 rounded"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
