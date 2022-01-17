/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useRouter } from 'next/router';
import Link from 'next/link';
// @mui
import { Box, ListItemButton, Typography, Stack } from '@mui/material';
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

      {false ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            px: 4,
            py: 2,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'rgba(0, 0, 0, 0.62)',
          }}
        >
          <Box justifyContent="space-between" display="flex" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
            <Box display="flex" alignItems="center" sx={{ display: { xs: 'flex' }, flexWrap: 'wrap' }}>
              <Link href="/about/privacy-policy" passHref={true}>
                <ListItemButton>
                  <Typography sx={{ mr: { xs: 2, md: 8 } }} color="common.white">
                    Data privacy
                  </Typography>
                </ListItemButton>
              </Link>

              <Link href="/about/refund-policy" passHref={true}>
                <ListItemButton>
                  <Typography sx={{ mr: { xs: 2, md: 8 } }} color="common.white">
                    Refund Policy
                  </Typography>
                </ListItemButton>
              </Link>
              <Link href="/about/terms-of-service" passHref={true}>
                <ListItemButton>
                  <Typography sx={{ mr: 2 }} color="common.white">
                    Terms and conditions
                  </Typography>
                </ListItemButton>
              </Link>
            </Box>
            <Box display="flex">
              <Link href="/about/faq" passHref={true}>
                <ListItemButton>
                  <Typography sx={{ mr: { xs: 2, md: 8 } }} color="common.white">
                    FAQ
                  </Typography>
                </ListItemButton>
              </Link>

              <Link href="/help" passHref={true}>
                <Box display="flex" alignItems="center">
                  <HelpOutlineOutlinedIcon color="common.white" sx={{ mr: 1, color: 'white' }} />
                  <Typography color="common.white"> Help</Typography>
                </Box>
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
