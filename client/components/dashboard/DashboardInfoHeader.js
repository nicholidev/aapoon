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
} from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// hooks
import { useEffect } from 'react';
import useSettings from '../../hooks/useSettings';
// components
import { getStats } from '../../api/meeting';
import { startOfWeek, endOfWeek } from 'date-fns';
import Page from '../Page';
import GlobalStyles from '@mui/material/GlobalStyles';
// ----------------------------------------------------------------------
import withAuth from '../../HOC/withAuth';
import Iconify from '../Iconify';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

import StopCircleIcon from '@mui/icons-material/StopCircle';
import AppNewInvoice from '../../sections/@dashboard/general/app/AppNewInvoice';
import InviteData from '../invite/Invite2';
import LicenceData from '../licence';
import InviteModal from '../invite/InviteModal';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import BottomNavigation from '../BottomNavigation';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import RenewPlanPrompt from '../plan/RenewPlanPrompt';
import DashboardSidebar from './DashboardSidebar';

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

export default function DashboardInfoHeader() {
  const { themeStretch } = useSettings();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [stats, setStats] = useState({});
  const [current, setCurrent] = useState('dashboard');
  const { user } = useAuth();
  const { push } = useRouter();
  const [dateValue, setDateValue] = useState(new Date());
  useEffect(() => {
    if (user.id)
      getStats(startOfWeek(new Date()), endOfWeek(new Date()), new Date(), user.id).then((data) => setStats(data));
  }, [user.id]);
  return (
    <>
      {user?.activeLicenses?.count > 1 ? (
        // <InfoContainer container spacing={3}>
        //   <Grid xs={12} sm={6} lg={4}>
        //     <InfoCard>
        //       <InfoHeading>Total number of Licenses</InfoHeading>
        //       <InfoNumbers>
        //         <h3>{user?.activeLicenses?.count || 0}</h3>
        //       </InfoNumbers>
        //       <PersonIcon style={infoIconStyle} />
        //     </InfoCard>
        //   </Grid>
        //   <Grid xs={12} sm={6} lg={4}>
        //     <InfoCard>
        //       <InfoHeading>Assigned Licenses</InfoHeading>
        //       <InfoNumbers>
        //         <h3>{user?.activeLicenses?.assigned || 0}</h3>
        //       </InfoNumbers>
        //       <CheckCircleIcon style={infoIconStyle} />
        //     </InfoCard>
        //   </Grid>
        //   <Grid xs={12} sm={6} lg={4}>
        //     <InfoCard>
        //       <InfoHeading>Remaining Licenses</InfoHeading>
        //       <InfoNumbers>
        //         <h3>
        //           {' '}
        //           {user.activeLicenses.count ? user.activeLicenses.count - (user.activeLicenses.assigned + 1) : 0}
        //         </h3>
        //       </InfoNumbers>
        //       <StopCircleIcon style={infoIconStyle} />
        //     </InfoCard>
        //   </Grid>
        // </InfoContainer>
        <InfoContainer container spacing={4}>
          <Grid item xs={12} sm={6} lg={4}>
            <InfoCard sx={{ backgroundColor: '#F5F9FF' }}>
              <InfoHeading>
                <Iconify icon={'fluent:contact-card-20-filled'} width="28px" height="28px" color="secondary.main" />
                &nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle2" color="initial">
                  Total number of Licenses
                </Typography>
              </InfoHeading>
              <InfoNumbers>
                <Typography variant="body1" color="secondary" style={{ fontSize: '40px' }}>
                  {user?.activeLicenses?.count || 0}
                </Typography>
              </InfoNumbers>
            </InfoCard>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <InfoCard sx={{ backgroundColor: '#FFF7F5' }}>
              <InfoHeading>
                <Iconify icon={'fluent:contact-card-link-16-filled'} width="28px" height="28px" color="primary.main" />
                &nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle2" color="initial">
                  Assigned Licenses
                </Typography>
              </InfoHeading>
              <InfoNumbers>
                <Typography variant="body1" color="secondary" style={{ fontSize: '40px' }}>
                  {user?.activeLicenses?.assigned || 0}
                </Typography>
              </InfoNumbers>
            </InfoCard>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <InfoCard sx={{ backgroundColor: '#F6FFF5' }}>
              <InfoHeading>
                <Iconify icon={'ic:round-contact-mail'} width="24px" height="24px" color="success.main" />
                &nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle2" color="initial">
                  Remaining Licenses
                </Typography>
              </InfoHeading>
              <InfoNumbers>
                <Typography variant="body1" color="secondary" style={{ fontSize: '40px' }}>
                  {user.activeLicenses.count ? user.activeLicenses.count - (user.activeLicenses.assigned + 1) : 0}
                </Typography>
              </InfoNumbers>
            </InfoCard>
          </Grid>
        </InfoContainer>
      ) : (
        <InfoContainer container spacing={4}>
          <Grid item xs={12} sm={6} lg={4}>
            <InfoCard sx={{ backgroundColor: '#F5F9FF' }}>
              <InfoHeading>
                <Iconify icon={'ic:sharp-calendar-month'} width="24px" height="24px" color="secondary.main" />
                &nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle2" color="initial">
                  Meetings in this Week
                </Typography>
              </InfoHeading>
              <InfoNumbers>
                <Typography variant="body1" color="secondary" style={{ fontSize: '40px' }}>
                  {stats.curr ? stats.curr : 0}
                </Typography>
              </InfoNumbers>
            </InfoCard>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <InfoCard sx={{ backgroundColor: '#FFF7F5' }}>
              <InfoHeading>
                <Iconify icon={'ic:baseline-date-range'} width="24px" height="24px" color="primary.main" />
                &nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle2" color="initial">
                  Upcoming Meetings
                </Typography>
              </InfoHeading>
              <InfoNumbers>
                <Typography variant="body1" color="secondary" style={{ fontSize: '40px' }}>
                  {stats.up ? stats.up : 0}
                </Typography>
              </InfoNumbers>
            </InfoCard>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <InfoCard sx={{ backgroundColor: '#F6FFF5' }}>
              <InfoHeading>
                <Iconify icon={'bx:calendar-check'} width="24px" height="24px" color="success.main" />
                &nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle2" color="initial">
                  Meetings Attended
                </Typography>
              </InfoHeading>
              <InfoNumbers>
                <Typography variant="body1" color="secondary" style={{ fontSize: '40px' }}>
                {(stats.curr ? stats.curr : 0) - (stats.up ? stats.up : 0)}
                </Typography>
              </InfoNumbers>
            </InfoCard>
          </Grid>
        </InfoContainer>
      )}
    </>
  );
}
