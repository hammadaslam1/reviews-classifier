import { Input } from "@mui/joy";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";

const LoginInput = ({ sx = {}, ...props }) => {
  return (
    <>
      {/* <Input
        variant="plain"
        sx={{
          backgroundColor: "#f8f8f8",
          marginY: "10px",
          borderRadius: "8px",
          padding: "8px 12px",
          ...sx,
        }}
        {...props}
      /> */}
      <FormControl sx={{ marginY: "4px", width: "100%" }}>
        <FormLabel
          sx={{ fontSize: "14px", marginBottom: "2px", color: "#112d4e" }}
        >
          {props.label}
        </FormLabel>
        <Input sx={{ padding: "8px 12px" }} {...props} required />
        {/* <textarea {...props} /> */}
        <FormHelperText sx={{ color: "#112d4e" }}>
          {props.helperText}
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default LoginInput;
