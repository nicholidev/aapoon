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
import FormUserMeeting from '../../sections/meeting/FormUserMeeting';
import Divider from '@mui/material/Divider';
import withAuth from '../../HOC/withAuth';
// ----------------------------------------------------------------------
import GlobalStyles from '@mui/material/GlobalStyles';
import { IconButtonAnimate } from '../../components/animate';
import Iconify from '../../components/Iconify';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
const RootStyle = styled('div')(({ theme }) => ({
  paddingBottom: 2,
}));

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
  minHeight: '80vh',
  flexDirection: 'column',

  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

function ScheduleMeeting() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();

  const { method, user } = useAuth();

  return (
    <Page title="Schedule Meeting">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <RootStyle>
        <DashboardHeader />

        <Container sx={{ mt: { xs: 12, lg: 12, xl: 12 }, mb: 4 }}>
          <Paper>
            <ContentStyle>
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <IconButtonAnimate onClick={() => router.back()}>
                  <Iconify icon={'eva:arrow-back-fill'} color="common.black" />
                </IconButtonAnimate>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" align="left">
                    Schedule Meeting
                  </Typography>
                </Box>
              </Box>

              <FormUserMeeting isCustomerAdmin={user.accountType ? true : false} />
            </ContentStyle>
          </Paper>
        </Container>
      </RootStyle>
    </Page>
  );
}

export default withAuth(ScheduleMeeting);
