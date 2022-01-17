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

  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

function Register() {
  const { method, user } = useAuth();

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  console.log(user);

  return (
    <Page title="Register">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <RootStyle>
        <DashboardHeader />

        <Container sx={{ mt: { xs: 4, lg: 8 } }}>
          <Paper>
            <ContentStyle>
              <Box sx={{ mb: 5, display: 'flex' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" align="left" gutterBottom>
                    Business Profile
                  </Typography>
                </Box>
              </Box>

              <RegisterForm isUpdate={user.businessDetails?.businessName ? true : false} updateMode={true} />
            </ContentStyle>
          </Paper>
        </Container>
      </RootStyle>
    </Page>
  );
}

export default Register;
