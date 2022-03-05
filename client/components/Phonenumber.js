/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { forwardRef, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { getCountry } from './../api/user';
import Divider from '@mui/material/Divider';
const phoneInput = (props, ref) => {
  const [countryCode, setCountryCode] = useState('US');
  useEffect(() => {
    getCountry().then((res) => {
      console.log(res.data);
      setCountryCode(res.data.country_calling_code);
    });
  }, []);
  return (
    <TextField
      {...props}
      InputProps={{
        startAdornment: props.endorment,
      }}
      inputRef={ref}
      fullWidth
      onChange={(e) => {
        e.target.value = e.target.value.replace(/\+/g, '');
        props.onChange(e);
      }}
      label="Phone Number"
      variant="outlined"
      name="phone"
    />
  );
};
export default forwardRef(phoneInput);
