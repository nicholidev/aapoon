/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useRouter } from 'next/router';
// @mui
import { Box, Link, Container, Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/Logo';
//
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
// ----------------------------------------------------------------------

export default function MainLayout({ children }) {
  const { pathname } = useRouter();
  const isHome = pathname === '/';

  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader />

      {children}

      <Box sx={{ flexGrow: 1 }} />

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            px: 4,
            py: 2,
            textAlign: 'center',
            position: 'relative',
            bgcolor: '#000000',
          }}
        >
          <Box justifyContent="space-between" display="flex" alignItems="center">
            <Box display="flex" alignItems="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <img src="images/home/logofooter.png" height="42px" />
              <Typography sx={{ mr: 2, ml: 6 }} color="common.white">
                Data privacy
              </Typography>
              <Typography sx={{ mr: 2 }} color="common.white">
                Terms and conditions
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ display: { xs: 'flex', sm: 'none' } }}>
              <img src="images/home/logofooter.png" height="42px" />
            </Box>
            <Box display="flex" alignItems="center">
              <HelpOutlineOutlinedIcon color="common.white" sx={{ mr: 1, color: 'white' }} />
              <Typography color="common.white"> Help</Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            sx={{ display: { xs: 'flex', sm: 'none' }, mt: 4 }}
          >
            <Typography color="common.white">Data privacy</Typography>
            <Typography color="common.white">Terms and conditions</Typography>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
