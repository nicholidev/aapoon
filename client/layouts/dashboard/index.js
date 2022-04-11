/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// config
import {
  DASHBOARD_NAVBAR_WIDTH,
  DASHBOARD_HEADER_MOBILE,
  DASHBOARD_HEADER_DESKTOP,
  DASHBOARD_NAVBAR_COLLAPSE_WIDTH,
} from '../../config';
//
import DashboardHeader from './header';
import DashboardNavbar from './navbar';
import Bottom from '../../components/BottomNavigation';
import Box from '@mui/material/Box';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',

  display: 'flex',
}));

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: DASHBOARD_HEADER_MOBILE,
  paddingBottom: DASHBOARD_HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    paddingTop: DASHBOARD_HEADER_DESKTOP,
    paddingBottom: DASHBOARD_HEADER_DESKTOP,
    width: `calc(100% - ${DASHBOARD_NAVBAR_WIDTH}px)`,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: DASHBOARD_NAVBAR_COLLAPSE_WIDTH,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function DashboardLayout({ children, withBottomNav,withoutStack }) {
  const { collapseClick } = useCollapseDrawer();

  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <DashboardHeader onOpenSidebar={() => setOpen(true)} withoutStack={withoutStack} />

      {/* <DashboardNavbar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} /> */}

      <MainStyle collapseClick={collapseClick}>{children}</MainStyle>
      {withBottomNav && (
        <Box style={{ position: 'fixed', bottom: 0 }} sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
          <Bottom />
        </Box>
      )}
    </RootStyle>
  );
}
