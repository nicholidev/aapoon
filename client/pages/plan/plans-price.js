/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import {
  ListItemIcon,
  ListItemText,
  Button,
  Container,
  Grid,
  Box,
  styled,
  Typography,
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
import { getAllProducts, getCheckoutSession } from '../../api/payments';
import {useRouter} from "next/router";

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

const IconContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  height: '20px',
  borderRadius: '20px',
  backgroundColor: '#EDECF9',
}));

function PlanPricePage() {
  const router = useRouter();
  const { themeStretch } = useSettings();
  const [current, setCurrent] = useState('month');
  const [planData, setPlanData] = useState([]);
  const [subscription, setSubscription] = useState([]);
  const [currency, setCurrency] = useState('inr');
  const { user, locale, setLoading } = useAuth();
  const [price, setPrice] = useState({});
  const [plan, setPlan] = useState({});

  const handleTabChange = (event, newValue) =>
  {
    if (newValue === 0) {
      setCurrent('month');
    } else {
      setCurrent('year');
    }
  };

  const startCheckoutSession = (id) =>
  {
    if (!user.id)
    {
      return router.push('/auth/Login?return=' + window.location.href);
    }

    // setLoading(true);
    getCheckoutSession(id, currency==="inr" )
      .then((session) => {
        console.log(session, 'SESSION')
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() =>
  {
    setSubscription(user.subscription);
  }, [user?.subscription]);

  useEffect(() =>
  {
    let country = 'IN'
    let crc = 'inr'
    if(user?.phoneNumber) {
      if (!user.phoneNumber.includes('+91')) {
        country = 'US'
        crc = 'usd'
      }
    } else {
      if( locale?.currency?.toLowerCase() === 'usd') {
        country = 'US'
        crc = 'usd'
      }
    }

    setCurrency(crc)
    getAllProducts(country)
      .then((data) => {
        setPlanData(data);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [user, locale])

  useEffect(() =>
  {
    if (planData.length > 0) {
      const pl = planData.find((i) => i.name.includes('Premium'))
      if (pl) {
        setPlan(pl)
        setPrice(pl.prices.find((i) => i.interval === current && i.currency === currency))
      }
    }
  }, [planData, current, currency])

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
            aapoon meet Plans & Pricing
          </Typography>
          <br />
          <TabContainer>
            <Tabs variant="standard" value={current === 'month' ? 0 : 1} onChange={(event, newValue)=>{handleTabChange(event, newValue)}} aria-label="">
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
          <DataSection style={{ overflow: 'visible' }}>
            <Grid container spacing={1} justifyContent={'space-around'} style={{ width: '100%' }}>
              <Grid item xs={12} sm={6} md={5} lg={3}>
                <PlanDiv>
                  <Box>
                    <Typography variant="h4" color="initial">
                      Free
                    </Typography>
                    <br />
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
                <PremiumCardRecurring elevation={3} style={{ position: 'absolute', top: 0, zIndex: 3400 }}>
                  <Box>
                    <Typography
                      variant="h3"
                      color="common.white"
                      sx={{ display: 'flex' }}
                    >
                      { currency === "usd" ? "$" : "₹" } {price?.unit_amount / 100 || '0.00'}&nbsp;
                      <span
                        style={{
                          fontSize: '0.875rem',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                      >
                        /User/{current}
                      </span>
                    </Typography>
                    <Typography variant="h4" color="common.white">
                      {plan.name || 'Premium'}
                    </Typography>
                    <Typography variant="subtitle2" color="common.white" sx={{ mt: 1 }}>
                      {plan.description || 'For Small Teams (1-100)'}
                    </Typography>
                    <br />
                    {Object.values(price?.metadata || {}).map((i, index) => (
                        <Box display={'flex'} sx={{ mb: 1 }} key={`features-${index}`}>
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
                      ))}
                  </Box>
                  <Button
                    onClick={() => startCheckoutSession(price.id)}
                    disabled={subscription?.find((i) => i.product?.name === 'Premium')}
                    variant="contained"
                    size="large"
                    sx={{ mt: 4, borderRadius: '50px', mb: 4 }}
                  >
                    {subscription?.find((i) => i.product?.name === 'Premium') ? 'Current Plan' : 'Choose plan'}
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
                  <Typography variant="h4" color="initial">
                    Platinum
                  </Typography>
                  <Typography variant="subtitle2" color="initial" gutterBottom>
                    (For Large Teams)
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
                  <Typography variant="h4" color="initial">
                    Corporate Plan
                  </Typography>
                  <Typography variant="subtitle2" color="initial" gutterBottom>
                    (On minimum 10 Licenses)
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
                <Grid item xs={1} />
              </Box>
              <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
                {' '}
                <PlanDiv>
                  <Box position="relative">
                    <Box position="absolute" left="60px" top={-22}>
                      <Iconify icon={'mdi:check-decagram'} width="30px" height="30px" color="#FB5F38" />
                    </Box>
                  </Box>
                  <Typography variant="h4" color="initial">
                    Webinar Plan
                  </Typography>
                  <Typography variant="subtitle2" color="initial" gutterBottom>
                    (Add On)
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
                </PlanDiv>
              </Grid>
              <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                <Grid item xs={1} />
              </Box>
            </Grid>
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
