/* eslint-disable no-unused-vars */
import { Input } from "@mui/joy";
import { FormControl, FormHelperText, FormLabel, TextField } from "@mui/material";

const SignupInput = ({ ...props }) => {
  return (
    <FormControl sx={{ marginY: "4px", width: '100%' }}>
      <FormLabel sx={{  fontSize: "14px", marginBottom: '2px', color: '#112d4e' }} >
        {props.label}
      </FormLabel>
      <Input sx={{padding: '8px 12px'}}  {...props} required />
      {/* <textarea {...props} /> */}
      <FormHelperText sx={{color: '#112d4e'}}>{props.helperText}</FormHelperText>
    </FormControl>
  );
};

export default SignupInput;