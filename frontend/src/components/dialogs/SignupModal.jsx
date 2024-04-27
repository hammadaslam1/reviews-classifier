/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import {
  Backdrop,
  // Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  FormControlLabel,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import Alert from "@mui/joy/Alert";
import PrimaryButton from "../buttons/PrimaryButtons";
import { forwardRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import { Mail } from "@mui/icons-material";
import LoginInput from "../inputs/LoginInput";
import SocialButton from "../buttons/SocialButton";
import GOOGLE_IMAGE from "../../assets/google.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SignupInput from "../inputs/SignupInput";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "../../firebase/firebase.js";
import { auth } from "../../firebase/firebase";
import GoogleIcon from "@mui/icons-material/Google";
import BACKIMAGE from "../../assets/logos/logo192.png";
// import './dialog.css'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SignupModal = ({
  openLogin,
  openSignup,
  setOpenSignup,
  setOpenLogin,
}) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [isFilled, setIsFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const handleBack = () => {
    setOpenSignup(false);
    setOpenLogin(true);
  };
  const handleClose = () => {
    setOpenSignup(false);
    setOpenLogin(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleRegister();
    }
  };

  const handleGoogle = () => {
    setIsPressed(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setIsPressed(false);
        setOpenSignup(false);
      })
      .catch((e) => {
        setIsPressed(false);
        // alert(e.code, e.message);
      });
  };
  const handleRegister = () => {
    if (fullname && email && contact && password) {
      setIsPressed(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: fullname,
            phoneNumber: contact,
          }).then(() => {
            // alert("successfully registered!");
            setIsPressed(false);
            setOpenSignup(false);
          });
        })
        .catch((e) => {
          setIsPressed(false);
          if (e.code == "auth/invalid-email") {
            setErrorMessage("Please enter a valid email");
            setIsFilled(true);
          } else if (e.code == "auth/email-already-in-use") {
            setErrorMessage(
              "The email you provided has already been registered"
            );
            setIsFilled(true);
          } else if (e.code == "auth/weak-password") {
            setErrorMessage("Password should be at least 6 characters");
            setIsFilled(true);
          }
          // alert(e.code + " - " + e.message);
        });
    } else {
      setErrorMessage("Please fill all fields");
      setIsFilled(true);
      // console.log(auth);
    }
  };

  const backStyle = {
    borderRadius: "20px",
  };
  return (
    <Dialog
      open={openSignup}
      TransitionComponent={Transition}
      keepMounted={true}
      onClose={handleClose}
      scroll="body"
      PaperProps={{ sx: backStyle }}
      onKeyDown={handleKeyDown}
    >
      <Backdrop
        sx={{ color: "#112d4e", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isPressed}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 5, width: 500 }}>
        <IconButton
          sx={{
            width: "fit-content",
            position: "absolute",
            top: 10,
            right: 10,
          }}
          onClick={handleClose}
        >
          <CloseIcon sx={{ textAlign: "right" }} />
          {/* Close */}
        </IconButton>
        <div className="bg-image">
          <IconButton
            sx={{
              width: "fit-content",
              position: "absolute",
              top: 35,
              left: 20,
            }}
            onClick={handleBack}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "700",
              textAlign: "center",
              fontFamily: "Helvetica",
              marginBottom: "20px",
              color: "#112d4e",
            }}
          >
            Sign up
          </Typography>
          <SignupInput
            type="text"
            variant="outlined"
            value={fullname}
            onChange={(e) => {
              setIsFilled(false);
              setFullname(e.target.value);
            }}
            label="Full Name"
            placeholder="Enter Your Full Name"
            required
          />
          <SignupInput
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setIsFilled(false);
              setEmail(e.target.value);
            }}
            placeholder="Enter Email Address"
            label="Email Address"
            helperText="We'll use your email address for registration"
            required
          />
          <SignupInput
            type="tel"
            variant="outlined"
            value={contact}
            onChange={(e) => {
              setIsFilled(false);
              setContact(e.target.value);
            }}
            placeholder="Enter Contact No."
            label="Contact No."
            required
          />
          <SignupInput
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => {
              setIsFilled(false);
              setPassword(e.target.value);
            }}
            placeholder="Password"
            label="Password"
            required
          />
          {isFilled ? (
            <Alert variant="solid" color="danger" sx={{ textAlign: "center" }}>
              {errorMessage}
            </Alert>
          ) : (
            ""
          )}
          <PrimaryButton
            sx={{
              marginTop: "10px",
            }}
            size={"medium"}
            onClick={handleRegister}
          >
            Sign up
          </PrimaryButton>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid #112d4eaa",
                width: "170px",
                height: "0px",
              }}
            ></div>
            <div style={{ color: "#112d4e" }}>or</div>
            <div
              style={{
                borderBottom: "1px solid #112d4eaa",
                width: "170px",
                height: "0px",
              }}
            ></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <SocialButton
              size={"large"}
              onClick={handleGoogle}
              startIcon={<GoogleIcon />}
            >
              Continue with Google
            </SocialButton>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <DialogActions sx={{ alignSelf: "center" }}>
              <Typography
                variant="body2"
                color="#505050"
                style={{
                  marginTop: "12px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">Already a member?</Typography>{" "}
                <Button
                  onClick={() => {
                    setOpenSignup(false);
                    setOpenLogin(true);
                  }}
                  style={{
                    color: "#112d4e",
                    textDecoration: "underline",
                    fontSize: "15px",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  Sign in
                </Button>
              </Typography>
            </DialogActions>
          </div>
        </div>
      </Box>
    </Dialog>
  );
};

export default SignupModal;
