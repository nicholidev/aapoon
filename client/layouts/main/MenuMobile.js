/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, List, Link, Drawer, Collapse, ListItemText, ListItemIcon, ListItemButton, Button } from '@mui/material';
// config
import { DASHBOARD_NAVBAR_ROOT_ITEM_HEIGHT } from '../../config';
// components
import Logo from '../../components/Logo';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/nav-section';
import { IconButtonAnimate } from '../../components/animate';
import useAuth from '../../hooks/useAuth';
// ----------------------------------------------------------------------
import InstantMeetingPopup from '../../sections/meeting/InstantMeetingPopup';
const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: DASHBOARD_NAVBAR_ROOT_ITEM_HEIGHT,
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

MenuMobile.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function MenuMobile({ isOffset, isHome, navConfig, id }) {
  const { pathname, push } = useRouter();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();
  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const pushItem = (link) => {
    handleDrawerClose();
    push(link);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isHome && { color: 'common.white' }),
          ...(isOffset && { color: 'text.primary' }),
        }}
      >
        <Iconify icon={'eva:menu-2-fill'} />
      </IconButtonAnimate>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List disablePadding>
            {navConfig.map((link) =>
              (id && link.isAuth) || !link.isAuth ? (
                <MenuMobileItem
                  key={link.title}
                  item={link}
                  handleDrawerClose={handleDrawerClose}
                  id={id}
                  isOpen={open}
                  onOpen={() => (link.children ? handleOpen() : pushItem(link.path))}
                />
              ) : null
            )}
          </List>
          {user?.id ? (
            <Box sx={{ m: 4 }}>
              <Button fullWidth rel="noopener" variant="outlined" sx={{ mb: 2 }} onClick={() => logout()}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ m: 4 }}>
              <Button fullWidth rel="noopener" variant="outlined" sx={{ mb: 2 }} onClick={() => push('/auth/Login')}>
                Sign in
              </Button>
              <Button fullWidth variant="contained" onClick={() => push('/auth/Register')}>
                Sign up, It’s free
              </Button>
            </Box>
          )}
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

MenuMobileItem.propTypes = {
  isOpen: PropTypes.bool,
  item: PropTypes.shape({
    children: PropTypes.array,
    icon: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
  onOpen: PropTypes.func,
};

function MenuMobileItem({ item, isOpen, onOpen, id, handleDrawerClose }) {
  const { title, path, icon, children } = item;
  const { pathname } = useRouter();

  if (children) {
    return (
      <>
        <ListItemStyle onClick={onOpen}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          <Iconify
            icon={isOpen ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box style={{ background: '#fafafa', paddingLeft: 32 }}>
            <ListItemStyle href={id ? '/dashboard/schedule-meeting' : '/auth/Login'} component={Link}>
              <ListItemText disableTypography primary={'schedule meeting'} />
            </ListItemStyle>
            {id ? (
              <InstantMeetingPopup>
                <ListItemStyle component={Button}>
                  <ListItemText disableTypography primary={'instant meeting'} />
                </ListItemStyle>
              </InstantMeetingPopup>
            ) : (
              <ListItemStyle href={'/auth/Login'} component={Link}>
                <ListItemText disableTypography primary={'instant meeting'} />
              </ListItemStyle>
            )}
          </Box>
        </Collapse>
      </>
    );
  }

  if (title === 'Documentation') {
    return (
      <ListItemStyle href={path} target="_blank" rel="noopener" component={Link}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    );
  }

  return (
    <ListItemStyle
      onClick={onOpen}
      to={path}
      component={RouterLink}
      end={path === '/'}
      className={pathname == path ? 'active' : ''}
      sx={{
        '&.active': {
          color: 'primary.main',
          fontWeight: 'fontWeightMedium',
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText disableTypography primary={title} />
    </ListItemStyle>
  );
}
