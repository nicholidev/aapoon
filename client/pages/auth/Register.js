/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { capitalCase } from 'change-case';
import RouterLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Tooltip } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// routes

// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { RegisterForm } from '../../sections/auth/register';
import AuthFirebaseSocials from '../../sections/auth/AuthFirebaseSocial';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router';
import withoutAut from '../../HOC/withOutAuth';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
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
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
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
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

function Register() {
  const { method } = useAuth();

  let { query } = useRouter();
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle></HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Image alt="register" src="/images/register/rectangle-422.png" sx={{ width: '100%', height: '100%' }} />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <center>
                  <Logo sx={{ height: 32 }} />
                  <br />
                </center>
                <Typography variant="h4" align="center" gutterBottom>
                  Signup
                </Typography>
              </Box>
            </Box>

            <RegisterForm query={query} />
            <div id="captcha-container"></div>
            <Typography variant="caption" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              By clicking on Complete Signup, you agree to our &nbsp;
              <Link underline="always" color="text.primary" href="/about/terms-of-service">
                Terms and conditions &nbsp;
              </Link>
              and you acknowledge having read our &nbsp;
              <Link underline="always" color="text.primary" href="/about/privacy-policy">
                Privacy Policy
              </Link>
              .
            </Typography>
            <Divider sx={{ mt: 8 }} />
            <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?{' '}
              <RouterLink passHref href={'/auth/Login'}>
                <Link variant="subtitle2">Login</Link>
              </RouterLink>
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

export default withoutAut(Register);
