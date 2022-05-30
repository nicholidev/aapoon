/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { capitalCase } from 'change-case';
import RouterLink from 'next/link';
// @mui
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Tooltip, Paper } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// routes
import DashboardHeader from '../layouts/dashboard/header/index';
import DashboardLayout from '../layouts/dashboard';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
import Image from '../components/Image';
// sections
import AuthFirebaseSocials from '../sections/auth/AuthFirebaseSocial';
import FormUserMeeting from '../sections/meeting/FormUserMeeting';
import Divider from '@mui/material/Divider';
import withAuth from '../HOC/withAuth';
// ----------------------------------------------------------------------
import GlobalStyles from '@mui/material/GlobalStyles';
import { IconButtonAnimate } from '../components/animate';
import Iconify from '../components/Iconify';
import { useRouter } from 'next/router';
import useAuth from './../hooks/useAuth';
import FormHelpDesk from '../sections/helpDesk/FormHelpDesk';
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

  flexDirection: 'column',

  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

function HelpDesk() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  const [showLinksentModal, setLinkSentModal] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  return (
    <Page title="Help Desk">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <RootStyle>
        <DashboardHeader withoutStack={user?.id?false:true} />

        <Container sx={{ mt: { xs: 4, lg: 4, xl: 4 } }}>
          <Paper>
            <ContentStyle>
              {
                <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                  <IconButtonAnimate onClick={() => router.back()}>
                    <Iconify icon={'eva:arrow-back-fill'} />
                  </IconButtonAnimate>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {!showLinksentModal && (
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h4" align="left" gutterBottom>
                        Help Desk
                      </Typography>
                    </Box>
                  )}
                </Box>
              }

              {showLinksentModal ? (
                <Box
                  sx={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Paper
                    sx={{
                      elevation: 2,
                      padding: 4,
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                    elevation={2}
                  >
                    <Typography variant="h4" align="center" gutterBottom>
                      Query Received
                    </Typography>
                    <br />
                    <img src="/images/help/check.png" width="100" />
                    <br />
                    <br />
                    <Typography sx={{ maxWidth: 380, lineHeight: 2, width: '100%' }} gutterBottom align={'left'}>
                      Dear {user.displayName ? user.displayName : 'user'},
                      <br />
                      Thank you for writing to us!
                      <br />
                    </Typography>
                    <Typography sx={{ maxWidth: 380 }}>
                      We have received your query and will get back to you soon
                    </Typography>
                  </Paper>
                </Box>
              ) : (
                <FormHelpDesk setLinkSentModal={setLinkSentModal} />
              )}
            </ContentStyle>
          </Paper>
        </Container>
      </RootStyle>
    </Page>
  );
}

HelpDesk.getLayout = function getLayout(page) {
  const { user } = useAuth();
  return <DashboardLayout withoutStack={user?.id?false:true}>{page}</DashboardLayout>;
};

export default HelpDesk;
