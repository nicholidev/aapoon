/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Iconify from '../Iconify';
import { update } from '@nandorojo/swr-firestore';
export default function FadeMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onResendInvitation = () => {
    update(`licenses/${props.data.id}`, { resend: true });
    handleClose();
  };
  const onRevokeLicence = () => {
    update(`licenses/${props.data.id}`, { isActivated: false });
    handleClose();
  };
  return (
    <div>
      <IconButton
        sx={{ ml: 4 }}
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Iconify icon={'akar-icons:more-vertical'} width={24} height={24} />
      </IconButton>

      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        elevation={2}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={onRevokeLicence}>Remove license</MenuItem>
        {props?.data?.expiredAt < new Date() && !props.data.isAccepted && (
          <MenuItem onClick={onResendInvitation}>Resend Invitation</MenuItem>
        )}
      </Menu>
    </div>
  );
}
