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
  Avatar,
  Box,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Stack,
  styled,
  Typography,
  Divider,
  ButtonBase,
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
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const Content = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(4),
  [theme.breakpoints.down('lg')]: {
    width: '100vw',
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
  [theme.breakpoints.down('lg')]: {
    width: '100%',
  },
}));

const AvatarContainer = styled(Card)(({ theme }) => ({
  width: 130,
  height: 130,
  padding: '2px',
  borderRadius: '130px',
  boxShadow: '0px 0px 9px rgba(0, 0, 0, 0.25)',
  [theme.breakpoints.down('sm')]: {
    width: 100,
    height: 100,
  },
}));

const AdminAvatar = styled(Card)(({ theme }) => ({
  width: 50,
  height: 50,
  padding: '2px',
  borderRadius: '50px',
  boxShadow: '0px 0px 9px rgba(0, 0, 0, 0.25)',
}));

const AdminCard = styled(Card)(({ theme }) => ({
  padding: '2px',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
}));

const DataSection = styled(Card)(({ theme }) => ({
  minHeight: 600,
  [theme.breakpoints.down('lg')]: {
    marginLeft: 0,
    marginRight: theme.spacing(4),
  },
}));

const DataHead = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: '#FAFAFA',
  padding: theme.spacing(1),
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(3),
  },
}));

const InfoHeading = styled('span')(({ theme }) => ({
  fontSize: 14,
  padding: theme.spacing(2),
}));

const AvatarDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
}));

const infoIconStyle = {
  position: 'absolute',
  bottom: 12,
  right: 12,
};

function ProfilePage() {
  const { themeStretch } = useSettings();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [current, setCurrent] = useState('dashboard');
  return (
    <Page title="Dashboard">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex' }}>
        <Content>
          <DataSection>
            <DataHead>
              <Box display="flex" justifyContent="flex-end" padding="0 10px">
                <Box>
                  <Link href="/auth/business-profile" passHref={true}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Iconify icon={'feather:edit'} width="20px" height="20px" />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="subtitle2" color="primary.main">
                          Edit
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </Link>
                </Box>
              </Box>
              <Grid container spacing={3} justifyContent={'space-around'}>
                <Grid item xs={12} sm={4} lg={2}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <AvatarContainer>
                      <Avatar
                        src="http://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder-300x300.png"
                        alt="Rayan Moran"
                        sx={{ width: '100%', height: '100%' }}
                      />
                    </AvatarContainer>
                  </div>
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography
                      variant="caption"
                      color="common.white"
                      sx={{ backgroundColor: 'error.main', borderRadius: '4px', padding: '2px 10px' }}
                    >
                      BUSINESS
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} sm={7} lg={3}>
                  <Stack spacing={3}>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Business Name
                      </Typography>
                      <Typography variant="h6">Qwerty Inc.</Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Business Website
                      </Typography>
                      <Typography variant="h6">www.qwerty.com</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4} lg={2}>
                  <Stack spacing={3}>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Address
                      </Typography>
                      <Typography variant="h6">Manhattan, USA</Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        State
                      </Typography>
                      <Typography variant="h6">New York</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={3} lg={3}>
                  <Stack spacing={3}>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Pin Code / Zip Code
                      </Typography>
                      <Typography variant="h6">302012</Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Team Size
                      </Typography>
                      <Typography variant="h6">25</Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                sx={{ marginTop: { lg: -2, xs: 0 }, padding: { lg: '0 20px', xs: 0 } }}
              >
                <Box>
                  <Typography variant="subtitle2" color="GrayText">
                    Admin
                  </Typography>
                  <AdminCard>
                    <ListItem>
                      <ListItemIcon>
                        <AdminAvatar>
                          <Avatar
                            src="http://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder-300x300.png"
                            alt="Rayan Moran"
                            sx={{ width: '100%', height: '100%' }}
                          />
                        </AdminAvatar>
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="h6" color="initial">
                          Henry Cavil
                        </Typography>
                        <Link href={'/user/profile'} passHref={true}>
                          <ButtonBase sx={{ marginLeft: '50px' }}>
                            <Typography variant="subtitle2" color="primary.main">
                              View Profile
                            </Typography>
                          </ButtonBase>
                        </Link>
                      </ListItemText>
                    </ListItem>
                  </AdminCard>
                </Box>
              </Box>
            </DataHead>
            <InviteData fetch={fetch} />
          </DataSection>
        </Content>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
let Profile = withAuth(ProfilePage);

Profile.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Profile;
