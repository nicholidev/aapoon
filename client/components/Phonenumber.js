/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { forwardRef } from 'react';
import TextField from '@mui/material/TextField';
const phoneInput = (props, ref) => {
  return <TextField {...props} inputRef={ref} fullWidth label="Phone Number" variant="outlined" name="phone" />;
};
export default forwardRef(phoneInput);
