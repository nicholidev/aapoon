/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { capitalCase } from 'change-case';
import RouterLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Tooltip, Paper } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// routes
import DashboardHeader from '../../layouts/dashboard/header/index';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import AuthFirebaseSocials from '../../sections/auth/AuthFirebaseSocial';
import DashboardLayout from '../../layouts/main';
import Divider from '@mui/material/Divider';
// ----------------------------------------------------------------------
import GlobalStyles from '@mui/material/GlobalStyles';
import { IconButtonAnimate } from '../../components/animate';
import Iconify from '../../components/Iconify';
import { useRouter } from 'next/router';
const RootStyle = styled('div')(({ theme }) => ({}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  backgroundColor: '#fff',
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 650,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 0,
  justifyContent: 'center',
  margin: theme.spacing(0, 0, 0, 0),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 880,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  marginTop: '80px',
  marginBottom: '40px',
  [theme.breakpoints.down('sm')]: {
    marginTop: '60px',
    marginBottom: '20px',
  },
  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

function RefundPolicy() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();

  return (
    <Page title="aapoon meet refund policy">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <RootStyle>
        {/* <DashboardHeader /> */}

        <Container sx={{ mt: { xs: 2 } }}>
          <Paper>
            <ContentStyle>
              <Box sx={{ mb: 5 }}>
                {/* <IconButtonAnimate onClick={() => router.back()}>
                    <Iconify icon={'eva:arrow-back-fill'} />
                  </IconButtonAnimate>
                  &nbsp;&nbsp;&nbsp;&nbsp; */}
                <Typography variant="h2" align="center" gutterBottom sx={{ fontSize: { xs: '18px', md: '24px' } }}>
                  aapoon meet Refund policy
                </Typography>

                {/* <Typography variant="h6" gutterBottom style={{ fontStyle: 'italic' }}>
                  EFFECTIVE: August 09, 2021
                </Typography> */}
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                  Since the meetaap.in offers non-tangible products/Goods/Services, we do not provide refunds after the
                  subscription is purchased, which you acknowledge prior to purchasing any subscription on the Website.
                  <br />
                  <br />
                  We have a fully functioning free version that you may sign up and try before making a premium
                  subscription.
                </Typography>
              </Box>
              <Box sx={{ pl: 2, display: 'flex' }}>
                <Typography variant="h4">
                  <Iconify icon={'ci:dot-02-s'} />
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  There is no refund if a customer cancels or doesn’t use the product or service during the active
                  subscription period.
                </Typography>
              </Box>
              <Box sx={{ pl: 2, display: 'flex' }}>
                <Typography variant="h4">
                  <Iconify icon={'ci:dot-02-s'} />
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  aapoon meet will issue a refund if a duplicate payment for the same service is charged due to a
                  technical error or mistake.
                </Typography>
              </Box>
              <Box sx={{ pl: 2, display: 'flex' }}>
                <Typography variant="h4">
                  <Iconify icon={'ci:dot-02-s'} />
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  aapoon meet will issue a refund if a duplicate payment for the same service is charged due to a
                  technical error or mistake.
                </Typography>
              </Box>
              <Box sx={{ pl: 2, display: 'flex' }}>
                <Typography variant="h4">
                  <Iconify icon={'ci:dot-02-s'} />
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  A refund request must be made in writing using the registered email Id of the user.
                </Typography>
              </Box>
              <Box sx={{ pl: 2, display: 'flex' }}>
                <Typography variant="h4">
                  <Iconify icon={'ci:dot-02-s'} />
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  We reserve all the rights to issue a refund, and the decision will be made solely by us in all
                  circumstances.
                </Typography>
              </Box>
              <Box sx={{ mb: 5, pl: 2, display: 'flex' }}>
                <Typography variant="h4">
                  <Iconify icon={'ci:dot-02-s'} />
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  Refunds are subject to verification of information provided, and it may take up to 30 days to process
                  it.
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Contacting us
                </Typography>
              </Box>
              <Typography sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                You may notify aapoon meet of any issues by sending an Email to &nbsp;
                <a href="mailto:support@meetapp.in">support@meetapp.in</a>
              </Typography>
            </ContentStyle>
          </Paper>
        </Container>
      </RootStyle>
    </Page>
  );
}

RefundPolicy.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default RefundPolicy;
