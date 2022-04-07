/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
 import Link from 'next/link';
 import {
   Button,
   Card,
   Container,
   Grid,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   styled,
   Box,
   Typography,
   Divider,
   TextField,
   MenuItem,
   Stack,
 } from '@mui/material';
 // layouts
 import DashboardLayout from '../../layouts/dashboard';
 // hooks
 import { useEffect, useRef } from 'react';
 import useSettings from '../../hooks/useSettings';
 // components
 import { getStats } from '../../api/meeting';
 import { startOfWeek, endOfWeek } from 'date-fns';
 import Page from '../../components/Page';
 import GlobalStyles from '@mui/material/GlobalStyles';
 // ----------------------------------------------------------------------
 import withAuth from '../../HOC/withAuth';
 import Iconify from '../../components/Iconify';
 import PersonIcon from '@mui/icons-material/Person';
 import { useRouter } from 'next/router';
 import CheckCircleIcon from '@mui/icons-material/CheckCircle';
 import StarIcon from '@mui/icons-material/Star';
 
 import StopCircleIcon from '@mui/icons-material/StopCircle';
 import AppNewInvoice from '../../sections/@dashboard/general/app/AppNewInvoice';
 import InviteData from '../../components/invite/Invite2';
 import LicenceData from '../../components/licence';
 import InviteModal from '../../components/invite/InviteModal';
 import { useState } from 'react';
 import useAuth from '../../hooks/useAuth';
 import BottomNavigation from '../../components/BottomNavigation';
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
 
 const Content = styled('div')(({ theme }) => ({
   width: 'calc(100% - 320px)',
   height: '100%',
 
   paddingTop: theme.spacing(6),
   // marginTop: theme.spacing(2),
   [theme.breakpoints.down('md')]: {
     width: '100%',
     marginTop: theme.spacing(2),
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
 
 const InfoCard = styled('div')(({ theme }) => ({
   height: 130,
   width: 'auto',
   // maxWidth: '300px',
   paddingTop: 16,
   position: 'relative',
   borderRadius: '9px',
   boxShadow: '0px 4px 4px rgba(211, 211, 211, 0.25)',
   margin: 'auto',
   [theme.breakpoints.down('lg')]: {
     marginBottom: theme.spacing(4),
   },
   [theme.breakpoints.down('sm')]: {
     width: '100%',
   },
 }));
 
 const InfoContainer = styled(Grid)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   paddingLeft: theme.spacing(2),
   paddingRight: theme.spacing(2),
   [theme.breakpoints.down('lg')]: {
     justifyContent: 'center',
     paddingLeft: theme.spacing(2),
     paddingRight: theme.spacing(2),
   },
 }));
 
 const DataSection = styled('div')(({ theme }) => ({
   margin: theme.spacing(3, 2, 2),
   backgroundColor: '#fff',
   borderRadius: '10px',
   boxShadow: '0px 4px 4px rgba(211, 211, 211, 0.25)',
   [theme.breakpoints.down('md')]: {
     marginLeft: 0,
     marginRight: 0,
   },
 }));
 
 const DataHead = styled('div')(({ theme }) => ({
   display: 'flex',
   width: '100%',
   padding: theme.spacing(4),
   justifyContent: 'space-between',
   [theme.breakpoints.down('md')]: {
     padding: theme.spacing(2),
   },
 }));
 
 const InfoHeading = styled('div')(({ theme }) => ({
   display: 'flex',
   padding: theme.spacing(0, 2),
 }));
 
 const InfoNumbers = styled('div')(({ theme }) => ({
   textAlign: 'center',
   display: 'flex',
   padding: '10px 0 0 20px',
   alignItems: 'center',
   height: '60%',
 }));
 
 const infoIconStyle = {
   position: 'absolute',
   bottom: 12,
   right: 12,
 };
 
 export default function DashboardSidebar(props) {
   const { themeStretch } = useSettings();
   const [inviteOpen, setInviteOpen] = useState(false);
   const [fetch, setFetch] = useState(false);
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
   return (
     <Box sx={{mb:4, display:{md:"none"}}}>
        
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
             </Box>
      
   );
 }
 