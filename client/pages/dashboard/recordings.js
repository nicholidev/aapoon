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
  Typography,
} from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import GlobalStyles from '@mui/material/GlobalStyles';
import { startOfWeek, endOfWeek } from 'date-fns';
// ----------------------------------------------------------------------
import withAuth from '../../HOC/withAuth';
import Iconify from '../../components/Iconify';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import AppNewInvoice from '../../sections/@dashboard/general/app/AppNewInvoice';
import InviteData from '../../components/invite/InviteData';
import InviteModal from '../../components/invite/InviteModal';
import { useState, useEffect } from 'react';
import { getStats } from '../../api/meeting';
import RecordingData from '../../components/recording/RecordingData';
import useAuth from '../../hooks/useAuth';
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
  padding: theme.spacing(1),
  paddingTop: theme.spacing(4),
  paddingLeft: theme.spacing(2),
  marginTop: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    width: '100%',
    paddingLeft: 0,
    marginTop: theme.spacing(2),
  },
}));

const SideSection = styled(Card)(({ theme }) => ({
  paddingTop: 16,
  paddingBottom: 16,
  width: '100%',
  marginTop: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
}));

const InfoCard = styled(Card)(({ theme }) => ({
  height: 114,
  width: 259,
  maxWidth: '100%',
  paddingTop: 16,
  position: 'relative',
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
  paddingLeft: theme.spacing(8),
  paddingRight: theme.spacing(8),
  justifyContent: 'space-between',
  [theme.breakpoints.down('lg')]: {
    justifyContent: 'center',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const DataSection = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  margin: theme.spacing(6),
  height: 600,
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    marginRight: 0,
  },
}));

const DataHead = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const InfoHeading = styled('span')(({ theme }) => ({
  fontSize: 14,
  padding: theme.spacing(2),
}));

const InfoNumbers = styled('div')(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '60%',
}));

const infoIconStyle = {
  position: 'absolute',
  bottom: 12,
  right: 12,
};

function RecordingsPage() {
  const { themeStretch } = useSettings();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [current, setCurrent] = useState('dashboard');
  const [stats, setStats] = useState({});
  const { user } = useAuth();
  useEffect(() => {
    if (user.id)
      getStats(startOfWeek(new Date()), endOfWeek(new Date()), new Date(), user.id).then((data) => setStats(data));
  }, [user?.activeLicenses?.count]);
  return (
    <Page title="Dashboard">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex' }}>
        <Sidebar>
          <SideSection>
            <List sx={{ width: '100%' }}>
              <Link href="/dashboard/one" passHref={true}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Iconify icon={'lucide:layout-dashboard'} width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary={<h4>Dashboard</h4>} />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="/dashboard/calendar" passHref={true}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Iconify icon={'uil:calender'} width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary={<h4>Calendar</h4>} />
                  </ListItemButton>
                </ListItem>
              </Link>
              <ListItem disablePadding selected={true}>
                <ListItemButton>
                  <ListItemIcon sx={{ pl: '3px' }}>
                    <Iconify icon={'ant-design:video-camera-add-outlined'} width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText primary={<h4>Recordings</h4>} />
                </ListItemButton>
              </ListItem>
            </List>
          </SideSection>
          {/* <SideSection /> */}
        </Sidebar>
        <Content>
          {user?.activeLicenses?.count > 1 ? (
            <InfoContainer container spacing={3}>
              <Grid xs={12} sm={6} lg={4}>
                <InfoCard>
                  <InfoHeading>Total number of Licenses</InfoHeading>
                  <InfoNumbers>
                    <h3>{user?.activeLicenses?.count || 0}</h3>
                  </InfoNumbers>
                  <PersonIcon style={infoIconStyle} />
                </InfoCard>
              </Grid>
              <Grid xs={12} sm={6} lg={4}>
                <InfoCard>
                  <InfoHeading>Assigned Licenses</InfoHeading>
                  <InfoNumbers>
                    <h3>{user?.activeLicenses?.assigned || 0}</h3>
                  </InfoNumbers>
                  <CheckCircleIcon style={infoIconStyle} />
                </InfoCard>
              </Grid>
              <Grid xs={12} sm={6} lg={4}>
                <InfoCard>
                  <InfoHeading>Remaining Licenses</InfoHeading>
                  <InfoNumbers>
                    <h3>
                      {' '}
                      {user.activeLicenses.count ? user.activeLicenses.count - (user.activeLicenses.assigned + 1) : 0}
                    </h3>
                  </InfoNumbers>
                  <StopCircleIcon style={infoIconStyle} />
                </InfoCard>
              </Grid>
            </InfoContainer>
          ) : (
            <InfoContainer container spacing={4}>
              <Grid xs={12} sm={6} lg={4}>
                <InfoCard>
                  <InfoHeading>Total meetings this week</InfoHeading>
                  <InfoNumbers>
                    <h3>{stats.curr ? stats.curr : 0}</h3>
                  </InfoNumbers>
                  <PersonIcon style={infoIconStyle} />
                </InfoCard>
              </Grid>
              <Grid xs={12} sm={6} lg={4}>
                <InfoCard>
                  <InfoHeading>Upcoming Meetings this week</InfoHeading>
                  <InfoNumbers>
                    <h3>{stats.up ? stats.up : 0}</h3>
                  </InfoNumbers>
                  <CheckCircleIcon style={infoIconStyle} />
                </InfoCard>
              </Grid>
              <Grid xs={12} sm={6} lg={4}>
                <InfoCard>
                  <InfoHeading>Meetings attended this week</InfoHeading>
                  <InfoNumbers>
                    <h3>0</h3>
                  </InfoNumbers>
                  <StarIcon style={infoIconStyle} />
                </InfoCard>
              </Grid>
            </InfoContainer>
          )}
          <DataSection>
            <DataHead>
              <h4 style={{ display: 'inline' }}>Recordings</h4>
            </DataHead>
            <RecordingData fetch={fetch} />
          </DataSection>
        </Content>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
let Recordings = withAuth(RecordingsPage);

Recordings.getLayout = function getLayout(page) {
  return <DashboardLayout withBottomNav>{page}</DashboardLayout>;
};

export default Recordings;
