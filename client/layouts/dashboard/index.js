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

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    minHeight: '100%',
  },
}));

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: DASHBOARD_HEADER_MOBILE + 24,
  paddingBottom: DASHBOARD_HEADER_MOBILE + 24,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: DASHBOARD_HEADER_DESKTOP + 24,
    paddingBottom: DASHBOARD_HEADER_DESKTOP + 24,
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

export default function DashboardLayout({ children }) {
  const { collapseClick } = useCollapseDrawer();

  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <DashboardHeader onOpenSidebar={() => setOpen(true)} />

      {/* <DashboardNavbar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} /> */}

      <MainStyle collapseClick={collapseClick}>{children}</MainStyle>
    </RootStyle>
  );
}
