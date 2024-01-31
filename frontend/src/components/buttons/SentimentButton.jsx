import { Button } from "@mui/material";

const SentimentButton = ({ sx = {}, ...props }) => {
  return (
    <Button
      // variant={props.sentiment == props.value ? "contained" : "plain"}
      sx={{
        borderRadius: "8px",
        fontWeight: "700",
        alignSelf: "center",
        boxShadow: "1px 2px 5px 1px #00000019",
        textTransform: "capitalize",
        marginRight: 1,
        "&:hover": { backgroundColor: "#112d4e", color: "#fff" },
        ...sx,
      }}
      onClick={props.onClick}
      {...props}
    >
      {props.value}
    </Button>
  );
};

export default SentimentButton;
