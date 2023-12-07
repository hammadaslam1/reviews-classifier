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
import React, { useState } from "react";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButtons";
import LoginModal from "../dialogs/LoginModal";
import SignupModal from "../dialogs/SignupModal";
// import LoginModal from "../dialogs/LoginModal";

function Navbar() {
  const [openLogin, setOpenLogin] = useState(true);
  const [openSignup, setOpenSignup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [create, setCreate] = useState(false);

  const handleLogin = () => {
    if (!user) {
      setOpenLogin(true);
    }
  };
  return (
    <AppBar sx={style.appbar}>
      <Toolbar sx={style.toolbar}>
        <div>
          <Avatar />
        </div>
        <div>
          <PrimaryButton
            sx={{ width: "100px" }}
            children={"Login"}
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
