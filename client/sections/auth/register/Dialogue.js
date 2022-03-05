/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { countryCodes } from './counrtyCode';
import { ButtonBase } from '@mui/material';
import Flag from '../../../components/Flag';
export default function DialogSelect(props) {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div>
      <ButtonBase onClick={handleClickOpen}>{props.children}</ButtonBase>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Select your country</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ mt: 7, minWidth: 280 }} fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={props.setccd}
                value={props.value}
              >
                {props.countryCodes.map((option) => {
                  return (
                    <MenuItem value={option.code}>
                      <Box display={'flex'} alignItems="center">
                        <Flag code={option.code.toUpperCase()} />
                        &nbsp;&nbsp;
                        {option.label} &nbsp;&nbsp;({option.value})
                      </Box>
                    </MenuItem>
                  );
                })}
              </Select>

              {/* <Autocomplete
                options={props.countryCodes}
                fullWidth
                autoComplete={true}
              
              
                renderInput={(params) => {
                  console.log(
                    params,
                    props.countryCodes.find((i) => i.label == params?.inputProps?.value)
                  );
                  return (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <i> {props.countryCodes.find((i) => i.label == params?.inputProps?.value)?.flag}</i>
                        ),
                      }}
                      label="Country"
                    />
                  );
                }}
              /> */}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
