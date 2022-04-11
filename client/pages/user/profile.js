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
  IconButton,
  styled,
  Typography,
  Divider,
} from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// hooks
import useSettings from '../../hooks/useSettings';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/router';
// components
import Page from '../../components/Page';
import GlobalStyles from '@mui/material/GlobalStyles';
// ----------------------------------------------------------------------
import withAuth from '../../HOC/withAuth';
import Iconify from '../../components/Iconify';
import InviteData from '../../components/invite/InviteData';
import LicenceData from '../../components/licence';
import InviteModal from '../../components/invite/InviteModal';
import { useState } from 'react';
import UpdateUserProfile from '../../sections/user/UpdateUserProfile';
import { openCustomerPortal } from '../../api/payments';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from '@mui/material/TextField';
import moment from 'moment';
import ErrorMessages from './../../utils/errorMessage';
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
  const { back ,push} = useRouter();
  const { themeStretch } = useSettings();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [current, setCurrent] = useState('dashboard');
  const { user, setLoading,deleteAccount,login } = useAuth();
  const [open, setOpen] = useState(false);
const [password,setPassword ]=useState("")
const [error,setError]=useState("")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openPortal = () => {
    setLoading(true);
    openCustomerPortal().then((url) => {
      window.location = url;
      setLoading(false);
    });
  };

  const aggree=()=>{
    login(user.email,password).then(result=>{
      deleteAccount()
      handleClose()
    }).catch(err=>{
      setError(ErrorMessages[err.code])
    })
   
  
  }

  let activeSub = user.subscription?.find((i) => i.status == 'active');
  console.log(user);
  return (
    <Page title="Dashboard" sx={{ width: '100vw' }}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{mt:2}}>
           This process is Irreversible , we will not be able to recover you Account
<br/>
<br/>

        <center> <TextField type={"password"} error={error} helperText={error} label={"Enter password"} onChange={(e)=>setPassword(e.target.value)}/></center>  
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={aggree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth={'lg'} sx={{ justifyContent: 'center' }}>
        <Content>
          <DataSection>
            <DataHead>
              <Box display="flex" justifyContent="space-between" padding="0 10px" sx={{ mb: 4, pl: 2, pr: 2 }}>
                <IconButton onClick={() => back()}>
                  <Iconify icon={'eva:arrow-back-outline'} width="32px" height="32px" />
                </IconButton>
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
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0 10px' }}>
                    <Typography
                      variant="caption"
                      color="common.white"
                      sx={{ backgroundColor: 'success.main', borderRadius: '50px', padding: '2px 10px' }}
                    >
                      {user.accountType}
                    </Typography>
                  </div>
                  <Box display="flex" justifyContent={'center'}>
                    <UpdateUserProfile>
                      <Button variant="text">
                        <ListItemIcon>
                          <Iconify icon={'feather:edit'} width="20px" height="20px" color="common.black" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="subtitle2" color="primary.main">
                            Edit Profile
                          </Typography>
                        </ListItemText>
                      </Button>
                    </UpdateUserProfile>
                  </Box>
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
                      <Typography noWrap variant="h6">
                        {user.email}
                      </Typography>
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
                      <Typography variant="h6">
                        {user?.activeLicenses?.count || user?.assignedToMe?.length ? 'Premium' : 'Free'}
                      </Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Purchase Date
                      </Typography>
                      <Typography variant="h6">
                        {activeSub
                          ? moment(new Date(activeSub?.current_period_start.seconds * 1000)).format('ll')
                          : 'N/A'}
                      </Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Expiration Date
                      </Typography>
                      <Typography variant="h6">
                        {' '}
                        {activeSub
                          ? moment(new Date(activeSub?.current_period_end.seconds * 1000)).format('ll')
                          : 'N/A'}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={3} lg={2}>
                  <Stack spacing={3}>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        No. Of Licenses
                      </Typography>
                      <Typography variant="h6">{user?.activeLicenses?.count || user?.assignedToMe?.length}</Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Assigned Licenses
                      </Typography>
                      <Typography variant="h6">{user?.activeLicenses?.assigned || 'NA'}</Typography>
                    </Stack>
                    <Stack spacing={0}>
                      <Typography variant="subtitle2" color="GrayText">
                        Unassigned Licenses
                      </Typography>
                      <Typography variant="h6">
                        {user.activeLicenses.count
                          ? user.activeLicenses.count - (user.activeLicenses.assigned + 1)
                          : 'NA'}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Stack direction="row" display={{ xs: 'none', lg: 'flex' }}>
                  <Divider orientation="vertical" variant="middle" flexItem />
                </Stack>
                <Grid item xs={12} sm={4} lg={2} xl={2}>
                 { <Stack spacing={5}>
                    <Stack spacing={5}>
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleClickOpen}>
                          <ListItemText
                            secondary={
                              <Typography variant="subtitle1" color="error">
                                Close Account
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                     { user?.activeLicenses?.count?<ListItem disablePadding>
                        <ListItemButton onClick={()=>openPortal()}>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" color="success.main">
                               Manage Billing
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </ListItem>:!user?.assignedToMe?.length?
                      <ListItem disablePadding>
                      <ListItemButton onClick={()=>push("/plan/plans-price")}>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" color="success.main">
                             Upgrade to premium
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>:
                     ""}
                      {/* <ListItem disablePadding>
                        <ListItemButton onClick={() => openPortal()}>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" color="GrayText">
                                Change plan
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </ListItem> */}
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
                  </Stack>}
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
                <InviteModal
                  open={inviteOpen}
                  handleClose={() => {
                    setInviteOpen(false);
                    setFetch(!fetch);
                  }}
                />
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
                <InviteModal
                  open={inviteOpen}
                  handleClose={() => {
                    setInviteOpen(false);
                    setFetch(!fetch);
                  }}
                />
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
