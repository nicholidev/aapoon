/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
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
// ----------------------------------------------------------------------
import withAuth from '../../HOC/withAuth';
import Iconify from '../../components/Iconify';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import AppNewInvoice from '../../sections/@dashboard/general/app/AppNewInvoice';
import InviteData from '../../components/invite/InviteData';
import InviteModal from '../../components/invite/InviteModal';
import { useState } from 'react';

const Sidebar = styled('header')(({ theme }) => ({
  width: '240px',
  height: '100%',
  padding: theme.spacing(1),
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Content = styled('div')(({ theme }) => ({
  width: 'calc(100% - 240px)',
  height: '100%',
  padding: theme.spacing(1),
  paddingTop: theme.spacing(4),
  paddingLeft: theme.spacing(4),
  marginTop:theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    width: '100vw',
    paddingLeft: 0,
    marginTop:theme.spacing(2)
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
  maxWidth:"100%",
  paddingTop: 16,
  position: 'relative',
  margin:"auto",
  [theme.breakpoints.down('md')]: {
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
  [theme.breakpoints.down('md')]: {
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
    marginRight: theme.spacing(4),
  },
}));

const DataHead = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
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

function PageOne() {
  const { themeStretch } = useSettings();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [fetch,setFetch]=useState(false)

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
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Iconify icon={'eva:grid-outline'} width={20} height={20} />
                  </ListItemIcon>
                  <ListItemText primary={<h4>Dashboard</h4>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Iconify icon={'eva:calendar-outline'} width={20} height={20} />
                  </ListItemIcon>
                  <ListItemText primary={<h4>Calendar</h4>} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Iconify icon={'eva:recording-outline'} width={20} height={20} />
                  </ListItemIcon>
                  <ListItemText primary={<h4>Recordings</h4>} />
                </ListItemButton>
              </ListItem>
            </List>
          </SideSection>
          {/* <SideSection /> */}
        </Sidebar>
        <Content>
          <InfoContainer container spacing={4}>
            <Grid xs={12} sm={6} md={4}>
              <InfoCard>
                <InfoHeading>Total meetings this week</InfoHeading>
                <InfoNumbers>
                  <h3>34</h3>
                </InfoNumbers>
                <PersonIcon style={infoIconStyle} />
              </InfoCard>
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <InfoCard>
                <InfoHeading>Upcoming Meetings this week</InfoHeading>
                <InfoNumbers>
                  <h3>12</h3>
                </InfoNumbers>
                <CheckCircleIcon style={infoIconStyle} />
              </InfoCard>
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <InfoCard>
                <InfoHeading>Meetings attended this week</InfoHeading>
                <InfoNumbers>
                  <h3>10</h3>
                </InfoNumbers>
                <StarIcon style={infoIconStyle} />
              </InfoCard>
            </Grid>
          </InfoContainer>
          <DataSection>
            <DataHead>
              <h4 style={{ display: 'inline' }}>Recent Invites</h4>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setInviteOpen(true)}
                startIcon={<Iconify icon={'eva:person-add-outline'} width={20} height={20} />}
              >
                {' '}
                Invite User
              </Button>
            </DataHead>
            <InviteData fetch={fetch} />
            <InviteModal
              open={inviteOpen}
              handleClose={() => {
                setInviteOpen(false);
                setFetch(!fetch)
              }}
            />
            {/* <AppNewInvoice/> */}
          </DataSection>
        </Content>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
let NewAuth = withAuth(PageOne);

NewAuth.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default NewAuth;
