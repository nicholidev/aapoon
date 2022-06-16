/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import Link from 'next/link';
import {
  Button,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Box,
  Divider,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material';
// layouts
// hooks
import { useEffect, useRef } from 'react';
// components
import { getStats } from '../../api/meeting';
import { startOfWeek, endOfWeek } from 'date-fns';
// ----------------------------------------------------------------------
import Iconify from '../../components/Iconify';
import { useRouter } from 'next/router';

import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import RenewPlanPrompt from '../../components/plan/RenewPlanPrompt';
import MenuPopover from '../MenuPopover';
import InstantMeetingPopup from '../../sections/meeting/InstantMeetingPopup';

const Sidebar = styled('header')(({ theme }) => ({
  width: '320px',
  height: '100%',
  padding: theme.spacing(1),
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const SideSection = styled(Card)(({ theme }) => ({
  padding: '16px 0',
  width: '100%',
  borderRadius: '9px',
  marginTop: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
}));

export default function DashboardSidebar(props) {
  const [stats, setStats] = useState({});

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { currentPage } = props;
  const { user } = useAuth();
  const { push } = useRouter();
  const [dateValue, setDateValue] = useState(new Date());
  useEffect(() => {
    if (user.id)
      getStats(startOfWeek(new Date()), endOfWeek(new Date()), new Date(), user.id).then((data) => setStats(data));
  }, [user.id]);

  const dateChangeHandler = (newValue) => {
    setDateValue(newValue);
    console.log(newValue)
  }


  return (
    <Sidebar>
      <SideSection>
        <List sx={{ width: '100%' }}>
          <ListItem style={{ justifyContent: 'center' }}>
            <Button ref={anchorRef} variant="contained" size="large" onClick={handleOpen}>
              Creating Meeting
            </Button>
            <MenuPopover
              open={open}
              anchorEl={anchorRef.current}
              sx={{ width: 220, pt: 1, pd: 1 }}
              onClose={handleClose}
              id={'meetingPopover2'}
              key={'meetingPopover2'}
            >
              <Stack spacing={{ xs: 1 }} sx={{ p: 1 }}>
                <InstantMeetingPopup noButton>
                  <MenuItem>Instant meeting</MenuItem>
                </InstantMeetingPopup>
                <Divider />
                <MenuItem onClick={() => push('/dashboard/schedule-meeting')}>Schedule meeting</MenuItem>
                <br />
              </Stack>
            </MenuPopover>
          </ListItem>
          <Link href="/dashboard/one" passHref={true}>
            <ListItem>
              <ListItemButton selected={currentPage == 'dashboard'}>
                <ListItemIcon>
                  <Iconify icon={'lucide:layout-dashboard'} width={24} height={24} color="inherit" />
                </ListItemIcon>
                <ListItemText primary={<h4>Dashboard</h4>} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/dashboard/calendar" passHref={true}>
            <ListItem>
              <ListItemButton selected={currentPage == 'calendar'}>
                <ListItemIcon>
                  <Iconify icon={'uil:calender'} width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary={<h4>Calendar</h4>} />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link href="/dashboard/recordings" passHref={true}>
            <ListItem>
              <ListItemButton selected={currentPage == 'recordings'}>
                <ListItemIcon sx={{ pl: '3px' }}>
                  <Iconify icon={'lucide:play-circle'} width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary={<h4>Recordings</h4>} />
              </ListItemButton>
            </ListItem>
          </Link>
          <br />
          <Divider />
          <Box marginTop="16px" width="100%" display="flex" justifyContent={'center'}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={dateValue}
                onChange={dateChangeHandler}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Box position="relative" height="160px">
            <Box position="absolute" top={-50}>
              <Divider style={{ marginBottom: '8px' }} />
              <ListItem>
                <RenewPlanPrompt />
              </ListItem>
            </Box>
          </Box>
        </List>
      </SideSection>
    </Sidebar>
  );
}
