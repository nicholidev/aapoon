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
  Select,
  MenuItem,
  AppBar,
  Tabs,
  Tab,
} from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/main';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import GlobalStyles from '@mui/material/GlobalStyles';
// ----------------------------------------------------------------------

import Iconify from '../../components/Iconify';

import { useState } from 'react';

import PlansComparison from '../../components/plan/PlansComparison';

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
    width: '100%',
    padding: theme.spacing(1),
    paddingLeft: 0,
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
  width: '100%',
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

const TabContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: -1,
  [theme.breakpoints.down('md')]: {
    marginTop: 2,
    paddingTop: '20px',
  },
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
  const [current, setCurrent] = useState('monthly');

  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    if (newValue == 0) {
      setCurrent('monthly');
    } else {
      setCurrent('annual');
    }
  };
  return (
    <Page title="Plan and pricing">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F5F5FA' },
        }}
      />
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', mt: 8, md: 4 }}>
        <Content>
          <Typography align="center" variant="h3" color="initial">
            aapoon meet Pricing Plans
          </Typography>
          <br />

          <Box display="flex" justifyContent={'flex-end'}>
            <Select value={'INR'} size="small" sx={{ backgroundColor: 'common.white' }}>
              <MenuItem value={'INR'}>
                <Typography variant="subtitle1" color="initial">
                  ₹ India
                </Typography>
              </MenuItem>
              <MenuItem value={'USD'}>
                <Typography variant="subtitle1" color="initial">
                  $ USA
                </Typography>
              </MenuItem>
            </Select>
          </Box>
          <TabContainer>
            <Tabs variant="standard" value={current == 'monthly' ? 0 : 1} onChange={handleTabChange} aria-label="">
              <Tab
                label="MONTHLY"
                style={{
                  minWidth: 100,
                }}
              />
              <Tab
                label="ANNUAL"
                style={{
                  minWidth: 100,
                }}
              />
            </Tabs>
          </TabContainer>
          <br />
          <br />
          {/* <InfoContainer container spacing={4}>
            <Grid xs={12} sm={6} md={4}>
              <InfoCard>
                <InfoHeading>appoon meet Pricing Plans </InfoHeading>
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
          </InfoContainer> */}
          <DataSection>
            <Grid container spacing={1} justifyContent={'space-around'} style={{ width: '100%' }}>
              <Grid item xs={12} sm={6} md={5} lg={3}>
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
              <Grid item xs={12} sm={6} md={5} lg={3}>
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
              <Grid item xs={12} sm={6} md={5} lg={3}>
                <div
                  style={{
                    position: 'relative',
                    height: '600px',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      right: 0,
                      display: 'flex',
                      backgroundColor: '#fff',
                      padding: '0 20px',
                      borderRadius: '25px',
                    }}
                  >
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
              <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                <Grid item xs={1}></Grid>
              </Box>
            </Grid>
          </DataSection>
          <br />
          <br />
          <DataSection>
            <Grid container spacing={1} justifyContent={'space-around'}>
              <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
                <PlanDiv>
                  <Typography variant="h4" color="initial">
                    Corporate Plan
                  </Typography>
                  <br />
                  <Typography variant="h4" color="initial">
                    Starting at ₹50,000 /year
                  </Typography>
                  <Typography variant="h6" color="initial">
                    (Billed Annually)
                  </Typography>
                  <br />
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
                        2 GB Cloud recording (per license)*
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
                        Organization branding
                      </Typography>
                    </ListItemText>
                  </Box>
                  <br />
                  <Box display={'flex'} alignItems="center">
                    <Typography variant="h6" color="initial">
                      Hosts
                    </Typography>
                    &nbsp; &nbsp;
                    <Select size="small" value={10}>
                      <MenuItem value={10}>
                        <Typography variant="subtitle1" color="initial">
                          10
                        </Typography>
                      </MenuItem>
                    </Select>
                  </Box>
                  <Box sx={{ margin: { xs: 0, xl: '0 100px 0 0' } }}>
                    <CustomButton fullWidth variant="contained" size="large" sx={{ mt: 7 }}>
                      Choose plan
                    </CustomButton>
                  </Box>
                </PlanDiv>
              </Grid>
              <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                <Grid item xs={1}></Grid>
              </Box>
              <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
                {' '}
                <PlanDiv>
                  <Typography variant="h4" color="initial">
                    Webinar Plan
                  </Typography>
                  <br />
                  <Typography variant="h4" color="initial">
                    At ₹5203 /month
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
                        2 GB Cloud recording
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
                        Live Streaming
                      </Typography>
                    </ListItemText>
                  </Box>
                  <br />
                  <Box display={'flex'} alignItems="center">
                    <Typography variant="h6" color="initial">
                      Hosts
                    </Typography>
                    &nbsp; &nbsp;
                    <Select size="small" value={10}>
                      <MenuItem value={10}>
                        <Typography variant="subtitle1" color="initial">
                          10
                        </Typography>
                      </MenuItem>
                    </Select>
                  </Box>
                  <Box sx={{ margin: { xs: 0, xl: '0 100px 0 0' } }}>
                    <CustomButton fullWidth variant="contained" size="large" sx={{ mt: 7 }}>
                      Choose plan
                    </CustomButton>
                  </Box>
                </PlanDiv>
              </Grid>
              <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                <Grid item xs={1}></Grid>
              </Box>
            </Grid>
            <br />
            <Grid container spacing={1} justifyContent={'space-around'}>
              <Grid item xs={12} sm={10} md={9} lg={7} xl={6}>
                <PlansComparison />
              </Grid>
            </Grid>
            <br />
            <br />
          </DataSection>
        </Content>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
let PlansPrice = PlanPricePage;

PlansPrice.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default PlansPrice;
