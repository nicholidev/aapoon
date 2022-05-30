/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { capitalCase } from 'change-case';
import Link from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Tooltip, Paper, IconButton } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// routes
import DashboardHeader from '../../layouts/dashboard/header/index';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import RegisterForm from '../../sections/auth/register/BusinessForm';
import AuthFirebaseSocials from '../../sections/auth/AuthFirebaseSocial';
import Divider from '@mui/material/Divider';
import withoutAuth from '../../HOC/withOutAuth';
// ----------------------------------------------------------------------
import GlobalStyles from '@mui/material/GlobalStyles';
import Iconify from '../../components/Iconify';
import { useRouter } from 'next/router';
import { ComingSoonIllustration } from '../../assets';
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
  // minHeight: '100vh',
  flexDirection: 'column',
  zIndex: 100,
  padding: theme.spacing(8, 2),
}));

const Spacer = styled('div')(({ theme }) => ({
  minWidth: '100%',
  height: '30px',
  backgroundColor: '#fff',
  zIndex: 101,
  position: 'sticky',
  bottom: 0,
  left: 0,
}));

// ----------------------------------------------------------------------

function Register() {
  const { method, user } = useAuth();

  const router = useRouter();
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Register">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <RootStyle>
        <DashboardHeader />

        <Container sx={{ mt: { xs: 10, lg: 12 } }}>
          <Paper>
            <ContentStyle>
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                {user.businessDetails?.businessName && (
                  <IconButton sx={{ marginRight: '10px' }} onClick={() => router.back()}>
                    <Iconify icon="eva:arrow-back-fill" color="common.black" />
                  </IconButton>
                )}
                <Typography variant="h4">Business Profile</Typography>
              </Box>

              <RegisterForm isUpdate={user.businessDetails?.businessName ? true : false} updateMode={true} />
            </ContentStyle>
            <Spacer></Spacer>
          </Paper>
        </Container>
      </RootStyle>
    </Page>
  );
}

export default Register;
