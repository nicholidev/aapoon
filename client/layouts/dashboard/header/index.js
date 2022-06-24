/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Divider } from '@mui/material';
// hooks
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import {
  DASHBOARD_NAVBAR_COLLAPSE_WIDTH,
  DASHBOARD_HEADER_MOBILE,
  DASHBOARD_HEADER_DESKTOP,
} from '../../../config';
// components
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import Logo from '../../../components/Logo';
// ----------------------------------------------------------------------
const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse',
})(({ isCollapse, theme }) => ({
  boxShadow: 'none',
  ...cssStyles(theme).bgBlur(),
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    width: `100%`,
    ...(isCollapse && {
      width: `calc(100% - ${DASHBOARD_NAVBAR_COLLAPSE_WIDTH}px)`,
    }),
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: DASHBOARD_HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 5),
    minHeight: DASHBOARD_HEADER_DESKTOP,
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardHeader({ onOpenSidebar, withoutStack = false }) {
  const { isCollapse } = useCollapseDrawer();
  let { pathname } = useRouter();

  return (
    <RootStyle isCollapse={isCollapse}>
      <ToolbarStyle>
        <Box sx={{ display: 'flex' }}>
          <Logo />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {!withoutStack && (
          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
            {['/dashboard/one', '/dashboard/recordings'].includes(pathname) ? <Searchbar /> : null}

            <Link href="/help" passHref={true}>
              <IconButtonAnimate onClick={onOpenSidebar} sx={{ color: 'text.primary' }}>
                <Iconify icon="carbon:help" />
              </IconButtonAnimate>
            </Link>

            <Divider orientation="vertical" variant="middle" flexItem />

            <AccountPopover>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <span style={{ color: 'black' }}>Janmejay</span>
              </Box>
            </AccountPopover>
          </Stack>
        )}
      </ToolbarStyle>
    </RootStyle>
  );
}
