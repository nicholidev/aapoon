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
import Paper from '@mui/material/Paper';
import GlobalStyles from '@mui/material/GlobalStyles';
// ----------------------------------------------------------------------

import Iconify from '../../components/Iconify';

import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import PlansComparison from '../../components/plan/PlansComparison';
import { getAllProducts, getCheckoutSession, openCustomerPortal } from '../../api/payments';
import { useRouter } from 'next/router';

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

const PremiumCardRecurring = styled(Paper)(({ theme }) => ({
  height: '106%',
  padding: theme.spacing(2, 3, 4, 3),
  justifyContent: 'space-between',
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

const DataSection = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
  height: 'auto',
  width: '100%',
  padding: '0 40px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '26px',
  [theme.breakpoints.down('md')]: {
    padding: '0 20px',
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
  justifyContent: 'space-between',
  height: '100%',
  padding: theme.spacing(1, 3, 0, 3),
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
  const [current, setCurrent] = useState('month');
  const [planData, setPlanData] = useState([]);
  const [subscription, setSubscription] = useState([]);
  const [currency, setcurrency] = useState('inr');
  const { user, setLoading, locale } = useAuth();
  const router = useRouter();
  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    if (newValue == 0) {
      setCurrent('month');
    } else {
      setCurrent('year');
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((data) => {
        setPlanData(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setSubscription(user.subscription);
    console.log('setSubscription', user.subscription);
  }, [user?.subscription]);

  useEffect(() => {
    setcurrency(locale?.currency?.toLowerCase());
  }, [locale?.currency]);

  const getPlanDetails = (name) => {
    return planData.find((i) => i.name == name);
  };

  const getPrice = (name) => {
    return planData
      .find((i) => i.name == name)
      ?.prices.find((i) => i.currency == (currency || 'usd') && i.interval == current);
  };

  const getFeatures = (name) => {
    let data = planData.find((i) => i.name == name);
    if (!data) return [];
    else return Object.values(data.metadata);
  };
  const startCheckoutSession = (id) => {
    setLoading(true);
    getCheckoutSession(id)
      .then((session) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  console.log(locale);
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
            <Select
              value={currency}
              size="small"
              sx={{ backgroundColor: 'common.white' }}
              onChange={(e) => setcurrency(e.target.value)}
            >
              <MenuItem value={'inr'}>
                <Typography variant="subtitle1" color="initial">
                  ₹ India
                </Typography>
              </MenuItem>
              <MenuItem value={'usd'}>
                <Typography variant="subtitle1" color="initial">
                  $ USA
                </Typography>
              </MenuItem>
            </Select>
          </Box>
          <TabContainer>
            <Tabs variant="standard" value={current == 'month' ? 0 : 1} onChange={handleTabChange} aria-label="">
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
          <DataSection style={{ overflow: 'visible' }}>
            <Grid container spacing={1} justifyContent={'space-around'} style={{ width: '100%' }}>
              <Grid item xs={12} sm={6} md={5} lg={3}>
                <PlanDiv>
                  <Box>
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
                    <Box display={'flex'} sx={{ mb: 1 }}>
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
                    <Box display={'flex'}>
                      <ListItemIcon>
                        <IconContainer>
                          <Iconify icon={'bi:check-lg'} color="secondary.dark" />
                        </IconContainer>
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="subtitle2" color="GrayText">
                          Host up to 50 participants
                        </Typography>
                      </ListItemText>
                    </Box>
                  </Box>
                  {/* <CustomButton variant="contained" size="large" sx={{ mt: 8, mb: 4 }}>
                    Choose plan
                  </CustomButton> */}
                </PlanDiv>
              </Grid>
              <Grid item xs={12} sm={6} md={5} lg={3} sx={{ marginTop: { xs: 10, lg: 0 } }}>
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -43,
                      right: 30,
                      display: 'flex',
                      backgroundColor: '#fff',
                      padding: '5px 20px',
                      borderRadius: '25px',
                      boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <Typography variant="subtitle2" color="primary">
                      One Time
                    </Typography>
                  </Box>
                </div>
                <PlanDiv>
                  <Box>
                    <Typography variant="h3" color="initial" sx={{ display: 'flex' }}>
                      {currency == 'inr' ? '₹' : '$'}
                      {getPrice('Premium') ? getPrice('Premium').unit_amount / 100 : '600'}&nbsp;
                      <Typography variant="subtitle2" color="GrayText" sx={{ mt: 2 }}>
                        /User/{current}
                      </Typography>
                    </Typography>
                    <Typography variant="h4" color="initial">
                      {getPlanDetails('Premium') ? getPlanDetails('Premium').name : 'Premium'}
                    </Typography>
                    <Typography variant="subtitle2" color="GrayText" sx={{ mt: 1 }}>
                      {getPlanDetails('Premium') ? getPlanDetails('Premium').description : 'For Small Teams (1-100)'}
                    </Typography>

                    <br />
                    {getFeatures('Premium').map((i) => {
                      return (
                        <Box display={'flex'} sx={{ mb: 1 }}>
                          <ListItemIcon>
                            <IconContainer>
                              <Iconify icon={'bi:check-lg'} color="secondary.dark" />
                            </IconContainer>
                          </ListItemIcon>
                          <ListItemText>
                            <Typography variant="subtitle2" color="GrayText">
                              {i}
                            </Typography>
                          </ListItemText>
                        </Box>
                      );
                    })}
                  </Box>
                  <CustomButton
                    onClick={() =>
                      user.id ? startCheckoutSession(getPrice('Premium').id) : router.push('/auth/Login')
                    }
                    variant="contained"
                    disabled={subscription?.find((i) => i.items[0]?.price.id == getPrice('Premium')?.id) ? true : false}
                    size="large"
                    sx={{ mt: 8, mb: 4 }}
                  >
                    {subscription?.find((i) => i.items[0]?.price.id == getPrice('Premium')?.id)
                      ? 'Current Plan'
                      : 'Choose plan'}
                  </CustomButton>
                </PlanDiv>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={5}
                lg={3}
                style={{ minHeight: '480px', position: 'relative', zIndex: 23 }}
                sx={{ marginTop: { xs: 10, lg: 0 } }}
              >
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -43,
                      right: 30,
                      display: 'flex',
                      backgroundColor: '#fff',
                      padding: '5px 20px',
                      borderRadius: '25px',
                      boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <Typography variant="subtitle2" color="primary">
                      Recurring
                    </Typography>
                  </Box>
                </div>
                <PremiumCardRecurring elevation={3} style={{ position: 'absolute', top: 0, zIndex: 3400 }}>
                  <Box>
                    <Typography variant="h3" color="common.white" sx={{ display: 'flex' }}>
                      ₹{getPrice('Premium') ? getPrice('Premium').unit_amount / 100 : '600'}&nbsp;
                      <Typography variant="subtitle2" color="common.white" sx={{ mt: 2 }}>
                        /User/{current}
                      </Typography>
                    </Typography>
                    <Typography variant="h4" color="common.white">
                      Premium
                    </Typography>
                    <Typography variant="subtitle2" color="common.white" sx={{ mt: 1 }}>
                      {getPlanDetails('Premium') ? getPlanDetails('Premium').description : 'For Small Teams (1-100)'}
                    </Typography>

                    <br />
                    {getFeatures('Premium').map((i) => {
                      return (
                        <Box display={'flex'} sx={{ mb: 1 }}>
                          <ListItemIcon>
                            <IconContainer style={{ backgroundColor: '#38618E' }}>
                              <Iconify icon={'bi:check-lg'} color="common.white" />
                            </IconContainer>
                          </ListItemIcon>
                          <ListItemText>
                            <Typography variant="subtitle2" color="common.white">
                              {i}
                            </Typography>
                          </ListItemText>
                        </Box>
                      );
                    })}
                  </Box>
                  <Button
                    onClick={() => startCheckoutSession(getPrice('Premium').id)}
                    disabled={subscription?.find((i) => i.product.name == 'Premium') ? true : false}
                    variant="contained"
                    size="large"
                    sx={{ mt: 8, borderRadius: '50px', mb: 4 }}
                  >
                    {subscription?.find((i) => i.product.name == 'Premium') ? 'Current Plan' : 'Choose plan'}
                  </Button>
                </PremiumCardRecurring>
              </Grid>
            </Grid>
          </DataSection>
          <br />
          <br />
          <DataSection>
            <br />
            <br />
            <Typography align="center" variant="h3" color="initial">
              Our Plans are Coming Soon...
            </Typography>
            <br />
            <br />
            <Grid container spacing={5} justifyContent={'space-around'}>
              <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
                <PlanDiv>
                  <Box position="relative">
                    <Box position="absolute" left="50px" top={-22}>
                      <Iconify icon={'mdi:crown-circle'} width="30px" height="30px" color="#FFAF52" />
                    </Box>
                  </Box>
                  <Typography variant="h4" color="initial" gutterBottom>
                    Platinum
                    <Typography variant="subtitle2" color="initial">
                      (For Large Teams)
                    </Typography>
                  </Typography>
                  <Typography variant="h4" color="initial">
                    At ₹1150&nbsp;
                    <Typography component={'span'} variant="subtitle2" color="GrayText">
                      /User/month
                    </Typography>
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
                        Organization branding
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
                  </Box>{' '}
                  <Box display={'flex'}>
                    <ListItemIcon>
                      <IconContainer>
                        <Iconify icon={'bi:check-lg'} color="secondary.dark" />
                      </IconContainer>
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="subtitle2" color="GrayText">
                        Background options
                      </Typography>
                    </ListItemText>
                  </Box>
                </PlanDiv>
              </Grid>
              <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
                <PlanDiv>
                  <Box position="relative">
                    <Box position="absolute" left="65px" top={-22}>
                      <Iconify icon={'ri:group-2-fill'} width="30px" height="30px" color="#925FFF" />
                    </Box>
                  </Box>
                  <Typography variant="h4" color="initial" gutterBottom>
                    Corporate Plan
                    <Typography variant="subtitle2" color="initial">
                      (On minimum 10 Licenses)
                    </Typography>
                  </Typography>
                  <Typography variant="h4" color="initial">
                    At ₹50,000 /year
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
                  </Box>{' '}
                  <Box display={'flex'}>
                    <ListItemIcon>
                      <IconContainer>
                        <Iconify icon={'bi:check-lg'} color="secondary.dark" />
                      </IconContainer>
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="subtitle2" color="GrayText">
                        Background options
                      </Typography>
                    </ListItemText>
                  </Box>
                </PlanDiv>
              </Grid>
              <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                <Grid item xs={1}></Grid>
              </Box>
              <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
                {' '}
                <PlanDiv>
                  <Box position="relative">
                    <Box position="absolute" left="60px" top={-22}>
                      <Iconify icon={'mdi:check-decagram'} width="30px" height="30px" color="#FB5F38" />
                    </Box>
                  </Box>
                  <Typography variant="h4" color="initial" gutterBottom>
                    Webinar Plan
                    <Typography variant="subtitle2" color="initial">
                      (Add On)
                    </Typography>
                  </Typography>
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

                  <Box sx={{ margin: { xs: 0, xl: '0 100px 0 0' }, display: { xs: 'block', sm: 'none' } }}>
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

            {/* <Grid container spacing={1} justifyContent={'space-around'} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
                <PlanDiv>
                  <Box sx={{ margin: { xs: 0, xl: '0 100px 0 0' } }}>
                    <CustomButton fullWidth variant="contained" size="large">
                      Choose plan
                    </CustomButton>
                  </Box>
                </PlanDiv>
              </Grid>
              <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                <Grid item xs={1}></Grid>
              </Box>
              <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
                <PlanDiv>
                  <Box sx={{ margin: { xs: 0, xl: '0 100px 0 0' } }}>
                    <CustomButton fullWidth variant="contained" size="large">
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
            <br />
            <br /> */}
            <br />
            <br />
            <Grid container spacing={1} justifyContent={'space-around'}>
              <Grid item xs={12} sm={10} md={9} lg={7} xl={7}>
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
