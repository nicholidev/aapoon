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
  Box,
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
import { IconButtonAnimate } from '../../components/animate';

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
const CustomButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: '#FCEEEA',
  borderRadius: '50px',
  '&:hover': {
    // backgroundColor: '#fff',
    color: '#fff',
  },
}));

const Content = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: theme.spacing(1),
  paddingTop: theme.spacing(4),
  paddingLeft: theme.spacing(4),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    width: '100vw',
    paddingLeft: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
}));

const PlatinumCard = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  marginTop: 5,
  padding: '20px 30px 50px',
  // height: '100%',
  width: '100%',
  backgroundColor: '#225082',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '26px',
  boxShadow: '0px 42px 34px rgba(34, 80, 130, 0.17)',
}));

const InfoCard = styled(Card)(({ theme }) => ({
  height: 114,
  width: 259,
  maxWidth: '100%',
  paddingTop: 16,
  position: 'relative',
  margin: 'auto',
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
  height: 'auto',
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

const PlanDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(5),
}));

const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  height: '20px',
  borderRadius: '20px',
  backgroundColor: '#EDECF9',
}));

const IconContainerPlatinum = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  height: '20px',
  borderRadius: '20px',
  backgroundColor: '#38618E',
}));

function PlanPricePage() {
  const { themeStretch } = useSettings();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [current, setCurrent] = useState('dashboard');
  return (
    <Page title="Dashboard">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F5F5FA' },
        }}
      />
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex' }}>
        <Content>
          <Typography align="center" variant="h3" color="initial">
            appoon meet Pricing Plans
          </Typography>
          <br />
          {/* <InfoContainer container spacing={4}>
            <Grid xs={11} sm={6} md={4}>
              <InfoCard>
                <InfoHeading>appoon meet Pricing Plans </InfoHeading>
                <InfoNumbers>
                  <h3>34</h3>
                </InfoNumbers>
                <PersonIcon style={infoIconStyle} />
              </InfoCard>
            </Grid>
            <Grid xs={11} sm={6} md={4}>
               <InfoCard>
                 <InfoHeading>Upcoming Meetings this week</InfoHeading>
                 <InfoNumbers>
                   <h3>12</h3>
                 </InfoNumbers>
                 <CheckCircleIcon style={infoIconStyle} />
               </InfoCard>
             </Grid>
             <Grid xs={11} sm={6} md={4}>
               <InfoCard>
                 <InfoHeading>Meetings attended this week</InfoHeading>
                 <InfoNumbers>
                   <h3>10</h3>
                 </InfoNumbers>
                 <StarIcon style={infoIconStyle} />
               </InfoCard>
             </Grid>
          </InfoContainer> */}
          <DataSection>
            {/* <DataHead>
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
            </DataHead> */}
            <Grid container spacing={2} justifyContent={'space-around'}>
              <Grid item xs={11} sm={8} md={5} lg={3}>
                <PlanDiv>
                  <Typography variant="h4" color="initial">
                    Free
                  </Typography>
                  <br />
                  <Typography variant="h4" color="initial">
                    Basic
                  </Typography>
                  <Typography variant="subtitle2" color="GrayText" sx={{ mt: 1 }}>
                    For Personal
                  </Typography>
                  <br />
                  <br />
                  <Box display={'flex'} sx={{ mb: 1 }}>
                    <ListItemIcon>
                      <IconContainer>
                        <Iconify icon={'bi:check-lg'} color="secondary.dark" />
                      </IconContainer>
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="subtitle2" color="GrayText">
                        Unlimited 1:1 meetings
                      </Typography>
                    </ListItemText>
                  </Box>
                  <Box display={'flex'}>
                    <ListItemIcon>
                      <IconContainer>
                        <Iconify icon={'bi:check-lg'} color="secondary.dark" />
                      </IconContainer>
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="subtitle2" color="GrayText">
                        Free 55-minutes meetings
                      </Typography>
                    </ListItemText>
                  </Box>
                  <CustomButton variant="contained" size="large" sx={{ mt: 18 }}>
                    Choose plan
                  </CustomButton>
                </PlanDiv>
              </Grid>
              <Grid item xs={11} sm={8} md={5} lg={3}>
                {' '}
                <PlanDiv>
                  <Typography variant="h4" color="initial" sx={{ display: 'flex' }}>
                    ₹600&nbsp;
                    <Typography variant="subtitle2" color="GrayText" sx={{ mt: 1 }}>
                      /User/month
                    </Typography>
                  </Typography>
                  <br />
                  <Typography variant="h4" color="initial">
                    Premuium
                  </Typography>
                  <Typography variant="subtitle2" color="GrayText" sx={{ mt: 1 }}>
                    For Small Teams
                  </Typography>
                  <Typography variant="subtitle2" color="GrayText">
                    1-100 Accounts
                  </Typography>
                  <br />
                  <Box display={'flex'} sx={{ mb: 1 }}>
                    <ListItemIcon>
                      <IconContainer>
                        <Iconify icon={'bi:check-lg'} color="secondary.dark" />
                      </IconContainer>
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="subtitle2" color="GrayText">
                        Host up to 100 participants
                      </Typography>
                    </ListItemText>
                  </Box>
                  <Box display={'flex'} sx={{ mb: 1 }}>
                    <ListItemIcon>
                      <IconContainer>
                        <Iconify icon={'bi:check-lg'} color="secondary.dark" />
                      </IconContainer>
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="subtitle2" color="GrayText">
                        Unlimited meetings
                      </Typography>
                    </ListItemText>
                  </Box>
                  <Box display={'flex'} sx={{ mb: 1 }}>
                    <ListItemIcon>
                      <IconContainer>
                        <Iconify icon={'bi:check-lg'} color="secondary.dark" />
                      </IconContainer>
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="subtitle2" color="GrayText">
                        2 GB Cloud recording (per license)
                      </Typography>
                    </ListItemText>
                  </Box>
                  <Box display={'flex'} sx={{ mb: 1 }}>
                    <ListItemIcon>
                      <IconContainer>
                        <Iconify icon={'bi:check-lg'} color="secondary.dark" />
                      </IconContainer>
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="subtitle2" color="GrayText">
                        Tracking attendance
                      </Typography>
                    </ListItemText>
                  </Box>
                  <CustomButton variant="contained" size="large" sx={{ mt: 7 }}>
                    Choose plan
                  </CustomButton>
                </PlanDiv>
              </Grid>
              <Grid item xs={11} sm={6} md={5} lg={3}>
                <div
                  style={{
                    position: 'relative',
                    height: '600px',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <Box sx={{ position: 'absolute', top: -30, right: 0 }}>
                    <Typography variant="subtitle2" color="common.black">
                      MOST POPULAR
                    </Typography>
                  </Box>
                  <PlatinumCard>
                    <Typography variant="h3" color="common.white" sx={{ display: 'flex' }}>
                      ₹1,150&nbsp;
                      <Typography variant="subtitle2" color="common.white" sx={{ mt: 2 }}>
                        /User/month
                      </Typography>
                    </Typography>
                    <br />
                    <Typography variant="h4" color="common.white">
                      Premuium
                    </Typography>
                    <Typography variant="subtitle2" color="common.white" sx={{ mt: 1 }}>
                      For Large Teams
                    </Typography>
                    <Typography variant="subtitle2" color="common.white">
                      Up to 100 Accounts
                    </Typography>
                    <br />
                    <Box display={'flex'} sx={{ mb: 1 }}>
                      <ListItemIcon>
                        <IconContainerPlatinum>
                          <Iconify icon={'bi:check-lg'} color="common.white" />
                        </IconContainerPlatinum>
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="subtitle2" color="common.white">
                          Host up to 100 participants
                        </Typography>
                      </ListItemText>
                    </Box>
                    <Box display={'flex'} sx={{ mb: 1 }}>
                      <ListItemIcon>
                        <IconContainerPlatinum>
                          <Iconify icon={'bi:check-lg'} color="common.white" />
                        </IconContainerPlatinum>
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="subtitle2" color="common.white">
                          Unlimited meetings
                        </Typography>
                      </ListItemText>
                    </Box>
                    <Box display={'flex'} sx={{ mb: 1 }}>
                      <ListItemIcon>
                        <IconContainerPlatinum>
                          <Iconify icon={'bi:check-lg'} color="common.white" />
                        </IconContainerPlatinum>
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="subtitle2" color="common.white">
                          2 GB Cloud recording (per license)
                        </Typography>
                      </ListItemText>
                    </Box>
                    <Box display={'flex'} sx={{ mb: 1 }}>
                      <ListItemIcon>
                        <IconContainerPlatinum>
                          <Iconify icon={'bi:check-lg'} color="common.white" />
                        </IconContainerPlatinum>
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="subtitle2" color="common.white">
                          Organization branding
                        </Typography>
                      </ListItemText>
                    </Box>
                    <Box display={'flex'} sx={{ mb: 1 }}>
                      <ListItemIcon>
                        <IconContainerPlatinum>
                          <Iconify icon={'bi:check-lg'} color="common.white" />
                        </IconContainerPlatinum>
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="subtitle2" color="common.white">
                          Tracking attendance
                        </Typography>
                      </ListItemText>
                    </Box>
                    <Button variant="contained" size="large" sx={{ mt: 4, borderRadius: '50px' }}>
                      Choose plan
                    </Button>
                  </PlatinumCard>
                </div>
              </Grid>
              <Grid item xs={0} md={1}></Grid>
            </Grid>
          </DataSection>
        </Content>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
let PlansPrice = withAuth(PlanPricePage);

PlansPrice.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default PlansPrice;
