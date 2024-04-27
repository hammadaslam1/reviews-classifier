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
import PrimaryButton from "../buttons/PrimaryButtons";
import { forwardRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import { Mail } from "@mui/icons-material";
import LoginInput from "../inputs/LoginInput";
import SocialButton from "../buttons/SocialButton";
import GoogleIcon from "@mui/icons-material/Google";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "../../firebase/firebase.js";
import { Alert } from "@mui/joy";
import { auth } from "../../firebase/firebase";
// import GOOGLE_IMAGE from "../../assets/google.png";
// import { useDispatch, useSelector } from "react-redux";
// import './dialog.css'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoginModal = ({ openLogin, setOpenLogin, openSignup, setOpenSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFilled, setIsFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  // const user = useSelector((state) => state.UserReducer.user);
  // const dispatch = useDispatch();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSignin();
    }
  };
  const handleSignin = () => {
    if (email && password) {
      setIsPressed(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // alert("signed in");
          setIsPressed(false);
          setOpenLogin(false);
        })
        .catch((e) => {
          if (e.code == "auth/invalid-email") {
            setErrorMessage("Please enter valid email!");
            setIsPressed(false);
            setIsFilled(true);
          } else if (e.code == "auth/invalid-credential") {
            setErrorMessage("Invalid email or password!");
            setIsPressed(false);
            setIsFilled(true);
          }
        });
    } else {
      setErrorMessage("Please fill all fields");
      setIsFilled(true);
    }
  };
  const handleForgot = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("password reset email sent to your registered email address!");
      })
      .catch((e) => {
        if (e.code == "auth/invalid-email") {
          alert("Please enter a valid email address!");
        }
        // alert("error code: " + e.code + "\nerror message: " + e.message);
      });
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
      })
      .catch((e) => {
        setIsPressed(false);
        // alert(e.code, e.message);
      });
  };
  const handleClose = () => setOpenLogin(false);

  return (
    <Dialog
      open={openLogin}
      TransitionComponent={Transition}
      keepMounted={true}
      onClose={handleClose}
      scroll="body"
      PaperProps={{ sx: { borderRadius: "20px" } }}
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
            Sign in
          </Typography>
          <LoginInput
            variant="plain"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsFilled(false);
            }}
            startDecorator={<Mail sx={{ color: "#112d4e" }} />}
            placeholder="example@email.com"
          />
          <LoginInput
            variant="plain"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsFilled(false);
            }}
            startDecorator={<LockIcon sx={{ color: "#112d4e" }} />}
            placeholder="Password"
          />
          <div
            style={{
              width: "100%",
              textAlign: "right",
              marginBottom: "5px",
            }}
          >
            <Button
              // to=""
              onClick={() => {
                handleForgot();
              }}
              style={{
                color: "#112d4e",
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "capitalize",
                alignSelf: "right",
              }}
            >
              Forgot Password
            </Button>
          </div>
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
            size={"large"}
            onClick={handleSignin}
            // onKeyDown={handleKeyDown}
          >
            Sign in
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
              sx={{ display: "flex", alignItems: "center" }}
            >
              Continue with Google
            </SocialButton>
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
                Not a member yet?{" "}
                <Button
                  // to=""
                  onClick={() => {
                    setOpenSignup(true);
                    setOpenLogin(false);
                  }}
                  style={{
                    color: "#112d4e",
                    textDecoration: "underline",
                    fontSize: "15px",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  Sign up
                </Button>
              </Typography>
            </DialogActions>
          </div>
        </div>
      </Box>
    </Dialog>
  );
};

export default LoginModal;
