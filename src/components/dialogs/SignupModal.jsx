import {
    Alert,
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
  import GOOGLE_IMAGE from "../../assets/google.png";
  import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";  
import SignupInput from "../inputs/SignupInput";
  // import './dialog.css'
  
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  
  const SignupModal = ({ openLogin, openSignup, setOpenSignup, setOpenLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleBack = () => {
        setOpenSignup(false);
        setOpenLogin(true);
      };
      const handleClose = () => {
        setOpenSignup(false);
        setOpenLogin(false);
      };
      const handleRegister = () => {
        alert('register pressed')
      }
    return (
      <Dialog
        open={openSignup}
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
                color: "#023d65",
              }}
            >
              Register
            </Typography>
            <SignupInput
            type="text"
            variant="outlined"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            label="Full Name"
            placeholder="Enter Your Full Name"
            required
          />
            <SignupInput
            type="email"
            variant="outlined"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Email Address"
            label="Email Address"
            helperText="We'll use your email address for registration"
            required
          />
          <SignupInput
            type="number"
            variant="outlined"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="Contact No."
            label="Contact No."
            required
          />
          <SignupInput
            type="password"
            variant="outlined"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            label="Password"
            required
          />
            
            <PrimaryButton
            sx={{
              marginTop: "10px",
            }}
            size={"large"}
            onClick={handleRegister}
          >
            Register
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
              <SocialButton size={"large"}>
                {/* <img
                  // src={GOOGLE_IMAGE}
                  // src="../../assets/google.png"
                  width="20px"
                  style={{ marginRight: "10px" }}
                />{" "} */}
                Register using Google
              </SocialButton>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
            <DialogActions sx={{ alignSelf: "center" }}>
              <Typography
                variant="body2"
                color="#505050"
                style={{ marginTop: "12px", display: 'flex', alignItems: 'center' }}
              >
                Already a member?{" "}
                <Button
                  onClick={() => {
                    setOpenSignup(false);
                    setOpenLogin(true);
                  }}
                  style={{
                    color: "#023d65",
                    textDecoration: "underline",
                    fontSize: '15px',
                    fontWeight: "bold",
                    textTransform: 'capitalize',
                  }}
                >
                  Login
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
  