/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { capitalCase } from 'change-case';
import RouterLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography, CardContent, Divider } from '@mui/material';
// routes

// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { LoginForm } from '../../sections/auth/login';
import withoutAut from '../../HOC/withOutAuth';
import AuthFirebaseSocials from '../../sections/auth/AuthFirebaseSocial';

import { useRouter } from 'next/router';
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
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
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
function Login() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();
  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                      Login
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }} align="center">
                      Enter your details below.
                    </Typography>
                  </Box>
                </Stack>

                {/* {method === 'firebase' && <AuthFirebaseSocials />} */}

                <LoginForm />

                <Divider style={{marginTop: 24}}/>

                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                  Don’t have an account?{' '}
                  <RouterLink
                    href={router.query.return ? '/auth/Register?return=' + router.query.return : '/auth/Register'}
                    passHref
                  >
                    <Link variant="subtitle2">Get started</Link>
                  </RouterLink>
                </Typography>
              </CardContent>
            </Card>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

export default withoutAut(Login);
