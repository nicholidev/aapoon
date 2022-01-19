/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useRouter } from 'next/router';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Typography } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { MAIN_HEADER_DESKTOP, MAIN_HEADER_MOBILE } from '../../config';
// components
import Logo from '../../components/Logo';
import Label from '../../components/Label';
//
import AccountPopover from '../dashboard/header/AccountPopover';
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import useAuth from '../../hooks/useAuth';
// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: MAIN_HEADER_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: MAIN_HEADER_DESKTOP,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(100);

  const theme = useTheme();
  const { user } = useAuth();
  const { pathname, push } = useRouter();

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/';

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'white' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: MAIN_HEADER_DESKTOP - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo />

          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <MenuDesktop id={user.id} isOffset={true} isHome={isHome} navConfig={navConfig} />}
          {user?.id ? null : (
            <Button
              sx={{ display: { xs: 'none', sm: 'block' }, mr: 4 }}
              rel="noopener"
              onClick={() => push('/auth/Login')}
            >
              Sign in
            </Button>
          )}

          {user?.id && isDesktop ? (
            <AccountPopover />
          ) : (
            <Button
              sx={{ display: { xs: 'none', sm: 'block' } }}
              variant="contained"
              onClick={() => push('/auth/Register')}
            >
              Sign up, It’s free
            </Button>
          )}

          {!isDesktop && <MenuMobile isOffset={true} isHome={isHome} id={user?.id} navConfig={navConfig} />}
        </Container>
      </ToolbarStyle>
      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
