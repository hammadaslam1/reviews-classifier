import {
  Alert,
  AppBar,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import {
//   ACCOUNT_INFO,
//   CREATE_EVENT,
//   EDIT_PROFILE,
//   EVENTS,
//   HOME,
//   MY_EVENTS,
//   STORIES,
//   VENUES,
// } from "../../routes/Routes";
// import SecondaryButton from "../buttons/SecondaryButton";
// import Login from "../dialogs/Login";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Signup from "../dialogs/Signup";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PrimaryButton from "../buttons/PrimaryButtons";
import SecondaryButton from "../buttons/SecondaryButton";
// import PrimaryButton from "../buttons/PrimaryButton";
// import { ADD_USER } from "../../redux/Types/Types";

const Navbar = () => {
  // const user = useSelector((state) => state.UserReducer.user);
  const user = false;
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const links = {
    color: "#fff",
    textDecoration: "none",
    textTransform: "capitalize",
    padding: "23px",
    fontWeight: "700",
    "&:hover": {
      backgroundColor: "#fff2",
    },
  };

  const menuStyles = {
    textAlign: "left",
    textTransform: "capitalize",
    color: "#023d65",
    width: "100%",
    fontSize: "16px",
    fontWeight: "bold",
  };
  const [openLogin, setOpenLogin] = useState(true);
  const [openSignup, setOpenSignup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    console.log("hello");
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
    <AppBar
      className="xs:px-[5px] sm:px-[10px] md:px-[20px] w-full"
      position="sticky"
      sx={{
        backgroundColor: "#023d65",
        top: "0",
        left: "0",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "7px" }}>
          {/* <img
            src={<Avatar />}
            // onClick={() => navigate(HOME)}
            className="w-[120px] sm:w-[150px] cursor-pointer"
          /> */}
          <Avatar />
          <div className="hidden md:flex">
            {/* <Search sx={{ marginLeft: 2, width: "30ch" }} /> */}
            <Typography variant="h5" color="white">
              Reviews Classifier
            </Typography>
          </div>
        </div>
        <div className="flex justify-around items-center font-['Helvetica'] ">
          <div className=" hidden lg:flex justify-around items-center font-['Helvetica'] ">
            <Button
              style={{ padding: "0" }}
              onClick={() => {
                setCreate(false);
              }}
            >
              {/* <Link to={VENUES} style={links}>
                Venues
              </Link> */}
            </Button>
            <Button
              style={{ padding: "0" }}
              onClick={() => {
                setCreate(false);
              }}
            >
              {/* <Link to={EVENTS} style={links}>
                Events
              </Link> */}
            </Button>
            <Button
              style={{ padding: "0", marginRight: "20px" }}
              onClick={() => {
                setCreate(false);
              }}
            >
              {/* <Link to={STORIES} style={links}>
                Stories
              </Link> */}
            </Button>
          </div>
          {/* <div> */}
          <Button
            // children={"Login"}
            onClick={() => {
              handleClick();
            }}
          >
            Login
          </Button>
          {/* </div> */}
        </div>
      </Toolbar>
      {/* {openLogin ? (
        <Login
          openLogin={openLogin}
          setOpenLogin={setOpenLogin}
          openSignup={openSignup}
          setOpenSignup={setOpenSignup}
        />
      ) : (
        ""
      )}
      {openSignup ? (
        <Signup
          openSignup={openSignup}
          setOpenSignup={setOpenSignup}
          openLogin={openLogin}
          setOpenLogin={setOpenLogin}
        />
      ) : (
        ""
      )} */}
    </AppBar>
  );
};

export default Navbar;
