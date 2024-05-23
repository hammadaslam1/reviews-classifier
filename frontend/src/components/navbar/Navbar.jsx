/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import "../../styles/globals.css";
import {
  // AppBar,
  Avatar,
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
import PrimaryButton from "../buttons/PrimaryButtons";
import LoginModal from "../dialogs/LoginModal";
import SignupModal from "../dialogs/SignupModal";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "../../firebase/firebase.js";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { PRODUCTS } from "../../routes/Routes";
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/logos/logo192.png";
import NAME_SLOGAN from "../../assets/logos/name_slogan.png";
import { category, subCat } from "../data/DataPaths";
import { useDispatch } from "react-redux";
import { toggleCategory } from "../../redux/category/CategoryReducer.jsx";
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
  overflow: "hidden",
  // alignItems: 'center',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  backgroundColor: "#112d4e",
  color: "#fff",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  position: "sticky",
  top: 0,
  zIndex: 1,
  // boxShadow: '0 0 0 0 #646365',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const DrawerFooter = styled("div")(({ theme }) => ({
  backgroundColor: "#112d4e",
  color: "#fff",
  height: "80px",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  position: "sticky",
  bottom: 0,
  zIndex: 1,
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  height: "80px",
  backgroundColor: "#112d4e",
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
  minHeight: "100vh",
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

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handlePath = (fullPath) => {
    dispatch(toggleCategory(fullPath));
    // navigate(PRODUCTS);
    setOpen(false);
    navigate(PRODUCTS);
    // window.location.reload();
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
  const [open, setOpen] = useState(false);

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
          <div style={{ display: "flex", alignItems: "center" }}>
            {!open && (
              <IconButton size="large" onClick={() => setOpen(!open)}>
                <MenuIcon htmlColor="#fff" />
              </IconButton>
            )}
            <IconButton
              size="large"
              // onClick={() => setOpen(!open)}
            >
              <img src={LOGO} height={50} alt="" srcset="" />
            </IconButton>
            <div>
              <img src={NAME_SLOGAN} height={35} alt="" srcset="" />
            </div>
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
          <Typography variant="h5" sx={{ marginX: 3, fontWeight: 600 }}>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon fontSize="large" htmlColor="#fff" />
            ) : (
              <ChevronLeftIcon fontSize="large" htmlColor="#fff" />
            )}
          </IconButton>
        </DrawerHeader>
        {category.sort().map((cat, i) => (
          <div
            key={i}
            onClick={() => setOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Typography
              component={"div"}
              sx={{
                px: 3,
                py: 2,
                color: "#fff",
                backgroundColor: "#1a4578",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              {open ? cat : cat[0]}
            </Typography>
            <List>
              {subCat
                .sort((a, b) => a.name - b.name)
                .map(
                  (data, index) =>
                    data.category == cat && (
                      <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: "block" }}
                        onClick={() => handlePath(data.fullPath)}
                      >
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
                            {data.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={data.name}
                            sx={{ opacity: open ? 1 : 0, fontSize: '10pt' }}
                          />
                        </ListItemButton>
                      </ListItem>
                    )
                )}
            </List>
          </div>
        ))}
        {/* <List>
          <Typography id="Ahsan">Hammad</Typography>
        </List> */}
        <DrawerFooter>
          {/* <div> */}
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
          {/* </div> */}
          <div>
            <Typography variant="h6" sx={{ marginX: 3, fontWeight: 500 }}>
              {/*  {auth.currentUser.displayName}*/}
            </Typography>
          </div>
        </DrawerFooter>
      </Drawer>
    </>
    // </Box>
  );
};

const style = {
  appbar: {
    backgroundColor: "#6a6a6a",
    height: "50px",
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
