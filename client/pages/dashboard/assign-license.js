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
import { useState } from 'react';
// routes
import DashboardHeader from '../../layouts/dashboard/header/index';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import AuthFirebaseSocials from '../../sections/auth/AuthFirebaseSocial';
import FormUserMeeting from '../../sections/meeting/FormUserMeeting';
import Divider from '@mui/material/Divider';
import withAuth from '../../HOC/withAuth';
// ----------------------------------------------------------------------
import GlobalStyles from '@mui/material/GlobalStyles';
import { IconButtonAnimate } from '../../components/animate';
import Iconify from '../../components/Iconify';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import FormAssignLicense from '../../sections/@dashboard/license/FormAssignLicense';
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
  minHeight: '50vh',
  flexDirection: 'column',

  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

function AssignMeeting() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();
  const [showLinksentModal, setLinkSentModal] = useState(false);
  const [email, setEmail] = useState('');
  const { user } = useAuth();
  let noLicence = user.activeLicenses.count - user.activeLicenses.assigned - 1 <= 0;
  return (
    <Page title="Assign license">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <RootStyle>
        <DashboardHeader />

        <Container sx={{ mt: { xs: 4, lg: 8, xl: 12 } }}>
          <Paper>
            <ContentStyle>
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <IconButtonAnimate onClick={() => router.back()}>
                  <Iconify icon={'eva:arrow-back-fill'} />
                </IconButtonAnimate>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" align="left" gutterBottom>
                    Assign License
                  </Typography>
                </Box>
              </Box>
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
                      elevation: 0,
                      padding: 4,
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                    elevation={0}
                  >
                    <Typography variant="h4" align="center" gutterBottom>
                      Link sent
                    </Typography>
                    <br />
                    <img src="/images/help/check.png" width="100" />
                    <br />
                    <br />
                    <Typography sx={{ maxWidth: 420, lineHeight: 2, width: '100%' }} gutterBottom align={'center'}>
                      You have assigned a license to {email}, <b>A link has been sent to the user to accept and join</b>
                    </Typography>
                  </Paper>
                </Box>
              ) : user.id&&noLicence ? (
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
                      elevation: 0,
                      padding: 4,
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                    elevation={0}
                  >
                    <Iconify icon={'charm:info'} style={{ fontSize: 150 }} />
                    <br />
                    <Typography variant="h4" align="center" gutterBottom>
                      Insufficient licenses
                    </Typography>
                    <br />
                    <Typography sx={{ maxWidth: 480, lineHeight: 2, width: '100%' }} gutterBottom align={'left'}>
                      You have {user.activeLicenses.count} licenses , and all are assigned
                    </Typography>
                  </Paper>
                </Box>
              ) : (
                <FormAssignLicense setLinkSentModal={setLinkSentModal} setEmail={setEmail} />
              )}
            </ContentStyle>
          </Paper>
        </Container>
      </RootStyle>
    </Page>
  );
}

export default withAuth(AssignMeeting);
