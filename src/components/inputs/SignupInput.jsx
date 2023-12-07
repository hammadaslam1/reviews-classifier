import { Input } from "@mui/joy";
import { FormControl, FormHelperText, FormLabel, TextField } from "@mui/material";

const SignupInput = ({ ...props }) => {
  return (
    <FormControl sx={{ marginY: "4px", width: '100%' }}>
      <FormLabel sx={{  fontSize: "14px", marginBottom: '2px' }} >
        {props.label}
      </FormLabel>
      <Input   {...props} />
      {/* <textarea {...props} /> */}
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
};

export default SignupInput;