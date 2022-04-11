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
  IconButton,
  styled,
  Typography,
  Divider,
  ButtonBase,
} from '@mui/material';
import { useRouter } from 'next/router';
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
import { useState } from 'react';
import UserData from '../../components/organisation/UserData';
import useAuth from '../../hooks/useAuth';
import InviteData from '../../components/invite/InviteData';
import LicenceData from '../../components/licence';
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
    marginRight: 0,
  },
}));

const DataHead = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: '#FAFAFA',
  padding: theme.spacing(1),
  paddingTop: theme.spacing(4),
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

  const { back } = useRouter();
  return (
    <Page title="Dashboard" sx={{ width: '100vw' }}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ display: 'flex' }}>
        <Content>
          <DataSection>
            <DataHead>
              <Box display="flex" justifyContent="space-between" padding="0 10px" sx={{ mb: 4, pl: 2, pr: 2 }}>
                <IconButton onClick={() => back()}>
                  <Iconify icon={'eva:arrow-back-outline'} width="32px" height="32px" />
                </IconButton>
              </Box>
              <Grid container spacing={3} justifyContent={'space-around'}>
                <Grid item xs={12} sm={4} lg={2}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <AvatarContainer>
                      <Avatar
                        src={user.businessDetails?.logo}
                        alt={user?.businessDetails?.businessName}
                        sx={{ width: '100%', height: '100%' }}
                      />
                    </AvatarContainer>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0 10px' }}>
                    <Typography
                      variant="caption"
                      color="common.white"
                      sx={{ backgroundColor: 'error.main', borderRadius: '4px', padding: '2px 10px' }}
                    >
                      BUSINESS
                    </Typography>
                  </div>
                  <Box display="flex" justifyContent={'center'}>
                    <Link href="/organisation/update" passHref={true}>
                      <Button>
                        <ListItemIcon>
                          <Iconify icon={'feather:edit'} width="20px" height="20px" color="common.black" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="subtitle2" color="primary.main">
                            Edit Profile
                          </Typography>
                        </ListItemText>
                      </Button>
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={7} lg={3}>
                  <Stack spacing={3}>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Business Name
                      </Typography>
                      <Typography variant="h6">{user.businessDetails?.businessName}</Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Business Website
                      </Typography>
                      <Typography variant="h6">{user.businessDetails?.businessWeb}</Typography>
                    </Stack>
                  
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4} lg={2}>
                  <Stack spacing={3}>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Address
                      </Typography>
                      <Typography variant="h6" style={{ wordBreak: 'break-word' }}>
                        {user.businessDetails?.address1 + ' , ' + user.businessDetails?.address2}
                      </Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        State
                      </Typography>
                      <Typography variant="h6">{user.businessDetails?.state}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={3} lg={3}>
                  <Stack spacing={3}>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Pin Code / Zip Code
                      </Typography>
                      <Typography variant="h6">{user.businessDetails?.pincode}</Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Team Size
                      </Typography>
                      <Typography variant="h6">{user.businessDetails?.teamsize}</Typography>
                    </Stack>
                    <Box>
                      <Typography variant="subtitle2" color="GrayText">
                        Admin Details
                      </Typography>
                      <Box display={'flex'}>
                        <Typography variant="h6" color="initial" noWrap sx={{ textTransform: 'capitalize' }}>
                          {user?.displayName}
                        </Typography>
                        &nbsp;&nbsp;
                        <Link href={'/user/profile'} passHref={true}>
                          <ButtonBase sx={{ marginLeft: 1 }}>
                            <Typography variant="subtitle2" color="primary.main">
                              View Profile
                            </Typography>
                          </ButtonBase>
                        </Link>
                      </Box>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </DataHead>
         
            {user?.activeLicenses?.count > 1 ? (
              <DataSection>
                <DataHead sx={{ width: '100%', justifyContent: 'space-between', display: 'flex', px: 4, py: 3 }}>
                  <Typography variant="h5" style={{ display: 'inline' }}>
                  Assigned license
                  </Typography>
                 
                </DataHead>
                <Box sx={{ p:{xs:0,md:4}, pt: 0, py: 0 }}>
                  <LicenceData fetch={fetch} />
                </Box>
               
                {/* <AppNewInvoice/> */}
              </DataSection>
            ) : (
              <DataSection>
                <DataHead sx={{ width: '100%', justifyContent: 'space-between', display: 'flex', px: 4, py: 3 }}>
                  <Typography variant="h5" style={{ display: 'inline' }}>
                    Recent Invites
                  </Typography>
                  {/* <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setInviteOpen(true)}
                    startIcon={<Iconify icon={'eva:person-add-outline'} width={20} height={20} />}
                  >
                    {' '}
                    Invite User
                  </Button> */}
                </DataHead>
                <Box sx={{ p:{xs:0,md:4}, pt: 0 }}>
                  <InviteData fetch={fetch} />
                </Box>
              
                {/* <AppNewInvoice/> */}
              </DataSection>
            )}
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
