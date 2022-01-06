/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Grid,
  List,
  Stack,
  Popover,
  ListItem,
  ListSubheader,
  MenuItem,
  CardActionArea,
} from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import MenuPopover from './../../components/MenuPopover';
import InstantMeetingPopup from '../../sections/meeting/InstantMeetingPopup';
// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(5),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    opacity: 0.48,
    textDecoration: 'none',
  },
}));

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  marginTop: theme.spacing(3),
  color: theme.palette.text.secondary,
  transition: theme.transitions.create('color'),
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

// ----------------------------------------------------------------------

MenuDesktop.propTypes = {
  isHome: PropTypes.bool,
  isOffset: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function MenuDesktop({ isOffset, isHome, navConfig, id }) {
  const { pathname, push } = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction="row">
      {navConfig.map((link) =>
        (id && link.isAuth) || !link.isAuth ? (
          <MenuDesktopItem
            key={link.title}
            item={link}
            isOpen={open}
            push={push}
            onOpen={handleOpen}
            onClose={handleClose}
            isOffset={isOffset}
            isHome={isHome}
          />
        ) : null
      )}
    </Stack>
  );
}

// ----------------------------------------------------------------------

IconBullet.propTypes = {
  type: PropTypes.oneOf(['item', 'subheader']),
};

function IconBullet({ type = 'item' }) {
  return (
    <Box sx={{ width: 24, height: 16, display: 'flex', alignItems: 'center' }}>
      <Box
        component="span"
        sx={{
          ml: '2px',
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'currentColor',
          ...(type !== 'item' && { ml: 0, width: 8, height: 2, borderRadius: 2 }),
        }}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

MenuDesktopItem.propTypes = {
  isHome: PropTypes.bool,
  isOffset: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  item: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.array,
  }),
};

function MenuDesktopItem({ item, isHome, isOpen, isOffset, onOpen, onClose, push }) {
  const { title, path, children } = item;
  const anchorRef = useRef(null);
  if (children) {
    return (
      <>
        <LinkStyle
          ref={anchorRef}
          onClick={onOpen}
          sx={{
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            ...(isHome && { color: 'common.white' }),
            ...(isOffset && { color: 'text.primary' }),
            ...(isOpen && { opacity: 0.48 }),
          }}
        >
          {title}
          <Iconify
            icon={isOpen ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            sx={{ ml: 0.5, width: 16, height: 16 }}
          />
        </LinkStyle>

        <MenuPopover open={isOpen} anchorEl={anchorRef.current} sx={{ width: 220, pt: 2, pd: 2 }} onClose={onClose} id={"meetingPopover"} key={"meetingPopover"}>
          <Stack spacing={{ xs: 2 }} sx={{ p: 2 }}>
            <InstantMeetingPopup>
              <MenuItem>Instant meeting</MenuItem>
            </InstantMeetingPopup>
            <MenuItem>Scheduled meeting</MenuItem>
          </Stack>
        </MenuPopover>
      </>
    );
  }

  return (
    <LinkStyle
      to={path}
      end={path === '/'}
      onClick={() => push(item.path)}
      style={{ cursor: 'pointer' }}
      sx={{
        ...(isHome && { color: 'common.white' }),
        ...(isOffset && { color: 'text.primary' }),
        '&.active': {
          color: 'primary.main',
        },
      }}
    >
      {title}
    </LinkStyle>
  );
}
