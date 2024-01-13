import { Button } from "@mui/material";
// import GOOGLE_IMAGE from '../../assets/google.png'

const SocialButton = ({sx={}, ...props }) => {
  return (
    <Button
    // startIcon={GOOGLE_IMAGE}
      sx={{
        borderRadius: "8px",
        fontWeight: "500",
        backgroundColor: "#f5fadf",
        color: "#023d65",
        boxShadow: '1px 2px 5px 1px #00000019',
        marginY: '10px',
        fontSize: '14px',
        textTransform: 'capitalize',
        "&:hover": { backgroundColor: "#023d65", color: '#fff' },
        ...sx,
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default SocialButton;