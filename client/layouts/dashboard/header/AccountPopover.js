import NextLink from 'next/link';
import { useRef, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, MenuItem, Typography, Stack, Avatar } from '@mui/material';
// components
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
  {
    label: 'Settings',
    linkTo: '#',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButtonAnimate
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
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
        <Avatar src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg" alt="Rayan Moran" />
      </IconButtonAnimate>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            Kiley Barker
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            email
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
