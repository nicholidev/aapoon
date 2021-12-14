import { useState, useRef } from 'react';
import { capitalCase } from 'change-case';
// @mui
import {
  Box,
  List,
  Select,
  Divider,
  Popover,
  Tooltip,
  ListItem,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import Iconify from '../../../components/Iconify';
import MyAvatar from '../../../components/MyAvatar';
import BadgeStatus from '../../../components/BadgeStatus';

// ----------------------------------------------------------------------

const STATUS = ['online', 'invisible', 'away'];

export default function ChatAccount() {
  const { user } = useAuth();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('online');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box ref={anchorRef} sx={{ position: 'relative' }}>
        <MyAvatar onClick={handleOpen} sx={{ cursor: 'pointer', width: 48, height: 48 }} />
        <BadgeStatus status={status} sx={{ position: 'absolute', bottom: 2, right: 2 }} />
      </Box>

      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Box sx={{ py: 2, pr: 1, pl: 2.5, display: 'flex', alignItems: 'center' }}>
          <MyAvatar />

          <Box sx={{ ml: 2, mr: 3 }}>
            <Typography noWrap variant="subtitle1">
              {user?.displayName}
            </Typography>
            <Typography noWrap variant="body2" sx={{ color: 'text.secondary' }}>
              {user?.email}
            </Typography>
          </Box>

          <Tooltip title="Log out">
            <IconButton>
              <Iconify icon="ic:round-power-settings-new" width={20} height={20} />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider />

        <List>
          <ListItem sx={{ px: 2.5 }}>
            <ListItemIcon>
              <BadgeStatus size="large" status={status} sx={{ m: 0.5 }} />
            </ListItemIcon>
            <ListItemText>
              <Select
                native
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                sx={{
                  '& svg': { display: `none` },
                  '& select': { p: 0, typography: 'body2' },
                  '& fieldset': { display: 'none' },
                }}
              >
                {STATUS.map((option) => (
                  <option key={option} value={option}>
                    {capitalCase(option)}
                  </option>
                ))}
              </Select>
            </ListItemText>
          </ListItem>

          <ListItemButton sx={{ px: 2.5 }}>
            <ListItemIcon>
              <Iconify icon="ic:round-account-box" width={20} height={20} />
            </ListItemIcon>
            <ListItemText primary="Profile" primaryTypographyProps={{ variant: 'body2' }} />
          </ListItemButton>

          <ListItemButton sx={{ px: 2.5 }}>
            <ListItemIcon>
              <Iconify icon="eva:settings-2-fill" width={20} height={20} />
            </ListItemIcon>
            <ListItemText primary="Settings" primaryTypographyProps={{ variant: 'body2' }} />
          </ListItemButton>
        </List>
      </Popover>
    </>
  );
}
