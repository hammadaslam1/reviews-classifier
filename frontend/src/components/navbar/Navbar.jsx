/* eslint-disable no-unused-vars */
import {
  // AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CssBaseline,
  Dialog,
  Divider,
  // Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import React, { useEffect, useState } from "react";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButtons";
import LoginModal from "../dialogs/LoginModal";
import SignupModal from "../dialogs/SignupModal";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
// import { Alert } from "@mui/joy";
// import LoginModal from "../dialogs/LoginModal";

const drawerWidth = 300;

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: `#${Math.floor(Math.random() * (999999 - 100000)) + 100000}`,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  backgroundColor: "#6a6a6a",
  color: "#fff",
  height: "70px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  height: "70px",
  backgroundColor: "#6a6a6a",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState();
  const isOpen = Boolean(anchorEl);

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

  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    // <Box sx={{ display: "flex" }}>
    //   <CssBaseline />
    <>
      <AppBar
        // sx={style.appbar}
        position="fixed"
        open={open}
      >
        <Toolbar sx={style.toolbar}>
          <div>
            <IconButton size="large" onClick={() => setOpen(!open)}>
              {auth.currentUser ? (
                <Avatar
                  {...stringAvatar("Muhammad Hammad Aslam")}
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
      <Drawer
        variant="permanent"
        open={open}
        // onClose={() => handleDrawerClose()}
      >
        <DrawerHeader>
          <Typography variant="h4" sx={{ marginX: 3, fontWeight: 700 }}>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
    // </Box>
  );
};

const style = {
  appbar: {
    backgroundColor: "#6a6a6a",
    height: "70px",
    position: "fixed",
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
