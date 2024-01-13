/* eslint-disable no-unused-vars */
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButtons";
import LoginModal from "../dialogs/LoginModal";
import SignupModal from "../dialogs/SignupModal";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
// import { Alert } from "@mui/joy";
// import LoginModal from "../dialogs/LoginModal";

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (auth.currentUser) {
        // auth.currentUser.displayName = 'hammad'
        setUser("logout");
        setOpenLogin(false);
      } else {
        setUser("login");
        setOpenLogin(true);
      }
    });
  }, []);

  const [create, setCreate] = useState(false);

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: `#${Math.floor(Math.random() * (999999 - 100000)) + 100000}`,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };
  return (
    <AppBar sx={style.appbar}>
      <Toolbar sx={style.toolbar}>
        {/* <div>
          <Avatar />
        </div> */}
        <div>
          {/* {auth.currentUser ? (
            <Typography variant="h4">{auth.currentUser.displayName}</Typography>
          ) : (
            ""
          )} */}
          <IconButton size="large">
            {auth.currentUser ? (
              <Avatar
                {...stringAvatar("Muhammad Aslam")}
                src={auth.currentUser.photoURL}
              />
            ) : (
              <Avatar />
            )}
          </IconButton>
        </div>
        <div style={{ alignSelf: "right" }}>
          <PrimaryButton
            sx={{
              minWidth: "100px",
              alignSelf: "right",
              fontSize: 20,
              fontWeight: "normal",
            }}
            children={user}
            onClick={() => {
              if (auth.currentUser) {
                signOut(auth);
              } else {
                setOpenLogin(true);
              }
            }}
          />
        </div>
        {openLogin ? (
          <LoginModal
            openLogin={openLogin}
            setOpenLogin={setOpenLogin}
            openSignup={openSignup}
            setOpenSignup={setOpenSignup}
          />
        ) : (
          ""
        )}
        {openSignup ? (
          <SignupModal
            openSignup={openSignup}
            setOpenSignup={setOpenSignup}
            openLogin={openLogin}
            setOpenLogin={setOpenLogin}
          />
        ) : (
          ""
        )}
      </Toolbar>
    </AppBar>
  );
}

const style = {
  appbar: {
    backgroundColor: "#6a6a6a",
    height: "70px",
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    // width: "100%",
  },
};

export default Navbar;
