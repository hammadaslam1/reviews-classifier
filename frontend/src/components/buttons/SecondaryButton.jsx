import { Button } from "@mui/material";

const SecondaryButton = ({sx={}, ...props }) => {
  return (
    <Button
      sx={{
        // borderRadius: "8px",
        // fontWeight: "700",
        // backgroundColor: "#fff",
        // width: "140px",
        // color: "#112d4e",
        // textTransform: 'capitalize',
        // ...sx,
        // "&:hover": { backgroundColor: "#f5fadf" },
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default SecondaryButton;