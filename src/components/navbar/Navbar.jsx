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
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
// import LoginModal from "../dialogs/LoginModal";

function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(false);
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
        setUser(true);
        setOpenLogin(false);
      }
    });
  }, []);

  const [create, setCreate] = useState(false);

  // const handleLogin = () => {

  // };
  return (
    <AppBar sx={style.appbar}>
      <Toolbar sx={style.toolbar}>
        <div>
          <Avatar />
        </div>
        <div>
          <PrimaryButton
            sx={{ minWidth: "100px" }}
            children={user ? auth.currentUser.displayName : "login"}
            onClick={() => setOpenLogin(true)}
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
          // <Dialog
          //   open={openLogin}
          //   // TransitionComponent={Transition}
          //   keepMounted
          //   // onClose={handleClose}
          //   scroll="body"
          //   PaperProps={{ sx: { borderRadius: "20px" } }}
          // >
          //   <Box sx={{ padding: 5, width: 500 }}>
          //     <IconButton
          //       sx={{
          //         width: "fit-content",
          //         position: "absolute",
          //         top: 10,
          //         right: 10,
          //       }}
          //       // onClick={handleClose}
          //     >
          //       {/* <CloseIcon sx={{ textAlign: "right" }} /> */}
          //     </IconButton>
          //     <div className="bg-image">
          //       <PrimaryButton
          //         sx={{
          //           marginTop: "10px",
          //         }}
          //         size={"large"}
          //         // onClick={handleSignin}
          //       >
          //         Login
          //       </PrimaryButton>
          //     </div>
          //   </Box>
          // </Dialog>
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
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};

export default Navbar;
