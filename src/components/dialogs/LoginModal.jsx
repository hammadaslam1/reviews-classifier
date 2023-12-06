import { Box, Dialog, IconButton, Slide } from "@mui/material";
import PrimaryButton from "../buttons/PrimaryButtons";
import { useState } from "react";


// const Transition = forwardRef(function Transition(props, ref) {
//   return <Slide direction="down" ref={ref} {...props} />;
// });

const LoginModal = ({ openLogin, setOpenLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Dialog
      open={openLogin}
      // TransitionComponent={Transition}
      keepMounted
      // onClose={handleClose}
      scroll="body"
      PaperProps={{ sx: { borderRadius: "20px" } }}
    >
      <Box sx={{ padding: 5, width: 500 }}>
        <IconButton
          sx={{
            width: "fit-content",
            position: "absolute",
            top: 10,
            right: 10,
          }}
          // onClick={handleClose}
        >
          {/* <CloseIcon sx={{ textAlign: "right" }} /> */}
        </IconButton>
        <div className="bg-image">
          <PrimaryButton
            sx={{
              marginTop: "10px",
            }}
            size={"large"}
            // onClick={handleSignin}
          >
            Login
          </PrimaryButton>
        </div>
      </Box>
    </Dialog>
  );
};

export default LoginModal;
