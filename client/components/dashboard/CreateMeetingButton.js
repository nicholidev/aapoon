/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */

 import {
   Button,
   Box,
   Divider,
   MenuItem,
   Stack,
 } from '@mui/material';
 // hooks
 import { useEffect, useRef } from 'react';
 import useSettings from '../../hooks/useSettings';
 // components
 import { getStats } from '../../api/meeting';
 import { startOfWeek, endOfWeek } from 'date-fns';
 // ----------------------------------------------------------------------
 import { useRouter } from 'next/router';
 import { useState } from 'react';
 import useAuth from '../../hooks/useAuth';
 import MenuPopover from '../MenuPopover';
 import InstantMeetingPopup from '../../sections/meeting/InstantMeetingPopup';

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

   const { user } = useAuth();
   const { push } = useRouter();
   useEffect(() => {
     if (user.id)
       getStats(startOfWeek(new Date()), endOfWeek(new Date()), new Date(), user.id).then((data) => setStats(data));
   }, [user.id]);
   return (
     <Box sx={{mb:4, display:{md:"none"}}}>
      <Button ref={anchorRef} variant="contained" style={{width: '100%'}} size="large" onClick={handleOpen}>
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
    </Box>
   );
 }
 