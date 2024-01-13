/* eslint-disable no-unused-vars */
import { Input } from "@mui/joy";
import { FormControl, FormHelperText, FormLabel, TextField } from "@mui/material";

const SignupInput = ({ ...props }) => {
  return (
    <FormControl sx={{ marginY: "4px", width: '100%' }}>
      <FormLabel sx={{  fontSize: "14px", marginBottom: '2px', color: '#023d65' }} >
        {props.label}
      </FormLabel>
      <Input sx={{padding: '8px 12px'}}  {...props} required />
      {/* <textarea {...props} /> */}
      <FormHelperText sx={{color: '#023d65'}}>{props.helperText}</FormHelperText>
    </FormControl>
  );
};

export default SignupInput;