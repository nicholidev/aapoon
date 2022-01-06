/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useRouter } from 'next/router';
import { addJWTInterceptor, errorHandlerInterceptor } from '../utils/Interceptor';
import { styled } from '@mui/material/styles';
import { Typography, Box, Dialog, Divider } from '@mui/material';
import { RegisterForm } from '../sections/auth/register';
import Logo from '../components/Logo';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 0),
}));

const withMeetingAuth = (WrappedComponent) => {
  // const { userData, login, logoutUser } = useAuth();

  return (props) => {
    errorHandlerInterceptor();
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const router = useRouter();
      const [open, setOpen] = useState(true);
      let { query } = useRouter();
      if (!localStorage.getItem('isAuthenticated')) {
        // router.replace('/');

        return (
          <div>
            <Dialog
              open={open}
              maxWidth={'sm'}
              fullWidth
              onClose={() => setOpen(false)}
              id={'registerPopover'}
              key={'registerPopover'}
            >
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
                  <Link underline="always" color="text.primary" href="#">
                    Terms and conditions &nbsp;
                  </Link>
                  and you acknowledge having read our &nbsp;
                  <Link underline="always" color="text.primary" href="#">
                    Privacy Policy
                  </Link>
                  .
                </Typography>
                <Divider sx={{ mt: 8 }} />
                <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                  Already have an account?{' '}
                  <Link passHref href={'/auth/Login'}>
                    <Link variant="subtitle2">Login</Link>
                  </Link>
                </Typography>
              </ContentStyle>
            </Dialog>
          </div>
        );
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withMeetingAuth;
