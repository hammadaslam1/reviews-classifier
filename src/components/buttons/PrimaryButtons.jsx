import { Button } from "@mui/material";

const PrimaryButton = ({sx={}, ...props }) => {
  return (
    <Button
    sx={{
      borderRadius: "8px",
      fontWeight: "700",
      backgroundColor: "#023d65",
      width: "240px",
      alignSelf: "center",
      color: '#fff',    
      textTransform: 'capitalize',    
      "&:hover": {backgroundColor: "#f5fadf", color: '#023d65'},
      ...sx,
      }}
      {...props}
    >
      {props.children}
    </Button>
    
  );
};

export default PrimaryButton;