/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import NextLink from 'next/link';
import { useRef, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, MenuItem, Typography, Stack, Avatar } from '@mui/material';
// components
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import useAuth from '../../../hooks/useAuth';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: '#',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} ref={anchorRef} onClick={handleOpen}>
        <IconButtonAnimate
          sx={{
            mr: 1,
            padding: 0,
            width: 44,
            height: 44,
            ...(open && {
              '&:before': {
                zIndex: 1,
                content: "''",
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
              },
            }),
          }}
        >
          <Avatar
            src="http://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder-300x300.png"
            alt="Rayan Moran"
          />
        </IconButtonAnimate>
        <Typography
          variant="subtitle2"
          color="textPrimary"
          sx={{ mr: 1, textTransform: 'capitalize', display: { xs: 'none', sm: 'block' } }}
        >
          {user.displayName}
        </Typography>
        <KeyboardArrowDownIcon style={{ color: 'grey' }} />
      </Box>
      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap sx={{ textTransform: 'capitalize' }}>
            {user.displayName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider />
        <Stack spacing={0.5} sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <NextLink key={option.label} href={option.linkTo}>
              <MenuItem onClick={handleClose} sx={{ typography: 'body2', py: 1, px: 2, borderRadius: 1 }}>
                {option.label}
              </MenuItem>
            </NextLink>
          ))}
        </Stack>
        <Divider />

        <MenuItem sx={{ typography: 'body2', py: 1, px: 2, borderRadius: 1, m: 1 }} onClick={() => logout()}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
