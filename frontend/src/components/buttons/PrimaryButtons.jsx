import { Button, Typography } from "@mui/material";

const PrimaryButton = ({ sx = {}, ...props }) => {
  return (
    <Button
      sx={{
        borderRadius: "8px",
        fontWeight: "700",
        backgroundColor: "#023d65",
        width: "100%",
        alignSelf: "center",
        boxShadow: "1px 2px 5px 1px #00000019",
        color: "#fff",
        textTransform: "capitalize",
        "&:hover": { backgroundColor: "#f5fadf", color: "#023d65" },
        ...sx,
      }}
      {...props}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: "5px",
        }}
      >
        <div>{props.icon}</div>
        <Typography variant="h6">
          {props.children}
          </Typography>
      </div>
    </Button>
  );
};

export default PrimaryButton;
