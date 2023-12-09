import {
  // Alert,
  Box,
  Button,
  Checkbox,
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
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Alert } from "@mui/joy";
import { auth } from "@/firebase/firebase";
// import GOOGLE_IMAGE from "../../assets/google.png";
// import { useDispatch, useSelector } from "react-redux";
// import './dialog.css'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const LoginModal = ({ openLogin, setOpenLogin, openSignup, setOpenSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFilled, setIsFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const user = useSelector((state) => state.UserReducer.user);
  // const dispatch = useDispatch();
  const handleSignin = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // alert("signed in");
          setOpenLogin(false);
        })
        .catch((e) => {
          if (e.code == "auth/invalid-email") {
            setErrorMessage("Please enter valid email!");
            setIsFilled(true);
          } else if (e.code == "auth/invalid-credential") {
            setErrorMessage("Invalid email or password!");
            setIsFilled(true);
          }
        });
    } else {
      setErrorMessage("Please fill all fields");
      setIsFilled(true);
    }
  };
  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((e) => {
        alert(e.code, e.message);
      });
  };
  const handleClose = () => setOpenLogin(false);

  return (
    <Dialog
      open={openLogin}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      scroll="body"
      PaperProps={{ sx: { borderRadius: "20px" } }}
    >
      <Box sx={{ padding: 5, width: 400 }}>
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
              color: "#023d65",
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
            startDecorator={<Mail sx={{ color: "#023d65" }} />}
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
            startDecorator={<LockIcon sx={{ color: "#023d65" }} />}
            placeholder="Password"
          />
          <div
            style={{
              width: "100%",
              textAlign: "right",
              marginBottom: "5px",
            }}
          >
            <a
              href="/"
              style={{
                color: "#023d65",
                textDecoration: "none",
                alignSelf: "right",
              }}
            >
              Forget Password
            </a>
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
                borderBottom: "1px solid #707070",
                width: "170px",
                height: "0px",
              }}
            ></div>
            <div>or</div>
            <div
              style={{
                borderBottom: "1px solid #707070",
                width: "170px",
                height: "0px",
              }}
            ></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <SocialButton size={"large"} onClick={handleGoogle}>
              {/* <img
                // src={GOOGLE_IMAGE}
                // src="../../assets/google.png"
                width="20px"
                style={{ marginRight: "10px" }}
              />{" "} */}
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
                    color: "#023d65",
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
