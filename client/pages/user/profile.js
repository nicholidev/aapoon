/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import Link from 'next/link';
import {
  Button,
  Box,
  Card,
  Container,
  Grid,
  Avatar,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Stack,
  styled,
  Typography,
  Divider,
} from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// hooks
import useSettings from '../../hooks/useSettings';
import useAuth from '../../hooks/useAuth';
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
import UpdateUserProfile from '../../sections/user/UpdateUserProfile';

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

const DataSection = styled(Card)(({ theme }) => ({
  minHeight: 600,
  [theme.breakpoints.down('lg')]: {
    marginLeft: 0,
    marginRight: 0,
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
  const { user } = useAuth();

  return (
    <Page title="Dashboard" sx={{ width: '100vw' }}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ justifyContent: 'center' }}>
        <Content>
          <DataSection>
            <DataHead>
              <Box display="flex" justifyContent="flex-end" padding="0 10px">
                <Box>
                  <UpdateUserProfile>
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
                  </UpdateUserProfile>
                </Box>
              </Box>
              <Grid container spacing={3} justifyContent={'center'}>
                <Grid item xs={12} sm={4} lg={2}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <AvatarContainer>
                      <Avatar
                        src={
                          user.profilePic
                            ? user.profilePic
                            : 'http://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder-300x300.png'
                        }
                        alt={user?.displayName}
                        sx={{ width: '100%', height: '100%' }}
                      />
                    </AvatarContainer>
                  </div>
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography
                      variant="caption"
                      color="common.white"
                      sx={{ backgroundColor: 'error.main', borderRadius: '50px', padding: '2px 10px' }}
                    >
                      {user.accountType}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} sm={7} lg={3}>
                  <Stack spacing={3}>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Name
                      </Typography>
                      <Typography sx={{ textTransform: 'capitalize' }} variant="h6">
                        {user?.displayName}
                      </Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Email
                      </Typography>
                      <Typography variant="h6">{user.email}</Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Phone
                      </Typography>
                      <Typography variant="h6">{user.phoneNumber}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4} lg={2}>
                  <Stack spacing={3}>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Subscription Type
                      </Typography>
                      <Typography variant="h6">Free</Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Purchase Date
                      </Typography>
                      <Typography variant="h6">May 26, 2019</Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Expiration Date
                      </Typography>
                      <Typography variant="h6">May 26, 2020</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={3} lg={2}>
                  <Stack spacing={3}>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        No. Of Licenses
                      </Typography>
                      <Typography variant="h6">1</Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Assigned Licenses
                      </Typography>
                      <Typography variant="h6">NA</Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Unassigned Licenses
                      </Typography>
                      <Typography variant="h6">NA</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Stack direction="row" display={{ xs: 'none', lg: 'flex' }}>
                  <Divider orientation="vertical" variant="middle" flexItem />
                </Stack>
                <Grid item xs={12} sm={4} lg={2}>
                  <Stack spacing={5}>
                    <Stack spacing={0}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText
                            secondary={
                              <Typography variant="subtitle1" color="GrayText">
                                Delete
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" color="GrayText">
                                Change plan
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" color="success.main">
                                Renew
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                    </Stack>

                    {/* <Stack spacing={0}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Iconify icon={'eva:email-outline'} width={24} height={24} color="GrayText" />
                          </ListItemIcon>
                          <ListItemText
                            secondary={
                              <Typography variant="subtitle1" color="GrayText">
                                Send an email
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                    </Stack> */}
                  </Stack>
                </Grid>
              </Grid>
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