/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import {
  Button,
  Card,
  Container,
  Grid,
  styled,
  Box,
  Typography,
} from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// hooks
import { useEffect } from 'react';
import useSettings from '../../hooks/useSettings';
// components
import { getStats } from '../../api/meeting';
import { startOfWeek, endOfWeek } from 'date-fns';
import Page from '../../components/Page';
import GlobalStyles from '@mui/material/GlobalStyles';
// ----------------------------------------------------------------------
import withAuth from '../../HOC/withAuth';
import Iconify from '../../components/Iconify';
import { useRouter } from 'next/router';
import InviteData from '../../components/invite/Invite2';
import LicenceData from '../../components/licence';
import InviteModal from '../../components/invite/InviteModal';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardInfoHeader from '../../components/dashboard/DashboardInfoHeader';
import CreateMeetingButton from "../../components/dashboard/CreateMeetingButton"
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

function PageOne() {
  const { themeStretch } = useSettings();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [stats, setStats] = useState({});
  const { user } = useAuth();
  const { push } = useRouter();
  useEffect(() => {
    if (user.id) {
      getStats(
        startOfWeek(new Date()),
        endOfWeek(new Date()),
        new Date(),
        user.id
      ).then((data) => setStats(data));
    }
  }, [user.id]);

  return (
    <Page title="Dashboard" sx={{pb:2}}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex' }}>
        <DashboardSidebar currentPage="dashboard" />
        <Content>
          <center>
            <CreateMeetingButton/>
          </center>
          <DashboardInfoHeader />
          {user?.activeLicenses?.count > 1 ? (
            <DataSection>
              <DataHead>
                <div>
                  <Typography variant="h5">License assigned</Typography>
                  <Typography variant="subtitle2">Expire in {Math.ceil((user.subscription?.[0]?.current_period_end?.seconds || 0 ) / (1000 * 3600 * 24))} days</Typography>
                </div>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => push('/dashboard/assign-license')}
                  startIcon={<Iconify icon={'eva:person-add-outline'} width={20} height={20} />}
                >
                  {' '}
                  Assign license
                </Button>
              </DataHead>
              <Box sx={{ p: {xs:2,md:4},pb:{xs:6,md:1}, pt: 0 ,maxWidth:"90vw"}}>
                <LicenceData fetch={fetch} />
              </Box>
              <InviteModal
                open={inviteOpen} 
                handleClose={() => {
                  setInviteOpen(false);
                  setFetch(!fetch);
                }}
              />
            </DataSection>
          ) : (
            <DataSection>
              <DataHead>
                <Typography variant="h5" style={{ display: 'inline' }}>
                  Recent Invites
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setInviteOpen(true)}
                  startIcon={<Iconify icon={'eva:person-add-outline'} width={20} height={20} />}
                >
                  {' '}
                  Invite User
                </Button>
              </DataHead>
              <Box sx={{ p: {xs:2,md:4},pb:{xs:6,md:1}, pt: 0 ,maxWidth:"90vw"}}>
                <InviteData fetch={fetch} />
              </Box>
              <InviteModal
                open={inviteOpen}
                handleClose={() => {
                  setInviteOpen(false);
                  setFetch(!fetch);
                }}
              />
            </DataSection>
          )}
        </Content>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
let NewAuth = withAuth(PageOne);

NewAuth.getLayout = function getLayout(page) {
  return <DashboardLayout withBottomNav>{page}</DashboardLayout>;
};

export default NewAuth;
